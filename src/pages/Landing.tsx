import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  Mail
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Lead Magnet Builder",
    description: "AI generates perfect lead magnets (eBooks, quizzes, checklists) based on your business type with auto-built landing pages."
  },
  {
    icon: Target,
    title: "AI Quiz & Form Generator",
    description: "Create dynamic forms that adapt questions based on responses, dramatically increasing conversion rates."
  },
  {
    icon: Mail,
    title: "Auto Funnel + Email Sequences",
    description: "AI generates welcome emails and 3-5 follow-up nurture emails with smart CTAs and booking links."
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Sync",
    description: "Seamlessly integrate WhatsApp, Instagram DMs, Facebook Messenger, and Email in one unified platform."
  },
  {
    icon: BarChart3,
    title: "Smart CRM Lite",
    description: "Auto-categorize leads by interest, source, and stage with detailed analytics and intent signals."
  },
  {
    icon: Sparkles,
    title: "LeadBoost GPT Agent",
    description: "AI agent follows up on cold leads with natural conversations, handles FAQs, and books meetings automatically."
  }
];

const stats = [
  { number: "300%", label: "Average conversion increase" },
  { number: "10k+", label: "Leads generated monthly" },
  { number: "15min", label: "Setup time for full funnel" },
  { number: "24/7", label: "AI lead nurturing" }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Fitness Coach",
    company: "FitLife Studios",
    quote: "LeadGenius AI tripled my consultation bookings in just 2 weeks. The AI follow-ups feel so natural!"
  },
  {
    name: "Marcus Rodriguez",
    role: "Real Estate Agent",
    company: "Premier Properties",
    quote: "I went from 5 leads per month to 150+ qualified prospects. The ROI is incredible."
  },
  {
    name: "Emily Watson",
    role: "Marketing Consultant",
    company: "Growth Labs",
    quote: "This replaced 5 different tools for my agency. My clients are seeing 400% better lead quality."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
              🚀 Powered by Advanced AI Technology
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Generate More{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Qualified Leads
              </span>{" "}
              with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The first AI-powered lead generation OS that creates personalized lead magnets, 
              nurtures prospects automatically, and converts them into paying customers 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/demo">
                  Watch Demo <Zap className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in">
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
              <span className="bg-gradient-success bg-clip-text text-transparent">
                Scale Your Business
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Replace 5+ tools with one AI-powered platform that handles your entire lead generation process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-strong transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
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
              From Setup to Success in{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                15 Minutes
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "AI Creates Your Lead Magnet",
                description: "Tell us your business type and AI generates a perfect lead magnet with landing page in minutes.",
                icon: Megaphone
              },
              {
                step: "02", 
                title: "Capture & Nurture Leads",
                description: "Smart forms capture leads while AI automatically sends personalized follow-up sequences.",
                icon: Users
              },
              {
                step: "03",
                title: "Convert to Customers",
                description: "AI agent qualifies leads, handles objections, and books meetings while you focus on closing deals.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
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
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Customer Success
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                10,000+ Businesses
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              10x Your Leads?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using LeadGenius AI to generate more qualified leads and close more deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/signup">
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/contact">
                Schedule Demo
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}