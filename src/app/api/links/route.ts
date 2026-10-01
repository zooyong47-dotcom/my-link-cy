import { NextRequest, NextResponse } from "next/server";
import { MOCK_CUSTOM_LINKS } from "@/data/mockData";
import { CustomLink } from "@/types/mylink";

// 서버 메모리 상의 임시 링크 저장소 (모크 백엔드)
let linksDb: CustomLink[] = [...MOCK_CUSTOM_LINKS];

/**
 * GET /api/links
 * 링크 목록 조회 API (필터링 & 검색 & 정렬 지원)
 *
 * Query Params:
 * - enabled: "true" | "false" (활성화 여부 필터)
 * - query: string (제목 및 설명 검색어)
 * - sort: "clicks" | "title" | "id" (정렬 기준)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const enabledParam = searchParams.get("enabled");
  const query = searchParams.get("query")?.toLowerCase();
  const sort = searchParams.get("sort");

  let filtered = [...linksDb];

  if (enabledParam !== null) {
    const isEnabled = enabledParam === "true";
    filtered = filtered.filter((item) => item.enabled === isEnabled);
  }

  if (query) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query))
    );
  }

  if (sort === "clicks") {
    filtered.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  } else if (sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  const totalClicks = linksDb.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return NextResponse.json({
    success: true,
    data: filtered,
    meta: {
      total: filtered.length,
      allCount: linksDb.length,
      activeCount: linksDb.filter((l) => l.enabled).length,
      totalClicks,
    },
  });
}

/**
 * POST /api/links
 * 신규 링크 추가 API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.url) {
      return NextResponse.json(
        { success: false, message: "title과 url 필드는 필수입니다." },
        { status: 400 }
      );
    }

    const newLink: CustomLink = {
      id: `link-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || "",
      url: body.url,
      enabled: body.enabled ?? true,
      highlight: body.highlight ?? false,
      clicks: 0,
      icon: body.icon || "link",
    };

    linksDb.unshift(newLink);

    return NextResponse.json(
      {
        success: true,
        message: "링크가 성공적으로 생성되었습니다.",
        data: newLink,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "요청 본문(JSON) 파싱에 실패했습니다." },
      { status: 400 }
    );
  }
}

/**
 * PATCH /api/links
 * 링크 업데이트 및 클릭 수 카운트 증가 API
 *
 * Body Params:
 * - id: string (필수)
 * - action?: "click" (클릭 수 1 증가)
 * - title?: string, subtitle?: string, url?: string, enabled?: boolean, highlight?: boolean
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id 필드가 필요합니다." },
        { status: 400 }
      );
    }

    const linkIndex = linksDb.findIndex((item) => item.id === id);
    if (linkIndex === -1) {
      return NextResponse.json(
        { success: false, message: "해당 ID의 링크를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (action === "click") {
      linksDb[linkIndex].clicks = (linksDb[linkIndex].clicks || 0) + 1;
    } else {
      linksDb[linkIndex] = {
        ...linksDb[linkIndex],
        ...updates,
      };
    }

    return NextResponse.json({
      success: true,
      message: "링크가 수정되었습니다.",
      data: linksDb[linkIndex],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "요청 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/links?id={linkId}
 * 링크 삭제 API
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "삭제할 링크의 id 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  const initialLength = linksDb.length;
  linksDb = linksDb.filter((item) => item.id !== id);

  if (linksDb.length === initialLength) {
    return NextResponse.json(
      { success: false, message: "해당 ID의 링크를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `ID '${id}' 링크가 성공적으로 삭제되었습니다.`,
  });
}
