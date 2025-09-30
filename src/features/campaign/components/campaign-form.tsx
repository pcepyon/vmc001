'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCampaignRequestSchema, type CreateCampaignRequest } from '../lib/dto';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreateCampaign } from '../hooks/useCreateCampaign';

interface CampaignFormProps {
  onSuccess: () => void;
}

export const CampaignForm = ({ onSuccess }: CampaignFormProps) => {
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const form = useForm<CreateCampaignRequest>({
    resolver: zodResolver(CreateCampaignRequestSchema),
    defaultValues: {
      title: '',
      category: '',
      location: '',
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      recruitmentCount: 1,
      benefits: '',
      storeInfo: '',
      mission: '',
      images: [],
    },
  });

  const onSubmit = (data: CreateCampaignRequest) => {
    createCampaign(data, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>체험단명</FormLabel>
              <FormControl>
                <Input placeholder="체험단명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <Input placeholder="예: 음식점, 카페" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>위치</FormLabel>
                <FormControl>
                  <Input placeholder="예: 서울 강남구" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="recruitmentStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>모집 시작일</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recruitmentEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>모집 종료일</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="recruitmentCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>모집인원</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제공혜택</FormLabel>
              <FormControl>
                <Textarea placeholder="제공할 혜택을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>매장정보</FormLabel>
              <FormControl>
                <Textarea placeholder="매장 위치, 영업시간 등을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>미션</FormLabel>
              <FormControl>
                <Textarea placeholder="체험단 미션을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </form>
    </Form>
  );
};