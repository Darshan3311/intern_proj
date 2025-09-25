"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Shield, Database, Zap } from "lucide-react"

export function ViralLensSettings() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Settings & Configuration
        </h2>
        <p className="text-muted-foreground">Customize your ViralLens experience and AI prediction preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Prediction Settings */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" />
              AI Prediction Settings
            </CardTitle>
            <CardDescription>Configure how ViralLens analyzes and predicts trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="real-time">Real-time Analysis</Label>
              <Switch id="real-time" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sentiment">Sentiment Analysis</Label>
              <Switch id="sentiment" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Prediction Confidence Threshold</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (60%)</SelectItem>
                  <SelectItem value="medium">Medium (75%)</SelectItem>
                  <SelectItem value="high">High (90%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Platform Monitoring */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              Platform Monitoring
            </CardTitle>
            <CardDescription>Select which platforms to monitor for trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Instagram", "X (Twitter)", "YouTube", "TikTok", "Google Trends"].map((platform) => (
              <div key={platform} className="flex items-center justify-between">
                <Label htmlFor={platform.toLowerCase()}>{platform}</Label>
                <Switch id={platform.toLowerCase()} defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-pink-400" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="trending-alerts">Trending Topic Alerts</Label>
              <Switch id="trending-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="viral-predictions">Viral Predictions</Label>
              <Switch id="viral-predictions" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-summary">Daily Summary</Label>
              <Switch id="daily-summary" />
            </div>
            <div className="space-y-2">
              <Label>Alert Frequency</Label>
              <Select defaultValue="instant">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              API & Integrations
            </CardTitle>
            <CardDescription>Manage your API keys and third-party connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex gap-2">
                <Input type="password" value="vl_••••••••••••••••" readOnly />
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Connected Platforms</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  Instagram API
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  X API
                </Badge>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                  YouTube API
                </Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Connect New Platform
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
