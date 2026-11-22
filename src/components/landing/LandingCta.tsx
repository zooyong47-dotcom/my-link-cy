"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";

interface LandingCtaProps {
  onLogin: () => void;
  isLoggingIn?: boolean;
}

export function LandingCta({ onLogin, isLoggingIn }: LandingCtaProps) {
  return (
    <section className="py-16 sm:py-24 bg-static-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#1C2582] via-[#3549FF] to-[#6181EA] p-8 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-2xl">
          {/* 배경 이미지 & 블러 서클 */}
          <Image
            src="/cover.svg"
            alt=""
            fill
            className="object-cover object-center opacity-20 mix-blend-overlay pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#4AB0F9]/30 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3.5 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>지금 시작하면 평생 무료</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              나만의 감각적인 프로필,
              <br />
              1분 만에 만들어보세요
            </h2>

            <p className="text-xs sm:text-base text-white/85 font-normal max-w-lg mx-auto leading-relaxed">
              복잡한 설정이나 비용 없이, 구글 로그인 한 번으로 바로 완성됩니다.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={onLogin}
                disabled={isLoggingIn}
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-13 px-8 rounded-full text-sm sm:text-base font-bold bg-white text-primary-main hover:bg-neutral-weak shadow-lg hover:scale-105 active:scale-95 transition-all gap-2.5 cursor-pointer"
              >
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span>{isLoggingIn ? "Google 로그인 중..." : "Google로 무료 시작하기"}</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-primary-main" />
              </Button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                신용카드 등록 없음
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                즉시 활성화
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
