# [RPD] 마이링크 (MyLink) - 링크트리 클론 서비스 기능 정의서

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 프로젝트 명
- **마이링크 (MyLink)**: 개인 크리에이터 및 SNS 사용자를 위한 반응형 멀티링크 올인원 서비스

### 1.2 개발 목적 및 배경
- 인스타그램, 유튜브, 틱톡 등 단일 프로필 링크만 등록 가능한 SNS 환경에서 사용자가 여러 콘텐츠와 채널을 한곳에 모아 보여줄 수 있는 멀티링크 허브를 제공합니다.
- **단계별 시연(Live Demo) 목적에 맞춰**, 복잡한 백엔드 설정 없이 **Next.js 16 + React 19 + Tailwind CSS + LocalStorage**를 기반으로 1단계(프로필 페이지)부터 점진적으로 완성해 나가는 구조로 개발합니다.

### 1.3 개발 진행 전략 (Phased Demo Approach)
- **1단계 (현재 구현 범위 - 핵심)**: **LocalStorage를 활용한 완성형 프로필 페이지 (Profile Page)**
  - 대시보드 및 통계 기능은 제외하고, 독립적으로 완벽하게 동작하는 멀티링크 프로필 화면에 집중
- **2단계 (차기 확장 범위)**: 링크/테마 편집 대시보드 에디터 (`/admin`)
- **3단계 (차기 확장 범위)**: 방문자 및 링크 클릭수 통계 분석 (`Analytics`)

---

## 2. 1단계: LocalStorage 기반 프로필 페이지 상세 기능 정의

### 2.1 화면 개요
- 모바일 화면(360px ~ 430px)에 최적화된 유려하고 직관적인 카드형 멀티링크 페이지
- 외부 서버 의존 없이 **브라우저의 `localStorage`에서 데이터를 직접 읽어와 렌더링**

```
+------------------------------------+
|                                    |
|          [ 프로필 아바타 ]          |
|              @username             |
|         "한 줄 소개 텍스트"         |
|         [상태 뱃지 / 역할]          |
|                                    |
|        ( 📷  ▶️  🐙  ✖️  ✉️ )         |
|         [소셜 아이콘 바]           |
|                                    |
|   +----------------------------+   |
|   | 🔗 포트폴리오 웹사이트       |   |
|   +----------------------------+   |
|   | 📝 기술 블로그 바로가기      |   |
|   +----------------------------+   |
|   | ☕ 커피챗 / 문의하기         |   |
|   +----------------------------+   |
|   | 💼 이력서 / 노션 링크        |   |
|   +----------------------------+   |
|                                    |
|          [링크 복사 / 공유]        |
|          ⚡ Powered by MyLink       |
+------------------------------------+
```

### 2.2 상세 기능 요구사항

#### 2.2.1 데이터 로드 & LocalStorage 동기화
1. **초기 Mock 데이터 자동 시딩 (Auto Seeding)**:
   - 페이지 첫 진입 시 `localStorage`에 저장된 프로필 데이터가 없으면, 고품질 샘플 데이터(기본 프로필, 소셜 링크, 추천 링크 목록, 기본 테마)를 `localStorage`에 자동 저장하고 렌더링
2. **LocalStorage 기반 데이터 조회**:
   - `localStorage`에 저장된 최신 프로필 정보 및 링크 목록을 불러와 UI에 반영
   - 클라이언트 사이드 Hydration 이슈 방지를 위한 안전한 마운트 로직 적용

#### 2.2.2 프로필 영역 (Profile Header)
1. **아바타 이미지**:
   - 원형/스퀘어 라운드 형태의 프로필 사진 렌더링 (호버 애니메이션 포함)
2. **기본 정보**:
   - 이름 (Display Name), 유저네임 (@username), 한 줄 소개 (Bio)
   - 상태/역할 뱃지 (예: `AVAILABLE FOR HIRE`, `STUDENT DEVELOPER` 등)

#### 2.2.3 소셜 아이콘 바 (Social Icons Bar)
- 활성화된 소셜 플랫폼(Instagram, YouTube, GitHub, Twitter/X, TikTok, Email 등)의 공식 브랜드 아이콘 바 렌더링
- 아이콘 클릭 시 새 탭(`target="_blank"`, `rel="noopener noreferrer"`)으로 해당 소셜 주소 이동

