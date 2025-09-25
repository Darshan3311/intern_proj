"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendsAPI } from "@/lib/api"
import type { TrendData } from "@/lib/types"
import { CompactTrendCard } from "./compact-trend-card"
import { TrendingUp, BarChart3, Zap } from "lucide-react"

export function TrendingContent() {
  const [trends, setTrends] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"engagement" | "growth">("engagement")

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await TrendsAPI.getTopTrends(sortBy, 4)
        setTrends(data)
      } catch (error) {
        console.error("Failed to fetch trending content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
  }, [sortBy])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Trending Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-base">
            <TrendingUp className="h-4 w-4" />
            <span>Trending Now</span>
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant={sortBy === "engagement" ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setSortBy("engagement")}
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Engagement
            </Button>
            <Button
              variant={sortBy === "growth" ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setSortBy("growth")}
            >
              <Zap className="h-3 w-3 mr-1" />
              Growth
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trends.map((trend, index) => (
            <CompactTrendCard key={trend.id} trend={trend} rank={index + 1} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
