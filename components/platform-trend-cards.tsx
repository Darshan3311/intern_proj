"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Youtube, Search, TrendingUp, Hash, Eye, Heart, MessageCircle } from "lucide-react"

const platformData = {
  instagram: {
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-400",
    trends: [
      { hashtag: "#MorningRoutine", posts: "2.4M", growth: "+340%" },
      { hashtag: "#SustainableFashion", posts: "1.8M", growth: "+210%" },
      { hashtag: "#AIArt", posts: "3.1M", growth: "+180%" },
      { hashtag: "#PlantBased", posts: "1.2M", growth: "+150%" },
      { hashtag: "#DigitalDetox", posts: "890K", growth: "+120%" },
    ],
  },
  x: {
    name: "X (Twitter)",
    icon: Twitter,
    color: "text-blue-400",
    trends: [
      { hashtag: "#TechNews", posts: "5.2M", growth: "+280%" },
      { hashtag: "#ClimateAction", posts: "3.7M", growth: "+220%" },
      { hashtag: "#CryptoUpdate", posts: "4.1M", growth: "+190%" },
      { hashtag: "#SpaceX", posts: "2.8M", growth: "+160%" },
      { hashtag: "#AIRevolution", posts: "3.3M", growth: "+140%" },
    ],
  },
  youtube: {
    name: "YouTube",
    icon: Youtube,
    color: "text-red-400",
    trends: [
      { hashtag: "AI Tutorials", posts: "1.2M", growth: "+320%" },
      { hashtag: "Productivity Hacks", posts: "980K", growth: "+250%" },
      { hashtag: "Tech Reviews", posts: "2.1M", growth: "+200%" },
      { hashtag: "Cooking Shorts", posts: "1.5M", growth: "+180%" },
      { hashtag: "Gaming Highlights", posts: "3.2M", growth: "+160%" },
    ],
  },
  google: {
    name: "Google Trends",
    icon: Search,
    color: "text-green-400",
    trends: [
      { hashtag: "Artificial Intelligence", posts: "10M", growth: "+400%" },
      { hashtag: "Remote Work Tools", posts: "5.5M", growth: "+280%" },
      { hashtag: "Sustainable Living", posts: "4.2M", growth: "+240%" },
      { hashtag: "Electric Vehicles", posts: "6.1M", growth: "+200%" },
      { hashtag: "Mental Health", posts: "3.8M", growth: "+170%" },
    ],
  },
}

export function PlatformTrendCards() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [animatingTrends, setAnimatingTrends] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Animate trend numbers on mount
    const timer = setTimeout(() => {
      Object.keys(platformData).forEach((platform) => {
        setAnimatingTrends((prev) => ({ ...prev, [platform]: true }))
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Platform Trends
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(platformData).map(([key, platform]) => {
          const Icon = platform.icon
          const isSelected = selectedPlatform === key

          return (
            <Card
              key={key}
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-105 ${
                isSelected
                  ? "border-neon-blue neon-glow-blue bg-card/80"
                  : "border-border/50 hover:border-neon-blue/50 bg-card/30"
              } backdrop-blur-sm`}
              onClick={() => setSelectedPlatform(isSelected ? null : key)}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${platform.color}`} />
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                  </div>
                  <TrendingUp className="h-4 w-4 text-neon-green" />
                </div>
              </CardHeader>

              <CardContent className="relative space-y-3">
                <div className="text-xs text-muted-foreground mb-3">Top 5 Trending</div>

                {platform.trends.map((trend, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 ${
                      animatingTrends[key] ? "animate-in slide-in-from-left" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <Hash className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{trend.hashtag}</span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        {trend.posts}
                      </Badge>
                      <Badge className="text-xs px-1.5 py-0.5 bg-neon-green/20 text-neon-green border-neon-green/30">
                        {trend.growth}
                      </Badge>
                    </div>
                  </div>
                ))}

                {/* Interactive Elements */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>12.4M</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>2.1M</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>890K</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs hover:bg-neon-blue/20 hover:text-neon-blue"
                  >
                    View All
                  </Button>
                </div>
              </CardContent>

              {/* Selection Indicator */}
              {isSelected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-blue animate-pulse" />}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
