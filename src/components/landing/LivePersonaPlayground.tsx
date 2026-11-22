"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Code2,
  Palette,
  Video,
  GraduationCap,
  ExternalLink,
  Flame,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { GithubIcon, InstagramIcon, YoutubeIcon, FigmaIcon } from "@/components/icons";

interface PersonaData {
  id: string;
  role: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  coverGradient: string;
  socials: string[];
  links: {
    title: string;
    url: string;
    highlight?: boolean;
    badge?: string;
    clicks: string;
  }[];
}

const PERSONAS: PersonaData[] = [
  {
    id: "dev",
    role: "개발자 / 엔지니어",
    label: "💻 개발자",
    icon: Code2,
    name: "박도현",
    username: "dohyun.dev",
    bio: "프론트엔드 엔지니어. React & Next.js 생태계를 사랑합니다. 기술 아티클과 오픈소스를 공유합니다.",
    avatar: "/avatar.svg",
    coverGradient: "from-[#1E293B] via-[#334155] to-[#475569]",
    socials: ["github", "linkedin", "blog"],
    links: [
      {
        title: "오픈소스 UI 라이브러리 저장소",
        url: "github.com/dohyun/nol-ui",
        highlight: true,
        badge: "STAR 1.2K",
        clicks: "1,890회",
      },
      {
        title: "2026 프론트엔드 최적화 기술 블로그",
        url: "velog.io/@dohyun_dev",
        clicks: "950회",
      },
      {
        title: "개발자 이력서 & 프로젝트 포트폴리오",
        url: "dohyun-resume.vercel.app",
        clicks: "620회",
      },
    ],
  },
  {
    id: "designer",
    role: "프로덕트 디자이너",
    label: "🎨 디자이너",
    icon: Palette,
    name: "송예진",
    username: "yejin_design",
    bio: "사용자의 경험을 그리는 UI/UX 디자이너. 감각적인 인터랙션 디자인과 디자인 시스템을 연구합니다.",
    avatar: "/avatar.svg",
    coverGradient: "from-[#6366F1] via-[#8B5CF6] to-[#D946EF]",
    socials: ["figma", "instagram", "behance"],
    links: [
      {
        title: "Figma 디자인 시스템 무료 템플릿",
        url: "figma.com/@yejin_design",
        highlight: true,
        badge: "FREE TEMPLATE",
        clicks: "3,120회",
      },
      {
        title: "Behance 프로젝트 포트폴리오",
        url: "behance.net/yejin_song",
        clicks: "1,450회",
      },
      {
        title: "디자인 영감 아카이브 인스타그램",
        url: "instagram.com/yejin_archive",
        clicks: "890회",
      },
    ],
  },
  {
    id: "creator",
    role: "크리에이터 / 유튜버",
    label: "🎬 크리에이터",
    icon: Video,
    name: "준호의 일상",
    username: "junho_vlog",
    bio: "테크 리뷰 & 개발자 일상 브이로그. 매주 목요일 저녁 8시 신규 영상 업로드! 협업 문의 환영합니다.",
    avatar: "/avatar.svg",
    coverGradient: "from-[#DC2626] via-[#EA580C] to-[#F59E0B]",
    socials: ["youtube", "instagram"],
    links: [
      {
        title: "🔥 이번 주 신규 맥북 실사용 리뷰 영상",
        url: "youtube.com/watch?v=junho_tech",
        highlight: true,
        badge: "NEW VIDEO",
        clicks: "5,430회",
      },
      {
        title: "책상 셋업 추천 아이템 모음 (노션)",
        url: "notion.site/junho-desk-setup",
        clicks: "2,380회",
      },
      {
        title: "비즈니스 및 광고 협업 제안 이메일",
        url: "mailto:contact@junhovlog.com",
        clicks: "410회",
      },
    ],
  },
  {
    id: "student",
    role: "대학생 / 취준생",
    label: "🎓 학생 & 취준생",
    icon: GraduationCap,
    name: "강하은",
    username: "haeun_portfolio",
    bio: "컴퓨터공학과 4학년. 서비스 기획과 데이터 분석에 관심이 많은 열정적인 예비 기획자입니다.",
    avatar: "/avatar.svg",
    coverGradient: "from-[#0284C7] via-[#0EA5E9] to-[#38BDF8]",
    socials: ["linkedin", "blog"],
    links: [
      {
        title: "노션 자기소개서 및 기획 포트폴리오",
        url: "notion.so/haeun-portfolio-2026",
        highlight: true,
        badge: "PORTFOLIO",
        clicks: "1,140회",
      },
      {
        title: "대학생 IT 연합동아리 해커톤 대상 프로젝트",
        url: "github.com/team-hackathon/winner",
        clicks: "780회",
      },
      {
        title: "데이터 분석 스터디 정리 노션 페이지",
        url: "notion.so/data-study-notes",
        clicks: "510회",
      },
    ],
  },
];

