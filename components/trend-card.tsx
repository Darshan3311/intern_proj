import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TrendData } from "@/lib/types"
import { formatEngagement, formatGrowth } from "@/lib/mock-data"
import {
  Instagram,
  Twitter,
  Youtube,
  Search,
  Hash,
  Play,
  FileText,
  Globe,
  ExternalLink,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Eye,
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
  positive: "bg-green-500/10 text-green-500 border-green-500/20",
  negative: "bg-red-500/10 text-red-500 border-red-500/20",
  neutral: "bg-gray-500/10 text-gray-500 border-gray-500/20",
}

interface TrendCardProps {
  trend: TrendData
  rank?: number
  showMetrics?: boolean
}

export function TrendCard({ trend, rank, showMetrics = true }: TrendCardProps) {
  const PlatformIcon = platformIcons[trend.platform]
  const CategoryIcon = categoryIcons[trend.category]
  const sentimentClass = sentimentColors[trend.sentiment]

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {rank && <span className="text-lg font-bold text-muted-foreground">#{rank}</span>}
            <div className="p-1.5 bg-primary/10 rounded">
              <PlatformIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-balance">{trend.title}</h3>
              {trend.description && (
                <p className="text-sm text-muted-foreground text-pretty mt-1">{trend.description}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <CategoryIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground capitalize">{trend.category}</span>
            </div>
            <Badge variant="outline" className={sentimentClass}>
              {trend.sentiment}
            </Badge>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{formatEngagement(trend.engagement)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">{formatGrowth(trend.growth)}</span>
            </div>
          </div>
        </div>

        {showMetrics && trend.metrics && (
          <div className="flex items-center space-x-4 pt-3 border-t border-border text-xs text-muted-foreground">
            {trend.metrics.views && (
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{formatEngagement(trend.metrics.views)}</span>
              </div>
            )}
            {trend.metrics.likes && (
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{formatEngagement(trend.metrics.likes)}</span>
              </div>
            )}
            {trend.metrics.shares && (
              <div className="flex items-center space-x-1">
                <Share2 className="h-3 w-3" />
                <span>{formatEngagement(trend.metrics.shares)}</span>
              </div>
            )}
            {trend.metrics.comments && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{formatEngagement(trend.metrics.comments)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
