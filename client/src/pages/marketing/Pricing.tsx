import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
// Removed unused import
import { 
  CheckCircle, 
  X, 
  ArrowRight, 
  Zap, 
  Crown, 
  Rocket,
  Star,
  MessageSquare,
  Phone,
  Users
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for solopreneurs and small businesses getting started",
    icon: Zap,
    badge: null,
    features: [
      "Up to 1,000 leads per month",
      "5 active funnels",
      "AI lead magnet builder",
      "Basic email sequences",
      "Multi-channel sync (3 channels)",
      "Standard analytics",
      "Email support",
      "Mobile app access"
    ],
    notIncluded: [
      "Advanced AI features",
      "Voice commands",
      "White labeling",
      "Custom integrations"
    ]
  },
  {
    name: "Professional", 
    price: 129,
    description: "Ideal for growing businesses and marketing teams",
    icon: Crown,
    badge: "Most Popular",
    features: [
      "Up to 10,000 leads per month",
      "25 active funnels",
      "Advanced AI lead magnet builder",
      "Smart email sequences with AI",
      "Multi-channel sync (all channels)",
      "Advanced analytics & CRM",
      "AI sales assistant",
      "Voice AI commands",
      "Priority support",
      "Advanced integrations",
      "A/B testing",
      "Custom domains"
    ],
    notIncluded: [
      "White labeling",
      "Dedicated success manager"
    ]
  },
  {
    name: "Enterprise",
    price: 299,
    description: "For agencies and large businesses needing maximum power",
    icon: Rocket,
    badge: "Best Value",
    features: [
      "Unlimited leads",
      "Unlimited funnels",
      "Full AI suite with custom training",
      "Advanced email marketing",
      "Multi-channel sync + API",
      "Enterprise analytics",
      "24/7 AI sales assistant",
      "Voice AI + custom commands",
      "White label options",
      "Dedicated success manager",
      "Phone support",
      "Custom integrations",
      "Advanced security",
      "Team collaboration tools",
      "API access"
    ],
    notIncluded: []
  }
];

const faqs = [
  {
    question: "Can I change plans at any time?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
  },
  {
    question: "Is there a free trial?", 
    answer: "Absolutely! All plans come with a 14-day free trial. No credit card required to start, and you can cancel anytime during the trial."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data is yours forever. You can export all your leads, funnels, and analytics at any time. We keep your data for 30 days after cancellation in case you want to reactivate."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes! For large enterprises with specific needs, we offer custom solutions with dedicated infrastructure, advanced security, and custom integrations. Contact our sales team for details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and for annual plans, we can arrange bank transfers. All transactions are secured with 256-bit SSL encryption."
  },
  {
    question: "Is there setup assistance?",
    answer: "Professional and Enterprise plans include dedicated onboarding. Our team will help you set up your first funnel and ensure you're getting maximum value from day one."
  }
];

export default function Pricing() {
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
              <Link to="/pricing" className="text-primary font-medium">Pricing</Link>
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
      <section className="pt-24 pb-16 bg-gradient-hero/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            💰 Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Choose the Perfect Plan{" "}
            <span className="text-primary">
              for Your Business
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. All plans include our core AI features 
            with no hidden fees or surprise charges.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className="text-muted-foreground">Monthly</span>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="toggle" />
              <span className="text-foreground font-medium">Annual (Save 20%)</span>
              <Badge className="bg-success/10 text-success">Save 20%</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.badge === "Most Popular" ? "ring-2 ring-primary transform scale-105" : ""
              }`}>
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full ${plan.badge === "Most Popular" ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={plan.badge === "Most Popular" ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/dashboard">
                      Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              All plans include 14-day free trial • No setup fees • Cancel anytime
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-foreground">4.9/5 customer rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-success" />
                <span className="text-foreground">10,000+ happy customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Calculate Your{" "}
            <span className="text-primary">Potential ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            See how much revenue Convertly could generate for your business.
          </p>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">347%</div>
                  <div className="text-muted-foreground">Average conversion increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success mb-2">$47,000</div>
                  <div className="text-muted-foreground">Additional monthly revenue</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-warning mb-2">2,847x</div>
                  <div className="text-muted-foreground">ROI in first year</div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-muted-foreground mb-4">
                  *Based on average results from businesses using Professional plan
                </p>
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Calculate Your ROI <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-primary border-primary/20">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Got Questions?{" "}
              <span className="text-primary">We Have Answers</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Still have questions? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/contact">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat with Sales
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Call
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
            Ready to Start Converting More Leads?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses using Convertly to grow their revenue.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact">
                Talk to Sales <MessageSquare className="ml-2 w-5 h-5" />
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