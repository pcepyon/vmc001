'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type StatusFilter = 'all' | 'applied' | 'selected' | 'rejected';

interface ApplicationFilterProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'applied', label: '신청완료' },
  { value: 'selected', label: '선정' },
  { value: 'rejected', label: '반려' },
];

export const ApplicationFilter = ({ value, onChange }: ApplicationFilterProps) => {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as StatusFilter)}>
      <TabsList className="grid w-full grid-cols-4 h-auto">
        {FILTER_OPTIONS.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};