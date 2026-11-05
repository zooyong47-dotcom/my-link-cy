import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MOCK_PROFILE } from "@/data/mockData";
import { CustomLink, MyLinkProfile } from "@/types/mylink";
import { getDisplayName } from "@/lib/utils";
import {
  normalizeUsername,
  usernameFieldSchema,
  updateProfileSchema,
} from "@/lib/validations/profile";

export interface UsernameCheckResult {
  available: boolean;
  isCurrentMine?: boolean;
  message: string;
}

export interface CreateLinkPayload {
  title: string;
  url: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  highlight?: boolean;
}

export interface UpdateLinkPayload {
  title: string;
  url: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  highlight?: boolean;
}

export interface UpdateProfilePayload {
  username: string;
  displayName: string;
  bio: string;
}

export const myLinkKeys = {
  all: ["mylink"] as const,
  profile: (uid: string) => ["mylink", "profile", uid] as const,
  links: (uid: string) => ["mylink", "links", uid] as const,
  usernameCheck: (uid: string | undefined, normalized: string) =>
    ["mylink", "username-check", uid ?? "anon", normalized] as const,
};

export function parseTimestamp(val: any): number {
  if (!val) return 0;
  if (typeof val.toMillis === "function") return val.toMillis();
  if (typeof val.toDate === "function") return val.toDate().getTime();
  if (typeof val.seconds === "number") return val.seconds * 1000;
  if (typeof val === "number") return val;
  if (val instanceof Date) return val.getTime();
  const parsed = new Date(val).getTime();
  return isNaN(parsed) ? 0 : parsed;
}

export function getGuestProfile(): MyLinkProfile {
  return {
    ...MOCK_PROFILE,
    displayName: "MyLink",
    username: "guest",
    bio: "나만의 링크를 한곳에 모아 간편하게 공유하는 멀티링크 허브",
    avatarUrl: "/avatar.svg",
    badge: undefined,
    email: undefined,
  };
}

export function getInitialUserProfile(user: User): MyLinkProfile {
  const fallbackHandle = getDisplayName(user);
  return {
    ...MOCK_PROFILE,
    displayName: fallbackHandle,
    username: fallbackHandle,
    avatarUrl: user.photoURL || "/avatar.svg",
    email: user.email || undefined,
    badge: "VERIFIED",
    bio: `${fallbackHandle}님의 링크 모음입니다.`,
  };
}

