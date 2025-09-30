import { z } from 'zod';
import { calculateAge, isValidDateFormat } from '@/lib/date';

/**
 * 채널 입력 스키마
 */
export const ChannelInputSchema = z.object({
  platform: z.enum(['naver', 'youtube', 'instagram', 'threads'], {
    errorMap: () => ({ message: '플랫폼을 선택해야 합니다' }),
  }),
  channelName: z.string().min(1, '채널명은 필수입니다'),
  channelUrl: z.string().url('올바른 URL 형식이 아닙니다'),
});

export type ChannelInput = z.infer<typeof ChannelInputSchema>;

/**
 * 인플루언서 프로필 생성 요청 스키마
 */
export const CreateInfluencerProfileRequestSchema = z.object({
  birthDate: z
    .string()
    .refine((val) => isValidDateFormat(val), {
      message: '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)',
    })
    .refine(
      (val) => {
        const age = calculateAge(val);
        return age >= 14;
      },
      {
        message: '만 14세 이상만 가입 가능합니다',
      },
    ),
  channels: z
    .array(ChannelInputSchema)
    .min(1, '최소 1개 이상의 채널을 등록해야 합니다'),
});

export type CreateInfluencerProfileRequest = z.infer<
  typeof CreateInfluencerProfileRequestSchema
>;

/**
 * 채널 응답 스키마
 */
export const ChannelResponseSchema = z.object({
  id: z.string().uuid(),
  platform: z.enum(['naver', 'youtube', 'instagram', 'threads']),
  channelName: z.string(),
  channelUrl: z.string().url(),
  verificationStatus: z.enum(['pending', 'verified', 'failed']),
});

export type ChannelResponse = z.infer<typeof ChannelResponseSchema>;

/**
 * 인플루언서 프로필 생성 응답 스키마
 */
export const CreateInfluencerProfileResponseSchema = z.object({
  profileId: z.string().uuid(),
  channels: z.array(ChannelResponseSchema),
});

export type CreateInfluencerProfileResponse = z.infer<
  typeof CreateInfluencerProfileResponseSchema
>;