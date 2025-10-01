-- =====================================================
-- 체험단 테스트용 더미 데이터 삽입 스크립트
-- =====================================================
-- 이 스크립트는 개발 및 테스트 환경에서만 실행하세요!
-- 운영 환경에서는 실행하지 마세요!
-- =====================================================
-- 실행 전 필수 확인사항:
-- 1. 먼저 아래 쿼리로 기존 광고주 ID를 확인하세요:
--    SELECT ap.id, u.name, ap.business_name
--    FROM advertiser_profiles ap
--    JOIN users u ON ap.user_id = u.id;
--
-- 2. 확인된 advertiser_id를 아래 INSERT 문의
--    (SELECT id FROM advertiser_profiles LIMIT 1) 부분에 직접 입력하거나
--    서브쿼리를 그대로 사용하세요
-- =====================================================

BEGIN;

-- campaigns 테이블에 체험단 데이터 추가
-- 첫 번째 광고주의 체험단들 (서브쿼리로 자동 선택)
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '강남 프리미엄 스테이크 체험단 모집' as title,
    '음식점' as category,
    '서울 강남구' as location,
    CURRENT_DATE - INTERVAL '7 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '7 days' as recruitment_end_date,
    10 as recruitment_count,
    '2인 스테이크 세트 무료 제공 (12만원 상당)' as benefits,
    '서울 강남구 테헤란로 123, 영업시간: 11:00-22:00, 주차 가능' as store_info,
    '방문 후 인스타그램에 5장 이상 사진과 함께 솔직한 리뷰 작성' as mission,
    ARRAY['https://picsum.photos/seed/steak1/800/600', 'https://picsum.photos/seed/steak2/800/600'] as images,
    'recruiting' as status,
    id as advertiser_id,
    NOW() - INTERVAL '7 days' as created_at,
    NOW() as updated_at
FROM advertiser_profiles
WHERE business_name ILIKE '%restaurant%' OR business_name ILIKE '%식당%' OR business_name ILIKE '%갈비%'
LIMIT 1;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '이탈리안 파스타 신메뉴 체험단' as title,
    '음식점' as category,
    '서울 강남구' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    8 as recruitment_count,
    '파스타 2종 + 디저트 무료 제공' as benefits,
    '서울 강남구 역삼동 234-5, 영업시간: 11:30-21:30' as store_info,
    '네이버 블로그 또는 인스타그램 상세 리뷰 필수' as mission,
    ARRAY['https://picsum.photos/seed/pasta1/800/600', 'https://picsum.photos/seed/pasta2/800/600'] as images,
    'recruiting' as status,
    id as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at
FROM advertiser_profiles
LIMIT 1;

