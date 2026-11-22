import type { Metadata } from "next";
import { QueryProvider } from "@/components/QueryProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    template: "%s | MyLink",
  },
  description:
    "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "MyLink",
    title: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    description:
      "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    description:
      "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
