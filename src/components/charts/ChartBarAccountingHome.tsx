;

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Updated data with some values below thresholds
const data2024 = [
  { month: "يناير", value: 8000 },
  { month: "فبراير", value: 85000 },
  { month: "مارس", value: 62000 },
  { month: "أبريل", value: 15000 },
  { month: "مايو", value: 101000 },
  { month: "يونيو", value: 53000 },
  { month: "يوليو", value: 45000 },
  { month: "أغسطس", value: 47000 },
  { month: "سبتمبر", value: 46000 },
  { month: "أكتوبر", value: 45000 },
  { month: "نوفمبر", value: 45000 },
  { month: "ديسمبر", value: 48000 },
];

const data2025 = [
  { month: "يناير", value: 5000 },
  { month: "فبراير", value: 88000 },
  { month: "مارس", value: 65000 },
  { month: "أبريل", value: 15000 },
  { month: "مايو", value: 1000 },
  { month: "يونيو", value: 55000 },
  { month: "يوليو", value: 47000 },
  { month: "أغسطس", value: 48000 },
  { month: "سبتمبر", value: 49000 },
  { month: "أكتوبر", value: 47000 },
  { month: "نوفمبر", value: 46000 },
  { month: "ديسمبر", value: 50000 },
];

const getLevelColor = (value: number) => {
  if (value < 10000) {
    return "#E87171"; // Red for low
  } else if (value < 20000) {
    return "#DFC875"; // Yellow for medium
  } else {
    return "#5EB18E"; // Green for high
  }
};

export default function ChartBarAccountingHome() {
  const [year, setYear] = React.useState(2025);
  const data = year === 2025 ? data2025 : data2024;

  return (
    <Card className="w-full border" dir="rtl">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between">
        <CardTitle className="text-2xl">احصائيات التدفق المالي</CardTitle>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#5EB18E]" />
            <span className="text-sm">عالي</span>
            <span className="h-3 w-3 rounded-full bg-[#DFC875]" />
            <span className="text-sm">متوسط</span>
            <span className="h-3 w-3 rounded-full bg-[#E87171]" />
            <span className="text-sm">منخفض</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-24">
                {year}
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setYear(2024)}>
                2024
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setYear(2025)}>
                2025
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart data={data}>
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={10}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={getLevelColor(payload.value)}
                      rx="4"
                      ry="4"
                    />
                  );
                }}
              />
                <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    width={5}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}K`}
                />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
