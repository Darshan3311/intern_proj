"use client"

import { useState } from "react"
import { ViralLensHeader } from "@/components/viral-lens-header"
import { ViralLensHero } from "@/components/viral-lens-hero"
import { PlatformTrendCards } from "@/components/platform-trend-cards"
import { ViralLensVisualizations } from "@/components/viral-lens-visualizations"
import { ViralLensAIInsights } from "@/components/viral-lens-ai-insights"
import { ViralLensSettings } from "@/components/viral-lens-settings"

export default function ViralLensPage() {
  const [activeTab, setActiveTab] = useState("Home")

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <>
            <ViralLensHero />
            <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
              <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
                <PlatformTrendCards />
                <ViralLensVisualizations />
                <ViralLensAIInsights />
              </div>
            </main>
          </>
        )
      case "Platforms":
        return (
          <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              <PlatformTrendCards />
            </div>
          </main>
        )
      case "Insights":
        return (
          <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              <ViralLensAIInsights />
            </div>
          </main>
        )
      case "Predictions":
        return (
          <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              <ViralLensVisualizations />
            </div>
          </main>
        )
      case "Settings":
        return (
          <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              <ViralLensSettings />
            </div>
          </main>
        )
      default:
        return (
          <>
            <ViralLensHero />
            <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
              <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
                <PlatformTrendCards />
                <ViralLensVisualizations />
                <ViralLensAIInsights />
              </div>
            </main>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ViralLensHeader activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  )
}
