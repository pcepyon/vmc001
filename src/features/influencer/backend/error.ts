export const influencerErrorCodes = {
  profileAlreadyExists: 'PROFILE_ALREADY_EXISTS',
  invalidBirthDate: 'INVALID_BIRTH_DATE',
  agePolicyViolation: 'AGE_POLICY_VIOLATION',
  duplicateChannelUrl: 'DUPLICATE_CHANNEL_URL',
  invalidChannelUrl: 'INVALID_CHANNEL_URL',
  databaseError: 'DATABASE_ERROR',
  channelVerificationFailed: 'CHANNEL_VERIFICATION_FAILED',
  validationError: 'VALIDATION_ERROR',
  unauthorized: 'UNAUTHORIZED',
  forbidden: 'FORBIDDEN',
  notFound: 'NOT_FOUND',
} as const;

type InfluencerErrorValue =
  (typeof influencerErrorCodes)[keyof typeof influencerErrorCodes];

export type InfluencerServiceError = InfluencerErrorValue;