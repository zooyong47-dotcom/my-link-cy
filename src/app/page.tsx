"use client";

import React from "react";
import Image from "next/image";
import { useMyLinkData } from "@/hooks/useMyLinkData";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SocialIconsBar } from "@/components/SocialIconsBar";
import { LinkCard } from "@/components/LinkCard";
import { WindowHeader, BottomActions } from "@/components/ShareUtility";
import { Toast } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Layers } from "lucide-react";

export default function MyLinkPage() {
  const {
    profile,
    links,
    toastMessage,
    toastType,
    trackLinkClick,
    copyToClipboard,
  } = useMyLinkData();

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${profile.displayName} (@${profile.username}) | MyLink`,
          text: profile.bio,
          url: shareUrl,
        });
      } catch {
        // 사용자 취소 시 무시
      }
    } else {
      copyToClipboard(shareUrl, "프로필 링크");
    }
  };

  const handleCopyEmail = (email: string) => {
    copyToClipboard(email, "이메일 주소");
  };

  const handleCopyProfileUrl = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    copyToClipboard(url, "전체 프로필 링크");
  };

  // 활성화된 링크만 필터링
  const enabledLinks = links.filter((link) => link.enabled);

  return (
    <main className="min-h-screen bg-brand-bg text-black relative flex flex-col items-center justify-start py-8 sm:py-12 px-3 sm:px-6 selection:bg-black selection:text-brand-yellow">
      {/* 🍞 Shadcn UI 기반 토스트 알림 */}
      <Toast message={toastMessage} type={toastType} />

      {/* 🏁 1. 상단 레트로 무한 마키 티커 배너 */}
      <div className="w-full max-w-xl mb-5 overflow-hidden bg-brand-yellow border-2 sm:border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl py-2">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 font-black text-xs sm:text-sm tracking-wider uppercase">
          <span>✦ MYLINK ✦ SHIN CHAN-YONG ✦ STUDENT DEVELOPER ✦ PORTFOLIO &amp; LINKS ✦ WELCOME ✦</span>
          <span>✦ MYLINK ✦ SHIN CHAN-YONG ✦ STUDENT DEVELOPER ✦ PORTFOLIO &amp; LINKS ✦ WELCOME ✦</span>
        </div>
      </div>

      {/* 💻 2. 메인 네오브루탈리즘 창 (Shadcn Card Component) */}
      <Card variant="neoMain" className="w-full max-w-xl">
        {/* 상단 윈도우 헤더 바 */}
        <WindowHeader onShare={handleShare} />

        {/* 커버 배너 영역 */}
        <div className="relative h-36 sm:h-44 w-full border-b-2 sm:border-b-3 border-black bg-brand-yellow overflow-hidden">
          <Image
            src="/cover.svg"
            alt="MyLink Cover Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute bottom-2.5 right-3 hidden sm:block -rotate-3">
            <Badge variant="default" className="bg-black text-white font-black text-[11px] shadow-[2px_2px_0px_0px_#FFF] flex items-center gap-1 border border-white">
              <Sparkles className="w-3 h-3 text-brand-yellow" />
              VERIFIED CREATOR
            </Badge>
          </div>
        </div>

        {/* 메인 본문 콘텐츠 */}
        <div className="p-5 sm:p-7 bg-white relative">
          {/* 👤 프로필 헤더 (아바타, 이름, 역할, 바이오, 메타 정보) */}
          <div className="-mt-16 sm:-mt-20 mb-3">
            <ProfileHeader
              profile={profile}
              onCopyEmail={handleCopyEmail}
            />
          </div>

          {/* 🌐 소셜 아이콘 바 */}
          <SocialIconsBar socials={profile.socials} />

          {/* 🔗 링크 목록 섹션 헤더 */}
          <div className="mt-7 mb-4 flex items-center justify-between border-b-2 border-black pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-black" />
              <h2 className="font-black text-xs sm:text-sm uppercase tracking-wider text-black">
                Featured Links ({enabledLinks.length})
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500">
              CLICK TO EXPLORE ↗
            </span>
          </div>

          {/* 🔗 링크 목록 카드 렌더링 */}
          <div className="space-y-3">
            {enabledLinks.length > 0 ? (
              enabledLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onLinkClick={trackLinkClick}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 font-bold text-sm">
                등록된 활성 링크가 없습니다.
              </div>
            )}
          </div>

          {/* 📬 하단 프로필 복사 및 메일 버튼 */}
          <BottomActions
            onCopyAll={handleCopyProfileUrl}
            email="chanyong.dev@gmail.com"
          />

          {/* ⚡ 푸터 브랜딩 */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center">
            <p className="font-mono font-bold text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <span>⚡ Powered by</span>
              <span className="text-black font-black underline underline-offset-2">
                MyLink
              </span>
              <span>· 2026</span>
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
