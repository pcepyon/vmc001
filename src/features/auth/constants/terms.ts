export type TermType = 'service' | 'privacy' | 'marketing';

export type Term = {
  type: TermType;
  label: string;
  required: boolean;
  url?: string;
};

/**
 * 필수 약관 목록
 */
export const REQUIRED_TERMS: Term[] = [
  {
    type: 'service',
    label: '서비스 이용약관',
    required: true,
    url: '/terms/service',
  },
  {
    type: 'privacy',
    label: '개인정보 처리방침',
    required: true,
    url: '/terms/privacy',
  },
];

/**
 * 선택 약관 목록
 */
export const OPTIONAL_TERMS: Term[] = [
  {
    type: 'marketing',
    label: '마케팅 정보 수신 동의 (선택)',
    required: false,
  },
];

/**
 * 전체 약관 목록
 */
export const ALL_TERMS: Term[] = [...REQUIRED_TERMS, ...OPTIONAL_TERMS];