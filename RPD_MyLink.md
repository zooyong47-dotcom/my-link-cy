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
