"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TrendData } from "@/lib/types"
import { formatEngagement, formatGrowth } from "@/lib/mock-data"
import {
  TrendingUp,
  Instagram,
  Twitter,
  Youtube,
  Search,
  Hash,
  Play,
  FileText,
  Globe,
  ExternalLink,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  google: Search,
}

const categoryIcons = {
  hashtag: Hash,
  video: Play,
  topic: FileText,
  news: Globe,
}

const sentimentColors = {
  positive: "bg-green-500/20 text-green-400 border-green-500/30",
  negative: "bg-red-500/20 text-red-400 border-red-500/30",
  neutral: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

interface CompactTrendCardProps {
  trend: TrendData
  rank: number
}

export function CompactTrendCard({ trend, rank }: CompactTrendCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const PlatformIcon = platformIcons[trend.platform]
  const CategoryIcon = categoryIcons[trend.category]
  const sentimentClass = sentimentColors[trend.sentiment]

  return (
    <Card
      className={`transition-all duration-200 cursor-pointer ${
        hovered ? "shadow-lg scale-[1.02] border-primary/50" : "hover:shadow-md"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-primary">#{rank}</span>
              <div className="p-1 bg-primary/10 rounded">
                <PlatformIcon className="h-3 w-3 text-primary" />
              </div>
            </div>
            <Badge variant="outline" className={`text-xs ${sentimentClass}`}>
              {trend.sentiment}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <ExternalLink className="h-3 w-3" />
            </Button>
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </div>
        </div>

        <div className="mb-2">
          <h3 className="font-medium text-sm text-foreground line-clamp-1">{trend.title}</h3>
          {expanded && <p className="text-xs text-muted-foreground mt-1 text-pretty">{trend.description}</p>}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <CategoryIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground capitalize">{trend.category}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-pink-500" />
              <span className="text-muted-foreground">{formatEngagement(trend.engagement)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">{formatGrowth(trend.growth)}</span>
            </div>
          </div>
        </div>

        {expanded && trend.metrics && (
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border text-xs">
            <div className="flex items-center space-x-3">
              {trend.metrics.views && (
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span>{formatEngagement(trend.metrics.views)}</span>
                </div>
              )}
              {trend.metrics.comments && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3 text-orange-500" />
                  <span>{formatEngagement(trend.metrics.comments)}</span>
                </div>
              )}
              {trend.metrics.shares && (
                <div className="flex items-center space-x-1">
                  <Share2 className="h-3 w-3 text-purple-500" />
                  <span>{formatEngagement(trend.metrics.shares)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
