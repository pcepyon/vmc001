-- =====================================================
-- 전국 지역별 체험단 더미 데이터 추가
-- =====================================================
-- 각 지역별로 다양한 카테고리의 체험단을 생성합니다.
-- 카테고리는 영어로 저장 (restaurant, cafe, beauty 등)
-- =====================================================

BEGIN;

-- 부산 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '해운대 오션뷰 카페 체험단' as title,
    'cafe' as category,
    '부산 해운대구' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '11 days' as recruitment_end_date,
    8 as recruitment_count,
    '시그니처 음료 + 브런치 세트 무료' as benefits,
    '부산 해운대구 해운대해변로 123, 영업시간: 08:00-22:00' as store_info,
    '오션뷰와 함께 카페 분위기 촬영, 인스타그램 피드 업로드' as mission,
    ARRAY['https://picsum.photos/seed/busan1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '부산 전통시장 맛집 체험단' as title,
    'restaurant' as category,
    '부산 중구' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    10 as recruitment_count,
    '밀면 + 돼지국밥 세트 제공' as benefits,
    '부산 중구 자갈치시장 45번길, 영업시간: 09:00-21:00' as store_info,
    '부산 전통음식 상세 리뷰, 블로그 포스팅 필수' as mission,
    ARRAY['https://picsum.photos/seed/busan2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at;

-- 대구 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '동성로 네일아트 체험단' as title,
    'beauty' as category,
    '대구 중구' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    6 as recruitment_count,
    '젤네일 풀세트 + 패디큐어 무료' as benefits,
    '대구 중구 동성로 234, 영업시간: 10:00-20:00' as store_info,
    '시술 전후 사진 및 디자인 상세 촬영' as mission,
    ARRAY['https://picsum.photos/seed/daegu1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '대구 막창 맛집 체험단' as title,
    'restaurant' as category,
    '대구 수성구' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    12 as recruitment_count,
    '막창 2인분 + 음료 무제한' as benefits,
    '대구 수성구 범어동 567, 영업시간: 17:00-02:00' as store_info,
    '막창 맛집 상세 리뷰 작성' as mission,
    ARRAY['https://picsum.photos/seed/daegu2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at;

-- 인천 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '송도 브런치 카페 체험단' as title,
    'cafe' as category,
    '인천 연수구' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '13 days' as recruitment_end_date,
    7 as recruitment_count,
    '브런치 플레이트 + 커피 2잔' as benefits,
    '인천 연수구 송도국제대로 789, 영업시간: 09:00-22:00' as store_info,
    '브런치 메뉴 상세 촬영 및 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/incheon1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '인천 차이나타운 맛집 체험단' as title,
    'restaurant' as category,
    '인천 중구' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    9 as recruitment_count,
    '중화요리 코스 2인 세트' as benefits,
    '인천 중구 차이나타운로 123, 영업시간: 11:00-22:00' as store_info,
    '중화요리 전문 리뷰 및 사진 촬영' as mission,
    ARRAY['https://picsum.photos/seed/incheon2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

-- 광주 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '광주 상무지구 헤어샵 체험단' as title,
    'beauty' as category,
    '광주 서구' as location,
    CURRENT_DATE - INTERVAL '6 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '8 days' as recruitment_end_date,
    5 as recruitment_count,
    '커트 + 염색 or 펌 무료' as benefits,
    '광주 서구 상무중앙로 234, 영업시간: 10:00-21:00' as store_info,
    '헤어 변신 과정 상세 기록' as mission,
    ARRAY['https://picsum.photos/seed/gwangju1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '6 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '광주 오리탕 맛집 체험단' as title,
    'restaurant' as category,
    '광주 북구' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '11 days' as recruitment_end_date,
    8 as recruitment_count,
    '오리탕 + 오리구이 세트' as benefits,
    '광주 북구 용봉동 456, 영업시간: 11:00-22:00' as store_info,
    '전통 오리요리 맛 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/gwangju2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at;

-- 대전 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '대전 성심당 베이커리 체험단' as title,
    'cafe' as category,
    '대전 중구' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    10 as recruitment_count,
    '빵 5종 + 음료 2잔 무료' as benefits,
    '대전 중구 대종로 123, 영업시간: 08:00-21:00' as store_info,
    '베이커리 상세 리뷰 및 추천' as mission,
    ARRAY['https://picsum.photos/seed/daejeon1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '대전 칼국수 맛집 체험단' as title,
    'restaurant' as category,
    '대전 서구' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    7 as recruitment_count,
    '칼국수 + 수육 세트' as benefits,
    '대전 서구 둔산동 789, 영업시간: 10:00-21:00' as store_info,
    '칼국수 맛집 블로그 포스팅' as mission,
    ARRAY['https://picsum.photos/seed/daejeon2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at;

-- 울산 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '울산 언양불고기 체험단' as title,
    'restaurant' as category,
    '울산 울주군' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    6 as recruitment_count,
    '언양불고기 정식 2인' as benefits,
    '울산 울주군 언양읍 123, 영업시간: 11:00-21:00' as store_info,
    '언양불고기 맛 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/ulsan1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '울산 태화강 카페 체험단' as title,
    'cafe' as category,
    '울산 중구' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '13 days' as recruitment_end_date,
    8 as recruitment_count,
    '디저트 세트 + 음료 무료' as benefits,
    '울산 중구 태화강대공원길 456, 영업시간: 10:00-22:00' as store_info,
    '카페 분위기와 메뉴 촬영' as mission,
    ARRAY['https://picsum.photos/seed/ulsan2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

-- 경기 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '수원 왕갈비 체험단' as title,
    'restaurant' as category,
    '경기 수원시' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    11 as recruitment_count,
    '왕갈비 세트 2인분' as benefits,
    '경기 수원시 팔달구 789, 영업시간: 11:00-22:00' as store_info,
    '수원 왕갈비 맛 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/gyeonggi1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '판교 IT 카페 체험단' as title,
    'cafe' as category,
    '경기 성남시' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    9 as recruitment_count,
    '프리미엄 커피 + 디저트' as benefits,
    '경기 성남시 분당구 판교역로 123, 영업시간: 07:00-23:00' as store_info,
    'IT 감성 카페 리뷰 작성' as mission,
    ARRAY['https://picsum.photos/seed/gyeonggi2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

-- 강원 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '춘천 닭갈비 체험단' as title,
    'restaurant' as category,
    '강원 춘천시' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '11 days' as recruitment_end_date,
    10 as recruitment_count,
    '닭갈비 + 막국수 세트' as benefits,
    '강원 춘천시 명동 234, 영업시간: 10:00-22:00' as store_info,
    '춘천 명물 닭갈비 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/gangwon1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '강릉 바다뷰 카페 체험단' as title,
    'cafe' as category,
    '강원 강릉시' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    8 as recruitment_count,
    '커피 + 크로플 세트' as benefits,
    '강원 강릉시 안목해변 567, 영업시간: 08:00-23:00' as store_info,
    '강릉 바다뷰 카페 감성 촬영' as mission,
    ARRAY['https://picsum.photos/seed/gangwon2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at;

-- 충북 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '청주 올갱이해장국 체험단' as title,
    'restaurant' as category,
    '충북 청주시' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    7 as recruitment_count,
    '올갱이해장국 + 수제비' as benefits,
    '충북 청주시 상당구 123, 영업시간: 06:00-21:00' as store_info,
    '충북 향토음식 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/chungbuk1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '충주 사과빵 카페 체험단' as title,
    'cafe' as category,
    '충북 충주시' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '13 days' as recruitment_end_date,
    6 as recruitment_count,
    '사과빵 3종 + 음료' as benefits,
    '충북 충주시 중앙로 456, 영업시간: 09:00-21:00' as store_info,
    '충주 명물 사과빵 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/chungbuk2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

-- 충남 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '천안 호두과자 체험단' as title,
    'cafe' as category,
    '충남 천안시' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    9 as recruitment_count,
    '호두과자 세트 + 커피' as benefits,
    '충남 천안시 불당동 789, 영업시간: 08:00-21:00' as store_info,
    '천안 명물 호두과자 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/chungnam1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '공주 한옥마을 맛집 체험단' as title,
    'restaurant' as category,
    '충남 공주시' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    8 as recruitment_count,
    '한정식 코스 요리' as benefits,
    '충남 공주시 한옥마을길 123, 영업시간: 11:00-21:00' as store_info,
    '한옥마을 전통음식 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/chungnam2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

-- 전북 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '전주 비빔밥 맛집 체험단' as title,
    'restaurant' as category,
    '전북 전주시' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '11 days' as recruitment_end_date,
    12 as recruitment_count,
    '전주비빔밥 + 육회' as benefits,
    '전북 전주시 한옥마을 234, 영업시간: 10:00-21:00' as store_info,
    '전주 전통 비빔밥 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jeonbuk1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '군산 이성당 베이커리 체험단' as title,
    'cafe' as category,
    '전북 군산시' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    7 as recruitment_count,
    '단팥빵 + 야채빵 세트' as benefits,
    '전북 군산시 중앙로 567, 영업시간: 08:00-22:00' as store_info,
    '군산 명물 빵집 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jeonbuk2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at;

-- 전남 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '여수 갓김치 맛집 체험단' as title,
    'restaurant' as category,
    '전남 여수시' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    9 as recruitment_count,
    '갓김치 정식 + 게장' as benefits,
    '전남 여수시 돌산읍 123, 영업시간: 10:00-21:00' as store_info,
    '여수 특산물 갓김치 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jeonnam1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '순천만 생태 카페 체험단' as title,
    'cafe' as category,
    '전남 순천시' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '13 days' as recruitment_end_date,
    6 as recruitment_count,
    '유기농 음료 + 비건 디저트' as benefits,
    '전남 순천시 순천만길 456, 영업시간: 09:00-21:00' as store_info,
    '순천만 생태 카페 감성 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jeonnam2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

-- 경북 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '안동 찜닭 맛집 체험단' as title,
    'restaurant' as category,
    '경북 안동시' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    10 as recruitment_count,
    '안동찜닭 대자 + 안동소주' as benefits,
    '경북 안동시 구시장길 789, 영업시간: 10:00-22:00' as store_info,
    '안동 명물 찜닭 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/gyeongbuk1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '경주 한옥 카페 체험단' as title,
    'cafe' as category,
    '경북 경주시' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    8 as recruitment_count,
    '전통차 + 한과 세트' as benefits,
    '경북 경주시 황리단길 123, 영업시간: 10:00-22:00' as store_info,
    '경주 한옥카페 분위기 촬영' as mission,
    ARRAY['https://picsum.photos/seed/gyeongbuk2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

-- 경남 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '통영 굴요리 체험단' as title,
    'restaurant' as category,
    '경남 통영시' as location,
    CURRENT_DATE - INTERVAL '3 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '11 days' as recruitment_end_date,
    9 as recruitment_count,
    '굴요리 코스 + 멍게비빔밥' as benefits,
    '경남 통영시 도남동 234, 영업시간: 10:00-21:00' as store_info,
    '통영 굴요리 전문점 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/gyeongnam1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '3 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '진주 냉면 맛집 체험단' as title,
    'restaurant' as category,
    '경남 진주시' as location,
    CURRENT_DATE - INTERVAL '4 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '10 days' as recruitment_end_date,
    7 as recruitment_count,
    '진주냉면 + 육전' as benefits,
    '경남 진주시 중앙시장 567, 영업시간: 10:00-21:00' as store_info,
    '진주 냉면 맛집 블로그 포스팅' as mission,
    ARRAY['https://picsum.photos/seed/gyeongnam2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '4 days' as created_at,
    NOW() as updated_at;

-- 제주 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '제주 흑돼지 맛집 체험단' as title,
    'restaurant' as category,
    '제주 제주시' as location,
    CURRENT_DATE - INTERVAL '5 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '9 days' as recruitment_end_date,
    12 as recruitment_count,
    '흑돼지 구이 2인분 + 멜젓' as benefits,
    '제주 제주시 노형동 123, 영업시간: 11:00-23:00' as store_info,
    '제주 흑돼지 맛 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/jeju1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '5 days' as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '제주 오션뷰 카페 체험단' as title,
    'cafe' as category,
    '제주 서귀포시' as location,
    CURRENT_DATE - INTERVAL '1 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '13 days' as recruitment_end_date,
    10 as recruitment_count,
    '한라봉 음료 + 감귤 디저트' as benefits,
    '제주 서귀포시 중문관광로 456, 영업시간: 09:00-22:00' as store_info,
    '제주 오션뷰 카페 감성 촬영' as mission,
    ARRAY['https://picsum.photos/seed/jeju2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '1 days' as created_at,
    NOW() as updated_at;

-- 세종 지역 체험단
INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '세종 공무원타운 맛집 체험단' as title,
    'restaurant' as category,
    '세종 나성동' as location,
    CURRENT_DATE as recruitment_start_date,
    CURRENT_DATE + INTERVAL '14 days' as recruitment_end_date,
    8 as recruitment_count,
    '점심 특선 뷔페' as benefits,
    '세종특별자치시 나성동 789, 영업시간: 11:00-21:00' as store_info,
    '세종시 맛집 상세 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/sejong1/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() as created_at,
    NOW() as updated_at;

INSERT INTO campaigns (title, category, location, recruitment_start_date, recruitment_end_date,
                       recruitment_count, benefits, store_info, mission, images, status,
                       advertiser_id, created_at, updated_at)
SELECT
    '세종 정부청사 카페 체험단' as title,
    'cafe' as category,
    '세종 어진동' as location,
    CURRENT_DATE - INTERVAL '2 days' as recruitment_start_date,
    CURRENT_DATE + INTERVAL '12 days' as recruitment_end_date,
    6 as recruitment_count,
    '스페셜티 커피 + 샌드위치' as benefits,
    '세종특별자치시 어진동 정부청사로 123, 영업시간: 07:00-20:00' as store_info,
    '세종시 카페 분위기 리뷰' as mission,
    ARRAY['https://picsum.photos/seed/sejong2/800/600'] as images,
    'recruiting' as status,
    (SELECT id FROM advertiser_profiles LIMIT 1) as advertiser_id,
    NOW() - INTERVAL '2 days' as created_at,
    NOW() as updated_at;

COMMIT;

-- 데이터 확인용 쿼리
-- SELECT location, COUNT(*) as count FROM campaigns GROUP BY location ORDER BY location;
-- SELECT category, COUNT(*) as count FROM campaigns WHERE status = 'recruiting' GROUP BY category;