# [RPD] 마이링크 (MyLink) - 링크트리 클론 서비스 기능 정의서

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 프로젝트 명
- **마이링크 (MyLink)**: 개인 크리에이터 및 SNS 사용자를 위한 반응형 멀티링크 올인원 서비스

### 1.2 개발 목적 및 배경
- 인스타그램, 유튜브, 틱톡 등 단일 프로필 링크만 등록 가능한 SNS 환경에서 사용자가 여러 콘텐츠와 채널을 한곳에 모아 보여줄 수 있는 멀티링크 허브를 제공합니다.
- **단계별 시연(Live Demo) 목적에 맞춰**, 복잡한 백엔드 설정 없이 **Next.js 16 + React 19 + Tailwind CSS v4 + Shadcn/ui + LocalStorage**를 기반으로 1단계(프로필 페이지)부터 점진적으로 완성해 나가는 구조로 개발합니다.

### 1.3 디자인 시스템 및 스타일링 원칙 (Design System & Styling Principles)
- **NOL 디자인 시스템 (NOL Design System) 준수 (`docs/design.md`)**:
  - 흰 바탕 위에 채도 높은 파랑(`primary-main: #4154FF`)을 CTA와 선택에 아껴 쓰고, 거의 검정인 본문 글자(`neutral-main: #1B1C1F`), 아주 연한 회색 면(`neutral-weak: #F7F8FB`), 1px 연한 테두리(`neutral-weak2: #E9EAEF`)로 깊이를 만듭니다.
  - 검색창/칩/배지는 알약형(`rounded-full`), 버튼과 카드는 12·16 둥근 사각(`rounded-[12px]`, `rounded-[16px]`), 히어로는 `rounded-[28px]`의 부드러운 곡률을 적용합니다.
- **Shadcn/ui 기반 재사용 컴포넌트 아키텍처 (Component Reusability)**:
  - 모든 UI 요소(Button, Card, Avatar, Badge, Toast 등)는 `src/components/ui/` 하위에 위치한 `Shadcn/ui`의 CVA(Class Variance Authority) 및 Radix UI 기반 표준 디자인 시스템으로 구현합니다.
- **Tailwind CSS v4 스타일링 단일화 (Tailwind CSS Unification)**:
  - 모든 페이지 및 컴포넌트의 스타일은 **Tailwind CSS 유틸리티 클래스 및 CSS 변수 체계로 100% 통일**합니다.
  - `globals.css`의 `@theme inline`을 통해 NOL 브랜드 및 시맨틱 컬러 토큰을 일원화 관리합니다.

### 1.4 개발 진행 전략 (Phased Demo Approach)
- **1단계 (현재 구현 범위 - 핵심)**: **NOL 디자인 시스템 기반 Shadcn/ui 및 LocalStorage를 활용한 완성형 프로필 페이지 (Profile Page)**
  - 대시보드 및 통계 기능은 제외하고, 독립적으로 완벽하게 동작하는 멀티링크 프로필 화면에 집중
- **2단계 (차기 확장 범위)**: 링크/테마 편집 대시보드 에디터 (`/admin`)
- **3단계 (차기 확장 범위)**: 방문자 및 링크 클릭수 통계 분석 (`Analytics`)

---

## 2. 기술 스택 및 시스템 아키텍처

### 2.1 기술 스택
| 분류 | 기술 / 라이브러리 | 용도 |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | 풀스택 프레임워크 및 라우팅 |
| **Language** | TypeScript | 타입 안정성 보장 |
| **Design System** | **NOL Design System (`docs/design.md`) + Shadcn/ui** | CVA, Radix UI 기반 모던 재사용 UI 컴포넌트 시스템 |
| **Styling** | **Tailwind CSS v4 (CSS-First)** | 전역 유틸리티 퍼스트 스타일링 단일화 및 CSS 변수 테마 |
| **Icons** | Lucide React + 커스텀 SVG | 표준화된 벡터 아이콘 세트 |
| **State & Storage** | React Context / Hooks + LocalStorage | 클라이언트 상태 관리 및 데이터 영속화 |

---

## 3. 사용자 시나리오 (User Scenarios)

