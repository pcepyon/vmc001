'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  CreateAdvertiserProfileRequestSchema,
  type CreateAdvertiserProfileRequest,
} from '../lib/dto';
import { useCreateAdvertiserProfile } from '../hooks/useCreateAdvertiserProfile';
import { BusinessRegistrationInput } from './business-registration-input';
import { CategorySelector } from './category-selector';

export const ProfileSetupForm = () => {
  const createProfileMutation = useCreateAdvertiserProfile();

  const form = useForm<CreateAdvertiserProfileRequest>({
    resolver: zodResolver(CreateAdvertiserProfileRequestSchema),
    defaultValues: {
      businessName: '',
      location: '',
      category: undefined,
      businessRegistrationNumber: '',
    },
  });

  const onSubmit = (data: CreateAdvertiserProfileRequest) => {
    createProfileMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 업체명 */}
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>업체명</FormLabel>
              <FormControl>
                <Input placeholder="업체명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 위치 */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>위치</FormLabel>
              <FormControl>
                <Input placeholder="서울시 강남구" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 카테고리 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <FormControl>
                <CategorySelector
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 사업자등록번호 */}
        <FormField
          control={form.control}
          name="businessRegistrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사업자등록번호</FormLabel>
              <FormControl>
                <BusinessRegistrationInput
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.businessRegistrationNumber?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          className="w-full"
          disabled={createProfileMutation.isPending}
        >
          {createProfileMutation.isPending ? '처리 중...' : '프로필 등록'}
        </Button>
      </form>
    </Form>
  );
};