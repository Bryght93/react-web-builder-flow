import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import convertlyLogo from "@assets/ChatGPT Image Jul 20, 2025, 12_30_40 AM_1752968143287.png";
import { 
  Zap, 
  Brain, 
  Target, 
  MessageSquare, 
  BarChart3, 
  Users, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Megaphone,
  Mail,
  Star,
  Quote
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI + Manual Lead Magnets",
    description: "Choose your approach: Use AI to generate lead magnets instantly, customize from 50+ templates, or build from scratch with full creative control."
  },
  {
    icon: Target,
    title: "Complete Funnel System",
    description: "Start with 5-10 step proven funnel templates, let AI adapt them to your brand, or build custom funnels with drag-and-drop editor and AI assistance."
  },
  {
    icon: Megaphone,
    title: "Direct Ad Launch Platform",
    description: "Create and launch ads directly to Facebook, Instagram, Google, TikTok, and LinkedIn. AI generates copy and creatives, or upload your own assets."
  },
  {
    icon: Mail,
    title: "Advanced Email Marketing",
    description: "Access 5-10 step email sequences, let AI customize for your brand, use templates, or create from scratch. Full manual control with AI enhancement."
  },
  {
    icon: TrendingUp,
    title: "Launch Planning Suite",
    description: "Complete launch planner with AI asset creation, evergreen webinars, course selling, and affiliate management - all with expert-level control."
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Control Center",
    description: "Manage WhatsApp, Instagram, Facebook, Email, and SMS from one dashboard. AI automation with full manual override capabilities."
  }
];

const stats = [
  { number: "347%", label: "Average conversion increase" },
  { number: "25k+", label: "Leads generated monthly" },
  { number: "12min", label: "Setup time for complete funnel" },
  { number: "24/7", label: "AI lead nurturing" }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Fitness Coach",
    company: "FitLife Studios",
    quote: "Convertly transformed my business. I went from 10 leads per month to 400+ qualified prospects. The AI follow-up sequences are incredible - they feel completely natural!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Real Estate Agent", 
    company: "Premier Properties",
    quote: "This platform replaced 6 different tools and increased my lead quality by 300%. I'm closing more deals with less effort than ever before.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Marketing Consultant",
    company: "Growth Labs Digital",
    quote: "My agency clients are seeing 5x better ROI with Convertly. The AI creates content that would take our team weeks to produce. Absolute game-changer.",
    rating: 5
  }
];

const steps = [
  {
    number: "01",
    title: "Choose Your Approach",
    description: "Pick AI automation, use proven templates, or build manually. Switch between modes anytime with full data portability."
  },
  {
    number: "02", 
    title: "Build & Customize Everything",
    description: "Create funnels, emails, ads, and landing pages. Use our 5-10 step templates, AI generation, or start from scratch with full control."
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "Deploy across all channels, run ads directly from the platform, and scale with AI assistance or manual optimization."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={convertlyLogo} alt="Convertly" className="w-10 h-10" />
              <span className="text-2xl font-bold text-secondary">CONVERTLY</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-foreground hover:text-primary font-medium transition-colors">Features</Link>
              <Link to="/pricing" className="text-foreground hover:text-primary font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact</Link>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              🚀 Your Smart & Intelligent Marketing OS
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Convert More Visitors{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Into Paying Customers
              </span>{" "}
              with AI + Expert Control
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto mb-8">
              The complete marketing platform that combines AI automation with full manual control. 
              Create funnels, run ads, build emails, and launch campaigns - your way, enhanced by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90" asChild>
                <Link to="/dashboard">
                  Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/features">
                  See How It Works <Zap className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Full control + AI power</span>
              </div>
            </div>

            {/* Visual Feature Preview */}
            <div className="mt-16 relative">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto border">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                      <Megaphone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Launch Ads Directly</h3>
                    <p className="text-sm text-muted-foreground">Create and launch ads to all major platforms from one dashboard</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">5-10 Step Templates</h3>
                    <p className="text-sm text-muted-foreground">Proven funnel and email sequences ready to customize</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Expert Control</h3>
                    <p className="text-sm text-muted-foreground">Full manual control with AI enhancement when you need it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              AI-Powered Tools with{" "}
              <span className="text-primary">
                Expert-Level Control
              </span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Choose your workflow: Full AI automation, manual precision control, or the perfect blend. 
              Built for experts who want both speed and complete customization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
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

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
              Your Choice, Your Control
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Three Ways to{" "}
              <span className="text-primary">Build & Launch</span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Whether you prefer AI speed, proven templates, or building from scratch - 
              Convertly adapts to your expertise and workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-primary border-primary/20">
              Customer Success
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by{" "}
              <span className="text-primary">Expert Marketers Worldwide</span>
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              See how marketing professionals achieve extraordinary results by combining 
              AI power with expert-level control in Convertly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Launch, Scale & Convert Like a Pro?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get full marketing control with AI acceleration. Create funnels, launch ads, 
            run campaigns, and scale revenue - all from one powerful platform.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8 text-white/90">
            <div className="text-center">
              <Megaphone className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">Direct ad launching to all platforms</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">5-10 step proven templates ready</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">Launch planner with AI asset creation</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                See All Features <MessageSquare className="ml-2 w-5 h-5" />
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
                <img src={convertlyLogo} alt="Convertly" className="w-8 h-8" />
                <span className="text-xl font-bold">CONVERTLY</span>
              </div>
              <p className="text-white/80 mb-4">
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