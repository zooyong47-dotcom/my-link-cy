"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useMyLinkData } from "@/hooks/useMyLinkData";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SocialIconsBar } from "@/components/SocialIconsBar";
import { LinkCard } from "@/components/LinkCard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { WindowHeader, BottomActions } from "@/components/ShareUtility";
import { LoggedOutGuide } from "@/components/LoggedOutGuide";
import { Toast } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Plus, Loader2, RotateCw, Lock } from "lucide-react";
import { CustomLink } from "@/types/mylink";
import { GoogleIcon } from "@/components/icons";

export default function MyLinkPage() {
  const { user, isSigningIn, authError, signInWithGoogle, logout } = useAuth();
  const {
    profile,
    links,
    isLoaded,
    isSyncing,
    deletingId,
    toastMessage,
    toastType,
    showToast,
    addLink,
    updateLink,
    deleteLink,
    refreshLinks,
    trackLinkClick,
    copyToClipboard,
  } = useMyLinkData(user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [targetDeleteLink, setTargetDeleteLink] = useState<CustomLink | null>(null);

  // 🔐 로그인 실패 시(사용자 취소 제외) 토스트로 원인 안내
  useEffect(() => {
    if (authError) showToast(authError, "error");
  }, [authError, showToast]);

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

  const handleAddLinkClick = () => {
    if (!user) {
      showToast("Google 계정으로 로그인 후 새 링크를 추가할 수 있습니다.", "error");
      return;
    }
    setIsAddDialogOpen(true);
  };

  // 활성화된 링크만 필터링
  const enabledLinks = links.filter((link) => link.enabled);

  return (
    <main className="min-h-screen bg-[#F7F8FB] text-neutral-main relative flex flex-col items-center justify-start py-8 sm:py-14 px-4 sm:px-6 selection:bg-primary-weak selection:text-primary-main">
      {/* 🍞 NOL 스타일 토스트 피드백 */}
      <Toast message={toastMessage} type={toastType} />

      {/* ➕ 새 링크 추가 다이얼로그 (모달) */}
      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddLink={addLink}
      />

      {/* 🗑️ 링크 삭제 확인 다이얼로그 (모달) */}
      <DeleteConfirmDialog
        open={!!targetDeleteLink}
        onOpenChange={(open) => {
          if (!open) setTargetDeleteLink(null);
        }}
        linkTitle={targetDeleteLink?.title || ""}
        isDeleting={targetDeleteLink ? deletingId === targetDeleteLink.id : false}
        onConfirm={async () => {
          if (targetDeleteLink) {
            await deleteLink(targetDeleteLink.id);
            setTargetDeleteLink(null);
          }
        }}
      />

      {/* 💻 NOL 스타일 메인 프로필 카드 (rounded-[24px] ~ [28px], 1px 테두리, 클린 룩) */}
      <Card className="w-full max-w-lg bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] shadow-sm overflow-hidden">
        {/* 🌟 상단 윈도우 헤더 바 (Google 소셜 로그인 및 사용자명/로그아웃 탑재) */}
        <WindowHeader
          user={user}
          onLogin={signInWithGoogle}
          onLogout={logout}
          isLoggingIn={isSigningIn}
          onShare={handleShare}
        />

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
              isLoggedIn={!!user}
            />
          </div>

          {/* 🌐 소셜 아이콘 바 */}
          <SocialIconsBar socials={profile.socials} />

          {/* 📍 로그아웃 상태: 로그인 이후 사용할 수 있도록 설명 문구 및 로그인 유도 UI */}
          {!user && (
            <LoggedOutGuide
              onLogin={signInWithGoogle}
              isLoggingIn={isSigningIn}
            />
          )}

          {/* 🔗 링크 목록 섹션 헤더 (NOL 타이포그래피 & 뱃지 + 동기화 상태 + 추가 버튼) */}
          <div className="mt-7 mb-3.5 border-b border-neutral-weak1 pb-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary-main" />
                <h2 className="font-bold text-sm tracking-tight text-neutral-main">
                  {user ? "내 주요 링크" : "주요 링크"}
                </h2>
                {user && (
                  <Badge variant="primary" className="text-[10px] px-1.5 py-0 h-4">
                    {enabledLinks.length}
                  </Badge>
                )}

                {/* 🔄 동기화 / 갱신 중 상태 표시 뱃지 */}
                {isSyncing && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-main bg-primary-weak/90 border border-primary-weak2 px-2 py-0.5 rounded-full animate-in fade-in duration-200">
                    <Loader2 className="w-3 h-3 animate-spin text-primary-main" />
                    <span>갱신 중...</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {/* 🔄 수동 새로고침 버튼 */}
                {user && (
                  <button
                    type="button"
                    onClick={() => refreshLinks()}
                    disabled={isSyncing}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-strong1 hover:text-primary-main hover:bg-neutral-weak2/60 transition-all cursor-pointer disabled:opacity-50"
                    title="링크 목록 새로고침"
                    aria-label="링크 목록 새로고침"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-primary-main" : ""}`} />
                  </button>
                )}

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleAddLinkClick}
                  className="h-7 text-xs px-2.5 rounded-full font-bold hover:bg-primary-weak1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-0.5" />
                  새 링크 추가
                </Button>
              </div>
            </div>

            {/* 🌊 갱신 중 상단 프로그레스 바 */}
            {isSyncing && (
              <div className="w-full h-0.5 bg-neutral-weak2 overflow-hidden rounded-full mt-2">
                <div className="w-full h-full bg-primary-main animate-pulse" />
              </div>
            )}
          </div>

          {/* 🔗 링크 목록 카드 렌더링 (로그인 vs 비로그인) */}
          <div className="space-y-2.5">
            {!user ? (
              /* 로그아웃 상태 안내 가이드 박스 */
              <div className="text-center py-8 px-4 border border-dashed border-neutral-weak3 rounded-[18px] bg-neutral-weak/40 space-y-3">
                <div className="w-10 h-10 rounded-full bg-neutral-weak2 mx-auto flex items-center justify-center text-neutral-medium">
                  <Lock className="w-5 h-5 text-neutral-strong1" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm text-neutral-main">
                    링크 관리 기능은 로그인 후 이용하실 수 있습니다
                  </p>
                  <p className="text-xs text-neutral-medium leading-relaxed max-w-sm mx-auto">
                    Google 계정으로 로그인하면 나만의 개인화된 Firestore 저장소(
                    <span className="font-mono text-primary-main">users/&#123;uid&#125;/links</span>
                    )에 링크를 생성하고 실시간으로 관리할 수 있습니다.
                  </p>
                </div>
                <Button
                  onClick={signInWithGoogle}
                  disabled={isSigningIn}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-bold gap-1.5 border-neutral-weak2 hover:border-primary-weak2 text-neutral-main hover:text-primary-main bg-static-white shadow-2xs cursor-pointer"
                >
                  <GoogleIcon className="w-3.5 h-3.5" />
                  <span>Google로 로그인</span>
                </Button>
              </div>
            ) : !isLoaded ? (
              <div className="space-y-2.5 animate-pulse">
                <div className="h-16 rounded-[18px] bg-neutral-weak2/60" />
                <div className="h-16 rounded-[18px] bg-neutral-weak2/60" />
              </div>
            ) : enabledLinks.length > 0 ? (
              enabledLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isDeleting={deletingId === link.id}
                  onLinkClick={trackLinkClick}
                  onRequestDelete={(target) => setTargetDeleteLink(target)}
                  onUpdate={updateLink}
                />
              ))
            ) : (
              <div className="text-center py-8 text-neutral-medium font-medium text-sm border border-dashed border-neutral-weak2 rounded-[16px] bg-neutral-weak/30 space-y-1">
                <div>등록된 활성 링크가 없습니다.</div>
                <div className="text-xs text-neutral-strong1">
                  아래 &lsquo;새 링크 카드 추가하기&rsquo; 버튼을 눌러 첫 번째 링크를 등록해 보세요!
                </div>
              </div>
            )}

            {/* 링크 추가 바로가기 점선 버튼 */}
            <button
              type="button"
              onClick={handleAddLinkClick}
              className="w-full py-3 px-4 rounded-[16px] border border-dashed border-neutral-weak3 hover:border-primary-main text-neutral-strong1 hover:text-primary-main bg-neutral-weak/40 hover:bg-primary-weak/40 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-neutral-weak2 group-hover:bg-primary-weak1 flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5 group-hover:text-primary-main" />
              </div>
              <span>새 링크 카드 추가하기</span>
            </button>
          </div>

          {/* 📬 하단 액션 버튼 */}
          <BottomActions
            onCopyAll={handleCopyProfileUrl}
            email={profile.email}
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
