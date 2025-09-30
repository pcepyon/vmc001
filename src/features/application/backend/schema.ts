import { z } from 'zod';

// 지원 여부 확인 쿼리
export const ApplicationCheckQuerySchema = z.object({
  campaignId: z.string().uuid({ message: 'Campaign ID must be a valid UUID.' }),
});

export type ApplicationCheckQuery = z.infer<typeof ApplicationCheckQuerySchema>;

// 지원 여부 확인 응답
export const ApplicationCheckResponseSchema = z.object({
  applied: z.boolean(),
  status: z.enum(['applied', 'selected', 'rejected']).optional(),
});

export type ApplicationCheckResponse = z.infer<typeof ApplicationCheckResponseSchema>;

// 지원 생성 요청
export const CreateApplicationRequestSchema = z.object({
  campaignId: z.string().uuid({ message: 'Campaign ID must be a valid UUID.' }),
  message: z.string().min(10, { message: '각오 한마디는 최소 10자 이상 입력해 주세요.' }),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '방문 예정일자는 YYYY-MM-DD 형식이어야 합니다.' }),
});

export type CreateApplicationRequest = z.infer<typeof CreateApplicationRequestSchema>;

// 지원 생성 응답
export const CreateApplicationResponseSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.literal('applied'),
  createdAt: z.string(),
});

export type CreateApplicationResponse = z.infer<typeof CreateApplicationResponseSchema>;

// DB Row 스키마
export const ApplicationTableRowSchema = z.object({
  id: z.string().uuid(),
  campaign_id: z.string().uuid(),
  influencer_id: z.string().uuid(),
  message: z.string(),
  visit_date: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ApplicationRow = z.infer<typeof ApplicationTableRowSchema>;

// 내 지원 목록 조회 쿼리
export const MyApplicationsQuerySchema = z.object({
  status: z.enum(['all', 'applied', 'selected', 'rejected']).default('all'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type MyApplicationsQuery = z.infer<typeof MyApplicationsQuerySchema>;

// 개별 지원 항목
export const ApplicationItemSchema = z.object({
  id: z.string().uuid(),
  campaignId: z.string().uuid(),
  campaignTitle: z.string(),
  campaignImage: z.string().url().nullable(),
  campaignCategory: z.string(),
  campaignLocation: z.string(),
  message: z.string(),
  visitDate: z.string(),
  status: z.enum(['applied', 'selected', 'rejected']),
  createdAt: z.string(),
});

export type ApplicationItem = z.infer<typeof ApplicationItemSchema>;

// 내 지원 목록 응답
export const MyApplicationsResponseSchema = z.object({
  applications: z.array(ApplicationItemSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  }),
});

export type MyApplicationsResponse = z.infer<typeof MyApplicationsResponseSchema>;

// 지원자 정보 (광고주용)
export const ApplicantSchema = z.object({
  applicationId: z.string().uuid(),
  influencerId: z.string().uuid(),
  influencerName: z.string(),
  influencerEmail: z.string().email(),
  influencerPhone: z.string(),
  influencerChannels: z.array(z.object({
    platform: z.enum(['naver', 'youtube', 'instagram', 'threads']),
    channelName: z.string(),
    channelUrl: z.string().url(),
    verificationStatus: z.enum(['pending', 'verified', 'failed']),
  })),
  message: z.string(),
  visitDate: z.string(),
  status: z.enum(['applied', 'selected', 'rejected']),
  createdAt: z.string(),
});

export type Applicant = z.infer<typeof ApplicantSchema>;

// 지원자 목록 응답
export const ApplicantsResponseSchema = z.object({
  applicants: z.array(ApplicantSchema),
});

export type ApplicantsResponse = z.infer<typeof ApplicantsResponseSchema>;

// 지원자 선정 요청
export const SelectApplicantsRequestSchema = z.object({
  selectedApplicationIds: z.array(z.string().uuid()).min(1, { message: '최소 1명의 지원자를 선택해야 합니다.' }),
});

export type SelectApplicantsRequest = z.infer<typeof SelectApplicantsRequestSchema>;

// 지원자 선정 응답
export const SelectApplicantsResponseSchema = z.object({
  selectedCount: z.number().int().nonnegative(),
  rejectedCount: z.number().int().nonnegative(),
});

export type SelectApplicantsResponse = z.infer<typeof SelectApplicantsResponseSchema>;