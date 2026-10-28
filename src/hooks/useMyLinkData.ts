"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MyLinkProfile, CustomLink } from "@/types/mylink";
import { MOCK_PROFILE } from "@/data/mockData";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

const PROFILE_STORAGE_KEY = "mylink_profile";

// Firestore 기본 경로: users/anonymous/links
const PRIMARY_PATH = ["users", "anonymous", "links"] as const;
// Firestore 호환 경로: user/anonymous/links (콘솔에서 단수/복수 혼용 접근 시 완벽 동기화 보장)
const FALLBACK_PATH = ["user", "anonymous", "links"] as const;

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

function docToCustomLink(docSnap: QueryDocumentSnapshot<DocumentData>): CustomLink {
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
}

export function useMyLinkData() {
  const [profile, setProfile] = useState<MyLinkProfile>(MOCK_PROFILE);
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // 내부적으로 현재 관리 중인 링크 목록 ID Set 추적
  const linksMapRef = useRef<Map<string, CustomLink>>(new Map());

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 최신 링크 목록을 상태로 반영하고 최신순 정렬하는 헬퍼
  const commitLinks = useCallback((newMap: Map<string, CustomLink>) => {
    linksMapRef.current = newMap;
    const sorted = Array.from(newMap.values()).sort((a, b) => {
      const tA = parseTimestamp(a.createdAt);
      const tB = parseTimestamp(b.createdAt);
      return tB - tA;
    });
    setLinks(sorted);
    setIsLoaded(true);
  }, []);

  // 🔄 수동 새로고침 / 최신 데이터 강제 동기화 핸들러
  const refreshLinks = useCallback(async (silent: boolean = false) => {
    if (!silent) setIsSyncing(true);
    try {
      // 1. primary 경로(users/anonymous/links) 조회
      const primaryCol = collection(db, ...PRIMARY_PATH);
      const primaryQuery = query(primaryCol, orderBy("createdAt", "desc"));
      let snapshot = await getDocs(primaryQuery).catch(() => getDocs(primaryCol));

      const newMap = new Map<string, CustomLink>();
      snapshot.docs.forEach((d) => {
        newMap.set(d.id, docToCustomLink(d));
      });

      // 2. 만약 users에 아무것도 없으면 혹시 모를 user 경로 확인
      if (newMap.size === 0) {
        const fallbackCol = collection(db, ...FALLBACK_PATH);
        const fallbackSnap = await getDocs(fallbackCol).catch(() => null);
        if (fallbackSnap && !fallbackSnap.empty) {
          fallbackSnap.docs.forEach((d) => {
            newMap.set(d.id, docToCustomLink(d));
          });
        }
      }

      commitLinks(newMap);
      if (!silent) {
        showToast("최신 링크 목록으로 동기화되었습니다. ⚡", "success");
      }
    } catch (e) {
      console.error("refreshLinks error:", e);
      if (!silent) {
        showToast("동기화 중 오류가 발생했습니다.", "error");
      }
    } finally {
      if (!silent) {
        setTimeout(() => setIsSyncing(false), 300);
      }
    }
  }, [commitLinks, showToast]);

  // 🔄 Firestore 실시간 리스너 연결 (users & user 양방향 감지 및 외부 삭제 즉시 반영)
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

    setIsSyncing(true);

    // 2. 主 컬렉션 리스너: users/anonymous/links
    const primaryCol = collection(db, ...PRIMARY_PATH);
    const primaryQuery = query(primaryCol, orderBy("createdAt", "desc"));

    const unsubPrimary = onSnapshot(
      primaryQuery,
      (snapshot) => {
        setIsSyncing(true);
        const nextMap = new Map<string, CustomLink>();

        snapshot.docs.forEach((docSnap) => {
          nextMap.set(docSnap.id, docToCustomLink(docSnap));
        });

        // Firebase 데이터베이스에서 삭제된 문서 감지 시
        snapshot.docChanges().forEach((change) => {
          if (change.type === "removed") {
            const removedId = change.doc.id;
            nextMap.delete(removedId);
            // fallback 경로(user/anonymous/links)에도 잔여 문서가 있다면 동기화 정리
            deleteDoc(doc(db, ...FALLBACK_PATH, removedId)).catch(() => {});
          }
        });

        commitLinks(nextMap);
        setTimeout(() => setIsSyncing(false), 300);
      },
      (error) => {
        console.warn("Primary ordered listener failed, using plain listener:", error);
        onSnapshot(primaryCol, (snap) => {
          const nextMap = new Map<string, CustomLink>();
          snap.docs.forEach((d) => nextMap.set(d.id, docToCustomLink(d)));
          commitLinks(nextMap);
          setIsSyncing(false);
        });
      }
    );

    // 3. 補助 컬렉션 리스너: user/anonymous/links (사용자가 콘솔에서 단수형 경로에서 삭제한 경우도 즉시 감지)
    const fallbackCol = collection(db, ...FALLBACK_PATH);
    const unsubFallback = onSnapshot(
      fallbackCol,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "removed") {
            const removedId = change.doc.id;
            // 로컬 화면에서 즉시 삭제
            setLinks((prev) => prev.filter((item) => item.id !== removedId));
            linksMapRef.current.delete(removedId);
            // primary 컬렉션(users/anonymous/links)에서도 함께 삭제하여 일치 유지
            deleteDoc(doc(db, ...PRIMARY_PATH, removedId)).catch(() => {});
          }
        });
      },
      (error) => {
        console.warn("Fallback path listener note:", error);
      }
    );

    return () => {
      unsubPrimary();
      unsubFallback();
    };
  }, [commitLinks]);

  // 👁️ 브라우저 탭 복귀 시(Firebase 콘솔에서 삭제 후 로컬 탭으로 전환 시) 즉시 동기화
  useEffect(() => {
    const handleFocusOrVisibility = () => {
      if (document.visibilityState === "visible") {
        refreshLinks(true);
      }
    };

    window.addEventListener("focus", handleFocusOrVisibility);
    document.addEventListener("visibilitychange", handleFocusOrVisibility);

    return () => {
      window.removeEventListener("focus", handleFocusOrVisibility);
      document.removeEventListener("visibilitychange", handleFocusOrVisibility);
    };
  }, [refreshLinks]);

  // ➕ 새 링크 추가 핸들러 (users & user 양방향 저장 및 화면 즉시 반영)
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

        // 1. primary 경로(users/anonymous/links)에 문서 생성
        const primaryColRef = collection(db, ...PRIMARY_PATH);
        const newDocRef = doc(primaryColRef);
        await setDoc(newDocRef, docData);

        // 2. 콘솔 어디서 보더라도 보이도록 fallback 경로(user/anonymous/links)에도 동일 ID로 미러링
        setDoc(doc(db, ...FALLBACK_PATH, newDocRef.id), docData).catch(() => {});

        const createdLink: CustomLink = {
          id: newDocRef.id,
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

        // 낙관적 즉시 업데이트
        const updatedMap = new Map(linksMapRef.current);
        updatedMap.set(newDocRef.id, createdLink);
        commitLinks(updatedMap);

        showToast("새 링크가 성공적으로 추가되었습니다! 🔥", "success");
        return createdLink;
      } catch (error: any) {
        console.error("Firestore addLink error:", error);
        showToast("링크 저장에 실패했습니다. 다시 시도해 주세요.", "error");
        setIsSyncing(false);
        throw error;
      }
    },
    [commitLinks, showToast]
  );

  // 🗑️ 링크 삭제 핸들러 (화면 + users & user 양방향 삭제)
  const deleteLink = useCallback(
    async (linkId: string) => {
      setDeletingId(linkId);
      setIsSyncing(true);

      // 낙관적 UI 업데이트: 로컬 상태에서 즉각 제거
      const nextMap = new Map(linksMapRef.current);
      nextMap.delete(linkId);
      commitLinks(nextMap);

      try {
        await Promise.allSettled([
          deleteDoc(doc(db, ...PRIMARY_PATH, linkId)),
          deleteDoc(doc(db, ...FALLBACK_PATH, linkId)),
        ]);
        showToast("링크가 삭제되었습니다. 🗑️", "success");
      } catch (e) {
        console.error("Firestore deleteDoc error:", e);
        showToast("링크 삭제에 실패했습니다.", "error");
      } finally {
        setDeletingId(null);
        setTimeout(() => setIsSyncing(false), 200);
      }
    },
    [commitLinks, showToast]
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
      updateDoc(doc(db, ...PRIMARY_PATH, linkId), {
        clicks: increment(1),
      }).catch(() => {});
      updateDoc(doc(db, ...FALLBACK_PATH, linkId), {
        clicks: increment(1),
      }).catch(() => {});
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