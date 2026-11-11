"use client";

import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { CustomLink } from "@/types/mylink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart3, PieChart as PieChartIcon, MousePointerClick } from "lucide-react";

const CHART_PALETTE = [
  "#4154FF", // primary-main
  "#4AB0F9", // sky blue
  "#8249D8", // violet
  "#008161", // emerald
  "#FDBA39", // warm gold
  "#6181EA", // cobalt
] as const;

interface StatsChartsProps {
  links: CustomLink[];
  totalClicks: number;
}

interface BarDatum {
  id: string;
  shortTitle: string;
  fullTitle: string;
  clicks: number;
  sharePercent: number;
  enabled: boolean;
  fill: string;
}

interface PieDatum {
  key: string;
  label: string;
  fullTitle: string;
  clicks: number;
  sharePercent: number;
  fill: string;
}

export function getSafeClicks(link: CustomLink): number {
  return typeof link.clicks === "number" &&
    Number.isFinite(link.clicks) &&
    link.clicks >= 0
    ? link.clicks
    : 0;
}

function truncateLabel(text: string, maxLength: number): string {
  const chars = Array.from(text.trim());
  if (chars.length <= maxLength) return chars.join("");
  return `${chars.slice(0, maxLength).join("")}…`;
}

function formatSharePercent(clicks: number, totalClicks: number): number {
  if (totalClicks <= 0 || clicks <= 0) return 0;
  return Math.round((clicks / totalClicks) * 1000) / 10;
}

