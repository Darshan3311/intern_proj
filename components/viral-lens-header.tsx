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
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="relative">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              <div className="absolute inset-0 h-6 w-6 sm:h-8 sm:w-8 text-blue-400 animate-pulse opacity-50" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ViralLens
              </h1>
              <p className="text-xs text-muted-foreground hidden lg:block">AI-Powered Trend Prediction</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VL
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1">
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

        {/* Mobile Navigation */}
        <nav className="flex lg:hidden items-center space-x-1 overflow-x-auto">
          {navTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab)}
              className={
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 text-xs px-2 py-1 whitespace-nowrap"
                  : "hover:bg-secondary/50 hover:text-blue-300 transition-all duration-200 text-xs px-2 py-1 whitespace-nowrap"
              }
            >
              {tab}
            </Button>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ask ViralLens about a topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 lg:w-64 pl-10 bg-secondary/50 border-border/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
              </div>
            )}
          </form>

          <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50 h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs bg-pink-500">3</Badge>
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-secondary/50 h-8 w-8 sm:h-10 sm:w-10 md:hidden">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-secondary/50 h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
