export const advertiserErrorCodes = {
  profileAlreadyExists: 'PROFILE_ALREADY_EXISTS',
  businessNumberAlreadyRegistered: 'BUSINESS_NUMBER_ALREADY_REGISTERED',
  invalidBusinessNumber: 'INVALID_BUSINESS_NUMBER',
  databaseError: 'DATABASE_ERROR',
  verificationFailed: 'VERIFICATION_FAILED',
  validationError: 'VALIDATION_ERROR',
  unauthorized: 'UNAUTHORIZED',
  forbidden: 'FORBIDDEN',
} as const;

type AdvertiserErrorValue =
  (typeof advertiserErrorCodes)[keyof typeof advertiserErrorCodes];

export type AdvertiserServiceError = AdvertiserErrorValue;