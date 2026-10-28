"use client";

import { useState, useEffect, useCallback } from "react";
import { MyLinkProfile, CustomLink } from "@/types/mylink";
import { MOCK_PROFILE, MOCK_CUSTOM_LINKS } from "@/data/mockData";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

const PROFILE_STORAGE_KEY = "mylink_profile";
const LINKS_STORAGE_KEY = "mylink_links";

// Firestore 저장 경로: user/anonymous/links
const FIRESTORE_COLLECTION_PATH = ["user", "anonymous", "links"] as const;

export function useMyLinkData() {
  const [profile, setProfile] = useState<MyLinkProfile>(MOCK_PROFILE);
  // 테스트 모드: 화면에는 기본 목(Mock) 링크 목록 유지
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

  // 🔄 LocalStorage 프로필 로드 (테스트 모드 화면 유지)
  useEffect(() => {
    // 1. 프로필 로드 (LocalStorage 캐시 활용)
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(MOCK_PROFILE));
      }
    } catch (e) {
      console.warn("Profile storage access failed:", e);
    }

    // 2. 테스트 모드: 화면에는 항상 기본 테스트 링크 데이터(MOCK_CUSTOM_LINKS)를 표시
    setLinks(MOCK_CUSTOM_LINKS);
    setIsLoaded(true);
  }, []);

  // ➕ 새 링크 추가 핸들러 (Firestore 'user/anonymous/links' 에만 저장하고 화면에는 띄우지 않음)
  const addLink = useCallback(
    async (newLinkData: {
      title: string;
      url: string;
      subtitle?: string;
      badge?: string;
      icon?: string;
      highlight?: boolean;
    }) => {
      try {
        const title = newLinkData.title.trim();
        const url = newLinkData.url.trim();

        // Firestore 저장 데이터 구성
        const docData: Record<string, any> = {
          title,
          url,
          icon: newLinkData.icon || "globe",
          highlight: !!newLinkData.highlight,
          enabled: true,
          clicks: 0,
          createdAt: serverTimestamp(),
        };

        if (newLinkData.subtitle && newLinkData.subtitle.trim()) {
          docData.subtitle = newLinkData.subtitle.trim();
        }
        if (newLinkData.badge && newLinkData.badge.trim()) {
          docData.badge = newLinkData.badge.trim();
        }

        // 1. Firestore 'user/anonymous/links' 컬렉션에 새 문서 추가 (파이어베이스 DB에 정상 저장됨)
        const linksColRef = collection(db, ...FIRESTORE_COLLECTION_PATH);
        const docRef = await addDoc(linksColRef, docData);

        const createdLink: CustomLink = {
          id: docRef.id,
          title,
          url,
          subtitle: newLinkData.subtitle?.trim() || undefined,
          badge: newLinkData.badge?.trim() || undefined,
          icon: newLinkData.icon || "globe",
          highlight: !!newLinkData.highlight,
          enabled: true,
          clicks: 0,
          createdAt: Date.now(),
        };

        // 2. 테스트 모드 요구사항: 파이어베이스에는 저장되지만 화면 UI(links state)에는 추가하지 않음
        showToast("새 링크가 파이어베이스에 성공적으로 추가되었습니다! 🔥", "success");
        return createdLink;
      } catch (error: any) {
        console.error("Firestore addLink error:", error);
        showToast("파이어베이스 저장에 실패했습니다. 다시 시도해 주세요.", "error");
        throw error;
      }
    },
    [showToast]
  );

  // 🗑️ 링크 삭제 핸들러 (테스트 화면 상태 반영)
  const deleteLink = useCallback(
    async (linkId: string) => {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));

      try {
        const docRef = doc(db, FIRESTORE_COLLECTION_PATH[0], FIRESTORE_COLLECTION_PATH[1], FIRESTORE_COLLECTION_PATH[2], linkId);
        await deleteDoc(docRef);
      } catch (e) {
        console.warn("Firestore deleteDoc note (could be local mock):", e);
      }

      showToast("링크가 삭제되었습니다. 🗑️", "success");
    },
    [showToast]
  );

  // 📈 링크 클릭수 증가 핸들러
  const trackLinkClick = useCallback((linkId: string) => {
    setLinks((prevLinks) => {
      return prevLinks.map((link) => {
        if (link.id === linkId) {
          return {
            ...link,
            clicks: (link.clicks || 0) + 1,
          };
        }
        return link;
      });
    });

    try {
      const docRef = doc(db, FIRESTORE_COLLECTION_PATH[0], FIRESTORE_COLLECTION_PATH[1], FIRESTORE_COLLECTION_PATH[2], linkId);
      updateDoc(docRef, {
        clicks: increment(1),
      }).catch((e) => {
        console.warn("Firestore increment note (could be local mock):", e);
      });
    } catch (e) {
      console.warn("Firestore click increment error:", e);
    }
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
    addLink,
    deleteLink,
    trackLinkClick,
    copyToClipboard,
  };
}
