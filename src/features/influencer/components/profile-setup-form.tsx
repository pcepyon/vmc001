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
  CreateInfluencerProfileRequestSchema,
  type CreateInfluencerProfileRequest,
} from '../lib/dto';
import { useCreateProfile } from '../hooks/useCreateProfile';
import { ChannelListEditor } from './channel-list-editor';

export const ProfileSetupForm = () => {
  const createProfileMutation = useCreateProfile();

  const form = useForm<CreateInfluencerProfileRequest>({
    resolver: zodResolver(CreateInfluencerProfileRequestSchema),
    defaultValues: {
      birthDate: '',
      channels: [
        {
          platform: 'naver',
          channelName: '',
          channelUrl: '',
        },
      ],
    },
  });

  const onSubmit = (data: CreateInfluencerProfileRequest) => {
    createProfileMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 생년월일 */}
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>생년월일</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 채널 목록 */}
        <FormField
          control={form.control}
          name="channels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SNS 채널</FormLabel>
              <FormControl>
                <ChannelListEditor
                  value={field.value}
                  onChange={field.onChange}
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