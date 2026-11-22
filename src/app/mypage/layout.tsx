import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 - 내 링크 & 프로필 관리",
  description:
    "MyLink 마이페이지에서 내 프로필 정보를 수정하고 소셜 링크와 맞춤 링크 카드를 손쉽게 관리하세요.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "마이페이지 | 내 링크 & 프로필 관리 - MyLink",
    description:
      "MyLink 마이페이지에서 내 프로필 정보를 수정하고 소셜 링크와 맞춤 링크 카드를 손쉽게 관리하세요.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "마이페이지 | 내 링크 & 프로필 관리 - MyLink",
    description:
      "MyLink 마이페이지에서 내 프로필 정보를 수정하고 소셜 링크와 맞춤 링크 카드를 손쉽게 관리하세요.",
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
