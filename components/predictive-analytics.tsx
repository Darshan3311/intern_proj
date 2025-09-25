"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { TrendingUp, Zap, Target, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

// Mock predictive data
const generatePredictiveData = () => {
  const now = new Date()
  const data = []

  // Historical data (last 7 days)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      actual: Math.floor(Math.random() * 1000000) + 500000,
      predicted: null,
      type: "historical",
    })
  }

  // Predicted data (next 7 days)
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)
    const baseValue = data[data.length - 1].actual
    const growth = 1 + (Math.random() - 0.3) * 0.4 // -30% to +40% growth
    data.push({
      date: date.toISOString().split("T")[0],
      actual: null,
      predicted: Math.floor(baseValue * growth),
      type: "predicted",
    })
  }

  return data
}

const predictions = [
  {
    id: "1",
    title: "#AIRevolution Peak Prediction",
    description: "Expected to reach 5M interactions within 24 hours",
    confidence: 87,
    timeframe: "24 hours",
    currentValue: 2847392,
    predictedValue: 5000000,
    growth: 76.2,
    status: "trending",
  },
  {
    id: "2",
    title: "Sustainable Fashion Surge",
    description: "Projected 150% growth in next 48 hours",
    confidence: 73,
    timeframe: "48 hours",
    currentValue: 1456789,
    predictedValue: 3642000,
    growth: 150.0,
    status: "emerging",
  },
  {
    id: "3",
    title: "Morning Routine Content Decline",
    description: "Expected 25% decrease as trend matures",
    confidence: 65,
    timeframe: "72 hours",
    currentValue: 1923847,
    predictedValue: 1442885,
    growth: -25.0,
    status: "declining",
  },
]

const statusColors = {
  trending: "bg-green-500/10 text-green-500 border-green-500/20",
  emerging: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  declining: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function PredictiveAnalytics() {
  const [selectedPrediction, setSelectedPrediction] = useState(predictions[0])
  const chartData = generatePredictiveData()

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {data.actual && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Actual:</span>
              <span className="font-medium text-foreground">{formatValue(data.actual)}</span>
            </div>
          )}
          {data.predicted && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Predicted:</span>
              <span className="font-medium text-foreground">{formatValue(data.predicted)}</span>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Predictive Trend Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={formatValue} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    x={new Date().toISOString().split("T")[0]}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="2 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                    connectNulls={false}
                    activeDot={{ r: 4, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={false}
                    activeDot={{ r: 4, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                <span className="text-sm text-muted-foreground">Historical Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                <span className="text-sm text-muted-foreground">AI Predictions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Trend Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => {
              const statusColor = statusColors[prediction.status as keyof typeof statusColors]
              const progressValue = (prediction.currentValue / prediction.predictedValue) * 100

              return (
                <div
                  key={prediction.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPrediction.id === prediction.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedPrediction(prediction)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground text-balance">{prediction.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty mt-1">{prediction.description}</p>
                    </div>
                    <Badge variant="outline" className={statusColor}>
                      {prediction.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.min(progressValue, 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={Math.min(progressValue, 100)} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current</p>
                        <p className="font-medium text-foreground">{formatValue(prediction.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Predicted</p>
                        <p className="font-medium text-foreground">{formatValue(prediction.predictedValue)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Target className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Confidence: {prediction.confidence}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{prediction.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">AI Prediction Note</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Predictions are based on historical patterns, current engagement rates, and machine learning models.
              Actual results may vary due to external factors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
