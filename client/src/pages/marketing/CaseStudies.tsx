import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
// Removed unused import
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  ArrowRight,
  Star,
  Quote,
  Target,
  Zap,
  Mail,
  MessageSquare,
  Clock
} from "lucide-react";

const caseStudies = [
  {
    company: "FitLife Studios",
    industry: "Fitness & Wellness",
    founder: "Sarah Chen",
    role: "Fitness Coach & Entrepreneur",
    challenge: "Sarah was spending 6+ hours daily managing leads from Instagram, Facebook, and her website. She was losing qualified prospects due to delayed follow-ups and had no automated nurturing system.",
    solution: "Implemented Convertly's AI lead magnet builder to create a '7-Day Transformation Challenge' eBook, set up multi-channel automation for Instagram and Facebook, and deployed intelligent email sequences.",
    results: [
      { metric: "Lead Generation", before: "45/month", after: "847/month", improvement: "+1,783%" },
      { metric: "Conversion Rate", before: "8%", after: "34%", improvement: "+325%" },
      { metric: "Monthly Revenue", before: "$12,000", after: "$89,000", improvement: "+642%" },
      { metric: "Time Saved", before: "6 hrs/day", after: "45 min/day", improvement: "87% reduction" }
    ],
    quote: "Convertly didn't just grow my business - it gave me my life back. I'm now helping 10x more people while working fewer hours.",
    timeline: "Results achieved within 6 weeks"
  },
  {
    company: "Premier Properties",
    industry: "Real Estate",
    founder: "Marcus Rodriguez",
    role: "Real Estate Agent",
    challenge: "Marcus struggled with lead qualification and follow-up. Most leads from Facebook ads were unqualified, and he was manually following up with hundreds of prospects weekly.",
    solution: "Created AI-powered property valuation quiz, implemented smart lead scoring system, and set up automated nurture sequences that pre-qualify prospects before booking appointments.",
    results: [
      { metric: "Qualified Leads", before: "12/month", after: "156/month", improvement: "+1,200%" },
      { metric: "Appointment Rate", before: "15%", after: "67%", improvement: "+347%" },
      { metric: "Average Deal Size", before: "$285k", after: "$425k", improvement: "+49%" },
      { metric: "Commission Income", before: "$18k/mo", after: "$127k/mo", improvement: "+606%" }
    ],
    quote: "The AI qualification system is incredible. I only speak to people who are ready to buy or sell. My closing rate has never been higher.",
    timeline: "Results achieved within 8 weeks"
  },
  {
    company: "Growth Labs Digital",
    industry: "Marketing Agency", 
    founder: "Emily Watson",
    role: "Agency Founder",
    challenge: "Emily's agency was struggling to scale due to manual lead generation processes. Each client campaign required extensive setup time, and results were inconsistent across different industries.",
    solution: "Leveraged Convertly's white-label features to offer AI-powered funnel creation as a premium service, automated client onboarding, and standardized high-converting templates across industries.",
    results: [
      { metric: "Client Capacity", before: "8 clients", after: "47 clients", improvement: "+488%" },
      { metric: "Setup Time", before: "2 weeks", after: "2 hours", improvement: "98% reduction" },
      { metric: "Client Results", before: "mixed", after: "consistently 300%+ improvement", improvement: "standardized success" },
      { metric: "Agency Revenue", before: "$45k/mo", after: "$340k/mo", improvement: "+656%" }
    ],
    quote: "Convertly became our secret weapon. We can now deliver enterprise-level results for every client, regardless of industry or budget.",
    timeline: "Results achieved within 12 weeks"
  }
];

const metrics = [
  { number: "847%", label: "Average lead increase", icon: Users },
  { number: "425%", label: "Average conversion boost", icon: Target },
  { number: "$2.3M", label: "Additional revenue generated", icon: DollarSign },
  { number: "92%", label: "Time saved on manual tasks", icon: Clock }
];

const industries = [
  "Fitness & Wellness", "Real Estate", "Marketing Agencies", "E-commerce", 
  "Coaching & Consulting", "SaaS Companies", "Healthcare", "Professional Services"
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/convertly-logo.png" alt="Convertly" className="w-10 h-10 rounded-lg" />
              <span className="text-2xl font-bold text-secondary">CONVERTLY</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-foreground hover:text-primary font-medium transition-colors">Features</Link>
              <Link to="/pricing" className="text-foreground hover:text-primary font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact</Link>
              <Link to="/case-studies" className="text-primary font-medium">Case Studies</Link>
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
      <section className="pt-24 pb-16 bg-gradient-hero/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🏆 Real Success Stories
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            See How Businesses{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transform with Convertly
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Real businesses, real results. Discover how companies across different industries 
            use Convertly to dramatically increase leads, conversions, and revenue.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.number}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="mb-20">
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-5">
                    {/* Company Info */}
                    <div className="lg:col-span-2 bg-gradient-primary p-8 text-white">
                      <div className="mb-6">
                        <Badge className="bg-white/20 text-white mb-4">
                          {study.industry}
                        </Badge>
                        <h2 className="text-3xl font-bold mb-2">{study.company}</h2>
                        <p className="text-white/90">{study.founder}</p>
                        <p className="text-white/80 text-sm">{study.role}</p>
                      </div>
                      
                      <div className="mb-8">
                        <Quote className="w-8 h-8 mb-4 opacity-80" />
                        <blockquote className="text-lg leading-relaxed mb-4">
                          "{study.quote}"
                        </blockquote>
                        <cite className="text-white/80 text-sm">- {study.founder}</cite>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{study.timeline}</span>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="lg:col-span-3 p-8">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-foreground mb-4">The Challenge</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {study.challenge}
                        </p>
                        
                        <h3 className="text-2xl font-bold text-foreground mb-4">The Convertly Solution</h3>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                          {study.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-6">The Results</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {study.results.map((result, resultIndex) => (
                            <Card key={resultIndex} className="border border-primary/20 bg-primary/5">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-foreground mb-2">{result.metric}</h4>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-muted-foreground">Before:</span>
                                  <span className="text-foreground">{result.before}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-muted-foreground">After:</span>
                                  <span className="text-foreground font-semibold">{result.after}</span>
                                </div>
                                <Badge className="bg-success/10 text-success w-full justify-center">
                                  {result.improvement}
                                </Badge>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Coverage */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Proven Across Industries
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Success Stories Across{" "}
              <span className="text-primary">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From fitness coaches to Fortune 500 companies, Convertly delivers results 
              across every business type and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 text-center">
                <CardContent className="p-4">
                  <p className="font-medium text-foreground">{industry}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Don't see your industry? We work with businesses of all types.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Discuss Your Industry
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
              Customer Satisfaction
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Join Thousands of{" "}
              <span className="text-primary">Happy Customers</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">4.9/5</div>
                <p className="text-muted-foreground">Average customer rating</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
                <p className="text-muted-foreground">Active customers worldwide</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">98%</div>
                <p className="text-muted-foreground">Customer retention rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-8">
              Ready to write your own success story?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/dashboard">
                  Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Schedule a Demo <MessageSquare className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Your Success Story Starts Here
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the thousands of businesses already using Convertly to transform 
            their lead generation and skyrocket their revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/pricing">
                View Pricing <BarChart3 className="ml-2 w-5 h-5" />
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
                <Link to="/case-studies" className="block hover:text-white transition-colors">Case Studies</Link>
                <Link to="/blog" className="block hover:text-white transition-colors">Blog</Link>
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