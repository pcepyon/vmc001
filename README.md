# 블로그 체험단 플랫폼 (VMC001)

광고주와 인플루언서를 연결하는 체험단 매칭 SaaS 플랫폼입니다.

## 프로젝트 개요

본 프로젝트는 광고주가 체험단을 등록 및 관리하고, 인플루언서가 다양한 체험단에 지원하고 활동할 수 있는 양방향 플랫폼입니다.

### 주요 기능

- **광고주**: 체험단 등록/관리, 지원자 선정, 캠페인 운영
- **인플루언서**: 체험단 검색/지원, 지원 현황 확인, SNS 채널 연동
- **인증**: Supabase Auth 기반 회원가입 및 로그인

## 기술 스택

이 프로젝트는 [`EasyNext`](https://github.com/easynext/easynext)를 사용해 생성된 [Next.js](https://nextjs.org) 프로젝트입니다.

### 프론트엔드

- **Framework**: Next.js 15.1.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **State Management**:
  - React Query (서버 상태)
  - Zustand (클라이언트 상태)
- **Form**: React Hook Form + Zod
- **Utilities**:
  - date-fns (날짜 처리)
  - es-toolkit (유틸리티)
  - ts-pattern (패턴 매칭)
  - react-use (React Hooks)

### 백엔드

- **API Framework**: Hono (Next.js Route Handler 위임)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Runtime**: Node.js

### 개발 도구

- **Linter**: ESLint
- **Formatter**: Prettier
- **Package Manager**: npm

## 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 다른 패키지 매니저
- Supabase 프로젝트 (환경 변수 설정 필요)

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# API Base URL (비워두세요)
NEXT_PUBLIC_API_BASE_URL=
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── api/[[...hono]]/         # Hono API 위임 엔드포인트
│   ├── (protected)/             # 인증이 필요한 페이지
│   ├── advertiser/              # 광고주 전용 페이지
│   ├── application/             # 체험단 지원 관련
│   ├── campaign/                # 캠페인 상세
│   ├── influencer/              # 인플루언서 전용 페이지
│   ├── login/                   # 로그인
│   ├── signup/                  # 회원가입
│   └── page.tsx                 # 메인 페이지 (체험단 목록)
├── backend/                      # 백엔드 레이어
│   ├── hono/                    # Hono 앱 설정
│   ├── http/                    # HTTP 응답 유틸
│   ├── middleware/              # 공통 미들웨어
│   ├── supabase/                # Supabase 클라이언트
│   └── config/                  # 환경 변수 설정
├── components/
│   └── ui/                      # Shadcn UI 컴포넌트
├── features/                     # 기능별 모듈
│   ├── [feature]/
│   │   ├── components/          # 기능별 컴포넌트
│   │   ├── hooks/               # React Query 훅
│   │   ├── backend/
│   │   │   ├── route.ts         # Hono 라우터
│   │   │   ├── service.ts       # 비즈니스 로직
│   │   │   ├── schema.ts        # Zod 스키마
│   │   │   └── error.ts         # 에러 정의
│   │   └── lib/                 # 클라이언트 유틸
├── lib/
│   └── remote/                  # HTTP 클라이언트
├── hooks/                        # 공통 훅
└── constants/                    # 공통 상수
```

## 주요 페이지

| URL | 설명 |
|-----|------|
| `/` | 메인 페이지 (체험단 목록) |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/dashboard` | 대시보드 (보호된 페이지) |
| `/campaign/[id]` | 캠페인 상세 |
| `/application/[campaignId]/apply` | 캠페인 지원 |
| `/my-applications` | 내 지원 내역 (인플루언서) |
| `/influencer/profile/setup` | 인플루언서 프로필 설정 |
| `/advertiser/campaigns` | 광고주 캠페인 목록 |
| `/advertiser/campaigns/[id]` | 광고주 캠페인 상세 |
| `/advertiser/profile/setup` | 광고주 프로필 설정 |

## API 구조

모든 API는 `/api/*` 경로로 Hono를 통해 처리됩니다:

- `GET /api/campaigns` - 캠페인 목록 조회
- `POST /api/campaigns` - 캠페인 생성
- `GET /api/campaigns/:id` - 캠페인 상세 조회
- `POST /api/applications` - 체험단 지원
- 등등...

## 데이터베이스 마이그레이션

Supabase 마이그레이션 파일은 `supabase/migrations/` 디렉토리에 저장됩니다.

새 마이그레이션을 적용하려면 Supabase 대시보드에서 SQL을 실행하세요.

## 개발 가이드라인

자세한 개발 가이드라인은 `CLAUDE.md` 파일을 참조하세요.

### 핵심 원칙

- 모든 컴포넌트는 Client Component (`"use client"`)
- API 요청은 `@/lib/remote/api-client` 사용
- 서버 상태는 React Query로 관리
- 폼 검증은 React Hook Form + Zod
- 스타일링은 Tailwind CSS + Shadcn UI

## 라이선스

이 프로젝트는 개인 프로젝트입니다.