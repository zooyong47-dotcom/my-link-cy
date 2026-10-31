"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MyLinkProfile, CustomLink } from "@/types/mylink";
import { MOCK_PROFILE } from "@/data/mockData";
import { db } from "@/lib/firebase";
import { getDisplayName } from "@/lib/utils";
import { User } from "firebase/auth";
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
    updateAt: data.updateAt || data.updatedAt || undefined,
    updatedAt: data.updatedAt || data.updateAt || undefined,
  };
}

export function useMyLinkData(user: User | null) {
  const [profile, setProfile] = useState<MyLinkProfile>(() => {
    return {
      ...MOCK_PROFILE,
      displayName: "MyLink 허브",
      username: "mylink",
      bio: "Google 로그인 후 나만의 멀티링크를 간편하게 관리하고 실시간으로 동기화하세요 🚀",
      email: undefined,
    };
  });

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
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 최신 링크 목록을 상태로 반영하고 최신순 정렬하는 헬퍼
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

  // 🔄 유저 상태 변경 시 프로필 및 Firestore 동기화 경로 설정
  useEffect(() => {
    if (!user) {
      // 로그아웃 상태: 링크 비우고 기본 게스트 프로필로 전환
      linksMapRef.current.clear();
      setLinks([]);
      setIsLoaded(true);
      setIsSyncing(false);
      setProfile({
        ...MOCK_PROFILE,
        displayName: "MyLink",
        username: "guest",
        bio: "Google 소셜 로그인 후 Firestore(users/{user.uid}/links) 개인 경로에 나만의 링크를 생성하고 실시간으로 관리하세요 🚀",
        avatarUrl: "/avatar.svg",
        badge: "GOOGLE LOGIN",
        email: undefined,
      });
      return;
    }

    // 로그인 상태: 유저 정보로 개인화
    const userDisplayName = getDisplayName(user);
    const userHandle = userDisplayName;
    setProfile((prev) => ({
      ...prev,
      displayName: userDisplayName,
      username: userHandle,
      avatarUrl: user.photoURL || "/avatar.svg",
      email: user.email || undefined,
      badge: "GOOGLE VERIFIED",
      bio: `${userDisplayName}님의 실시간 맞춤 링크 허브입니다 ⚡`,
    }));

    setIsSyncing(true);
    setIsLoaded(false);

    // 🎯 Firestore 개인화 경로: users/{user.uid}/links
    const userLinksCol = collection(db, "users", user.uid, "links");
    const userQuery = query(userLinksCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      userQuery,
      (snapshot) => {
        const nextMap = new Map<string, CustomLink>();
        snapshot.docs.forEach((docSnap) => {
          nextMap.set(docSnap.id, docToCustomLink(docSnap));
        });
        commitLinks(nextMap);
        setIsSyncing(false);
      },
      (error) => {
        console.warn("User links ordered listener fallback to plain listener:", error);
        // 복합 인덱스 미생성 시 일반 getDocs/리스너 대체
        const fallbackUnsub = onSnapshot(userLinksCol, (snap) => {
          const nextMap = new Map<string, CustomLink>();
          snap.docs.forEach((d) => nextMap.set(d.id, docToCustomLink(d)));
          commitLinks(nextMap);
          setIsSyncing(false);
        });
        return fallbackUnsub;
      }
    );

    return () => {
      unsub();
    };
  }, [user, commitLinks]);

  // 🔄 수동 새로고침 / 최신 데이터 강제 동기화
  const refreshLinks = useCallback(
    async (silent: boolean = false) => {
      if (!user) {
        showToast("로그인 후 링크를 새로고침할 수 있습니다.", "error");
        return;
      }

      if (!silent) setIsSyncing(true);
      try {
        const userLinksCol = collection(db, "users", user.uid, "links");
        const userQuery = query(userLinksCol, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(userQuery).catch(() => getDocs(userLinksCol));

        const newMap = new Map<string, CustomLink>();
        snapshot.docs.forEach((d) => {
          newMap.set(d.id, docToCustomLink(d));
        });

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
    },
    [user, commitLinks, showToast]
  );

  // ➕ 새 링크 추가 핸들러: users/{user.uid}/links에 저장
  const addLink = useCallback(
    async (newLinkData: {
      title: string;
      url: string;
      subtitle?: string;
      badge?: string;
      icon?: string;
      highlight?: boolean;
    }) => {
      if (!user) {
        showToast("링크를 추가하려면 먼저 Google 계정으로 로그인해 주세요.", "error");
        throw new Error("로그인이 필요합니다.");
      }

      setIsSyncing(true);
      try {
        const title = newLinkData.title.trim();
        let url = newLinkData.url.trim();
        if (
          !url.startsWith("http://") &&
          !url.startsWith("https://") &&
          !url.startsWith("mailto:")
        ) {
          url = `https://${url}`;
        }

        const docData: Record<string, any> = {
          title,
          url,
          icon: newLinkData.icon || "globe",
          highlight: !!newLinkData.highlight,
          enabled: true,
          clicks: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        if (newLinkData.subtitle && newLinkData.subtitle.trim()) {
          docData.subtitle = newLinkData.subtitle.trim();
        }
        if (newLinkData.badge && newLinkData.badge.trim()) {
          docData.badge = newLinkData.badge.trim();
        }

        // Firestore 개인화 경로: users/{user.uid}/links
        const userLinksColRef = collection(db, "users", user.uid, "links");
        const newDocRef = doc(userLinksColRef);
        await setDoc(newDocRef, docData);

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
    [user, commitLinks, showToast]
  );

  // ✏️ 링크 수정 핸들러: users/{user.uid}/links/{linkId} 수정
  const updateLink = useCallback(
    async (
      linkId: string,
      updatedData: {
        title: string;
        url: string;
        subtitle?: string;
        badge?: string;
        icon?: string;
        highlight?: boolean;
      }
    ) => {
      if (!user) {
        showToast("수정 권한이 없습니다. 로그인해 주세요.", "error");
        return;
      }

      setIsSyncing(true);
      try {
        const title = updatedData.title.trim();
        let url = updatedData.url.trim();
        if (
          !url.startsWith("http://") &&
          !url.startsWith("https://") &&
          !url.startsWith("mailto:")
        ) {
          url = `https://${url}`;
        }

        const patchData: Record<string, any> = {
          title,
          url,
          updatedAt: serverTimestamp(),
        };

        if (updatedData.subtitle !== undefined) {
          patchData.subtitle = updatedData.subtitle.trim() || "";
        }
        if (updatedData.badge !== undefined) {
          patchData.badge = updatedData.badge.trim() || "";
        }
        if (updatedData.icon !== undefined) {
          patchData.icon = updatedData.icon;
        }
        if (updatedData.highlight !== undefined) {
          patchData.highlight = !!updatedData.highlight;
        }

        // 낙관적 로컬 상태 즉각 반영
        const now = Date.now();
        const nextMap = new Map(linksMapRef.current);
        const existing = nextMap.get(linkId);
        if (existing) {
          const updatedItem: CustomLink = {
            ...existing,
            title,
            url,
            updatedAt: now,
            ...(updatedData.subtitle !== undefined && {
              subtitle: updatedData.subtitle.trim() || undefined,
            }),
            ...(updatedData.badge !== undefined && {
              badge: updatedData.badge.trim() || undefined,
            }),
            ...(updatedData.icon !== undefined && { icon: updatedData.icon }),
            ...(updatedData.highlight !== undefined && {
              highlight: !!updatedData.highlight,
            }),
          };
          nextMap.set(linkId, updatedItem);
          commitLinks(nextMap);
        }

        const docRef = doc(db, "users", user.uid, "links", linkId);
        await updateDoc(docRef, patchData);

        showToast("링크가 성공적으로 갱신되었습니다! ✏️", "success");
      } catch (error: any) {
        console.error("Firestore updateLink error:", error);
        showToast("링크 수정에 실패했습니다. 다시 시도해 주세요.", "error");
        throw error;
      } finally {
        setTimeout(() => setIsSyncing(false), 200);
      }
    },
    [user, commitLinks, showToast]
  );

  // 🗑️ 링크 삭제 핸들러: users/{user.uid}/links/{linkId} 삭제
  const deleteLink = useCallback(
    async (linkId: string) => {
      if (!user) {
        showToast("삭제 권한이 없습니다. 로그인해 주세요.", "error");
        return;
      }

      setDeletingId(linkId);
      setIsSyncing(true);

      // 낙관적 UI 업데이트
      const nextMap = new Map(linksMapRef.current);
      nextMap.delete(linkId);
      commitLinks(nextMap);

      try {
        const docRef = doc(db, "users", user.uid, "links", linkId);
        await deleteDoc(docRef);
        showToast("링크가 삭제되었습니다. 🗑️", "success");
      } catch (e) {
        console.error("Firestore deleteDoc error:", e);
        showToast("링크 삭제에 실패했습니다.", "error");
      } finally {
        setDeletingId(null);
        setTimeout(() => setIsSyncing(false), 200);
      }
    },
    [user, commitLinks, showToast]
  );

  // 📈 링크 클릭수 증가 핸들러
  const trackLinkClick = useCallback(
    (linkId: string) => {
      if (!user) return;

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
        const docRef = doc(db, "users", user.uid, "links", linkId);
        updateDoc(docRef, {
          clicks: increment(1),
        }).catch(() => {});
      } catch (e) {
        console.warn("Firestore click increment error:", e);
      }
    },
    [user]
  );

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
    updateLink,
    deleteLink,
    refreshLinks,
    trackLinkClick,
    copyToClipboard,
  };
}
