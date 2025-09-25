"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendsAPI } from "@/lib/api"
import type { TrendOverviewData } from "@/lib/types"
import { TrendingUp, Activity, BarChart3, Zap } from "lucide-react"

export function TrendOverview() {
  const [data, setData] = useState<TrendOverviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overview = await TrendsAPI.getTrendOverview()
        setData(overview)
      } catch (error) {
        console.error("Failed to fetch trend overview:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) return null

  const stats = [
    {
      title: "Total Trends",
      value: data.totalTrends.toLocaleString(),
      icon: BarChart3,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Now",
      value: data.activeTrends.toLocaleString(),
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      badge: "Live",
    },
    {
      title: "24h Growth",
      value: `+${data.growth24h}%`,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Top Platform",
      value: data.topPlatform,
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Dashboard Overview</h2>
        <Badge variant="outline" className="text-xs">
          {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="relative overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    {stat.badge && (
                      <Badge variant="secondary" className="text-xs h-4">
                        {stat.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`p-2 ${stat.bgColor} rounded-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
