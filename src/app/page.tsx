"use client";

import { useState } from "react";
import Image from "next/image";

// 🌟 프로필 데이터
const PROFILE_DATA = {
  name: "신찬용",
  englishName: "Chan-yong Shin",
  role: "STUDENT DEVELOPER",
  tagline: "⚡ 우아하고 직관적인 코드로 문제를 해결하는 개발자",
  location: "Seoul, KR",
  school: "컴퓨터공학과",
  email: "chanyong.dev@gmail.com",
  bio: "새로운 웹 기술을 탐구하고 직관적인 사용자 경험을 구현하는 것을 좋아합니다.\nReact, Next.js 기반의 프론트엔드 생태계에 깊은 관심을 가지고 있으며,\n언제나 즐겁게 코딩하며 성장하고 있습니다! 🚀",

  stats: [
    { label: "PROJECTS", value: "8+", color: "bg-pink-300", desc: "Toy & Team" },
    { label: "TECH STACK", value: "10+", color: "bg-yellow-300", desc: "Skills & Libs" },
    { label: "STREAK", value: "🔥", color: "bg-emerald-300", desc: "Daily Commit" },
  ],

  links: [
    {
      id: "github",
      title: "GitHub",
      description: "오픈소스 기여 및 개인 프로젝트 소스코드",
      url: "https://github.com",
      badge: "CODE",
      bgColor: "bg-violet-200 hover:bg-violet-300",
      badgeColor: "bg-violet-400",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      id: "blog",
      title: "Tech Blog",
      description: "학습한 기술과 트러블슈팅 정리 벨로그",
      url: "https://velog.io",
      badge: "LOG",
      bgColor: "bg-emerald-200 hover:bg-emerald-300",
      badgeColor: "bg-emerald-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "주요 웹 서비스 데모 & 인터랙티브 쇼케이스",
      url: "#",
      badge: "DEMO",
      bgColor: "bg-cyan-200 hover:bg-cyan-300",
      badgeColor: "bg-cyan-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "resume",
      title: "Resume / Notion",
      description: "학습 커리큘럼, 자격 사항 및 상세 이력",
      url: "#",
      badge: "INFO",
      bgColor: "bg-pink-200 hover:bg-pink-300",
      badgeColor: "bg-pink-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ],

  skills: [
    { name: "React", bg: "bg-cyan-300", rotate: "-rotate-2" },
    { name: "Next.js", bg: "bg-white", rotate: "rotate-2" },
    { name: "TypeScript", bg: "bg-blue-300", rotate: "-rotate-1" },
    { name: "Tailwind CSS", bg: "bg-teal-300", rotate: "rotate-3" },
    { name: "JavaScript", bg: "bg-yellow-300", rotate: "-rotate-2" },
    { name: "HTML5 / CSS3", bg: "bg-orange-300", rotate: "rotate-1" },
    { name: "Node.js", bg: "bg-lime-300", rotate: "-rotate-3" },
    { name: "Git / GitHub", bg: "bg-purple-300", rotate: "rotate-2" },
    { name: "Figma", bg: "bg-pink-300", rotate: "-rotate-1" },
  ],
};

export default function ProfilePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(label);
      setTimeout(() => setCopied(null), 2400);
    } catch {
      setCopied("복사 실패");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE_DATA.name} | 프로필`,
          text: PROFILE_DATA.tagline,
          url: window.location.href,
        });
      } catch {
        // 취소 처리
      }
    } else {
      copyToClipboard(window.location.href, "프로필 링크");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF0] text-black relative flex flex-col items-center justify-start py-8 sm:py-12 px-3 sm:px-6 selection:bg-black selection:text-[#FFE169]">
      
      {/* 🏁 1. 상단 레트로 무한 마키 롤링 티커 배너 (Marquee Banner) */}
      <div className="w-full max-w-2xl mb-6 overflow-hidden bg-[#FFE169] border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl py-2">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 font-black text-xs sm:text-sm tracking-wider uppercase">
          <span>✦ SHIN CHAN-YONG ✦ STUDENT DEVELOPER ✦ REACT &amp; NEXT.JS ✦ PROBLEM SOLVER ✦ OPEN FOR COLLABORATION ✦</span>
          <span>✦ SHIN CHAN-YONG ✦ STUDENT DEVELOPER ✦ REACT &amp; NEXT.JS ✦ PROBLEM SOLVER ✦ OPEN FOR COLLABORATION ✦</span>
        </div>
      </div>

      {/* 팝아트 스타일 복사 완료 토스트 알림 */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#FFE169] border-3 border-black px-6 py-3 rounded-xl shadow-[5px_5px_0px_0px_#000] flex items-center gap-3 animate-bounce">
          <span className="font-black text-xl">🎉</span>
          <span className="font-black text-sm text-black uppercase tracking-tight">
            {copied} 복사 완료!
          </span>
        </div>
      )}

      {/* 💻 2. 메인 네오브루탈리즘 창 (Retro Window Container) */}
      <div className="w-full max-w-2xl bg-white border-3 sm:border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000] sm:shadow-[10px_10px_0px_0px_#000] overflow-hidden">
        
        {/* 창 상단 레트로 헤더 바 */}
        <div className="bg-[#FFE169] border-b-3 sm:border-b-4 border-black px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-black inline-block shadow-[1px_1px_0px_0px_#000]" />
            <span className="ml-2 font-mono font-black text-xs sm:text-sm tracking-tight text-black">
              ~/profile/shinyong.sh
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 공유 버튼 */}
            <button
              onClick={handleShare}
              title="공유하기"
              className="px-2.5 py-1 bg-white hover:bg-cyan-200 active:translate-x-[1px] active:translate-y-[1px] border-2 border-black rounded-lg text-xs font-black shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>SHARE</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 커버 배너 영역 */}
        <div className="relative h-44 sm:h-52 w-full border-b-3 sm:border-b-4 border-black bg-[#FFE169] overflow-hidden">
          <Image
            src="/cover.svg"
            alt="Neobrutalism Cover Banner"
            fill
            priority
            className="object-cover object-center"
          />
          {/* 배너 우측 하단 데코 스티커 */}
          <div className="absolute bottom-3 right-3 hidden sm:block rotate-[-3deg]">
            <span className="px-3 py-1 bg-black text-white font-black text-xs rounded-md shadow-[3px_3px_0px_0px_#FFF]">
              ★ 2026 EDITION ★
            </span>
          </div>
        </div>

        {/* 메인 프로필 본문 */}
        <div className="p-5 sm:p-8 bg-white relative">

          {/* 아바타 & 플로팅 스티커 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-20 sm:-mt-24 mb-6 gap-4">
            <div className="relative group">
              {/* 아바타 프레임 */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-3 sm:border-4 border-black bg-[#67E8F9] shadow-[5px_5px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] overflow-hidden rotate-[-2deg] group-hover:rotate-0 transition-transform duration-200">
                <Image
                  src="/avatar.svg"
                  alt={PROFILE_DATA.name}
                  width={144}
                  height={144}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 말풍선 스티커 */}
              <div className="absolute -top-4 -right-12 sm:-right-16 bg-[#F472B6] border-2 sm:border-3 border-black px-2.5 py-0.5 rounded-full font-black text-[11px] sm:text-xs shadow-[3px_3px_0px_0px_#000] rotate-[8deg]">
                HI THERE! 👋
              </div>
            </div>

            {/* 오픈 상태 뱃지 */}
            <div className="rotate-[2deg] hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#4ADE80] border-2 sm:border-3 border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_#000]">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                <span className="tracking-tight">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </div>

          {/* 이름 및 역할 */}
          <div className="text-center sm:text-left mb-6">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                {PROFILE_DATA.name}
              </h1>
              <span className="font-mono text-sm sm:text-base font-bold text-gray-700">
                ({PROFILE_DATA.englishName})
              </span>
              <span className="bg-[#67E8F9] border-2 border-black px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-black shadow-[2px_2px_0px_0px_#000] rotate-[-1deg]">
                {PROFILE_DATA.role}
              </span>
            </div>

            <p className="font-bold text-xs sm:text-base text-gray-800 mb-3">
              {PROFILE_DATA.tagline}
            </p>

            {/* 메타 태그 칩들 */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-black">
              <span className="bg-yellow-200 border-2 border-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-[2px_2px_0px_0px_#000]">
                📍 {PROFILE_DATA.location}
              </span>
              <span className="bg-purple-200 border-2 border-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-[2px_2px_0px_0px_#000]">
                🎓 {PROFILE_DATA.school}
              </span>
              <span
                onClick={() => copyToClipboard(PROFILE_DATA.email, "이메일")}
                className="bg-pink-200 border-2 border-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-[2px_2px_0px_0px_#000] cursor-pointer hover:bg-pink-300 active:translate-x-[1px] active:translate-y-[1px] transition-all truncate max-w-full"
              >
                ✉️ {PROFILE_DATA.email}
              </span>
            </div>
          </div>

          {/* 📊 3. 지표 카운터 (Neobrutalism Stats Grid) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.color} border-2 sm:border-3 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 transition-transform overflow-hidden`}
              >
                <div className="font-black text-base sm:text-2xl text-black truncate">
                  {stat.value}
                </div>
                <div className="font-black text-[10px] sm:text-xs text-black uppercase tracking-tight truncate">
                  {stat.label}
                </div>
                <div className="text-[10px] font-bold text-gray-800 hidden sm:block">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* 📝 4. 자기소개 박스 (Retro Note Card) */}
          <div className="mb-6 bg-[#FEF08A] border-2 sm:border-3 border-black rounded-xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000] relative">
            <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
              <span className="font-mono font-black text-xs tracking-wider uppercase text-black flex items-center gap-1.5">
                <span>📌</span> ABOUT_ME.TXT
              </span>
              <span className="text-[10px] font-mono font-bold bg-white border border-black px-1.5 py-0.5 rounded">
                READ-ONLY
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line text-gray-900">
              {PROFILE_DATA.bio}
            </p>
          </div>

          {/* 🔗 5. 주요 링크 목록 (Neobrutalism Link Cards) */}
          <div className="space-y-3 mb-7">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-xs sm:text-sm uppercase tracking-wider text-black flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-black rounded-full" />
                MY LINKS &amp; SOCIALS
              </h2>
              <span className="text-[11px] font-bold text-gray-500 font-mono">CLICK TO OPEN ↗</span>
            </div>

            {PROFILE_DATA.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 sm:border-3 border-black ${link.bgColor} shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 cursor-pointer`}
              >
                <div className="flex items-center gap-3.5">
                  {/* 아이콘 프레임 */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
                    {link.icon}
                  </div>
                  {/* 텍스트 */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm sm:text-base text-black">
                        {link.title}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border border-black ${link.badgeColor} shadow-[1px_1px_0px_0px_#000]`}>
                        {link.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* 우측 바로가기 뱃지 */}
                <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-black text-white rounded-lg font-black text-xs group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-colors">
                  <span>OPEN</span>
                  <span>➜</span>
                </div>
              </a>
            ))}
          </div>

          {/* ⚡ 6. 기술 스택 (Neobrutalism Sticker Pack) */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-black text-xs sm:text-sm uppercase tracking-wider text-black flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-black rounded-full" />
                TECH STACK STICKERS
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {PROFILE_DATA.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`${skill.bg} ${skill.rotate} border-2 border-black px-3 py-1.5 rounded-lg text-xs font-black shadow-[3px_3px_0px_0px_#000] hover:rotate-0 hover:scale-110 transition-transform cursor-default select-none`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* 📬 7. 하단 액션 버튼 영역 */}
          <div className="pt-4 border-t-2 sm:border-t-3 border-black flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => copyToClipboard(PROFILE_DATA.email, "이메일 주소")}
              className="flex-1 py-3 px-4 bg-[#FFE169] hover:bg-[#FDE047] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 sm:border-3 border-black rounded-xl font-black text-sm text-black shadow-[4px_4px_0px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📋</span>
              <span>이메일 주소 복사하기</span>
            </button>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="flex-1 py-3 px-4 bg-white hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 sm:border-3 border-black rounded-xl font-black text-sm text-black shadow-[4px_4px_0px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>✉️</span>
              <span>메일 바로 보내기 ➜</span>
            </a>
          </div>

          {/* 8. 레트로 푸터 */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center">
            <p className="font-mono font-bold text-xs text-gray-500">
              © {new Date().getFullYear()} {PROFILE_DATA.name} · CRAFTED WITH NEOBRUTALISM ✦
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
