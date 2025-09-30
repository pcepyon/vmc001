# 001 - 회원가입 & 역할선택 구현 계획

## 개요

### 모듈 목록

| 모듈명 | 위치 | 설명 |
|--------|------|------|
| **Backend: Auth Service** | `src/features/auth/backend/service.ts` | Supabase Auth 연동 및 사용자/프로필 생성 로직 |
| **Backend: Auth Route** | `src/features/auth/backend/route.ts` | 회원가입 API 엔드포인트 정의 |
| **Backend: Auth Schema** | `src/features/auth/backend/schema.ts` | 회원가입 요청/응답 스키마 정의 (Zod) |
| **Backend: Auth Error** | `src/features/auth/backend/error.ts` | 회원가입 관련 에러 코드 정의 |
| **Frontend: Signup Page** | `src/app/signup/page.tsx` | 회원가입 페이지 컴포넌트 |
| **Frontend: Signup Form** | `src/features/auth/components/signup-form.tsx` | 회원가입 양식 컴포넌트 (react-hook-form + zod) |
| **Frontend: Role Selector** | `src/features/auth/components/role-selector.tsx` | 역할 선택 UI 컴포넌트 |
| **Frontend: Terms Agreement** | `src/features/auth/components/terms-agreement.tsx` | 약관 동의 체크박스 컴포넌트 |
| **Frontend: Signup Hook** | `src/features/auth/hooks/useSignup.ts` | 회원가입 React Query mutation hook |
| **DTO Export** | `src/features/auth/lib/dto.ts` | 백엔드 스키마 재노출 |
| **Shared: Validation Utils** | `src/lib/validation.ts` | 이메일/전화번호/비밀번호 유효성 검사 공통 유틸 |
| **Constants** | `src/features/auth/constants/terms.ts` | 약관 타입 및 메타데이터 상수 |

---

## Diagram

```mermaid
flowchart TD
    subgraph Frontend
        A[SignupPage] --> B[SignupForm]
        B --> C[RoleSelector]
        B --> D[TermsAgreement]
        B --> E[useSignup Hook]
        E --> F[apiClient]
    end

    subgraph Backend
        F --> G[POST /api/auth/signup]
        G --> H[Auth Route Handler]
        H --> I[Auth Service]
        I --> J[Supabase Auth]
        I --> K[users table]
        I --> L[terms_agreements table]
    end

    subgraph Shared
        B --> M[Validation Utils]
        H --> N[Auth Schema]
        H --> O[Auth Error]
        E --> P[DTO]
    end

    J --> Q[이메일 검증 메일 발송]
    I --> R{역할별 리디렉션}
    R -->|인플루언서| S[/influencer/profile/setup]
    R -->|광고주| T[/advertiser/profile/setup]
```

---

## Implementation Plan

### 1. Backend Layer

#### 1.1 Schema 정의 (`src/features/auth/backend/schema.ts`)

**파일 생성**
- `SignupRequestSchema`: 회원가입 요청 데이터 검증
  - name: string (min 2자)
  - phone: string (한국 휴대폰 형식)
  - email: string (이메일 형식)
  - password: string (min 8자, 대소문자+숫자 포함)
  - role: 'influencer' | 'advertiser'
  - termsAgreements: { type: string, agreed: boolean }[]
- `SignupResponseSchema`: 회원가입 응답 데이터
  - userId: string (UUID)
  - email: string
  - role: 'influencer' | 'advertiser'
  - redirectUrl: string

**Unit Tests**
- 유효한 데이터에 대한 파싱 성공 검증
- 필수 필드 누락 시 에러 발생
- 이메일/전화번호/비밀번호 형식 검증
- 약관 동의 필수 항목 검증

#### 1.2 Error 정의 (`src/features/auth/backend/error.ts`)

**파일 생성**
- `authErrorCodes` 객체 정의
  - `emailAlreadyExists`: 이메일 중복
  - `invalidCredentials`: 유효하지 않은 인증 정보
  - `weakPassword`: 비밀번호 강도 미달
  - `termsNotAgreed`: 필수 약관 미동의
  - `rateLimitExceeded`: 레이트 리밋 초과
  - `authServiceError`: Supabase Auth 오류
  - `databaseError`: DB 저장 실패

#### 1.3 Service 로직 (`src/features/auth/backend/service.ts`)

**파일 생성**
- `createUserAccount` 함수
  1. Supabase Auth에 계정 생성 (`signUp`)
  2. `users` 테이블에 프로필 생성 (auth_id, role, name, phone, email)
  3. `terms_agreements` 테이블에 약관 동의 이력 저장
  4. 트랜잭션으로 묶어 원자성 보장
  5. 이메일 검증 메일 발송 (Supabase Auth 자동 처리)
  6. 역할에 따른 리디렉션 URL 반환

**Unit Tests**
- 정상 케이스: 모든 단계 성공 시 userId 반환
- 이메일 중복: `emailAlreadyExists` 에러 반환
- Auth 서비스 오류: `authServiceError` 에러 반환
- DB 저장 실패: 롤백 및 `databaseError` 에러 반환

#### 1.4 Route Handler (`src/features/auth/backend/route.ts`)

**파일 생성**
- `POST /api/auth/signup` 엔드포인트
  1. 요청 body를 `SignupRequestSchema`로 파싱
  2. 레이트 리밋 체크 (선택적)
  3. `createUserAccount` 서비스 호출
  4. 성공: 201 응답 (userId, role, redirectUrl)
  5. 실패: 적절한 HTTP 상태 코드와 에러 메시지 반환

