# 005 - 체험단 상세 구현 계획

## 개요

### 모듈 목록

| 모듈명 | 위치 | 설명 |
|--------|------|------|
| **Backend: Campaign Detail Service** | `src/features/campaign/backend/service.ts` (확장) | 체험단 상세 조회 로직 |
| **Backend: Campaign Detail Route** | `src/features/campaign/backend/route.ts` (확장) | 체험단 상세 API 엔드포인트 |
| **Backend: Campaign Detail Schema** | `src/features/campaign/backend/schema.ts` (확장) | 상세 조회 응답 스키마 |
| **Backend: Application Check Service** | `src/features/application/backend/service.ts` | 지원 여부 확인 로직 |
| **Backend: Application Check Route** | `src/features/application/backend/route.ts` | 지원 여부 확인 API |
| **Backend: Profile Status Check** | `src/features/influencer/backend/route.ts` (확장) | 프로필 등록 상태 확인 API |
| **Frontend: Campaign Detail Page** | `src/app/campaign/[id]/page.tsx` | 체험단 상세 페이지 |
| **Frontend: Campaign Detail View** | `src/features/campaign/components/campaign-detail-view.tsx` | 상세 정보 렌더링 컴포넌트 |
| **Frontend: Apply Button Guard** | `src/features/campaign/components/apply-button-guard.tsx` | 지원하기 버튼 가드 로직 |
| **Frontend: useCampaignDetail** | `src/features/campaign/hooks/useCampaignDetail.ts` | 상세 조회 React Query hook |
| **Frontend: useApplicationCheck** | `src/features/application/hooks/useApplicationCheck.ts` | 지원 여부 확인 hook |
| **Frontend: useProfileStatus** | `src/features/influencer/hooks/useProfileStatus.ts` | 프로필 상태 확인 hook |
| **DTO Export** | `src/features/campaign/lib/dto.ts` (확장) | 상세 스키마 재노출 |
| **DTO Export** | `src/features/application/lib/dto.ts` | 지원 관련 DTO |

---

## Diagram

```mermaid
flowchart TD
    subgraph Frontend
        A[CampaignDetailPage] --> B[useCampaignDetail]
        A --> C[useCurrentUser]
        A --> D[CampaignDetailView]
        D --> E[ApplyButtonGuard]
        E --> F[useApplicationCheck]
        E --> G[useProfileStatus]
        B --> H[apiClient: GET /api/campaigns/:id]
        F --> I[apiClient: GET /api/applications/check]
        G --> J[apiClient: GET /api/influencer/profile/status]
    end

    subgraph Backend
        H --> K[Campaign Detail Route]
        K --> L[Campaign Service: getCampaignDetail]
        L --> M[campaigns table]

        I --> N[Application Check Route]
        N --> O[Application Service: checkApplication]
        O --> P[applications table]

        J --> Q[Influencer Profile Status Route]
        Q --> R[Influencer Service: getProfileStatus]
        R --> S[influencer_profiles table]
    end

    subgraph Guard Logic
        E --> T{로그인 여부}
        T -->|비로그인| U[로그인 유도]
        T -->|로그인| V{역할 확인}
        V -->|광고주| W[지원 불가 메시지]
        V -->|인플루언서| X{지원 여부}
        X -->|이미 지원| Y[이미 지원함 메시지]
        X -->|미지원| Z{프로필 상태}
        Z -->|미등록| AA[프로필 등록 유도]
        Z -->|등록 완료| AB{모집 상태}
        AB -->|모집중| AC[지원하기 버튼 활성화]
        AB -->|종료/마감| AD[지원 불가 메시지]
    end

    AC --> AE[/application/[id]/apply로 이동]
```

---

## Implementation Plan

### 1. Backend Layer

#### 1.1 Schema 확장 (`src/features/campaign/backend/schema.ts`)

**파일 확장**
- `CampaignDetailResponseSchema`: 상세 정보 응답
  - id: UUID
  - advertiserId: UUID
  - title: string
  - recruitmentStartDate: string
  - recruitmentEndDate: string
  - recruitmentCount: number
  - applicationCount: number (계산 필드)
  - benefits: string
  - storeInfo: string
  - mission: string
  - status: string
  - images?: string[] (선택적)
  - category: string
  - location: string
  - createdAt: string

**Unit Tests**
- 상세 정보 스키마 파싱 성공

