import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicUserByDisplayname } from "@/lib/queries/mylink";
import { PublicProfileView } from "@/components/PublicProfileView";

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
      title: "프로필을 찾을 수 없습니다 | MyLink",
      description: "요청하신 사용자의 프로필 페이지를 찾을 수 없습니다.",
    };
  }

  const { profile } = userData;
  const title = `${profile.displayName} (@${profile.username}) | MyLink`;
  const description =
    profile.bio || `${profile.displayName}님의 MyLink 프로필 및 링크 모음입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return (
    <PublicProfileView
      targetUid={userData.uid}
      initialProfile={userData.profile}
      initialLinks={userData.links}
      serverFetchedAt={userData.fetchedAt}
    />
  );
}
