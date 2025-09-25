"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Clock, TrendingDown } from "lucide-react"
import { useState } from "react"

const predictions = [
  {
    id: "1",
    title: "#AIRevolution Peak",
    confidence: 87,
    timeframe: "24h",
    currentValue: 2847392,
    predictedValue: 5000000,
    growth: 76.2,
    status: "trending",
  },
  {
    id: "2",
    title: "Sustainable Fashion",
    confidence: 73,
    timeframe: "48h",
    currentValue: 1456789,
    predictedValue: 3642000,
    growth: 150.0,
    status: "emerging",
  },
  {
    id: "3",
    title: "Morning Routine",
    confidence: 65,
    timeframe: "72h",
    currentValue: 1923847,
    predictedValue: 1442885,
    growth: -25.0,
    status: "declining",
  },
]

const statusColors = {
  trending: "bg-green-500/20 text-green-400 border-green-500/30",
  emerging: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  declining: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function CompactPredictive() {
  const [selectedPrediction, setSelectedPrediction] = useState(predictions[0])

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-base">
          <TrendingUp className="h-4 w-4" />
          <span>Predictions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {predictions.map((prediction) => {
            const statusColor = statusColors[prediction.status as keyof typeof statusColors]
            const progressValue = (prediction.currentValue / prediction.predictedValue) * 100
            const isSelected = selectedPrediction.id === prediction.id

            return (
              <div
                key={prediction.id}
                className={`p-2 border rounded-lg cursor-pointer transition-all ${
                  isSelected ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:bg-muted/30"
                }`}
                onClick={() => setSelectedPrediction(prediction)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-xs text-foreground">{prediction.title}</h3>
                    <Badge variant="outline" className={`text-xs h-4 ${statusColor}`}>
                      {prediction.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {prediction.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${prediction.growth > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {prediction.growth > 0 ? "+" : ""}
                      {prediction.growth.toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Progress value={Math.min(progressValue, 100)} className="h-1" />

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Target className="h-2 w-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{prediction.confidence}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-2 w-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{prediction.timeframe}</span>
                    </div>
                    <span className="font-medium">
                      {formatValue(prediction.currentValue)} → {formatValue(prediction.predictedValue)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
