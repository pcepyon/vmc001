export const authErrorCodes = {
  emailAlreadyExists: 'EMAIL_ALREADY_EXISTS',
  invalidCredentials: 'INVALID_CREDENTIALS',
  weakPassword: 'WEAK_PASSWORD',
  termsNotAgreed: 'TERMS_NOT_AGREED',
  rateLimitExceeded: 'RATE_LIMIT_EXCEEDED',
  authServiceError: 'AUTH_SERVICE_ERROR',
  databaseError: 'DATABASE_ERROR',
  validationError: 'VALIDATION_ERROR',
} as const;

type AuthErrorValue = (typeof authErrorCodes)[keyof typeof authErrorCodes];

export type AuthServiceError = AuthErrorValue;