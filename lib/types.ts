export interface TrendData {
  id: string
  title: string
  platform: "instagram" | "twitter" | "youtube" | "google"
  category: "hashtag" | "video" | "topic" | "news"
  engagement: number
  growth: number
  sentiment: "positive" | "negative" | "neutral"
  timestamp: Date
  description?: string
  url?: string
  thumbnail?: string
  metrics: {
    views?: number
    likes?: number
    shares?: number
    comments?: number
    searches?: number
  }
}

export interface PlatformMetrics {
  platform: string
  totalTrends: number
  activeNow: number
  growth24h: number
  topCategory: string
  engagement: number
}

export interface AIInsight {
  id: string
  type: "prediction" | "summary" | "alert" | "recommendation"
  title: string
  description: string
  confidence: number
  timestamp: Date
  relatedTrends: string[]
}

export interface TrendOverviewData {
  totalTrends: number
  activeTrends: number
  growth24h: number
  topPlatform: string
  viralThreshold: number
  platformDistribution: Array<{
    platform: string
    count: number
    percentage: number
  }>
}
