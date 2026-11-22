"use client";

import React from "react";
import { UserPlus, Layers, Share2, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Google 계정으로 3초 만에 시작",
    desc: "별도의 복잡한 회원가입 양식 없이 구글 계정으로 즉시 안전하게 로그인합니다.",
    icon: UserPlus,
    badge: "3초 완성",
  },
  {
    step: "02",
    title: "프로필 & 링크 카드 등록",
    desc: "나를 나타내는 소개글과 포트폴리오, SNS, 블로그 링크를 드래그하듯 손쉽게 추가합니다.",
    icon: Layers,
    badge: "무제한 링크",
  },
  {
    step: "03",
    title: "원클릭 공유 & 실시간 통계 분석",
    desc: "인스타그램 프로필이나 이력서에 URL을 걸어두고, 어떤 링크가 인기 있는지 실시간 확인합니다.",
    icon: Share2,
    badge: "실시간 리포트",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FB] border-t border-neutral-weak2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-weak2 bg-static-white px-3 py-1 text-xs font-bold text-primary-main shadow-2xs">
            <span>쉬운 사용법</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-main">
            복잡한 과정은 덜어내고,
            <br />
            딱 3단계로 끝내세요
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-strong1 font-normal">
            누구나 직관적으로 바로 이해하고 사용할 수 있도록 단순하고 강력하게 만들었습니다.
          </p>
        </div>

        {/* 3단계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-static-white border border-neutral-weak2 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-nol-1 hover:shadow-nol-2 transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums text-primary-main/30">
                      {item.step}
                    </span>
                    <span className="rounded-full bg-primary-weak text-primary-main text-[11px] font-bold px-2.5 py-0.5 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-[16px] bg-primary-weak text-primary-main flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-main mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-neutral-weak3">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