#### 1.2 Service 확장 (`src/features/campaign/backend/service.ts`)

**파일 확장**
- `getCampaignDetail(campaignId: string)` 함수
  1. `campaigns` 테이블에서 해당 ID 조회
  2. 지원자 수 계산 (COUNT from applications)
  3. 광고주 정보 JOIN (선택적)
  4. 존재하지 않으면 `notFound` 에러
  5. 결과 반환

**Unit Tests**
- 정상 케이스: 상세 정보 반환
- 존재하지 않음: `notFound` 에러
- DB 조회 실패: `fetchError` 에러

#### 1.3 Route 확장 (`src/features/campaign/backend/route.ts`)

**파일 확장**
- `GET /api/campaigns/:id` 엔드포인트
  1. 경로 파라미터 `id` 추출 및 UUID 검증
  2. `getCampaignDetail` 서비스 호출
  3. 성공: 200 응답 (상세 정보)
  4. 실패: 404 또는 500 응답

**Integration Tests**
- 정상 요청: 200 응답 및 상세 정보 반환
- 존재하지 않는 ID: 404 응답
- 잘못된 UUID 형식: 400 응답

#### 1.4 Application Check Service (`src/features/application/backend/service.ts`)

**파일 생성**
- `checkApplication(userId: string, campaignId: string)` 함수
  1. `applications` 테이블에서 해당 userId + campaignId 조회
  2. 존재하면 { applied: true, status: string } 반환
  3. 존재하지 않으면 { applied: false } 반환

**Unit Tests**
- 지원함: applied: true 반환
- 지원 안 함: applied: false 반환

#### 1.5 Application Check Schema (`src/features/application/backend/schema.ts`)

**파일 생성**
- `ApplicationCheckQuerySchema`: 쿼리 파라미터
  - campaignId: UUID
- `ApplicationCheckResponseSchema`: 응답
  - applied: boolean
  - status?: 'applied' | 'selected' | 'rejected'

#### 1.6 Application Check Route (`src/features/application/backend/route.ts`)

**파일 생성**
- `GET /api/applications/check` 엔드포인트
  1. 인증 미들웨어로 userId 추출
  2. 쿼리 파라미터 `campaignId` 파싱
  3. `checkApplication` 서비스 호출
  4. 성공: 200 응답

**Integration Tests**
- 정상 요청: 200 응답 및 지원 여부 반환
- 비인증 사용자: 401 응답

#### 1.7 Influencer Profile Status Service (`src/features/influencer/backend/service.ts`)

**파일 확장**
- `getProfileStatus(userId: string)` 함수
  1. `influencer_profiles` 테이블에서 해당 userId 조회
  2. 존재하면 { exists: true } 반환
  3. 존재하지 않으면 { exists: false } 반환

**Unit Tests**
- 프로필 존재: exists: true 반환
- 프로필 없음: exists: false 반환

#### 1.8 Influencer Profile Status Schema (`src/features/influencer/backend/schema.ts`)

**파일 확장**
- `ProfileStatusResponseSchema`: 응답
  - exists: boolean

#### 1.9 Influencer Profile Status Route (`src/features/influencer/backend/route.ts`)

**파일 확장**
- `GET /api/influencer/profile/status` 엔드포인트
  1. 인증 미들웨어로 userId 추출
  2. 역할이 'influencer'인지 검증
  3. `getProfileStatus` 서비스 호출
  4. 성공: 200 응답

**Integration Tests**
- 정상 요청: 200 응답 및 프로필 상태 반환
- 비인증 사용자: 401 응답
- 광고주 역할: 403 응답

---

### 2. Frontend Layer

#### 2.1 DTO Export (`src/features/campaign/lib/dto.ts`)

**파일 확장**
```ts
export type { CampaignDetail } from '../backend/schema';
```

#### 2.2 DTO Export (`src/features/application/lib/dto.ts`)

**파일 생성**
```ts
export type { ApplicationCheckQuery, ApplicationCheckResponse } from '../backend/schema';
```

#### 2.3 useCampaignDetail Hook (`src/features/campaign/hooks/useCampaignDetail.ts`)

**파일 생성**
- `useCampaignDetail(id: string)` React Query hook
  - `apiClient.get(\`/api/campaigns/\${id}\`)`
  - 자동 리페칭 및 캐싱
  - staleTime 설정