function docToCustomLink(
  docSnap: QueryDocumentSnapshot<DocumentData>
): CustomLink {
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

function normalizeUrlProtocol(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (
    !trimmed.startsWith("http://") &&
    !trimmed.startsWith("https://") &&
    !trimmed.startsWith("mailto:")
  ) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

/**
 * 단발 조회: users/{uid} 문서 및 users/{uid}/profile 서브컬렉션에서 프로필 조회
 */
export async function fetchUserProfile(user: User): Promise<MyLinkProfile> {
  const fallbackHandle = getDisplayName(user);

  const [userDocSnap, profileColSnap] = await Promise.all([
    getDoc(doc(db, "users", user.uid)),
    getDocs(collection(db, "users", user.uid, "profile")),
  ]);

  const uDoc = userDocSnap.exists() ? userDocSnap.data() : null;
  const uProfileField =
    uDoc?.profile && typeof uDoc.profile === "object" ? uDoc.profile : null;

  let pSubDoc: DocumentData | null = null;
  if (!profileColSnap.empty) {
    const sortedDocs = [...profileColSnap.docs].sort((a, b) => {
      if (a.id === "info" && b.id !== "info") {
        const tA = parseTimestamp(a.data().updatedAt);
        const tB = parseTimestamp(b.data().updatedAt);
        if (tA === tB) return -1;
      }
      return (
        parseTimestamp(b.data().updatedAt) - parseTimestamp(a.data().updatedAt)
      );
    });
    pSubDoc = sortedDocs[0]?.data() || null;
  }

  const subTime = parseTimestamp(pSubDoc?.updatedAt);
  const fieldTime = parseTimestamp(uProfileField?.updatedAt);
  const primary =
    pSubDoc && uProfileField
      ? subTime >= fieldTime
        ? pSubDoc
        : uProfileField
      : pSubDoc || uProfileField;
  const secondary = primary === pSubDoc ? uProfileField : pSubDoc;

  const resolvedUsername =
    primary?.username ||
    secondary?.username ||
    uDoc?.username ||
    fallbackHandle;

  const resolvedDisplayName =
    primary?.displayName ||
    secondary?.displayName ||
    uDoc?.displayName ||
    fallbackHandle;

  const resolvedBio =
    primary?.bio !== undefined
      ? primary.bio
      : secondary?.bio !== undefined
      ? secondary.bio
      : uDoc?.bio !== undefined
      ? uDoc.bio
      : `${resolvedDisplayName}님의 링크 모음입니다.`;

  return {
    ...MOCK_PROFILE,
    username: String(resolvedUsername),
    displayName: String(resolvedDisplayName),
    bio: String(resolvedBio),
    avatarUrl:
      primary?.avatarUrl || uDoc?.photoURL || user.photoURL || "/avatar.svg",
    email: user.email || uDoc?.email || undefined,
    badge: "VERIFIED",
  };
}

/**
 * 단발 조회: users/{uid}/links 컬렉션에서 링크 목록 조회 (최신순 정렬)
 */
export async function fetchUserLinks(uid: string): Promise<CustomLink[]> {
  const userLinksCol = collection(db, "users", uid, "links");
  const orderedQuery = query(userLinksCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(orderedQuery).catch(() =>
    getDocs(userLinksCol)
  );

  const items = snapshot.docs.map((d) => docToCustomLink(d));
  return items.sort(
    (a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt)
  );
}

/**
 * 단발 조회: Firestore users 컬렉션 기반 username 중복 확인
 */
export async function checkUsernameInFirestore(
  rawUsername: string,
  currentUid?: string,
  currentUsername?: string
): Promise<UsernameCheckResult> {
  const clean = normalizeUsername(rawUsername);
  const parsed = usernameFieldSchema.safeParse(clean);
  if (!parsed.success) {
    return {
      available: false,
      message:
        parsed.error.issues[0]?.message ||
        "올바른 username 형식을 입력해 주세요.",
    };
  }

  const normalized = clean.toLowerCase();
  const usersCol = collection(db, "users");

  const queries = [
    getDocs(query(usersCol, where("profile.usernameLower", "==", normalized))),
    getDocs(query(usersCol, where("usernameLower", "==", normalized))),
    getDocs(query(usersCol, where("displayName", "==", clean))),
  ];
  if (normalized !== clean) {
    queries.push(
      getDocs(query(usersCol, where("displayName", "==", normalized)))
    );
  }

  const [byProfileField, byTopLower, ...legacySnaps] =
    await Promise.all(queries);

  const hasIndexedConflict =
    byProfileField.docs.some((d) => d.id !== currentUid) ||
    byTopLower.docs.some((d) => d.id !== currentUid);

  const hasLegacyConflict = legacySnaps.some((snap) =>
    snap.docs.some((d) => {
      if (d.id === currentUid) return false;
      const data = d.data();
      return !data.profile?.usernameLower && !data.usernameLower;
    })
  );

  if (hasIndexedConflict || hasLegacyConflict) {
    return {
      available: false,
      message: "이미 사용 중인 username입니다. 다른 아이디를 입력해 주세요.",
    };
  }

  const isCurrentMine =
    !!currentUid &&
    !!currentUsername &&
    currentUsername !== "guest" &&
    currentUsername.toLowerCase() === normalized;

  return {
    available: true,
    isCurrentMine,
    message: isCurrentMine
      ? "현재 사용 중인 내 username입니다."
      : "사용 가능한 username입니다!",
  };
}

/**
 * 쓰기: 새 링크 추가 (users/{uid}/links)
 */
export async function createUserLink(
  uid: string,
  newLinkData: CreateLinkPayload
): Promise<CustomLink> {
  const title = newLinkData.title.trim();
  const url = normalizeUrlProtocol(newLinkData.url);

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

  if (newLinkData.subtitle?.trim()) {
    docData.subtitle = newLinkData.subtitle.trim();
  }
  if (newLinkData.badge?.trim()) {
    docData.badge = newLinkData.badge.trim();
  }

  const userLinksColRef = collection(db, "users", uid, "links");
  const newDocRef = doc(userLinksColRef);
  await setDoc(newDocRef, docData);

  return {
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
    updatedAt: Date.now(),
  };
}

/**
 * 쓰기: 링크 수정 (users/{uid}/links/{linkId})
 */
export async function patchUserLink(
  uid: string,
  linkId: string,
  updatedData: UpdateLinkPayload
): Promise<{ title: string; url: string; updatedAt: number }> {
  const title = updatedData.title.trim();
  const url = normalizeUrlProtocol(updatedData.url);

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

  const docRef = doc(db, "users", uid, "links", linkId);
  await updateDoc(docRef, patchData);

  return { title, url, updatedAt: Date.now() };
}

/**
 * 쓰기: 링크 삭제 (users/{uid}/links/{linkId})
 */
export async function removeUserLink(
  uid: string,
  linkId: string
): Promise<void> {
  const docRef = doc(db, "users", uid, "links", linkId);
  await deleteDoc(docRef);
}

/**
 * 쓰기: 링크 클릭수 +1 증가
 */
export async function incrementUserLinkClick(
  uid: string,
  linkId: string
): Promise<void> {
  const docRef = doc(db, "users", uid, "links", linkId);
  await updateDoc(docRef, {
    clicks: increment(1),
  });
}

/**
 * 쓰기: 프로필 수정 (users/{uid}/profile 업데이트 및 중복 재검증)
 */
export async function saveUserProfile(
  uid: string,
  input: UpdateProfilePayload,
  currentUsername?: string
): Promise<{
  username: string;
  displayName: string;
  bio: string;
  updatedAt: string;
}> {
  const cleanUsername = normalizeUsername(input.username);
  const parsed = updateProfileSchema.safeParse({
    username: cleanUsername,
    displayName: input.displayName,
    bio: input.bio,
  });

  if (!parsed.success) {
    throw new Error(
      parsed.error.issues[0]?.message || "입력값을 다시 확인해 주세요."
    );
  }

  const availability = await checkUsernameInFirestore(
    cleanUsername,
    uid,
    currentUsername
  );
  if (!availability.available) {
    throw new Error(availability.message);
  }

  const cleanDisplayName = parsed.data.displayName;
  const cleanBio = parsed.data.bio;
  const usernameLower = cleanUsername.toLowerCase();

  const profilePayload = {
    uid,
    username: cleanUsername,
    usernameLower,
    displayName: cleanDisplayName,
    bio: cleanBio,
    updatedAt: serverTimestamp(),
  };

  const results = await Promise.allSettled([
    setDoc(doc(db, "users", uid, "profile", "info"), profilePayload, {
      merge: true,
    }),
    setDoc(
      doc(db, "users", uid),
      {
        uid,
        username: cleanUsername,
        usernameLower,
        displayName: cleanDisplayName,
        bio: cleanBio,
        profile: profilePayload,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ),
  ]);

  const anySucceeded = results.some((r) => r.status === "fulfilled");
  if (!anySucceeded) {
    const rejected = results.find(
      (r) => r.status === "rejected"
    ) as PromiseRejectedResult | undefined;
    throw rejected?.reason || new Error("프로필 저장에 실패했습니다.");
  }

  return {
    username: cleanUsername,
    displayName: cleanDisplayName,
    bio: cleanBio,
    updatedAt: new Date().toISOString(),
  };
}
