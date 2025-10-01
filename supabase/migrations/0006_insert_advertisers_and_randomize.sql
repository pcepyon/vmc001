-- =====================================================
-- 광고주 더미 데이터 추가 및 체험단 광고주 랜덤 배정
-- =====================================================
-- 1. 광고주 계정 5개 추가
-- 2. 기존 체험단들의 광고주를 랜덤하게 재배정
-- =====================================================

BEGIN;

-- Step 1: 광고주 사용자 5명 추가 (users 테이블)
INSERT INTO users (auth_id, role, name, phone, email, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'advertiser', '김대표', '010-1111-2222', 'kim.ceo@restaurant.com', NOW() - INTERVAL '40 days', NOW()),
  (gen_random_uuid(), 'advertiser', '이사장', '010-2222-3333', 'lee.owner@cafe.com', NOW() - INTERVAL '35 days', NOW()),
  (gen_random_uuid(), 'advertiser', '박원장', '010-3333-4444', 'park.director@beauty.com', NOW() - INTERVAL '30 days', NOW()),
  (gen_random_uuid(), 'advertiser', '최대표', '010-4444-5555', 'choi.ceo@fitness.com', NOW() - INTERVAL '25 days', NOW()),
  (gen_random_uuid(), 'advertiser', '정사장', '010-5555-6666', 'jung.president@fashion.com', NOW() - INTERVAL '20 days', NOW())
ON CONFLICT (auth_id) DO NOTHING;

-- Step 2: 광고주 프로필 5개 추가 (advertiser_profiles 테이블)
WITH new_advertisers AS (
  SELECT u.id as user_id, u.name
  FROM users u
  WHERE u.role = 'advertiser'
    AND u.email IN ('kim.ceo@restaurant.com', 'lee.owner@cafe.com', 'park.director@beauty.com', 'choi.ceo@fitness.com', 'jung.president@fashion.com')
)
INSERT INTO advertiser_profiles (user_id, business_name, location, category, business_registration_number, verification_status, created_at, updated_at)
SELECT
  user_id,
  CASE name
    WHEN '김대표' THEN '김가네 레스토랑'
    WHEN '이사장' THEN '이디야 카페'
    WHEN '박원장' THEN '박씨네 뷰티살롱'
    WHEN '최대표' THEN '최강 피트니스'
    WHEN '정사장' THEN '정품 패션'
  END as business_name,
  CASE name
    WHEN '김대표' THEN '서울 강남구'
    WHEN '이사장' THEN '부산 해운대구'
    WHEN '박원장' THEN '대구 중구'
    WHEN '최대표' THEN '인천 연수구'
    WHEN '정사장' THEN '광주 서구'
  END as location,
  CASE name
    WHEN '김대표' THEN 'restaurant'
    WHEN '이사장' THEN 'cafe'
    WHEN '박원장' THEN 'beauty'
    WHEN '최대표' THEN 'health'
    WHEN '정사장' THEN 'fashion'
  END as category,
  CASE name
    WHEN '김대표' THEN '111-22-33333'
    WHEN '이사장' THEN '222-33-44444'
    WHEN '박원장' THEN '333-44-55555'
    WHEN '최대표' THEN '444-55-66666'
    WHEN '정사장' THEN '555-66-77777'
  END as business_registration_number,
  'verified' as verification_status,
  CASE name
    WHEN '김대표' THEN NOW() - INTERVAL '40 days'
    WHEN '이사장' THEN NOW() - INTERVAL '35 days'
    WHEN '박원장' THEN NOW() - INTERVAL '30 days'
    WHEN '최대표' THEN NOW() - INTERVAL '25 days'
    WHEN '정사장' THEN NOW() - INTERVAL '20 days'
  END as created_at,
  NOW() as updated_at
FROM new_advertisers
ON CONFLICT (user_id) DO NOTHING;

-- Step 3: 기존 체험단들의 광고주를 랜덤하게 재배정
-- 먼저 광고주 ID 목록을 가져옴
WITH advertiser_list AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY RANDOM()) as rn
  FROM advertiser_profiles
  WHERE verification_status = 'verified'
),
campaign_list AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY RANDOM()) as rn,
         COUNT(*) OVER () as total_campaigns
  FROM campaigns
),
advertiser_count AS (
  SELECT COUNT(*) as total_advertisers
  FROM advertiser_profiles
  WHERE verification_status = 'verified'
)
UPDATE campaigns c
SET advertiser_id = al.id
FROM campaign_list cl
JOIN advertiser_list al ON (cl.rn - 1) % (SELECT total_advertisers FROM advertiser_count) + 1 = al.rn
WHERE c.id = cl.id;

-- Step 4: 카테고리별로 적절한 광고주 매칭 (선택적 - 더 현실적인 배정)
-- restaurant 카테고리 체험단은 restaurant 광고주에게
UPDATE campaigns c
SET advertiser_id = (
  SELECT id FROM advertiser_profiles
  WHERE category = c.category
  ORDER BY RANDOM()
  LIMIT 1
)
WHERE EXISTS (
  SELECT 1 FROM advertiser_profiles WHERE category = c.category
);

COMMIT;

-- =====================================================
-- 확인용 쿼리
-- =====================================================
-- 광고주별 체험단 수 확인
-- SELECT
--   ap.business_name,
--   ap.category,
--   COUNT(c.id) as campaign_count
-- FROM advertiser_profiles ap
-- LEFT JOIN campaigns c ON ap.id = c.advertiser_id
-- GROUP BY ap.id, ap.business_name, ap.category
-- ORDER BY campaign_count DESC;

-- 카테고리별 매칭 확인
-- SELECT
--   c.category as campaign_category,
--   ap.category as advertiser_category,
--   COUNT(*) as count
-- FROM campaigns c
-- JOIN advertiser_profiles ap ON c.advertiser_id = ap.id
-- GROUP BY c.category, ap.category
-- ORDER BY c.category, ap.category;