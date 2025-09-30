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
import {
  ApplicationCheckQuerySchema,
  CreateApplicationRequestSchema,
  MyApplicationsQuerySchema,
  SelectApplicantsRequestSchema,
} from './schema';
import { checkApplication, createApplication, getMyApplications, getApplicants, selectApplicants } from './service';
import {
  applicationErrorCodes,
  type ApplicationServiceError,
} from './error';
import { z } from 'zod';

export const registerApplicationRoutes = (app: Hono<AppEnv>) => {
  app.get('/api/applications/check', async (c) => {
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
    const parsedQuery = ApplicationCheckQuerySchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      return respond(
        c,
        failure(
          400,
          'INVALID_QUERY',
          'The provided query parameters are invalid.',
          parsedQuery.error.format(),
        ),
      );
    }

    const logger = getLogger(c);
    const result = await checkApplication(supabase, user.id, parsedQuery.data.campaignId);

    if (!result.ok) {
      const errorResult = result as ErrorResult<ApplicationServiceError, unknown>;

      if (errorResult.error.code === applicationErrorCodes.fetchError) {
        logger.error('Failed to check application', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  app.post('/api/applications', async (c) => {
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
    const parsedBody = CreateApplicationRequestSchema.safeParse(body);

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
    const result = await createApplication(supabase, user.id, parsedBody.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<ApplicationServiceError, unknown>;

      if (errorResult.error.code === applicationErrorCodes.databaseError) {
        logger.error('Failed to create application', errorResult.error.message);
      }

      return respond(c, result);
    }

    return c.json(result, 201);
  });

  app.get('/api/applications/my', async (c) => {
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
    const parsedQuery = MyApplicationsQuerySchema.safeParse(queryParams);

    if (!parsedQuery.success) {
      return respond(
        c,
        failure(
          400,
          'INVALID_QUERY',
          'The provided query parameters are invalid.',
          parsedQuery.error.format(),
        ),
      );
    }

    const logger = getLogger(c);
    const result = await getMyApplications(supabase, user.id, parsedQuery.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<ApplicationServiceError, unknown>;

      if (errorResult.error.code === applicationErrorCodes.fetchError) {
        logger.error('Failed to fetch my applications', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  app.get('/api/campaigns/:id/applicants', async (c) => {
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
          'INVALID_QUERY',
          'The provided campaign ID is invalid.',
          parsedId.error.format(),
        ),
      );
    }

    const logger = getLogger(c);
    const result = await getApplicants(supabase, user.id, parsedId.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<ApplicationServiceError, unknown>;

      if (errorResult.error.code === applicationErrorCodes.fetchError) {
        logger.error('Failed to fetch applicants', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });

  app.post('/api/campaigns/:id/select', async (c) => {
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
          'INVALID_QUERY',
          'The provided campaign ID is invalid.',
          parsedId.error.format(),
        ),
      );
    }

    const body = await c.req.json();
    const parsedBody = SelectApplicantsRequestSchema.safeParse(body);

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
    const result = await selectApplicants(supabase, user.id, parsedId.data, parsedBody.data);

    if (!result.ok) {
      const errorResult = result as ErrorResult<ApplicationServiceError, unknown>;

      if (errorResult.error.code === applicationErrorCodes.databaseError) {
        logger.error('Failed to select applicants', errorResult.error.message);
      }

      return respond(c, result);
    }

    return respond(c, result);
  });
};