#### 2.4 useApplicationCheck Hook (`src/features/application/hooks/useApplicationCheck.ts`)

**파일 생성**
- `useApplicationCheck(campaignId: string, enabled: boolean)` React Query hook
  - `apiClient.get('/api/applications/check', { params: { campaignId } })`
  - enabled: 로그인 상태일 때만 활성화

#### 2.5 useProfileStatus Hook (`src/features/influencer/hooks/useProfileStatus.ts`)

**파일 생성**
- `useProfileStatus(enabled: boolean)` React Query hook
  - `apiClient.get('/api/influencer/profile/status')`
  - enabled: 인플루언서 역할일 때만 활성화

#### 2.6 Apply Button Guard (`src/features/campaign/components/apply-button-guard.tsx`)

**파일 생성**
- Props: `campaignId: string`, `campaign: CampaignDetail`
- `useCurrentUser`, `useApplicationCheck`, `useProfileStatus` 사용
- 가드 로직:
  1. 비로그인 → "로그인 후 지원 가능합니다" + 로그인 버튼
  2. 광고주 → "광고주는 지원할 수 없습니다"
  3. 이미 지원 → "이미 지원한 체험단입니다" + 지원 목록 보기 버튼
  4. 프로필 미등록 → "프로필 등록 후 지원 가능합니다" + 프로필 등록 버튼
  5. 모집 종료 또는 인원 마감 → "모집이 종료되었습니다"
  6. 정상 → "지원하기" 버튼 활성화

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 비로그인 사용자 | "로그인 후 지원 가능" 메시지 + 로그인 버튼 |
| 광고주 | "광고주는 지원할 수 없습니다" 메시지 |
| 이미 지원한 인플루언서 | "이미 지원함" 메시지 + 지원 목록 버튼 |
| 프로필 미등록 인플루언서 | "프로필 등록 필요" 메시지 + 등록 버튼 |
| 모집 종료 | "모집 종료" 메시지 |
| 정상 인플루언서 | "지원하기" 버튼 활성화 |
| 지원하기 클릭 | /application/[id]/apply로 이동 |

#### 2.7 Campaign Detail View (`src/features/campaign/components/campaign-detail-view.tsx`)

**파일 생성**
- Props: `campaign: CampaignDetail`
- 상세 정보 렌더링:
  - 제목, 이미지, 모집기간, 모집인원/지원자 수
  - 혜택, 미션, 매장 정보
  - 카테고리, 지역
- `<ApplyButtonGuard />` 포함

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 상세 정보 표시 | 모든 필드 정상 렌더링 |
| 이미지 없음 | placeholder 표시 |
| 모집 상태에 따른 배지 표시 | "모집중", "모집종료" 등 |

#### 2.8 Campaign Detail Page (`src/app/campaign/[id]/page.tsx`)

**파일 생성**
- `'use client'` 지시어
- Promise를 사용하여 params 처리 (Next.js 15+)
- `useCampaignDetail` hook 호출
- 로딩: 스켈레톤 UI
- 에러: 404 페이지 또는 에러 메시지
- 정상: `<CampaignDetailView />` 렌더링

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 페이지 로드 | 상세 정보 표시 |
| 존재하지 않는 ID | 404 페이지 |
| 로딩 중 | 스켈레톤 UI |
| 에러 발생 | 에러 메시지 및 홈으로 돌아가기 버튼 |

---

### 3. Shared Modules

**변경 없음**

---

### 4. Database Migration

**이미 존재함**
- 추가 마이그레이션 불필요

---

## 작업 순서

1. **Backend**: Campaign 상세 스키마/서비스/라우트 확장
2. **Backend**: Application Check 스키마/서비스/라우트 생성
3. **Backend**: Influencer Profile Status 스키마/서비스/라우트 확장
4. **Frontend**: DTO → Hooks → Components 순서로 작성
5. **Frontend**: Page 통합
6. **E2E**: 가드 로직 QA (각 케이스별 확인)

---

## 주요 고려사항

- **가드 로직**: 복잡한 조건문을 ts-pattern으로 깔끔하게 처리
- **중복 API 호출 방지**: React Query 캐싱 활용
- **에러 처리**: 404 페이지를 별도로 만들거나 에러 바운더리 사용
- **모집 상태 확인**: 클라이언트 측에서도 모집기간 및 인원 확인
- **접근성**: 버튼 비활성화 시 명확한 메시지 제공