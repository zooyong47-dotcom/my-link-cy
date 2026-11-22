"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  MousePointerClick,
  CheckCircle2,
  ExternalLink,
  Flame,
  Globe,
  Palette,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon, GithubIcon, YoutubeIcon, InstagramIcon } from "@/components/icons";

interface LandingHeroProps {
  onLogin: () => void;
  isLoggingIn?: boolean;
}

type ThemeKey = "blue" | "purple" | "dark" | "emerald";

interface ThemeStyle {
  name: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  bannerGradient: string;
  linkBg: string;
  linkBorder: string;
  linkText: string;
  linkHover: string;
  accentBadge: string;
  dotColor: string;
}

const THEMES: Record<ThemeKey, ThemeStyle> = {
  blue: {
    name: "Classic Blue",
    bgGradient: "from-[#F7F8FB] to-[#EDF2FF]",
    cardBg: "bg-white",
    cardBorder: "border-neutral-weak2",
    textPrimary: "text-[#1B1C1F]",
    textSecondary: "text-[#6E6F73]",
    bannerGradient: "from-[#3549FF] via-[#4154FF] to-[#6181EA]",
    linkBg: "bg-white",
    linkBorder: "border-[#E9EAEF]",
    linkText: "text-[#1B1C1F]",
    linkHover: "hover:border-[#4154FF] hover:bg-[#F5F6FF]",
    accentBadge: "bg-[#4154FF] text-white",
    dotColor: "bg-[#4154FF]",
  },
  purple: {
    name: "Vivid Purple",
    bgGradient: "from-[#FAF5FF] to-[#F3E8FF]",
    cardBg: "bg-[#FAF8FF]",
    cardBorder: "border-purple-200",
    textPrimary: "text-purple-950",
    textSecondary: "text-purple-600",
    bannerGradient: "from-[#7C3AED] via-[#9333EA] to-[#C084FC]",
    linkBg: "bg-white",
    linkBorder: "border-purple-100",
    linkText: "text-purple-950",
    linkHover: "hover:border-purple-400 hover:bg-purple-50",
    accentBadge: "bg-purple-600 text-white",
    dotColor: "bg-purple-600",
  },
  dark: {
    name: "Dark Chic",
    bgGradient: "from-[#18181B] to-[#27272A]",
    cardBg: "bg-[#18181B]",
    cardBorder: "border-zinc-800",
    textPrimary: "text-zinc-100",
    textSecondary: "text-zinc-400",
    bannerGradient: "from-zinc-900 via-zinc-800 to-zinc-700",
    linkBg: "bg-zinc-900/90",
    linkBorder: "border-zinc-800",
    linkText: "text-zinc-100",
    linkHover: "hover:border-zinc-600 hover:bg-zinc-800",
    accentBadge: "bg-zinc-100 text-zinc-900",
    dotColor: "bg-zinc-300",
  },
  emerald: {
    name: "Forest Mint",
    bgGradient: "from-[#F0FDF4] to-[#DCFCE7]",
    cardBg: "bg-[#F7FDF9]",
    cardBorder: "border-emerald-200",
    textPrimary: "text-emerald-950",
    textSecondary: "text-emerald-700",
    bannerGradient: "from-[#059669] via-[#10B981] to-[#34D399]",
    linkBg: "bg-white",
    linkBorder: "border-emerald-100",
    linkText: "text-emerald-950",
    linkHover: "hover:border-emerald-400 hover:bg-emerald-50",
    accentBadge: "bg-emerald-600 text-white",
    dotColor: "bg-emerald-600",
  },
};

