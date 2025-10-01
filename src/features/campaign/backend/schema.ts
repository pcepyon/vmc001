import { z } from 'zod';

// 캠페인 목록 조회 쿼리 파라미터
export const CampaignListQuerySchema = z.object({
  status: z.enum(['recruiting', 'closed', 'selection_complete']).default('recruiting'),
  category: z.string().optional(),
  location: z.string().optional(),
  sort: z.enum(['latest', 'deadline_soon', 'popular']).default('latest'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CampaignListQuery = z.infer<typeof CampaignListQuerySchema>;

// 캠페인 요약 정보 (목록용)
export const CampaignSummarySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
  recruitmentEndDate: z.string(),
  recruitmentCount: z.number().int().positive(),
  applicationCount: z.number().int().nonnegative(),
  thumbnail: z.string().url().nullable(),
  status: z.enum(['recruiting', 'closed', 'selection_complete']),
  benefits: z.string().optional(),
  businessName: z.string().optional(),
  createdAt: z.string(),
});

export type CampaignSummary = z.infer<typeof CampaignSummarySchema>;

// 캠페인 목록 응답
export const CampaignListResponseSchema = z.object({
  campaigns: z.array(CampaignSummarySchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  }),
});

export type CampaignListResponse = z.infer<typeof CampaignListResponseSchema>;

// 캠페인 상세 정보
export const CampaignDetailSchema = z.object({
  id: z.string().uuid(),
  advertiserId: z.string().uuid(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
  recruitmentStartDate: z.string(),
  recruitmentEndDate: z.string(),
  recruitmentCount: z.number().int().positive(),
  applicationCount: z.number().int().nonnegative(),
  benefits: z.string(),
  storeInfo: z.string(),
  mission: z.string(),
  images: z.array(z.string().url()).nullable(),
  status: z.enum(['recruiting', 'closed', 'selection_complete']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CampaignDetail = z.infer<typeof CampaignDetailSchema>;

// DB Row 스키마
export const CampaignTableRowSchema = z.object({
  id: z.string().uuid(),
  advertiser_id: z.string().uuid(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
  recruitment_start_date: z.string(),
  recruitment_end_date: z.string(),
  recruitment_count: z.number().int().positive(),
  benefits: z.string(),
  store_info: z.string(),
  mission: z.string(),
  images: z.array(z.string()).nullable(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CampaignRow = z.infer<typeof CampaignTableRowSchema>;

// 내 체험단 목록 조회 쿼리
export const MyCampaignsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type MyCampaignsQuery = z.infer<typeof MyCampaignsQuerySchema>;

// 내 체험단 항목
export const MyCampaignItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: z.enum(['recruiting', 'closed', 'selection_complete']),
  recruitmentCount: z.number().int().positive(),
  applicationCount: z.number().int().nonnegative(),
  recruitmentStartDate: z.string(),
  recruitmentEndDate: z.string(),
  category: z.string(),
  location: z.string(),
  createdAt: z.string(),
});

export type MyCampaignItem = z.infer<typeof MyCampaignItemSchema>;

// 내 체험단 목록 응답
export const MyCampaignsResponseSchema = z.object({
  campaigns: z.array(MyCampaignItemSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  }),
});

export type MyCampaignsResponse = z.infer<typeof MyCampaignsResponseSchema>;

// 체험단 등록 요청
export const CreateCampaignRequestSchema = z.object({
  title: z.string().min(1, { message: '체험단명은 필수입니다.' }),
  recruitmentStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '모집 시작일은 YYYY-MM-DD 형식이어야 합니다.' }),
  recruitmentEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: '모집 종료일은 YYYY-MM-DD 형식이어야 합니다.' }),
  recruitmentCount: z.number().int().positive({ message: '모집인원은 1명 이상이어야 합니다.' }),
  benefits: z.string().min(1, { message: '제공혜택은 필수입니다.' }),
  storeInfo: z.string().min(1, { message: '매장정보는 필수입니다.' }),
  mission: z.string().min(1, { message: '미션은 필수입니다.' }),
  category: z.string().min(1, { message: '카테고리는 필수입니다.' }),
  location: z.string().min(1, { message: '위치는 필수입니다.' }),
  images: z.array(z.string().url()).optional(),
});

export type CreateCampaignRequest = z.infer<typeof CreateCampaignRequestSchema>;

// 체험단 등록 응답
export const CreateCampaignResponseSchema = z.object({
  campaignId: z.string().uuid(),
  status: z.literal('recruiting'),
});

export type CreateCampaignResponse = z.infer<typeof CreateCampaignResponseSchema>;

// 모집종료 응답
export const CloseCampaignResponseSchema = z.object({
  campaignId: z.string().uuid(),
  status: z.literal('closed'),
});

export type CloseCampaignResponse = z.infer<typeof CloseCampaignResponseSchema>;