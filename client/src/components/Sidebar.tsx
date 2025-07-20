import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Settings, 
  Target, 
  Magnet, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Zap,
  FileText,
  PenTool,
  Mail,
  Phone,
  TrendingUp,
  Layers,
  Globe,
  Bot,
  User,
  Video,
  BookOpen,
  UserCheck,
  Rocket
} from "lucide-react";

const navigation = [
  {
    name: "AI Features",
    items: [
      { name: "🚀 Launch Assistant", href: "/ai-launch", icon: Zap },
      { name: "🤖 Campaign Automation", href: "/ai-email-sms", icon: Zap },
      { name: "🎯 Ad Launcher", href: "/ai-ads", icon: Target },
      { name: "📞 Call & Booking", href: "/call-booking", icon: Phone },
    ]
  },
  {
    name: "Core Features",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "Lead Magnets", href: "/lead-magnets", icon: Magnet },
      { name: "Funnels", href: "/funnels", icon: Target },
      { name: "Leads", href: "/leads", icon: Users },
    ]
  },
  {
    name: "Email Marketing",
    items: [
      { name: "📧 Campaign Builder", href: "/email-marketing", icon: Mail },
      { name: "✉️ Email Builder", href: "/email-builder", icon: PenTool },
    ]
  },
  {
    name: "Marketing Tools", 
    items: [
      { name: "Page Builder", href: "/page-builder", icon: PenTool },
      { name: "🚀 Advanced Builder", href: "/advanced-builder", icon: Zap },
      { name: "Multi-Channel", href: "/channels", icon: MessageSquare },
      { name: "Analytics", href: "/analytics", icon: TrendingUp },
    ]
  },
  {
    name: "Standalone Features",
    items: [
      { name: "🎥 Evergreen Webinar", href: "/#evergreen", icon: Video },
      { name: "📚 Course Selling", href: "/#course", icon: BookOpen },
      { name: "🤝 Affiliates", href: "/#affiliates", icon: UserCheck },
      { name: "🚀 Launch Planner", href: "/#launch", icon: Rocket },
    ]
  },
  {
    name: "Advanced",
    items: [
      { name: "CRM", href: "/crm", icon: Users },
      { name: "AI Coach", href: "/ai-coach", icon: Bot },
      { name: "Integrations", href: "/integrations", icon: Layers },
      { name: "Profile", href: "/profile", icon: User },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <img src="/convertly-logo.png" alt="Convertly" className="w-8 h-8 rounded-lg" />
          {!isCollapsed && (
            <span className="font-bold text-xl text-foreground">CONVERTLY</span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((group) => (
          <div key={group.name} className="mb-6">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {group.name}
              </h3>
            )}

            <nav className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">VoiceFunnels AI</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your AI assistant is ready to help create funnels, lead magnets, and more.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}