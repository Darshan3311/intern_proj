import type { TrendData, PlatformMetrics, AIInsight, TrendOverviewData } from "./types"

export const mockTrendData: TrendData[] = [
  {
    id: "1",
    title: "#AIRevolution",
    platform: "twitter",
    category: "hashtag",
    engagement: 2847392,
    growth: 156.7,
    sentiment: "positive",
    timestamp: new Date("2025-01-15T10:30:00Z"),
    description: "Discussions about AI breakthroughs and their impact on society",
    metrics: {
      views: 12500000,
      likes: 847392,
      shares: 234567,
      comments: 89234,
    },
  },
  {
    id: "2",
    title: "Morning Routine Hacks",
    platform: "youtube",
    category: "video",
    engagement: 1923847,
    growth: 89.3,
    sentiment: "positive",
    timestamp: new Date("2025-01-15T08:15:00Z"),
    description: "Productivity and wellness morning routines trending across lifestyle channels",
    thumbnail: "/morning-routine-productivity.png",
    metrics: {
      views: 8900000,
      likes: 456789,
      shares: 123456,
      comments: 67890,
    },
  },
  {
    id: "3",
    title: "Sustainable Fashion",
    platform: "instagram",
    category: "topic",
    engagement: 1456789,
    growth: 67.8,
    sentiment: "positive",
    timestamp: new Date("2025-01-15T12:45:00Z"),
    description: "Eco-friendly fashion brands and sustainable styling tips",
    metrics: {
      views: 5600000,
      likes: 789123,
      shares: 234567,
      comments: 45678,
    },
  },
  {
    id: "4",
    title: "Climate Change Solutions",
    platform: "google",
    category: "news",
    engagement: 3456789,
    growth: 234.5,
    sentiment: "neutral",
    timestamp: new Date("2025-01-15T14:20:00Z"),
    description: "Innovative technologies and policies addressing climate challenges",
    metrics: {
      searches: 15600000,
      views: 8900000,
    },
  },
  {
    id: "5",
    title: "#TechStartup2025",
    platform: "twitter",
    category: "hashtag",
    engagement: 987654,
    growth: 45.2,
    sentiment: "positive",
    timestamp: new Date("2025-01-15T16:10:00Z"),
    description: "Emerging startups and entrepreneurship trends for 2025",
    metrics: {
      views: 4500000,
      likes: 234567,
      shares: 89123,
      comments: 34567,
    },
  },
  {
    id: "6",
    title: "Minimalist Home Design",
    platform: "instagram",
    category: "topic",
    engagement: 1234567,
    growth: 78.9,
    sentiment: "positive",
    timestamp: new Date("2025-01-15T11:30:00Z"),
    description: "Clean, minimal interior design inspiration and tips",
    metrics: {
      views: 6700000,
      likes: 567890,
      shares: 123456,
      comments: 78901,
    },
  },
]

export const mockPlatformMetrics: PlatformMetrics[] = [
  {
    platform: "Instagram",
    totalTrends: 1247,
    activeNow: 89,
    growth24h: 12.4,
    topCategory: "Lifestyle",
    engagement: 8934567,
  },
  {
    platform: "Twitter/X",
    totalTrends: 892,
    activeNow: 156,
    growth24h: 23.7,
    topCategory: "Technology",
    engagement: 12456789,
  },
  {
    platform: "YouTube",
    totalTrends: 634,
    activeNow: 67,
    growth24h: 8.9,
    topCategory: "Entertainment",
    engagement: 15678901,
  },
  {
    platform: "Google Trends",
    totalTrends: 445,
    activeNow: 234,
    growth24h: 45.6,
    topCategory: "News",
    engagement: 23456789,
  },
]

export const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "prediction",
    title: "AI Revolution Expected to Peak",
    description:
      "Based on current engagement patterns, #AIRevolution is likely to reach 5M interactions within the next 24 hours.",
    confidence: 87,
    timestamp: new Date("2025-01-15T15:30:00Z"),
    relatedTrends: ["1", "5"],
  },
  {
    id: "2",
    type: "alert",
    title: "Viral Threshold Reached",
    description: "Climate Change Solutions has crossed the viral threshold with 234% growth in the last 6 hours.",
    confidence: 95,
    timestamp: new Date("2025-01-15T14:45:00Z"),
    relatedTrends: ["4"],
  },
  {
    id: "3",
    type: "summary",
    title: "Wellness Content Dominates Morning",
    description: "Morning routine and wellness content shows 89% positive sentiment across all platforms.",
    confidence: 92,
    timestamp: new Date("2025-01-15T09:00:00Z"),
    relatedTrends: ["2", "6"],
  },
  {
    id: "4",
    type: "recommendation",
    title: "Optimize for Sustainability Trend",
    description: "Consider creating content around sustainable practices - showing strong cross-platform growth.",
    confidence: 78,
    timestamp: new Date("2025-01-15T13:15:00Z"),
    relatedTrends: ["3"],
  },
]

export const mockTrendOverview: TrendOverviewData = {
  totalTrends: 3218,
  activeTrends: 546,
  growth24h: 18.7,
  topPlatform: "Twitter/X",
  viralThreshold: 1000000,
  platformDistribution: [
    { platform: "Instagram", count: 1247, percentage: 38.7 },
    { platform: "Twitter/X", count: 892, percentage: 27.7 },
    { platform: "YouTube", count: 634, percentage: 19.7 },
    { platform: "Google", count: 445, percentage: 13.9 },
  ],
}

// Utility functions for data manipulation
export function getTrendsByPlatform(platform: string): TrendData[] {
  return mockTrendData.filter((trend) => trend.platform === platform)
}

export function getTrendsByCategory(category: string): TrendData[] {
  return mockTrendData.filter((trend) => trend.category === category)
}

export function getTopTrendsByEngagement(limit = 5): TrendData[] {
  return [...mockTrendData].sort((a, b) => b.engagement - a.engagement).slice(0, limit)
}

export function getTopTrendsByGrowth(limit = 5): TrendData[] {
  return [...mockTrendData].sort((a, b) => b.growth - a.growth).slice(0, limit)
}

export function formatEngagement(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function formatGrowth(growth: number): string {
  return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`
}