export function LivePersonaPlayground() {
  const [activePersonaId, setActivePersonaId] = useState<string>("dev");

  const currentPersona =
    PERSONAS.find((p) => p.id === activePersonaId) || PERSONAS[0];

  return (
    <section id="interactive-demo" className="py-16 sm:py-24 bg-static-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-weak2 bg-primary-weak px-3 py-1 text-xs font-bold text-primary-main">
            <Sparkles className="w-3.5 h-3.5" />
            <span>누구에게나 꼭 맞는 프로필</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-main">
            나의 활동 분야에 맞게 자유롭게 디자인하세요
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-strong1 font-normal">
            아래 직업 탭을 눌러 다양한 분야의 크리에이터들이 MyLink를 어떻게 활용하고 있는지 확인해보세요.
          </p>
        </div>

        {/* 탭 버튼들 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {PERSONAS.map((p) => {
            const isActive = p.id === activePersonaId;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePersonaId(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary-main text-white shadow-md scale-105"
                    : "bg-neutral-weak text-neutral-strong1 hover:bg-neutral-weak1 hover:text-neutral-main border border-neutral-weak2"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* 페르소나 카드 실물 프리뷰 */}
        <div className="max-w-xl mx-auto">
          <div className="rounded-[28px] sm:rounded-[32px] border border-neutral-weak2 bg-static-white shadow-nol-2 overflow-hidden transition-all duration-300">
            {/* 카드 상단 배너 */}
            <div
              className={`relative h-28 sm:h-32 w-full bg-gradient-to-r ${currentPersona.coverGradient} transition-colors duration-500`}
            >
              <Image
                src="/cover.svg"
                alt=""
                fill
                className="object-cover object-center opacity-30 mix-blend-overlay"
              />
              <div className="absolute top-3.5 right-4 rounded-full bg-black/30 backdrop-blur-xs px-3 py-1 text-xs font-mono text-white/95">
                mylink.com/{currentPersona.username}
              </div>
            </div>

            {/* 카드 본문 */}
            <div className="px-5 pb-6 pt-4 sm:px-8 sm:pb-8">
              <div className="-mt-14 mb-3 flex items-end justify-between">
                <div className="w-20 h-20 rounded-[20px] border-2 border-white bg-white p-1 shadow-md overflow-hidden shrink-0">
                  <Image
                    src={currentPersona.avatar}
                    alt={currentPersona.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                </div>
                <span className="rounded-full bg-primary-weak border border-primary-weak2 px-3 py-1 text-xs font-bold text-primary-main">
                  {currentPersona.role}
                </span>
              </div>

              {/* 이름 및 소개 */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-main">
                    {currentPersona.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-primary-main shrink-0" />
                </div>
                <div className="text-xs font-mono text-neutral-medium">
                  @{currentPersona.username}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-neutral-strong1 leading-relaxed">
                  {currentPersona.bio}
                </p>
              </div>

              {/* 링크 목록 */}
              <div className="mt-5 space-y-2.5">
                {currentPersona.links.map((link, idx) => (
                  <div
                    key={idx}
                    className={`p-3 sm:p-3.5 rounded-[16px] border transition-all flex items-center justify-between gap-3 ${
                      link.highlight
                        ? "bg-gradient-to-r from-primary-weak/80 via-primary-weak/30 to-static-white border-primary-weak2 ring-1 ring-primary-main/20"
                        : "bg-neutral-weak/50 border-neutral-weak2 hover:border-primary-weak2 hover:bg-static-white"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-neutral-main truncate">
                          {link.title}
                        </span>
                        {link.badge && (
                          <span className="rounded-full bg-primary-main text-white text-[10px] font-bold px-2 py-0.5 shrink-0 whitespace-nowrap">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-medium truncate block mt-0.5">
                        {link.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-semibold text-neutral-medium tabular-nums hidden sm:inline whitespace-nowrap">
                        {link.clicks}
                      </span>
                      <ExternalLink className="w-4 h-4 text-neutral-strong1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
