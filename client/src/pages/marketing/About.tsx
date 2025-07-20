import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Zap,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
  Globe,
  Menu,
  X,
  Heart,
  Lightbulb,
  Shield,
  Rocket
} from "lucide-react";

const team = [
  {
    name: "Bright W Godwin",
    role: "CEO & Founder", 
    bio: "Expert copywriter and marketer, pastor, and Christian author with deep expertise in conversion-driven marketing strategies.",
    expertise: "Copywriting, Marketing Strategy"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "AI/ML expert with experience at Google and Microsoft. PhD in Computer Science from Stanford.",
    expertise: "AI Development, System Architecture"
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "Product leader with 8+ years at top-tier companies. Expert in user experience and conversion optimization.",
    expertise: "Product Strategy, UX Design"
  },
  {
    name: "David Kim",
    role: "Head of Engineering", 
    bio: "Full-stack engineering leader with 12+ years building scalable platforms for millions of users.",
    expertise: "Engineering, Scalability"
  }
];

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every feature we build is designed to drive real business outcomes and measurable ROI for our customers."
  },
  {
    icon: Heart,
    title: "Customer-Obsessed", 
    description: "We listen to our customers and build solutions that solve their real problems, not what we think they need."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage cutting-edge AI and technology to create solutions that didn't exist before."
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We handle our customers' data with the highest standards of security and privacy protection."
  }
];

const timeline = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Founded by marketing and AI experts who experienced the pain of managing multiple disconnected tools."
  },
  {
    year: "2024", 
    title: "Early Success",
    description: "Launched MVP and helped first 100 customers increase their conversion rates by an average of 300%."
  },
  {
    year: "2025",
    title: "Scale & Growth",
    description: "Now serving 10,000+ businesses worldwide with our AI-powered marketing platform."
  },
  {
    year: "Future",
    title: "Global Impact", 
    description: "Building the world's most intelligent marketing OS to help every business convert more customers."
  }
];

const stats = [
  { number: "10,000+", label: "Active Customers" },
  { number: "50M+", label: "Leads Generated" },
  { number: "347%", label: "Average Conversion Increase" },
  { number: "99.9%", label: "Platform Uptime" }
];

export default function About() {
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
              <Link to="/features" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Features</Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-foreground font-medium">About</Link>
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
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
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
                  className="block px-3 py-2 text-base font-medium text-foreground bg-muted rounded-md"
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🏢 About Convertly
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              We're on a Mission to{" "}
              <span className="text-primary">
                Democratize Marketing Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Born from the frustration of juggling multiple marketing tools, Convertly brings 
              the power of AI-driven marketing automation to businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl leading-relaxed text-gray-700">
                It started with a simple frustration: why did growing a business require juggling 
                8+ different marketing tools? Our founders, experienced in both marketing and AI, 
                knew there had to be a better way.
              </p>
              <p className="text-xl leading-relaxed text-gray-700">
                After years of watching businesses struggle with disconnected tools, missed leads, 
                and manual processes that don't scale, we set out to build the intelligent marketing 
                platform we wished existed.
              </p>
              <p className="text-xl leading-relaxed text-gray-700">
                Today, Convertly combines cutting-edge AI with proven marketing strategies to help 
                businesses of all sizes convert more visitors into paying customers - automatically, 
                intelligently, and at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Building the Future of{" "}
              <span className="text-primary">Marketing Automation</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-16">
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge className="bg-primary/10 text-primary">{item.year}</Badge>
                      <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What Drives Us{" "}
              <span className="text-primary">Every Day</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-primary border-primary/20">
              Leadership Team
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Meet the Team Behind{" "}
              <span className="text-primary">Convertly</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced leaders from top companies who understand both marketing and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <Badge className="bg-success/10 text-success text-xs">
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Our Mission
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Making AI-Powered Marketing{" "}
            <span className="text-primary">Accessible to Everyone</span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We believe every business, regardless of size or technical expertise, should have access 
            to the same powerful marketing automation that only enterprise companies could afford before. 
            Our AI-powered platform levels the playing field, giving every entrepreneur and small business 
            the tools they need to compete and win.
          </p>
          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium">Global Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket className="w-6 h-6 text-success" />
              <span className="text-foreground font-medium">Innovation Driven</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-warning" />
              <span className="text-foreground font-medium">Results Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Thousands of Successful Businesses?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven marketing automation. Start your free trial 
            today and see why businesses trust Convertly to grow their revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Contact Our Team <Users className="ml-2 w-5 h-5" />
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