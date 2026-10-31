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
