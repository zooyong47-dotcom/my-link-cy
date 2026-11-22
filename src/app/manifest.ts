import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyLink - 나를 표현하는 단 하나의 프로필 링크",
    short_name: "MyLink",
    description:
      "포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 하나의 감각적인 프로필 카드로 모아보세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#3549FF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/avatar.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
