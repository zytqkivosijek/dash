"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const chartData = [
  { week: "Week 1", users: 1200, sessions: 2400 },
  { week: "Week 2", users: 1350, sessions: 2650 },
  { week: "Week 3", users: 1180, sessions: 2300 },
  { week: "Week 4", users: 1420, sessions: 2800 },
  { week: "Week 5", users: 1580, sessions: 3100 },
  { week: "Week 6", users: 1650, sessions: 3250 },
  { week: "Week 7", users: 1480, sessions: 2900 },
  { week: "Week 8", users: 1720, sessions: 3400 },
  { week: "Week 9", users: 1890, sessions: 3700 },
  { week: "Week 10", users: 1950, sessions: 3850 },
  { week: "Week 11", users: 1820, sessions: 3600 },
  { week: "Week 12", users: 2100, sessions: 4200 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-3)",
  },
  sessions: {
    label: "Sessions",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [timeRange, setTimeRange] = React.useState("12w")

  const filteredData = React.useMemo(() => {
    if (timeRange === "6w") {
      return chartData.slice(-6)
    } else if (timeRange === "4w") {
      return chartData.slice(-4)
    }
    return chartData
  }, [timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
        <CardDescription>
          Weekly users and sessions tracking
        </CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 12 weeks" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12w" className="rounded-lg">
                Last 12 weeks
              </SelectItem>
              <SelectItem value="6w" className="rounded-lg">
                Last 6 weeks
              </SelectItem>
              <SelectItem value="4w" className="rounded-lg">
                Last 4 weeks
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace("Week ", "W")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="users"
              type="monotone"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sessions"
              type="monotone"
              stroke="var(--color-sessions)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}