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
import { CreateAdvertiserProfileRequestSchema } from './schema';
import { createAdvertiserProfile } from './service';
import {
  advertiserErrorCodes,
  type AdvertiserServiceError,
} from './error';

export const registerAdvertiserRoutes = (app: Hono<AppEnv>) => {
  /**
   * POST /api/advertiser/profile
   * 광고주 프로필 생성
   */
  app.post('/advertiser/profile', async (c) => {
    const logger = getLogger(c);

    // TODO: 인증 미들웨어 구현 필요
    // 현재는 테스트를 위해 임시 userId 사용
    const tempUserId = c.req.header('X-User-Id');

    if (!tempUserId) {
      return respond(
        c,
        failure(
          401,
          advertiserErrorCodes.unauthorized,
          '로그인이 필요합니다',
        ),
      );
    }

    // 요청 body 파싱
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return respond(
        c,
        failure(
          400,
          advertiserErrorCodes.validationError,
          '잘못된 요청 형식입니다',
        ),
      );
    }

    // 요청 데이터 검증
    const parsedRequest = CreateAdvertiserProfileRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return respond(
        c,
        failure(
          400,
          advertiserErrorCodes.validationError,
          '입력 데이터가 유효하지 않습니다',
          parsedRequest.error.format(),
        ),
      );
    }

    const supabase = getSupabase(c);

    // 프로필 생성
    const result = await createAdvertiserProfile(
      supabase,
      tempUserId,
      parsedRequest.data,
    );

    if (!result.ok) {
      const errorResult = result as ErrorResult<
        AdvertiserServiceError,
        unknown
      >;

      if (errorResult.error.code === advertiserErrorCodes.databaseError) {
        logger.error('Database error', errorResult.error.message);
      }

      return respond(c, result);
    }

    logger.info(`Advertiser profile created: ${result.data.profileId}`);

    return respond(c, result);
  });
};