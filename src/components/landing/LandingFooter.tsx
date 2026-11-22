"use client";

import React from "react";
import Link from "next/link";
import { Link2, ArrowUp, Globe, Sparkles } from "lucide-react";

export function LandingFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-static-white border-t border-neutral-weak2 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-neutral-weak1">
          {/* 브랜드 & 비전 */}
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-[10px] bg-primary-main flex items-center justify-center text-white">
                <Link2 className="w-4 h-4 stroke-[2.5]" />
              </span>
              <span className="font-extrabold text-lg tracking-tight text-neutral-main">
                MyLink
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-neutral-strong1 max-w-md leading-relaxed font-normal">
              흩어진 나를 모으는 가장 감각적인 올인원 프로필 서비스.
              포트폴리오, 소셜 미디어, 프로젝트 링크를 단 하나의 URL로 간편하게 공유하고 실시간 분석하세요.
            </p>
          </div>

          {/* 서비스 링크 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-neutral-main tracking-wider uppercase">
              서비스 탐색
            </h4>
            <ul className="space-y-2 text-xs text-neutral-strong1">
              <li>
                <Link href="/" className="hover:text-primary-main transition-colors">
                  홈 & 랜딩 소개
                </Link>
              </li>
              <li>
                <Link href="/mypage" className="hover:text-primary-main transition-colors">
                  마이 페이지 (프로필 관리)
                </Link>
              </li>
              <li>
                <Link href="/stats" className="hover:text-primary-main transition-colors">
                  실시간 링크 클릭 통계
                </Link>
              </li>
            </ul>
          </div>

          {/* 기술 스택 & 시스템 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-neutral-main tracking-wider uppercase">
              기술 스택 & 디자인
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-weak border border-neutral-weak2 text-[10px] font-semibold text-neutral-strong1">
                Next.js 16 (App Router)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-weak border border-neutral-weak2 text-[10px] font-semibold text-neutral-strong1">
                React 19
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-weak border border-neutral-weak2 text-[10px] font-semibold text-neutral-strong1">
                Tailwind CSS v4
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-weak border border-neutral-weak2 text-[10px] font-semibold text-neutral-strong1">
                NOL Design System
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-weak border border-neutral-weak2 text-[10px] font-semibold text-neutral-strong1">
                Firebase Firestore
              </span>
            </div>
          </div>
        </div>

        {/* 최하단 카피라이트 & 맨 위로 가기 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-medium">
          <p>© {new Date().getFullYear()} MyLink. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-primary-main transition-colors cursor-pointer"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
