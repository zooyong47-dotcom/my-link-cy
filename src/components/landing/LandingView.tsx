"use client";

import React from "react";
import Link from "next/link";
import { User } from "firebase/auth";
import { ArrowRight, LayoutDashboard, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingHero } from "./LandingHero";
import { InteractiveHandleCheck } from "./InteractiveHandleCheck";
import { FeatureBentoGrid } from "./FeatureBentoGrid";
import { LivePersonaPlayground } from "./LivePersonaPlayground";
import { HowItWorks } from "./HowItWorks";
import { TestimonialSection } from "./TestimonialSection";
import { LandingFaq } from "./LandingFaq";
import { LandingCta } from "./LandingCta";
import { LandingFooter } from "./LandingFooter";
import { MyLinkProfile } from "@/types/mylink";

interface LandingViewProps {
  user: User | null;
  profile?: MyLinkProfile;
  onLogin: () => void;
  isLoggingIn?: boolean;
  onSwitchToDashboard?: () => void;
}

export function LandingView({
  user,
  profile,
  onLogin,
  isLoggingIn,
  onSwitchToDashboard,
}: LandingViewProps) {
  return (
    <div className="w-full flex flex-col min-h-screen bg-static-white text-neutral-main selection:bg-primary-weak selection:text-primary-main">
      {/* 로그인된 사용자가 랜딩 모드를 볼 때 나타나는 상단 빠른 복귀 알림 바 */}
      {user && onSwitchToDashboard && (
        <div className="sticky top-14 z-30 w-full bg-primary-weak/95 border-b border-primary-weak2 backdrop-blur-md px-4 py-2.5">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-main font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                <strong>{profile?.displayName || "회원"}</strong>님으로 로그인되어 있습니다.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={onSwitchToDashboard}
                className="h-7 text-xs px-3 rounded-full font-bold gap-1 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>내 링크 관리로 돌아가기</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 1. 히어로 섹션 (인터랙티브 폰 목업 포함) */}
      <LandingHero onLogin={onLogin} isLoggingIn={isLoggingIn} />

      {/* 2. 고유 주소 즉석 선점 체험 인터랙티브 박스 */}
      <InteractiveHandleCheck onLogin={onLogin} isLoggingIn={isLoggingIn} />

      {/* 3. 4대 핵심 가치 Bento 그리드 */}
      <FeatureBentoGrid />

      {/* 4. 직업군별 라이브 페르소나 플레이그라운드 */}
      <LivePersonaPlayground />

      {/* 5. 3단계 쉬운 시작 가이드 */}
      <HowItWorks />

      {/* 6. 사용자 후기 및 만족도 지표 */}
      <TestimonialSection />

      {/* 7. 인터랙티브 FAQ 아코디언 */}
      <LandingFaq />

      {/* 8. 최종 전환 CTA 배너 */}
      <LandingCta onLogin={onLogin} isLoggingIn={isLoggingIn} />

      {/* 9. 푸터 */}
      <LandingFooter />
    </div>
  );
}
