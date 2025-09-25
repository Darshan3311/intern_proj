export interface TrendData {
  id: string
  title: string
  platform: "instagram" | "x" | "youtube" | "google"
  hashtag: string
  engagement: number
  growth: string
  posts: string
  sentiment: "positive" | "neutral" | "negative"
  category: string
  timestamp: string
  prediction: {
    nextHour: number
    next24Hours: number
    confidence: number
  }
}

export interface PlatformMetrics {
  platform: string
  totalEngagement: number
  trendsCount: number
  growthRate: string
  topCategory: string
}

export const mockTrendData: TrendData[] = [
  {
    id: "1",
    title: "Morning Routine Productivity",
    platform: "instagram",
    hashtag: "#MorningRoutine",
    engagement: 2400000,
    growth: "+340%",
    posts: "2.4M",
    sentiment: "positive",
    category: "Lifestyle",
    timestamp: "2 hours ago",
    prediction: { nextHour: 15, next24Hours: 67, confidence: 94 },
  },
  {
    id: "2",
    title: "AI Art Revolution",
    platform: "instagram",
    hashtag: "#AIArt",
    engagement: 3100000,
    growth: "+180%",
    posts: "3.1M",
    sentiment: "positive",
    category: "Technology",
    timestamp: "1 hour ago",
    prediction: { nextHour: 12, next24Hours: 45, confidence: 87 },
  },
  {
    id: "3",
    title: "Tech Innovation News",
    platform: "x",
    hashtag: "#TechNews",
    engagement: 5200000,
    growth: "+280%",
    posts: "5.2M",
    sentiment: "positive",
    category: "Technology",
    timestamp: "30 minutes ago",
    prediction: { nextHour: 25, next24Hours: 78, confidence: 92 },
  },
  {
    id: "4",
    title: "AI Tutorial Content",
    platform: "youtube",
    hashtag: "AI Tutorials",
    engagement: 1200000,
    growth: "+320%",
    posts: "1.2M",
    sentiment: "positive",
    category: "Education",
    timestamp: "45 minutes ago",
    prediction: { nextHour: 18, next24Hours: 56, confidence: 89 },
  },
  {
    id: "5",
    title: "Artificial Intelligence",
    platform: "google",
    hashtag: "Artificial Intelligence",
    engagement: 10000000,
    growth: "+400%",
    posts: "10M",
    sentiment: "positive",
    category: "Technology",
    timestamp: "15 minutes ago",
    prediction: { nextHour: 30, next24Hours: 85, confidence: 96 },
  },
]

export const mockPlatformMetrics: PlatformMetrics[] = [
  {
    platform: "Instagram",
    totalEngagement: 12400000,
    trendsCount: 847,
    growthRate: "+23%",
    topCategory: "Lifestyle",
  },
  {
    platform: "X (Twitter)",
    totalEngagement: 18700000,
    trendsCount: 1203,
    growthRate: "+31%",
    topCategory: "Technology",
  },
  {
    platform: "YouTube",
    totalEngagement: 9800000,
    trendsCount: 654,
    growthRate: "+18%",
    topCategory: "Education",
  },
  {
    platform: "Google Trends",
    totalEngagement: 45200000,
    trendsCount: 2156,
    growthRate: "+42%",
    topCategory: "Technology",
  },
]

export const mockEngagementData = [
  { time: "00:00", instagram: 1200, x: 1800, youtube: 900, google: 3200 },
  { time: "04:00", instagram: 1400, x: 2100, youtube: 1100, google: 3600 },
  { time: "08:00", instagram: 2200, x: 3200, youtube: 1800, google: 5100 },
  { time: "12:00", instagram: 2800, x: 4100, youtube: 2400, google: 6200 },
  { time: "16:00", instagram: 3400, x: 4800, youtube: 2900, google: 7100 },
  { time: "20:00", instagram: 2900, x: 4200, youtube: 2600, google: 6500 },
]

export const mockSentimentData = [
  { name: "Positive", value: 68, color: "var(--neon-blue)" },
  { name: "Neutral", value: 24, color: "var(--neon-purple)" },
  { name: "Negative", value: 8, color: "var(--neon-pink)" },
]

export const mockAIInsights = [
  {
    id: "1",
    type: "prediction",
    title: "Viral Content Alert",
    description: "#MorningRoutine is predicted to reach 5M posts in the next 24 hours",
    confidence: 94,
    impact: "high",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "trend",
    title: "Emerging Trend Detected",
    description: "AI-generated art content showing 340% growth across platforms",
    confidence: 87,
    impact: "medium",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    type: "opportunity",
    title: "Content Opportunity",
    description: "Tech tutorials have low competition but high engagement potential",
    confidence: 91,
    impact: "high",
    timestamp: "1 hour ago",
  },
]