### 시나리오 1: 방문자(게스트)의 프로필 탐색 및 링크 이용 여정 (1단계 핵심 흐름)
* **주요 페르소나**: 크리에이터의 SNS를 구독 중인 모바일 방문자 "민지"
* **상황 / 맥락**: 인스타그램 바이오 링크(`mylink.com/@shinyong`)를 터치하여 방문
* **진행 흐름**:
  1. **페이지 진입**: 모바일 브라우저에서 딜레이 없이 NOL 디자인 시스템 스타일로 정돈된 마이링크 프로필 화면이 즉시 로드된다.
  2. **프로필 탐색**: 크리에이터의 아바타, 닉네임, 한 줄 소개, 소셜 아이콘 바(유튜브, 인스타그램, 깃허브)를 한눈에 파악한다.
  3. **콘텐츠 이동**: 등록된 링크 카드(예: "최신 프로젝트 포트폴리오", "기술 블로그") 중 관심 있는 카드를 탭한다.
  4. **외부 연결**: 새 탭/새 창으로 매끄럽게 연결되어 대상 웹사이트로 이동한다.
  5. **링크 공유**: 상단/하단의 `[공유/복사]` 버튼을 눌러 URL을 복사하고 "링크가 복사되었습니다!" 토스트 메시지를 확인한 뒤 친구에게 전달한다.

---

### 시나리오 2: 시연 데모 사용자의 첫 방문 및 데이터 유지 여정 (LocalStorage 검증)
* **주요 페르소나**: 마이링크 데모를 체험하는 사용자/평가자 "준호"
* **상황 / 맥락**: 별도의 로그인 과정 없이 서비스 프로토타입을 테스트
* **진행 흐름**:
  1. **초기 자동 시딩**: 처음 웹페이지에 접속했을 때 빈 화면이 아닌, 완성도 높은 Mock 프로필(이름, 소개, 소셜 링크, 링크 목록)이 자동으로 로드된다.
  2. **데이터 영속성 확인**: 브라우저를 새로고침(`F5`)하거나 브라우저를 닫았다가 다시 열어도 `localStorage`에 보존된 프로필 데이터가 그대로 유지된다.
  3. **반응형 뷰 체감**: PC 모니터에서는 중앙 집중식 카드 레이아웃으로, 모바일 화면에서는 꽉 찬 모바일 최적화 레이아웃으로 자연스럽게 반응함을 확인한다.

---

### 시나리오 3: 크리에이터의 프로필 커스텀 및 관리 여정 (2~3단계 차후 흐름)
* **주요 페르소나**: 자신의 링크 허브를 직접 꾸미고 관리하고 싶은 크리에이터 "수현"
* **상황 / 맥락**: 새로운 유튜브 영상을 업로드하고 마이링크에 링크를 추가
* **진행 흐름**:
  1. **에디터 진입**: 관리자(`/admin`) 화면으로 이동하여 좌측의 [링크 탭]을 연다.
  2. **링크 추가 & 순서 변경**: `[+ 새 링크 추가]`를 눌러 제목과 URL을 입력하고, 실시간 우측 모바일 프리뷰에 즉시 반영되는 모습을 확인한다.
  3. **테마 변경**: [테마 탭]에서 마음에 드는 프리셋 테마(예: NOL Blue, Dark Slate)와 버튼 스타일을 선택한다.
  4. **성과 확인**: [통계 탭]에서 어떤 링크가 방문자들에게 가장 많이 클릭되었는지 클릭 랭킹 지표를 확인한다.

---

## 4. 1단계: LocalStorage 기반 프로필 페이지 상세 기능 정의

### 4.1 화면 개요
- 모바일 화면(360px ~ 430px)에 최적화된 유려하고 직관적인 카드형 멀티링크 페이지
- **NOL 디자인 시스템 + Shadcn/ui (Button, Card, Avatar, Badge, Toast)** 컴포넌트 체계 및 Tailwind CSS 단일화 적용
- 외부 서버 의존 없이 **브라우저의 `localStorage`에서 데이터를 직접 읽어와 렌더링**