#### 2.2.4 커스텀 링크 목록 (Link Cards)
1. **링크 버튼 UI**:
   - 제목(Title), 부제목/설명(Subtitle/Description), 카테고리 뱃지
   - 활성화(`enabled: true`)된 링크만 화면에 노출
2. **인터랙션 & 호버 효과**:
   - 마우스 호버/터치 시 부드러운 스케일 업 및 그림자/컬러 전환 애니메이션
   - 클릭 시 지정된 대상 URL로 새 탭 이동

#### 2.2.5 테마 및 스타일링 (Theming)
- 테마 설정값에 따른 유연한 스타일 렌더링:
  - **배경 스타일**: 단색 컬러, 그라데이션, 또는 도트 패턴
  - **버튼 스타일**: 둥근 모서리(Rounded), 알약형(Pill), 네오브루탈리즘 각진형(Sharp), 외곽선형(Outline)
  - **폰트 및 컬러**: 텍스트 색상 및 강조 컬러 조화

#### 2.2.6 편의 기능 (Utilities)
1. **링크 복사 및 공유 (Copy & Share)**:
   - `[공유하기 / 링크 복사]` 버튼 클릭 시 현재 페이지 URL을 클립보드에 복사
   - 복사 완료 시 토스트(Toast) 팝업 피드백 출력

---

## 3. 1단계 데이터 모델 (TypeScript Interface)

```typescript
// 소셜 아이콘 데이터 모델
export interface SocialLink {
  id: string;
  platform: 'instagram' | 'youtube' | 'github' | 'twitter' | 'tiktok' | 'threads' | 'email' | 'blog';
  url: string;
  enabled: boolean;
}

// 커스텀 링크 카드 데이터 모델
export interface CustomLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  badge?: string;
  enabled: boolean;
  highlight?: boolean;
}

// 테마 설정 모델
export interface ThemeConfig {
  presetId: string;
  backgroundClass: string;
  textColor: string;
  cardBg: string;
  cardBorder: string;
  buttonStyle: 'rounded' | 'pill' | 'sharp' | 'outline' | 'shadow';
  buttonBg: string;
  buttonText: string;
  buttonBorder?: string;
  buttonShadow?: string;
}

// 전체 프로필 데이터 모델 (LocalStorage에 저장되는 단위)
export interface MyLinkProfile {
  username: string;
  displayName: string;
  role?: string;
  bio: string;
  avatarUrl: string;
  badge?: string;
  theme: ThemeConfig;
  socials: SocialLink[];
  links: CustomLink[];
}
```

---

## 4. 후속 확장 계획 (차후 단계)

> [!NOTE]
> 아래 기능들은 현재 시연 단계(1단계: 프로필 페이지) 완료 후 차례대로 구현될 예정입니다.

* **2단계: 대시보드 에디터 (`/admin`)**
  - 실시간 분할 편집기 (좌측: 링크/프로필/테마 편집, 우측: 실시간 모바일 프리뷰)
  - 링크 CRUD, 순서 변경, 실시간 LocalStorage 저장
* **3단계: 통계 분석 (`Analytics`)**
  - 프로필 총 방문수 및 링크별 클릭수 로컬 집계 대시보드

---

## 5. 1단계 검증 기준 (Verification Criteria)

- [ ] **초기 데이터 로딩**: `localStorage`에 데이터가 없을 때 기본 Mock 데이터가 정상 세팅되어 화면에 표시되는가?
- [ ] **데이터 렌더링**: 프로필 사진, 이름, 소개글, 소셜 아이콘 바, 링크 목록이 테마 스타일에 맞춰 완벽히 표시되는가?
- [ ] **링크 이동**: 링크 및 소셜 아이콘 클릭 시 해당 URL로 새 창 이동이 정상 동작하는가?
- [ ] **링크 복사**: 공유/복사 버튼 클릭 시 주소가 복사되고 완료 토스트가 나타나는가?
- [ ] **반응형 뷰**: 모바일 및 데스크톱 브라우저 환경에서 깔끔하고 중앙 집중된 카드 뷰로 렌더링되는가?
