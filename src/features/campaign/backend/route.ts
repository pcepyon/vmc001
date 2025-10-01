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
import { CampaignListQuerySchema, MyCampaignsQuerySchema, CreateCampaignRequestSchema } from './schema';
import { getCampaignList, getCampaignDetail, getMyCampaigns, createCampaign, closeCampaign } from './service';
import {
  campaignErrorCodes,
  type CampaignServiceError,
} from './error';
import { z } from 'zod';

export const registerCampaignRoutes = (app: Hono<AppEnv>) => {
  app.get('/api/campaigns', async (c) => {
    const queryParams = c.req.query();
    const parsedQuery = CampaignListQuerySchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      return respond(
        c,
        failure(
          400,
          campaignErrorCodes.invalidQuery,
          'The provided query parameters are invalid.',
          parsedQuery.error.format(),
        ),
      );
    }

    const supabase = getSupabase(c);
    const logger = getLogger(c);

    const result = await getCampaignList(supabase, parsedQuery.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<CampaignServiceError, unknown>;

      if (errorResult.error.code === campaignErrorCodes.fetchError) {
        logger.error('Failed to fetch campaign list', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  // 더 구체적인 경로를 먼저 정의 - /api/campaigns/my
  app.get('/api/campaigns/my', async (c) => {
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

    const queryParams = c.req.query();
    const logger = getLogger(c);

    logger.info('[/api/campaigns/my] Raw query params:', queryParams);
    logger.info('[/api/campaigns/my] Query param types:', {
      page: typeof queryParams.page,
      limit: typeof queryParams.limit,
    });

    const parsedQuery = MyCampaignsQuerySchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      logger.error('[/api/campaigns/my] Query validation failed:', {
        queryParams,
        errors: parsedQuery.error.format(),
      });

      return respond(
        c,
        failure(
          400,
          campaignErrorCodes.invalidQuery,
          'The provided query parameters are invalid.',
          parsedQuery.error.format(),
        ),
      );
    }

    const result = await getMyCampaigns(supabase, user.id, parsedQuery.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<CampaignServiceError, unknown>;

      if (errorResult.error.code === campaignErrorCodes.fetchError) {
        logger.error('Failed to fetch my campaigns', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  // 와일드카드 경로는 나중에 정의 - /api/campaigns/:id
  app.get('/api/campaigns/:id', async (c) => {
    const campaignId = c.req.param('id');
    const parsedId = z.string().uuid().safeParse(campaignId);

    if (!parsedId.success) {
      return respond(
        c,
        failure(
          400,
          campaignErrorCodes.invalidQuery,
          'The provided campaign ID is invalid.',
          parsedId.error.format(),
        ),
      );
    }

    const supabase = getSupabase(c);
    const logger = getLogger(c);

    const result = await getCampaignDetail(supabase, parsedId.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<CampaignServiceError, unknown>;

      if (errorResult.error.code === campaignErrorCodes.fetchError) {
        logger.error('Failed to fetch campaign detail', errorResult.error.message);
      } else if (errorResult.error.code === campaignErrorCodes.notFound) {
        logger.info('Campaign not found', { campaignId: parsedId.data });
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  app.post('/api/campaigns', async (c) => {
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

    const body = await c.req.json();
    const parsedBody = CreateCampaignRequestSchema.safeParse(body);

    if (!parsedBody.success) {
      return respond(
        c,
        failure(
          400,
          'INVALID_REQUEST',
          'The provided request body is invalid.',
          parsedBody.error.format(),
        ),
      );
    }

    const logger = getLogger(c);
    const result = await createCampaign(supabase, user.id, parsedBody.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<CampaignServiceError, unknown>;

      if (errorResult.error.code === campaignErrorCodes.databaseError || errorResult.error.code === campaignErrorCodes.createError) {
        logger.error('Failed to create campaign', errorResult.error.message);
      }

      return respond(c, result);
    }

    return c.json(result, 201);
  });

  app.patch('/api/campaigns/:id/status', async (c) => {
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

    const campaignId = c.req.param('id');
    const parsedId = z.string().uuid().safeParse(campaignId);

    if (!parsedId.success) {
      return respond(
        c,
        failure(
          400,
          campaignErrorCodes.invalidQuery,
          'The provided campaign ID is invalid.',
          parsedId.error.format(),
        ),
      );
    }

    const logger = getLogger(c);
    const result = await closeCampaign(supabase, user.id, parsedId.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<CampaignServiceError, unknown>;

      if (errorResult.error.code === campaignErrorCodes.databaseError) {
        logger.error('Failed to close campaign', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });
};