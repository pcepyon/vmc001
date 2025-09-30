import type { SupabaseClient } from '@supabase/supabase-js';
import {
  failure,
  success,
  type HandlerResult,
} from '@/backend/http/response';
import {
  ApplicationCheckResponseSchema,
  CreateApplicationResponseSchema,
  ApplicationItemSchema,
  ApplicantSchema,
  SelectApplicantsResponseSchema,
  type ApplicationCheckResponse,
  type CreateApplicationRequest,
  type CreateApplicationResponse,
  type MyApplicationsQuery,
  type ApplicationItem,
  type Applicant,
  type SelectApplicantsRequest,
  type SelectApplicantsResponse,
} from './schema';
import {
  applicationErrorCodes,
  type ApplicationServiceError,
} from './error';

const APPLICATIONS_TABLE = 'applications';
const CAMPAIGNS_TABLE = 'campaigns';
const INFLUENCER_PROFILES_TABLE = 'influencer_profiles';
const INFLUENCER_CHANNELS_TABLE = 'influencer_channels';
const ADVERTISER_PROFILES_TABLE = 'advertiser_profiles';
const USERS_TABLE = 'users';

const fallbackThumbnail = (id: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(id)}/400/300`;

export const checkApplication = async (
  client: SupabaseClient,
  userId: string,
  campaignId: string,
): Promise<HandlerResult<ApplicationCheckResponse, ApplicationServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, applicationErrorCodes.fetchError, userError.message);
    }

    if (!userData) {
      return failure(404, applicationErrorCodes.fetchError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(INFLUENCER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, applicationErrorCodes.fetchError, profileError.message);
    }

    if (!profileData) {
      return success({
        applied: false,
      });
    }

    const { data, error } = await client
      .from(APPLICATIONS_TABLE)
      .select('id, status')
      .eq('campaign_id', campaignId)
      .eq('influencer_id', profileData.id)
      .maybeSingle();

    if (error) {
      return failure(500, applicationErrorCodes.fetchError, error.message);
    }

    if (!data) {
      return success({
        applied: false,
      });
    }

    const parsed = ApplicationCheckResponseSchema.safeParse({
      applied: true,
      status: data.status,
    });

    if (!parsed.success) {
      return failure(
        500,
        applicationErrorCodes.validationError,
        'Application check response failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      applicationErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const createApplication = async (
  client: SupabaseClient,
  userId: string,
  data: CreateApplicationRequest,
): Promise<HandlerResult<CreateApplicationResponse, ApplicationServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, applicationErrorCodes.databaseError, userError.message);
    }

    if (!userData) {
      return failure(404, applicationErrorCodes.databaseError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(INFLUENCER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, applicationErrorCodes.databaseError, profileError.message);
    }

    if (!profileData) {
      return failure(400, applicationErrorCodes.profileNotComplete, 'Influencer profile not found');
    }

    const { data: campaignData, error: campaignError } = await client
      .from(CAMPAIGNS_TABLE)
      .select('id, status, recruitment_start_date, recruitment_end_date')
      .eq('id', data.campaignId)
      .maybeSingle();

    if (campaignError) {
      return failure(500, applicationErrorCodes.databaseError, campaignError.message);
    }

    if (!campaignData) {
      return failure(404, applicationErrorCodes.campaignNotFound, 'Campaign not found');
    }

    if (campaignData.status !== 'recruiting') {
      return failure(400, applicationErrorCodes.recruitmentClosed, 'Recruitment is closed');
    }

    const { data: existingApplication, error: checkError } = await client
      .from(APPLICATIONS_TABLE)
      .select('id')
      .eq('campaign_id', data.campaignId)
      .eq('influencer_id', profileData.id)
      .maybeSingle();

    if (checkError) {
      return failure(500, applicationErrorCodes.databaseError, checkError.message);
    }

    if (existingApplication) {
      return failure(409, applicationErrorCodes.duplicateApplication, 'Already applied to this campaign');
    }

    const { data: insertData, error: insertError } = await client
      .from(APPLICATIONS_TABLE)
      .insert({
        campaign_id: data.campaignId,
        influencer_id: profileData.id,
        message: data.message,
        visit_date: data.visitDate,
        status: 'applied',
      })
      .select('id, created_at')
      .single();

    if (insertError) {
      return failure(500, applicationErrorCodes.databaseError, insertError.message);
    }

    const parsed = CreateApplicationResponseSchema.safeParse({
      applicationId: insertData.id,
      status: 'applied',
      createdAt: insertData.created_at,
    });

    if (!parsed.success) {
      return failure(
        500,
        applicationErrorCodes.validationError,
        'Create application response failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      applicationErrorCodes.databaseError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const getMyApplications = async (
  client: SupabaseClient,
  userId: string,
  query: MyApplicationsQuery,
): Promise<HandlerResult<{ applications: ApplicationItem[]; pagination: { page: number; limit: number; total: number } }, ApplicationServiceError, unknown>> => {
  const { status, page, limit } = query;
  const offset = (page - 1) * limit;

  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, applicationErrorCodes.fetchError, userError.message);
    }

    if (!userData) {
      return failure(404, applicationErrorCodes.fetchError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(INFLUENCER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, applicationErrorCodes.fetchError, profileError.message);
    }

    if (!profileData) {
      return success({
        applications: [],
        pagination: {
          page,
          limit,
          total: 0,
        },
      });
    }

    let countQuery = client
      .from(APPLICATIONS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('influencer_id', profileData.id);

    if (status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      return failure(500, applicationErrorCodes.fetchError, countError.message);
    }

    let dataQuery = client
      .from(APPLICATIONS_TABLE)
      .select(`
        id,
        campaign_id,
        message,
        visit_date,
        status,
        created_at,
        campaigns:campaign_id (
          id,
          title,
          images,
          category,
          location
        )
      `)
      .eq('influencer_id', profileData.id);

    if (status !== 'all') {
      dataQuery = dataQuery.eq('status', status);
    }

    dataQuery = dataQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await dataQuery;

    if (error) {
      return failure(500, applicationErrorCodes.fetchError, error.message);
    }

    const applications: ApplicationItem[] = [];

    for (const row of data || []) {
      const campaign = Array.isArray(row.campaigns) ? row.campaigns[0] : row.campaigns;

      if (!campaign) {
        continue;
      }

      const thumbnail = campaign.images && campaign.images.length > 0
        ? campaign.images[0]
        : fallbackThumbnail(campaign.id);

      const mapped: ApplicationItem = {
        id: row.id,
        campaignId: row.campaign_id,
        campaignTitle: campaign.title,
        campaignImage: thumbnail,
        campaignCategory: campaign.category,
        campaignLocation: campaign.location,
        message: row.message,
        visitDate: row.visit_date,
        status: row.status as 'applied' | 'selected' | 'rejected',
        createdAt: row.created_at,
      };

      const parsed = ApplicationItemSchema.safeParse(mapped);

      if (!parsed.success) {
        return failure(
          500,
          applicationErrorCodes.validationError,
          'Application item failed validation.',
          parsed.error.format(),
        );
      }

      applications.push(parsed.data);
    }

    return success({
      applications,
      pagination: {
        page,
        limit,
        total: count || 0,
      },
    });
  } catch (err) {
    return failure(
      500,
      applicationErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const getApplicants = async (
  client: SupabaseClient,
  userId: string,
  campaignId: string,
): Promise<HandlerResult<{ applicants: Applicant[] }, ApplicationServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, applicationErrorCodes.fetchError, userError.message);
    }

    if (!userData) {
      return failure(404, applicationErrorCodes.fetchError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(ADVERTISER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, applicationErrorCodes.fetchError, profileError.message);
    }

    if (!profileData) {
      return failure(400, applicationErrorCodes.fetchError, 'Advertiser profile not found');
    }

    const { data: campaignData, error: campaignError } = await client
      .from(CAMPAIGNS_TABLE)
      .select('id, advertiser_id')
      .eq('id', campaignId)
      .maybeSingle();

    if (campaignError) {
      return failure(500, applicationErrorCodes.fetchError, campaignError.message);
    }

    if (!campaignData) {
      return failure(404, applicationErrorCodes.campaignNotFound, 'Campaign not found');
    }

    if (campaignData.advertiser_id !== profileData.id) {
      return failure(403, applicationErrorCodes.fetchError, 'Not authorized');
    }

    const { data, error } = await client
      .from(APPLICATIONS_TABLE)
      .select(`
        id,
        influencer_id,
        message,
        visit_date,
        status,
        created_at,
        influencer_profiles:influencer_id (
          id,
          user_id
        )
      `)
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) {
      return failure(500, applicationErrorCodes.fetchError, error.message);
    }

    const applicants: Applicant[] = [];

    for (const row of data || []) {
      const profile = Array.isArray(row.influencer_profiles) ? row.influencer_profiles[0] : row.influencer_profiles;

      if (!profile) {
        continue;
      }

      const { data: userInfo, error: userInfoError } = await client
        .from(USERS_TABLE)
        .select('name, email, phone')
        .eq('id', profile.user_id)
        .maybeSingle();

      if (userInfoError || !userInfo) {
        continue;
      }

      const { data: channels, error: channelsError } = await client
        .from(INFLUENCER_CHANNELS_TABLE)
        .select('platform, channel_name, channel_url, verification_status')
        .eq('influencer_id', profile.id);

      if (channelsError) {
        continue;
      }

      const mapped: Applicant = {
        applicationId: row.id,
        influencerId: row.influencer_id,
        influencerName: userInfo.name,
        influencerEmail: userInfo.email,
        influencerPhone: userInfo.phone,
        influencerChannels: (channels || []).map((ch) => ({
          platform: ch.platform as 'naver' | 'youtube' | 'instagram' | 'threads',
          channelName: ch.channel_name,
          channelUrl: ch.channel_url,
          verificationStatus: ch.verification_status as 'pending' | 'verified' | 'failed',
        })),
        message: row.message,
        visitDate: row.visit_date,
        status: row.status as 'applied' | 'selected' | 'rejected',
        createdAt: row.created_at,
      };

      const parsed = ApplicantSchema.safeParse(mapped);

      if (!parsed.success) {
        return failure(
          500,
          applicationErrorCodes.validationError,
          'Applicant item failed validation.',
          parsed.error.format(),
        );
      }

      applicants.push(parsed.data);
    }

    return success({ applicants });
  } catch (err) {
    return failure(
      500,
      applicationErrorCodes.fetchError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};

export const selectApplicants = async (
  client: SupabaseClient,
  userId: string,
  campaignId: string,
  data: SelectApplicantsRequest,
): Promise<HandlerResult<SelectApplicantsResponse, ApplicationServiceError, unknown>> => {
  try {
    const { data: userData, error: userError } = await client
      .from(USERS_TABLE)
      .select('id')
      .eq('auth_id', userId)
      .maybeSingle();

    if (userError) {
      return failure(500, applicationErrorCodes.databaseError, userError.message);
    }

    if (!userData) {
      return failure(404, applicationErrorCodes.databaseError, 'User not found');
    }

    const { data: profileData, error: profileError } = await client
      .from(ADVERTISER_PROFILES_TABLE)
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();

    if (profileError) {
      return failure(500, applicationErrorCodes.databaseError, profileError.message);
    }

    if (!profileData) {
      return failure(400, applicationErrorCodes.databaseError, 'Advertiser profile not found');
    }

    const { data: campaignData, error: campaignError } = await client
      .from(CAMPAIGNS_TABLE)
      .select('id, advertiser_id, status')
      .eq('id', campaignId)
      .maybeSingle();

    if (campaignError) {
      return failure(500, applicationErrorCodes.databaseError, campaignError.message);
    }

    if (!campaignData) {
      return failure(404, applicationErrorCodes.campaignNotFound, 'Campaign not found');
    }

    if (campaignData.advertiser_id !== profileData.id) {
      return failure(403, applicationErrorCodes.databaseError, 'Not authorized');
    }

    if (campaignData.status !== 'closed') {
      return failure(400, applicationErrorCodes.databaseError, 'Campaign is not closed');
    }

    const { error: selectError } = await client
      .from(APPLICATIONS_TABLE)
      .update({ status: 'selected' })
      .in('id', data.selectedApplicationIds)
      .eq('campaign_id', campaignId);

    if (selectError) {
      return failure(500, applicationErrorCodes.databaseError, selectError.message);
    }

    const { error: rejectError } = await client
      .from(APPLICATIONS_TABLE)
      .update({ status: 'rejected' })
      .not('id', 'in', `(${data.selectedApplicationIds.join(',')})`)
      .eq('campaign_id', campaignId)
      .eq('status', 'applied');

    if (rejectError) {
      return failure(500, applicationErrorCodes.databaseError, rejectError.message);
    }

    const { error: campaignUpdateError } = await client
      .from(CAMPAIGNS_TABLE)
      .update({ status: 'selection_complete' })
      .eq('id', campaignId);

    if (campaignUpdateError) {
      return failure(500, applicationErrorCodes.databaseError, campaignUpdateError.message);
    }

    const { count: selectedCount } = await client
      .from(APPLICATIONS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', campaignId)
      .eq('status', 'selected');

    const { count: rejectedCount } = await client
      .from(APPLICATIONS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', campaignId)
      .eq('status', 'rejected');

    const parsed = SelectApplicantsResponseSchema.safeParse({
      selectedCount: selectedCount || 0,
      rejectedCount: rejectedCount || 0,
    });

    if (!parsed.success) {
      return failure(
        500,
        applicationErrorCodes.validationError,
        'Select applicants response failed validation.',
        parsed.error.format(),
      );
    }

    return success(parsed.data);
  } catch (err) {
    return failure(
      500,
      applicationErrorCodes.databaseError,
      err instanceof Error ? err.message : 'Unknown error',
    );
  }
};