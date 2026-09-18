"use client";

import { useState } from "react";
import Image from "next/image";

// 🌟 프로필 정보 데이터 (필요에 따라 손쉽게 수정 가능)
const PROFILE_DATA = {
  name: "신찬용",
  englishName: "Chan-yong Shin",
  role: "Student Developer",
  statusMessage: "🌱 더 나은 사용자 경험과 클린 코드를 고민하는 개발자",
  location: "Seoul, South Korea",
  school: "컴퓨터공학 전공",
  email: "chanyong.dev@gmail.com",
  bio: "새로운 기술을 탐구하고 직관적인 사용자 경험을 구현하는 것을 좋아합니다.\n웹 프론트엔드와 최신 기술 스택에 관심이 많으며, 문제를 집요하게 파고들어 우아한 해결책을 찾아냅니다.",
  
  // 핵심 지표
  stats: [
    { label: "Projects", value: "8+", sub: "Toy & Team" },
    { label: "Tech Stack", value: "10+", sub: "Languages & Libs" },
    { label: "Commit Streak", value: "🔥 Active", sub: "Daily Coding" },
  ],

  // 핵심 링크 모음
  links: [
    {
      id: "github",
      title: "GitHub",
      description: "오픈소스 프로젝트와 소스코드 저장소",
      url: "https://github.com",
      badge: "Popular",
      color: "from-gray-800 to-gray-900 text-white hover:border-gray-700",
      iconBg: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      id: "blog",
      title: "Tech Blog",
      description: "배운 점과 기술적인 고민을 기록하는 벨로그",
      url: "https://velog.io",
      badge: "Articles",
      color: "from-emerald-500 to-teal-600 text-white hover:border-emerald-400",
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "인터랙티브 웹 프로젝트 & 프로덕트 쇼케이스",
      url: "#",
      badge: "Showcase",
      color: "from-blue-600 to-indigo-600 text-white hover:border-blue-400",
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "resume",
      title: "Resume & Notion",
      description: "학습 이력 및 프로젝트 상세 소개서",
      url: "#",
      badge: "Profile",
      color: "from-violet-600 to-purple-600 text-white hover:border-purple-400",
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ],

  // 기술 스택
  skills: [
    { name: "React", category: "frontend", icon: "⚛️" },
    { name: "Next.js", category: "frontend", icon: "▲" },
    { name: "TypeScript", category: "frontend", icon: "TS" },
    { name: "Tailwind CSS", category: "frontend", icon: "🎨" },
    { name: "JavaScript (ES6+)", category: "language", icon: "JS" },
    { name: "HTML5 / CSS3", category: "frontend", icon: "🌐" },
    { name: "Node.js", category: "backend", icon: "🟢" },
    { name: "Git & GitHub", category: "tools", icon: "🐙" },
    { name: "Figma", category: "design", icon: "📐" },
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
      setTimeout(() => setCopied(null), 2500);
    } catch {
      setCopied("복사 실패");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE_DATA.name} | 프로필`,
          text: PROFILE_DATA.statusMessage,
          url: window.location.href,
        });
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      copyToClipboard(window.location.href, "페이지 링크");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/40 to-blue-50 py-8 sm:py-14 px-3 sm:px-6 flex justify-center items-start selection:bg-blue-500 selection:text-white antialiased">
      {/* 배경 장식 원형 블러 효과 (Ambient Glow) */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 토스트 알림 (복사 완료 시 등장) */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{copied}가 클립보드에 복사되었습니다!</span>
        </div>
      )}

      {/* 메인 프로필 카드 (반응형 래퍼: 모바일 ~ 데스크톱 유연 대응) */}
      <div className="w-full max-w-xl bg-white/85 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-500/5 border border-white/80 overflow-hidden transition-all duration-300">
        
        {/* 1. 상단 커버 배너 영역 */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src="/cover.svg"
            alt="Profile Cover Banner"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          {/* 배너 상단 액션 버튼들 (공유 & 이메일) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              title="프로필 공유하기"
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              onClick={() => copyToClipboard(PROFILE_DATA.email, "이메일")}
              title="이메일 복사"
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. 프로필 아바타 및 헤더 정보 */}
        <div className="relative px-6 sm:px-8 pb-8 pt-0">
          {/* 아바타 이미지 & 온라인 상태 인디케이터 */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-5">
            <div className="relative inline-block mx-auto sm:mx-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-gradient-to-tr from-blue-500 to-indigo-600 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/avatar.svg"
                  alt={PROFILE_DATA.name}
                  width={128}
                  height={128}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 실시간 상태 배지 (초록색 펄싱 뱃지) */}
              <span
                title="프로젝트 및 협업 가능"
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white"
              >
                <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
              </span>
            </div>

            {/* 상태 태그 버튼 */}
            <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Open for Collaboration
              </span>
            </div>
          </div>

          {/* 이름 및 역할 타이틀 */}
          <div className="text-center sm:text-left mb-6">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {PROFILE_DATA.name}
              </h1>
              <span className="text-sm font-medium text-slate-500">
                ({PROFILE_DATA.englishName})
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100/80 rounded-full border border-blue-200">
                {PROFILE_DATA.role}
              </span>
            </div>

            {/* 한 줄 모토 */}
            <p className="text-sm font-medium text-indigo-600 mb-3">
              {PROFILE_DATA.statusMessage}
            </p>

            {/* 인포 칩 (위치, 학과, 이메일) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{PROFILE_DATA.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span>{PROFILE_DATA.school}</span>
              </div>
            </div>
          </div>

          {/* 3. 통계 / 현황 그리드 (반응형 3칸) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-center mb-6">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {stat.label}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

          {/* 4. 자기소개 (Bio) 박스 */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/60 text-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Me
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-600">
              {PROFILE_DATA.bio}
            </p>
          </div>

          {/* 5. 주요 링크 목록 (Link Cards) */}
          <div className="space-y-3 mb-7">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Connect & Explore
              </h2>
              <span className="text-[11px] text-slate-400">클릭하여 바로가기</span>
            </div>

            {PROFILE_DATA.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center gap-3.5">
                  {/* 아이콘 컨테이너 */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-200 ${link.iconBg}`}>
                    {link.icon}
                  </div>
                  {/* 텍스트 정보 */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* 우측 화살표 아이콘 */}
                <div className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* 6. 기술 스택 (Tech Stack) 칩 */}
          <div className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {PROFILE_DATA.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-white hover:text-blue-600 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all duration-150 cursor-default"
                >
                  <span className="text-xs">{skill.icon}</span>
                  <span>{skill.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 7. 하단 연락하기 액션 버튼 */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => copyToClipboard(PROFILE_DATA.email, "이메일 주소")}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.01]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>이메일 복사하기</span>
            </button>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-all duration-200"
            >
              <span>메일 보내기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* 하단 푸터 */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {PROFILE_DATA.name} · Built with Next.js & Tailwind CSS
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
