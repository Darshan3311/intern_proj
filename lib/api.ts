import type { TrendData, PlatformMetrics, AIInsight, TrendOverviewData } from "./types"
import {
  mockTrendData,
  mockPlatformMetrics,
  mockAIInsights,
  mockTrendOverview,
  getTrendsByPlatform,
  getTrendsByCategory,
  getTopTrendsByEngagement,
  getTopTrendsByGrowth,
} from "./mock-data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class TrendsAPI {
  static async getTrendOverview(): Promise<TrendOverviewData> {
    await delay(300)
    return mockTrendOverview
  }

  static async getAllTrends(): Promise<TrendData[]> {
    await delay(500)
    return mockTrendData
  }

  static async getTrendsByPlatform(platform: string): Promise<TrendData[]> {
    await delay(400)
    return getTrendsByPlatform(platform)
  }

  static async getTrendsByCategory(category: string): Promise<TrendData[]> {
    await delay(400)
    return getTrendsByCategory(category)
  }

  static async getTopTrends(sortBy: "engagement" | "growth" = "engagement", limit = 10): Promise<TrendData[]> {
    await delay(350)
    return sortBy === "engagement" ? getTopTrendsByEngagement(limit) : getTopTrendsByGrowth(limit)
  }

  static async getPlatformMetrics(): Promise<PlatformMetrics[]> {
    await delay(300)
    return mockPlatformMetrics
  }

  static async getAIInsights(): Promise<AIInsight[]> {
    await delay(600)
    return mockAIInsights
  }

  static async searchTrends(query: string): Promise<TrendData[]> {
    await delay(400)
    return mockTrendData.filter(
      (trend) =>
        trend.title.toLowerCase().includes(query.toLowerCase()) ||
        trend.description?.toLowerCase().includes(query.toLowerCase()),
    )
  }

  static async getTrendDetails(id: string): Promise<TrendData | null> {
    await delay(200)
    return mockTrendData.find((trend) => trend.id === id) || null
  }

  // Real-time simulation
  static async getRealtimeUpdates(): Promise<Partial<TrendData>[]> {
    await delay(100)
    // Simulate real-time updates with random changes
    return mockTrendData.slice(0, 3).map((trend) => ({
      id: trend.id,
      engagement: trend.engagement + Math.floor(Math.random() * 10000),
      growth: trend.growth + (Math.random() - 0.5) * 5,
    }))
  }
}
