import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Settings, User, Plus, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  if (isHomepage) {
    return (
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <img src="/attached_assets/ChatGPT Image Jul 20, 2025, 12_30_40 AM_1752968143287.png" alt="Convertly" className="w-8 h-8" />
              <span className="hidden font-bold sm:inline-block text-xl">CONVERTLY</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Navigation items can be added here */}
            </div>

            <nav className="flex items-center space-x-2">
              <Link to="/features">
                <Button variant="ghost" size="sm">Features</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" size="sm">Pricing</Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="/attached_assets/ChatGPT Image Jul 20, 2025, 12_30_40 AM_1752968143287.png" alt="Convertly" className="w-8 h-8" />
            <h1 className="text-xl font-semibold text-foreground">CONVERTLY</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>

          <Button variant="outline" size="icon" className="text-foreground border-border hover:bg-accent">
            <Bell className="w-4 h-4" />
          </Button>

          <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add Lead
          </Button>

          <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Zap className="w-4 h-4 mr-2" />
            Create Funnel
          </Button>

          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}