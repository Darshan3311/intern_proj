"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Brain, Smile, Frown, Minus } from "lucide-react"
import { useState } from "react"

const sentimentData = [
  { name: "Positive", value: 65, color: "hsl(var(--chart-4))" },
  { name: "Neutral", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Negative", value: 10, color: "hsl(var(--chart-5))" },
]

const sentimentIcons = {
  Positive: Smile,
  Neutral: Minus,
  Negative: Frown,
}

export function SentimentAnalysis() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.color }} />
            <span className="text-xs font-medium text-foreground">{data.name}</span>
          </div>
          <p className="text-xs text-muted-foreground">{data.value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Brain className="h-4 w-4" />
          <span>Sentiment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-32 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setHoveredSegment(sentimentData[index].name)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={hoveredSegment === entry.name ? "hsl(var(--foreground))" : "none"}
                    strokeWidth={hoveredSegment === entry.name ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-1">
          {sentimentData.map((item) => {
            const Icon = sentimentIcons[item.name as keyof typeof sentimentIcons]
            const isHovered = hoveredSegment === item.name
            return (
              <div
                key={item.name}
                className={`flex items-center justify-between p-1 rounded transition-all cursor-pointer ${
                  isHovered ? "bg-muted/50 scale-105" : "hover:bg-muted/30"
                }`}
                onMouseEnter={() => setHoveredSegment(item.name)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                <Badge variant="outline" className="text-xs h-4">
                  {item.value}%
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
