"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function ViralLensHero() {
  const [heroSearch, setHeroSearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleHeroSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!heroSearch.trim()) return

    setIsSearching(true)
    // Simulate AI search results
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResults = [
      `"${heroSearch}" is trending 340% higher than last week`,
      `AI predicts 67% growth in next 24 hours`,
      `Most viral on Instagram and TikTok`,
      `Related trends: #viral, #trending, #${heroSearch.toLowerCase()}`,
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main Tagline */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-4">
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-neon-pink animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-neon-pink uppercase tracking-wider">
                AI-Powered Trend Intelligence
              </span>
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-neon-pink animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent leading-tight">
              See What's Going Viral
              <br />
              <span className="text-2xl sm:text-4xl lg:text-6xl">Before Everyone Else</span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              AI-powered insights across Instagram, X, YouTube, and Google Trends.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Predict the next big thing with unprecedented accuracy.
            </p>
          </div>

          {/* Hero Search */}
          <div className="max-w-2xl mx-auto px-4">
            <form onSubmit={handleHeroSearch} className="relative">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-neon-blue transition-colors" />
                <Input
                  placeholder="Ask ViralLens about a topic..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="h-12 sm:h-14 pl-10 sm:pl-12 pr-24 sm:pr-32 text-base sm:text-lg bg-card/50 border-border/50 focus:border-neon-blue focus:ring-neon-blue/20 focus:bg-card backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 h-8 sm:h-10 px-3 sm:px-6 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink neon-glow-blue transition-all duration-300"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span className="text-xs sm:text-sm">Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Predict</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card className="mt-6 p-6 bg-card/80 backdrop-blur-sm border-neon-blue/20 neon-glow-blue">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-neon-blue" />
                  <h3 className="font-semibold text-neon-blue">AI Analysis Results</h3>
                </div>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-sm text-muted-foreground animate-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-2 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
            {[
              { label: "Trends Predicted", value: "10,847", change: "+23%" },
              { label: "Accuracy Rate", value: "94.2%", change: "+5.1%" },
              { label: "Platforms Monitored", value: "15+", change: "Real-time" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-neon-blue/30 transition-all duration-300 group"
              >
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-neon-green">{stat.change}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
