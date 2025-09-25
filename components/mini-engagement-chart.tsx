"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { Activity } from "lucide-react"

const data = [
  { time: "00:00", engagement: 2400 },
  { time: "04:00", engagement: 1800 },
  { time: "08:00", engagement: 4200 },
  { time: "12:00", engagement: 6800 },
  { time: "16:00", engagement: 8900 },
  { time: "20:00", engagement: 7200 },
  { time: "24:00", engagement: 3400 },
]

export function MiniEngagementChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="text-xs font-medium">{label}</p>
          <p className="text-xs text-primary">{payload[0].value.toLocaleString()} interactions</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Activity className="h-4 w-4" />
          <span>24h Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Peak: 8.9K</span>
          <span>Avg: 5.2K</span>
        </div>
      </CardContent>
    </Card>
  )
}
