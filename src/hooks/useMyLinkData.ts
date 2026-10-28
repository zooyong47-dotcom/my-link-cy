"use client";

import { useState, useEffect, useCallback } from "react";
import { MyLinkProfile, CustomLink } from "@/types/mylink";
import { MOCK_PROFILE } from "@/data/mockData";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment,
} from "firebase/firestore";

const PROFILE_STORAGE_KEY = "mylink_profile";

// Firestore 저장 및 조회 경로: users/anonymous/links
const FIRESTORE_COLLECTION_PATH = ["users", "anonymous", "links"] as const;

function parseTimestamp(val: any): number {
  if (!val) return 0;
  if (typeof val.toMillis === "function") return val.toMillis();
  if (typeof val.toDate === "function") return val.toDate().getTime();
  if (typeof val.seconds === "number") return val.seconds * 1000;
  if (typeof val === "number") return val;
  if (val instanceof Date) return val.getTime();
  const parsed = new Date(val).getTime();
  return isNaN(parsed) ? 0 : parsed;
}

export function useMyLinkData() {
  const [profile, setProfile] = useState<MyLinkProfile>(MOCK_PROFILE);
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  // 🔄 LocalStorage 프로필 로드 & Firestore 실시간 링크 목록 구독 (최신순 정렬)
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

    // 2. Firestore 'users/anonymous/links' 에서 createdAt 기준 최신순 실시간 구독
    setIsSyncing(true);
    const linksColRef = collection(db, ...FIRESTORE_COLLECTION_PATH);
    const linksQuery = query(linksColRef, orderBy("createdAt", "desc"));

    let fallbackUnsubscribe: (() => void) | null = null;

    const unsubscribe = onSnapshot(
      linksQuery,
      (snapshot) => {
        setIsSyncing(true);
        const fetchedLinks: CustomLink[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title || "제목 없음",
            url: data.url || "",
            subtitle: data.subtitle || undefined,
            description: data.description || undefined,
            badge: data.badge || undefined,
            category: data.category || undefined,
            enabled: data.enabled !== undefined ? data.enabled : true,
            highlight: !!data.highlight,
            clicks: data.clicks || 0,
            icon: data.icon || "globe",
            bgColor: data.bgColor || undefined,
            badgeColor: data.badgeColor || undefined,
            createdAt: data.createdAt || data.createdAT || undefined,
          };
        });

        // 클라이언트 측 최신순 정렬 보장 (createdAt / createdAT 기준)
        fetchedLinks.sort((a, b) => {
          const tA = parseTimestamp(a.createdAt);
          const tB = parseTimestamp(b.createdAt);
          return tB - tA;
        });

        setLinks(fetchedLinks);
        setIsLoaded(true);
        // 부드러운 UI 전환을 위한 딜레이 후 갱신 상태 해제
        setTimeout(() => setIsSyncing(false), 300);
      },
      (error) => {
        console.warn("Firestore ordered query failed, falling back to unordered listener:", error);
        fallbackUnsubscribe = onSnapshot(
          linksColRef,
          (fallbackSnapshot) => {
            setIsSyncing(true);
            const fetchedLinks: CustomLink[] = fallbackSnapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                title: data.title || "제목 없음",
                url: data.url || "",
                subtitle: data.subtitle || undefined,
                description: data.description || undefined,
                badge: data.badge || undefined,
                category: data.category || undefined,
                enabled: data.enabled !== undefined ? data.enabled : true,
                highlight: !!data.highlight,
                clicks: data.clicks || 0,
                icon: data.icon || "globe",
                bgColor: data.bgColor || undefined,
                badgeColor: data.badgeColor || undefined,
                createdAt: data.createdAt || data.createdAT || undefined,
              };
            });

            fetchedLinks.sort((a, b) => {
              const tA = parseTimestamp(a.createdAt);
              const tB = parseTimestamp(b.createdAt);
              return tB - tA;
            });

            setLinks(fetchedLinks);
            setIsLoaded(true);
            setTimeout(() => setIsSyncing(false), 300);
          },
          (fallbackError) => {
            console.error("Firestore fallback onSnapshot error:", fallbackError);
            setIsLoaded(true);
            setIsSyncing(false);
          }
        );
      }
    );

    return () => {
      unsubscribe();
      if (fallbackUnsubscribe) {
        fallbackUnsubscribe();
      }
    };
  }, []);

  // ➕ 새 링크 추가 핸들러 (Firestore 'users/anonymous/links' 에 추가 및 실시간 갱신)
  const addLink = useCallback(
    async (newLinkData: {
      title: string;
      url: string;
      subtitle?: string;
      badge?: string;
      icon?: string;
      highlight?: boolean;
    }) => {
      setIsSyncing(true);
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
          createdAT: serverTimestamp(),
        };

        if (newLinkData.subtitle && newLinkData.subtitle.trim()) {
          docData.subtitle = newLinkData.subtitle.trim();
        }
        if (newLinkData.badge && newLinkData.badge.trim()) {
          docData.badge = newLinkData.badge.trim();
        }

        // Firestore 'users/anonymous/links' 컬렉션에 새 문서 추가
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

        showToast("새 링크가 성공적으로 추가되었습니다! 🔥", "success");
        return createdLink;
      } catch (error: any) {
        console.error("Firestore addLink error:", error);
        showToast("링크 저장에 실패했습니다. 다시 시도해 주세요.", "error");
        setIsSyncing(false);
        throw error;
      }
    },
    [showToast]
  );

  // 🗑️ 링크 삭제 핸들러 (삭제 진행 중 피드백 제공)
  const deleteLink = useCallback(
    async (linkId: string) => {
      setDeletingId(linkId);
      setIsSyncing(true);

      try {
        const docRef = doc(db, ...FIRESTORE_COLLECTION_PATH, linkId);
        await deleteDoc(docRef);
        // 상태에서도 즉시 제거
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
        showToast("링크가 삭제되었습니다. 🗑️", "success");
      } catch (e) {
        console.error("Firestore deleteDoc error:", e);
        showToast("링크 삭제에 실패했습니다.", "error");
      } finally {
        setDeletingId(null);
        setTimeout(() => setIsSyncing(false), 200);
      }
    },
    [showToast]
  );

  // 🔄 수동 새로고침 / 동기화 핸들러
  const refreshLinks = useCallback(async () => {
    setIsSyncing(true);
    try {
      const linksColRef = collection(db, ...FIRESTORE_COLLECTION_PATH);
      const linksQuery = query(linksColRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(linksQuery);

      const fetchedLinks: CustomLink[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || "제목 없음",
          url: data.url || "",
          subtitle: data.subtitle || undefined,
          description: data.description || undefined,
          badge: data.badge || undefined,
          category: data.category || undefined,
          enabled: data.enabled !== undefined ? data.enabled : true,
          highlight: !!data.highlight,
          clicks: data.clicks || 0,
          icon: data.icon || "globe",
          bgColor: data.bgColor || undefined,
          badgeColor: data.badgeColor || undefined,
          createdAt: data.createdAt || data.createdAT || undefined,
        };
      });

      fetchedLinks.sort((a, b) => {
        const tA = parseTimestamp(a.createdAt);
        const tB = parseTimestamp(b.createdAt);
        return tB - tA;
      });

      setLinks(fetchedLinks);
      showToast("링크 목록을 최신 상태로 동기화했습니다. ⚡", "success");
    } catch (e) {
      console.error("refreshLinks error:", e);
      showToast("링크 목록 갱신에 실패했습니다.", "error");
    } finally {
      setTimeout(() => setIsSyncing(false), 300);
    }
  }, [showToast]);

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
      const docRef = doc(db, ...FIRESTORE_COLLECTION_PATH, linkId);
      updateDoc(docRef, {
        clicks: increment(1),
      }).catch((e) => {
        console.warn("Firestore increment note:", e);
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
    isSyncing,
    deletingId,
    toastMessage,
    toastType,
    showToast,
    addLink,
    deleteLink,
    refreshLinks,
    trackLinkClick,
    copyToClipboard,
  };
}