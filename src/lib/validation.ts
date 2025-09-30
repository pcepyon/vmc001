/**
 * 이메일 형식 검증
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 한국 휴대폰번호 형식 검증 (010-XXXX-XXXX 또는 01012345678)
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
};

/**
 * 비밀번호 강도 검증
 * - 최소 8자 이상
 * - 대문자 1개 이상
 * - 소문자 1개 이상
 * - 숫자 1개 이상
 */
export const validatePassword = (
  password: string,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호는 최소 1개의 대문자를 포함해야 합니다');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호는 최소 1개의 소문자를 포함해야 합니다');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('비밀번호는 최소 1개의 숫자를 포함해야 합니다');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * URL 형식 검증
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 채널 URL 검증 (플랫폼별)
 */
export const validateChannelUrl = (url: string, platform: string): boolean => {
  if (!validateUrl(url)) {
    return false;
  }

  const platformPatterns: Record<string, RegExp> = {
    naver: /^https?:\/\/(blog\.naver\.com|m\.blog\.naver\.com)\/.+/,
    youtube: /^https?:\/\/(www\.)?youtube\.com\/@.+/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
    threads: /^https?:\/\/(www\.)?threads\.net\/@.+/,
  };

  const pattern = platformPatterns[platform];
  return pattern ? pattern.test(url) : false;
};

/**
 * 사업자등록번호 검증 (10자리 숫자)
 */
export const validateBusinessNumber = (number: string): boolean => {
  // 하이픈 제거
  const cleaned = number.replace(/-/g, '');

  // 10자리 숫자 검증
  if (!/^\d{10}$/.test(cleaned)) {
    return false;
  }

  // 체크섬 알고리즘 (선택적)
  const digits = cleaned.split('').map(Number);
  const checkDigit = digits[9];
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights[i];
  }

  sum += Math.floor((digits[8] * 5) / 10);
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return checkDigit === calculatedCheckDigit;
};

/**
 * 사업자등록번호 포맷팅 (123-45-67890)
 */
export const formatBusinessNumber = (number: string): string => {
  const cleaned = number.replace(/\D/g, '');

  if (cleaned.length <= 3) {
    return cleaned;
  }

  if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
};