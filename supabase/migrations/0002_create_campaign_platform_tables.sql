-- Migration: Create campaign platform core tables
-- Description: Users, profiles, campaigns, applications, channels, and terms agreements

-- Ensure pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. users (Common user table)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('influencer', 'advertiser')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.users IS '공통 사용자 테이블: Supabase Auth와 연동';
COMMENT ON COLUMN public.users.auth_id IS 'Supabase auth.users의 id 참조';
COMMENT ON COLUMN public.users.role IS '역할 구분: influencer | advertiser';

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. influencer_profiles (Influencer-specific profile)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.influencer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.influencer_profiles IS '인플루언서 전용 프로필';
COMMENT ON COLUMN public.influencer_profiles.birth_date IS '생년월일';

ALTER TABLE public.influencer_profiles DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 3. influencer_channels (SNS channels for influencers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.influencer_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id UUID NOT NULL REFERENCES public.influencer_profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('naver', 'youtube', 'instagram', 'threads')),
  channel_name TEXT NOT NULL,
  channel_url TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.influencer_channels IS '인플루언서 SNS 채널 정보 (1:N)';
COMMENT ON COLUMN public.influencer_channels.platform IS '플랫폼: naver | youtube | instagram | threads';
COMMENT ON COLUMN public.influencer_channels.verification_status IS '채널 검증 상태: pending | verified | failed';

CREATE INDEX IF NOT EXISTS idx_influencer_channels_influencer_id ON public.influencer_channels(influencer_id);

ALTER TABLE public.influencer_channels DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. advertiser_profiles (Advertiser-specific profile)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.advertiser_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  business_registration_number TEXT NOT NULL UNIQUE,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.advertiser_profiles IS '광고주 전용 프로필';
COMMENT ON COLUMN public.advertiser_profiles.business_registration_number IS '사업자등록번호 (중복 불가)';
COMMENT ON COLUMN public.advertiser_profiles.verification_status IS '사업자 검증 상태: pending | verified | failed';

ALTER TABLE public.advertiser_profiles DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. campaigns (Campaign/experience group)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_id UUID NOT NULL REFERENCES public.advertiser_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  recruitment_start_date DATE NOT NULL,
  recruitment_end_date DATE NOT NULL,
  recruitment_count INTEGER NOT NULL CHECK (recruitment_count > 0),
  benefits TEXT NOT NULL,
  store_info TEXT NOT NULL,
  mission TEXT NOT NULL,
  images TEXT[],
  status TEXT NOT NULL DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'closed', 'selection_complete')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.campaigns IS '광고주가 등록한 체험단';
COMMENT ON COLUMN public.campaigns.category IS '업체 카테고리 (예: 음식점, 카페, 뷰티 등)';
COMMENT ON COLUMN public.campaigns.location IS '업체 위치/지역';
COMMENT ON COLUMN public.campaigns.images IS '체험단 이미지 URL 배열 (선택적)';
COMMENT ON COLUMN public.campaigns.status IS '상태: recruiting(모집중) | closed(모집종료) | selection_complete(선정완료)';

CREATE INDEX IF NOT EXISTS idx_campaigns_advertiser_id ON public.campaigns(advertiser_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON public.campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_location ON public.campaigns(location);
CREATE INDEX IF NOT EXISTS idx_campaigns_recruitment_end_date ON public.campaigns(recruitment_end_date);

ALTER TABLE public.campaigns DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. applications (Campaign applications)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES public.influencer_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  visit_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'selected', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(campaign_id, influencer_id)
);

COMMENT ON TABLE public.applications IS '인플루언서의 체험단 지원 정보';
COMMENT ON COLUMN public.applications.message IS '각오 한마디';
COMMENT ON COLUMN public.applications.visit_date IS '방문 예정일자';
COMMENT ON COLUMN public.applications.status IS '지원 상태: applied(신청완료) | selected(선정) | rejected(반려)';

CREATE INDEX IF NOT EXISTS idx_applications_campaign_id ON public.applications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_applications_influencer_id ON public.applications(influencer_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

ALTER TABLE public.applications DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 7. terms_agreements (Terms of service agreements)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.terms_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  terms_type TEXT NOT NULL,
  agreed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.terms_agreements IS '회원가입 시 약관 동의 이력';
COMMENT ON COLUMN public.terms_agreements.terms_type IS '약관 유형: 서비스 이용약관, 개인정보 처리방침 등';

CREATE INDEX IF NOT EXISTS idx_terms_agreements_user_id ON public.terms_agreements(user_id);

ALTER TABLE public.terms_agreements DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Trigger: Auto-update updated_at column
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencer_profiles_updated_at BEFORE UPDATE ON public.influencer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencer_channels_updated_at BEFORE UPDATE ON public.influencer_channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_advertiser_profiles_updated_at BEFORE UPDATE ON public.advertiser_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();