import type { SupabaseClient } from '@supabase/supabase-js';
import {
  failure,
  success,
  type HandlerResult,
} from '@/backend/http/response';
import {
  CampaignSummarySchema,
  CampaignDetailSchema,
  CampaignTableRowSchema,
  MyCampaignItemSchema,
  CreateCampaignResponseSchema,
  CloseCampaignResponseSchema,
  type CampaignListQuery,
  type CampaignSummary,
  type CampaignDetail,
  type CampaignRow,
  type MyCampaignsQuery,
  type MyCampaignItem,
  type CreateCampaignRequest,
  type CreateCampaignResponse,
  type CloseCampaignResponse,
} from './schema';
import {
  campaignErrorCodes,
  type CampaignServiceError,
} from './error';

const CAMPAIGNS_TABLE = 'campaigns';
const APPLICATIONS_TABLE = 'applications';
const ADVERTISER_PROFILES_TABLE = 'advertiser_profiles';
const USERS_TABLE = 'users';

const fallbackThumbnail = (id: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(id)}/400/300`;

export const getCampaignList = async (
  client: SupabaseClient,
  query: CampaignListQuery,
): Promise<HandlerResult<{ campaigns: CampaignSummary[]; pagination: { page: number; limit: number; total: number } }, CampaignServiceError, unknown>> => {
  const { status, category, location, sort, page, limit } = query;
  const offset = (page - 1) * limit;

  try {
    let countQuery = client
      .from(CAMPAIGNS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('status', status);

    if (category) {
      countQuery = countQuery.eq('category', category);
    }
    if (location) {
      countQuery = countQuery.eq('location', location);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      return failure(500, campaignErrorCodes.fetchError, countError.message);
    }

    let dataQuery = client
      .from(CAMPAIGNS_TABLE)
      .select(`
        id,
        advertiser_id,
        title,
        category,
        location,
        recruitment_start_date,
        recruitment_end_date,
        recruitment_count,
        benefits,
        store_info,
        mission,
        images,
        status,
        created_at,
        updated_at
      `)
      .eq('status', status);

    if (category) {
      dataQuery = dataQuery.eq('category', category);
    }
    if (location) {
      dataQuery = dataQuery.eq('location', location);
    }

    if (sort === 'latest') {
      dataQuery = dataQuery.order('created_at', { ascending: false });
    } else if (sort === 'deadline_soon') {
      dataQuery = dataQuery.order('recruitment_end_date', { ascending: true });
    } else if (sort === 'popular') {
      dataQuery = dataQuery.order('created_at', { ascending: false });
    }

    dataQuery = dataQuery.range(offset, offset + limit - 1);

    const { data, error } = await dataQuery;

    if (error) {
      return failure(500, campaignErrorCodes.fetchError, error.message);
    }

    const campaignIds = data.map((row) => row.id);
    const { data: applicationCounts, error: appError } = await client
      .from(APPLICATIONS_TABLE)
      .select('campaign_id')
      .in('campaign_id', campaignIds);

    if (appError) {
      return failure(500, campaignErrorCodes.fetchError, appError.message);
    }

    const countMap = new Map<string, number>();
    applicationCounts?.forEach((app: { campaign_id: string }) => {
      countMap.set(app.campaign_id, (countMap.get(app.campaign_id) || 0) + 1);
    });

    const campaigns: CampaignSummary[] = [];

    for (const row of data) {
      const rowParse = CampaignTableRowSchema.safeParse(row);

      if (!rowParse.success) {
        return failure(
          500,
          campaignErrorCodes.validationError,
          'Campaign row failed validation.',
          rowParse.error.format(),
        );
      }

      const thumbnail = rowParse.data.images && rowParse.data.images.length > 0
        ? rowParse.data.images[0]
        : fallbackThumbnail(rowParse.data.id);

      const mapped: CampaignSummary = {
        id: rowParse.data.id,
        title: rowParse.data.title,
        category: rowParse.data.category,
        location: rowParse.data.location,
        recruitmentEndDate: rowParse.data.recruitment_end_date,
        recruitmentCount: rowParse.data.recruitment_count,
        applicationCount: countMap.get(rowParse.data.id) || 0,
        thumbnail,
        status: rowParse.data.status as 'recruiting' | 'closed' | 'selection_complete',
        createdAt: rowParse.data.created_at,
      };

      const parsed = CampaignSummarySchema.safeParse(mapped);

      if (!parsed.success) {
        return failure(
          500,
          campaignErrorCodes.validationError,
          'Campaign summary failed validation.',
          parsed.error.format(),
        );
      }

      campaigns.push(parsed.data);
    }

    return success({
      campaigns,
      pagination: {
        page,
        limit,
        total: count || 0,
      },
    });
  } catch (err) {
    return failure(
      500,
      campaignErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const getCampaignDetail = async (
  client: SupabaseClient,
  id: string,
): Promise<HandlerResult<CampaignDetail, CampaignServiceError, unknown>> => {
  try {
    const { data, error } = await client
      .from(CAMPAIGNS_TABLE)
      .select(`
        id,
        advertiser_id,
        title,
        category,
        location,
        recruitment_start_date,
        recruitment_end_date,
        recruitment_count,
        benefits,
        store_info,
        mission,
        images,
        status,
        created_at,
        updated_at
      `)
      .eq('id', id)
      .maybeSingle<CampaignRow>();

    if (error) {
      return failure(500, campaignErrorCodes.fetchError, error.message);
    }

    if (!data) {
      return failure(404, campaignErrorCodes.notFound, 'Campaign not found');
    }

    const rowParse = CampaignTableRowSchema.safeParse(data);

    if (!rowParse.success) {
      return failure(
        500,
        campaignErrorCodes.validationError,
        'Campaign row failed validation.',
        rowParse.error.format(),
      );
    }

    const { data: applicationCounts, error: appError } = await client
      .from(APPLICATIONS_TABLE)
      .select('id', { count: 'exact' })
      .eq('campaign_id', id);

    if (appError) {
      return failure(500, campaignErrorCodes.fetchError, appError.message);
    }

    const mapped: CampaignDetail = {
      id: rowParse.data.id,
      advertiserId: rowParse.data.advertiser_id,
      title: rowParse.data.title,
      category: rowParse.data.category,
      location: rowParse.data.location,
      recruitmentStartDate: rowParse.data.recruitment_start_date,
      recruitmentEndDate: rowParse.data.recruitment_end_date,
      recruitmentCount: rowParse.data.recruitment_count,
      applicationCount: applicationCounts?.length || 0,
      benefits: rowParse.data.benefits,
      storeInfo: rowParse.data.store_info,
      mission: rowParse.data.mission,
      images: rowParse.data.images,
      status: rowParse.data.status as 'recruiting' | 'closed' | 'selection_complete',
      createdAt: rowParse.data.created_at,
      updatedAt: rowParse.data.updated_at,
    };

    const parsed = CampaignDetailSchema.safeParse(mapped);

    if (!parsed.success) {
      return failure(
        500,
        campaignErrorCodes.validationError,
        'Campaign detail failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      campaignErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const getMyCampaigns = async (
  client: SupabaseClient,
  userId: string,
  query: MyCampaignsQuery,
): Promise<HandlerResult<{ campaigns: MyCampaignItem[]; pagination: { page: number; limit: number; total: number } }, CampaignServiceError, unknown>> => {
  const { page, limit } = query;
  const offset = (page - 1) * limit;

  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, campaignErrorCodes.fetchError, userError.message);
    }

    if (!userData) {
      return failure(404, campaignErrorCodes.fetchError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(ADVERTISER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, campaignErrorCodes.fetchError, profileError.message);
    }

    if (!profileData) {
      return success({
        campaigns: [],
        pagination: {
          page,
          limit,
          total: 0,
        },
      });
    }

    const { count, error: countError } = await client
      .from(CAMPAIGNS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('advertiser_id', profileData.id);

    if (countError) {
      return failure(500, campaignErrorCodes.fetchError, countError.message);
    }

    const { data, error } = await client
      .from(CAMPAIGNS_TABLE)
      .select(`
        id,
        advertiser_id,
        title,
        category,
        location,
        recruitment_start_date,
        recruitment_end_date,
        recruitment_count,
        status,
        created_at
      `)
      .eq('advertiser_id', profileData.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return failure(500, campaignErrorCodes.fetchError, error.message);
    }

    const campaignIds = data.map((row) => row.id);
    const { data: applicationCounts, error: appError } = await client
      .from(APPLICATIONS_TABLE)
      .select('campaign_id')
      .in('campaign_id', campaignIds);

    if (appError) {
      return failure(500, campaignErrorCodes.fetchError, appError.message);
    }

    const countMap = new Map<string, number>();
    applicationCounts?.forEach((app: { campaign_id: string }) => {
      countMap.set(app.campaign_id, (countMap.get(app.campaign_id) || 0) + 1);
    });

    const campaigns: MyCampaignItem[] = [];

    for (const row of data) {
      const mapped: MyCampaignItem = {
        id: row.id,
        title: row.title,
        status: row.status as 'recruiting' | 'closed' | 'selection_complete',
        recruitmentCount: row.recruitment_count,
        applicationCount: countMap.get(row.id) || 0,
        recruitmentStartDate: row.recruitment_start_date,
        recruitmentEndDate: row.recruitment_end_date,
        category: row.category,
        location: row.location,
        createdAt: row.created_at,
      };

      const parsed = MyCampaignItemSchema.safeParse(mapped);

      if (!parsed.success) {
        return failure(
          500,
          campaignErrorCodes.validationError,
          'My campaign item failed validation.',
          parsed.error.format(),
        );
      }

      campaigns.push(parsed.data);
    }

    return success({
      campaigns,
      pagination: {
        page,
        limit,
        total: count || 0,
      },
    });
  } catch (err) {
    return failure(
      500,
      campaignErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const createCampaign = async (
  client: SupabaseClient,
  userId: string,
  data: CreateCampaignRequest,
): Promise<HandlerResult<CreateCampaignResponse, CampaignServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, campaignErrorCodes.databaseError, userError.message);
    }

    if (!userData) {
      return failure(404, campaignErrorCodes.databaseError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(ADVERTISER_PROFILES_TABLE)
      .select('id, verification_status')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, campaignErrorCodes.databaseError, profileError.message);
    }

    if (!profileData) {
      return failure(400, campaignErrorCodes.profileNotVerified, 'Advertiser profile not found');
    }

    if (profileData.verification_status !== 'verified') {
      return failure(403, campaignErrorCodes.profileNotVerified, 'Advertiser profile is not verified');
    }

    const startDate = new Date(data.recruitmentStartDate);
    const endDate = new Date(data.recruitmentEndDate);

    if (endDate < startDate) {
      return failure(400, campaignErrorCodes.invalidDateRange, 'Recruitment end date must be after start date');
    }

    const { data: insertData, error: insertError } = await client
      .from(CAMPAIGNS_TABLE)
      .insert({
        advertiser_id: profileData.id,
        title: data.title,
        category: data.category,
        location: data.location,
        recruitment_start_date: data.recruitmentStartDate,
        recruitment_end_date: data.recruitmentEndDate,
        recruitment_count: data.recruitmentCount,
        benefits: data.benefits,
        store_info: data.storeInfo,
        mission: data.mission,
        images: data.images || null,
        status: 'recruiting',
      })
      .select('id')
      .single();

    if (insertError) {
      return failure(500, campaignErrorCodes.createError, insertError.message);
    }

    const parsed = CreateCampaignResponseSchema.safeParse({
      campaignId: insertData.id,
      status: 'recruiting',
    });

    if (!parsed.success) {
      return failure(
        500,
        campaignErrorCodes.validationError,
        'Create campaign response failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      campaignErrorCodes.databaseError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const closeCampaign = async (
  client: SupabaseClient,
  userId: string,
  campaignId: string,
): Promise<HandlerResult<CloseCampaignResponse, CampaignServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, campaignErrorCodes.databaseError, userError.message);
    }

    if (!userData) {
      return failure(404, campaignErrorCodes.databaseError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(ADVERTISER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, campaignErrorCodes.databaseError, profileError.message);
    }

    if (!profileData) {
      return failure(400, campaignErrorCodes.databaseError, 'Advertiser profile not found');
    }

    const { data: campaignData, error: campaignError } = await client
      .from(CAMPAIGNS_TABLE)
      .select('id, advertiser_id, status')
      .eq('id', campaignId)
      .maybeSingle();

    if (campaignError) {
      return failure(500, campaignErrorCodes.databaseError, campaignError.message);
    }

    if (!campaignData) {
      return failure(404, campaignErrorCodes.notFound, 'Campaign not found');
    }

    if (campaignData.advertiser_id !== profileData.id) {
      return failure(403, campaignErrorCodes.databaseError, 'Not authorized');
    }

    if (campaignData.status !== 'recruiting') {
      return failure(400, campaignErrorCodes.databaseError, 'Campaign is not recruiting');
    }

    const { error: updateError } = await client
      .from(CAMPAIGNS_TABLE)
      .update({ status: 'closed' })
      .eq('id', campaignId);

    if (updateError) {
      return failure(500, campaignErrorCodes.databaseError, updateError.message);
    }

    const parsed = CloseCampaignResponseSchema.safeParse({
      campaignId,
      status: 'closed',
    });

    if (!parsed.success) {
      return failure(
        500,
        campaignErrorCodes.validationError,
        'Close campaign response failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      campaignErrorCodes.databaseError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};