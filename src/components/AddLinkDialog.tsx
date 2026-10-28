"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLinkSchema,
  CreateLinkInput,
} from "@/lib/validations/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkCard } from "@/components/LinkCard";
import { CustomLink } from "@/types/mylink";
import {
  Globe,
  BookOpen,
  FileText,
  MessageCircle,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, FigmaIcon, YoutubeIcon } from "@/components/icons";

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: {
    title: string;
    url: string;
    subtitle?: string;
    badge?: string;
    icon?: string;
    highlight?: boolean;
  }) => void;
}

const AVAILABLE_ICONS = [
  { id: "globe", label: "웹", icon: Globe },
  { id: "github", label: "GitHub", icon: GithubIcon },
  { id: "book-open", label: "블로그", icon: BookOpen },
  { id: "file-text", label: "문서", icon: FileText },
  { id: "figma", label: "Figma", icon: FigmaIcon },
  { id: "youtube", label: "유튜브", icon: YoutubeIcon },
  { id: "message-circle", label: "메시지", icon: MessageCircle },
];

const QUICK_BADGES = ["HOT", "NEW", "추천", "BEST", "LIVE"];

export function AddLinkDialog({
  open,
  onOpenChange,
  onAddLink,
}: AddLinkDialogProps) {
  // ⚡ React Hook Form + Zod Resolver 연동
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setFocus,
    formState: { errors, touchedFields, isSubmitted, isValid },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      url: "",
      subtitle: "",
      badge: "",
      icon: "globe",
      highlight: false,
    },
  });

  // 실시간 입력값 감시 (라이브 프리뷰 및 글자수 계산)
  const currentTitle = watch("title") || "";
  const currentUrl = watch("url") || "";
  const currentSubtitle = watch("subtitle") || "";
  const currentBadge = watch("badge") || "";
  const currentIcon = watch("icon") || "globe";
  const currentHighlight = watch("highlight") || false;

  // 다이얼로그가 열릴 때 첫 번째 필드로 자동 포커스
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setFocus("title");
      }, 100);
    }
  }, [open, setFocus]);

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  // 폼 제출 완료 핸들러
  const onSubmit = (data: CreateLinkInput) => {
    let finalUrl = data.url.trim();
    if (
      !finalUrl.startsWith("http://") &&
      !finalUrl.startsWith("https://") &&
      !finalUrl.startsWith("mailto:")
    ) {
      finalUrl = `https://${finalUrl}`;
    }

    onAddLink({
      title: data.title.trim(),
      url: finalUrl,
      subtitle: data.subtitle?.trim() || undefined,
      badge: data.badge?.trim() || undefined,
      icon: data.icon,
      highlight: data.highlight,
    });

    handleClose();
  };

  // 실시간 라이브 미리보기 데이터
  const isTitleValid = !errors.title && currentTitle.trim().length >= 2;
  const isUrlValid = !errors.url && currentUrl.trim().length > 0;

  const previewLink: CustomLink = {
    id: "preview",
    title: currentTitle.trim() || "링크 제목 미리보기",
    subtitle: currentSubtitle.trim() || "설명 문구가 여기에 미리 보여집니다.",
    url: isUrlValid ? currentUrl.trim() : "#",
    badge: currentBadge.trim() || undefined,
    icon: currentIcon,
    highlight: currentHighlight,
    enabled: true,
    clicks: 0,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[10px] bg-primary-weak text-primary-main">
              <Sparkles className="w-4 h-4" />
            </span>
            <DialogTitle>새 링크 추가</DialogTitle>
          </div>
          <DialogDescription>
            React Hook Form과 Zod 스키마 검증을 통해 타입 안정성과 올바른 입력 형식을 보장합니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* 전체 에러 요약 알림 (제출 시도 후 에러가 있을 때) */}
          {isSubmitted && !isValid && Object.keys(errors).length > 0 && (
            <div className="p-3 rounded-[12px] bg-accent-weak border border-accent-main/20 text-accent-main text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-accent-main" />
              <span>입력 정보 중 확인이 필요한 항목이 있습니다. 아래 내용을 확인해 주세요.</span>
            </div>
          )}

          {/* 제목 입력 필드 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-title"
                className="text-xs font-bold text-neutral-main flex items-center gap-1 cursor-pointer"
              >
                <span>링크 제목</span>
                <span className="text-accent-main">*</span>
              </label>
              <div className="flex items-center gap-2">
                {touchedFields.title && isTitleValid && (
                  <span className="text-[11px] font-medium text-[#008161] flex items-center gap-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 사용 가능
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
            <div className="relative">
              <input
                id="link-title"
                type="text"
                maxLength={45}
                {...register("title")}
                placeholder="예: 포트폴리오 웹사이트, 벨로그 블로그"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-[12px] border text-sm text-neutral-main placeholder:text-neutral-weak4 focus:outline-none transition-all ${
                  errors.title
                    ? "border-accent-main bg-accent-weak/20 focus:ring-2 focus:ring-accent-main/20"
                    : isTitleValid
                    ? "border-neutral-weak2 bg-static-white focus:border-primary-main focus:ring-2 focus:ring-primary-main/10"
                    : "border-neutral-weak2 bg-neutral-weak/40 focus:border-primary-main focus:bg-static-white focus:ring-2 focus:ring-primary-main/10"
                }`}
              />
            </div>
            {errors.title && (
              <p
                id="title-error"
                className="text-xs text-accent-main flex items-center gap-1 mt-1 font-medium animate-in fade-in duration-150"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.title.message}</span>
              </p>
            )}
          </div>

          {/* URL 입력 필드 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-url"
                className="text-xs font-bold text-neutral-main flex items-center gap-1 cursor-pointer"
              >
                <span>연결 URL</span>
                <span className="text-accent-main">*</span>
              </label>
              {touchedFields.url && isUrlValid && (
                <span className="text-[11px] font-medium text-[#008161] flex items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 유효한 주소
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="link-url"
                type="text"
                {...register("url")}
                placeholder="예: https://myportfolio.com 또는 github.com/user"
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? "url-error" : undefined}
                className={`w-full px-3.5 py-2.5 rounded-[12px] border text-sm text-neutral-main placeholder:text-neutral-weak4 focus:outline-none font-mono text-xs sm:text-sm transition-all ${
                  errors.url
                    ? "border-accent-main bg-accent-weak/20 focus:ring-2 focus:ring-accent-main/20"
                    : isUrlValid
                    ? "border-neutral-weak2 bg-static-white focus:border-primary-main focus:ring-2 focus:ring-primary-main/10"
                    : "border-neutral-weak2 bg-neutral-weak/40 focus:border-primary-main focus:bg-static-white focus:ring-2 focus:ring-primary-main/10"
                }`}
              />
            </div>
            {errors.url ? (
              <p
                id="url-error"
                className="text-xs text-accent-main flex items-center gap-1 mt-1 font-medium animate-in fade-in duration-150"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.url.message}</span>
              </p>
            ) : (
              <p className="text-[11px] text-neutral-medium">
                💡 http:// 또는 https:// 가 누락된 경우 자동으로 https:// 가 적용됩니다.
              </p>
            )}
          </div>

          {/* 부제목/설명 입력 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-subtitle"
                className="text-xs font-bold text-neutral-main flex items-center justify-between cursor-pointer"
              >
                <span>설명 / 부제목 <span className="font-normal text-neutral-medium">(선택)</span></span>
              </label>
              <span
                className={`text-[11px] font-mono ${
                  currentSubtitle.length > 60
                    ? "text-accent-main font-bold"
                    : "text-neutral-medium"
                }`}
              >
                {currentSubtitle.length}/60
              </span>
            </div>
            <input
              id="link-subtitle"
              type="text"
              maxLength={70}
              {...register("subtitle")}
              placeholder="예: 진행했던 주요 프로젝트 데모 및 상세 소개"
              className={`w-full px-3.5 py-2.5 rounded-[12px] border text-sm text-neutral-main placeholder:text-neutral-weak4 focus:outline-none transition-all ${
                errors.subtitle
                  ? "border-accent-main bg-accent-weak/20"
                  : "border-neutral-weak2 bg-neutral-weak/40 focus:border-primary-main focus:bg-static-white focus:ring-2 focus:ring-primary-main/10"
              }`}
            />
            {errors.subtitle && (
              <p className="text-xs text-accent-main flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.subtitle.message}</span>
              </p>
            )}
          </div>

          {/* 아이콘 선택기 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-main">
              아이콘 선택
            </label>
            <div className="grid grid-cols-7 gap-1.5 p-1 bg-neutral-weak rounded-[14px] border border-neutral-weak2">
              {AVAILABLE_ICONS.map((item) => {
                const IconComp = item.icon;
                const isSelected = currentIcon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setValue("icon", item.id, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={`flex flex-col items-center justify-center p-2 rounded-[10px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-static-white shadow-sm border border-primary-weak2 text-primary-main scale-105"
                        : "text-neutral-strong1 hover:bg-static-white/60 hover:text-neutral-main"
                    }`}
                    title={item.label}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className="text-[10px] font-medium mt-1 truncate max-w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 뱃지 선택 및 입력 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-main">
                뱃지 라벨 <span className="font-normal text-neutral-medium">(선택)</span>
              </label>
              {currentBadge && (
                <button
                  type="button"
                  onClick={() =>
                    setValue("badge", "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className="text-[11px] text-neutral-medium hover:text-neutral-main underline cursor-pointer"
                >
                  지우기
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {QUICK_BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() =>
                    setValue("badge", currentBadge === b ? "" : b, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentBadge === b
                      ? "bg-primary-main text-static-white shadow-sm"
                      : "bg-neutral-weak text-neutral-strong1 border border-neutral-weak2 hover:bg-neutral-weak1"
                  }`}
                >
                  {b}
                </button>
              ))}
              <input
                type="text"
                maxLength={12}
                value={currentBadge}
                onChange={(e) =>
                  setValue("badge", e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                placeholder="직접 입력"
                className={`w-24 px-2.5 py-1 text-xs rounded-full border bg-neutral-weak/40 focus:outline-none focus:bg-static-white ${
                  errors.badge
                    ? "border-accent-main"
                    : "border-neutral-weak2 focus:border-primary-main"
                }`}
              />
            </div>
            {errors.badge && (
              <p className="text-xs text-accent-main flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.badge.message}</span>
              </p>
            )}
          </div>

          {/* 하이라이트 여부 체크 */}
          <div className="pt-1">
            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-neutral-weak/50 border border-neutral-weak2 cursor-pointer hover:bg-neutral-weak transition-colors">
              <input
                type="checkbox"
                {...register("highlight")}
                className="w-4 h-4 rounded text-primary-main accent-primary-main focus:ring-primary-main cursor-pointer"
              />
              <div className="flex-1 text-xs">
                <span className="font-bold text-neutral-main block">
                  카드 하이라이트 강조
                </span>
                <span className="text-neutral-medium text-[11px]">
                  은은한 블루 배경과 테두리로 링크를 눈에 띄게 강조합니다.
                </span>
              </div>
            </label>
          </div>

          {/* 📱 실시간 카드 미리보기 */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-medium">
                실시간 미리보기
              </span>
              <Badge variant="primary" className="text-[10px] h-4 px-1.5">
                LIVE PREVIEW
              </Badge>
            </div>
            <div className="pointer-events-none opacity-95">
              <LinkCard link={previewLink} />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto shadow-sm"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