```
+-------------------------------------------------------------+
|                      [ 상단 유틸리티 바 ]                      |
|  ● mylink.com/@shinyong                         [ 🔗 공유 ]  |
+-------------------------------------------------------------+
|                                                             |
|                   +-------------------+                     |
|                   |   [프로필 아바타]  |                     |
|                   |  (rounded-24/96px)|                     |
|                   +-------------------+                     |
|                                                             |
|                         신 찬 용                            |
|                        @chanyong                            |
|                                                             |
|                 [ 💻 STUDENT DEVELOPER ]                    |
|                        (NOL 뱃지)                            |
|                                                             |
|           "우아하고 직관적인 코드로 문제를 해결하는          |
|                 프론트엔드 개발자입니다 🚀"                  |
|                        (한 줄 소개)                          |
|                                                             |
|            +------------------------------------+           |
|            |  📷      ▶️      🐙      ✖️      ✉️  |           |
|            | Insta  YouTube  GitHub Twitter Mail|           |
|            +------------------------------------+           |
|                     (소셜 아이콘 바)                         |
|                                                             |
|   - - - - - - - - - - - - - - - - - - - - - - - - - - - -   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | 🌐  포트폴리오 웹사이트                     [HOT] ↗ |   |
|   |     진행했던 주요 프로젝트 데모 및 상세 소개         |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | 📝  기술 블로그 (Velog)                           ↗ |   |
|   |     프론트엔드 학습 기록 및 트러블슈팅 일지          |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | 💼  이력서 & 경력 기술서 (Notion)                 ↗ |   |
|   |     학력, 보유 기술 스택, 자격 사항 정리             |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | ☕  커피챗 / 1:1 질문하기                         ↗ |   |
|   |     협업 및 개발 관련 편하게 연락주세요!             |   |
|   +-----------------------------------------------------+   |
|                                                             |
|                                                             |
|                 [ 📋 전체 프로필 링크 복사 ]                 |
|                                                             |
|           ⚡ Powered by MyLink · NOL Design System          |
|                                                             |
+-------------------------------------------------------------+
```

### 4.2 상세 기능 요구사항

#### 4.2.1 데이터 로드 & LocalStorage 동기화
1. **초기 Mock 데이터 자동 시딩 (Auto Seeding)**:
   - 페이지 첫 진입 시 `localStorage`에 저장된 프로필 데이터가 없으면, 고품질 샘플 데이터(기본 프로필, 소셜 링크, 추천 링크 목록, 기본 테마)를 `localStorage`에 자동 저장하고 렌더링
2. **LocalStorage 기반 데이터 조회**:
   - `localStorage`에 저장된 최신 프로필 정보 및 링크 목록을 불러와 UI에 반영
   - 클라이언트 사이드 Hydration 이슈 방지를 위한 안전한 마운트 로직 적용

#### 4.2.2 프로필 영역 (Profile Header)
1. **아바타 (Shadcn Avatar / Frame)**:
   - `rounded-[24px]` 형태의 프로필 사진 렌더링, 1px 미세 테두리 및 부드러운 스케일 업 애니메이션
2. **기본 정보 & 뱃지 (Shadcn Badge)**:
   - 이름 (Display Name), 유저네임 (@username), 한 줄 소개 (Bio)
   - 상태/역할 뱃지 (`variant="primary"`, `variant="neutral"`)

#### 4.2.3 소셜 아이콘 바 (Social Icons Bar)
- 활성화된 소셜 플랫폼(Instagram, YouTube, GitHub, Twitter/X, TikTok, Email 등)의 아이콘 바 렌더링 (Shadcn `Button` variant="outline" size="iconSm" 적용)
- 아이콘 클릭 시 새 탭(`target="_blank"`, `rel="noopener noreferrer"`)으로 해당 소셜 주소 이동

#### 4.2.4 커스텀 링크 목록 (Shadcn Card / Button 기반)
1. **링크 버튼 & 카드 UI**:
   - Shadcn `Card` (variant: `interactive`) 및 `Badge`, 쉐브론 아이콘을 조합하여 세련되게 모듈화
   - 제목(Title), 부제목/설명(Subtitle/Description), 카테고리 뱃지 노출
   - 활성화(`enabled: true`)된 링크만 화면에 노출
2. **인터랙션 & 호버 효과**:
   - 마우스 호버 시 1px 연한 테두리(`border-primary-weak2`) 및 미세한 배경 전환(`hover:bg-neutral-veryweak`)
   - 클릭 시 지정된 대상 URL로 새 탭 이동 및 클릭수 증가 집계

