"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "정말 평생 무료로 이용할 수 있나요?",
    answer:
      "네, 맞습니다! MyLink의 핵심 기능인 프로필 생성, 무제한 링크 등록, 실시간 클릭 통계 분석, 커스텀 URL 제공은 모든 사용자에게 100% 무료로 제공됩니다. 추가 유료 결제나 구독 없이 자유롭게 이용하세요.",
  },
  {
    question: "등록할 수 있는 링크 카드 개수에 제한이 있나요?",
    answer:
      "개수 제한 없이 원하는 만큼 링크를 등록할 수 있습니다. 깃허브, 블로그, 포트폴리오, 소셜 미디어뿐만 아니라 강조하고 싶은 이벤트 링크까지 자유롭게 추가하고 순서를 관리할 수 있습니다.",
  },
  {
    question: "나중에 사용자 아이디(username)를 변경할 수 있나요?",
    answer:
      "언제든지 변경할 수 있습니다! 로그인 후 '마이 페이지'에서 프로필 수정 메뉴를 통해 다른 사용자가 선점하지 않은 새로운 username으로 실시간 중복 확인 후 즉시 변경하실 수 있습니다.",
  },
  {
    question: "모바일 화면과 인스타그램 인앱 브라우저에서도 잘 작동하나요?",
    answer:
      "MyLink는 모바일 최적화를 최우선으로 고려하여 제작되었습니다. 인스타그램, 틱톡, 카카오톡 인앱 브라우저 환경에서도 깨짐 없이 부드러운 반응형 뷰와 빠른 로딩 속도를 보장합니다.",
  },
  {
    question: "링크 클릭 통계는 어떻게 집계되고 어디서 확인하나요?",
    answer:
      "방문자가 프로필 페이지에서 링크 카드를 클릭할 때마다 안전하게 실시간 집계됩니다. 로그인 후 상단 메뉴의 '통계' 페이지에서 전체 누적 클릭수와 가장 인기 있는 링크 순위, 비율 차트를 한눈에 확인하실 수 있습니다.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FB] border-t border-neutral-weak2">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-weak2 bg-static-white px-3 py-1 text-xs font-bold text-primary-main shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>자주 묻는 질문</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-main">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-strong1 font-normal">
            MyLink에 대해 사용자들이 가장 많이 질문하는 내용을 모았습니다.
          </p>
        </div>

        {/* 아코디언 목록 */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-[20px] bg-static-white border border-neutral-weak2 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-neutral-weak/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-main">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-medium shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary-main" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-strong1 leading-relaxed border-t border-neutral-weak1">
                    {faq.answer}
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
