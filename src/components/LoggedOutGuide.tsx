"use client";

import React from "react";
import { Lock, Sparkles, Database, BarChart3, Edit3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";

interface LoggedOutGuideProps {
  onLogin: () => void;
  isLoggingIn?: boolean;
}

export function LoggedOutGuide({ onLogin, isLoggingIn }: LoggedOutGuideProps) {
  return (
    <div className="w-full bg-gradient-to-b from-primary-weak/50 via-white to-neutral-weak/40 border border-primary-weak2 rounded-[22px] p-5 sm:p-6 shadow-sm mb-6 text-center animate-in fade-in duration-300">
      {/* 잠금 & 안내 뱃지 */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-weak border border-primary-weak2 text-primary-main text-xs font-bold mb-3.5">
        <Lock className="w-3.5 h-3.5" />
        <span>로그인 후 이용 가능 서비스</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-neutral-main tracking-tight mb-2">
        Google 계정으로 로그인 후 나만의 링크를 시작하세요
      </h3>

      <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed max-w-md mx-auto mb-5">
        현재 로그인이 필요합니다. Google 소셜 로그인 시 개인화된 Firestore 경로인{" "}
        <span className="font-mono font-semibold text-primary-main bg-primary-weak px-1.5 py-0.5 rounded">
          users/&#123;user.uid&#125;/links
        </span>
        에 안전하게 연결되며, 나만의 링크를 실시간으로 추가·수정·관리할 수 있습니다.
      </p>

      {/* 로그인 후 사용 가능한 기능 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-left">
        <div className="p-3 bg-static-white border border-neutral-weak2 rounded-[14px] flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-primary-weak flex items-center justify-center text-primary-main shrink-0 mt-0.5">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-main">Firestore 개인화</div>
            <div className="text-[11px] text-neutral-medium mt-0.5 leading-snug">
              users/&#123;uid&#125;/links 전용 경로에 안전하게 자동 저장
            </div>
          </div>
        </div>

        <div className="p-3 bg-static-white border border-neutral-weak2 rounded-[14px] flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-primary-weak flex items-center justify-center text-primary-main shrink-0 mt-0.5">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-main">인라인 실시간 편집</div>
            <div className="text-[11px] text-neutral-medium mt-0.5 leading-snug">
              카드 내에서 즉각 제목·URL 수정 및 뱃지 설정
            </div>
          </div>
        </div>

        <div className="p-3 bg-static-white border border-neutral-weak2 rounded-[14px] flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-primary-weak flex items-center justify-center text-primary-main shrink-0 mt-0.5">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-main">실시간 클릭 집계</div>
            <div className="text-[11px] text-neutral-medium mt-0.5 leading-snug">
              방문자 인터랙션을 실시간으로 감지하고 카운팅
            </div>
          </div>
        </div>
      </div>

      {/* 메인 CTA: Google 소셜 로그인 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
        <Button
          onClick={onLogin}
          disabled={isLoggingIn}
          size="lg"
          className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-sm bg-static-white text-neutral-main hover:bg-neutral-weak border border-neutral-weak3 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <GoogleIcon className="w-4 h-4" />
          <span>{isLoggingIn ? "Google 로그인 중..." : "Google로 로그인하여 시작하기"}</span>
          <ArrowRight className="w-4 h-4 text-primary-main ml-1" />
        </Button>
      </div>
    </div>
  );
}
