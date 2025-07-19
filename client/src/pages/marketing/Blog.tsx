import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import convertlyLogo from "@assets/ChatGPT Image Jul 20, 2025, 12_30_40 AM_1752968143287.png";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Bookmark,
  Share2,
  TrendingUp,
  Brain,
  Target,
  MessageSquare,
  Search,
  Filter
} from "lucide-react";

const featuredPost = {
  title: "The Complete Guide to AI-Powered Lead Generation in 2025",
  excerpt: "Discover how artificial intelligence is revolutionizing lead generation and how businesses are using AI to increase conversions by 300% or more.",
  author: "Sarah Chen",
  date: "January 15, 2025",
  readTime: "12 min read",
  category: "AI Marketing",
  featured: true
};

const blogPosts = [
  {
    title: "10 Proven Email Sequences That Convert Cold Leads into Customers",
    excerpt: "Learn the exact email templates and sequences that top marketers use to nurture leads and drive sales on autopilot.",
    author: "Marcus Rodriguez", 
    date: "January 12, 2025",
    readTime: "8 min read",
    category: "Email Marketing",
    tags: ["Email", "Automation", "Conversion"]
  },
  {
    title: "How to Create Lead Magnets That Generate 1000+ Leads Per Month",
    excerpt: "Step-by-step guide to creating irresistible lead magnets that attract your ideal customers and build your email list fast.",
    author: "Emily Watson",
    date: "January 10, 2025", 
    readTime: "10 min read",
    category: "Lead Generation",
    tags: ["Lead Magnets", "Content", "Growth"]
  },
  {
    title: "Multi-Channel Marketing: Why 73% of Customers Prefer Omnichannel Experiences",
    excerpt: "Research shows customers want consistent experiences across all channels. Here's how to deliver that with automation.",
    author: "David Kim",
    date: "January 8, 2025",
    readTime: "6 min read",
    category: "Strategy",
    tags: ["Omnichannel", "Customer Experience", "Automation"]
  },
  {
    title: "Case Study: How FitLife Studios Grew from $12K to $89K Monthly Revenue",
    excerpt: "Deep dive into exactly how one fitness coach used Convertly to 7x their revenue in just 6 weeks.",
    author: "Sarah Chen",
    date: "January 5, 2025",
    readTime: "15 min read", 
    category: "Case Studies",
    tags: ["Case Study", "Success Story", "Fitness"]
  },
  {
    title: "The Psychology of High-Converting Landing Pages: 15 Science-Backed Tips",
    excerpt: "Use cognitive psychology to design landing pages that convert visitors into leads at rates of 25% or higher.",
    author: "Emily Watson",
    date: "January 3, 2025",
    readTime: "9 min read",
    category: "Conversion",
    tags: ["Psychology", "Landing Pages", "CRO"]
  },
  {
    title: "AI Chatbots vs. Human Sales Reps: The Surprising Truth About Conversion Rates",
    excerpt: "New data reveals when AI chatbots outperform human sales reps and how to use both for maximum results.",
    author: "Marcus Rodriguez",
    date: "December 30, 2024",
    readTime: "7 min read",
    category: "AI Marketing",
    tags: ["AI", "Chatbots", "Sales"]
  }
];

const categories = [
  { name: "All Posts", count: 47 },
  { name: "AI Marketing", count: 12 },
  { name: "Lead Generation", count: 15 },
  { name: "Email Marketing", count: 8 },
  { name: "Conversion", count: 7 },
  { name: "Case Studies", count: 5 }
];

const popularTags = [
  "AI", "Automation", "Lead Generation", "Email Marketing", "Conversion", 
  "Case Studies", "Strategy", "Growth", "CRO", "Analytics"
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img src={convertlyLogo} alt="Convertly" className="w-10 h-10" />
              <span className="text-2xl font-bold text-secondary">CONVERTLY</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-foreground hover:text-primary font-medium transition-colors">Features</Link>
              <Link to="/pricing" className="text-foreground hover:text-primary font-medium transition-colors">Pricing</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact</Link>
              <Link to="/blog" className="text-primary font-medium">Blog</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              📚 Convertly Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Learn. Grow.{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Convert More
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Expert insights, proven strategies, and actionable tips to help you master 
              AI-powered marketing and grow your business faster.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Featured Article
            </Badge>
          </div>

          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-primary p-8 text-white flex items-center">
                  <div>
                    <Badge className="bg-white/20 text-white mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-white/80 mb-6">
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="lg">
                      Read Article <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-primary/10 p-8 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                        <span className="text-foreground">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="border-0 shadow-lg bg-gradient-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Get Weekly Tips</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Join 10,000+ marketers getting weekly insights on AI-powered lead generation.
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 text-foreground bg-white rounded-lg focus:outline-none"
                    />
                    <Button variant="secondary" size="sm" className="w-full">
                      Subscribe Free
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-primary/10 text-primary">
                          {post.category}
                        </Badge>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Bookmark className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                          <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Put These Strategies to Work?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stop reading about success and start creating it. Try Convertly free for 14 days 
            and implement these proven strategies in your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/case-studies">
                View Case Studies <TrendingUp className="ml-2 w-5 h-5" />
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