'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useCreateApplication } from '../hooks/useCreateApplication';
import type { CampaignDetail } from '@/features/campaign/lib/dto';
import { Loader2 } from 'lucide-react';

const applyFormSchema = z.object({
  message: z.string().min(10, { message: '각오 한마디는 최소 10자 이상 입력해 주세요.' }),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '올바른 날짜 형식을 입력해 주세요.' }),
});

type ApplyFormData = z.infer<typeof applyFormSchema>;

interface ApplyFormProps {
  campaignId: string;
  campaign: CampaignDetail;
}

export const ApplyForm = ({ campaignId, campaign }: ApplyFormProps) => {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const form = useForm<ApplyFormData>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      message: '',
      visitDate: '',
    },
  });

  const onSubmit = (data: ApplyFormData) => {
    createApplication({
      campaignId,
      message: data.message,
      visitDate: data.visitDate,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>각오 한마디</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="체험단에 지원하는 이유와 각오를 10자 이상 작성해 주세요."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                최소 10자 이상 입력해 주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visitDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>방문 예정일자</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={campaign.recruitmentStartDate}
                  max={campaign.recruitmentEndDate}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                체험 가능 기간 내에서 선택해 주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          지원하기
        </Button>
      </form>
    </Form>
  );
};