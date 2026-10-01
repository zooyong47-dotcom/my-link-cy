"use client";

import React from "react";
import { CustomLink } from "@/types/mylink";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  BookOpen,
  FileText,
  MessageCircle,
  ExternalLink,
  Sparkles,
  MousePointerClick,
} from "lucide-react";
import { GithubIcon, FigmaIcon, YoutubeIcon } from "@/components/icons";

interface LinkCardProps {
  link: CustomLink;
  onLinkClick?: (id: string) => void;
}

export function LinkCard({ link, onLinkClick }: LinkCardProps) {
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "globe":
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "github":
        return <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "book-open":
        return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "file-text":
        return <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "figma":
        return <FigmaIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "message-circle":
        return <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      case "youtube":
        return <YoutubeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
      default:
        return <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-black" />;
    }
  };

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  const isHighlighted = link.highlight;

  return (
    <a
      href={link.url}
      target={link.url.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block group cursor-pointer focus-visible:outline-none"
    >
      <Card
        variant="neoInteractive"
        className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl ${
          isHighlighted ? "ring-2 ring-yellow-400 bg-amber-50/40" : ""
        }`}
      >
        {/* 하이라이트 뱃지 (상단 모서리) */}
        {isHighlighted && (
          <span className="absolute -top-2.5 -right-2">
            <Badge variant="neoYellow" className="text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
              FEATURED
            </Badge>
          </span>
        )}

        <div className="flex items-center gap-3.5 min-w-0">
          {/* 아이콘 프레임 */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-yellow border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
            {renderIcon(link.icon)}
          </div>

          {/* 링크 타이틀 및 서브타이틀 */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-sm sm:text-base text-black truncate">
                {link.title}
              </span>
              {link.badge && (
                <Badge variant="neo" className="text-[10px] px-2 py-0.5">
                  {link.badge}
                </Badge>
              )}
            </div>
            {link.subtitle && (
              <p className="text-xs font-semibold text-gray-700 truncate mt-0.5">
                {link.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 우측 바로가기 액션 / 클릭수 */}
        <div className="flex items-center gap-2 shrink-0">
          {typeof link.clicks === "number" && link.clicks > 0 && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-300">
              <MousePointerClick className="w-3 h-3 text-gray-600" />
              {link.clicks.toLocaleString()}
            </span>
          )}
          <Button
            variant="neoDark"
            size="iconSm"
            className="group-hover:bg-brand-yellow group-hover:text-black transition-colors"
          >
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </Button>
        </div>
      </Card>
    </a>
  );
}
