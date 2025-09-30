import type { SupabaseClient } from '@supabase/supabase-js';
import {
  failure,
  success,
  type HandlerResult,
} from '@/backend/http/response';
import type { SignupRequest, SignupResponse } from './schema';
import { authErrorCodes, type AuthServiceError } from './error';

/**
 * 회원가입 처리
 * 1. Supabase Auth에 계정 생성
 * 2. users 테이블에 프로필 생성
 * 3. terms_agreements 테이블에 약관 동의 이력 저장
 */
export const createUserAccount = async (
  client: SupabaseClient,
  request: SignupRequest,
): Promise<HandlerResult<SignupResponse, AuthServiceError, unknown>> => {
  try {
    // 1. Supabase Auth에 계정 생성
    const { data: authData, error: authError } = await client.auth.signUp({
      email: request.email,
      password: request.password,
    });

    if (authError) {
      // 이메일 중복 에러 처리
      if (authError.message.includes('already registered')) {
        return failure(
          409,
          authErrorCodes.emailAlreadyExists,
          '이미 가입된 이메일입니다',
        );
      }

      return failure(
        500,
        authErrorCodes.authServiceError,
        `계정 생성 실패: ${authError.message}`,
      );
    }

    if (!authData.user) {
      return failure(
        500,
        authErrorCodes.authServiceError,
        '계정 생성에 실패했습니다',
      );
    }

    const authUserId = authData.user.id;

    // 2. users 테이블에 프로필 생성
    const { data: userData, error: userError } = await client
      .from('users')
      .insert({
        auth_id: authUserId,
        role: request.role,
        name: request.name,
        phone: request.phone,
        email: request.email,
      })
      .select('id')
      .single();

    if (userError) {
      // 롤백: Auth 계정 삭제
      await client.auth.admin.deleteUser(authUserId);

      return failure(
        500,
        authErrorCodes.databaseError,
        `프로필 생성 실패: ${userError.message}`,
      );
    }

    const userId = userData.id;

    // 3. terms_agreements 테이블에 약관 동의 이력 저장
    const termsData = request.termsAgreements.map((term) => ({
      user_id: userId,
      terms_type: term.type,
      agreed: term.agreed,
    }));

    const { error: termsError } = await client
      .from('terms_agreements')
      .insert(termsData);

    if (termsError) {
      // 롤백: Auth 계정 및 users 레코드 삭제
      await client.auth.admin.deleteUser(authUserId);
      await client.from('users').delete().eq('id', userId);

      return failure(
        500,
        authErrorCodes.databaseError,
        `약관 동의 저장 실패: ${termsError.message}`,
      );
    }

    // 4. 역할에 따른 리디렉션 URL 반환
    const redirectUrl =
      request.role === 'influencer'
        ? '/influencer/profile/setup'
        : '/advertiser/profile/setup';

    return success(
      {
        userId,
        email: request.email,
        role: request.role,
        redirectUrl,
      },
      201,
    );
  } catch (error) {
    return failure(
      500,
      authErrorCodes.authServiceError,
      `예상치 못한 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};