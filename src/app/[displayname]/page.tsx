import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicUserByDisplayname } from "@/lib/queries/mylink";
import { PublicProfileView } from "@/components/PublicProfileView";
import { getSiteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const getPublicUser = cache(async (displayname: string) => {
  return fetchPublicUserByDisplayname(displayname);
});

interface DisplayNamePageProps {
  params: Promise<{ displayname: string }>;
}

export async function generateMetadata({
  params,
}: DisplayNamePageProps): Promise<Metadata> {
  const { displayname } = await params;
  const userData = await getPublicUser(displayname);

  if (!userData) {
    return {
      title: "프로필을 찾을 수 없습니다",
      description: "요청하신 사용자의 프로필 페이지를 찾을 수 없습니다.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { profile } = userData;
  const titleString = `${profile.displayName} (@${profile.username})`;
  const description = profile.bio
    ? profile.bio.replace(/\r?\n+/g, " ").trim()
    : `${profile.displayName}님의 MyLink 프로필 및 추천 링크 모음입니다.`;

  const siteUrl = getSiteUrl();
  const profileUrl = `${siteUrl}/${encodeURIComponent(profile.username || displayname)}`;
  const ogImageUrl = `${siteUrl}/${encodeURIComponent(profile.username || displayname)}/opengraph-image`;

  return {
    title: titleString,
    description,
    keywords: [
      profile.displayName,
      `@${profile.username}`,
      profile.username,
      "프로필",
      "프로필 링크",
      "바이오링크",
      "포트폴리오",
      "MyLink",
      "마이링크",
    ],
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      type: "profile",
      username: profile.username,
      title: `${titleString} | MyLink`,
      description,
      url: profileUrl,
      siteName: "MyLink",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${profile.displayName}님의 MyLink 프로필 카드`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleString} | MyLink`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function DisplayNameProfilePage({
  params,
}: DisplayNamePageProps) {
  const { displayname } = await params;
  const userData = await getPublicUser(displayname);

  if (!userData) {
    notFound();
  }

  const siteUrl = getSiteUrl();

  const canonicalUrl = `${siteUrl}/${encodeURIComponent(userData.profile.username || displayname)}`;
  const socialUrls = (userData.profile.socials || [])
    .filter((s) => s.enabled && s.url)
    .map((s) => s.url);

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: userData.profile.displayName,
      alternateName: userData.profile.username,
      description: userData.profile.bio,
      image: userData.profile.avatarUrl
        ? userData.profile.avatarUrl.startsWith("http")
          ? userData.profile.avatarUrl
          : `${siteUrl}${userData.profile.avatarUrl.startsWith("/") ? "" : "/"}${userData.profile.avatarUrl}`
        : undefined,
      url: canonicalUrl,
      ...(socialUrls.length > 0 ? { sameAs: socialUrls } : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <PublicProfileView
        targetUid={userData.uid}
        initialProfile={userData.profile}
        initialLinks={userData.links}
        serverFetchedAt={userData.fetchedAt}
      />
    </>
  );
}
