-- =====================================================
-- 카테고리 데이터를 한글에서 영어로 변경
-- =====================================================
-- 이 쿼리는 기존 더미 데이터의 카테고리를
-- 실제 애플리케이션에서 사용하는 영어 값으로 변경합니다
-- =====================================================

BEGIN;

-- campaigns 테이블의 카테고리 업데이트
UPDATE campaigns
SET category = CASE
    WHEN category = '음식점' THEN 'restaurant'
    WHEN category = '카페' THEN 'cafe'
    WHEN category = '뷰티' THEN 'beauty'
    WHEN category = '패션' THEN 'fashion'
    WHEN category = '헬스' THEN 'health'
    WHEN category = '교육' THEN 'education'
    WHEN category = '엔터테인먼트' THEN 'entertainment'
    WHEN category = '기타' THEN 'etc'
    ELSE category
END
WHERE category IN ('음식점', '카페', '뷰티', '패션', '헬스', '교육', '엔터테인먼트', '기타');

-- advertiser_profiles 테이블의 카테고리도 업데이트 (있는 경우)
UPDATE advertiser_profiles
SET category = CASE
    WHEN category = '음식점' THEN 'restaurant'
    WHEN category = '카페' THEN 'cafe'
    WHEN category = '뷰티' THEN 'beauty'
    WHEN category = '패션' THEN 'fashion'
    WHEN category = '헬스' THEN 'health'
    WHEN category = '교육' THEN 'education'
    WHEN category = '엔터테인먼트' THEN 'entertainment'
    WHEN category = '기타' THEN 'etc'
    ELSE category
END
WHERE category IN ('음식점', '카페', '뷰티', '패션', '헬스', '교육', '엔터테인먼트', '기타');

COMMIT;

-- 변경 확인용 쿼리
-- SELECT DISTINCT category FROM campaigns;
-- SELECT DISTINCT category FROM advertiser_profiles;