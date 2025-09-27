"use client"

import type React from "react"

import { useState } from "react"
import { Search, Bell, Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ViralLensHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ViralLensHeader({ activeTab, onTabChange }: ViralLensHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSearching(false)
  }

  const navTabs = ["Home", "Platforms", "Insights", "Predictions", "Settings"]

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-400" />
              <div className="absolute inset-0 h-8 w-8 text-blue-400 animate-pulse opacity-50" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ViralLens
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Trend Prediction</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {navTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab)}
              className={
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                  : "hover:bg-secondary/50 hover:text-blue-300 transition-all duration-200"
              }
            >
              {tab}
            </Button>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ask ViralLens about a topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 bg-secondary/50 border-border/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
              </div>
            )}
          </form>

          <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-pink-500">3</Badge>
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-secondary/50 hidden md:flex">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-1 px-4 py-2 overflow-x-auto">
          {navTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab)}
              className={
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                  : "hover:bg-secondary/50 hover:text-blue-300 transition-all duration-200 whitespace-nowrap"
              }
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
