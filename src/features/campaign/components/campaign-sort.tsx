'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CampaignSortProps {
  value: 'latest' | 'deadline_soon' | 'popular';
  onChange: (sort: 'latest' | 'deadline_soon' | 'popular') => void;
}

export const CampaignSort = ({ value, onChange }: CampaignSortProps) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as 'latest' | 'deadline_soon' | 'popular')}
    >
      <SelectTrigger className="w-full sm:w-[200px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="deadline_soon">마감임박순</SelectItem>
        <SelectItem value="popular">인기순</SelectItem>
      </SelectContent>
    </Select>
  );
};