-- 카페 체험단들
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '성수동 감성 카페 디저트 체험단' as title,
    '카페' as category,
    '서울 성동구' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    6 as recruitment_count,
    '시그니처 음료 2종 + 케이크 세트' as benefits,
    '서울 성동구 성수동 456-7, 영업시간: 09:00-22:00' as store_info,
    '카페 인테리어와 메뉴 사진 필수, 분위기 있는 사진 촬영' as mission,
    ARRAY['https://picsum.photos/seed/cafe1/800/600', 'https://picsum.photos/seed/cafe2/800/600', 'https://picsum.photos/seed/cafe3/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles WHERE category = '카페' OR business_name ILIKE '%카페%' OR business_name ILIKE '%coffee%' LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at
WHERE EXISTS (SELECT 1 FROM advertiser_profiles WHERE category = '카페' OR business_name ILIKE '%카페%' OR business_name ILIKE '%coffee%');

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '브런치 카페 신메뉴 체험단' as title,
    '카페' as category,
    '서울 마포구' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '5 days' as recruitment_end_date,
    5 as recruitment_count,
    '브런치 세트 + 커피 무료 제공' as benefits,
    '서울 마포구 연남동 123-4, 영업시간: 08:00-20:00, 주말 가능' as store_info,
    '브런치 메뉴 상세 리뷰 및 인스타그램 릴스 제작' as mission,
    ARRAY['https://picsum.photos/seed/brunch1/800/600', 'https://picsum.photos/seed/brunch2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

-- 뷰티 체험단들
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '강남 네일아트 체험단 모집' as title,
    '뷰티' as category,
    '서울 서초구' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '6 days' as recruitment_end_date,
    7 as recruitment_count,
    '젤네일 아트 + 패디큐어 무료 시술' as benefits,
    '서울 서초구 강남대로 789, 영업시간: 10:00-20:00, 예약 필수' as store_info,
    '시술 전후 사진 및 과정 사진 촬영, 인스타그램 스토리 필수' as mission,
    ARRAY['https://picsum.photos/seed/nail1/800/600', 'https://picsum.photos/seed/nail2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles WHERE category = '뷰티' OR business_name ILIKE '%뷰티%' OR business_name ILIKE '%살롱%' LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at
WHERE EXISTS (SELECT 1 FROM advertiser_profiles WHERE category = '뷰티' OR business_name ILIKE '%뷰티%' OR business_name ILIKE '%살롱%');

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '헤어살롱 펌 & 염색 체험단' as title,
    '뷰티' as category,
    '서울 강남구' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '8 days' as recruitment_end_date,
    5 as recruitment_count,
    '커트 + 펌 또는 염색 무료 (선택)' as benefits,
    '서울 강남구 신사동 234-5, 영업시간: 10:00-21:00' as store_info,
    '변신 전후 사진 필수, 스타일링 과정 스토리 업로드' as mission,
    ARRAY['https://picsum.photos/seed/hair1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

-- 기타 체험단들
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '홍대 신상 술집 체험단' as title,
    '음식점' as category,
    '서울 마포구' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    12 as recruitment_count,
    '안주 3종 + 주류 무제한 제공 (2시간)' as benefits,
    '서울 마포구 홍대입구역 3번출구, 영업시간: 17:00-02:00' as store_info,
    '분위기 사진과 안주 사진 필수, 솔직한 리뷰 작성' as mission,
    ARRAY['https://picsum.photos/seed/bar1/800/600', 'https://picsum.photos/seed/bar2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '강북 맛집 족발&보쌈 체험단' as title,
    '음식점' as category,
    '서울 성북구' as location,
    CURRENT_DATE - INTERVAL '6 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '4 days' as recruitment_end_date,
    8 as recruitment_count,
    '족발보쌈 세트 (대) 무료 제공' as benefits,
    '서울 성북구 성신여대입구역, 영업시간: 16:00-24:00, 포장 가능' as store_info,
    '메뉴 사진과 매장 분위기 촬영, 블로그 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jokbal1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '6 days' as created_at,
    NOW() as updated_at;

-- 모집 종료된 체험단 예시
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '[종료] 이태원 브런치 체험단' as title,
    '카페' as category,
    '서울 용산구' as location,
    CURRENT_DATE - INTERVAL '20 days' as recruitment_start_date,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_end_date,
    5 as recruitment_count,
    '브런치 2인 세트' as benefits,
    '서울 용산구 이태원동 123' as store_info,
    '브런치 리뷰 작성' as mission,
    ARRAY['https://picsum.photos/seed/closed1/800/600'] as images,
    'closed' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '20 days' as created_at,
    NOW() - INTERVAL '5 days' as updated_at;

-- 선정 완료된 체험단 예시
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '[선정완료] 을지로 와인바 체험단' as title,
    '음식점' as category,
    '서울 중구' as location,
    CURRENT_DATE - INTERVAL '30 days' as recruitment_start_date,
    CURRENT_DATE - INTERVAL '15 days' as recruitment_end_date,
    3 as recruitment_count,
    '와인 2병 + 안주 세트' as benefits,
    '서울 중구 을지로3가' as store_info,
    '와인바 분위기와 메뉴 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/wine1/800/600'] as images,
    'selection_complete' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '30 days' as created_at,
    NOW() - INTERVAL '10 days' as updated_at;

COMMIT;

-- =====================================================
-- 데이터 확인용 쿼리
-- =====================================================
-- 생성된 체험단 확인
SELECT
    c.title,
    c.category,
    c.location,
    c.status,
    c.recruitment_count,
    c.recruitment_end_date,
    ap.business_name as advertiser_name
FROM campaigns c
LEFT JOIN advertiser_profiles ap ON c.advertiser_id = ap.id
ORDER BY c.created_at DESC;

-- 모집 중인 체험단만 확인
SELECT COUNT(*) as recruiting_campaigns
FROM campaigns
WHERE status = 'recruiting'
  AND recruitment_end_date >= CURRENT_DATE;