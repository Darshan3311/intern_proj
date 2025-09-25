"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendsAPI } from "@/lib/api"
import type { AIInsight } from "@/lib/types"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, FileText, Clock, ChevronRight } from "lucide-react"

const insightIcons = {
  prediction: TrendingUp,
  summary: FileText,
  alert: AlertTriangle,
  recommendation: Lightbulb,
}

const insightColors = {
  prediction: "bg-blue-500/20 text-blue-400",
  summary: "bg-green-500/20 text-green-400",
  alert: "bg-red-500/20 text-red-400",
  recommendation: "bg-purple-500/20 text-purple-400",
}

export function CompactAIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await TrendsAPI.getAIInsights()
        setInsights(data)
      } catch (error) {
        console.error("Failed to fetch AI insights:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs h-4">
            <Clock className="h-2 w-2 mr-1" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {insights.slice(0, 3).map((insight) => {
            const Icon = insightIcons[insight.type]
            const colorClass = insightColors[insight.type]

            return (
              <div
                key={insight.id}
                className="p-2 border border-border rounded-lg hover:bg-muted/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={`p-1 rounded ${colorClass}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs text-foreground line-clamp-1">{insight.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{insight.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-xs h-4 capitalize">
                    {insight.type}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs h-4">
                      {insight.confidence}%
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(insight.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {insights.length === 0 && (
          <div className="text-center py-4">
            <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Analyzing trends...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
