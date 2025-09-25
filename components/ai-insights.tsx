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
  prediction: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  summary: "bg-green-500/10 text-green-500 border-green-500/20",
  alert: "bg-red-500/10 text-red-500 border-red-500/20",
  recommendation: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

const confidenceColors = {
  high: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-red-500/10 text-red-500",
}

function getConfidenceLevel(confidence: number): "high" | "medium" | "low" {
  if (confidence >= 80) return "high"
  if (confidence >= 60) return "medium"
  return "low"
}

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("all")

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

  const filteredInsights =
    selectedType === "all" ? insights : insights.filter((insight) => insight.type === selectedType)

  const insightTypes = [
    { id: "all", label: "All Insights", count: insights.length },
    { id: "prediction", label: "Predictions", count: insights.filter((i) => i.type === "prediction").length },
    { id: "alert", label: "Alerts", count: insights.filter((i) => i.type === "alert").length },
    { id: "summary", label: "Summaries", count: insights.filter((i) => i.type === "summary").length },
    {
      id: "recommendation",
      label: "Recommendations",
      count: insights.filter((i) => i.type === "recommendation").length,
    },
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Insights</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Real-time analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {insightTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className="flex items-center space-x-2"
              >
                <span>{type.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Insights list */}
          <div className="space-y-4">
            {filteredInsights.map((insight) => {
              const Icon = insightIcons[insight.type]
              const colorClass = insightColors[insight.type]
              const confidenceLevel = getConfidenceLevel(insight.confidence)
              const confidenceColor = confidenceColors[confidenceLevel]

              return (
                <div
                  key={insight.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-balance">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground text-pretty mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-xs capitalize">
                        {insight.type}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Badge variant="outline" className={`text-xs ${confidenceColor}`}>
                          {insight.confidence}%
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(insight.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {insight.relatedTrends.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Related trends:</span>
                        <div className="flex space-x-1">
                          {insight.relatedTrends.slice(0, 3).map((trendId) => (
                            <Badge key={trendId} variant="secondary" className="text-xs">
                              #{trendId}
                            </Badge>
                          ))}
                          {insight.relatedTrends.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{insight.relatedTrends.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {filteredInsights.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No insights available</h3>
              <p className="text-sm text-muted-foreground">
                {selectedType === "all" ? "AI is analyzing trends..." : `No ${selectedType} insights found.`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
