"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMyLinkData } from "@/hooks/useMyLinkData";
import { AppHeader } from "@/components/AppHeader";
import { PreviewShareDialog } from "@/components/PreviewShareDialog";
import { StatsCharts, getSafeClicks } from "@/components/StatsCharts";
import { getSafeHref } from "@/lib/utils";
import { Toast } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart3,
  ExternalLink,
  Flame,
  Link2,
  Loader2,
  MousePointerClick,
  Plus,
  RotateCw,
  TrendingUp,
} from "lucide-react";

export default function StatsPage() {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    isSigningIn,
    authError,
    signInWithGoogle,
    logout,
  } = useAuth();

  const {
    profile,
    links,
    isLoaded,
    isSyncing,
    toastMessage,
    toastType,
    showToast,
    refreshLinks,
    trackLinkClick,
    copyToClipboard,
  } = useMyLinkData(user);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 비로그인 시 홈('/')으로 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (authError) showToast(authError, "error");
  }, [authError, showToast]);

  const getPersonalProfileUrl = () => {
    if (typeof window === "undefined") return "";
    if (user && profile.username && profile.username !== "guest") {
      return `${window.location.origin}/${encodeURIComponent(profile.username)}`;
    }
    return window.location.origin;
  };

  const handleShare = async () => {
    const shareUrl = getPersonalProfileUrl();
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

  const handleCopyProfileUrl = () => {
    copyToClipboard(getPersonalProfileUrl(), "전체 프로필 링크");
  };

  // 모든 링크 합산 통계 계산 (활성/비활성 모두 포함)
  const {
    totalClicks,
    activeCount,
    inactiveCount,
    averageClicksLabel,
    sortedLinks,
    topLink,
    topLinkClicks,
    topSharePercent,
  } = useMemo(() => {
    const total = links.reduce((sum, link) => sum + getSafeClicks(link), 0);
    const active = links.filter((link) => link.enabled).length;
    const inactive = links.length - active;
    const avg = links.length > 0 ? total / links.length : 0;
    const avgLabel = Number.isInteger(avg)
      ? avg.toLocaleString("ko-KR")
      : avg.toLocaleString("ko-KR", { maximumFractionDigits: 1 });

    const sorted = [...links].sort((a, b) => {
      const diff = getSafeClicks(b) - getSafeClicks(a);
      if (diff !== 0) return diff;
      return a.title.localeCompare(b.title, "ko");
    });

    const best = sorted[0] ?? null;
    const bestClicks = best ? getSafeClicks(best) : 0;
    const bestShare =
      total > 0 && bestClicks > 0
        ? Math.round((bestClicks / total) * 1000) / 10
        : 0;

    return {
      totalClicks: total,
      activeCount: active,
      inactiveCount: inactive,
      averageClicksLabel: avgLabel,
      sortedLinks: sorted,
      topLink: best,
      topLinkClicks: bestClicks,
      topSharePercent: bestShare,
    };
  }, [links]);

  // 인증 확인 중 또는 비로그인 리다이렉트 대기 화면
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F7F8FB] text-neutral-main flex flex-col selection:bg-primary-weak selection:text-primary-main">
        <AppHeader
          user={user}
          profile={profile}
          authLoading={authLoading}
          isLoggingIn={isSigningIn}
          links={links}
          onLogin={signInWithGoogle}
          onLogout={logout}
          onOpenPreview={() => setIsPreviewOpen(true)}
          onShare={handleShare}
          onCopyProfileUrl={handleCopyProfileUrl}
        />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          {authLoading ? (
            <div className="w-full max-w-3xl space-y-4 animate-pulse">
              <div className="h-36 rounded-[24px] bg-neutral-weak2/70" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 h-72 rounded-[24px] bg-neutral-weak2/70" />
                <div className="lg:col-span-2 h-72 rounded-[24px] bg-neutral-weak2/70" />
              </div>
            </div>
          ) : (
            <Card className="w-full max-w-md bg-static-white border border-neutral-weak2 rounded-[24px] p-6 sm:p-8 shadow-nol-1 text-center space-y-3">
              <Loader2 className="w-7 h-7 animate-spin text-primary-main mx-auto" />
              <h1 className="text-base sm:text-lg font-bold text-neutral-main">
                로그인이 필요한 페이지입니다
              </h1>
              <p className="text-xs sm:text-sm text-neutral-strong1">
                홈 화면으로 이동하고 있습니다...
              </p>
            </Card>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-neutral-main flex flex-col selection:bg-primary-weak selection:text-primary-main">
      <Toast message={toastMessage} type={toastType} />

      <AppHeader
        user={user}
        profile={profile}
        authLoading={authLoading}
        isLoggingIn={isSigningIn}
        links={links}
        onLogin={signInWithGoogle}
        onLogout={logout}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onShare={handleShare}
        onCopyProfileUrl={handleCopyProfileUrl}
      />

      <PreviewShareDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        profile={profile}
        links={links}
        isLoggedIn={!!user}
        onShare={handleShare}
        onCopyProfileUrl={handleCopyProfileUrl}
        onLinkClick={trackLinkClick}
      />

      <main className="flex-1 flex flex-col items-center justify-start py-6 sm:py-10 px-4 sm:px-6">
        <div className="w-full max-w-3xl space-y-4">
          {/* 상단 내비게이션 & 새로고침 */}
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/" />}
              className="rounded-full px-3 h-8 text-xs font-semibold text-neutral-strong1 hover:text-primary-main gap-1.5 -ml-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>내 링크 페이지로</span>
            </Button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => refreshLinks()}
                disabled={isSyncing}
                className="w-8 h-8 rounded-full bg-static-white border border-neutral-weak2 flex items-center justify-center text-neutral-medium hover:text-primary-main hover:border-primary-weak2 transition-colors cursor-pointer disabled:opacity-50"
                title="최신 통계 새로고침"
                aria-label="최신 통계 새로고침"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${
                    isSyncing ? "animate-spin text-primary-main" : ""
                  }`}
                />
              </button>
              <Badge variant="primary" className="text-[11px] font-bold">
                STATS
              </Badge>
            </div>
          </div>

          {/* 상단 핵심 요약 카드: 총 클릭수 (모든 링크 합산) */}
          <Card className="w-full bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 shadow-nol-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-weak1">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center shrink-0">
                    <MousePointerClick className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-base sm:text-lg font-bold tracking-tight text-neutral-main">
                        총 클릭수
                      </h1>
                      <Badge variant="primary" className="text-[10px] px-2 py-0 h-5">
                        모든 링크 합산
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-strong1 mt-0.5">
                      @{profile.username} 계정의 전체 {links.length}개 링크 누적 클릭 합계
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 sm:text-right">
                {!isLoaded ? (
                  <div className="h-10 w-28 rounded-[12px] bg-neutral-weak2/70 animate-pulse" />
                ) : (
                  <>
                    <span
                      data-testid="total-clicks-value"
                      className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-main tabular-nums"
                    >
                      {totalClicks.toLocaleString("ko-KR")}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-neutral-strong1">
                      회
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 보조 요약 지표 3종 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="rounded-[16px] bg-neutral-weak border border-neutral-weak2/80 px-4 py-3">
                <div className="flex items-center justify-between text-xs text-neutral-strong1">
                  <span>등록된 링크</span>
                  <Link2 className="w-3.5 h-3.5 text-neutral-medium" />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-neutral-main tabular-nums">
                    {links.length}개
                  </span>
                  <span className="text-[11px] text-neutral-medium">
                    활성 {activeCount}
                    {inactiveCount > 0 ? ` · 비활성 ${inactiveCount}` : ""}
                  </span>
                </div>
              </div>

              <div className="rounded-[16px] bg-neutral-weak border border-neutral-weak2/80 px-4 py-3">
                <div className="flex items-center justify-between text-xs text-neutral-strong1">
                  <span>링크당 평균 클릭</span>
                  <TrendingUp className="w-3.5 h-3.5 text-neutral-medium" />
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-bold text-neutral-main tabular-nums">
                    {averageClicksLabel}
                  </span>
                  <span className="text-xs font-semibold text-neutral-strong1">
                    회
                  </span>
                </div>
              </div>

              <div className="rounded-[16px] bg-neutral-weak border border-neutral-weak2/80 px-4 py-3 min-w-0">
                <div className="flex items-center justify-between text-xs text-neutral-strong1">
                  <span>최고 인기 링크</span>
                  <Flame className="w-3.5 h-3.5 text-accent-main shrink-0" />
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 min-w-0">
                  <span className="text-sm font-bold text-neutral-main truncate">
                    {topLink ? topLink.title : "-"}
                  </span>
                  <span className="text-xs font-mono font-bold text-primary-main shrink-0 tabular-nums">
                    {topLink
                      ? `${topLinkClicks.toLocaleString("ko-KR")}회${
                          topSharePercent > 0 ? ` (${topSharePercent}%)` : ""
                        }`
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 본문: 로딩 / 빈 상태 / shadcn 차트 + 상세 순위 */}
          {!isLoaded ? (
            <div className="space-y-4 animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 h-72 rounded-[24px] bg-neutral-weak2/70" />
                <div className="lg:col-span-2 h-72 rounded-[24px] bg-neutral-weak2/70" />
              </div>
              <div className="h-48 rounded-[24px] bg-neutral-weak2/70" />
            </div>
          ) : links.length === 0 ? (
            <Card className="w-full bg-static-white border border-neutral-weak2 rounded-[24px] p-8 sm:p-10 shadow-nol-1 text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-primary-weak text-primary-main mx-auto flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-main">
                아직 통계로 집계할 링크가 없습니다
              </h2>
              <p className="text-xs sm:text-sm text-neutral-strong1 max-w-sm mx-auto leading-relaxed">
                홈 화면에서 첫 링크를 추가하면 링크별 클릭수와 비중 차트를 한눈에 확인할 수 있습니다.
              </p>
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  render={<Link href="/" />}
                  className="rounded-full h-9 px-4 text-xs font-bold gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 링크 추가하러 가기</span>
                </Button>
              </div>
            </Card>
          ) : (
            <>
              {/* shadcn 차트 섹션 */}
              <StatsCharts links={links} totalClicks={totalClicks} />

              {/* 링크별 상세 클릭 순위 카드 */}
              <Card className="w-full bg-static-white border border-neutral-weak2 rounded-[24px] p-5 sm:p-6 shadow-nol-1">
                <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-neutral-weak1">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-main">
                      링크별 상세 성과
                    </h2>
                    <p className="text-xs text-neutral-strong1 mt-0.5">
                      클릭수 높은 순으로 정렬된 전체 링크 목록입니다.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href="/" />}
                    className="h-8 text-xs px-3 rounded-full font-semibold shrink-0"
                  >
                    링크 관리
                  </Button>
                </div>

                <div className="space-y-3">
                  {sortedLinks.map((link, index) => {
                    const clicks = getSafeClicks(link);
                    const sharePercent =
                      totalClicks > 0 && clicks > 0
                        ? Math.round((clicks / totalClicks) * 1000) / 10
                        : 0;
                    const barWidthPercent =
                      totalClicks > 0 && clicks > 0
                        ? Math.max(4, Math.min(100, (clicks / totalClicks) * 100))
                        : 0;

                    return (
                      <div
                        key={link.id}
                        className="rounded-[16px] border border-neutral-weak2 bg-neutral-veryweak/60 p-3.5 sm:p-4 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span
                              className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                index === 0 && clicks > 0
                                  ? "bg-primary-main text-static-white"
                                  : "bg-neutral-weak1 text-neutral-strong1"
                              }`}
                            >
                              {index + 1}
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-sm font-bold text-neutral-main truncate max-w-[220px] sm:max-w-[360px]">
                                  {link.title}
                                </span>
                                {!link.enabled && (
                                  <Badge
                                    variant="label"
                                    className="text-[10px] px-1.5 py-0 h-4"
                                  >
                                    비활성
                                  </Badge>
                                )}
                                {link.highlight && (
                                  <Badge
                                    variant="accent"
                                    className="text-[10px] px-1.5 py-0 h-4"
                                  >
                                    강조
                                  </Badge>
                                )}
                              </div>
                              <a
                                href={getSafeHref(link.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-medium hover:text-primary-main hover:underline truncate max-w-[240px] sm:max-w-[420px] mt-0.5"
                              >
                                <span className="truncate">{link.url}</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              </a>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-mono font-bold text-neutral-main tabular-nums">
                              {clicks.toLocaleString("ko-KR")}회
                            </div>
                            <div className="text-[11px] font-mono text-neutral-medium tabular-nums">
                              {sharePercent}%
                            </div>
                          </div>
                        </div>

                        {/* 비중 게이지 바 */}
                        <div className="h-1.5 w-full rounded-full bg-neutral-weak1 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              index === 0 && clicks > 0
                                ? "bg-primary-main"
                                : "bg-[#6181EA]"
                            }`}
                            style={{ width: `${barWidthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