#### 4.2.5 테마 및 스타일링 (NOL Design System + Tailwind CSS v4)
- 모든 스타일은 Tailwind CSS v4 CSS-First 테마로 단일화:
  - **테마 토큰**: `globals.css`의 `@theme inline`을 통해 `primary-main (#4154FF)`, `neutral-main (#1B1C1F)`, `neutral-weak (#F7F8FB)` 등 NOL 색상 일원화
  - **버튼 & 카드 스타일**: Shadcn CVA variants(`primary`, `secondary`, `outline`, `interactive` 등)로 체계화
  - **깊이 & 곡률**: 1px 테두리 기반의 레이어링 및 12·16·28px 둥근 모서리 적용

#### 4.2.6 편의 기능 (Utilities)
1. **링크 복사 및 공유 (Copy & Share)**:
   - `[공유 / 링크 복사]` 버튼 클릭 시 현재 페이지 URL을 클립보드에 복사 (Shadcn `Button` 기반)
   - 복사 완료 시 Shadcn `Toast` 팝업 피드백 출력 (`bg-neutral-main text-white shadow-nol-2`)

---

## 5. 1단계 데이터 모델 & 더미 데이터 명세 (Mock Data & TypeScript Interface)

### 5.1 TypeScript 인터페이스
```typescript
// 소셜 아이콘 데이터 모델
export interface SocialLink {
  id: string;
  platform: 'instagram' | 'youtube' | 'github' | 'twitter' | 'tiktok' | 'threads' | 'email' | 'blog' | 'linkedin' | 'discord';
  url: string;
  enabled: boolean;
}

// 커스텀 링크 카드 데이터 모델
export interface CustomLink {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  badge?: string;
  category?: string;
  enabled: boolean;
  highlight?: boolean;
  clicks?: number;
  icon?: string;
  bgColor?: string;
  badgeColor?: string;
}

// 테마 설정 모델
export interface ThemeConfig {
  presetId: string;
  name?: string;
  backgroundClass: string;
  textColor: string;
  subTextColor?: string;
  cardBg: string;
  cardBorder: string;
  buttonStyle: 'rounded' | 'pill' | 'sharp' | 'outline' | 'shadow' | 'glass';
  buttonBg: string;
  buttonText: string;
  buttonBorder?: string;
  buttonShadow?: string;
  accentColor: string;
}

// 전체 프로필 데이터 모델
export interface MyLinkProfile {
  username: string;
  displayName: string;
  englishName?: string;
  role?: string;
  bio: string;
  avatarUrl: string;
  badge?: string;
  location?: string;
  email?: string;
  school?: string;
  theme: ThemeConfig;
  socials: SocialLink[];
  links: CustomLink[];
  updatedAt?: string;
}
```

---

## 6. 1단계 검증 기준 (Verification Criteria)

- [ ] **NOL 디자인 시스템 명세 보존**: `docs/design.md`가 정상 생성되어 참조 가능한가?
- [ ] **더미 데이터 초기 세팅**: TypeScript 모듈 및 JSON/API 기반 더미 데이터가 정상 로드되는가?
- [ ] **NOL 스타일링 및 Shadcn/ui 렌더링**: Button, Card, Avatar, Badge, Toast 등 모든 UI 컴포넌트가 NOL 블루(`primary-main: #4154FF`) 및 1px 테두리, 둥근 모서리 스케일로 표시되는가?
- [ ] **초기 데이터 로딩**: `localStorage`에 데이터가 없을 때 기본 Mock 데이터가 정상 세팅되어 화면에 표시되는가?
- [ ] **데이터 렌더링**: 프로필 사진, 이름, 소개글, 소셜 아이콘 바, 링크 목록이 NOL 스타일에 맞춰 완벽히 표시되는가?
- [ ] **링크 이동**: 링크 및 소셜 아이콘 클릭 시 해당 URL로 새 창 이동이 정상 동작하는가?
- [ ] **링크 복사**: 공유/복사 버튼 클릭 시 주소가 복사되고 완료 토스트가 나타나는가?
- [ ] **반응형 뷰**: 모바일 및 데스크톱 브라우저 환경에서 깔끔하고 중앙 집중된 카드 뷰로 렌더링되는가?
