"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-15", heartRate: 72, bloodPressure: 120 },
  { date: "2024-07-16", heartRate: 75, bloodPressure: 122 },
  { date: "2024-07-17", heartRate: 70, bloodPressure: 118 },
  { date: "2024-07-18", heartRate: 78, bloodPressure: 125 },
  { date: "2024-07-19", heartRate: 80, bloodPressure: 128 },
  { date: "2024-07-20", heartRate: 74, bloodPressure: 121 },
  { date: "2024-07-21", heartRate: 76, bloodPressure: 123 },
]

const chartConfig = {
  heartRate: {
    label: "Heart Rate (bpm)",
    color: "hsl(var(--chart-1))",
  },
  bloodPressure: {
    label: "Systolic BP (mmHg)",
    color: "hsl(var(--chart-2))",
  },
}

export function VitalsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs - Last 7 Days</CardTitle>
        <CardDescription>
            Showing trends for Heart Rate and Blood Pressure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="heartRate"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              yAxisId="left"
              name="Heart Rate"
            />
            <Line
              dataKey="bloodPressure"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              yAxisId="right"
              name="Blood Pressure"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up for last 3 days <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Data is synced from your connected devices.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
