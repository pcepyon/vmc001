import type { SupabaseClient } from '@supabase/supabase-js';
import {
  failure,
  success,
  type HandlerResult,
} from '@/backend/http/response';
import type {
  CreateInfluencerProfileRequest,
  CreateInfluencerProfileResponse,
} from './schema';
import {
  influencerErrorCodes,
  type InfluencerServiceError,
} from './error';

/**
 * 인플루언서 프로필 생성
 * 1. 기존 프로필 존재 여부 확인
 * 2. 채널 URL 중복 확인
 * 3. influencer_profiles 테이블에 프로필 생성
 * 4. influencer_channels 테이블에 채널 목록 생성
 */
export const createInfluencerProfile = async (
  client: SupabaseClient,
  userId: string,
  request: CreateInfluencerProfileRequest,
): Promise<
  HandlerResult<
    CreateInfluencerProfileResponse,
    InfluencerServiceError,
    unknown
  >
> => {
  try {
    // 1. 기존 프로필 존재 여부 확인
    const { data: existingProfile, error: checkError } = await client
      .from('influencer_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      return failure(
        500,
        influencerErrorCodes.databaseError,
        `프로필 조회 실패: ${checkError.message}`,
      );
    }

    if (existingProfile) {
      return failure(
        409,
        influencerErrorCodes.profileAlreadyExists,
        '이미 프로필이 존재합니다',
      );
    }

    // 2. 채널 URL 중복 확인
    const channelUrls = request.channels.map((ch) => ch.channelUrl);
    const { data: existingChannels, error: channelCheckError } = await client
      .from('influencer_channels')
      .select('channel_url')
      .in('channel_url', channelUrls);

    if (channelCheckError) {
      return failure(
        500,
        influencerErrorCodes.databaseError,
        `채널 중복 확인 실패: ${channelCheckError.message}`,
      );
    }

    if (existingChannels && existingChannels.length > 0) {
      return failure(
        409,
        influencerErrorCodes.duplicateChannelUrl,
        '이미 등록된 채널 URL이 있습니다',
      );
    }

    // 3. influencer_profiles 테이블에 프로필 생성
    const { data: profileData, error: profileError } = await client
      .from('influencer_profiles')
      .insert({
        user_id: userId,
        birth_date: request.birthDate,
      })
      .select('id')
      .single();

    if (profileError) {
      return failure(
        500,
        influencerErrorCodes.databaseError,
        `프로필 생성 실패: ${profileError.message}`,
      );
    }

    const profileId = profileData.id;

    // 4. influencer_channels 테이블에 채널 목록 생성
    const channelsData = request.channels.map((channel) => ({
      influencer_id: profileId,
      platform: channel.platform,
      channel_name: channel.channelName,
      channel_url: channel.channelUrl,
      verification_status: 'pending' as const,
    }));

    const { data: channelsResult, error: channelsError } = await client
      .from('influencer_channels')
      .insert(channelsData)
      .select('id, platform, channel_name, channel_url, verification_status');

    if (channelsError) {
      // 롤백: 프로필 삭제
      await client.from('influencer_profiles').delete().eq('id', profileId);

      return failure(
        500,
        influencerErrorCodes.databaseError,
        `채널 생성 실패: ${channelsError.message}`,
      );
    }

    // 5. 응답 데이터 구성
    const channels = channelsResult.map((ch) => ({
      id: ch.id,
      platform: ch.platform as 'naver' | 'youtube' | 'instagram' | 'threads',
      channelName: ch.channel_name,
      channelUrl: ch.channel_url,
      verificationStatus: ch.verification_status as
        | 'pending'
        | 'verified'
        | 'failed',
    }));

    return success(
      {
        profileId,
        channels,
      },
      201,
    );
  } catch (error) {
    return failure(
      500,
      influencerErrorCodes.databaseError,
      `예상치 못한 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};