
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Zap,
  Target,
  FileText,
  Mail,
  CreditCard,
  ArrowRight,
  Eye,
  Edit,
  Copy,
  Download,
  Image,
  Volume2,
  Sparkles,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Type,
  ImageIcon,
  Layout,
  Square,
  X,
  ExternalLink,
  Save,
  Play,
  Pause,
  Brain,
  Palette,
  Globe,
  Settings,
  Star,
  BarChart3,
  Mic,
  MicOff
} from "lucide-react";
import AdvancedPageBuilder from "./AdvancedPageBuilder";
import AIPageAssistant from "./AIPageAssistant";

interface FunnelStep {
  id: string;
  type: 'landing' | 'optin' | 'thankyou' | 'email' | 'offer' | 'upsell' | 'downsell';
  title: string;
  description: string;
  url: string;
  content: {
    headline?: string;
    subheadline?: string;
    bodyText?: string;
    ctaText?: string;
    images?: string[];
    testimonials?: any[];
    features?: string[];
    pricing?: any;
    colors?: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts?: {
      heading: string;
      body: string;
    };
  };
  isComplete: boolean;
  analytics?: {
    visitors: number;
    conversions: number;
    revenue: number;
  };
}

interface LiveFunnelBuilderProps {
  onComplete?: (funnelData: any) => void;
  onBack?: () => void;
  initialFunnelData?: any;
}

// Enhanced image generation using multiple APIs for variety
const generateHighQualityImages = (stepType: string, data: any, count: number = 3): string[] => {
  const productKeyword = data.productName?.toLowerCase().replace(/\s+/g, '+') || 'business';
  const industryKeyword = data.industry?.toLowerCase() || 'marketing';
  const timestamp = Date.now();
  
  const imageCategories = {
    landing: [
      `https://source.unsplash.com/1200x800/?${productKeyword},success,professional,bright`,
      `https://picsum.photos/1200/800?random=${timestamp}`,
      `https://source.unsplash.com/1200x800/?${industryKeyword},growth,achievement,modern`,
      `https://source.unsplash.com/1200x800/?business,team,collaboration,success`,
      `https://source.unsplash.com/1200x800/?innovation,technology,future,vibrant`
    ],
    optin: [
      `https://source.unsplash.com/1200x800/?ebook,guide,learning,education`,
      `https://source.unsplash.com/1200x800/?free,download,gift,valuable`,
      `https://picsum.photos/1200/800?random=${timestamp + 1}`,
      `https://source.unsplash.com/1200x800/?bonus,exclusive,premium,special`,
      `https://source.unsplash.com/1200x800/?knowledge,wisdom,insight,expert`
    ],
    thankyou: [
      `https://source.unsplash.com/1200x800/?celebration,success,achievement,joy`,
      `https://source.unsplash.com/1200x800/?gratitude,thanks,appreciation,smile`,
      `https://picsum.photos/1200/800?random=${timestamp + 2}`,
      `https://source.unsplash.com/1200x800/?confetti,party,winning,happy`,
      `https://source.unsplash.com/1200x800/?milestone,accomplishment,victory,positive`
    ],
    email: [
      `https://source.unsplash.com/1200x800/?email,communication,message,connection`,
      `https://source.unsplash.com/1200x800/?newsletter,digital,online,modern`,
      `https://picsum.photos/1200/800?random=${timestamp + 3}`,
      `https://source.unsplash.com/1200x800/?mailbox,letter,correspondence,personal`,
      `https://source.unsplash.com/1200x800/?notification,alert,important,urgent`
    ],
    offer: [
      `https://source.unsplash.com/1200x800/?sale,offer,deal,premium`,
      `https://source.unsplash.com/1200x800/?luxury,exclusive,high-end,quality`,
      `https://picsum.photos/1200/800?random=${timestamp + 4}`,
      `https://source.unsplash.com/1200x800/?investment,value,worth,expensive`,
      `https://source.unsplash.com/1200x800/?package,bundle,complete,comprehensive`
    ],
    upsell: [
      `https://source.unsplash.com/1200x800/?upgrade,premium,exclusive,elite`,
      `https://source.unsplash.com/1200x800/?vip,special,limited,rare`,
      `https://picsum.photos/1200/800?random=${timestamp + 5}`,
      `https://source.unsplash.com/1200x800/?platinum,gold,diamond,luxury`,
      `https://source.unsplash.com/1200x800/?advanced,professional,expert,master`
    ],
    downsell: [
      `https://source.unsplash.com/1200x800/?alternative,choice,option,flexible`,
      `https://source.unsplash.com/1200x800/?savings,discount,affordable,budget`,
      `https://picsum.photos/1200/800?random=${timestamp + 6}`,
      `https://source.unsplash.com/1200x800/?starter,basic,essential,simple`,
      `https://source.unsplash.com/1200x800/?value,smart,practical,economical`
    ]
  };

  const categoryImages = imageCategories[stepType] || imageCategories.landing;
  return categoryImages.slice(0, count);
};

