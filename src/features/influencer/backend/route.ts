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
import { CreateInfluencerProfileRequestSchema } from './schema';
import { createInfluencerProfile } from './service';
import {
  influencerErrorCodes,
  type InfluencerServiceError,
} from './error';

export const registerInfluencerRoutes = (app: Hono<AppEnv>) => {
  /**
   * POST /api/influencer/profile
   * 인플루언서 프로필 생성
   */
  app.post('/api/influencer/profile', async (c) => {
    const logger = getLogger(c);

    // TODO: 인증 미들웨어 구현 필요
    // 현재는 테스트를 위해 임시 userId 사용
    const tempUserId = c.req.header('X-User-Id');

    if (!tempUserId) {
      return respond(
        c,
        failure(401, influencerErrorCodes.unauthorized, '로그인이 필요합니다'),
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
          influencerErrorCodes.validationError,
          '잘못된 요청 형식입니다',
        ),
      );
    }

    // 요청 데이터 검증
    const parsedRequest = CreateInfluencerProfileRequestSchema.safeParse(body);

    if (!parsedRequest.success) {
      return respond(
        c,
        failure(
          400,
          influencerErrorCodes.validationError,
          '입력 데이터가 유효하지 않습니다',
          parsedRequest.error.format(),
        ),
      );
    }

    const supabase = getSupabase(c);

    // 프로필 생성
    const result = await createInfluencerProfile(
      supabase,
      tempUserId,
      parsedRequest.data,
    );

    if (!result.ok) {
      const errorResult = result as ErrorResult<InfluencerServiceError, unknown>;

      if (errorResult.error.code === influencerErrorCodes.databaseError) {
        logger.error('Database error', errorResult.error.message);
      }

      return respond(c, result);
    }

    logger.info(`Influencer profile created: ${result.data.profileId}`);

    return respond(c, result);
  });

  /**
   * GET /api/influencer/profile/status
   * 인플루언서 프로필 상태 확인
   */
  app.get('/api/influencer/profile/status', async (c) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader) {
      return respond(
        c,
        failure(401, 'UNAUTHORIZED', 'Authorization header is required'),
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = getSupabase(c);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return respond(
        c,
        failure(401, 'UNAUTHORIZED', 'Invalid token'),
      );
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (userError) {
      return respond(
        c,
        failure(500, influencerErrorCodes.databaseError, userError.message),
      );
    }

    if (!userData) {
      return respond(
        c,
        failure(404, influencerErrorCodes.notFound, 'User not found'),
      );
    }

    const { data: profileData, error: profileError } = await supabase
      .from('influencer_profiles')
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return respond(
        c,
        failure(500, influencerErrorCodes.databaseError, profileError.message),
      );
    }

    return respond(c, {
      ok: true,
      status: 200,
      data: {
        exists: !!profileData,
      },
    });
  });
};