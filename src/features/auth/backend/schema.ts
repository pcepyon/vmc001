import { z } from 'zod';

/**
 * 약관 동의 스키마
 */
export const TermsAgreementInputSchema = z.object({
  type: z.string().min(1, '약관 타입은 필수입니다'),
  agreed: z.boolean(),
});

export type TermsAgreementInput = z.infer<typeof TermsAgreementInputSchema>;

/**
 * 회원가입 요청 스키마
 */
export const SignupRequestSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 휴대폰번호 형식이 아닙니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '비밀번호는 최소 1개의 대문자를 포함해야 합니다')
    .regex(/[a-z]/, '비밀번호는 최소 1개의 소문자를 포함해야 합니다')
    .regex(/[0-9]/, '비밀번호는 최소 1개의 숫자를 포함해야 합니다'),
  role: z.enum(['influencer', 'advertiser'], {
    errorMap: () => ({ message: '역할을 선택해야 합니다' }),
  }),
  termsAgreements: z
    .array(TermsAgreementInputSchema)
    .min(1, '약관 동의가 필요합니다'),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;

/**
 * 회원가입 응답 스키마
 */
export const SignupResponseSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['influencer', 'advertiser']),
  redirectUrl: z.string(),
});

export type SignupResponse = z.infer<typeof SignupResponseSchema>;