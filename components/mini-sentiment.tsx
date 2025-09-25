"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendsAPI } from "@/lib/api"
import type { SentimentData } from "@/lib/types"
import { Smile, Frown, Meh } from "lucide-react"

export function MiniSentiment() {
  const [data, setData] = useState<SentimentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sentiment = await TrendsAPI.getSentimentAnalysis()
        setData(sentiment)
      } catch (error) {
        console.error("Failed to fetch sentiment data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const sentiments = [
    {
      type: "positive",
      value: data.positive,
      icon: Smile,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      type: "neutral",
      value: data.neutral,
      icon: Meh,
      color: "text-gray-500",
      bgColor: "bg-gray-500/20",
    },
    {
      type: "negative",
      value: data.negative,
      icon: Frown,
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Sentiment</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {sentiments.map((sentiment) => (
            <div key={sentiment.type} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`p-1 ${sentiment.bgColor} rounded`}>
                  <sentiment.icon className={`h-3 w-3 ${sentiment.color}`} />
                </div>
                <span className="text-xs capitalize">{sentiment.type}</span>
              </div>
              <span className="text-sm font-medium">{sentiment.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
