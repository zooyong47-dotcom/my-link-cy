"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { getDisplayName } from "@/lib/utils";

// 사용자에게 보여줄 Firebase Auth 에러 메시지 매핑
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/unauthorized-domain":
    "현재 도메인이 Firebase 승인 도메인에 등록되어 있지 않습니다. (Firebase 콘솔 > Authentication > 설정 > 승인된 도메인)",
  "auth/operation-not-allowed":
    "Firebase 콘솔에서 Google 로그인 제공업체가 활성화되어 있지 않습니다.",
  "auth/network-request-failed": "네트워크 오류로 로그인에 실패했습니다. 연결을 확인해 주세요.",
  "auth/too-many-requests": "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Firestore users/{currentUser.uid} 경로에 유저 기본 정보 동기화 및 저장
          await setDoc(
            doc(db, "users", currentUser.uid),
            {
              uid: currentUser.uid,
              displayName: getDisplayName(currentUser),
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              lastLoginAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (e) {
          console.warn("User profile sync error:", e);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const signedUser = result.user;

      // Firestore users/{signedUser.uid} 경로에 유저 기본 정보 기록
      await setDoc(
        doc(db, "users", signedUser.uid),
        {
          uid: signedUser.uid,
          displayName: getDisplayName(signedUser),
          email: signedUser.email || "",
          photoURL: signedUser.photoURL || "",
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );

      return signedUser;
    } catch (err: any) {
      const code: string = err?.code || "";

      // 사용자가 팝업을 직접 닫았거나, 중복 클릭으로 이전 팝업 요청이 취소된 경우 → 정상 취소이므로 에러로 취급하지 않음
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        return null;
      }

      // 브라우저가 팝업을 차단한 경우 → 리다이렉트 방식으로 대체 로그인
      if (code === "auth/popup-blocked") {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await signInWithRedirect(auth, provider);
        return null;
      }

      console.warn("Google sign in failed:", code, err?.message);
      setAuthError(AUTH_ERROR_MESSAGES[code] || "구글 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return null;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      console.error("Sign out error:", err);
    }
  }, []);

  return {
    user,
    loading,
    isSigningIn,
    authError,
    signInWithGoogle,
    logout,
  };
}