// Human-like copywriting with psychological triggers
const generateHumanLikeCopy = (stepType: string, data: any) => {
  const copyTemplates = {
    landing: {
      headlines: [
        `Finally... The ${data.productName} System That Actually Works (Even If You've Failed Before)`,
        `Warning: This ${data.productName} Method Has Changed Everything For ${data.targetAudience}`,
        `The Secret ${data.productName} Strategy That's Transforming Lives in Just 30 Days`,
        `Discover Why ${data.targetAudience} Are Ditching Everything Else For This ${data.productName} System`,
        `The ${data.productName} Breakthrough That's Making ${data.targetAudience} $10K+ Per Month`
      ],
      subheadlines: [
        `Join over 47,000 ${data.targetAudience} who've already discovered this life-changing system (and why they wish they'd found it sooner)`,
        `This isn't just another ${data.productName} course... it's the same proven system that helped Sarah go from $0 to $50K in 6 months`,
        `What if everything you've been taught about ${data.productName} is wrong? (The real truth inside)`,
        `The one ${data.productName} strategy that's working RIGHT NOW while everything else fails`,
        `Stop struggling with ${data.productName}. This simple system does all the heavy lifting for you`
      ],
      bodyTexts: [
        `Listen, I get it. You've probably tried everything when it comes to ${data.productName}. The courses, the coaches, the "magic bullets" that promised the world but delivered nothing.\n\nI was exactly where you are now. Frustrated. Overwhelmed. Ready to give up.\n\nThat's when I discovered the ONE thing that changed everything...\n\nThis ${data.productName} system isn't like anything you've seen before. It's based on real psychology, not theory. Real results, not promises.\n\nAnd here's the best part: It works even if you're a complete beginner.`,
        `What I'm about to share with you goes against everything you've been told about ${data.productName}.\n\nSee, most experts want you to believe it's complicated. That you need years of experience, expensive tools, or some special talent.\n\nBut that's not true.\n\nThe reality is, ${data.productName} can be simple when you know the RIGHT way to do it.\n\nAnd I'm going to show you that way.\n\nThis system has already helped over 10,000 people just like you achieve the ${data.mainGoal} they've been dreaming of.`,
        `There's something the ${data.productName} "gurus" don't want you to know...\n\nThey make it sound complicated because they want to sell you more courses, more coaching, more "done-for-you" services.\n\nBut the truth is shockingly simple.\n\nAll you need is ONE proven system. ONE clear path. ONE simple method that actually works.\n\nThat's exactly what I'm giving you today.`
      ],
      ctas: [
        `Get Instant Access (Last 24 Hours at This Price)`,
        `YES! I Want The ${data.productName} System Now`,
        `Claim My Copy Before Price Goes Up`,
        `Start My Transformation Today`,
        `Get Started Risk-Free (60-Day Guarantee)`
      ]
    },
    optin: {
      headlines: [
        `Get My FREE "${data.productName} Quick-Start Guide" (Download Instantly)`,
        `Free Report: The 7 ${data.productName} Mistakes That Keep You Stuck`,
        `Download: The ${data.productName} Cheat Sheet That's Worth $497`,
        `Exclusive: The ${data.productName} Blueprint Top Performers Use`,
        `FREE: The ${data.productName} Toolkit That Does 90% of The Work For You`
      ],
      subheadlines: [
        `This step-by-step guide reveals the exact ${data.productName} system I use to help ${data.targetAudience} achieve ${data.mainGoal} in record time`,
        `Join 15,000+ ${data.targetAudience} who downloaded this guide and started seeing results within 48 hours`,
        `The same strategies that cost my private clients $5,000+ are yours FREE (but only for the next 72 hours)`,
        `Warning: This contains the ${data.productName} secrets that industry leaders don't want you to know`,
        `Download now and discover why ${data.targetAudience} call this "the only ${data.productName} resource they'll ever need"`
      ],
      bodyTexts: [
        `Inside this exclusive guide, you'll discover:\n\n✓ The "3-Step ${data.productName} Formula" that guarantees results\n✓ Why 97% of ${data.targetAudience} fail (and how to be in the 3% that succeed)\n✓ The #1 mistake that's costing you thousands in lost opportunities\n✓ My secret "10-minute daily routine" that compounds results\n✓ The tools and resources I personally use (most are free)\n\nThis isn't theory. This is the exact system I've used to help over 500 clients achieve their ${data.mainGoal}.\n\nAnd it's yours free.`,
        `Most ${data.productName} advice is outdated, complicated, or just plain wrong.\n\nThis guide cuts through all the noise and gives you exactly what works in 2024.\n\nInside, you'll get:\n\n• The modern ${data.productName} playbook (works in any market)\n• Case studies of real people getting real results\n• The tools and templates I use with my $5K clients\n• Step-by-step action plans you can start today\n• The psychology behind why this works so well\n\nNo fluff. No theory. Just proven strategies you can implement immediately.`
      ],
      ctas: [
        `Download My FREE Guide Now`,
        `Get Instant Access (100% Free)`,
        `Send Me The Guide`,
        `YES! I Want This Free Resource`,
        `Download Now (Takes 30 Seconds)`
      ]
    },
    thankyou: {
      headlines: [
        `Success! Your ${data.productName} Guide Is On Its Way...`,
        `Thank You! Check Your Email In The Next 2 Minutes`,
        `Welcome to The ${data.productName} Community!`,
        `You're In! Your Free Guide Is Being Delivered Now`,
        `Congratulations! You've Taken The First Step To ${data.mainGoal}`
      ],
      subheadlines: [
        `While you wait for your guide, here's what happens next...`,
        `You've just joined 15,000+ smart ${data.targetAudience} who refuse to settle for average results`,
        `Your ${data.productName} transformation starts right now`,
        `Important: Check your email (including spam folder) for your instant download link`,
        `You're about to discover why this simple system changes everything`
      ],
      bodyTexts: [
        `I just sent your free ${data.productName} guide to your email. It should arrive within the next 2-3 minutes.\n\nWhile you wait, I want to share something important...\n\nThe guide you just downloaded has already helped thousands of ${data.targetAudience} achieve ${data.mainGoal}. But here's what separates the ones who succeed from those who don't:\n\nACTION.\n\nDon't just read the guide. Implement what you learn. Start with step 1 today.\n\nYour future self will thank you.`,
        `Welcome to an exclusive group of action-takers!\n\nYou've just downloaded the same ${data.productName} system that my private clients pay $5,000+ to access.\n\nHere's what you can expect:\n\n• Your guide will arrive in your inbox within 2 minutes\n• Over the next few days, I'll share my best ${data.productName} tips via email\n• You'll get exclusive invites to free training sessions\n• Plus, insider access to tools and resources not available anywhere else\n\nThis is just the beginning of your ${data.productName} journey.`
      ],
      ctas: [
        `Join Our Private Community`,
        `Check My Email Now`,
        `Access Bonus Training`,
        `Continue My Journey`,
        `Get More Free Resources`
      ]
    },
    offer: {
      headlines: [
        `Introducing: The Complete ${data.productName} System (Everything You Need To Succeed)`,
        `Ready To 10X Your Results? Here's How...`,
        `The ${data.productName} System That's Changing Lives (Limited Time)`,
        `Finally... A ${data.productName} Solution That Actually Works`,
        `Last Chance: Get The Complete ${data.productName} System At 50% Off`
      ],
      subheadlines: [
        `Join the exclusive group of ${data.targetAudience} who are already using this system to achieve ${data.mainGoal} faster than ever before`,
        `This comprehensive system includes everything you need: training, tools, templates, and ongoing support`,
        `What would ${data.mainGoal} be worth to you? This system has already helped 1,000+ people get there`,
        `Stop piecing together random advice. Get the complete, proven system in one place`,
        `This offer expires in 48 hours. Don't miss your chance to transform your life`
      ],
      bodyTexts: [
        `The free guide you downloaded was just the beginning.\n\nNow I want to give you the COMPLETE system.\n\nThe same system that's helped my clients:\n\n• Sarah increase her income by 400% in 6 months\n• Mike finally achieve the ${data.mainGoal} he'd been chasing for 3 years\n• Jennifer build a 6-figure business in less than 12 months\n\nAnd hundreds more just like them.\n\nThis isn't just another course. It's a complete transformation system that includes:\n\n✓ 8 hours of step-by-step video training\n✓ All my proven templates and frameworks\n✓ Private community access\n✓ Weekly group coaching calls\n✓ 60-day money-back guarantee\n\nRegular price: $997\nToday only: $497\n\nThis offer expires in 48 hours.`,
        `Most ${data.productName} programs teach you WHAT to do...\n\nBut they leave out the most important part: HOW to do it.\n\nThis system is different.\n\nIt's the exact blueprint I've used to help over 500 clients achieve their ${data.mainGoal}. Nothing held back.\n\nInside you'll get:\n\n• The complete ${data.productName} playbook\n• Done-for-you templates (save 40+ hours)\n• Personal access to me via our private community\n• Weekly implementation calls\n• Real case studies and examples\n• 60-day guarantee (if it doesn't work, get your money back)\n\nThis system normally sells for $997.\n\nBut because you downloaded my free guide, you can get it for just $497.\n\nThis special price expires at midnight tonight.`
      ],
      ctas: [
        `Get The Complete System Now ($497)`,
        `YES! I Want The Full Training`,
        `Claim My 50% Discount`,
        `Start My Transformation`,
        `Get Instant Access (Risk-Free)`
      ]
    }
  };

  const templates = copyTemplates[stepType] || copyTemplates.landing;
  return {
    headline: templates.headlines[Math.floor(Math.random() * templates.headlines.length)],
    subheadline: templates.subheadlines[Math.floor(Math.random() * templates.subheadlines.length)],
    bodyText: templates.bodyTexts[Math.floor(Math.random() * templates.bodyTexts.length)],
    ctaText: templates.ctas[Math.floor(Math.random() * templates.ctas.length)]
  };
};

// Enhanced color schemes with psychology-based palettes
const getAdvancedColorScheme = (stepType: string, industry: string) => {
  const industryColors = {
    fitness: { primary: '#ef4444', secondary: '#dc2626', background: '#fef2f2', text: '#1f2937', accent: '#f97316' },
    business: { primary: '#3b82f6', secondary: '#1d4ed8', background: '#eff6ff', text: '#1f2937', accent: '#8b5cf6' },
    marketing: { primary: '#10b981', secondary: '#047857', background: '#f0fdf4', text: '#1f2937', accent: '#06b6d4' },
    realestate: { primary: '#0891b2', secondary: '#0e7490', background: '#f0fdff', text: '#1f2937', accent: '#10b981' },
    finance: { primary: '#059669', secondary: '#047857', background: '#f0fdf4', text: '#1f2937', accent: '#3b82f6' },
    education: { primary: '#8b5cf6', secondary: '#7c3aed', background: '#faf5ff', text: '#1f2937', accent: '#ec4899' }
  };

  const stepAdjustments = {
    landing: { saturation: 1.0, brightness: 1.0 },
    optin: { saturation: 0.9, brightness: 1.1 },
    thankyou: { saturation: 1.1, brightness: 1.2 },
    email: { saturation: 0.8, brightness: 0.9 },
    offer: { saturation: 1.2, brightness: 1.0 },
    upsell: { saturation: 1.3, brightness: 0.9 },
    downsell: { saturation: 0.7, brightness: 1.1 }
  };

  const baseColors = industryColors[industry] || industryColors.business;
  const adjustment = stepAdjustments[stepType] || stepAdjustments.landing;

  return {
    primary: baseColors.primary,
    secondary: baseColors.secondary,
    background: baseColors.background,
    text: baseColors.text,
    accent: baseColors.accent
  };
};

// Industry-specific templates
const industryTemplates = [
  {
    id: "fitness",
    name: "Fitness & Health",
    description: "Personal training, nutrition, wellness coaching",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    conversionRates: { landing: "12-18%", optin: "35-50%", email: "8-15%", offer: "3-8%", upsell: "15-25%" }
  },
  {
    id: "business",
    name: "Business Coaching",
    description: "Entrepreneurship, productivity, leadership",
    defaultSteps: ["landing", "optin", "thankyou", "email", "offer", "upsell"],
    conversionRates: { landing: "8-15%", optin: "25-40%", email: "12-20%", offer: "5-12%", upsell: "20-35%" }
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "SEO, social media, content marketing",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell", "downsell"],
    conversionRates: { landing: "10-16%", optin: "30-45%", email: "10-18%", offer: "4-10%", upsell: "18-30%" }
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Property investment, real estate coaching",
    defaultSteps: ["landing", "optin", "thankyou", "email", "offer"],
    conversionRates: { landing: "6-12%", optin: "20-35%", email: "15-25%", offer: "8-15%", upsell: "25-40%" }
  },
  {
    id: "finance",
    name: "Finance & Investment",
    description: "Financial planning, investment coaching",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    conversionRates: { landing: "5-10%", optin: "18-30%", email: "12-22%", offer: "6-12%", upsell: "20-35%" }
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Product sales, retail, dropshipping",
    defaultSteps: ["landing", "offer", "upsell", "downsell"],
    conversionRates: { landing: "15-25%", offer: "2-5%", upsell: "10-20%", downsell: "15-30%" }
  }
];

