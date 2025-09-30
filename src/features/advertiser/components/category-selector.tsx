'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BUSINESS_CATEGORIES, type BusinessCategory } from '../constants/categories';

type CategorySelectorProps = {
  value: string;
  onChange: (value: BusinessCategory) => void;
};

export const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {BUSINESS_CATEGORIES.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};