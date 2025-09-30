# 데이터베이스 스키마 & 데이터플로우

## 데이터플로우 (간략)

### 1. 회원가입 & 역할 분기
```
사용자 입력 → Supabase Auth (계정 생성)
           → users 테이블 (공통 프로필)
           → 역할 분기 → influencer_profiles OR advertiser_profiles
```

### 2. 체험단 등록 (광고주)
```
광고주 → campaigns 테이블 INSERT (상태=모집중)
```

### 3. 체험단 지원 (인플루언서)
```
인플루언서 → applications 테이블 INSERT (상태=신청완료)
           → campaigns의 지원자 수 카운트 증가
```

### 4. 모집 종료 & 선정
```
광고주 → campaigns 상태 변경 (모집중 → 모집종료 → 선정완료)
       → applications 상태 변경 (선정된 지원자만 '선정', 나머지 '반려')
```

### 5. 조회 플로우
```
홈: campaigns (status=모집중) 조회
내 지원 목록: applications (user_id) 조회
체험단 관리: campaigns (advertiser_id) 조회
신청자 리스트: applications (campaign_id) 조회
```

---

## 데이터베이스 스키마 (PostgreSQL)

### 1. users (공통 사용자)
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('influencer', 'advertiser')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**설명:**
- Supabase Auth와 연동하는 공통 사용자 테이블
- `auth_id`: Supabase auth.users의 id를 참조
- `role`: 인플루언서/광고주 역할 구분

---

### 2. influencer_profiles
```sql
CREATE TABLE IF NOT EXISTS influencer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**설명:**
- 인플루언서 전용 프로필
- 생년월일 저장

---

### 3. influencer_channels (SNS 채널)
```sql
CREATE TABLE IF NOT EXISTS influencer_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id UUID NOT NULL REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('naver', 'youtube', 'instagram', 'threads')),
  channel_name TEXT NOT NULL,
  channel_url TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_influencer_channels_influencer_id ON influencer_channels(influencer_id);
```

**설명:**
- 인플루언서의 SNS 채널 정보
- 한 명의 인플루언서가 여러 채널을 등록 가능 (1:N)
- `verification_status`: 채널 검증 상태

---

### 4. advertiser_profiles
```sql
CREATE TABLE IF NOT EXISTS advertiser_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  business_registration_number TEXT NOT NULL UNIQUE,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**설명:**
- 광고주 전용 프로필
- 사업자등록번호는 중복 불가 (UNIQUE)
- `verification_status`: 사업자 검증 상태

---

### 5. campaigns (체험단)
```sql
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_id UUID NOT NULL REFERENCES advertiser_profiles(id) ON DELETE CASCADE,
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
CREATE INDEX idx_campaigns_advertiser_id ON campaigns(advertiser_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_category ON campaigns(category);
CREATE INDEX idx_campaigns_location ON campaigns(location);
CREATE INDEX idx_campaigns_recruitment_end_date ON campaigns(recruitment_end_date);
```

**설명:**
- 광고주가 등록한 체험단
- `category`: 업체 카테고리 (예: 음식점, 카페, 뷰티 등)
- `location`: 업체 위치/지역
- `images`: 체험단 이미지 URL 배열 (선택적)
- `status`: recruiting(모집중) → closed(모집종료) → selection_complete(선정완료)
- 홈 화면에서 status='recruiting'인 체험단만 표시
- 인덱스: 필터링(category, location) 및 정렬(recruitment_end_date) 최적화

---

### 6. applications (지원)
```sql
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  visit_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'selected', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(campaign_id, influencer_id)
);
CREATE INDEX idx_applications_campaign_id ON applications(campaign_id);
CREATE INDEX idx_applications_influencer_id ON applications(influencer_id);
CREATE INDEX idx_applications_status ON applications(status);
```

**설명:**
- 인플루언서의 체험단 지원 정보
- `message`: 각오 한마디
- `visit_date`: 방문 예정일자
- `status`: applied(신청완료) → selected(선정) / rejected(반려)
- UNIQUE 제약으로 동일 체험단에 중복 지원 방지

---

### 7. terms_agreements (약관 동의)
```sql
CREATE TABLE IF NOT EXISTS terms_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  terms_type TEXT NOT NULL,
  agreed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_terms_agreements_user_id ON terms_agreements(user_id);
```

**설명:**
- 회원가입 시 약관 동의 이력
- `terms_type`: 서비스 이용약관, 개인정보 처리방침 등

---

## 테이블 간 관계

```
auth.users (Supabase Auth)
    ↓
  users (role: influencer | advertiser)
    ├─→ influencer_profiles
    │       ↓
    │   influencer_channels (1:N)
    │       ↓
    │   applications (N:M with campaigns)
    │
    ├─→ advertiser_profiles
    │       ↓
    │   campaigns (1:N)
    │       ↓
    │   applications (N:M with influencer_profiles)
    │
    └─→ terms_agreements (1:N)
```

---

## 주요 쿼리 패턴

### 홈: 모집 중인 체험단 목록 (필터링 포함)
```sql
SELECT
  c.*,
  COUNT(a.id) as application_count
FROM campaigns c
LEFT JOIN applications a ON c.id = a.campaign_id
WHERE c.status = 'recruiting'
  AND c.recruitment_end_date >= CURRENT_DATE
  AND (c.category = ? OR ? IS NULL)  -- 카테고리 필터 (선택적)
  AND (c.location = ? OR ? IS NULL)  -- 지역 필터 (선택적)
GROUP BY c.id
ORDER BY
  CASE
    WHEN ? = 'latest' THEN c.created_at
    WHEN ? = 'deadline_soon' THEN c.recruitment_end_date
    ELSE c.created_at
  END DESC;
```

### 내 지원 목록 (인플루언서)
```sql
SELECT
  a.*,
  c.title,
  c.category,
  c.location,
  c.status as campaign_status
FROM applications a
JOIN campaigns c ON a.campaign_id = c.id
WHERE a.influencer_id = ?
  AND (a.status = ? OR ? = 'all')  -- 상태 필터 (선택적)
ORDER BY a.created_at DESC;
```

### 체험단 관리 (광고주)
```sql
SELECT
  c.*,
  COUNT(a.id) as application_count
FROM campaigns c
LEFT JOIN applications a ON c.id = a.campaign_id
WHERE c.advertiser_id = ?
GROUP BY c.id
ORDER BY c.created_at DESC;
```

### 신청자 리스트 (광고주 체험단 상세)
```sql
SELECT
  a.*,
  u.name,
  u.email,
  u.phone,
  ip.id as influencer_id,
  json_agg(
    json_build_object(
      'platform', ic.platform,
      'channel_name', ic.channel_name,
      'channel_url', ic.channel_url,
      'verification_status', ic.verification_status
    )
  ) as channels
FROM applications a
JOIN influencer_profiles ip ON a.influencer_id = ip.id
JOIN users u ON ip.user_id = u.id
LEFT JOIN influencer_channels ic ON ip.id = ic.influencer_id
WHERE a.campaign_id = ?
GROUP BY a.id, u.id, u.name, u.email, u.phone, ip.id
ORDER BY a.created_at DESC;
```