"use client";

import React from "react";
import Image from "next/image";
import { MyLinkProfile } from "@/types/mylink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Sparkles } from "lucide-react";

interface ProfileHeaderProps {
  profile: MyLinkProfile;
  onCopyEmail?: (email: string) => void;
}

export function ProfileHeader({ profile, onCopyEmail }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* 아바타 & 플로팅 뱃지 */}
      <div className="relative mb-5 group">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 sm:border-3 border-black bg-brand-cyan shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] overflow-hidden -rotate-2 group-hover:rotate-0 transition-transform duration-200">
          <Image
            src={profile.avatarUrl || "/avatar.svg"}
            alt={profile.displayName}
            width={128}
            height={128}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* 플로팅 말풍선 스티커 (Shadcn Badge 기반) */}
        <Badge
          variant="neoPink"
          className="absolute -top-3 -right-10 text-[11px] rotate-6 select-none shadow-[2px_2px_0px_0px_#000]"
        >
          HI! 👋
        </Badge>
      </div>

      {/* 이름 & 유저네임 */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
            {profile.displayName}
          </h1>
          <span className="font-mono text-sm font-bold text-gray-600">
            @{profile.username}
          </span>
        </div>

        {/* 역할 뱃지 */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {profile.badge && (
            <Badge variant="neo" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              {profile.badge}
            </Badge>
          )}
          <Badge variant="neoSuccess" className="text-xs">
            <span className="w-2 h-2 rounded-full bg-black inline-block mr-1 animate-pulse" />
            AVAILABLE FOR HIRE
          </Badge>
        </div>
      </div>

      {/* 바이오 / 한 줄 소개 */}
      <p className="max-w-md text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed whitespace-pre-line mb-4 px-2">
        {profile.bio}
      </p>

      {/* 메타 정보 뱃지 및 액션 버튼 */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
        <Badge variant="neoYellow" className="text-xs py-1 px-2.5 shadow-[2px_2px_0px_0px_#000]">
          <MapPin className="w-3.5 h-3.5 text-black mr-1" /> Seoul, KR
        </Badge>

        {onCopyEmail && (
          <Button
            onClick={() => onCopyEmail("chanyong.dev@gmail.com")}
            variant="neo"
            size="sm"
            className="h-auto py-1 px-2.5 rounded-full bg-pink-200 hover:bg-pink-300 text-xs font-bold shadow-[2px_2px_0px_0px_#000]"
            title="이메일 주소 복사"
          >
            <Mail className="w-3.5 h-3.5 text-black mr-1" /> chanyong.dev@gmail.com
          </Button>
        )}
      </div>
    </div>
  );
}
