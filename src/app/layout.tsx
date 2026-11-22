import type { Metadata, Viewport } from "next";
import { QueryProvider } from "@/components/QueryProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const viewport: Viewport = {
  themeColor: "#3549FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    template: "%s | MyLink",
  },
  description:
    "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요. 개발자, 크리에이터를 위한 최고의 올인원 바이오 링크 서비스.",
  applicationName: "MyLink",
  authors: [{ name: "MyLink Team", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "MyLink",
    "마이링크",
    "프로필 링크",
    "링크인바이오",
    "link in bio",
    "바이오링크",
    "포트폴리오 링크",
    "인스타그램 프로필 링크",
    "링크트리 대안",
    "개발자 프로필",
    "크리에이터 링크",
    "소셜 링크 모음",
    "멀티링크",
  ],
  creator: "MyLink",
  publisher: "MyLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "MyLink",
    title: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    description:
      "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요. 개발자, 크리에이터를 위한 올인원 프로필 링크.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "MyLink - 나를 표현하는 단 하나의 프로필 링크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink | 나를 표현하는 단 하나의 프로필 링크",
    description:
      "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
    images: [`${siteUrl}/opengraph-image`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/avatar.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "MyLink",
      "description":
        "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
      "inLanguage": "ko-KR",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "MyLink",
      "url": siteUrl,
      "logo": `${siteUrl}/avatar.svg`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
