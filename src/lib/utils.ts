import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 사용자 표시 이름: 이메일 앞부분(@ 앞)을 사용합니다.
 * 예) chanyong.dev@gmail.com → "chanyong.dev"
 * 이메일이 없는 경우 uid 앞 8자리로 대체합니다.
 */
export function getDisplayName(user: { email?: string | null; uid: string }): string {
  const prefix = user.email?.split("@")[0]?.trim();
  return prefix || user.uid.slice(0, 8);
}

/**
 * 안전한 외부 이동용 URL(http/https/mailto)을 반환합니다.
 */
export function getSafeHref(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "#";
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return "#";
  }
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:")
  ) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * 프로덕션 도메인 및 사이트 기본 URL 반환
 * Vercel 환경에서 배포 프리뷰 도메인(SSO 로그인 보호) 대신 공식 프로덕션 도메인을 사용하여
 * OpenGraph 크롤러(카카오, 페이스북, 네이버, 트위터 등)가 인증 리다이렉트 없이 정상 접근할 수 있도록 보장합니다.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    let url = process.env.NEXT_PUBLIC_APP_URL.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    return url.replace(/\/+$/, "");
  }

  // Vercel 프로덕션 도메인 (예: my-link-cy.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`;
  }

  // 프로덕션 빌드/실행 환경 기본값
  if (process.env.NODE_ENV === "production") {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
    }
    return "https://my-link-cy.vercel.app";
  }

  // 로컬 개발 환경
  return "http://localhost:3000";
}
