"use client";

import React from "react";
import Image from "next/image";
import { MyLinkProfile } from "@/types/mylink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Sparkles, CheckCircle2 } from "lucide-react";

interface ProfileHeaderProps {
  profile: MyLinkProfile;
  onCopyEmail?: (email: string) => void;
  isLoggedIn?: boolean;
}

export function ProfileHeader({ profile, onCopyEmail, isLoggedIn = false }: ProfileHeaderProps) {
  const emailToUse = profile.email || "user@example.com";

  return (
    <div className="flex flex-col items-center text-center">
      {/* 아바타: NOL의 둥근 모서리 (rounded-[24px]) 및 1px 소프트 테두리 */}
      <div className="relative mb-4 group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] border border-neutral-weak2 bg-neutral-weak p-0.5 shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-105">
          <Image
            src={profile.avatarUrl || "/avatar.svg"}
            alt={profile.displayName || "프로필"}
            width={112}
            height={112}
            priority
            unoptimized
            className="w-full h-full object-cover rounded-[22px]"
          />
        </div>
      </div>

      {/* 이름 & 유저네임 */}
      <div className="space-y-1 mb-2.5">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-main">
            {profile.displayName}
          </h1>
          <span className="font-mono text-sm text-neutral-medium">
            @{profile.username}
          </span>
        </div>

        {/* NOL 스타일 뱃지 그룹 */}
        <div className="flex items-center justify-center gap-1.5 pt-1 flex-wrap">
          {profile.badge && (
            <Badge variant="primary" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1 text-primary-main" />
              {profile.badge}
            </Badge>
          )}
          <Badge variant={isLoggedIn ? "neutral" : "outline"} className="text-xs">
            <CheckCircle2 className={`w-3 h-3 mr-1 ${isLoggedIn ? "text-primary-main" : "text-neutral-medium"}`} />
            {isLoggedIn ? "VERIFIED GOOGLE ACCOUNT" : "GUEST MODE"}
          </Badge>
        </div>
      </div>

      {/* 바이오 / 소개글 (NOL의 중립 보조 글자) */}
      <p className="max-w-md text-xs sm:text-sm font-normal text-neutral-strong1 leading-relaxed whitespace-pre-line mb-4 px-2">
        {profile.bio}
      </p>

      {/* 메타 정보 칩 (위치, 이메일) */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 bg-neutral-weak border border-neutral-weak2 text-neutral-strong1 px-3 py-1 rounded-full font-medium">
          <MapPin className="w-3.5 h-3.5 text-neutral-medium" /> Seoul, KR
        </span>

        {profile.email && onCopyEmail && (
          <Button
            onClick={() => onCopyEmail(emailToUse)}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-medium h-7 px-3 text-neutral-strong1 hover:text-neutral-main cursor-pointer"
            title="이메일 주소 복사"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-medium mr-1" />
            <span className="max-w-[150px] sm:max-w-none truncate">{emailToUse}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
