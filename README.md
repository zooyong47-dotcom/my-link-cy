# 🔗 MyLink (마이링크)

> **크리에이터, 개발자, 긱 워커를 위한 반응형 멀티링크 & 바이오링크 허브 서비스**  
> 분산된 포트폴리오, SNS, 프로젝트를 단 하나의 세련된 링크로 연결하고 실시간 클릭 통계를 확인하세요.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-v13-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query" alt="TanStack Query" />
</p>

---

## 📌 목차 (Table of Contents)
1. [프로젝트 소개 (Overview)](#-프로젝트-소개-overview)
2. [주요 핵심 기능 (Key Features)](#-주요-핵심-기능-key-features)
3. [기술 스택 (Tech Stack)](#-기술-스택-tech-stack)
4. [화면 아키텍처 및 와이어프레임 (Architecture)](#-화면-아키텍처-및-와이어프레임-architecture)
5. [프로젝트 폴더 구조 (Project Structure)](#-프로젝트-폴더-구조-project-structure)
6. [시작 가이드 (Getting Started)](#-시작-가이드-getting-started)
   - [사전 요구 사항](#사전-요구-사항)
   - [환경 변수 설정](#환경-변수-설정-envlocal)
   - [설치 및 로컬 실행](#설치-및-로컬-실행)
7. [주요 라우트 안내 (Routes)](#-주요-라우트-안내-routes)
8. [디자인 시스템 (NOL Design System)](#-디자인-시스템-nol-design-system)

---

## 💡 프로젝트 소개 (Overview)

**MyLink**는 인스타그램, 유튜브, 깃허브, 블로그 등 여러 플랫폼에 분산된 개인 콘텐츠와 포트폴리오를 한눈에 볼 수 있도록 모아주는 **모바일 퍼스트 멀티링크 허브 솔루션**입니다.

- **심플하고 직관적인 UX**: 누구나 몇 번의 클릭으로 링크를 추가하고 바로 공유할 수 있습니다.
- **실시간 데이터 동기화**: Firebase Firestore 기반으로 수정 사항이 즉각 반영됩니다.
- **실시간 통계 및 분석**: 어떤 링크가 많은 관심을 받는지 직관적인 차트와 카운터로 시각화합니다.
- **감각적인 비주얼**: **NOL Design System**을 계승한 미려한 카드 UI와 반응형 레이아웃을 제공합니다.

---

## ✨ 주요 핵심 기능 (Key Features)

### 1. 반응형 멀티링크 프로필 카드
- 데스크톱에서는 중앙 집중식 카드 레이아웃(`max-w-lg`), 모바일에서는 화면에 꽉 차는 모바일 퍼스트 뷰 제공
- 상단 커버 그라디언트 배너, 프로필 사진, 직무 뱃지, 소셜 아이콘 바, 개인화 링크 목록 구성
- 원클릭 프로필 공유(Web Share API 지원) 및 링크 클립보드 복사 기능

### 2. 간편한 링크 관리 (CRUD & Inline Edit)
- **추가**: 모달 대화상자(`AddLinkDialog`) 및 리스트 하단 점선 퀵 버튼을 통한 신속한 링크 등록
- **인라인 편집**: 별도 페이지 이동 없이 카드 내에서 제목과 URL을 즉시 수정
- **삭제 보호**: 실수 방지를 위한 전용 확인 모달(`DeleteConfirmDialog`)
- **URL 자동 보정**: `http://` 또는 `https://` 누락 시 자동 보완 및 Zod 기반 실시간 유효성 검사

### 3. 소셜 채널 원클릭 연동
- GitHub, Velog/Blog, LinkedIn, Instagram, YouTube, X(Twitter), Discord, TikTok, Threads, Email 지원
- 플랫폼별 전용 아이콘 및 다이렉트 아웃링크 연결

### 4. 실시간 클릭 통계 대시보드 (`/stats`)
- Recharts 라이브러리를 적용한 일자별/링크별 실시간 클릭 수 시각화
- 가장 인기 있는 링크를 보여주는 명예의 전당 (Top Clicks 뱃지 & 트로피 랭킹)
- 클릭률 및 유입 분석을 통한 셀프 브랜딩 인사이트 제공

### 5. 사용자 인증 및 고유 핸들 URL (`/@handle`)
- Google One-tap / OAuth 간편 로그인 연동
- 사용자 고유 아이디(핸들) 기반의 퍼블릭 프로필 페이지(`/[displayname]`)
- 소셜 미디어(카카오톡, 슬랙, 트위터 등) 링크 공유 시 맞춤형 오픈그래프 이미지(`opengraph-image.tsx`) 동적 렌더링

### 6. 인터랙티브 랜딩 페이지 (`/`)
- 모바일 목업 실시간 인터랙션 히어로 섹션
- 원하는 고유 핸들 실시간 중복 검사기 (`InteractiveHandleCheck`)
- 4대 핵심 가치 Bento 그리드 및 직업군별 라이브 페르소나 쇼케이스

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Component Primitives**: [@base-ui/react](https://base-ui.com/), [class-variance-authority (CVA)](https://cva.style/)
- **Form & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query)
- **Data Visualization**: [Recharts](https://recharts.org/)

### Backend & Infrastructure
- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth) (Google OAuth)
- **Database**: [Cloud Firestore](https://firebase.google.com/products/firestore) (실시간 NoSQL DB)
- **Hosting / Deployment**: Vercel 최적화

---

## 📐 화면 아키텍처 및 와이어프레임 (Architecture)

### 메인 프로필 레이아웃 구조

```text
+-------------------------------------------------------------------------+
| [전역 알림] Toast 메시지 팝업 (Top-Center, 애니메이션 슬라이드)           |
+-------------------------------------------------------------------------+
| [전역 모달] AddLinkDialog (새 링크 추가) / DeleteConfirmDialog (삭제 확인)|
+-------------------------------------------------------------------------+
|                                                                         |
|   [메인 뷰포트] min-h-screen bg-[#F7F8FB] (배경)                         |
|   +-----------------------------------------------------------------+   |
|   |  메인 컨테이너 카드 (Card: max-w-lg, bg-white, rounded-[28px])  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 1. 상단 윈도우 헤더 (도메인/핸들 및 공유 버튼)            |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 2. 커버 그라디언트 배너 (Cover Banner & Brand Badge)      |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 3. 프로필 헤더 (아바타, 디스플레이 네임, 인증 뱃지, 바이오) |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 4. 소셜 아이콘 바 (GitHub, Velog, LinkedIn, Mail 등)       |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 5. 링크 섹션 헤더 (총 개수, 동기화 인디케이터, 추가 버튼) |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 6. 링크 카드 목록 (일반 / 인라인 수정 / 삭제 / 클릭 집계)  |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 7. 점선 퀵 추가 버튼 (+ 새 링크 카드 추가하기)            |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 8. 하단 액션 버튼 (프로필 링크 복사, 메일 문의)           |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   |  | 9. 푸터 브랜딩 (Powered by MyLink)                        |  |   |
|   |  +-----------------------------------------------------------+  |   |
|   +-----------------------------------------------------------------+   |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 📁 프로젝트 폴더 구조 (Project Structure)

```text
my-link-cy/
├── mylink/                       # Next.js 애플리케이션 루트
│   ├── src/
│   │   ├── app/
│   │   │   ├── [displayname]/    # 공개 사용자 프로필 페이지 및 동적 OG 이미지
│   │   │   │   ├── not-found.tsx
│   │   │   │   ├── opengraph-image.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── api/              # 내부 API 엔드포인트
│   │   │   │   ├── links/route.ts
│   │   │   │   └── profile/route.ts
│   │   │   ├── mypage/           # 내 프로필 설정 및 링크 관리 페이지
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── stats/            # 실시간 클릭 통계 및 차트 대시보드
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx        # 전역 루트 레이아웃 (폰트, 메타데이터 등)
│   │   │   ├── page.tsx          # 메인 랜딩 & 대시보드 진입점
│   │   │   ├── globals.css       # Tailwind CSS v4 테마 및 전역 스타일
│   │   │   ├── manifest.ts       # 웹 앱 매니페스트 (PWA 지원)
│   │   │   ├── robots.ts         # 검색엔진 크롤링 규칙
│   │   │   └── sitemap.ts        # 동적 사이트맵
│   │   ├── components/
│   │   │   ├── landing/          # 랜딩 페이지 섹션 컴포넌트군
│   │   │   ├── ui/               # 공통 UI 컴포넌트 (버튼, 다이얼로그, 카드 등)
│   │   │   ├── AddLinkDialog.tsx
│   │   │   ├── LinkCard.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── StatsCharts.tsx
│   │   │   └── ...
│   │   ├── hooks/                # 커스텀 훅 (인증, 데이터 조회, 클릭 추적)
│   │   │   ├── useAuth.ts
│   │   │   ├── useMyLinkData.ts
│   │   │   └── useLinkClickMutation.ts
│   │   ├── lib/                  # 유틸리티 및 클라이언트 설정
│   │   │   ├── firebase.ts       # Firebase 초기화
│   │   │   ├── queries/          # Firestore 쿼리 함수
│   │   │   └── validations/      # Zod 유효성 검증 스키마
│   │   └── types/                # 공통 TypeScript 타입 인터페이스
│   ├── public/                   # 정적 자산 (아이콘, 이미지 등)
│   ├── package.json
│   └── tsconfig.json
├── AGENTS.md                     # 프로젝트 개발 에이전트 지침
├── wireframe.md                  # 화면 구성 및 상세 명세 와이어프레임
└── README.md                     # 프로젝트 전체 소개 문서 (현재 파일)
```

---

## 🚀 시작 가이드 (Getting Started)

### 사전 요구 사항
- **Node.js**: v18.18.0 이상 권장
- **npm** (또는 pnpm / yarn)

### 환경 변수 설정 (`.env.local`)
`mylink/` 디렉토리 내에 `.env.local` 파일을 생성하고 Firebase 프로젝트 설정을 입력합니다:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 설치 및 로컬 실행

1. **저장소 클론 및 패키지 설치**
   ```bash
   cd mylink
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저 접속**
   웹 브라우저를 열고 `http://localhost:3000`으로 이동합니다.

---

## 🌐 주요 라우트 안내 (Routes)

| 경로 | 설명 | 주요 컴포넌트 |
| :--- | :--- | :--- |
| `/` | 메인 랜딩 페이지 및 로그인 시 대시보드 뷰 전환 | `LandingView`, `LandingHero`, `InteractiveHandleCheck` |
| `/[displayname]` | 사용자 공개 프로필 페이지 (공유용 링크) | `PublicProfileView`, `LinkCard`, `SocialIconsBar` |
| `/mypage` | 내 프로필 정보 및 등록 링크 관리 | `ProfileEditForm`, `LinkCard`, `AddLinkDialog` |
| `/stats` | 링크별 클릭 수 통계 및 차트 대시보드 | `StatsCharts`, `Recharts` |

---

## 🎨 디자인 시스템 (NOL Design System)

MyLink는 감각적이고 신뢰감을 주는 **NOL Design System**을 적용했습니다:

- **Primary Color**: `#4154FF` (NOL Blue)
- **Background**: `#F7F8FB` (정돈되고 안정감 있는 미색 톤)
- **Container Shape**: `rounded-[28px]`의 부드러운 모서리와 `border-[#E5E7EB]` 1px 섬세한 라인
- **Micro Interactions**: 부드러운 호버 스케일 업 애니메이션, 탭 피드백, 슬라이드 토스트
- **Accessibility**: 고대비 텍스트, 키보드 네비게이션, 모바일 터치 최적화 버튼 패딩

---

## 👥 팀 및 기여 (Contributors)

- **프로젝트 명**: MyLink
- **저작권 및 라이선스**: MIT License
