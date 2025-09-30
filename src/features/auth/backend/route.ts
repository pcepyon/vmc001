import type { Hono } from 'hono';
import {
  failure,
  respond,
  type ErrorResult,
} from '@/backend/http/response';
import {
  getLogger,
  getSupabase,
  type AppEnv,
} from '@/backend/hono/context';
import { SignupRequestSchema } from './schema';
import { createUserAccount } from './service';
import { authErrorCodes, type AuthServiceError } from './error';

export const registerAuthRoutes = (app: Hono<AppEnv>) => {
  /**
   * POST /api/auth/signup
   * 회원가입
   */
  app.post('/auth/signup', async (c) => {
    const logger = getLogger(c);

    // 요청 body 파싱
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return respond(
        c,
        failure(
          400,
          authErrorCodes.validationError,
          '잘못된 요청 형식입니다',
        ),
      );
    }

    // 요청 데이터 검증
    const parsedRequest = SignupRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return respond(
        c,
        failure(
          400,
          authErrorCodes.validationError,
          '입력 데이터가 유효하지 않습니다',
          parsedRequest.error.format(),
        ),
      );
    }

    // 필수 약관 동의 확인
    const requiredTerms = ['service', 'privacy'];
    const agreedTerms = parsedRequest.data.termsAgreements
      .filter((t) => t.agreed)
      .map((t) => t.type);

    const hasRequiredTerms = requiredTerms.every((term) =>
      agreedTerms.includes(term),
    );

    if (!hasRequiredTerms) {
      return respond(
        c,
        failure(
          400,
          authErrorCodes.termsNotAgreed,
          '필수 약관에 동의해야 합니다',
        ),
      );
    }

    const supabase = getSupabase(c);

    // 회원가입 처리
    const result = await createUserAccount(supabase, parsedRequest.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<AuthServiceError, unknown>;

      if (errorResult.error.code === authErrorCodes.authServiceError) {
        logger.error('Auth service error', errorResult.error.message);
      }

      if (errorResult.error.code === authErrorCodes.databaseError) {
        logger.error('Database error', errorResult.error.message);
      }

      return respond(c, result);
    }

    logger.info(
      `User created successfully: ${result.data.userId} (${result.data.email})`,
    );

    return respond(c, result);
  });
};