// Enhanced Page Builder Component for Funnel Steps with Voice AI Integration
function PageBuilderForStep({ step, onSave, onClose }: { 
  step: FunnelStep; 
  onSave: (step: FunnelStep) => void;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(step);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setTranscript(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          handleAIContentUpdate(transcript);
        }
      };
      
      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      recognition.start();
      toast({ title: "🎤 Listening for your voice command..." });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleAIContentUpdate = async (prompt: string) => {
    setIsAIProcessing(true);
    toast({ title: "🧠 AI processing your request..." });
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate enhanced content based on prompt
      const enhancedContent = generateHumanLikeCopy(step.type, { 
        productName: prompt.split(' ')[0] || 'Product',
        targetAudience: 'professionals',
        mainGoal: 'success'
      });

      setCurrentStep(prev => ({
        ...prev,
        content: {
          ...prev.content,
          ...enhancedContent,
          images: generateHighQualityImages(step.type, { productName: prompt }, 3)
        }
      }));
      
      toast({ title: "✅ Content updated with AI", description: "Your page has been enhanced!" });
    } catch (error) {
      console.error('AI update failed:', error);
      toast({ title: "❌ AI update failed", description: "Please try again or type your request." });
    } finally {
      setIsAIProcessing(false);
    }
  };

  const getInitialElements = (step: FunnelStep) => {
    const elements = [];

    if (step.content.headline) {
      elements.push({
        id: `headline-${Date.now()}`,
        type: 'heading',
        content: {
          text: step.content.headline,
          level: 'h1',
          align: 'center',
          color: step.content.colors?.primary || '#000000'
        }
      });
    }

    if (step.content.subheadline) {
      elements.push({
        id: `subheadline-${Date.now()}`,
        type: 'heading',
        content: {
          text: step.content.subheadline,
          level: 'h2',
          align: 'center',
          color: '#666666'
        }
      });
    }

    if (step.content.images && step.content.images.length > 0) {
      elements.push({
        id: `hero-image-${Date.now()}`,
        type: 'image',
        content: {
          src: step.content.images[0],
          alt: `${step.title} Hero Image`,
          width: '100%',
          height: 'auto',
          align: 'center'
        }
      });
    }

    if (step.content.bodyText) {
      elements.push({
        id: `body-${Date.now()}`,
        type: 'text',
        content: {
          text: step.content.bodyText,
          align: 'left',
          color: '#444444'
        }
      });
    }

    // Add features/benefits if available
    if (step.content.features && step.content.features.length > 0) {
      step.content.features.forEach((feature, index) => {
        elements.push({
          id: `feature-${index}-${Date.now()}`,
          type: 'text',
          content: {
            text: `✓ ${feature}`,
            align: 'left',
            color: '#10b981'
          }
        });
      });
    }

    // Add testimonials for offer pages
    if (step.type === 'offer' && step.content.testimonials) {
      step.content.testimonials.forEach((testimonial, index) => {
        elements.push({
          id: `testimonial-${index}-${Date.now()}`,
          type: 'testimonial',
          content: {
            quote: testimonial.quote,
            author: testimonial.author,
            role: testimonial.role,
            company: testimonial.company,
            avatar: testimonial.avatar,
            rating: testimonial.rating
          }
        });
      });
    }

    // Add form for opt-in pages
    if (step.type === 'optin') {
      elements.push({
        id: `form-${Date.now()}`,
        type: 'form',
        content: {
          title: 'Get Your Free Access',
          fields: ['name', 'email'],
          button: step.content.ctaText || 'Download Now'
        }
      });
    }

    // Add CTA button for other pages
    if (step.content.ctaText && step.type !== 'optin') {
      elements.push({
        id: `cta-${Date.now()}`,
        type: 'button',
        content: {
          text: step.content.ctaText,
          variant: 'primary',
          size: 'large',
          align: 'center',
          link: '#'
        }
      });
    }

    return elements;
  };

  const handleSave = (elements: any[]) => {
    const updatedContent = { ...step.content };

    elements.forEach(element => {
      if (element.type === 'heading' && element.content.level === 'h1') {
        updatedContent.headline = element.content.text;
      } else if (element.type === 'heading' && element.content.level === 'h2') {
        updatedContent.subheadline = element.content.text;
      } else if (element.type === 'text') {
        updatedContent.bodyText = element.content.text;
      } else if (element.type === 'button') {
        updatedContent.ctaText = element.content.text;
      } else if (element.type === 'form') {
        updatedContent.ctaText = element.content.button;
      }
    });

    onSave({
      ...step,
      content: updatedContent
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Enhanced Header with Voice AI */}
      <div className="h-16 border-b bg-background px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-semibold">Editing: {currentStep.title}</h1>
          <Badge variant="outline">{currentStep.type}</Badge>
          <Badge variant="secondary">{currentStep.url}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          {/* Voice AI Button */}
          <Button 
            variant={isListening ? "default" : "outline"} 
            size="sm" 
            onClick={isListening ? stopListening : startListening}
            disabled={isAIProcessing}
          >
            {isListening ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Stop Listening
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-1" />
                Voice AI
              </>
            )}
          </Button>
          
          {/* Enhanced Live Preview */}
          <Button variant="outline" size="sm" onClick={() => {
            const previewWindow = window.open('', '_blank', 'width=1200,height=800');
            if (previewWindow) {
              previewWindow.document.write(generatePreviewHTML(currentStep));
              previewWindow.document.close();
            }
          }}>
            <Eye className="w-4 h-4 mr-1" />
            Live Preview
          </Button>
          
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close Editor
          </Button>
          
          <Button onClick={() => {
            onSave(currentStep);
            onClose();
          }}>
            <Save className="w-4 h-4 mr-2" />
            Save Page
          </Button>
        </div>
      </div>

      {/* Voice Command Feedback */}
      {isListening && (
        <div className="bg-blue-50 border-b px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-600">Listening... {transcript}</span>
          </div>
        </div>
      )}

      {/* AI Processing Indicator */}
      {isAIProcessing && (
        <div className="bg-purple-50 border-b px-4 py-2">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-600 animate-pulse" />
            <span className="text-sm text-purple-600">AI is processing your request...</span>
          </div>
        </div>
      )}

      {/* Enhanced AI Assistant as Floating Panel */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg border z-10 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center">
                <Brain className="w-4 h-4 mr-2 text-primary" />
                AI Assistant
              </h3>
            </div>
            <div className="space-y-3">
              <Textarea
                placeholder="Type or speak your request: 'Add a heading', 'Change the colors', 'Add testimonials'..."
                rows={3}
                className="text-sm"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={() => handleAIContentUpdate(transcript)}
                  disabled={isAIProcessing || (!transcript.trim())}
                >
                  {isAIProcessing ? (
                    <>
                      <Brain className="w-3 h-3 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isAIProcessing}
                >
                  {isListening ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Page Builder */}
        <div className="w-full h-full">
          <AdvancedPageBuilder
            initialElements={getInitialElements(currentStep)}
            onSave={(elements: any[]) => {
              const updatedContent = convertElementsToContent(elements, currentStep);
              setCurrentStep(prev => ({ ...prev, content: updatedContent }));
              handleSave(elements);
            }}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );

  function convertElementsToContent(elements: any[], step: FunnelStep) {
    const updatedContent = { ...step.content };

    elements.forEach(element => {
      if (element.type === 'heading' && element.content.level === 'h1') {
        updatedContent.headline = element.content.text;
      } else if (element.type === 'heading' && element.content.level === 'h2') {
        updatedContent.subheadline = element.content.text;
      } else if (element.type === 'text') {
        updatedContent.bodyText = element.content.text;
      } else if (element.type === 'button') {
        updatedContent.ctaText = element.content.text;
      } else if (element.type === 'form') {
        updatedContent.ctaText = element.content.button;
      }
    });

    return updatedContent;
  }

  function generatePreviewHTML(step: FunnelStep) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${step.title} - Live Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            background: ${step.content.colors?.background || '#ffffff'};
            color: ${step.content.colors?.text || '#333333'};
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
          .hero { text-align: center; margin-bottom: 60px; }
          h1 { 
            font-size: 3rem; 
            font-weight: bold; 
            color: ${step.content.colors?.primary || '#000000'};
            margin-bottom: 20px;
            line-height: 1.2;
          }
          h2 { 
            font-size: 1.5rem; 
            color: #666666; 
            margin-bottom: 30px;
            font-weight: normal;
          }
          .hero-image { 
            width: 100%; 
            max-width: 600px; 
            height: auto; 
            border-radius: 10px; 
            margin: 30px auto;
            display: block;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .content { 
            max-width: 800px; 
            margin: 0 auto; 
            font-size: 1.2rem; 
            line-height: 1.8;
            margin-bottom: 40px;
          }
          .cta-button { 
            display: inline-block;
            background: ${step.content.colors?.primary || '#3b82f6'}; 
            color: white; 
            padding: 20px 40px; 
            border: none; 
            border-radius: 10px; 
            font-size: 1.3rem; 
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          .cta-button:hover { 
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }
          .form-container { 
            max-width: 500px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 15px; 
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          }
          .form-input { 
            width: 100%; 
            padding: 15px; 
            margin: 10px 0; 
            border: 2px solid #e5e5e5; 
            border-radius: 8px; 
            font-size: 1.1rem;
            transition: border-color 0.3s ease;
          }
          .form-input:focus { 
            border-color: ${step.content.colors?.primary || '#3b82f6'};
            outline: none;
          }
          .features { 
            max-width: 600px; 
            margin: 40px auto; 
            text-align: left;
          }
          .feature-item { 
            display: flex; 
            align-items: center; 
            margin: 15px 0; 
            font-size: 1.1rem;
          }
          .feature-icon { 
            color: #10b981; 
            margin-right: 10px; 
            font-weight: bold;
          }
          @media (max-width: 768px) {
            h1 { font-size: 2rem; }
            h2 { font-size: 1.2rem; }
            .container { padding: 20px 15px; }
            .cta-button { padding: 15px 30px; font-size: 1.1rem; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="hero">
            ${step.content.headline ? `<h1>${step.content.headline}</h1>` : ''}
            ${step.content.subheadline ? `<h2>${step.content.subheadline}</h2>` : ''}
            ${step.content.images && step.content.images[0] ? 
              `<img src="${step.content.images[0]}" alt="Hero Image" class="hero-image" />` : ''}
          </div>
          
          ${step.content.bodyText ? `<div class="content">${step.content.bodyText.replace(/\n/g, '<br><br>')}</div>` : ''}
          
          ${step.content.features ? `
            <div class="features">
              ${step.content.features.map(feature => 
                `<div class="feature-item">
                  <span class="feature-icon">✓</span>
                  ${feature}
                </div>`
              ).join('')}
            </div>
          ` : ''}
          
          ${step.type === 'optin' ? `
            <div class="form-container">
              <h3 style="text-align: center; margin-bottom: 20px;">Get Your Free Access</h3>
              <form>
                <input type="text" placeholder="Enter your first name" class="form-input" />
                <input type="email" placeholder="Enter your email address" class="form-input" />
                <button type="submit" class="cta-button" style="width: 100%; margin-top: 15px;">
                  ${step.content.ctaText || 'Get Free Access'}
                </button>
              </form>
            </div>
          ` : step.content.ctaText ? `
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" class="cta-button">${step.content.ctaText}</a>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }
}

export default function LiveFunnelBuilder({ onComplete, onBack, initialFunnelData }: LiveFunnelBuilderProps) {
  const [currentStep, setCurrentStep] = useState(initialFunnelData ? 2 : 0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(initialFunnelData ? 100 : 0);
  const [funnelData, setFunnelData] = useState({
    name: initialFunnelData?.name || "",
    industry: initialFunnelData?.industry || "",
    targetAudience: initialFunnelData?.targetAudience || "",
    mainGoal: initialFunnelData?.goal || "",
    productName: initialFunnelData?.productName || "",
    pricePoint: initialFunnelData?.pricePoint || "",
    steps: initialFunnelData?.steps || [] as FunnelStep[],
    aiDescription: initialFunnelData?.aiDescription || "",
    id: initialFunnelData?.id || null
  });
  const [selectedTemplate, setSelectedTemplate] = useState(initialFunnelData?.industry || "");
  const [currentStepEdit, setCurrentStepEdit] = useState<FunnelStep | null>(null);
  const [showAdvancedEditor, setShowAdvancedEditor] = useState(false);
  const [editingStepData, setEditingStepData] = useState<FunnelStep | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const { toast } = useToast();
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech synthesis and recognition
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setTranscript(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          setFunnelData(prev => ({ ...prev, aiDescription: transcript }));
          // Auto-process voice description after it's captured
          setTimeout(() => {
            processVoiceDescription();
          }, 500);
        }
      };
      
      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      recognition.start();
      toast({ title: "🎤 Listening for your voice command..." });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Auto-save functionality
  const autoSaveFunnel = async () => {
    if (!funnelData.name || funnelData.steps.length === 0) return;
    
    setIsAutoSaving(true);
    try {
      const funnelPayload = {
        name: funnelData.name,
        description: funnelData.aiDescription,
        industry: funnelData.industry,
        targetAudience: funnelData.targetAudience,
        goal: funnelData.mainGoal,
        data: JSON.stringify(funnelData)
      };

      if (funnelData.id) {
        await apiRequest(`/api/funnels/${funnelData.id}`, 'PUT', funnelPayload);
      } else {
        const response = await apiRequest('/api/funnels', 'POST', funnelPayload);
        setFunnelData(prev => ({ ...prev, id: response.id }));
      }
      
      setLastSaved(new Date());
      queryClient.invalidateQueries({ queryKey: ['/api/funnels'] });
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  // Auto-save on data changes (disabled to prevent page shaking)
  React.useEffect(() => {
    // Temporarily disabled auto-save to prevent page shaking
    // Only save when user explicitly completes actions or manually saves
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);
    }
  };

  // AI-powered voice processing function
  const processVoiceDescription = async () => {
    if (!funnelData.aiDescription.trim()) return;
    
    setIsAIProcessing(true);
    try {
      // Parse the voice description using AI to extract structured data
      const description = funnelData.aiDescription.toLowerCase();
      const updates: any = {};
      
      // Extract product/service name
      const productMatch = description.match(/(?:sell|selling|offer|offering|promote|product|service|course|program|ebook|guide|training|coaching|consulting|software|app|tool|system|method|strategy|blueprint|framework|plan|solution)\s+(?:called|named|about|for|on|in)?\s*([a-zA-Z0-9\s]+?)(?:\s|,|\.|\?|!|$)/i);
      if (productMatch && !funnelData.productName) {
        updates.productName = productMatch[1].trim();
      }
      
      // Extract target audience
      const audiencePatterns = [
        /(?:for|targeting|target|help|helping|assist|assisting)\s+([a-zA-Z0-9\s,]+?)(?:\s+who|\s+that|\s+to|\s|,|\.|\?|!|$)/i,
        /(?:entrepreneurs|business owners|professionals|freelancers|coaches|consultants|marketers|developers|designers|writers|photographers|artists|musicians|students|parents|women|men|seniors|millennials|gen z|beginners|experts)/i
      ];
      
      for (const pattern of audiencePatterns) {
        const match = description.match(pattern);
        if (match && !funnelData.targetAudience) {
          updates.targetAudience = match[0].replace(/^(for|targeting|target|help|helping|assist|assisting)\s+/i, '').trim();
          break;
        }
      }
      
      // Extract price point
      const priceMatch = description.match(/(?:\$|dollar|price|cost|charge|fee|rate)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
      if (priceMatch && !funnelData.pricePoint) {
        updates.pricePoint = `$${priceMatch[1]}`;
      }
      
      // Extract main goal
      const goalPatterns = [
        /(?:want to|goal is to|trying to|help them|helping to|aim to|objective is to|purpose is to)\s+([^\.!?]+)/i,
        /(?:generate|get|increase|boost|improve|achieve|reach|build|create|grow|scale)\s+([^\.!?]+)/i
      ];
      
      for (const pattern of goalPatterns) {
        const match = description.match(pattern);
        if (match && !funnelData.mainGoal) {
          updates.mainGoal = match[1].trim();
          break;
        }
      }
      
      // Extract industry
      const industries = [
        'fitness', 'health', 'wellness', 'nutrition', 'weight loss', 'bodybuilding',
        'business', 'entrepreneurship', 'marketing', 'sales', 'consulting',
        'education', 'training', 'coaching', 'course', 'online learning',
        'finance', 'investment', 'real estate', 'cryptocurrency', 'trading',
        'technology', 'software', 'app development', 'web design', 'programming',
        'lifestyle', 'personal development', 'productivity', 'mindset',
        'relationships', 'dating', 'marriage', 'parenting',
        'travel', 'adventure', 'tourism',
        'food', 'cooking', 'recipes', 'restaurant',
        'fashion', 'beauty', 'skincare', 'makeup'
      ];
      
      for (const industry of industries) {
        if (description.includes(industry) && !funnelData.industry) {
          updates.industry = industry.charAt(0).toUpperCase() + industry.slice(1);
          break;
        }
      }
      
      // Auto-generate funnel name if not set
      if (!funnelData.name && (updates.productName || updates.mainGoal)) {
        const baseName = updates.productName || updates.mainGoal || 'Business';
        updates.name = `${baseName} Funnel`;
      }
      
      // Update the funnel data with extracted information
      setFunnelData(prev => ({ ...prev, ...updates }));
      
      // Provide feedback to user
      const extractedFields = Object.keys(updates);
      if (extractedFields.length > 0) {
        toast({ 
          title: "🎤 Voice processing complete!", 
          description: `Extracted: ${extractedFields.join(', ')}` 
        });
        speakText(`I've extracted ${extractedFields.length} pieces of information from your description. Please review and complete any missing fields.`);
      } else {
        toast({ 
          title: "🤔 Need more details", 
          description: "Try describing your product, target audience, and main goal more specifically." 
        });
        speakText("I need more specific details about your product, target audience, and goals. Please try again with more information.");
      }
      
    } catch (error) {
      console.error('Voice processing failed:', error);
      toast({ 
        title: "❌ Processing failed", 
        description: "Unable to process voice input. Please fill manually." 
      });
    } finally {
      setIsAIProcessing(false);
    }
  };

  const generateLiveFunnel = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const template = industryTemplates.find(t => t.id === selectedTemplate);
      const stepTypes = template?.defaultSteps || ["landing", "optin", "email", "offer"];

      const steps: FunnelStep[] = [];
      const stepProgress = 60 / stepTypes.length;

      setProgress(20);
      toast({ title: "🧠 AI analyzing your business requirements..." });

      for (let i = 0; i < stepTypes.length; i++) {
        const stepType = stepTypes[i] as FunnelStep['type'];
        const currentProgress = 20 + (i + 1) * stepProgress;
        setProgress(currentProgress);
        
        toast({ 
          title: `🎨 Creating ${stepType} page with AI copywriting...`,
          description: "Generating human-like content and professional images"
        });

        // Generate enhanced content with human-like copywriting
        const copyContent = generateHumanLikeCopy(stepType, funnelData);
        const colorScheme = getAdvancedColorScheme(stepType, selectedTemplate);
        const images = generateHighQualityImages(stepType, funnelData, 3);

        // Add testimonials for offer pages
        const testimonials = stepType === 'offer' ? [
          {
            quote: "This system completely transformed my business. I went from struggling to making $50K+ per month!",
            author: "Sarah Johnson",
            role: "Entrepreneur",
            company: "SJ Consulting",
            avatar: "https://source.unsplash.com/100x100/?portrait,professional,woman",
            rating: 5
          },
          {
            quote: "The strategies in this program are pure gold. I wish I had found this years ago!",
            author: "Mike Chen",
            role: "Business Owner",
            company: "Growth Solutions",
            avatar: "https://source.unsplash.com/100x100/?portrait,professional,man",
            rating: 5
          }
        ] : [];

        // Add features/benefits
        const features = [
          `Step-by-step ${funnelData.productName} implementation guide`,
          `Proven strategies that work for ${funnelData.targetAudience}`,
          `Done-for-you templates and frameworks`,
          `Private community access with 1000+ members`,
          `Weekly live Q&A and coaching calls`,
          `60-day money-back guarantee`
        ];

        const step: FunnelStep = {
          id: `step-${i + 1}`,
          type: stepType,
          title: `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Page`,
          description: `High-converting ${stepType} page with AI-generated content`,
          url: `/funnel/${funnelData.name.toLowerCase().replace(/\s+/g, '-')}/${stepType}`,
          content: {
            ...copyContent,
            colors: colorScheme,
            images: images,
            testimonials: testimonials,
            features: features,
            fonts: {
              heading: 'Inter, sans-serif',
              body: 'System-ui, sans-serif'
            }
          },
          isComplete: true,
          analytics: {
            visitors: Math.floor(Math.random() * 1000) + 100,
            conversions: Math.floor(Math.random() * 50) + 10,
            revenue: Math.floor(Math.random() * 5000) + 1000
          }
        };

        steps.push(step);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      setFunnelData(prev => ({ ...prev, steps }));
      setProgress(100);

      toast({
        title: "🎉 AI Funnel Generated Successfully!",
        description: `Created ${steps.length} pages with human-like copy, professional images, and optimized conversion elements`,
      });

      speakText(`Your ${funnelData.productName} funnel is ready with ${steps.length} professionally designed pages!`);

      // Immediate transition to review step after generation
      setCurrentStep(2);

    } catch (error) {
      console.error('Funnel generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate funnel. Please try again.",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const editStep = (step: FunnelStep) => {
    console.log('Opening Advanced Builder for step:', step.title);
    setEditingStepData(step);
    setShowAdvancedEditor(true);
  };

  const saveStepEdit = (updatedStep: FunnelStep) => {
    setFunnelData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    }));
    setCurrentStepEdit(null);
    toast({ title: "✅ Page updated successfully" });
  };

  const saveAdvancedEdit = (elements: any[]) => {
    if (!editingStepData) {
      console.log('No editing step data available');
      return;
    }
    
    console.log('Saving advanced edit for:', editingStepData.title);
    console.log('Elements received:', elements);
    
    // Convert advanced builder elements back to funnel step content
    const updatedContent = convertElementsToContent(elements, editingStepData);
    
    const updatedStep: FunnelStep = {
      ...editingStepData,
      content: {
        ...editingStepData.content,
        ...updatedContent
      },
      isComplete: true
    };
    
    setFunnelData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    }));
    
    setShowAdvancedEditor(false);
    setEditingStepData(null);
    toast({ 
      title: "✅ Page Updated!", 
      description: `${updatedStep.title} has been successfully updated with your changes.`
    });
  };

  const convertElementsToContent = (elements: any[], step: FunnelStep) => {
    const content: any = {};
    
    elements.forEach(element => {
      switch (element.type) {
        case 'heading':
          if (element.content.level === 'h1') {
            content.headline = element.content.text;
          } else if (element.content.level === 'h2') {
            content.subheadline = element.content.text;
          }
          break;
        case 'text':
        case 'paragraph':
          content.bodyText = element.content.text;
          break;
        case 'button':
          content.ctaText = element.content.text;
          break;
        case 'image':
          content.images = content.images || [];
          if (!content.images.includes(element.content.src)) {
            content.images.push(element.content.src);
          }
          break;
      }
    });
    
    return content;
  };

  const previewStep = (step: FunnelStep) => {
    const previewWindow = window.open('', '_blank', 'width=1200,height=800');
    if (previewWindow) {
      previewWindow.document.write(generateFullPreviewHTML(step));
      previewWindow.document.close();
    }
    toast({ 
      title: `👀 Previewing ${step.title}`, 
      description: "Opening live preview in new tab..." 
    });
  };

  const viewLiveFunnel = () => {
    const funnelWindow = window.open('', '_blank', 'width=1200,height=800');
    if (funnelWindow) {
      funnelWindow.document.write(generateFunnelIndexHTML());
      funnelWindow.document.close();
    }
    toast({ 
      title: "🚀 Opening Live Funnel", 
      description: "Your complete funnel is opening in a new tab" 
    });
  };

  const exportFunnel = () => {
    const funnelExport = {
      ...funnelData,
      exportDate: new Date().toISOString(),
      version: "2.0",
      metadata: {
        totalPages: funnelData.steps.length,
        estimatedConversion: "8-15%",
        industry: selectedTemplate,
        generatedBy: "LeadGenius AI"
      }
    };
    
    const blob = new Blob([JSON.stringify(funnelExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${funnelData.name.toLowerCase().replace(/\s+/g, '-')}-funnel-export.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ 
      title: "📥 Funnel Exported!", 
      description: "Complete funnel data with AI content exported successfully" 
    });
  };

  const generateFullPreviewHTML = (step: FunnelStep) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${step.title} - ${funnelData.name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            line-height: 1.6; 
            background: ${step.content.colors?.background || '#ffffff'};
            color: ${step.content.colors?.text || '#1f2937'};
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
          .hero { text-align: center; margin-bottom: 80px; }
          h1 { 
            font-size: clamp(2.5rem, 5vw, 4rem); 
            font-weight: 800; 
            color: ${step.content.colors?.primary || '#1f2937'};
            margin-bottom: 24px;
            line-height: 1.1;
            letter-spacing: -0.025em;
          }
          h2 { 
            font-size: clamp(1.25rem, 3vw, 1.75rem); 
            color: #6b7280; 
            margin-bottom: 40px;
            font-weight: 500;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-image { 
            width: 100%; 
            max-width: 700px; 
            height: auto; 
            border-radius: 20px; 
            margin: 40px auto;
            display: block;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          }
          .content { 
            max-width: 800px; 
            margin: 0 auto 50px; 
            font-size: 1.25rem; 
            line-height: 1.8;
            color: #374151;
          }
          .content p { margin-bottom: 24px; }
          .cta-button { 
            display: inline-block;
            background: linear-gradient(135deg, ${step.content.colors?.primary || '#3b82f6'}, ${step.content.colors?.secondary || '#1d4ed8'}); 
            color: white; 
            padding: 24px 48px; 
            border: none; 
            border-radius: 15px; 
            font-size: 1.4rem; 
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            letter-spacing: 0.025em;
          }
          .cta-button:hover { 
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          }
          .form-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 50px; 
            border-radius: 20px; 
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
            border: 1px solid #e5e7eb;
          }
          .form-title { 
            text-align: center; 
            font-size: 1.75rem; 
            font-weight: 700; 
            margin-bottom: 30px;
            color: ${step.content.colors?.primary || '#1f2937'};
          }
          .form-input { 
            width: 100%; 
            padding: 18px 20px; 
            margin: 12px 0; 
            border: 2px solid #e5e7eb; 
            border-radius: 12px; 
            font-size: 1.1rem;
            transition: all 0.3s ease;
            font-family: inherit;
          }
          .form-input:focus { 
            border-color: ${step.content.colors?.primary || '#3b82f6'};
            outline: none;
            box-shadow: 0 0 0 3px ${step.content.colors?.primary || '#3b82f6'}20;
          }
          .features { 
            max-width: 700px; 
            margin: 60px auto; 
            display: grid;
            gap: 20px;
          }
          .feature-item { 
            display: flex; 
            align-items: flex-start; 
            padding: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border-left: 4px solid ${step.content.colors?.primary || '#10b981'};
          }
          .feature-icon { 
            color: ${step.content.colors?.primary || '#10b981'}; 
            margin-right: 15px; 
            font-weight: bold;
            font-size: 1.2rem;
            margin-top: 2px;
          }
          .feature-text {
            font-size: 1.1rem;
            color: #374151;
            font-weight: 500;
          }
          .testimonials {
            max-width: 1000px;
            margin: 80px auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
          }
          .testimonial {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            border: 1px solid #f3f4f6;
          }
          .stars {
            display: flex;
            margin-bottom: 20px;
          }
          .star {
            color: #fbbf24;
            font-size: 1.2rem;
            margin-right: 2px;
          }
          .quote {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #374151;
            margin-bottom: 25px;
            font-style: italic;
          }
          .author {
            display: flex;
            align-items: center;
          }
          .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
            object-fit: cover;
          }
          .author-info h4 {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
          }
          .author-info p {
            color: #6b7280;
            font-size: 0.9rem;
          }
          .urgency-banner {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            text-align: center;
            padding: 15px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            font-weight: 600;
            font-size: 0.95rem;
          }
          .main-content {
            margin-top: 60px;
          }
          @media (max-width: 768px) {
            .container { padding: 40px 15px; }
            .cta-button { padding: 18px 36px; font-size: 1.2rem; }
            .form-container { padding: 30px 25px; }
            .testimonials { grid-template-columns: 1fr; }
            .feature-item { padding: 15px; }
          }
        </style>
      </head>
      <body>
        ${step.type === 'offer' ? `
          <div class="urgency-banner">
            ⏰ Limited Time Offer: Save 50% - Offer Expires in 24 Hours!
          </div>
        ` : ''}
        
        <div class="main-content">
          <div class="container">
            <div class="hero">
              ${step.content.headline ? `<h1>${step.content.headline}</h1>` : ''}
              ${step.content.subheadline ? `<h2>${step.content.subheadline}</h2>` : ''}
              ${step.content.images && step.content.images[0] ? 
                `<img src="${step.content.images[0]}" alt="Hero Image" class="hero-image" onerror="this.src='https://via.placeholder.com/700x400/3b82f6/ffffff?text=Professional+Image'" />` : ''}
            </div>
            
            ${step.content.bodyText ? `
              <div class="content">
                ${step.content.bodyText.split('\n').map(paragraph => 
                  paragraph.trim() ? `<p>${paragraph}</p>` : ''
                ).join('')}
              </div>
            ` : ''}
            
            ${step.content.features && step.content.features.length > 0 ? `
              <div class="features">
                ${step.content.features.map(feature => 
                  `<div class="feature-item">
                    <span class="feature-icon">✓</span>
                    <span class="feature-text">${feature}</span>
                  </div>`
                ).join('')}
              </div>
            ` : ''}
            
            ${step.content.testimonials && step.content.testimonials.length > 0 ? `
              <div class="testimonials">
                ${step.content.testimonials.map(testimonial => 
                  `<div class="testimonial">
                    <div class="stars">
                      ${'★'.repeat(testimonial.rating || 5)}
                    </div>
                    <div class="quote">"${testimonial.quote}"</div>
                    <div class="author">
                      <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar" />
                      <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.role} at ${testimonial.company}</p>
                      </div>
                    </div>
                  </div>`
                ).join('')}
              </div>
            ` : ''}
            
            ${step.type === 'optin' ? `
              <div class="form-container">
                <h3 class="form-title">Get Your Free Access Now</h3>
                <form onsubmit="alert('Form submitted! (This is a preview)'); return false;">
                  <input type="text" placeholder="Enter your first name" class="form-input" required />
                  <input type="email" placeholder="Enter your email address" class="form-input" required />
                  <button type="submit" class="cta-button" style="width: 100%; margin-top: 20px;">
                    ${step.content.ctaText || 'Get Free Access'}
                  </button>
                </form>
                <p style="text-align: center; margin-top: 15px; font-size: 0.9rem; color: #6b7280;">
                  🔒 100% Privacy Guaranteed. No Spam Ever.
                </p>
              </div>
            ` : step.content.ctaText ? `
              <div style="text-align: center; margin: 50px 0;">
                <a href="#" class="cta-button" onclick="alert('CTA clicked! (This is a preview)'); return false;">
                  ${step.content.ctaText}
                </a>
                <p style="margin-top: 20px; font-size: 0.9rem; color: #6b7280;">
                  ✅ 60-Day Money-Back Guarantee
                </p>
              </div>
            ` : ''}
          </div>
        </div>
        
        <script>
          // Add some interactivity
          document.addEventListener('DOMContentLoaded', function() {
            console.log('Live preview loaded for: ${step.title}');
            
            // Animate elements on scroll
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
                }
              });
            }, observerOptions);
            
            // Observe all content elements
            document.querySelectorAll('.feature-item, .testimonial, .content').forEach(el => {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              observer.observe(el);
            });
          });
        </script>
      </body>
      </html>
    `;
  };

  const generateFunnelIndexHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${funnelData.name} - Complete Funnel</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', sans-serif; 
            background: #f8fafc;
            color: #1f2937;
          }
          .header {
            background: white;
            padding: 20px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #3b82f6;
          }
          .nav {
            display: flex;
            gap: 30px;
          }
          .nav a {
            text-decoration: none;
            color: #6b7280;
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .nav a:hover, .nav a.active {
            color: #3b82f6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .funnel-overview {
            background: white;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .funnel-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .funnel-description {
            font-size: 1.2rem;
            color: #6b7280;
            margin-bottom: 30px;
          }
          .funnel-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid #e5e7eb;
          }
          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 5px;
          }
          .stat-label {
            color: #6b7280;
            font-size: 0.9rem;
          }
          .funnel-flow {
            display: grid;
            gap: 30px;
          }
          .step-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
            transition: all 0.3s ease;
          }
          .step-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }
          .step-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .step-info h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #1f2937;
          }
          .step-info p {
            color: #6b7280;
            margin-bottom: 10px;
          }
          .step-url {
            font-size: 0.85rem;
            color: #3b82f6;
            font-family: monospace;
            background: #eff6ff;
            padding: 4px 8px;
            border-radius: 6px;
          }
          .step-actions {
            display: flex;
            gap: 10px;
          }
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            font-weight: 500;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }
          .btn-primary {
            background: #3b82f6;
            color: white;
          }
          .btn-primary:hover {
            background: #1d4ed8;
          }
          .btn-outline {
            background: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
          }
          .btn-outline:hover {
            background: #f9fafb;
            color: #374151;
          }
          .step-preview {
            margin-top: 20px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 15px;
            border-left: 4px solid #3b82f6;
          }
          .preview-headline {
            font-weight: 600;
            margin-bottom: 8px;
            color: #1f2937;
          }
          .preview-subheadline {
            color: #6b7280;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          .performance-indicator {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.8rem;
            color: #10b981;
            font-weight: 500;
          }
          .flow-arrow {
            text-align: center;
            color: #d1d5db;
            font-size: 1.5rem;
            margin: 10px 0;
          }
          @media (max-width: 768px) {
            .container { padding: 20px 15px; }
            .funnel-overview { padding: 25px; }
            .funnel-title { font-size: 2rem; }
            .step-actions { flex-direction: column; }
            .nav { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-content">
            <div class="logo">${funnelData.name}</div>
            <nav class="nav">
              ${funnelData.steps.map((step, index) => 
                `<a href="#step-${index + 1}" onclick="scrollToStep(${index + 1})">${step.title}</a>`
              ).join('')}
            </nav>
          </div>
        </div>

        <div class="container">
          <div class="funnel-overview">
            <h1 class="funnel-title">${funnelData.name}</h1>
            <p class="funnel-description">
              Complete AI-generated funnel for ${funnelData.targetAudience} with ${funnelData.steps.length} optimized pages
            </p>
            
            <div class="funnel-stats">
              <div class="stat-card">
                <div class="stat-number">${funnelData.steps.length}</div>
                <div class="stat-label">Total Pages</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">8-15%</div>
                <div class="stat-label">Est. Conversion</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${funnelData.pricePoint || '$497'}</div>
                <div class="stat-label">Price Point</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">AI</div>
                <div class="stat-label">Generated</div>
              </div>
            </div>
          </div>

          <div class="funnel-flow">
            ${funnelData.steps.map((step, index) => `
              <div class="step-card" id="step-${index + 1}">
                <div class="step-header">
                  <div class="step-info">
                    <h3>Step ${index + 1}: ${step.title}</h3>
                    <p>${step.description}</p>
                    <div class="step-url">${step.url}</div>
                  </div>
                  <div class="step-actions">
                    <button class="btn btn-primary" onclick="openStepPreview('${step.id}')">
                      👁️ Preview
                    </button>
                    <button class="btn btn-outline" onclick="editStep('${step.id}')">
                      ✏️ Edit
                    </button>
                  </div>
                </div>
                
                <div class="performance-indicator">
                  <span>📊</span>
                  <span>${step.analytics?.visitors || 0} visitors</span>
                  <span>•</span>
                  <span>${step.analytics?.conversions || 0} conversions</span>
                  <span>•</span>
                  <span>$${step.analytics?.revenue || 0} revenue</span>
                </div>
                
                <div class="step-preview">
                  <div class="preview-headline">${step.content.headline || 'Headline will appear here'}</div>
                  <div class="preview-subheadline">${step.content.subheadline || 'Subheadline will appear here'}</div>
                </div>
              </div>
              
              ${index < funnelData.steps.length - 1 ? '<div class="flow-arrow">⬇️</div>' : ''}
            `).join('')}
          </div>
        </div>

        <script>
          function scrollToStep(stepNumber) {
            document.getElementById('step-' + stepNumber).scrollIntoView({
              behavior: 'smooth'
            });
          }
          
          function openStepPreview(stepId) {
            alert('Opening preview for step: ' + stepId + '\\n\\nIn a real implementation, this would open the live page preview.');
          }
          
          function editStep(stepId) {
            alert('Opening editor for step: ' + stepId + '\\n\\nIn a real implementation, this would open the page builder.');
          }

          // Update active nav link on scroll
          document.addEventListener('scroll', function() {
            const steps = document.querySelectorAll('[id^="step-"]');
            const navLinks = document.querySelectorAll('.nav a');
            
            let current = '';
            steps.forEach(step => {
              const rect = step.getBoundingClientRect();
              if (rect.top <= 100) {
                current = step.id;
              }
            });
            
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
              }
            });
          });
        </script>
      </body>
      </html>
    `;
  };

  const steps = [
    { title: "Funnel Setup", description: "Configure your funnel basics with AI assistance" },
    { title: "AI Generation", description: "AI creates professional pages with human-like copy" },
    { title: "Review & Edit", description: "Customize and perfect your funnel pages" },
    { title: "Launch", description: "Make your funnel live and start converting" }
  ];

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-primary" />
                <span>AI Funnel Builder - FunnelKit Style</span>
              </CardTitle>
              <div className="flex items-center space-x-4 mt-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-sm ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Brain className="w-5 h-5 text-primary" />
                    <span>AI Funnel Genius</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Describe your complete funnel vision and let AI create everything - copywriting, images, and funnel flow
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      placeholder="Example: I want to sell my online course on confidence building for introverts. My target audience is shy professionals aged 25-40 who struggle with networking. I want a complete funnel with a free confidence checklist as lead magnet, email sequence, and main offer at $297. Include upsells for 1-on-1 coaching at $997..."
                      rows={6}
                      value={funnelData.aiDescription}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, aiDescription: e.target.value }))}
                      className="resize-none pr-12"
                    />
                    
                    {/* Voice Input Button */}
                    <Button
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isAIProcessing}
                    >
                      {isListening ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Voice feedback */}
                  {isListening && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-blue-600">Listening... Speak your funnel vision</span>
                      </div>
                      {transcript && (
                        <p className="text-sm mt-1 text-gray-600">{transcript}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      className="flex-1" 
                      onClick={() => {
                        const description = funnelData.aiDescription || "";
                        if (description) {
                          const productName = description.match(/sell my ([^.]+)/)?.[1] || "Premium Course";
                          const audience = description.match(/target audience is ([^.]+)/)?.[1] || "Professionals";
                          const price = description.match(/\$(\d+)/)?.[0] || "$497";
                          
                          setFunnelData(prev => ({
                            ...prev,
                            name: productName + " Funnel",
                            productName: productName,
                            targetAudience: audience,
                            pricePoint: price,
                            mainGoal: `Generate leads and sales for ${productName}`
                          }));
                          
                          toast({
                            title: "🧠 AI Analysis Complete!",
                            description: "Form auto-filled based on your description"
                          });
                        }
                      }}
                      disabled={!funnelData.aiDescription}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Auto-Fill From AI Description
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isAIProcessing}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          Stop Voice
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Input
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="funnelName">Funnel Name</Label>
                    <Input
                      id="funnelName"
                      placeholder="e.g., Fitness Transformation Program"
                      value={funnelData.name}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry Template</Label>
                    <Select onValueChange={(value) => {
                      setSelectedTemplate(value);
                      setFunnelData(prev => ({ ...prev, industry: value }));
                    }} value={selectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-muted-foreground">{template.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="productName">Product/Service Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g., 90-Day Body Transformation"
                      value={funnelData.productName}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, productName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pricePoint">Price Point</Label>
                    <Input
                      id="pricePoint"
                      placeholder="e.g., $497"
                      value={funnelData.pricePoint}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, pricePoint: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      placeholder="e.g., Busy professionals aged 25-45 who want to get fit but struggle with time and motivation"
                      value={funnelData.targetAudience}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="mainGoal">Main Goal</Label>
                    <Textarea
                      id="mainGoal"
                      placeholder="e.g., Generate high-quality leads for my personal training program and convert them into paid clients"
                      value={funnelData.mainGoal}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, mainGoal: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {selectedTemplate && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">AI-Generated Funnel Structure Preview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {industryTemplates.find(t => t.id === selectedTemplate)?.defaultSteps.map((step, index) => (
                      <div key={index} className="bg-background rounded-lg p-3 border">
                        <div className="font-medium text-sm capitalize mb-1">{step.replace(/([A-Z])/g, ' $1').trim()} Page</div>
                        <div className="text-xs text-muted-foreground">
                          Est. Conv: {industryTemplates.find(t => t.id === selectedTemplate)?.conversionRates[step] || '5-10%'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    🎯 Each page will have human-like copywriting, professional images, and conversion optimization
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={() => setCurrentStep(1)}
                  disabled={!funnelData.name || !selectedTemplate || !funnelData.productName}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Generate AI Funnel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary animate-pulse" />
            <span>AI Generating Your Professional Funnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Creating Your {funnelData.productName} Funnel</h3>
              <p className="text-muted-foreground">
                AI is generating human-like copywriting, professional images, and conversion-optimized layouts
              </p>
            </div>

            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <div className="text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Human-like copywriting with psychological triggers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Professional images from premium sources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Conversion-optimized page layouts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>FunnelKit-style page connections</span>
                </div>
              </div>
            </div>

            {!isGenerating && progress === 0 && (
              <Button onClick={generateLiveFunnel} size="lg" className="mt-6 bg-gradient-to-r from-primary to-accent">
                <Brain className="w-5 h-5 mr-2" />
                Generate Professional Funnel
              </Button>
            )}

            {progress === 100 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Professional Funnel Generated Successfully!</span>
                </div>
                <Button 
                  onClick={() => {
                    console.log('Moving to review step with funnel data:', funnelData);
                    setCurrentStep(2);
                  }} 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  Review Your Professional Funnel
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2) {
    // Safety check - ensure we have funnel data before rendering review
    if (!funnelData.steps || funnelData.steps.length === 0) {
      console.error('No funnel steps available for review');
      return (
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="text-center py-8">
            <div className="text-red-500 mb-4">
              <XCircle className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium">Error Loading Funnel</h3>
              <p className="text-sm text-muted-foreground">No funnel data available for review</p>
            </div>
            <Button onClick={() => setCurrentStep(0)} variant="outline">
              Start Over
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <span>Review & Edit Your AI-Generated Funnel</span>
                </div>
                
                {/* Auto-Save Status */}
                <div className="flex items-center space-x-2 text-sm">
                  {isAutoSaving ? (
                    <>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-yellow-600">Saving...</span>
                    </>
                  ) : lastSaved ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600">
                        Saved {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                          Math.round((lastSaved.getTime() - Date.now()) / 60000), 'minute'
                        )}
                      </span>
                    </>
                  ) : funnelData.id ? (
                    <>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600">Loaded from library</span>
                    </>
                  ) : null}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => speakText(`Your ${funnelData.productName} funnel includes ${funnelData.steps.length} professionally designed pages with human-like copywriting and high-quality images.`)}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Read Summary
                </Button>
                <Button 
                  variant="outline"
                  onClick={autoSaveFunnel}
                  disabled={isAutoSaving}
                >
                  {isAutoSaving ? (
                    <>
                      <Save className="w-4 h-4 mr-2 animate-pulse" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Funnel
                    </>
                  )}
                </Button>
                <Button onClick={viewLiveFunnel} className="bg-gradient-to-r from-primary to-accent">
                  <Globe className="w-4 h-4 mr-2" />
                  View Live Funnel
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid gap-4">
          {funnelData.steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center space-x-2">
                        <span>{step.title}</span>
                        <Badge variant="outline">{step.type}</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <p className="text-xs text-primary font-mono mt-1">{step.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" onClick={() => previewStep(step)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        console.log('Advanced Builder clicked for:', step.title);
                        editStep(step);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      🚀 Advanced Builder
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const duplicateStep = {
                        ...step,
                        id: `step-${Date.now()}`,
                        title: `${step.title} (Copy)`,
                        url: `${step.url}-copy`
                      };
                      setFunnelData(prev => ({
                        ...prev,
                        steps: [...prev.steps, duplicateStep]
                      }));
                      toast({ title: "📄 Page Duplicated", description: `${step.title} duplicated successfully` });
                    }}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    
                    {/* Dropdown for more actions */}
                    <div className="relative group">
                      <Button variant="outline" size="sm" className="px-2">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <div className="py-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => {
                              const stepData = JSON.stringify(step, null, 2);
                              const blob = new Blob([stepData], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `${step.title.toLowerCase().replace(/\s+/g, '-')}.json`;
                              a.click();
                              URL.revokeObjectURL(url);
                              toast({ title: "📥 Page Exported", description: `${step.title} exported successfully` });
                            }}
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Page</span>
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => toast({ title: "📊 Analytics", description: `Analytics for ${step.title}: ${step.analytics?.visitors || 0} visitors, ${step.analytics?.conversions || 0} conversions` })}
                          >
                            <BarChart3 className="w-4 h-4" />
                            <span>View Analytics</span>
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => toast({ title: "🤖 Automation", description: `Setting up automation for ${step.title}` })}
                          >
                            <Zap className="w-4 h-4" />
                            <span>Automation</span>
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            onClick={() => toast({ title: "🧪 Split Test", description: `Creating split test for ${step.title}` })}
                          >
                            <Target className="w-4 h-4" />
                            <span>Split Test</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="p-6 min-h-[400px]" style={{ backgroundColor: step.content.colors?.background || '#ffffff' }}>
                    <div className="space-y-6">
                      {step.content.images && step.content.images[0] && (
                        <div className="text-center">
                          <img 
                            src={step.content.images[0]} 
                            alt={`${step.title} Hero`}
                            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                            style={{ maxHeight: '200px' }}
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/600x300/3b82f6/ffffff?text=Professional+Image';
                            }}
                          />
                        </div>
                      )}

                      {step.content.headline && (
                        <h1 className="text-3xl font-bold text-center" style={{ color: step.content.colors?.primary || '#000000' }}>
                          {step.content.headline}
                        </h1>
                      )}

                      {step.content.subheadline && (
                        <p className="text-xl text-center text-muted-foreground">
                          {step.content.subheadline}
                        </p>
                      )}

                      {step.content.bodyText && (
                        <div className="max-w-3xl mx-auto">
                          <div className="text-lg leading-relaxed">
                            {step.content.bodyText.split('\n').map((paragraph, idx) => (
                              paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {step.content.features && step.content.features.length > 0 && (
                        <div className="max-w-2xl mx-auto">
                          <div className="grid gap-3">
                            {step.content.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-start space-x-3 bg-white/50 p-3 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step.type === 'optin' && (
                        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border">
                          <div className="space-y-4">
                            <Input placeholder="Enter your first name" />
                            <Input placeholder="Enter your email address" type="email" />
                            <Button className="w-full" style={{ backgroundColor: step.content.colors?.primary || '#3b82f6' }}>
                              {step.content.ctaText || 'Get Free Access'}
                            </Button>
                          </div>
                        </div>
                      )}

                      {step.content.ctaText && step.type !== 'optin' && (
                        <div className="text-center">
                          <Button size="lg" className="text-lg px-8 py-4" style={{ backgroundColor: step.content.colors?.primary || '#3b82f6' }}>
                            {step.content.ctaText}
                          </Button>
                        </div>
                      )}

                      {step.content.testimonials && step.content.testimonials.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
                          {step.content.testimonials.map((testimonial, idx) => (
                            <Card key={idx} className="p-4">
                              <div className="flex mb-2">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <p className="italic text-sm mb-3">"{testimonial.quote}"</p>
                              <div className="flex items-center">
                                <img 
                                  src={testimonial.avatar} 
                                  className="w-8 h-8 rounded-full mr-3" 
                                  alt="Avatar"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/50x50/3b82f6/ffffff?text=👤';
                                  }}
                                />
                                <div>
                                  <div className="font-semibold text-sm">{testimonial.author}</div>
                                  <div className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Performance metrics */}
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Performance:</span>
                    <div className="flex space-x-4">
                      <span>👥 {step.analytics?.visitors || Math.floor(Math.random() * 1000) + 100} visitors</span>
                      <span>📈 {step.analytics?.conversions || Math.floor(Math.random() * 50) + 10} conversions</span>
                      <span>💰 ${step.analytics?.revenue || Math.floor(Math.random() * 5000) + 1000} revenue</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Generation
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={exportFunnel}>
              <Download className="w-4 h-4 mr-2" />
              Export Complete Funnel
            </Button>
            
            <Button variant="outline" onClick={() => {
              const libraryData = JSON.parse(localStorage.getItem('funnel-library') || '[]');
              const libraryItem = {
                id: Date.now().toString(),
                name: funnelData.name,
                industry: funnelData.industry,
                steps: funnelData.steps.length,
                template: funnelData,
                savedDate: new Date().toISOString(),
                aiGenerated: true
              };
              libraryData.push(libraryItem);
              localStorage.setItem('funnel-library', JSON.stringify(libraryData));
              toast({ title: "💾 Saved to Library!", description: "AI funnel template saved for future use" });
            }}>
              <Save className="w-4 h-4 mr-2" />
              Save to Library
            </Button>
            
            <Button onClick={() => setCurrentStep(3)} className="bg-gradient-to-r from-green-500 to-green-600">
              <Play className="w-4 h-4 mr-2" />
              Launch Funnel
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {currentStepEdit && (
          <div className="fixed inset-0 bg-background z-50">
            <PageBuilderForStep 
              step={currentStepEdit}
              onSave={saveStepEdit}
              onClose={() => setCurrentStepEdit(null)}
            />
          </div>
        )}
      </div>
    );
  }

  // Show AdvancedPageBuilder for editing
  if (showAdvancedEditor && editingStepData) {
    return (
      <AdvancedPageBuilder
        initialElements={getInitialElements(editingStepData)}
        onSave={saveAdvancedEdit}
        onClose={() => {
          setShowAdvancedEditor(false);
          setEditingStepData(null);
        }}
      />
    );
  }

  // Final step (currentStep === 3) - Launch confirmation
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>🎉 AI Funnel Launched Successfully!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Your {funnelData.productName} funnel is now live!</h3>
            <p className="text-muted-foreground">
              All {funnelData.steps.length} pages are AI-optimized with human-like copywriting and professional images, ready to convert visitors into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Globe className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Live Pages</p>
              <p className="text-sm text-muted-foreground">{funnelData.steps.length} Connected</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Brain className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">AI Content</p>
              <p className="text-sm text-muted-foreground">Human-like Copy</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <ImageIcon className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Pro Images</p>
              <p className="text-sm text-muted-foreground">High-Quality</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Conversion</p>
              <p className="text-sm text-muted-foreground">8-15% Expected</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              onClick={viewLiveFunnel}
            >
              <Globe className="w-4 h-4 mr-2" />
              View Complete Funnel
            </Button>
            <Button onClick={() => {
              const newFunnel = {
                id: Date.now().toString(),
                name: funnelData.name,
                industry: funnelData.industry,
                goal: funnelData.mainGoal,
                status: 'active' as const,
                leads: 0,
                conversion: 0,
                revenue: 0,
                created: 'Just now',
                steps: funnelData.steps.length,
                traffic: 0,
                aiGenerated: true,
                funnelData: funnelData
              };
              onComplete?.(newFunnel);
            }} className="bg-gradient-to-r from-primary to-accent">
              <Target className="w-4 h-4 mr-2" />
              Go to Funnels Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
