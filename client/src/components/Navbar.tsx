import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, BarChart3, Users, Settings, Target, Magnet, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Main navigation - core features only
const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Lead Magnets", href: "/lead-magnets", icon: Magnet },
  { name: "Funnels", href: "/funnels", icon: Target },
  { name: "Leads", href: "/leads", icon: Users },
];

// Secondary navigation - advanced features
const advancedNavigation = [
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Channels", href: "/channels", icon: MessageSquare },
  { name: "Integrations", href: "/integrations", icon: Settings },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === "/";
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">LeadGenius</span>
              <span className="text-sm bg-gradient-primary bg-clip-text text-transparent font-medium">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation - Only show on dashboard pages */}
          {!isHomepage && (
            <div className="hidden md:flex items-center space-x-1">
              {/* Main Navigation */}
              <div className="flex items-center space-x-1 border-r border-border pr-4 mr-4">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Advanced Navigation */}
              <div className="flex items-center space-x-1">
                {advancedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Desktop CTA - Show on homepage, hide on dashboard */}
          {isHomepage && (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Login</Link>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <Link to="/dashboard">Start Free Trial</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Only show on dashboard pages */}
        {isOpen && !isHomepage && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {/* Main Navigation */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">Main</div>
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              {/* Advanced Navigation */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">Advanced</div>
                {advancedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile CTA - Only show on homepage */}
        {isOpen && isHomepage && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-background border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button variant="gradient" className="w-full" asChild>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Start Free Trial</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}