'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BUSINESS_CATEGORIES } from '@/features/advertiser/constants/categories';

interface CampaignFilterProps {
  value: {
    category?: string;
    location?: string;
  };
  onChange: (filters: { category?: string; location?: string }) => void;
}

const LOCATIONS = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

export const CampaignFilter = ({ value, onChange }: CampaignFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select
        value={value.category || 'all'}
        onValueChange={(val) =>
          onChange({ ...value, category: val === 'all' ? undefined : val })
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 카테고리</SelectItem>
          {BUSINESS_CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={value.location || 'all'}
        onValueChange={(val) =>
          onChange({ ...value, location: val === 'all' ? undefined : val })
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="지역 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 지역</SelectItem>
          {LOCATIONS.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};