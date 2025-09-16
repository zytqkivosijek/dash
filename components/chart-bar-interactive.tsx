"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 3800, expenses: 2100 },
  { month: "Mar", revenue: 5200, expenses: 2800 },
  { month: "Apr", revenue: 4600, expenses: 2300 },
  { month: "May", revenue: 5800, expenses: 3200 },
  { month: "Jun", revenue: 6200, expenses: 3400 },
  { month: "Jul", revenue: 5900, expenses: 3100 },
  { month: "Aug", revenue: 6800, expenses: 3600 },
  { month: "Sep", revenue: 6400, expenses: 3300 },
  { month: "Oct", revenue: 7200, expenses: 3800 },
  { month: "Nov", revenue: 6900, expenses: 3500 },
  { month: "Dec", revenue: 7800, expenses: 4100 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarInteractive() {
  const [timeRange, setTimeRange] = React.useState("12m")

  const filteredData = React.useMemo(() => {
    if (timeRange === "6m") {
      return chartData.slice(-6)
    } else if (timeRange === "3m") {
      return chartData.slice(-3)
    }
    return chartData
  }, [timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
        <CardDescription>
          Monthly comparison of revenue and expenses
        </CardDescription>
        <CardAction>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
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
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}