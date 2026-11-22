"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Link2, Copy, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveHandleCheckProps {
  onLogin: () => void;
  isLoggingIn?: boolean;
}

export function InteractiveHandleCheck({ onLogin, isLoggingIn }: InteractiveHandleCheckProps) {
  const [handle, setHandle] = useState("cy");
  const [copied, setCopied] = useState(false);

  // 정규식: 영문, 숫자, 밑줄, 하이픈 2~20자
  const cleanedHandle = handle.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const isValid = cleanedHandle.length >= 2;

  const handleCopyDemoUrl = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/${cleanedHandle || "yourname"}`;
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-static-white border-y border-neutral-weak2">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#2432AD] via-[#3549FF] to-[#6181EA] p-6 sm:p-10 lg:p-12 text-white overflow-hidden shadow-xl">
          {/* 장식용 블러 서클 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-[#4AB0F9]/30 blur-2xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>원하는 주소 미리 확인하기</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              나만의 고유 링크 주소를 선점하세요
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-normal">
              인스타그램 프로필, 이력서, 링크드인에 등록할 깔끔한 나만의 URL을 지금 바로 예약하세요.
            </p>

            {/* 인터랙티브 입력 박스 */}
            <div className="pt-4">
              <div className="bg-static-white rounded-[20px] p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 flex items-center px-3 sm:px-4 py-2 sm:py-0">
                  <span className="font-mono text-sm sm:text-base font-bold text-neutral-medium shrink-0 select-none">
                    mylink.com/
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="your-name"
                    maxLength={20}
                    className="w-full bg-transparent px-1 font-mono text-sm sm:text-base font-bold text-neutral-main focus:outline-none placeholder:text-neutral-weak4"
                  />
                </div>

                <Button
                  onClick={onLogin}
                  disabled={isLoggingIn || !isValid}
                  size="default"
                  variant="primary"
                  className="h-11 sm:h-12 px-6 rounded-[14px] text-xs sm:text-sm font-bold shadow-md gap-2 shrink-0 cursor-pointer whitespace-nowrap"
                >
                  <span>이 주소로 선점하기</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* 실시간 피드백 메시지 */}
              <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                {isValid ? (
                  <div className="flex items-center gap-1.5 text-white/95 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>
                      축하해요! <strong className="font-mono underline">mylink.com/{cleanedHandle}</strong> 주소를 사용할 수 있습니다.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-white/80">
                    <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0" />
                    <span>영문, 숫자 2자 이상 입력해주세요.</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCopyDemoUrl}
                  className="text-white/80 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "복사 완료!" : "URL 미리 복사"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
