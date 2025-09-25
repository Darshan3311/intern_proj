"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendsAPI } from "@/lib/api"
import type { PlatformMetrics } from "@/lib/types"
import { Instagram, Twitter, Youtube, Search, TrendingUp, Activity } from "lucide-react"
import { formatEngagement, formatGrowth } from "@/lib/mock-data"

const platformIcons = {
  Instagram: Instagram,
  "Twitter/X": Twitter,
  YouTube: Youtube,
  "Google Trends": Search,
}

const platformColors = {
  Instagram: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Twitter/X": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  YouTube: "bg-red-500/20 text-red-400 border-red-500/30",
  "Google Trends": "bg-green-500/20 text-green-400 border-green-500/30",
}

export function PlatformData() {
  const [metrics, setMetrics] = useState<PlatformMetrics[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await TrendsAPI.getPlatformMetrics()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to fetch platform metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Platform Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-muted rounded-lg"></div>
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
        <CardTitle className="flex items-center space-x-2 text-base">
          <Activity className="h-4 w-4" />
          <span>Platforms</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {metrics.map((metric) => {
            const Icon = platformIcons[metric.platform as keyof typeof platformIcons]
            const colorClass = platformColors[metric.platform as keyof typeof platformColors]
            const isHovered = hoveredPlatform === metric.platform

            return (
              <div
                key={metric.platform}
                className={`p-2 border border-border rounded-lg transition-all cursor-pointer ${
                  isHovered ? "bg-muted/50 scale-[1.02] shadow-sm" : "hover:bg-muted/30"
                }`}
                onMouseEnter={() => setHoveredPlatform(metric.platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${colorClass}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs text-foreground">{metric.platform}</h3>
                      <p className="text-xs text-muted-foreground">{metric.topCategory}</p>
                    </div>
                  </div>
                  <Badge variant={metric.growth24h > 0 ? "default" : "secondary"} className="text-xs h-4">
                    <TrendingUp className="h-2 w-2 mr-1" />
                    {formatGrowth(metric.growth24h)}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Trends</p>
                    <p className="font-medium text-foreground">{metric.totalTrends}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active</p>
                    <p className="font-medium text-foreground">{metric.activeNow}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-medium text-foreground">{formatEngagement(metric.engagement)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
