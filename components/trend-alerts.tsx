"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, TrendingUp, TrendingDown, Zap, X } from "lucide-react"
import { useState } from "react"

const alerts = [
  {
    id: "1",
    type: "viral",
    title: "Viral Threshold Reached",
    message: "#ClimateAction crossed 1M interactions",
    trend: "#ClimateAction",
    platform: "Twitter/X",
    severity: "high",
    timestamp: new Date("2025-01-15T14:45:00Z"),
    growth: 234.5,
    dismissed: false,
  },
  {
    id: "2",
    type: "spike",
    title: "Engagement Spike",
    message: "Morning Routine content up 89%",
    trend: "Morning Routines",
    platform: "YouTube",
    severity: "medium",
    timestamp: new Date("2025-01-15T13:30:00Z"),
    growth: 89.3,
    dismissed: false,
  },
  {
    id: "3",
    type: "emerging",
    title: "Emerging Trend",
    message: "Sustainable Fashion gaining momentum",
    trend: "Sustainable Fashion",
    platform: "Multi-platform",
    severity: "medium",
    timestamp: new Date("2025-01-15T11:00:00Z"),
    growth: 156.7,
    dismissed: false,
  },
]

const severityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

const typeIcons = {
  viral: Zap,
  spike: TrendingUp,
  decline: TrendingDown,
  emerging: Bell,
}

export function TrendAlerts() {
  const [alertList, setAlertList] = useState(alerts)

  const dismissAlert = (id: string) => {
    setAlertList((prev) => prev.map((alert) => (alert.id === id ? { ...alert, dismissed: true } : alert)))
  }

  const activeAlerts = alertList.filter((alert) => !alert.dismissed)

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts</span>
            {activeAlerts.length > 0 && (
              <Badge variant="destructive" className="text-xs h-4">
                {activeAlerts.length}
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {activeAlerts.slice(0, 3).map((alert) => {
            const Icon = typeIcons[alert.type as keyof typeof typeIcons]
            const severityColor = severityColors[alert.severity as keyof typeof severityColors]

            return (
              <div
                key={alert.id}
                className="p-2 border border-border rounded-lg hover:bg-muted/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={`p-1 rounded ${severityColor}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs text-foreground truncate">{alert.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{alert.message}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-xs h-4">
                    {alert.platform}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {alert.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`font-medium ${alert.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                        {alert.growth > 0 ? "+" : ""}
                        {alert.growth.toFixed(0)}%
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {alert.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {activeAlerts.length === 0 && (
          <div className="text-center py-4">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">All clear!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
