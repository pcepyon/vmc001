import { differenceInYears, format, parse } from 'date-fns';

/**
 * 생년월일로부터 나이 계산
 */
export const calculateAge = (birthDate: string): number => {
  const birth = parse(birthDate, 'yyyy-MM-dd', new Date());
  return differenceInYears(new Date(), birth);
};

/**
 * 날짜 포맷팅
 */
export const formatDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr);
};

/**
 * 날짜 형식 검증 (YYYY-MM-DD)
 */
export const isValidDateFormat = (dateStr: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    return false;
  }

  try {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return formatDate(parsed, 'yyyy-MM-dd') === dateStr;
  } catch {
    return false;
  }
};