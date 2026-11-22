/**
 * Open Graph 이미지 생성용 Pretendard Bold 한글 폰트 로더
 */
let fontCache: ArrayBuffer | null = null;

export async function getPretendardBoldFont(): Promise<ArrayBuffer | null> {
  if (fontCache) return fontCache;
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Bold.woff",
      { next: { revalidate: 86400 * 30 } }
    );
    if (!res.ok) return null;
    fontCache = await res.arrayBuffer();
    return fontCache;
  } catch {
    return null;
  }
}
