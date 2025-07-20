import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
// Removed unused import
import { 
  Zap, 
  Brain,
  Target, 
  MessageSquare, 
  BarChart3,
  Mail,
  Sparkles,
  Bot,
  Smartphone,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Palette,
  Megaphone,
  PieChart,
  Filter,
  Menu,
  X
} from "lucide-react";

const coreFeatures = [
  {
    icon: Brain,
    title: "AI Lead Magnet Builder",
    description: "Create high-converting lead magnets in minutes with our intelligent content generator.",
    features: [
      "Industry-specific eBook generation",
      "Interactive quiz builder with smart scoring",
      "Checklist and template creator",
      "Auto-generated landing pages",
      "A/B testing optimization"
    ]
  },
  {
    icon: Target,
    title: "Smart Funnel Builder", 
    description: "Build complete sales funnels with drag-and-drop simplicity and AI optimization.",
    features: [
      "Visual drag-and-drop interface",
      "Pre-built funnel templates",
      "Multi-step form builder",
      "Conversion tracking",
      "Mobile-responsive designs"
    ]
  },
  {
    icon: Mail,
    title: "Intelligent Email Marketing",
    description: "AI-powered email sequences that nurture leads and drive conversions.",
    features: [
      "Smart email sequence builder",
      "Personalized content generation",
      "Behavioral trigger automation",
      "Advanced analytics dashboard",
      "Spam score optimization"
    ]
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Automation",
    description: "Unify all your communication channels in one intelligent platform.",
    features: [
      "WhatsApp Business integration",
      "Instagram DM automation", 
      "Facebook Messenger sync",
      "Unified inbox management",
      "Cross-channel lead tracking"
    ]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics & CRM",
    description: "Get deep insights into your funnel performance and lead behavior.",
    features: [
      "Real-time conversion tracking",
      "Lead scoring and qualification",
      "Revenue attribution analysis",
      "Custom reporting dashboards",
      "Predictive analytics"
    ]
  },
  {
    icon: Sparkles,
    title: "AI Sales Assistant",
    description: "24/7 AI agent that qualifies leads and books meetings automatically.",
    features: [
      "Natural conversation AI",
      "Objection handling scripts",
      "Meeting scheduling integration",
      "Lead qualification scoring",
      "Custom chatbot training"
    ]
  }
];

const advancedFeatures = [
  {
    icon: Bot,
    title: "Voice AI Assistant",
    description: "Voice-powered commands for hands-free funnel management"
  },
  {
    icon: PieChart,
    title: "Advanced Attribution",
    description: "Multi-touch attribution across all marketing channels"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with enterprise-grade data protection"
  },
  {
    icon: Globe,
    title: "Global Localization", 
    description: "Support for 50+ languages and international markets"
  },
  {
    icon: Palette,
    title: "White Label Options",
    description: "Fully customizable branding for agencies and resellers"
  },
  {
    icon: Zap,
    title: "API & Webhooks",
    description: "Extensive API for custom integrations and automation"
  }
];

const integrations = [
  "Salesforce", "HubSpot", "Pipedrive", "Zapier", "Slack", "Google Analytics", 
  "Facebook Ads", "Google Ads", "Shopify", "WooCommerce", "Stripe", "PayPal",
  "Zoom", "Calendly", "Mailchimp", "ActiveCampaign", "Twilio", "WhatsApp Business"
];

