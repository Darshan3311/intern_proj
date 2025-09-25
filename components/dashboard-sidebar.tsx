import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Instagram, Twitter, Youtube, Search, Brain, Clock, Filter } from "lucide-react"

const navigationItems = [
  { name: "Overview", icon: BarChart3, active: true },
  { name: "Trending Now", icon: TrendingUp },
  { name: "AI Insights", icon: Brain },
  { name: "Historical", icon: Clock },
]

const platformItems = [
  { name: "Instagram", icon: Instagram, count: 1247 },
  { name: "Twitter/X", icon: Twitter, count: 892 },
  { name: "YouTube", icon: Youtube, count: 634 },
  { name: "Google Trends", icon: Search, count: 445 },
]

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Navigation</h3>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-sidebar-foreground">Platforms</h3>
              <Button variant="ghost" size="sm">
                <Filter className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-2">
              {platformItems.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar-accent cursor-pointer"
                >
                  <div className="flex items-center">
                    <platform.icon className="mr-2 h-4 w-4 text-sidebar-foreground" />
                    <span className="text-sm text-sidebar-foreground">{platform.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {platform.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
