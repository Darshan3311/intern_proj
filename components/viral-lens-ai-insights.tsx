"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Brain, TrendingUp, Target, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { mockAIInsights } from "@/lib/viral-lens-data"

export function ViralLensAIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return TrendingUp
      case "trend":
        return Target
      case "opportunity":
        return CheckCircle
      default:
        return Brain
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-neon-pink"
      case "medium":
        return "text-neon-purple"
      case "low":
        return "text-neon-blue"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          AI Insights
        </h2>
        <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
          <Brain className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAIInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type)
          const isSelected = selectedInsight === insight.id

          return (
            <Card
              key={insight.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? "border-neon-purple neon-glow-purple bg-card/80"
                  : "border-border/50 hover:border-neon-purple/50 bg-card/30"
              } backdrop-blur-sm`}
              onClick={() => setSelectedInsight(isSelected ? null : insight.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-neon-purple" />
                    <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  </div>
                  <Badge className={`text-xs px-2 py-1 ${getImpactColor(insight.impact)}`}>{insight.impact}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-neon-blue" />
                      <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{insight.timestamp}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="pt-3 border-t border-border/30 animate-in slide-in-from-top duration-200">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple"
                    >
                      Take Action
                    </Button>
                  </div>
                )}
              </CardContent>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
              )}
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Predictions Made", value: "1,247", icon: TrendingUp },
          { label: "Accuracy Rate", value: "94.2%", icon: Target },
          { label: "Trends Detected", value: "89", icon: AlertTriangle },
          { label: "Opportunities", value: "23", icon: CheckCircle },
        ].map((stat, index) => (
          <Card
            key={index}
            className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-neon-blue/30 transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <stat.icon className="h-5 w-5 text-neon-blue" />
                <div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
