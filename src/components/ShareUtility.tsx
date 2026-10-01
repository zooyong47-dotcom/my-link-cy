"use client";

import React from "react";
import { Share2, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WindowHeader({ onShare }: { onShare: () => void }) {
  return (
    <div className="bg-brand-yellow border-b-2 sm:border-b-3 border-black px-4 py-3 flex items-center justify-between">
      {/* 레트로 맥 OS 스타일 컨트롤 버튼 */}
      <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
        <span className="ml-2 font-mono font-black text-xs sm:text-sm tracking-tight text-black">
          ~/mylink/@shinyong
        </span>
      </div>

      {/* 우측 공유 버튼 (Shadcn Button 기반) */}
      <Button
        onClick={onShare}
        variant="neo"
        size="sm"
        title="프로필 공유하기"
        className="px-2.5 py-1 text-xs"
      >
        <span>SHARE</span>
        <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
      </Button>
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
    <div className="mt-8 pt-6 border-t-2 sm:border-t-3 border-black flex flex-col sm:flex-row gap-3">
      {/* Shadcn Button: 전체 프로필 링크 복사 */}
      <Button
        onClick={onCopyAll}
        variant="neoYellow"
        size="lg"
        className="flex-1 text-sm text-black"
      >
        <Copy className="w-4 h-4" />
        <span>전체 프로필 링크 복사</span>
      </Button>

      {/* Shadcn Button: 이메일 바로 문의하기 */}
      {email && (
        <Button
          asChild
          variant="neoWhite"
          size="lg"
          className="flex-1 text-sm text-black"
        >
          <a href={`mailto:${email}`}>
            <Send className="w-4 h-4" />
            <span>메일 문의하기</span>
          </a>
        </Button>
      )}
    </div>
  );
}
