import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "통계 및 분석 - 링크 클릭 인사이트",
  description:
    "내 프로필 링크의 실시간 클릭 수와 방문 통계, 인기 링크 트렌드를 한눈에 분석하세요.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "통계 및 분석 | 링크 클릭 인사이트 - MyLink",
    description:
      "내 프로필 링크의 실시간 클릭 수와 방문 통계, 인기 링크 트렌드를 한눈에 분석하세요.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "통계 및 분석 | 링크 클릭 인사이트 - MyLink",
    description:
      "내 프로필 링크의 실시간 클릭 수와 방문 통계, 인기 링크 트렌드를 한눈에 분석하세요.",
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
