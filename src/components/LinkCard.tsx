"use client";

import React from "react";
import { CustomLink } from "@/types/mylink";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  BookOpen,
  FileText,
  MessageCircle,
  ChevronRight,
  MousePointerClick,
  Trash2,
  Loader2,
} from "lucide-react";
import { GithubIcon, FigmaIcon, YoutubeIcon } from "@/components/icons";

interface LinkCardProps {
  link: CustomLink;
  onLinkClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function LinkCard({ link, onLinkClick, onDelete, isDeleting = false }: LinkCardProps) {
  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "globe":
        return <Globe className="w-5 h-5 text-primary-main" />;
      case "github":
        return <GithubIcon className="w-5 h-5 text-neutral-main" />;
      case "book-open":
        return <BookOpen className="w-5 h-5 text-primary-main" />;
      case "file-text":
        return <FileText className="w-5 h-5 text-primary-main" />;
      case "figma":
        return <FigmaIcon className="w-5 h-5 text-neutral-main" />;
      case "message-circle":
        return <MessageCircle className="w-5 h-5 text-primary-main" />;
      case "youtube":
        return <YoutubeIcon className="w-5 h-5 text-accent-main" />;
      default:
        return <Globe className="w-5 h-5 text-primary-main" />;
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
      className={`block group cursor-pointer focus-visible:outline-none transition-opacity duration-200 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Card
        variant="interactive"
        className={`p-4 rounded-[16px] flex items-center justify-between transition-all duration-150 ${
          isHighlighted
            ? "border-primary-weak2 bg-primary-weak/30 hover:border-primary-main"
            : ""
        } ${isDeleting ? "bg-neutral-weak/50" : ""}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* 아이콘 프레임: NOL 12px 둥근 모서리 + 부드러운 배경 */}
          <div className="w-11 h-11 rounded-[12px] bg-neutral-weak flex items-center justify-center shrink-0 border border-neutral-weak2 group-hover:bg-primary-weak group-hover:border-primary-weak2 transition-colors">
            {renderIcon(link.icon)}
          </div>

          {/* 링크 타이틀 및 설명 */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base text-neutral-main truncate group-hover:text-primary-main transition-colors">
                {link.title}
              </span>
              {link.badge && (
                <Badge
                  variant={isHighlighted ? "accent" : "primary"}
                  className="text-[10px] py-0 px-2 h-5"
                >
                  {link.badge}
                </Badge>
              )}
            </div>
            {link.subtitle && (
              <p className="text-xs text-neutral-strong1 truncate mt-0.5">
                {link.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 우측 바로가기 액션 / 클릭수 / 삭제 버튼 */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {typeof link.clicks === "number" && link.clicks > 0 && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-neutral-medium bg-neutral-weak px-2 py-0.5 rounded-full border border-neutral-weak2">
              <MousePointerClick className="w-3 h-3 text-neutral-strong1" />
              {link.clicks.toLocaleString()}
            </span>
          )}

          {/* 🗑️ 링크 삭제 버튼 */}
          {onDelete && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`'${link.title}' 링크를 삭제하시겠습니까?`)) {
                  onDelete(link.id);
                }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-weak4 hover:text-accent-main hover:bg-accent-weak transition-all cursor-pointer disabled:cursor-not-allowed"
              title="링크 삭제"
              aria-label="링크 삭제"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin text-accent-main" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          )}

          <div className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-medium group-hover:text-primary-main group-hover:translate-x-0.5 transition-all">
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
      </Card>
    </a>
  );
}
