"use client";

import React from "react";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const REVIEWS = [
  {
    author: "김서율",
    handle: "@seoyul_dev",
    role: "신입 프론트엔드 개발자",
    comment:
      "이력서 맨 상단에 mylink 주소 하나만 적어뒀는데, 면접관님께서 포트폴리오와 깃허브, 기술 블로그가 일목요연하게 정리되어 있어 첫인상이 너무 좋았다고 칭찬해주셨습니다!",
    rating: 5,
  },
  {
    author: "최유나",
    handle: "@yuna_lifestyle",
    role: "인스타그램 크리에이터",
    comment:
      "인스타 프로필 링크에 걸어두니 팔로워들이 유튜브 영상이랑 공구 링크를 훨씬 더 많이 클릭해요. 어떤 링크가 인기 있는지 통계로 바로 볼 수 있어서 운영 전략 짜기 최고예요.",
    rating: 5,
  },
  {
    author: "이동혁",
    handle: "@donghyuk_ui",
    role: "프리랜서 프로덕트 디자이너",
    comment:
      "다른 외산 링크트리 툴들은 UI가 투박하거나 유료 결제를 유도하는데, MyLink는 디자인이 정말 깔끔하고 한국어에 최적화되어 있어서 너무 만족스럽게 쓰고 있습니다.",
    rating: 5,
  },
];

interface StatItem {
  number: string;
  unit: string;
  label: string;
}

const STATS_SUMMARY: StatItem[] = [
  { number: "50,000", unit: "+", label: "누적 등록 링크" },
  { number: "99.4", unit: "%", label: "사용자 만족도" },
  { number: "0.2", unit: "초", label: "평균 페이지 로딩" },
  { number: "100%", unit: "무료", label: "기본 기능 평생 제공" },
];

export function TestimonialSection() {
  return (
    <section className="py-16 sm:py-24 bg-static-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단 통계 수치 바 (글씨체/글씨크기 통일 & 모바일 반응형 완벽 대응) */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-neutral-weak p-3.5 sm:p-6 border border-neutral-weak2 mb-14 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-center">
            {STATS_SUMMARY.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[18px] bg-static-white border border-neutral-weak2/80 px-3 py-4 sm:px-4 sm:py-5 flex flex-col justify-center items-center shadow-2xs"
              >
                <div className="flex items-baseline justify-center whitespace-nowrap text-primary-main">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums">
                    {item.number}
                  </span>
                  <span className="text-base sm:text-xl md:text-2xl font-bold ml-0.5 text-primary-main">
                    {item.unit}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-neutral-strong1 font-medium mt-1 sm:mt-1.5 whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 리뷰 헤더 */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-weak2 bg-primary-weak px-3 py-1 text-xs font-bold text-primary-main">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>실제 사용자 후기</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-main">
            이미 많은 크리에이터들이
            <br />
            MyLink와 함께 성장하고 있습니다
          </h2>
        </div>

        {/* 리뷰 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, i) => (
            <Card
              key={i}
              className="bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-nol-1 hover:shadow-nol-2 transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* 별점 */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed font-normal mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-weak1">
                <div className="w-10 h-10 rounded-full bg-primary-weak text-primary-main flex items-center justify-center font-bold text-sm shrink-0 border border-primary-weak2">
                  {review.author[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold text-neutral-main truncate">
                      {review.author}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-main shrink-0" />
                  </div>
                  <div className="text-[11px] text-neutral-medium truncate">
                    {review.role} · {review.handle}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
