"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema, CreateLinkInput } from "@/lib/validations/link";
import { CustomLink } from "@/types/mylink";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  BookOpen,
  FileText,
  MessageCircle,
  ChevronRight,
  MousePointerClick,
  Pencil,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import { GithubIcon, FigmaIcon, YoutubeIcon } from "@/components/icons";

interface LinkCardProps {
  link: CustomLink;
  onLinkClick?: (id: string) => void;
  onRequestDelete?: (link: CustomLink) => void;
  onUpdate?: (
    id: string,
    data: { title: string; url: string; subtitle?: string; badge?: string }
  ) => Promise<any> | void;
  isDeleting?: boolean;
}

export function LinkCard({
  link,
  onLinkClick,
  onRequestDelete,
  onUpdate,
  isDeleting = false,
}: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 📝 React Hook Form + Zod 입력 검증 연동 (추가 시와 동일한 규칙)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    mode: "onChange",
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  const currentTitle = watch("title") ?? "";
  const currentUrl = watch("url") ?? "";

  // 인라인 편집 모드로 진입 시 첫 필드로 포커스 및 초기값 동기화
  useEffect(() => {
    if (isEditing) {
      reset({
        title: link.title,
        url: link.url,
      });
      setTimeout(() => {
        setFocus("title");
      }, 50);
    }
  }, [isEditing, link.title, link.url, reset, setFocus]);

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

  const handleCardClick = () => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    reset({
      title: link.title,
      url: link.url,
    });
    setIsEditing(false);
  };

  const onSave = async (data: CreateLinkInput) => {
    if (!onUpdate) return;
    let finalUrl = data.url.trim();
    if (
      !finalUrl.startsWith("http://") &&
      !finalUrl.startsWith("https://") &&
      !finalUrl.startsWith("mailto:")
    ) {
      finalUrl = `https://${finalUrl}`;
    }

    try {
      setIsSaving(true);
      await onUpdate(link.id, {
        title: data.title.trim(),
        url: finalUrl,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Link update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isHighlighted = link.highlight;
  const isTitleValid = !errors.title && currentTitle.trim().length >= 2;
  const isUrlValid = !errors.url && currentUrl.trim().length > 0;

  // 수정 일시 포맷팅 헬퍼
  const formatDateTime = (val: any) => {
    if (!val) return null;
    const time =
      typeof val?.toMillis === "function"
        ? val.toMillis()
        : typeof val?.toDate === "function"
        ? val.toDate().getTime()
        : typeof val === "number"
        ? val
        : new Date(val).getTime();
    if (!time || isNaN(time)) return null;
    const d = new Date(time);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const formattedUpdateAt = formatDateTime(link.updateAt || link.updatedAt);

  // 🛠️ 1. 인라인 편집 UI 렌더링
  if (isEditing) {
    return (
      <Card className="p-4 sm:p-5 rounded-[16px] border-2 border-primary-main bg-static-white shadow-md animate-in fade-in zoom-in-95 duration-150">
        <form onSubmit={handleSubmit(onSave)} noValidate className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-neutral-weak2 pb-2">
            <span className="text-xs font-bold text-primary-main flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5" />
              링크 인라인 수정
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              {formattedUpdateAt && (
                <span className="text-neutral-medium font-mono hidden sm:inline">
                  수정됨: {formattedUpdateAt}
                </span>
              )}
              <span className="text-neutral-strong1">
                파이어베이스 갱신
              </span>
            </div>
          </div>

          {/* 제목 입력 영역 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`edit-title-${link.id}`}
                className="text-xs font-bold text-neutral-main flex items-center gap-1 cursor-pointer"
              >
                <span>제목</span>
                <span className="text-accent-main">*</span>
              </label>
              <div className="flex items-center gap-2">
                {isTitleValid && (
                  <span className="text-[11px] font-medium text-[#008161] flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> 유효함
                  </span>
                )}
                <span
                  className={`text-[11px] font-mono ${
                    currentTitle.length > 40
                      ? "text-accent-main font-bold"
                      : "text-neutral-medium"
                  }`}
                >
                  {currentTitle.length}/40
                </span>
              </div>
            </div>
            <input
              id={`edit-title-${link.id}`}
              type="text"
              maxLength={45}
              {...register("title")}
              placeholder="링크 제목 (최소 2자 이상)"
              aria-invalid={!!errors.title}
              className={`w-full px-3 py-2 rounded-[10px] border text-xs sm:text-sm text-neutral-main focus:outline-none transition-all ${
                errors.title
                  ? "border-accent-main bg-accent-weak/20 focus:ring-2 focus:ring-accent-main/20"
                  : "border-neutral-weak2 bg-neutral-weak/50 focus:border-primary-main focus:bg-static-white focus:ring-2 focus:ring-primary-main/10"
              }`}
            />
            {errors.title && (
              <p className="text-[11px] text-accent-main flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.title.message}</span>
              </p>
            )}
          </div>

          {/* URL 입력 영역 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`edit-url-${link.id}`}
                className="text-xs font-bold text-neutral-main flex items-center gap-1 cursor-pointer"
              >
                <span>URL</span>
                <span className="text-accent-main">*</span>
              </label>
              {isUrlValid && (
                <span className="text-[11px] font-medium text-[#008161] flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> 유효함
                </span>
              )}
            </div>
            <input
              id={`edit-url-${link.id}`}
              type="text"
              {...register("url")}
              placeholder="예: https://example.com 또는 github.com"
              aria-invalid={!!errors.url}
              className={`w-full px-3 py-2 rounded-[10px] border text-xs sm:text-sm font-mono text-neutral-main focus:outline-none transition-all ${
                errors.url
                  ? "border-accent-main bg-accent-weak/20 focus:ring-2 focus:ring-accent-main/20"
                  : "border-neutral-weak2 bg-neutral-weak/50 focus:border-primary-main focus:bg-static-white focus:ring-2 focus:ring-primary-main/10"
              }`}
            />
            {errors.url ? (
              <p className="text-[11px] text-accent-main flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.url.message}</span>
              </p>
            ) : (
              <p className="text-[10px] text-neutral-medium">
                💡 http/https 미입력 시 https://가 자동으로 적용됩니다.
              </p>
            )}
          </div>

          {/* 인라인 액션 버튼 */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-weak2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={handleCancelEdit}
              className="h-8 px-3 rounded-[8px] text-xs font-medium"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving || !isValid}
              className="h-8 px-3.5 rounded-[8px] text-xs font-bold"
            >
              {isSaving ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>파이어베이스 갱신 중...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>수정하기</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  // 🔗 2. 일반 링크 카드 렌더링 (수정/삭제 버튼 항상 표시)
  return (
    <a
      href={link.url}
      target={link.url.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onClick={handleCardClick}
      className={`block group cursor-pointer focus-visible:outline-none transition-opacity duration-200 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Card
        variant="interactive"
        className={`p-3.5 sm:p-4 rounded-[16px] flex items-center justify-between transition-all duration-150 ${
          isHighlighted
            ? "border-primary-weak2 bg-primary-weak/30 hover:border-primary-main"
            : ""
        } ${isDeleting ? "bg-neutral-weak/50" : ""}`}
      >
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1 mr-2">
          {/* 아이콘 프레임 */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] bg-neutral-weak flex items-center justify-center shrink-0 border border-neutral-weak2 group-hover:bg-primary-weak group-hover:border-primary-weak2 transition-colors">
            {renderIcon(link.icon)}
          </div>

          {/* 링크 타이틀 및 설명 */}
          <div className="min-w-0 pr-1 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base text-neutral-main truncate group-hover:text-primary-main transition-colors">
                {link.title}
              </span>
              {link.badge && (
                <Badge
                  variant={isHighlighted ? "accent" : "primary"}
                  className="text-[10px] py-0 px-1.5 h-4 sm:h-5 shrink-0"
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
            {formattedUpdateAt && (
              <p className="text-[10px] text-neutral-medium truncate mt-0.5 font-mono">
                수정: {formattedUpdateAt}
              </p>
            )}
          </div>
        </div>

        {/* 우측 액션 영역: 클릭수 + 항상 표시되는 [수정], [삭제] 버튼 + 이동 화살표 */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 클릭 수 카운터 (있을 때만) */}
          {typeof link.clicks === "number" && link.clicks > 0 && (
            <span className="hidden md:flex items-center gap-1 text-[11px] font-mono text-neutral-medium bg-neutral-weak px-2 py-0.5 rounded-full border border-neutral-weak2 mr-0.5">
              <MousePointerClick className="w-3 h-3 text-neutral-strong1" />
              {link.clicks.toLocaleString()}
            </span>
          )}

          {/* ✏️ 항상 표시되는 수정 버튼 (아이콘 전용) */}
          {onUpdate && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="w-8 h-8 rounded-[10px] flex items-center justify-center text-neutral-strong1 bg-neutral-weak hover:text-primary-main hover:bg-primary-weak hover:border-primary-weak2 border border-neutral-weak2 shadow-2xs transition-all cursor-pointer"
              title={
                formattedUpdateAt
                  ? `링크 수정 (수정일: ${formattedUpdateAt})`
                  : "링크 수정"
              }
              aria-label="링크 수정"
            >
              <Pencil className="w-3.5 h-3.5 text-primary-main" />
            </button>
          )}

          {/* 🗑️ 항상 표시되는 삭제 버튼 (아이콘 전용) */}
          {onRequestDelete && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRequestDelete(link);
              }}
              className="w-8 h-8 rounded-[10px] flex items-center justify-center text-neutral-strong1 bg-neutral-weak hover:text-accent-main hover:bg-accent-weak hover:border-accent-main/30 border border-neutral-weak2 shadow-2xs transition-all cursor-pointer disabled:cursor-not-allowed"
              title="링크 삭제"
              aria-label="링크 삭제"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-accent-main" />
              ) : (
                <Trash2 className="w-3.5 h-3.5 text-accent-main" />
              )}
            </button>
          )}

          {/* 바로가기 Chevron 화살표 */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-neutral-medium group-hover:text-primary-main group-hover:translate-x-0.5 transition-all">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          </div>
        </div>
      </Card>
    </a>
  );
}
