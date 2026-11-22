"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Link2,
  BarChart3,
  Sparkles,
  Share2,
  Flame,
  CheckCircle2,
  TrendingUp,
  Copy,
  ExternalLink,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, YoutubeIcon } from "@/components/icons";

export function FeatureBentoGrid() {
  const [isHighlightedDemo, setIsHighlightedDemo] = useState(true);
  const [copiedLinkIndex, setCopiedLinkIndex] = useState<number | null>(null);

  const handleCopyMock = (index: number) => {
    setCopiedLinkIndex(index);
    setTimeout(() => setCopiedLinkIndex(null), 1500);
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-[#F7F8FB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-weak2 bg-static-white px-3 py-1 text-xs font-bold text-primary-main shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>강력한 핵심 기능</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-main">
            단 1분이면 충분합니다.
            <br />
            당신의 모든 가능성을 담아내세요
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-strong1 font-normal">
            누구나 쉽게 프로필을 완성하고 성과를 분석할 수 있도록 세심하게 설계되었습니다.
          </p>
        </div>

        {/* Bento 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: 스마트 링크 카드 & 하이라이트 (lg:col-span-7) */}
          <Card className="lg:col-span-7 bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-nol-1 flex flex-col justify-between hover:shadow-nol-2 transition-shadow overflow-hidden relative">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between gap-3">
                <span className="w-10 h-10 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center font-bold shrink-0">
                  <Link2 className="w-5 h-5" />
                </span>
                <button
                  type="button"
                  onClick={() => setIsHighlightedDemo(!isHighlightedDemo)}
                  className="text-xs font-bold text-primary-main bg-primary-weak hover:bg-primary-weak1 px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary-main" />
                  <span>하이라이트 토글</span>
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-main pt-2">
                시선을 사로잡는 스마트 링크 카드
              </h3>
              <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                대표 링크를 상단에 강조하거나 눈에 띄는 뱃지와 부드러운 모션으로 방문자의 클릭률을 극대화합니다.
              </p>
            </div>

            {/* 카드 내부 인터랙티브 프리뷰 (반응형 깨짐 방지 레이아웃) */}
            <div className="space-y-2.5 bg-neutral-weak p-3.5 sm:p-4 rounded-[20px] border border-neutral-weak2">
              {/* 강조 카드 */}
              <div
                className={`p-3 sm:p-3.5 rounded-[16px] border transition-all duration-300 flex items-center justify-between gap-2.5 sm:gap-3 ${
                  isHighlightedDemo
                    ? "bg-static-white border-primary-main ring-2 ring-primary-weak2 shadow-sm"
                    : "bg-static-white border-neutral-weak2"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-[10px] bg-accent-weak text-accent-main flex items-center justify-center shrink-0">
                    <YoutubeIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-neutral-main truncate">
                        최신 유튜브 테크 브이로그
                      </span>
                      {isHighlightedDemo && (
                        <Badge
                          variant="accent"
                          className="text-[10px] px-1.5 py-0 h-4 shrink-0 whitespace-nowrap"
                        >
                          <Flame className="w-2.5 h-2.5 mr-0.5" />
                          강조
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-medium truncate block mt-0.5">
                      youtube.com/@tech_review
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyMock(0)}
                  className="h-8 px-2.5 rounded-full text-[11px] font-bold text-primary-main bg-primary-weak hover:bg-primary-weak1 transition-colors shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLinkIndex === 0 ? "복사됨!" : "복사"}</span>
                </button>
              </div>

              {/* 일반 카드 */}
              <div className="p-3 sm:p-3.5 rounded-[16px] border border-neutral-weak2 bg-static-white flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-[10px] bg-neutral-weak text-neutral-main flex items-center justify-center shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-bold text-neutral-main truncate block">
                      사이드 프로젝트 오픈소스 리포지토리
                    </span>
                    <span className="text-[11px] text-neutral-medium truncate block mt-0.5">
                      github.com/developer/my-link
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-medium shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: 실시간 통계 & 클릭수 분석 (lg:col-span-5) */}
          <Card className="lg:col-span-5 bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-nol-1 flex flex-col justify-between hover:shadow-nol-2 transition-shadow">
            <div className="space-y-2 mb-6">
              <span className="w-10 h-10 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-main pt-2">
                실시간 클릭 분석 & 리포트
              </h3>
              <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                어떤 링크가 가장 많은 관심을 받았는지 실시간 순위와 막대 차트로 명쾌하게 확인하세요.
              </p>
            </div>

            {/* 통계 미니 프리뷰 위젯 */}
            <div className="rounded-[20px] bg-gradient-to-br from-[#2432AD] to-[#4154FF] p-4 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/80 font-medium">총 누적 클릭수</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap">
                  <TrendingUp className="w-3 h-3" />
                  이번 주 +24%
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight tabular-nums">4,892</span>
                <span className="text-sm font-bold text-white/80">회</span>
              </div>

              {/* 미니 프로그레스 바 랭킹 */}
              <div className="pt-2 border-t border-white/20 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] gap-2">
                  <span className="truncate text-white/90">🥇 포트폴리오 웹사이트</span>
                  <span className="font-bold tabular-nums shrink-0 whitespace-nowrap">2,180회 (44%)</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: "44%" }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: 퍼스널 브랜딩 프로필 커스터마이징 (lg:col-span-5) */}
          <Card className="lg:col-span-5 bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-nol-1 flex flex-col justify-between hover:shadow-nol-2 transition-shadow">
            <div className="space-y-2 mb-6">
              <span className="w-10 h-10 rounded-[12px] bg-accent-weak text-accent-main flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-main pt-2">
                나를 돋보이게 하는 프로필 브랜딩
              </h3>
              <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                커버 이미지, 나만의 뱃지, 소셜 아이콘 바를 취향대로 커스텀하여 방문자에게 확실한 첫인상을 남기세요.
              </p>
            </div>

            {/* 프로필 칩 프리뷰 */}
            <div className="rounded-[20px] bg-neutral-weak p-4 border border-neutral-weak2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-white border border-neutral-weak2 p-1 overflow-hidden shrink-0 shadow-2xs">
                  <Image
                    src="/avatar.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-neutral-main">김민준</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-main shrink-0" />
                  </div>
                  <span className="text-xs text-neutral-strong1 block truncate">
                    Product Designer & Maker
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full bg-static-white border border-neutral-weak2 text-[11px] font-bold text-neutral-main shadow-2xs whitespace-nowrap">
                  🎨 UI/UX
                </span>
                <span className="px-2.5 py-1 rounded-full bg-static-white border border-neutral-weak2 text-[11px] font-bold text-neutral-main shadow-2xs whitespace-nowrap">
                  ✨ Figma
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary-weak text-[11px] font-bold text-primary-main whitespace-nowrap">
                  🚀 Side Project
                </span>
              </div>
            </div>
          </Card>

          {/* Card 4: 원클릭 공유 & 네이티브 Share (lg:col-span-7) */}
          <Card className="lg:col-span-7 bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-nol-1 flex flex-col justify-between hover:shadow-nol-2 transition-shadow">
            <div className="space-y-2 mb-6">
              <span className="w-10 h-10 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-main pt-2">
                어디서나 원클릭으로 연결되는 공유
              </h3>
              <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                모바일 Web Share API, 단축 주소 복사, 카카오톡/인스타그램 바이오 링크 연결을 한 번에 지원합니다.
              </p>
            </div>

            {/* 공유 위젯 프리뷰 */}
            <div className="bg-neutral-weak p-4 rounded-[20px] border border-neutral-weak2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-full bg-primary-main text-white flex items-center justify-center shrink-0">
                  <Link2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-main truncate">
                    mylink.com/@minjun
                  </div>
                  <div className="text-[11px] text-neutral-medium truncate">
                    클립보드에 언제든 복사 준비 완료
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-bold text-primary-main bg-static-white border border-primary-weak2 px-3 py-1.5 rounded-full shadow-2xs whitespace-nowrap">
                  ✨ 인스타 바이오에 바로 등록
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
