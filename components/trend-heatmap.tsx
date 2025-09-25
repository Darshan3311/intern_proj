"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import { useState } from "react"

// Mock heatmap data for trending topics by time and category
const generateHeatmapData = () => {
  const categories = ["Tech", "Entertainment", "Sports", "Health", "Fashion"]
  const hours = Array.from({ length: 12 }, (_, i) => i * 2) // Show every 2 hours for compactness

  return categories.map((category) => ({
    category,
    data: hours.map((hour) => ({
      hour,
      intensity: Math.floor(Math.random() * 100) + 1,
      trends: Math.floor(Math.random() * 50) + 5,
    })),
  }))
}

const getIntensityColor = (intensity: number) => {
  if (intensity >= 80) return "bg-red-500"
  if (intensity >= 60) return "bg-orange-500"
  if (intensity >= 40) return "bg-yellow-500"
  if (intensity >= 20) return "bg-blue-500"
  return "bg-gray-500"
}

const getIntensityOpacity = (intensity: number) => {
  return Math.max(0.1, intensity / 100)
}

export function TrendHeatmap() {
  const [selectedView, setSelectedView] = useState<"24h" | "7d">("24h")
  const [hoveredCell, setHoveredCell] = useState<{ category: string; hour: number; data: any } | null>(null)
  const heatmapData = generateHeatmapData()

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Flame className="h-4 w-4" />
            <span>Trend Heatmap</span>
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant={selectedView === "24h" ? "default" : "outline"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setSelectedView("24h")}
            >
              24H
            </Button>
            <Button
              variant={selectedView === "7d" ? "default" : "outline"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setSelectedView("7d")}
            >
              7D
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {/* Time labels */}
          <div className="flex items-center space-x-1 ml-16">
            {heatmapData[0].data.map((hourData) => (
              <div key={hourData.hour} className="w-4 text-center">
                <span className="text-xs text-muted-foreground">{hourData.hour.toString().padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="space-y-1">
            {heatmapData.map((categoryData) => (
              <div key={categoryData.category} className="flex items-center space-x-1">
                <div className="w-14 text-right">
                  <span className="text-xs font-medium text-foreground">{categoryData.category}</span>
                </div>
                <div className="flex space-x-1">
                  {categoryData.data.map((hourData) => (
                    <div
                      key={hourData.hour}
                      className={`w-4 h-4 rounded-sm cursor-pointer transition-all hover:scale-125 hover:z-10 relative ${getIntensityColor(hourData.intensity)}`}
                      style={{
                        opacity: getIntensityOpacity(hourData.intensity),
                      }}
                      onMouseEnter={() =>
                        setHoveredCell({ category: categoryData.category, hour: hourData.hour, data: hourData })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Intensity:</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-sm bg-gray-500 opacity-20"></div>
                <div className="w-2 h-2 rounded-sm bg-blue-500 opacity-60"></div>
                <div className="w-2 h-2 rounded-sm bg-orange-500 opacity-80"></div>
                <div className="w-2 h-2 rounded-sm bg-red-500"></div>
              </div>
            </div>
            {hoveredCell && (
              <Badge variant="outline" className="text-xs">
                {hoveredCell.category} {hoveredCell.hour}:00 - {hoveredCell.data.intensity}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
