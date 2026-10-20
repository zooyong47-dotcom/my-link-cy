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
import { Layers } from "lucide-react";

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
    <main className="min-h-screen bg-[#F7F8FB] text-neutral-main relative flex flex-col items-center justify-start py-8 sm:py-14 px-4 sm:px-6 selection:bg-primary-weak selection:text-primary-main">
      {/* 🍞 NOL 스타일 토스트 피드백 */}
      <Toast message={toastMessage} type={toastType} />

      {/* 💻 NOL 스타일 메인 프로필 카드 (rounded-[24px] ~ [28px], 1px 테두리, 클린 룩) */}
      <Card className="w-full max-w-lg bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] shadow-sm overflow-hidden">
        {/* 상단 윈도우 헤더 바 */}
        <WindowHeader onShare={handleShare} />

        {/* 커버 배너 영역: NOL의 차가운 톤 그라디언트 및 이미지 */}
        <div className="relative h-32 sm:h-40 w-full border-b border-neutral-weak2 bg-gradient-to-r from-[#3549FF] via-[#4154FF] to-[#6181EA] overflow-hidden">
          <Image
            src="/cover.svg"
            alt="MyLink Cover"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute bottom-3 right-4">
            <Badge variant="primary" className="bg-static-white/90 text-primary-main border-transparent text-[11px] shadow-sm">
              NOL UNIVERSE
            </Badge>
          </div>
        </div>

        {/* 메인 본문 콘텐츠 */}
        <div className="p-5 sm:p-7 bg-static-white relative">
          {/* 👤 프로필 헤더 (아바타, 이름, 역할, 바이오, 메타 정보) */}
          <div className="-mt-14 sm:-mt-16 mb-4">
            <ProfileHeader
              profile={profile}
              onCopyEmail={handleCopyEmail}
            />
          </div>

          {/* 🌐 소셜 아이콘 바 */}
          <SocialIconsBar socials={profile.socials} />

          {/* 🔗 링크 목록 섹션 헤더 (NOL 타이포그래피 & 뱃지) */}
          <div className="mt-7 mb-3.5 flex items-center justify-between border-b border-neutral-weak1 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary-main" />
              <h2 className="font-bold text-sm tracking-tight text-neutral-main">
                주요 링크
              </h2>
              <Badge variant="primary" className="text-[10px] px-1.5 py-0 h-4">
                {enabledLinks.length}
              </Badge>
            </div>
            <span className="text-xs font-medium text-neutral-medium">
              CLICK TO VISIT ↗
            </span>
          </div>

          {/* 🔗 링크 목록 카드 렌더링 */}
          <div className="space-y-2.5">
            {enabledLinks.length > 0 ? (
              enabledLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onLinkClick={trackLinkClick}
                />
              ))
            ) : (
              <div className="text-center py-8 text-neutral-medium font-medium text-sm">
                등록된 활성 링크가 없습니다.
              </div>
            )}
          </div>

          {/* 📬 하단 액션 버튼 */}
          <BottomActions
            onCopyAll={handleCopyProfileUrl}
            email="chanyong.dev@gmail.com"
          />

          {/* ⚡ 푸터 브랜딩 */}
          <div className="mt-8 pt-4 border-t border-neutral-weak1 text-center">
            <p className="text-xs font-normal text-neutral-medium flex items-center justify-center gap-1.5">
              <span>Powered by</span>
              <span className="text-primary-main font-bold">
                MyLink
              </span>
              <span>· Designed with NOL Design System</span>
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
