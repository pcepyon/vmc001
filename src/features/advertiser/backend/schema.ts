import { z } from 'zod';
import { validateBusinessNumber } from '@/lib/validation';

/**
 * 광고주 프로필 생성 요청 스키마
 */
export const CreateAdvertiserProfileRequestSchema = z.object({
  businessName: z.string().min(1, '업체명은 필수입니다'),
  location: z.string().min(1, '위치는 필수입니다'),
  category: z.enum(
    [
      'restaurant',
      'cafe',
      'beauty',
      'fashion',
      'health',
      'education',
      'entertainment',
      'etc',
    ],
    {
      errorMap: () => ({ message: '카테고리를 선택해야 합니다' }),
    },
  ),
  businessRegistrationNumber: z
    .string()
    .refine(
      (val) => validateBusinessNumber(val),
      '올바른 사업자등록번호 형식이 아닙니다',
    ),
});

export type CreateAdvertiserProfileRequest = z.infer<
  typeof CreateAdvertiserProfileRequestSchema
>;

/**
 * 광고주 프로필 생성 응답 스키마
 */
export const CreateAdvertiserProfileResponseSchema = z.object({
  profileId: z.string().uuid(),
  verificationStatus: z.enum(['pending', 'verified', 'failed']),
});

export type CreateAdvertiserProfileResponse = z.infer<
  typeof CreateAdvertiserProfileResponseSchema
>;