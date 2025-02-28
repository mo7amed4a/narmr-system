"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { date: "2024-04", "2024": 222, "2025": 150 },
  { date: "2024-05", "2024": 165, "2025": 220 },
  { date: "2024-06", "2024": 446, "2025": 400 },
]

const chartConfig = {
  views: {
    label: "السنوات",
  },
  "2024": {
    label: "2024",
    color: "hsl(var(--chart-1))",
  },
  "2025": {
    label: "2025",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartOne() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("2024")
  return (
    <Card className="w-full border">
      <CardHeader className="flex flex-col items-stretch space-y-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <CardTitle className="font-bold">أحصائيات الحجوزات المكتملة </CardTitle>
        </div>
        <Select onValueChange={(value) => setActiveChart(value as keyof typeof chartConfig)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={chartConfig[activeChart].label} />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(chartConfig).filter((key) => key !== "views").map((key) => (
              <SelectItem key={key} value={key}>
                {chartConfig[key as keyof typeof chartConfig].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("ar-EG", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey=""
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ar-EG", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