export default function Features() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/convertly-logo.png" alt="Convertly" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg" />
              <span className="text-xl sm:text-2xl font-bold text-foreground">CONVERTLY</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Home</Link>
              <Link to="/features" className="text-foreground font-medium">Features</Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Contact</Link>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Login</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link to="/dashboard">Start Free Trial</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
                <Link
                  to="/"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/features"
                  className="block px-3 py-2 text-base font-medium text-foreground bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="px-3 py-2 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Start Free Trial</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🚀 Complete Feature Overview
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Every Tool You Need to{" "}
            <span className="text-primary">
              Convert More Leads
            </span>
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto mb-8">
            Convertly combines the power of AI with proven marketing strategies to give you 
            everything you need to attract, nurture, and convert high-quality leads.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/dashboard">
              Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Six Powerful Tools,{" "}
              <span className="text-primary">One Platform</span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Each feature is designed to work seamlessly together, creating a complete 
              marketing ecosystem that drives real results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 hover:from-primary/5 hover:to-secondary/5">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${[
                      'from-blue-500 to-blue-600',
                      'from-green-500 to-green-600', 
                      'from-purple-500 to-purple-600',
                      'from-red-500 to-red-600',
                      'from-orange-500 to-orange-600',
                      'from-teal-500 to-teal-600'
                    ][index]} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="space-y-3">
                        {feature.features.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
              Advanced Capabilities
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Enterprise-Grade{" "}
              <span className="text-primary">Advanced Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take your marketing to the next level with cutting-edge AI and enterprise features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-primary border-primary/20">
              Seamless Integrations
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Connect With{" "}
              <span className="text-primary">Your Favorite Tools</span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Convertly integrates with all the tools you already use, so you can keep your 
              existing workflow while supercharging your results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600',
                'from-red-500 to-red-600',
                'from-yellow-500 to-yellow-600',
                'from-indigo-500 to-indigo-600',
                'from-pink-500 to-pink-600',
                'from-teal-500 to-teal-600',
                'from-orange-500 to-orange-600'
              ];
              const colorClass = colors[index % colors.length];
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 text-center">
                    <div className={`w-8 h-8 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {integration}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-foreground mb-6">
              Don't see your tool? We're constantly adding new integrations.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Request an Integration
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose{" "}
              <span className="text-primary">Convertly</span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              See how Convertly stacks up against traditional marketing tools and competitors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-semibold text-foreground">Feature</th>
                  <th className="text-center p-6 font-semibold text-primary">Convertly</th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">Traditional Tools</th>
                  <th className="text-center p-6 font-semibold text-muted-foreground">Competitors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-6">AI Lead Magnet Creation</td>
                  <td className="p-6 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-6 text-center text-muted-foreground">Manual</td>
                  <td className="p-6 text-center text-muted-foreground">Limited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Multi-Channel Automation</td>
                  <td className="p-6 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-6 text-center text-muted-foreground">Separate Tools</td>
                  <td className="p-6 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Voice AI Commands</td>
                  <td className="p-6 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                  <td className="p-6 text-center text-muted-foreground">None</td>
                  <td className="p-6 text-center text-muted-foreground">None</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Setup Time</td>
                  <td className="p-6 text-center text-success font-semibold">12 minutes</td>
                  <td className="p-6 text-center text-muted-foreground">Days/Weeks</td>
                  <td className="p-6 text-center text-muted-foreground">Hours</td>
                </tr>
                <tr>
                  <td className="p-6">Monthly Cost</td>
                  <td className="p-6 text-center text-success font-semibold">From $49</td>
                  <td className="p-6 text-center text-muted-foreground">$200-500+</td>
                  <td className="p-6 text-center text-muted-foreground">$99-299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how Convertly can transform your 
            marketing results in just 12 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/pricing">
                View Pricing <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/convertly-logo.png" alt="Convertly" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold">CONVERTLY</span>
              </div>
              <p className="text-white/80">
                Your Smart & Intelligent Marketing OS for converting more visitors into paying customers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-white/80">
                <Link to="/features" className="block hover:text-white transition-colors">Features</Link>
                <Link to="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
                <Link to="/integrations" className="block hover:text-white transition-colors">Integrations</Link>
                <Link to="/api" className="block hover:text-white transition-colors">API</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-white/80">
                <Link to="/about" className="block hover:text-white transition-colors">About</Link>
                <Link to="/blog" className="block hover:text-white transition-colors">Blog</Link>
                <Link to="/careers" className="block hover:text-white transition-colors">Careers</Link>
                <Link to="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-white/80">
                <Link to="/help" className="block hover:text-white transition-colors">Help Center</Link>
                <Link to="/documentation" className="block hover:text-white transition-colors">Documentation</Link>
                <Link to="/status" className="block hover:text-white transition-colors">Status</Link>
                <Link to="/security" className="block hover:text-white transition-colors">Security</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2025 Convertly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}