export function LandingHero({ onLogin, isLoggingIn }: LandingHeroProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("blue");
  const [clickCount, setClickCount] = useState(1420);
  const [clickedLinkId, setClickedLinkId] = useState<string | null>(null);
  const [showClickBadge, setShowClickBadge] = useState(false);

  const currentTheme = THEMES[selectedTheme];

  const handleMockLinkClick = (id: string) => {
    setClickedLinkId(id);
    setClickCount((prev) => prev + 1);
    setShowClickBadge(true);
    setTimeout(() => {
      setClickedLinkId(null);
    }, 600);
    setTimeout(() => {
      setShowClickBadge(false);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* 배경 장식 블러 그라디언트 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-primary-weak1 via-primary-weak2/40 to-transparent blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 w-96 h-96 rounded-full bg-[#6181EA]/20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* 좌측: 타이틀, 메시지, 액션 CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-7">
            {/* 상단 캡슐 태그 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-weak2/90 bg-primary-weak px-3.5 py-1.5 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-primary-main animate-pulse" />
              <span className="text-xs font-bold text-primary-main">
                ✨ 1분 만에 완성하는 나만의 링크 페이지
              </span>
            </div>

            {/* 헤드라인 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-main leading-[1.18]">
              흩어진 나를 모으는
              <br />
              단 하나의{" "}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-r from-primary-main via-[#4154FF] to-[#6181EA] bg-clip-text text-transparent">
                  감각적인 프로필
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 18"
                  className="absolute left-0 -bottom-2 w-full text-primary-weak2/80 -z-10"
                  fill="none"
                >
                  <path
                    d="M3 13C80 3 200 4 277 11"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* 서브 설명 */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-strong1 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              포트폴리오, 인스타그램, 깃허브, 유튜브, 블로그까지.
              <br className="hidden sm:inline" />
              복잡한 코딩 없이 나만의 브랜드 링크를 만들고 실시간 방문자 클릭 수까지 한눈에 분석하세요.
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                onClick={onLogin}
                disabled={isLoggingIn}
                size="lg"
                variant="primary"
                className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-7 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-primary-main/25 hover:shadow-primary-main/35 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2.5 cursor-pointer"
              >
                <GoogleIcon className="w-5 h-5 shrink-0 bg-white rounded-full p-0.5" />
                <span>{isLoggingIn ? "Google 로그인 중..." : "Google로 무료 시작하기"}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Button>

              <Button
                onClick={() => scrollToSection("interactive-demo")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-13 px-6 rounded-full text-sm sm:text-base font-semibold border-neutral-weak2 hover:border-primary-weak2 hover:text-primary-main bg-static-white/80 backdrop-blur-xs cursor-pointer gap-2"
              >
                <Sparkles className="w-4 h-4 text-primary-main" />
                <span>체험 데모 둘러보기</span>
              </Button>
            </div>

            {/* 소셜 프루프 칩들 */}
            <div className="pt-3 border-t border-neutral-weak1/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-neutral-medium">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary-main" />
                <span>별도 설치 없이 웹에서 바로 사용</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary-main" />
                <span>모바일 최적화 반응형 뷰</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary-main" />
                <span>실시간 통계 및 차트 제공</span>
              </div>
            </div>
          </div>

          {/* 우측: 재미있는 인터랙티브 폰 목업 쇼케이스 */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 테마 컨트롤 칩 (사용자가 직접 눌러볼 수 있음) */}
            <div className="mb-3.5 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-static-white border border-neutral-weak2 shadow-2xs">
              <span className="text-[11px] font-semibold text-neutral-strong1 pl-2.5 pr-1 flex items-center gap-1 whitespace-nowrap">
                <Palette className="w-3 h-3 text-primary-main" />
                <span className="hidden sm:inline">테마 체험:</span>
              </span>
              {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
                const theme = THEMES[themeKey];
                const isActive = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => setSelectedTheme(themeKey)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "bg-primary-main text-white shadow-xs"
                        : "text-neutral-strong1 hover:text-neutral-main hover:bg-neutral-weak"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${theme.dotColor}`} />
                    <span>{theme.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* 스마트폰 프레임 목업 */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              {/* 플로팅 실시간 클릭 카운터 배지 */}
              <div
                className={`absolute -top-3 -right-2 sm:-right-4 z-20 rounded-full border border-primary-weak2 bg-static-white px-3 py-1.5 shadow-md flex items-center gap-1.5 transition-transform duration-300 ${
                  showClickBadge ? "scale-110 ring-2 ring-primary-main/40" : "scale-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-neutral-main whitespace-nowrap">
                  누적 클릭 <span className="tabular-nums text-primary-main">{clickCount.toLocaleString()}</span>회
                </span>
                {showClickBadge && (
                  <span className="text-[11px] font-bold text-primary-main animate-bounce">
                    +1!
                  </span>
                )}
              </div>

              {/* 디바이스 외곽선 */}
              <div className="rounded-[40px] p-2.5 bg-neutral-900 shadow-2xl border-4 border-neutral-800 ring-1 ring-black/10">
                {/* 상단 다이내믹 아일랜드 / 스피커 */}
                <div className="relative mx-auto w-24 h-4 rounded-full bg-black mb-1.5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                </div>

                {/* 폰 화면 내부 컨테이너 */}
                <div
                  className={`relative rounded-[32px] overflow-hidden border ${currentTheme.cardBorder} ${currentTheme.cardBg} transition-colors duration-300 min-h-[480px] pb-5`}
                >
                  {/* 커버 배너 */}
                  <div
                    className={`relative h-20 w-full bg-gradient-to-r ${currentTheme.bannerGradient} overflow-hidden`}
                  >
                    <Image
                      src="/cover.svg"
                      alt=""
                      fill
                      className="object-cover object-center opacity-30 mix-blend-overlay"
                    />
                    <div className="absolute top-2 right-2 rounded-full bg-black/25 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono text-white/90">
                      mylink.com/seoyeon
                    </div>
                  </div>

                  {/* 프로필 정보 */}
                  <div className="px-4 pt-1">
                    <div className="-mt-9 flex items-end justify-between mb-2">
                      <div className="w-16 h-16 rounded-[16px] border-2 border-white shadow-sm overflow-hidden bg-white">
                        <Image
                          src="/avatar.svg"
                          alt="Seoyeon"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="rounded-full bg-primary-weak border border-primary-weak2 px-2 py-0.5 text-[10px] font-bold text-primary-main">
                        Live Demo
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className={`text-base font-bold ${currentTheme.textPrimary}`}>
                          이서연
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-main" />
                      </div>
                      <div className="text-[11px] font-mono text-neutral-medium">
                        @seoyeon · Tech Creator
                      </div>
                      <p className={`text-xs ${currentTheme.textSecondary} pt-1 line-clamp-2`}>
                        세상을 편하게 만드는 웹 프로덕트를 만듭니다. 디자인과 프론트엔드 기록 🚀
                      </p>
                    </div>

                    {/* 소셜 아이콘 바 */}
                    <div className="mt-3 flex items-center justify-center gap-3 py-1.5 border-y border-neutral-weak1/70">
                      <GithubIcon className="w-4 h-4 text-neutral-strong1 hover:text-neutral-main" />
                      <InstagramIcon className="w-4 h-4 text-neutral-strong1 hover:text-neutral-main" />
                      <YoutubeIcon className="w-4 h-4 text-accent-main" />
                      <Globe className="w-4 h-4 text-primary-main" />
                    </div>

                    {/* 인터랙티브 링크 목록 (클릭 체험 가능) */}
                    <div className="mt-3 space-y-2">
                      <div className="text-[10px] font-bold text-neutral-medium px-0.5 flex items-center justify-between">
                        <span>클릭해서 체험해 보세요! 👇</span>
                        <span className="text-primary-main font-semibold">Touch to click</span>
                      </div>

                      {/* 1. 하이라이트 링크 (YouTube) */}
                      <button
                        type="button"
                        onClick={() => handleMockLinkClick("yt")}
                        className={`w-full p-2.5 rounded-[14px] border transition-all text-left flex items-center justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                          currentTheme.linkBg
                        } ${currentTheme.linkBorder} ${currentTheme.linkHover} ${
                          clickedLinkId === "yt" ? "scale-[0.98] ring-2 ring-primary-main" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="w-8 h-8 rounded-[10px] bg-accent-weak text-accent-main flex items-center justify-center shrink-0">
                            <YoutubeIcon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className={`text-xs font-bold truncate ${currentTheme.linkText}`}>
                                포트폴리오 메이킹 영상
                              </span>
                              <span className="rounded-full bg-accent-weak text-accent-main text-[9px] font-bold px-1.5 py-0.5 shrink-0 whitespace-nowrap">
                                HOT
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-medium truncate block mt-0.5">
                              youtube.com/@seoyeon_dev
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-medium group-hover:text-primary-main shrink-0" />
                      </button>

                      {/* 2. 일반 링크 (GitHub) */}
                      <button
                        type="button"
                        onClick={() => handleMockLinkClick("gh")}
                        className={`w-full p-2.5 rounded-[14px] border transition-all text-left flex items-center justify-between gap-2.5 cursor-pointer group ${
                          currentTheme.linkBg
                        } ${currentTheme.linkBorder} ${currentTheme.linkHover} ${
                          clickedLinkId === "gh" ? "scale-[0.98] ring-2 ring-primary-main" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="w-8 h-8 rounded-[10px] bg-neutral-weak text-neutral-main flex items-center justify-center shrink-0">
                            <GithubIcon className="w-4 h-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className={`text-xs font-bold truncate block ${currentTheme.linkText}`}>
                              오픈소스 프로젝트 깃허브
                            </span>
                            <span className="text-[10px] text-neutral-medium truncate block mt-0.5">
                              github.com/seoyeon
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-medium group-hover:text-primary-main shrink-0" />
                      </button>

                      {/* 3. 일반 링크 (Blog) */}
                      <button
                        type="button"
                        onClick={() => handleMockLinkClick("blog")}
                        className={`w-full p-2.5 rounded-[14px] border transition-all text-left flex items-center justify-between gap-2.5 cursor-pointer group ${
                          currentTheme.linkBg
                        } ${currentTheme.linkBorder} ${currentTheme.linkHover} ${
                          clickedLinkId === "blog" ? "scale-[0.98] ring-2 ring-primary-main" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="w-8 h-8 rounded-[10px] bg-primary-weak text-primary-main flex items-center justify-center shrink-0">
                            <Globe className="w-4 h-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className={`text-xs font-bold truncate block ${currentTheme.linkText}`}>
                              기술 블로그 & 회고록
                            </span>
                            <span className="text-[10px] text-neutral-medium truncate block mt-0.5">
                              velog.io/@seoyeon
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-medium group-hover:text-primary-main shrink-0" />
                      </button>
                    </div>

                    {/* 하단 푸터 표기 */}
                    <div className="mt-4 text-center">
                      <span className="text-[10px] text-neutral-medium font-medium">
                        Powered by <strong className="text-primary-main">MyLink</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 그림자 받침 */}
              <div
                aria-hidden="true"
                className="w-4/5 mx-auto h-4 bg-black/15 blur-md rounded-full mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
