import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
// Removed unused import
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Users,
  Calendar,
  Headphones
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant answers from our support team",
    detail: "Available 24/7",
    action: "Start Chat",
    primary: true
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our sales team",
    detail: "+1 (555) 123-4567",
    action: "Schedule Call"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions anytime",
    detail: "support@convertly.com",
    action: "Send Email"
  },
  {
    icon: Calendar,
    title: "Demo Booking",
    description: "See Convertly in action with a personalized demo",
    detail: "30-minute sessions",
    action: "Book Demo"
  }
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 500",
    zipcode: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567"
  },
  {
    city: "New York", 
    address: "456 Broadway, Floor 10",
    zipcode: "New York, NY 10013",
    phone: "+1 (555) 987-6543"
  },
  {
    city: "London",
    address: "789 Regent Street",
    zipcode: "London W1B 2AB, UK", 
    phone: "+44 20 1234 5678"
  }
];

const faqs = [
  {
    question: "How quickly can I get started?",
    answer: "You can be up and running in under 12 minutes! Our AI will guide you through setting up your first funnel, and you'll start seeing leads immediately."
  },
  {
    question: "Do you offer implementation support?",
    answer: "Yes! Professional and Enterprise customers get dedicated onboarding and implementation support. We'll help you set up your funnels and ensure you're getting maximum value."
  },
  {
    question: "What kind of businesses use Convertly?",
    answer: "We work with businesses of all sizes - from solo entrepreneurs to Fortune 500 companies. Our customers include coaches, consultants, e-commerce stores, agencies, SaaS companies, and more."
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Absolutely! Convertly integrates with 50+ popular tools including CRMs, email platforms, payment processors, and more. If you don't see an integration, we can build custom connections."
  }
];

export default function Contact() {
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
              <Link to="/contact" className="text-primary font-medium">Contact</Link>
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
            💬 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            We're Here to{" "}
            <span className="text-primary">
              Help You Succeed
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Have questions about Convertly? Ready to see how our AI-powered platform can 
              transform your marketing results? We're here to help you succeed.
            </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>Average response time: 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>Free personalized demo available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>No pressure, genuine help</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Preferred{" "}
              <span className="text-primary">Contact Method</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're available through multiple channels to provide you with the best support experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                method.primary ? "ring-2 ring-primary transform scale-105" : ""
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">
                    {method.detail}
                  </p>
                  <Button 
                    size="sm" 
                    className={method.primary ? "bg-primary hover:bg-primary/90" : ""}
                    variant={method.primary ? "default" : "outline"}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              Send Message
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Send Us a{" "}
              <span className="text-primary">Message</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <Input placeholder="Your company name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What can we help you with? *
                  </label>
                  <select className="w-full p-3 border border-input rounded-md bg-background">
                    <option value="">Select an option</option>
                    <option value="demo">Schedule a demo</option>
                    <option value="pricing">Pricing questions</option>
                    <option value="technical">Technical support</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your business and how we can help..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-sm text-muted-foreground">
                    I agree to receive marketing communications from Convertly. 
                    You can unsubscribe at any time.
                  </p>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Send Message <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">
              Global Presence
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our{" "}
              <span className="text-primary">Office Locations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit us in person at one of our offices around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{office.city}</h3>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>{office.address}</p>
                    <p>{office.zipcode}</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-primary border-primary/20">
              Quick Answers
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get instant answers to the most common questions about Convertly.
            </p>
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
              Can't find what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/help">
                  <Headphones className="w-5 h-5 mr-2" />
                  Visit Help Center
                </Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">
                  <Users className="w-5 h-5 mr-2" />
                  Chat with Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Support Hours
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            We're Available{" "}
            <span className="text-primary">When You Need Us</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground">24/7 Available</p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Phone Support</h3>
              <p className="text-muted-foreground">Mon-Fri 9AM-6PM PST</p>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait - start your free trial today and see how Convertly can transform 
            your business in just 12 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm" asChild>
                <Link to="/pricing">
                  View Pricing <MessageSquare className="ml-2 w-5 h-5" />
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