**Integration Tests**
- 정상 요청: 201 응답 및 사용자 생성 확인
- 유효성 검사 실패: 400 응답
- 이메일 중복: 409 응답
- 서버 오류: 500 응답

#### 1.5 Hono App 통합 (`src/backend/hono/app.ts`)

**파일 수정**
- `registerAuthRoutes(app)` 추가

---

### 2. Frontend Layer

#### 2.1 Validation Utils (`src/lib/validation.ts`)

**파일 생성**
- `validateEmail(email: string): boolean`
- `validatePhone(phone: string): boolean`
- `validatePassword(password: string): { valid: boolean, errors: string[] }`
- 클라이언트 측 즉각 피드백용

#### 2.2 Terms Constants (`src/features/auth/constants/terms.ts`)

**파일 생성**
- `REQUIRED_TERMS`: 필수 약관 배열
- `OPTIONAL_TERMS`: 선택 약관 배열
- 각 약관의 type, label, url 정의

#### 2.3 DTO Export (`src/features/auth/lib/dto.ts`)

**파일 생성**
- 백엔드 스키마를 프론트엔드에서 재사용
```ts
export type { SignupRequest, SignupResponse } from '../backend/schema';
export { SignupRequestSchema, SignupResponseSchema } from '../backend/schema';
```

#### 2.4 Signup Hook (`src/features/auth/hooks/useSignup.ts`)

**파일 생성**
- `useSignup` mutation hook
  - `apiClient.post('/api/auth/signup', data)`
  - 성공 시 리디렉션 로직 포함
  - 에러 메시지 추출 및 toast 표시

#### 2.5 Terms Agreement Component (`src/features/auth/components/terms-agreement.tsx`)

**파일 생성**
- Props: `value: boolean`, `onChange: (checked: boolean) => void`, `termsType: string`, `label: string`, `url?: string`
- Checkbox + Label + 링크 렌더링
- shadcn-ui Checkbox 사용

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 체크박스 클릭 | onChange 호출 및 체크 상태 토글 |
| 약관 보기 클릭 | 약관 URL 새 탭에서 열림 |
| 접근성 | label과 checkbox 연결, 키보드 접근 가능 |

#### 2.6 Role Selector Component (`src/features/auth/components/role-selector.tsx`)

**파일 생성**
- Props: `value: 'influencer' | 'advertiser' | null`, `onChange: (role) => void`
- 라디오 버튼 또는 카드 선택 UI
- 각 역할에 대한 설명 포함

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 역할 선택 | onChange 호출 및 선택 상태 업데이트 |
| 초기값 null | 아무것도 선택되지 않은 상태 |
| 접근성 | 키보드로 탐색 및 선택 가능 |

#### 2.7 Signup Form Component (`src/features/auth/components/signup-form.tsx`)

**파일 생성**
- react-hook-form + zod resolver 사용
- 필드: name, phone, email, password, role, terms
- 클라이언트 측 유효성 검사 (Validation Utils 사용)
- `useSignup` hook 호출
- 에러 메시지 필드별 표시
- 제출 버튼 로딩 상태 처리

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 필드 입력 | 실시간 유효성 검사 |
| 이메일 형식 오류 | "올바른 이메일 형식이 아닙니다" 표시 |
| 비밀번호 강도 미달 | "비밀번호는 8자 이상, 대소문자 및 숫자를 포함해야 합니다" 표시 |
| 약관 미동의 | 제출 버튼 비활성화 |
| 제출 성공 | 역할에 따라 리디렉션 |
| 제출 실패 | 에러 메시지 toast 표시 |
| 이메일 중복 | "이미 가입된 이메일입니다" 표시 |

#### 2.8 Signup Page (`src/app/signup/page.tsx`)

**파일 수정**
- `'use client'` 지시어 추가
- `<SignupForm />` 렌더링
- 페이지 제목 및 설명 표시
- 이미 로그인된 사용자는 홈으로 리디렉션

**QA Sheet**
| 항목 | 기대 동작 |
|------|----------|
| 비로그인 사용자 | 회원가입 양식 표시 |
| 로그인된 사용자 | 홈 페이지로 리디렉션 |
| 모바일 반응형 | 작은 화면에서도 레이아웃 깨짐 없음 |

---

### 3. Shared Modules

#### 3.1 API Client 확장 (`src/lib/remote/api-client.ts`)

**변경 불필요**
- 기존 `apiClient` 사용

---

### 4. Database Migration

**이미 존재함**
- `supabase/migrations/0002_create_campaign_platform_tables.sql`에 `users`, `terms_agreements` 테이블 정의됨
- 추가 마이그레이션 불필요

---

## 작업 순서

1. **Shared**: `src/lib/validation.ts` 작성 및 테스트
2. **Backend**: Schema → Error → Service → Route 순서로 작성
3. **Backend**: Hono App에 라우터 등록
4. **Frontend**: Constants → DTO → Hook → Components 순서로 작성
5. **Frontend**: Page 통합
6. **E2E**: Playwright 또는 수동 QA

---

## 주요 고려사항

- **보안**: 비밀번호는 Supabase Auth에서 해싱 처리
- **레이트 리밋**: 필요 시 Hono 미들웨어로 구현 (선택적)
- **봇 방지**: reCAPTCHA는 추후 확장 고려
- **이메일 검증**: Supabase Auth의 이메일 확인 메일 발송 기능 활용
- **에러 처리**: 모든 에러는 `failure()` 헬퍼로 일관되게 반환
- **트랜잭션**: Supabase 트랜잭션 또는 service-role 키로 원자성 보장