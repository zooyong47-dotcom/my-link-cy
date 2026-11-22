import { ImageResponse } from "next/og";
import { fetchPublicUserByDisplayname } from "@/lib/queries/mylink";
import { getPretendardBoldFont } from "@/lib/ogFont";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface DisplayNameOGProps {
  params: Promise<{ displayname: string }>;
}

export default async function OpenGraphImage({ params }: DisplayNameOGProps) {
  const { displayname } = await params;
  let decoded = displayname;
  try {
    decoded = decodeURIComponent(displayname);
  } catch {
    decoded = displayname;
  }

  const [userData, fontData] = await Promise.all([
    fetchPublicUserByDisplayname(decoded).catch(() => null),
    getPretendardBoldFont(),
  ]);

  const profile = userData?.profile;
  const links = userData?.links || [];
  const enabledLinks = links.filter((l) => l.enabled);

  const displayName = profile?.displayName || decoded;
  const username = profile?.username || decoded;
  const bio =
    profile?.bio || `${displayName}님의 MyLink 프로필 및 추천 링크 모음입니다.`;

  // 대표 링크 상위 2개 추출
  const previewLinks = enabledLinks.slice(0, 2);
  const remainingCount = Math.max(0, enabledLinks.length - previewLinks.length);

  // 아바타 이니셜
  const initialChar = (displayName || username || "M").charAt(0).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(53, 73, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(65, 84, 255, 0.14) 0%, transparent 45%), linear-gradient(135deg, #F7F8FB 0%, #FFFFFF 50%, #EDF2FF 100%)",
          padding: "50px 60px",
          fontFamily: fontData ? "Pretendard" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 상단 액센트 그라디언트 바 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #3549FF, #4154FF, #6181EA)",
          }}
        />

        {/* 메인 카드 컨테이너 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "32px",
            border: "1.5px solid #E9EAEF",
            boxShadow: "0 25px 60px -15px rgba(53, 73, 255, 0.15)",
            padding: "36px 44px",
            justifyContent: "space-between",
          }}
        >
          {/* 1. 상단 브랜드 & 핸들 바 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: "24px",
              borderBottom: "1.5px solid #F2F3F7",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#3549FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(53, 73, 255, 0.25)",
                }}
              >
                <svg
                  width="22"
                  height="22"
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
                  fontSize: "24px",
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
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#3549FF",
                }}
              >
                공식 프로필
              </div>
            </div>

            {/* 유저 핸들 배지 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F7F8FB",
                border: "1.5px solid #E9EAEF",
                borderRadius: "9999px",
                padding: "6px 18px",
                fontSize: "14px",
                fontWeight: 800,
                color: "#1B1C1F",
              }}
            >
              mylink.com/@{username}
            </div>
          </div>

          {/* 2. 중앙 컨텐츠 (좌측 프로필 + 우측 링크 쇼케이스) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: "48px",
              margin: "auto 0",
            }}
          >
            {/* 좌측: 아바타 + 프로필 상세 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                maxWidth: "520px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                {/* 세련된 아바타 */}
                <div
                  style={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(135deg, #3549FF 0%, #4154FF 50%, #6181EA 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: "36px",
                    fontWeight: 900,
                    boxShadow: "0 10px 25px rgba(53, 73, 255, 0.25)",
                    border: "3px solid #FFFFFF",
                  }}
                >
                  {initialChar}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: 900,
                        color: "#1B1C1F",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {displayName}
                    </span>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "9999px",
                        backgroundColor: "#3549FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: 900,
                      }}
                    >
                      ✓
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#6E6F73",
                      marginTop: "2px",
                    }}
                  >
                    @{username}
                  </span>
                </div>
              </div>

              {/* 소개글 */}
              <div
                style={{
                  fontSize: "18px",
                  color: "#3F4145",
                  lineHeight: "1.55",
                  fontWeight: 500,
                  marginBottom: "20px",
                  display: "-webkit-box",
                  overflow: "hidden",
                }}
              >
                {bio}
              </div>

              {/* 뱃지 라인 */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F5F6FF",
                    border: "1px solid #DFE2FF",
                    borderRadius: "12px",
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#3549FF",
                  }}
                >
                  🔗 등록된 링크 {enabledLinks.length}개
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F7F8FB",
                    border: "1px solid #E9EAEF",
                    borderRadius: "12px",
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#6E6F73",
                  }}
                >
                  ✨ 퍼스널 포트폴리오
                </div>
              </div>
            </div>

            {/* 우측: 실제 링크 카드 쇼케이스 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "480px",
                gap: "12px",
              }}
            >
              {previewLinks.length > 0 ? (
                previewLinks.map((link, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: link.highlight ? "#F5F6FF" : "#FFFFFF",
                      border: link.highlight
                        ? "1.5px solid #B2BAFF"
                        : "1.5px solid #E9EAEF",
                      borderRadius: "18px",
                      padding: "16px 20px",
                      boxShadow: link.highlight
                        ? "0 4px 12px rgba(53, 73, 255, 0.08)"
                        : "0 2px 6px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        flex: 1,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          backgroundColor: link.highlight
                            ? "#DFE2FF"
                            : "#F7F8FB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                        }}
                      >
                        {idx === 0 ? "🚀" : "🔗"}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 800,
                              color: "#1B1C1F",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {link.title}
                          </span>
                          {link.highlight && (
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
                              대표
                            </div>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#8B8D92",
                            marginTop: "2px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {link.url}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        color: "#3549FF",
                        fontWeight: 900,
                        marginLeft: "12px",
                      }}
                    >
                      ↗
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F7F8FB",
                    border: "1.5px dashed #DADBDF",
                    borderRadius: "18px",
                    padding: "28px",
                    fontSize: "15px",
                    color: "#8B8D92",
                    fontWeight: 600,
                  }}
                >
                  등록된 링크 카드가 프로필에 표시됩니다
                </div>
              )}

              {/* 추가 링크가 있을 경우 안내 칩 */}
              {remainingCount > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #DFE2FF",
                    borderRadius: "14px",
                    padding: "10px 16px",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#3549FF",
                  }}
                >
                  + 외 {remainingCount}개의 링크가 더 있습니다
                </div>
              )}
            </div>
          </div>

          {/* 3. 하단 푸터 바 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: "20px",
              borderTop: "1.5px solid #F2F3F7",
              fontSize: "13px",
              color: "#8B8D92",
            }}
          >
            <span>프로필을 방문하여 포트폴리오 및 소셜 링크를 확인하세요</span>
            <span style={{ fontWeight: 800, color: "#3549FF" }}>
              MyLink · All-in-One Link Hub
            </span>
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
