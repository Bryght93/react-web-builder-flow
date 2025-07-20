import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

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
              <img src="/convertly-logo.png" alt="Convertly" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-xl text-foreground">CONVERTLY</span>
            </Link>
          </div>

          {/* Quick Actions - Only show on dashboard pages */}
          {!isHomepage && (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                // Navigate to leads page or open add lead modal
                const event = new CustomEvent('quickAddLead');
                window.dispatchEvent(event);
              }}>
                <Users className="w-4 h-4 mr-2" />
                Quick Add Lead
              </Button>
              <Button variant="default" size="sm" onClick={() => {
                // Navigate to funnel creation
                window.location.href = '/funnels';
                setTimeout(() => {
                  const event = new CustomEvent('createFunnel');
                  window.dispatchEvent(event);
                }, 100);
              }}>
                <Target className="w-4 h-4 mr-2" />
                Create Funnel
              </Button>
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

        {/* Mobile Quick Actions - Only show on dashboard pages */}
        {isOpen && !isHomepage && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-background border-t">
              <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                <Users className="w-4 h-4 mr-2" />
                Quick Add Lead
              </Button>
              <Button variant="default" className="w-full" onClick={() => setIsOpen(false)}>
                <Target className="w-4 h-4 mr-2" />
                Create Funnel
              </Button>
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