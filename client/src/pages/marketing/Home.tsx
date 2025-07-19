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
    title: "AI Lead Magnet Builder",
    description: "Generate high-converting lead magnets (eBooks, quizzes, checklists) in minutes, not hours. Our AI understands your industry and creates content that converts."
  },
  {
    icon: Target,
    title: "Smart Funnel Builder",
    description: "Drag-and-drop funnel creation with AI optimization. Build complete sales funnels that guide prospects from awareness to conversion automatically."
  },
  {
    icon: Mail,
    title: "Intelligent Email Sequences",
    description: "AI-crafted email sequences that nurture leads with personalized content, smart timing, and conversion-focused CTAs that book meetings."
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Automation",
    description: "Connect WhatsApp, Instagram, Facebook, and Email in one platform. Never miss a lead across any channel with unified inbox management."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics & CRM",
    description: "Track every lead interaction, analyze conversion paths, and get actionable insights to optimize your marketing performance in real-time."
  },
  {
    icon: Sparkles,
    title: "AI Sales Assistant",
    description: "24/7 AI agent that follows up on leads, handles objections, answers FAQs, and books qualified meetings while you focus on closing deals."
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
    title: "Connect Your Business",
    description: "Tell our AI about your business, target audience, and goals. Takes less than 2 minutes to set up your profile."
  },
  {
    number: "02", 
    title: "AI Creates Your Funnel",
    description: "Our intelligent system builds complete lead magnets, landing pages, and email sequences tailored to your industry."
  },
  {
    number: "03",
    title: "Launch & Convert",
    description: "Go live instantly and watch as qualified leads flow in 24/7 while AI nurtures them into paying customers."
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
              with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The intelligent marketing platform that creates high-converting funnels, 
              nurtures leads automatically, and turns prospects into customers while you sleep.
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 text-sm text-muted-foreground">
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
                <span>Cancel anytime</span>
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
              Everything You Need to{" "}
              <span className="text-primary">
                Scale Your Business
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Replace 8+ marketing tools with one AI-powered platform that handles your entire lead generation and conversion process.
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
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Get Started in{" "}
              <span className="text-primary">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI does the heavy lifting so you can focus on what matters most - growing your business.
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
              <span className="text-primary">Thousands of Businesses</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how businesses like yours are achieving extraordinary results with Convertly.
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses using Convertly to generate more leads, 
            increase conversions, and grow revenue on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Contact Sales <MessageSquare className="ml-2 w-5 h-5" />
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