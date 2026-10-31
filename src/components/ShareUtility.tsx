"use client";

import React from "react";
import { Share2, Copy, Send, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { User } from "firebase/auth";
import { getDisplayName } from "@/lib/utils";

interface WindowHeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn?: boolean;
  onShare: () => void;
}

export function WindowHeader({
  user,
  onLogin,
  onLogout,
  isLoggingIn,
  onShare,
}: WindowHeaderProps) {
  return (
    <div className="bg-static-white border-b border-neutral-weak2 px-3 sm:px-5 py-3 flex items-center justify-between gap-2">
      {/* NOL 스타일 클린 헤더 라벨 */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-2.5 h-2.5 rounded-full bg-primary-main inline-block shrink-0 animate-pulse" />
        <span className="font-semibold text-xs text-neutral-main tracking-tight truncate">
          mylink.com/@{user ? getDisplayName(user) : "guest"}
        </span>
      </div>

      {/* 우측 액션 버튼: 로그인 상태에 따라 'Google로 로그인' 또는 '홍길동님 + 로그아웃' */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {user ? (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-neutral-main max-w-[100px] sm:max-w-[140px] truncate">
              {getDisplayName(user)}님
            </span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              title="로그아웃"
              className="rounded-full text-xs font-semibold px-2.5 py-1 h-7 text-neutral-strong1 hover:text-accent-main hover:border-accent-main/40 transition-colors"
            >
              <LogOut className="w-3 h-3 sm:hidden" />
              <span>로그아웃</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={onLogin}
            disabled={isLoggingIn}
            variant="outline"
            size="sm"
            title="Google 계정으로 로그인"
            className="rounded-full text-xs font-semibold px-2.5 sm:px-3 py-1 h-7 border-neutral-weak2 hover:border-primary-weak2 text-neutral-main hover:text-primary-main bg-static-white shadow-2xs gap-1.5 transition-all cursor-pointer"
          >
            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Google로 로그인</span>
          </Button>
        )}

        {/* 프로필 공유 버튼 */}
        <Button
          onClick={onShare}
          variant="outline"
          size="sm"
          title="프로필 공유하기"
          className="rounded-full text-xs font-semibold px-2 sm:px-2.5 py-1 h-7 text-neutral-main hover:text-primary-main hover:border-primary-weak2 shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 stroke-[2.2]" />
          <span className="hidden sm:inline">공유</span>
        </Button>
      </div>
    </div>
  );
}

export function BottomActions({
  onCopyAll,
  email,
}: {
  onCopyAll: () => void;
  email?: string;
}) {
  return (
    <div className="mt-8 pt-6 border-t border-neutral-weak2 flex flex-col sm:flex-row gap-3">
      {/* NOL 1차 CTA 버튼: primary-main (#4154FF) */}
      <Button
        onClick={onCopyAll}
        variant="primary"
        size="lg"
        className="flex-1 rounded-[16px] text-sm font-bold shadow-sm"
      >
        <Copy className="w-4 h-4 mr-1.5" />
        <span>전체 프로필 링크 복사</span>
      </Button>

      {/* NOL 2차 버튼: primary-weak 면 + primary-main 글자 */}
      {email && (
        <Button
          variant="secondary"
          size="lg"
          className="flex-1 rounded-[16px] text-sm font-bold"
          render={<a href={`mailto:${email}`} />}
        >
          <Send className="w-4 h-4 mr-1.5" />
          <span>메일 문의하기</span>
        </Button>
      )}
    </div>
  );
}
