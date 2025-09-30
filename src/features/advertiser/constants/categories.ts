export type BusinessCategory =
  | 'restaurant'
  | 'cafe'
  | 'beauty'
  | 'fashion'
  | 'health'
  | 'education'
  | 'entertainment'
  | 'etc';

export type CategoryInfo = {
  value: BusinessCategory;
  label: string;
};

export const BUSINESS_CATEGORIES: CategoryInfo[] = [
  { value: 'restaurant', label: '음식점' },
  { value: 'cafe', label: '카페' },
  { value: 'beauty', label: '뷰티/미용' },
  { value: 'fashion', label: '패션/의류' },
  { value: 'health', label: '헬스/피트니스' },
  { value: 'education', label: '교육/학원' },
  { value: 'entertainment', label: '엔터테인먼트' },
  { value: 'etc', label: '기타' },
];