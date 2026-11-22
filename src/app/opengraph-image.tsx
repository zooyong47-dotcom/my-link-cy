import { ImageResponse } from "next/og";
import { getPretendardBoldFont } from "@/lib/ogFont";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "MyLink - 나를 표현하는 단 하나의 프로필 링크";

export default async function OpenGraphImage() {
  const fontData = await getPretendardBoldFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(65, 84, 255, 0.12) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(53, 73, 255, 0.14) 0%, transparent 50%), linear-gradient(180deg, #FFFFFF 0%, #F7F8FB 100%)",
          padding: "60px 70px",
          fontFamily: fontData ? "Pretendard" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 상단 장식 빛 라인 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #3549FF, #4154FF, #6181EA)",
          }}
        />

        {/* 2열 컨텐츠 래퍼 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          {/* 좌측: 타이틀, 슬로건, 브랜드 배지 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* 브랜드 로고 뱃지 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  backgroundColor: "#3549FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px rgba(53, 73, 255, 0.25)",
                }}
              >
                {/* 체인 링크 SVG */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>

              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  color: "#1B1C1F",
                  letterSpacing: "-0.5px",
                }}
              >
                MyLink
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F5F6FF",
                  border: "1px solid #B2BAFF",
                  borderRadius: "9999px",
                  padding: "5px 14px",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#3549FF",
                  marginLeft: "4px",
                }}
              >
                ✨ ALL-IN-ONE LINK
              </div>
            </div>

            {/* 메인 타이틀 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "52px",
                fontWeight: 900,
                color: "#1B1C1F",
                lineHeight: "1.2",
                letterSpacing: "-1.5px",
                marginBottom: "20px",
              }}
            >
              <span>흩어진 나를 모으는</span>
              <span
                style={{
                  color: "#3549FF",
                  backgroundImage: "linear-gradient(90deg, #3549FF, #6181EA)",
                  backgroundClip: "text",
                }}
              >
                단 하나의 감각적인 프로필
              </span>
            </div>

            {/* 서브 설명 */}
            <div
              style={{
                fontSize: "20px",
                color: "#6E6F73",
                lineHeight: "1.5",
                fontWeight: 500,
                marginBottom: "36px",
                maxWidth: "540px",
              }}
            >
              포트폴리오, 깃허브, 인스타그램, 블로그를 1분 만에 모으고 실시간 방문 클릭 수를 한눈에 분석하세요.
            </div>

            {/* 하단 특징 태그들 */}
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              {[
                "⚡ 1분 만에 무료 생성",
                "📊 실시간 클릭 분석",
                "📱 모바일 최적화",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #E9EAEF",
                    borderRadius: "14px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1B1C1F",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 떠있는 프로필 카드 목업 */}
          <div
            style={{
              display: "flex",
              width: "420px",
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #DFE2FF",
              borderRadius: "32px",
              padding: "24px",
              flexDirection: "column",
              boxShadow: "0 25px 50px -12px rgba(53, 73, 255, 0.18)",
              position: "relative",
            }}
          >
            {/* 카드 상단 배너 */}
            <div
              style={{
                height: "90px",
                width: "100%",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #2432AD, #4154FF, #6181EA)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                padding: "10px 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  borderRadius: "9999px",
                  padding: "4px 10px",
                  fontSize: "11px",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                mylink.com/@creator
              </div>
            </div>

            {/* 프로필 정보 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginTop: "-36px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    backgroundColor: "#FFFFFF",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    background: "linear-gradient(135deg, #DFE2FF, #F5F6FF)",
                  }}
                >
                  🚀
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F5F6FF",
                    border: "1px solid #B2BAFF",
                    borderRadius: "9999px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#3549FF",
                  }}
                >
                  LIVE PREVIEW
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "20px", fontWeight: 900, color: "#1B1C1F" }}>
                  이서연
                </span>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    backgroundColor: "#3549FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </div>
              </div>
              <span style={{ fontSize: "13px", color: "#8B8D92", marginTop: "2px" }}>
                @seoyeon · Tech Creator & Engineer
              </span>
            </div>

            {/* 목업 링크 카드들 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "16px",
              }}
            >
              {/* 링크 1 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#F5F6FF",
                  border: "1.5px solid #B2BAFF",
                  borderRadius: "16px",
                  padding: "12px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>🔥</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#1B1C1F" }}>
                      포트폴리오 메이킹 영상
                    </span>
                    <span style={{ fontSize: "10px", color: "#8B8D92" }}>
                      youtube.com/@seoyeon
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#FEF5F5",
                    color: "#E5000F",
                    fontSize: "10px",
                    fontWeight: 800,
                    borderRadius: "9999px",
                    padding: "2px 8px",
                  }}
                >
                  HOT
                </div>
              </div>

              {/* 링크 2 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #E9EAEF",
                  borderRadius: "16px",
                  padding: "12px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>💻</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#1B1C1F" }}>
                      오픈소스 깃허브 저장소
                    </span>
                    <span style={{ fontSize: "10px", color: "#8B8D92" }}>
                      github.com/seoyeon
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "#8B8D92" }}>↗</span>
              </div>
            </div>

            {/* 카드 하단 실시간 지표 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #F2F3F7",
                fontSize: "11px",
                color: "#6E6F73",
              }}
            >
              <span>실시간 누적 클릭수</span>
              <span style={{ fontWeight: 800, color: "#3549FF" }}>4,892회 🚀</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Pretendard",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