export function StatsCharts({ links, totalClicks }: StatsChartsProps) {
  const [filterMode, setFilterMode] = useState<"all" | "active">("all");

  const sortedAllLinks = useMemo(
    () =>
      [...links].sort((a, b) => {
        const diff = getSafeClicks(b) - getSafeClicks(a);
        if (diff !== 0) return diff;
        return a.title.localeCompare(b.title, "ko");
      }),
    [links]
  );

  const filteredLinks = useMemo(
    () =>
      filterMode === "active"
        ? sortedAllLinks.filter((link) => link.enabled)
        : sortedAllLinks,
    [sortedAllLinks, filterMode]
  );

  const filteredTotalClicks = useMemo(
    () => filteredLinks.reduce((sum, link) => sum + getSafeClicks(link), 0),
    [filteredLinks]
  );

  const barData = useMemo<BarDatum[]>(() => {
    const denominator = filterMode === "all" ? totalClicks : filteredTotalClicks;
    return filteredLinks.map((link, index) => {
      const clicks = getSafeClicks(link);
      const fill =
        clicks === 0
          ? "#DADBDF"
          : !link.enabled
          ? "#B2BAFF"
          : index === 0
          ? "#4154FF"
          : "#6181EA";
      return {
        id: link.id,
        shortTitle: truncateLabel(link.title, 14),
        fullTitle: link.title,
        clicks,
        sharePercent: formatSharePercent(clicks, denominator),
        enabled: link.enabled,
        fill,
      };
    });
  }, [filteredLinks, filterMode, totalClicks, filteredTotalClicks]);

  const maxBarClicks = useMemo(
    () => barData.reduce((max, item) => Math.max(max, item.clicks), 0),
    [barData]
  );

  const barChartConfig = useMemo<ChartConfig>(
    () => ({
      clicks: {
        label: "클릭수",
        color: "#4154FF",
      },
    }),
    []
  );

  const { pieData, pieChartConfig } = useMemo(() => {
    const clickedLinks = sortedAllLinks.filter((l) => getSafeClicks(l) > 0);
    const items: PieDatum[] = [];
    const config: ChartConfig = {
      clicks: { label: "클릭수" },
    };

    const topSlice = clickedLinks.slice(0, 5);
    topSlice.forEach((link, idx) => {
      const clicks = getSafeClicks(link);
      const key = `slice${idx}`;
      const fill = CHART_PALETTE[idx % CHART_PALETTE.length];
      const label = truncateLabel(link.title, 12);
      items.push({
        key,
        label,
        fullTitle: link.title,
        clicks,
        sharePercent: formatSharePercent(clicks, totalClicks),
        fill,
      });
      config[key] = { label, color: fill };
    });

    if (clickedLinks.length > 5) {
      const rest = clickedLinks.slice(5);
      const restClicks = rest.reduce((sum, l) => sum + getSafeClicks(l), 0);
      const key = "other";
      const label = `기타 (${rest.length}개)`;
      items.push({
        key,
        label,
        fullTitle: `기타 링크 ${rest.length}개`,
        clicks: restClicks,
        sharePercent: formatSharePercent(restClicks, totalClicks),
        fill: "#8B8D92",
      });
      config[key] = { label, color: "#8B8D92" };
    }

    return { pieData: items, pieChartConfig: config };
  }, [sortedAllLinks, totalClicks]);

  const activeCount = useMemo(
    () => links.filter((link) => link.enabled).length,
    [links]
  );

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* 1. 링크별 클릭수 막대 차트 */}
      <Card className="lg:col-span-3 bg-static-white border border-neutral-weak2 rounded-[24px] shadow-nol-1 overflow-hidden">
        <CardHeader className="p-5 sm:p-6 pb-3 flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-lg font-bold text-neutral-main">
                링크별 클릭수
              </CardTitle>
              <CardDescription className="text-xs text-neutral-strong1 mt-0.5">
                각 링크에 누적된 클릭수를 비교해 보세요.
              </CardDescription>
            </div>
          </div>

          <div
            role="group"
            aria-label="링크 필터"
            className="inline-flex items-center rounded-full bg-neutral-weak border border-neutral-weak2 p-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                filterMode === "all"
                  ? "bg-static-white text-primary-main shadow-2xs"
                  : "text-neutral-medium hover:text-neutral-main"
              }`}
            >
              전체 ({links.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("active")}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                filterMode === "active"
                  ? "bg-static-white text-primary-main shadow-2xs"
                  : "text-neutral-medium hover:text-neutral-main"
              }`}
            >
              활성 ({activeCount})
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 pt-2">
          {barData.length === 0 ? (
            <div className="h-[220px] rounded-[16px] border border-dashed border-neutral-weak2 bg-neutral-weak/40 flex flex-col items-center justify-center text-center px-4">
              <p className="text-xs sm:text-sm text-neutral-medium font-medium">
                활성화된 링크가 없습니다.
              </p>
            </div>
          ) : (
            <ChartContainer
              config={barChartConfig}
              className="w-full aspect-auto"
              style={{ height: Math.max(220, barData.length * 46) }}
            >
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 6, right: 48, left: 4, bottom: 6 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, maxBarClicks === 0 ? 5 : "auto"]}
                  tickFormatter={(value: number) =>
                    value.toLocaleString("ko-KR")
                  }
                />
                <YAxis
                  type="category"
                  dataKey="shortTitle"
                  width={114}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#1B1C1F" }}
                />
                <ChartTooltip
                  cursor={{ fill: "#F5F6FF" }}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      labelFormatter={(_value, payload) => {
                        const datum = payload?.[0]?.payload as
                          | BarDatum
                          | undefined;
                        if (!datum) return _value;
                        return (
                          <span className="font-bold text-neutral-main">
                            {datum.fullTitle}
                            {!datum.enabled && (
                              <span className="ml-1.5 text-[10px] font-medium text-neutral-medium">
                                (비활성)
                              </span>
                            )}
                          </span>
                        );
                      }}
                      formatter={(value, _name, item) => {
                        const datum = item?.payload as BarDatum | undefined;
                        const numeric =
                          typeof value === "number"
                            ? value
                            : Number(value || 0);
                        return (
                          <div className="flex flex-1 items-center justify-between gap-4">
                            <span className="flex items-center gap-1.5 text-neutral-strong1">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-[2px]"
                                style={{
                                  backgroundColor: datum?.fill || "#4154FF",
                                }}
                              />
                              <span>클릭수</span>
                            </span>
                            <span className="font-mono font-bold text-neutral-main tabular-nums">
                              {numeric.toLocaleString("ko-KR")}회
                              {datum && datum.sharePercent > 0 ? (
                                <span className="ml-1 font-normal text-neutral-medium">
                                  ({datum.sharePercent}%)
                                </span>
                              ) : null}
                            </span>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Bar
                  dataKey="clicks"
                  fill="var(--color-clicks)"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={28}
                >
                  {barData.map((entry) => (
                    <Cell key={entry.id} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="clicks"
                    position="right"
                    offset={8}
                    className="fill-neutral-strong1 font-mono text-[11px] font-semibold"
                    formatter={(value) =>
                      `${Number(value ?? 0).toLocaleString("ko-KR")}회`
                    }
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 2. 클릭 점유율 도넛 차트 */}
      <Card className="lg:col-span-2 bg-static-white border border-neutral-weak2 rounded-[24px] shadow-nol-1 overflow-hidden flex flex-col">
        <CardHeader className="p-5 sm:p-6 pb-3 flex flex-row items-start justify-between gap-2 space-y-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-[12px] bg-primary-weak text-primary-main flex items-center justify-center shrink-0">
              <PieChartIcon className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-lg font-bold text-neutral-main">
                클릭 비중
              </CardTitle>
              <CardDescription className="text-xs text-neutral-strong1 mt-0.5">
                상위 링크 점유율 분포
              </CardDescription>
            </div>
          </div>
          <Badge variant="primary" className="text-[10px] shrink-0">
            TOP 5
          </Badge>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 pt-2 flex-1 flex flex-col justify-center">
          {pieData.length === 0 ? (
            <div className="min-h-[240px] rounded-[16px] border border-dashed border-neutral-weak2 bg-neutral-weak/40 flex flex-col items-center justify-center text-center px-4 gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary-weak text-primary-main flex items-center justify-center">
                <MousePointerClick className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-main">
                아직 발생한 클릭이 없습니다
              </p>
              <p className="text-[11px] text-neutral-medium leading-relaxed">
                내 프로필 링크를 공유하면 링크별 클릭 비중 차트가 표시됩니다.
              </p>
            </div>
          ) : (
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto w-full aspect-auto h-[290px] sm:h-[310px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      nameKey="key"
                      formatter={(value, _name, item) => {
                        const datum = item?.payload as PieDatum | undefined;
                        const numeric =
                          typeof value === "number"
                            ? value
                            : Number(value || 0);
                        return (
                          <div className="flex flex-1 items-center justify-between gap-4">
                            <span className="flex items-center gap-1.5 text-neutral-main font-medium max-w-[140px] truncate">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-[2px] shrink-0"
                                style={{
                                  backgroundColor: datum?.fill || "#4154FF",
                                }}
                              />
                              <span className="truncate">
                                {datum?.fullTitle || datum?.label}
                              </span>
                            </span>
                            <span className="font-mono font-bold text-neutral-main tabular-nums shrink-0">
                              {numeric.toLocaleString("ko-KR")}회
                              {datum ? (
                                <span className="ml-1 font-normal text-neutral-medium">
                                  ({datum.sharePercent}%)
                                </span>
                              ) : null}
                            </span>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={pieData}
                  dataKey="clicks"
                  nameKey="key"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.key} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (
                        viewBox &&
                        "cx" in viewBox &&
                        "cy" in viewBox &&
                        typeof viewBox.cx === "number" &&
                        typeof viewBox.cy === "number"
                      ) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy - 4}
                              className="fill-neutral-main text-xl font-extrabold tabular-nums"
                            >
                              {totalClicks.toLocaleString("ko-KR")}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy + 16}
                              className="fill-neutral-medium text-[11px] font-medium"
                            >
                              총 클릭
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={
                    <ChartLegendContent
                      nameKey="key"
                      className="text-[11px] text-neutral-strong1"
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
