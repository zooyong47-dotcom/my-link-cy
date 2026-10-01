"use client";

import { useState, useEffect, useCallback } from "react";
import { MyLinkProfile, CustomLink } from "@/types/mylink";
import { MOCK_PROFILE, MOCK_CUSTOM_LINKS } from "@/data/mockData";

const PROFILE_STORAGE_KEY = "mylink_profile";
const LINKS_STORAGE_KEY = "mylink_links";

export function useMyLinkData() {
  const [profile, setProfile] = useState<MyLinkProfile>(MOCK_PROFILE);
  const [links, setLinks] = useState<CustomLink[]>(MOCK_CUSTOM_LINKS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 LocalStorage 로드 & 자동 시딩 (Auto-seeding)
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      const savedLinks = localStorage.getItem(LINKS_STORAGE_KEY);

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // 자동 시딩
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(MOCK_PROFILE));
      }

      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      } else {
        // 자동 시딩
        localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(MOCK_CUSTOM_LINKS));
      }
    } catch (e) {
      console.warn("LocalStorage access failed or unavailable:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 📈 링크 클릭수 증가 핸들러
  const trackLinkClick = useCallback((linkId: string) => {
    setLinks((prevLinks) => {
      const updated = prevLinks.map((link) => {
        if (link.id === linkId) {
          return {
            ...link,
            clicks: (link.clicks || 0) + 1,
          };
        }
        return link;
      });

      try {
        localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to update clicks in LocalStorage:", e);
      }

      return updated;
    });
  }, []);

  // 📋 클립보드 복사 유틸리티
  const copyToClipboard = useCallback(
    async (text: string, label: string = "링크") => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }
        showToast(`${label}가 복사되었습니다! 🎉`, "success");
      } catch (err) {
        console.error("Copy failed:", err);
        showToast("복사에 실패했습니다.", "error");
      }
    },
    [showToast]
  );

  return {
    profile,
    links,
    isLoaded,
    toastMessage,
    toastType,
    showToast,
    trackLinkClick,
    copyToClipboard,
  };
}
