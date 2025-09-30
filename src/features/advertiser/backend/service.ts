import type { SupabaseClient } from '@supabase/supabase-js';
import {
  failure,
  success,
  type HandlerResult,
} from '@/backend/http/response';
import type {
  CreateAdvertiserProfileRequest,
  CreateAdvertiserProfileResponse,
} from './schema';
import {
  advertiserErrorCodes,
  type AdvertiserServiceError,
} from './error';

/**
 * 광고주 프로필 생성
 * 1. 기존 프로필 존재 여부 확인
 * 2. 사업자등록번호 중복 확인
 * 3. advertiser_profiles 테이블에 프로필 생성
 */
export const createAdvertiserProfile = async (
  client: SupabaseClient,
  userId: string,
  request: CreateAdvertiserProfileRequest,
): Promise<
  HandlerResult<
    CreateAdvertiserProfileResponse,
    AdvertiserServiceError,
    unknown
  >
> => {
  try {
    // 1. 기존 프로필 존재 여부 확인
    const { data: existingProfile, error: checkError } = await client
      .from('advertiser_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      return failure(
        500,
        advertiserErrorCodes.databaseError,
        `프로필 조회 실패: ${checkError.message}`,
      );
    }

    if (existingProfile) {
      return failure(
        409,
        advertiserErrorCodes.profileAlreadyExists,
        '이미 프로필이 존재합니다',
      );
    }

    // 2. 사업자등록번호 중복 확인
    const { data: existingBusiness, error: businessCheckError } = await client
      .from('advertiser_profiles')
      .select('id')
      .eq(
        'business_registration_number',
        request.businessRegistrationNumber.replace(/-/g, ''),
      )
      .maybeSingle();

    if (businessCheckError) {
      return failure(
        500,
        advertiserErrorCodes.databaseError,
        `사업자등록번호 중복 확인 실패: ${businessCheckError.message}`,
      );
    }

    if (existingBusiness) {
      return failure(
        409,
        advertiserErrorCodes.businessNumberAlreadyRegistered,
        '이미 등록된 사업자등록번호입니다',
      );
    }

    // 3. advertiser_profiles 테이블에 프로필 생성
    const { data: profileData, error: profileError } = await client
      .from('advertiser_profiles')
      .insert({
        user_id: userId,
        business_name: request.businessName,
        location: request.location,
        category: request.category,
        business_registration_number: request.businessRegistrationNumber.replace(
          /-/g,
          '',
        ),
        verification_status: 'pending',
      })
      .select('id, verification_status')
      .single();

    if (profileError) {
      return failure(
        500,
        advertiserErrorCodes.databaseError,
        `프로필 생성 실패: ${profileError.message}`,
      );
    }

    return success(
      {
        profileId: profileData.id,
        verificationStatus: profileData.verification_status as
          | 'pending'
          | 'verified'
          | 'failed',
      },
      201,
    );
  } catch (error) {
    return failure(
      500,
      advertiserErrorCodes.databaseError,
      `예상치 못한 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};