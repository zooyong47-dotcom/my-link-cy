"use client";

import React from "react";
import { Share2, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WindowHeader({ onShare }: { onShare: () => void }) {
  return (
    <div className="bg-static-white border-b border-neutral-weak2 px-5 py-3.5 flex items-center justify-between">
      {/* NOL 스타일 클린 헤더 라벨 */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary-main inline-block" />
        <span className="font-semibold text-xs text-neutral-main tracking-tight">
          mylink.com/@shinyong
        </span>
      </div>

      {/* 우측 공유 버튼: NOL 알약형 버튼 */}
      <Button
        onClick={onShare}
        variant="outline"
        size="sm"
        title="프로필 공유하기"
        className="rounded-full text-xs font-semibold px-3 py-1 h-7 text-neutral-main hover:text-primary-main hover:border-primary-weak2"
      >
        <span>공유</span>
        <Share2 className="w-3.5 h-3.5 stroke-[2.2]" />
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
          asChild
          variant="secondary"
          size="lg"
          className="flex-1 rounded-[16px] text-sm font-bold"
        >
          <a href={`mailto:${email}`}>
            <Send className="w-4 h-4 mr-1.5" />
            <span>메일 문의하기</span>
          </a>
        </Button>
      )}
    </div>
  );
}
