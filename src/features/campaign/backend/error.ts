export const campaignErrorCodes = {
  fetchError: 'CAMPAIGN_FETCH_ERROR',
  notFound: 'CAMPAIGN_NOT_FOUND',
  invalidQuery: 'CAMPAIGN_INVALID_QUERY',
  validationError: 'CAMPAIGN_VALIDATION_ERROR',
  profileNotVerified: 'CAMPAIGN_PROFILE_NOT_VERIFIED',
  invalidDateRange: 'CAMPAIGN_INVALID_DATE_RANGE',
  createError: 'CAMPAIGN_CREATE_ERROR',
  databaseError: 'CAMPAIGN_DATABASE_ERROR',
} as const;

export type CampaignServiceError =
  | typeof campaignErrorCodes.fetchError
  | typeof campaignErrorCodes.notFound
  | typeof campaignErrorCodes.invalidQuery
  | typeof campaignErrorCodes.validationError
  | typeof campaignErrorCodes.profileNotVerified
  | typeof campaignErrorCodes.invalidDateRange
  | typeof campaignErrorCodes.createError
  | typeof campaignErrorCodes.databaseError;