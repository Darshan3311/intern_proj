"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Twitter, Youtube, Search, Filter } from "lucide-react"

const platforms = [
  { id: "all", name: "All Platforms", icon: Filter },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "twitter", name: "Twitter/X", icon: Twitter },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "google", name: "Google Trends", icon: Search },
]

interface PlatformFilterProps {
  selectedPlatform: string
  onPlatformChange: (platform: string) => void
  counts?: Record<string, number>
}

export function PlatformFilter({ selectedPlatform, onPlatformChange, counts = {} }: PlatformFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => {
        const Icon = platform.icon
        const isSelected = selectedPlatform === platform.id
        const count = counts[platform.id]

        return (
          <Button
            key={platform.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onPlatformChange(platform.id)}
            className="flex items-center space-x-2"
          >
            <Icon className="h-4 w-4" />
            <span>{platform.name}</span>
            {count !== undefined && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {count}
              </Badge>
            )}
          </Button>
        )
      })}
    </div>
  )
}
