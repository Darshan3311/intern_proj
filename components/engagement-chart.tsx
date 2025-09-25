"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"
import { useState } from "react"

// Mock time series data for engagement trends
const generateTimeSeriesData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      instagram: Math.floor(Math.random() * 2000000) + 1000000,
      twitter: Math.floor(Math.random() * 1500000) + 800000,
      youtube: Math.floor(Math.random() * 3000000) + 1500000,
      google: Math.floor(Math.random() * 1000000) + 500000,
      total: 0,
    })
  }

  // Calculate totals
  data.forEach((item) => {
    item.total = item.instagram + item.twitter + item.youtube + item.google
  })

  return data
}

const timeRanges = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
]

export function EngagementChart() {
  const [selectedRange, setSelectedRange] = useState(7)
  const data = generateTimeSeriesData(selectedRange)

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">{formatValue(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Engagement Trends</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex space-x-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.days}
                  variant={selectedRange === range.days ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRange(range.days)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={formatValue} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="instagram"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="twitter"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="youtube"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="google"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-4))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            <span className="text-sm text-muted-foreground">Instagram</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            <span className="text-sm text-muted-foreground">Twitter/X</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-3"></div>
            <span className="text-sm text-muted-foreground">YouTube</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-chart-4"></div>
            <span className="text-sm text-muted-foreground">Google Trends</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
