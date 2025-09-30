export const applicationErrorCodes = {
  duplicateApplication: 'APPLICATION_DUPLICATE',
  recruitmentClosed: 'APPLICATION_RECRUITMENT_CLOSED',
  invalidVisitDate: 'APPLICATION_INVALID_VISIT_DATE',
  profileNotComplete: 'APPLICATION_PROFILE_NOT_COMPLETE',
  databaseError: 'APPLICATION_DATABASE_ERROR',
  campaignNotFound: 'APPLICATION_CAMPAIGN_NOT_FOUND',
  fetchError: 'APPLICATION_FETCH_ERROR',
  validationError: 'APPLICATION_VALIDATION_ERROR',
} as const;

export type ApplicationServiceError =
  | typeof applicationErrorCodes.duplicateApplication
  | typeof applicationErrorCodes.recruitmentClosed
  | typeof applicationErrorCodes.invalidVisitDate
  | typeof applicationErrorCodes.profileNotComplete
  | typeof applicationErrorCodes.databaseError
  | typeof applicationErrorCodes.campaignNotFound
  | typeof applicationErrorCodes.fetchError
  | typeof applicationErrorCodes.validationError;