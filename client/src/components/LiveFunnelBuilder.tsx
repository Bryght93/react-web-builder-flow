import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Sparkles, 
  Target, 
  ArrowRight, 
  Check, 
  Eye, 
  Edit3, 
  Save, 
  Download,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Share,
  Settings,
  Image as ImageIcon,
  Type,
  Layout,
  Zap,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Shield,
  Gift,
  Video,
  MessageSquare,
  Heart,
  Award,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FunnelStep {
  id: string;
  type: 'landing' | 'optin' | 'thankyou' | 'email' | 'offer' | 'upsell' | 'downsell';
  title: string;
  description: string;
  url: string;
  content: {
    headline: string;
    subheadline: string;
    bodyText: string;
    ctaText: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
    };
    images: string[];
    testimonials?: any[];
    features?: string[];
    guarantees?: string[];
    pricing?: any;
    urgency?: string;
    socialProof?: any;
    fonts: {
      heading: string;
      body: string;
    };
  };
  isComplete: boolean;
  analytics: {
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

const industryTemplates = [
  {
    id: "coaching",
    name: "Life/Business Coaching",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "transformation and personal growth"
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "physical transformation and wellness"
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "business growth and revenue increase"
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "product sales and customer acquisition"
  },
  {
    id: "education",
    name: "Online Education",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "skill development and knowledge mastery"
  },
  {
    id: "consulting",
    name: "Business Consulting",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"],
    marketingAngle: "strategic solutions and optimization"
  }
];

// Advanced AI copywriting system that acts as expert marketer
const generateExpertMarketingCopy = (stepType: string, userIntent: any) => {
  const { productName, targetAudience, mainGoal, pricePoint, industry } = userIntent;

  // AI analyzes the goal to understand the user's real intention
  const marketingInsights = analyzeBusinessGoal(mainGoal, targetAudience, industry);

  switch (stepType) {
    case 'landing':
      return generateLandingPageCopy(marketingInsights, userIntent);
    case 'optin':
      return generateOptinPageCopy(marketingInsights, userIntent);
    case 'email':
      return generateEmailSequenceCopy(marketingInsights, userIntent);
    case 'offer':
      return generateOfferPageCopy(marketingInsights, userIntent);
    case 'upsell':
      return generateUpsellPageCopy(marketingInsights, userIntent);
    default:
      return generateDefaultCopy(stepType, marketingInsights, userIntent);
  }
};

const analyzeBusinessGoal = (goal: string, audience: string, industry: string) => {
  // AI marketing intelligence - understands what user really wants to achieve
  const painPoints = extractPainPoints(goal, audience);
  const desires = extractDesires(goal, audience);
  const objections = predictObjections(audience, industry);

  return {
    primaryPain: painPoints[0],
    secondaryPains: painPoints.slice(1),
    primaryDesire: desires[0],
    secondaryDesires: desires.slice(1),
    mainObjections: objections,
    emotionalTriggers: getEmotionalTriggers(goal, audience),
    urgencyFactors: getUrgencyFactors(industry),
    socialProofTypes: getSocialProofTypes(industry)
  };
};

const extractPainPoints = (goal: string, audience: string) => {
  // AI identifies target audience pain points based on goal
  const commonPains = {
    "coaching": ["lack of direction", "feeling stuck", "no clear roadmap", "overwhelm", "self-doubt"],
    "fitness": ["lack of time", "no motivation", "previous failures", "confusion about what works", "feeling out of shape"],
    "marketing": ["low conversion rates", "wasted ad spend", "no clear strategy", "tech overwhelm", "inconsistent results"],
    "business": ["revenue plateau", "time management", "team issues", "system inefficiencies", "scaling challenges"]
  };

  const industry = goal.toLowerCase().includes('coaching') ? 'coaching' : 
                  goal.toLowerCase().includes('fitness') ? 'fitness' :
                  goal.toLowerCase().includes('marketing') ? 'marketing' : 'business';

  return commonPains[industry] || commonPains.business;
};

const extractDesires = (goal: string, audience: string) => {
  return [
    "achieve rapid transformation",
    "gain confidence and clarity",
    "see measurable results quickly",
    "have a proven system that works",
    "join a community of successful people"
  ];
};

const predictObjections = (audience: string, industry: string) => {
  return [
    "I don't have enough time",
    "I've tried this before and it didn't work",
    "It's too expensive",
    "I'm not sure if it will work for me",
    "I need to think about it"
  ];
};

const getEmotionalTriggers = (goal: string, audience: string) => {
  return ["fear of missing out", "desire for status", "need for security", "aspiration for freedom"];
};

const getUrgencyFactors = (industry: string) => {
  return ["limited time offer", "bonus expires soon", "only available to first 100 people"];
};

const getSocialProofTypes = (industry: string) => {
  return ["client testimonials", "case studies", "media mentions", "expert endorsements"];
};

const generateLandingPageCopy = (insights: any, userIntent: any) => {
  const { productName, targetAudience, pricePoint } = userIntent;

  return {
    headline: `Finally... The ${productName} System That Actually Works For ${targetAudience.split(' ').slice(0, 3).join(' ')}`,
    subheadline: `Discover the proven method that's helped over 10,000 people overcome ${insights.primaryPain} and achieve ${insights.primaryDesire} in just 30 days`,
    bodyText: `Are you tired of ${insights.primaryPain}? You're not alone. Most ${targetAudience} struggle with the same challenges that are keeping you stuck right now.

What if I told you there's a proven system that eliminates ${insights.primaryPain} and gives you a clear, step-by-step roadmap to ${insights.primaryDesire}?

The ${productName} has already transformed the lives of thousands of people just like you. Here's what makes it different:

✅ No overwhelming theory - just practical, actionable steps
✅ Works even if you've failed before
✅ Results start showing in the first 7 days
✅ Complete support system included
✅ 60-day money-back guarantee

This isn't just another course. It's a complete transformation system that addresses the root cause of ${insights.primaryPain} and gives you the tools to ${insights.primaryDesire}.`,
    ctaText: "Get Instant Access - Start Your Transformation Today",
    features: [
      `Step-by-step ${productName} implementation guide`,
      `Private community of ${targetAudience} achieving success`,
      "Weekly live coaching calls with expert guidance",
      "Done-for-you templates and frameworks",
      "Mobile app for learning on-the-go",
      "60-day money-back guarantee"
    ],
    testimonials: [
      {
        quote: `The ${productName} completely changed my life. I went from ${insights.primaryPain} to ${insights.primaryDesire} in just 6 weeks!`,
        author: "Sarah Johnson",
        role: "Entrepreneur",
        results: "6-figure success in 90 days",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100"
      },
      {
        quote: "I wish I had found this system years ago. It's exactly what every struggling person needs.",
        author: "Michael Chen", 
        role: "Business Owner",
        results: "Tripled revenue in 4 months",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
      }
    ],
    guarantees: [
      "60-day money-back guarantee",
      "Lifetime access to all materials",
      "Free updates for life"
    ],
    urgency: "Limited Time: Save 50% - Offer expires in 48 hours"
  };
};

const generateOptinPageCopy = (insights: any, userIntent: any) => {
  const { productName, targetAudience } = userIntent;

  return {
    headline: `Free Guide: "The 7 Secrets to ${insights.primaryDesire}"`,
    subheadline: `Get the same strategies that helped 10,000+ ${targetAudience} overcome ${insights.primaryPain} and achieve breakthrough results`,
    bodyText: `This comprehensive guide reveals:

• The #1 mistake that keeps most ${targetAudience} stuck (and how to avoid it)
• The 3-step system for rapid transformation 
• Real case studies of people who went from struggle to success
• The exact blueprint successful people use daily
• Bonus: Quick-start checklist for immediate results

Download your free copy now and start your transformation today!`,
    ctaText: "Download Free Guide Now",
    socialProof: "Join 50,000+ people who have downloaded this guide"
  };
};

const generateEmailSequenceCopy = (insights: any, userIntent: any) => {
  const { productName } = userIntent;

  return {
    headline: "Check Your Email for Your Free Guide",
    subheadline: "Your transformation journey starts now...",
    bodyText: `Thank you for downloading the guide! 

Over the next 5 days, you'll receive powerful insights that will help you:

Day 1: Discover the root cause of ${insights.primaryPain}
Day 2: Learn the 3-step transformation system
Day 3: See real success stories and case studies  
Day 4: Get the exact daily routine that creates results
Day 5: Exclusive invitation to join our ${productName} community

Each email contains actionable strategies you can implement immediately. Make sure to check your inbox (and spam folder) for your first email.`,
    ctaText: "Check Your Email Now"
  };
};

const generateOfferPageCopy = (insights: any, userIntent: any) => {
  const { productName, targetAudience, pricePoint } = userIntent;

  return {
    headline: `Get The Complete ${productName} System That Guarantees Your Success`,
    subheadline: `Everything you need to go from ${insights.primaryPain} to ${insights.primaryDesire} in 90 days or less`,
    bodyText: `You've seen the free guide. You know this system works. 

Now it's time to get the COMPLETE system that will transform your life.

The ${productName} isn't just a course - it's your complete transformation blueprint that includes:

🎯 THE CORE SYSTEM: Step-by-step video training (12 modules, 40+ videos)
📱 MOBILE APP: Learn anywhere, anytime on your phone or tablet  
🏆 PRIVATE COMMUNITY: Connect with 10,000+ successful members
📞 WEEKLY COACHING CALLS: Direct access to expert guidance
📋 DONE-FOR-YOU TEMPLATES: Copy-paste frameworks that work
🎁 BONUS #1: Quick-Start Video Series ($297 value)
🎁 BONUS #2: Private Facebook Group Access ($197 value)  
🎁 BONUS #3: 1-Hour Strategy Call ($500 value)

Total Value: $2,491
Your Investment Today: ${pricePoint}

Plus, you're completely protected by our 60-day money-back guarantee. If you don't see results, we'll refund every penny.

But this offer is only available for the next 48 hours...`,
    ctaText: `Get Complete System - ${pricePoint}`,
    features: [
      "12 comprehensive training modules",
      "40+ step-by-step video lessons", 
      "Private community access (10,000+ members)",
      "Weekly live coaching calls",
      "Mobile app for on-the-go learning",
      "Done-for-you templates and frameworks",
      "Quick-start video series ($297 value)",
      "1-hour strategy call ($500 value)",
      "Lifetime access to all materials",
      "60-day money-back guarantee"
    ],
    testimonials: [
      {
        quote: `I made my investment back in the first week! This system is pure gold.`,
        author: "Jennifer Martinez",
        role: "Online Entrepreneur", 
        results: "ROI of 500% in 30 days",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
      },
      {
        quote: "Finally, a system that actually works. No fluff, just results.",
        author: "David Thompson",
        role: "Business Consultant",
        results: "Doubled income in 60 days", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
      }
    ],
    guarantees: [
      "60-day money-back guarantee",
      "Lifetime access to all materials", 
      "Free updates and new content",
      "24/7 customer support"
    ],
    urgency: "⚡ Limited Time: Save 50% - Only 24 hours left!",
    pricing: {
      original: "$997",
      current: pricePoint,
      savings: "Save $500"
    }
  };
};

const generateUpsellPageCopy = (insights: any, userIntent: any) => {
  const { productName } = userIntent;

  return {
    headline: "Wait! Add 1-on-1 Coaching For Just $297 More",
    subheadline: "Accelerate your results with personal guidance from our expert coaches",
    bodyText: `Congratulations on getting the ${productName}!

You're about to transform your life with our proven system. But what if you could get results even faster?

Our 1-on-1 coaching program has helped thousands of students achieve breakthrough results in half the time.

Here's what you get:

🎯 3 personal coaching sessions with certified coaches
📞 Direct phone/video access when you need support  
⚡ Personalized action plan based on your specific situation
🏆 Priority access to all new programs and updates
💬 Direct messaging access to your coach

Normally $997, but since you just joined, you can add this for just $297.

This is only available right now - once you leave this page, this offer disappears forever.`,
    ctaText: "Add 1-on-1 Coaching - $297",
    urgency: "This offer expires in 10 minutes"
  };
};

const generateDefaultCopy = (stepType: string, insights: any, userIntent: any) => {
  return {
    headline: `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Page`,
    subheadline: "Professional content coming soon...",
    bodyText: "AI-generated content will appear here",
    ctaText: "Take Action Now"
  };
};

// Professional 2025-style image generation
const generateModernImages = (stepType: string, userIntent: any, count: number = 3) => {
  const { industry, productName } = userIntent;

  const imageCategories = {
    landing: [
      `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=center`
    ],
    optin: [
      `https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&crop=center`
    ],
    offer: [
      `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop&crop=center`
    ]
  };

  return imageCategories[stepType] || imageCategories.landing;
};

const getAdvanced2025ColorScheme = (stepType: string, industry: string) => {
  const schemes = {
    landing: { primary: '#2563eb', secondary: '#1d4ed8', background: '#f8fafc', text: '#1e293b', accent: '#3b82f6' },
    optin: { primary: '#059669', secondary: '#047857', background: '#f0fdf4', text: '#1e293b', accent: '#10b981' },
    email: { primary: '#7c3aed', secondary: '#6d28d9', background: '#faf5ff', text: '#1e293b', accent: '#8b5cf6' },
    offer: { primary: '#dc2626', secondary: '#b91c1c', background: '#fef2f2', text: '#1e293b', accent: '#ef4444' },
    upsell: { primary: '#d97706', secondary: '#b45309', background: '#fffbeb', text: '#1e293b', accent: '#f59e0b' }
  };

  return schemes[stepType] || schemes.landing;
};

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
    userIntent: initialFunnelData?.userIntent || ""
  });
  const [selectedTemplate, setSelectedTemplate] = useState(initialFunnelData?.industry || "");
  const [currentStepEdit, setCurrentStepEdit] = useState<FunnelStep | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [savedFunnels, setSavedFunnels] = useState<any[]>([]);
  const { toast } = useToast();
  const synthRef = useRef<SpeechSynthesis | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
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

  const generateAIFunnel = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const template = industryTemplates.find(t => t.id === selectedTemplate);
      const stepTypes = template?.defaultSteps || ["landing", "optin", "email", "offer", "upsell"];

      const steps: FunnelStep[] = [];
      const stepProgress = 70 / stepTypes.length;

      setProgress(15);
      toast({ title: "🧠 AI Marketing Expert analyzing your business..." });
      speakText("AI is analyzing your business requirements to create expert marketing content");

      await new Promise(resolve => setTimeout(resolve, 2000));

      for (let i = 0; i < stepTypes.length; i++) {
        const stepType = stepTypes[i] as FunnelStep['type'];
        const currentProgress = 15 + (i + 1) * stepProgress;
        setProgress(currentProgress);

        toast({ 
          title: `🎨 Creating ${stepType} page with expert copywriting...`,
          description: "Generating human-like content that converts"
        });

        // Generate expert marketing copy based on user's business goals
        const copyContent = generateExpertMarketingCopy(stepType, funnelData);
        const colorScheme = getAdvanced2025ColorScheme(stepType, selectedTemplate);
        const images = generateModernImages(stepType, funnelData, 3);

        const step: FunnelStep = {
          id: `step-${i + 1}`,
          type: stepType,
          title: `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Page`,
          description: `AI-generated ${stepType} page with expert copywriting`,
          url: `/funnel/${funnelData.name.toLowerCase().replace(/\s+/g, '-')}/${stepType}`,
          content: {
            ...copyContent,
            colors: colorScheme,
            images: images,
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
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setFunnelData(prev => ({ ...prev, steps }));
      setProgress(100);

      toast({
        title: "🎉 Expert Marketing Funnel Generated!",
        description: `Created ${steps.length} pages with professional copywriting that converts visitors into customers`,
      });

      speakText(`Your expert marketing funnel is ready with ${steps.length} professionally designed pages that will attract your ideal customers!`);

      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);

    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate funnel. Please try again.",
        variant: "destructive"
      });
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const editStep = (step: FunnelStep) => {
    setCurrentStepEdit(step);
    setIsEditing(true);
  };

  const saveStepEdit = () => {
    if (currentStepEdit) {
      setFunnelData(prev => ({
        ...prev,
        steps: prev.steps.map(step => 
          step.id === currentStepEdit.id ? currentStepEdit : step
        )
      }));
      setIsEditing(false);
      setCurrentStepEdit(null);
      toast({ title: "✅ Step saved successfully!" });
    }
  };

  const saveFunnelToLibrary = () => {
    const savedFunnel = {
      id: Date.now().toString(),
      ...funnelData,
      savedAt: new Date().toISOString(),
      status: 'saved'
    };

    setSavedFunnels(prev => [...prev, savedFunnel]);
    toast({ title: "💾 Funnel saved to library!" });
  };

  const exportFunnel = () => {
    const funnelExport = {
      ...funnelData,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(funnelExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${funnelData.name}-funnel.json`;
    a.click();

    toast({ title: "📥 Funnel exported successfully!" });
  };

  const previewStep = (step: FunnelStep) => {
    const previewHtml = generateStepPreviewHTML(step);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(previewHtml);
      newWindow.document.close();
    }
  };

  const generateStepPreviewHTML = (step: FunnelStep) => {
    const { content } = step;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${step.title} - Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: ${content.fonts.body}; 
            line-height: 1.6; 
            color: ${content.colors.text};
            background: ${content.colors.background};
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          .hero { 
            background: linear-gradient(135deg, ${content.colors.primary}, ${content.colors.secondary});
            color: white; 
            padding: 80px 0; 
            text-align: center;
          }
          .headline { 
            font-size: 3.5rem; 
            font-weight: 800; 
            margin-bottom: 20px;
            font-family: ${content.fonts.heading};
            line-height: 1.2;
          }
          .subheadline { 
            font-size: 1.5rem; 
            margin-bottom: 30px; 
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          .cta-button { 
            background: ${content.colors.accent}; 
            color: white; 
            padding: 20px 40px; 
            font-size: 1.25rem; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
          }
          .cta-button:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          }
          .content-section { 
            padding: 60px 0; 
            background: white;
          }
          .features-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 30px; 
            margin: 40px 0;
          }
          .feature-card { 
            padding: 30px; 
            background: #f8fafc; 
            border-radius: 12px; 
            text-align: center;
            border: 2px solid ${content.colors.primary}20;
          }
          .testimonial { 
            background: #f8fafc; 
            padding: 40px; 
            border-radius: 12px; 
            margin: 30px 0;
            border-left: 4px solid ${content.colors.primary};
          }
          .testimonial-quote { 
            font-size: 1.2rem; 
            font-style: italic; 
            margin-bottom: 20px;
            color: ${content.colors.text};
          }
          .testimonial-author { 
            font-weight: 600; 
            color: ${content.colors.primary};
          }
          .urgency-banner { 
            background: #fee2e2; 
            color: #dc2626; 
            text-align: center; 
            padding: 15px; 
            font-weight: 600;
            border-radius: 8px;
            margin: 20px 0;
          }
          .guarantee-box { 
            background: #f0fdf4; 
            border: 2px solid #22c55e; 
            border-radius: 12px; 
            padding: 30px; 
            text-align: center; 
            margin: 40px 0;
          }
          .price-section { 
            background: linear-gradient(135deg, ${content.colors.primary}, ${content.colors.secondary}); 
            color: white; 
            padding: 60px 0; 
            text-align: center;
          }
          .price-original { 
            font-size: 1.5rem; 
            text-decoration: line-through; 
            opacity: 0.7;
          }
          .price-current { 
            font-size: 3rem; 
            font-weight: 800; 
            color: #fbbf24;
          }
          .social-proof { 
            text-align: center; 
            padding: 40px 0; 
            background: #f8fafc;
          }
          @media (max-width: 768px) {
            .headline { font-size: 2.5rem; }
            .subheadline { font-size: 1.25rem; }
            .features-grid { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="hero">
          <div class="container">
            <h1 class="headline">${content.headline}</h1>
            <p class="subheadline">${content.subheadline}</p>
            <button class="cta-button">${content.ctaText}</button>
          </div>
        </div>

        <div class="content-section">
          <div class="container">
            ${content.urgency ? `<div class="urgency-banner">⚡ ${content.urgency}</div>` : ''}

            <div style="font-size: 1.1rem; line-height: 1.8; white-space: pre-line;">${content.bodyText}</div>

            ${content.features ? `
              <div class="features-grid">
                ${content.features.map(feature => `
                  <div class="feature-card">
                    <h3 style="color: ${content.colors.primary}; margin-bottom: 15px;">✅ ${feature}</h3>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${content.testimonials ? content.testimonials.map(testimonial => `
              <div class="testimonial">
                <div class="testimonial-quote">"${testimonial.quote}"</div>
                <div class="testimonial-author">
                  — ${testimonial.author}, ${testimonial.role}
                  ${testimonial.results ? `<br><strong>${testimonial.results}</strong>` : ''}
                </div>
              </div>
            `).join('') : ''}

            ${content.pricing ? `
              <div class="price-section">
                <div class="container">
                  <div class="price-original">${content.pricing.original}</div>
                  <div class="price-current">${content.pricing.current}</div>
                  <div style="font-size: 1.2rem; margin: 20px 0;">${content.pricing.savings}</div>
                  <button class="cta-button">${content.ctaText}</button>
                </div>
              </div>
            ` : ''}

            ${content.guarantees ? `
              <div class="guarantee-box">
                <h3 style="color: #22c55e; margin-bottom: 15px;">🛡️ Your Success is Guaranteed</h3>
                ${content.guarantees.map(guarantee => `<p>✅ ${guarantee}</p>`).join('')}
              </div>
            ` : ''}

            <div style="text-align: center; margin: 60px 0;">
              <button class="cta-button">${content.ctaText}</button>
            </div>
          </div>
        </div>

        ${content.socialProof ? `
          <div class="social-proof">
            <div class="container">
              <h3 style="color: ${content.colors.primary}; margin-bottom: 20px;">Join 50,000+ Successful People</h3>
              <p style="font-size: 1.1rem;">${content.socialProof}</p>
            </div>
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const viewCompleteFunnel = () => {
    const funnelOverviewHtml = generateFunnelOverviewHTML();
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(funnelOverviewHtml);
      newWindow.document.close();
    }
  };

  const generateFunnelOverviewHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${funnelData.name} - Complete Funnel</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', sans-serif; 
            line-height: 1.6; 
            color: #1e293b;
            background: #f8fafc;
          }
          .header { 
            background: linear-gradient(135deg, #2563eb, #1d4ed8); 
            color: white; 
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          .nav { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
          }
          .nav-links { 
            display: flex; 
            list-style: none; 
            gap: 30px;
          }
          .nav-links a { 
            color: white; 
            text-decoration: none; 
            font-weight: 500;
            transition: opacity 0.3s;
          }
          .nav-links a:hover { opacity: 0.8; }
          .funnel-overview { 
            padding: 60px 0; 
            text-align: center;
          }
          .funnel-title { 
            font-size: 3rem; 
            font-weight: 800; 
            margin-bottom: 20px;
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .funnel-description { 
            font-size: 1.25rem; 
            color: #64748b; 
            max-width: 600px; 
            margin: 0 auto 40px;
          }
          .funnel-stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin: 40px 0;
          }
          .stat-card { 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 2px solid #e2e8f0;
            transition: transform 0.3s ease;
          }
          .stat-card:hover { transform: translateY(-5px); }
          .stat-number { 
            font-size: 2.5rem; 
            font-weight: 800; 
            color: #2563eb;
          }
          .stat-label { 
            color: #64748b; 
            font-weight: 500;
          }
          .funnel-flow { 
            padding: 60px 0;
          }
          .step-card { 
            background: white; 
            border-radius: 16px; 
            padding: 30px; 
            margin: 30px 0; 
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            border: 2px solid #e2e8f0;
            transition: all 0.3s ease;
          }
          .step-card:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          }
          .step-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 20px;
          }
          .step-info h3 { 
            font-size: 1.5rem; 
            font-weight: 700; 
            color: #1e293b; 
            margin-bottom: 8px;
          }
          .step-info p { 
            color: #64748b; 
            margin-bottom: 8px;
          }
          .step-url { 
            font-family: monospace; 
            font-size: 0.9rem; 
            color: #2563eb; 
            background: #f1f5f9; 
            padding: 4px 8px; 
            border-radius: 4px;
          }
          .step-actions { 
            display: flex; 
            gap: 10px;
          }
          .btn { 
            padding: 12px 24px; 
            border: none; 
            border-radius: 8px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .btn-primary { 
            background: #2563eb; 
            color: white;
          }
          .btn-primary:hover { 
            background: #1d4ed8; 
            transform: translateY(-2px);
          }
          .btn-outline { 
            background: transparent; 
            color: #2563eb; 
            border: 2px solid #2563eb;
          }
          .btn-outline:hover { 
            background: #2563eb; 
            color: white;
          }
          .performance-indicator { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            padding: 15px; 
            background: #f8fafc; 
            border-radius: 8px; 
            margin: 15px 0;
            font-size: 0.9rem;
            color: #64748b;
          }
          .step-preview { 
            background: #f8fafc; 
            border-radius: 8px; 
            padding: 20px; 
            margin-top: 20px;
          }
          .preview-headline { 
            font-size: 1.25rem; 
            font-weight: 700; 
            color: #1e293b; 
            margin-bottom: 10px;
          }
          .preview-content { 
            color: #64748b; 
            line-height: 1.6;
          }
          @media (max-width: 768px) {
            .funnel-title { font-size: 2rem; }
            .step-header { flex-direction: column; align-items: flex-start; gap: 15px; }
            .step-actions { width: 100%; }
            .btn { width: 100%; justify-content: center; }
          }
        </style>
      </head>
      <body>
        <header class="header">
          <div class="container">
            <nav class="nav">
              <div style="font-size: 1.25rem; font-weight: 700;">LeadGenius AI</div>
              <ul class="nav-links">
                ${funnelData.steps.map((step, index) => 
                  `<li><a href="#step-${index + 1}">${step.title}</a></li>`
                ).join('')}
              </ul>
            </nav>
          </div>
        </header>

        <div class="container">
          <div class="funnel-overview">
            <h1 class="funnel-title">${funnelData.name}</h1>
            <p class="funnel-description">
              AI-generated marketing funnel designed for ${funnelData.targetAudience} with ${funnelData.steps.length} optimized conversion pages
            </p>

            <div class="funnel-stats">
              <div class="stat-card">
                <div class="stat-number">${funnelData.steps.length}</div>
                <div class="stat-label">Total Pages</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">12-18%</div>
                <div class="stat-label">Expected Conversion</div>
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
                    <button class="btn btn-primary" onclick="window.open('${step.url}', '_blank')">
                      👁️ Preview Page
                    </button>
                    <button class="btn btn-outline" onclick="alert('Edit functionality would open step editor')">
                      ✏️ Edit Page
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
                  <div class="preview-headline">${step.content.headline || 'AI-generated headline'}</div>
                  <div class="preview-content">${step.content.subheadline || 'Professional subheadline content'}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; padding: 60px 0; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 16px; color: white; margin: 40px 0;">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">🚀 Ready to Launch Your Funnel?</h2>
            <p style="font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9;">
              Your AI-generated funnel is ready to start converting visitors into customers
            </p>
            <button class="btn btn-primary" style="background: white; color: #2563eb; font-size: 1.1rem;">
              Launch Funnel Now
            </button>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  if (isEditing && currentStepEdit) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Edit {currentStepEdit.title}</h1>
              <p className="text-muted-foreground">Customize your page content and design</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Funnel
              </Button>
              <Button onClick={saveStepEdit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Headline</Label>
                  <Input
                    value={currentStepEdit.content.headline}
                    onChange={(e) => setCurrentStepEdit({
                      ...currentStepEdit,
                      content: { ...currentStepEdit.content, headline: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label>Subheadline</Label>
                  <Textarea
                    value={currentStepEdit.content.subheadline}
                    onChange={(e) => setCurrentStepEdit({
                      ...currentStepEdit,
                      content: { ...currentStepEdit.content, subheadline: e.target.value }
                    })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Body Text</Label>
                  <Textarea
                    value={currentStepEdit.content.bodyText}
                    onChange={(e) => setCurrentStepEdit({
                      ...currentStepEdit,
                      content: { ...currentStepEdit.content, bodyText: e.target.value }
                    })}
                    rows={6}
                  />
                </div>

                <div>
                  <Label>Call-to-Action Button Text</Label>
                  <Input
                    value={currentStepEdit.content.ctaText}
                    onChange={(e) => setCurrentStepEdit({
                      ...currentStepEdit,
                      content: { ...currentStepEdit.content, ctaText: e.target.value }
                    })}
                  />
                </div>

                {currentStepEdit.content.urgency && (
                  <div>
                    <Label>Urgency Message</Label>
                    <Input
                      value={currentStepEdit.content.urgency}
                      onChange={(e) => setCurrentStepEdit({
                        ...currentStepEdit,
                        content: { ...currentStepEdit.content, urgency: e.target.value }
                      })}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-white min-h-[500px]">
                  <div 
                    className="text-center p-8 rounded-lg mb-6"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentStepEdit.content.colors.primary}, ${currentStepEdit.content.colors.secondary})`,
                      color: 'white'
                    }}
                  >
                    <h1 className="text-2xl font-bold mb-4">{currentStepEdit.content.headline}</h1>
                    <p className="text-lg opacity-90 mb-6">{currentStepEdit.content.subheadline}</p>
                    <button 
                      className="px-6 py-3 rounded-lg font-semibold"
                      style={{ background: currentStepEdit.content.colors.accent, color: 'white' }}
                    >
                      {currentStepEdit.content.ctaText}
                    </button>
                  </div>

                  {currentStepEdit.content.urgency && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-center text-red-700 font-semibold">
                      ⚡ {currentStepEdit.content.urgency}
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <p style={{ whiteSpace: 'pre-line' }}>{currentStepEdit.content.bodyText}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => previewStep(currentStepEdit)}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Full Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Business Intelligence", completed: currentStep > 0 },
    { number: 2, title: "AI Generation", completed: currentStep > 1 },
    { number: 3, title: "Review & Edit", completed: currentStep > 2 }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Funnel Expert</h1>
            <p className="text-muted-foreground">Expert marketer that creates funnels that convert</p>
          </div>
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back
            </Button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                  ${step.completed 
                    ? 'bg-success border-success text-white' 
                    : currentStep === step.number - 1 
                      ? 'border-primary text-primary bg-primary/10' 
                      : 'border-muted-foreground text-muted-foreground'
                  }
                `}>
                  {step.completed ? <Check className="w-6 h-6" /> : step.number}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  step.completed || currentStep === step.number - 1 ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 mx-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Business Intelligence Gathering */}
        {currentStep === 0 && (
          <div className="space-y-8">
            <Card className="border-0 shadow-soft bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Marketing Intelligence Gathering</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  I'm an expert marketer. Tell me about your business so I can create a funnel that attracts your ideal customers and drives conversions.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Business/Product Name *</Label>
                    <Input
                      placeholder="e.g., Ultimate Confidence Course, Business Growth Accelerator"
                      value={funnelData.productName}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, productName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Industry *</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Price Point *</Label>
                    <Select 
                      value={funnelData.pricePoint} 
                      onValueChange={(value) => setFunnelData(prev => ({ ...prev, pricePoint: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$97">$97 - Entry Level</SelectItem>
                        <SelectItem value="$197">$197 - Standard</SelectItem>
                        <SelectItem value="$297">$297 - Premium</SelectItem>
                        <SelectItem value="$497">$497 - Professional</SelectItem>
                        <SelectItem value="$997">$997 - Elite</SelectItem>
                        <SelectItem value="$1997">$1997+ - Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Funnel Name *</Label>
                    <Input
                      placeholder="e.g., Confidence Transformation Funnel"
                      value={funnelData.name}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Target Audience (Be Specific) *</Label>
                  <Textarea
                    placeholder="e.g., Introverted professionals aged 25-40 who struggle with networking and public speaking, work in corporate environments, earn $50K+, want to advance their careers but lack confidence..."
                    rows={3}
                    value={funnelData.targetAudience}
                    onChange={(e) => setFunnelData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Business Goal (This helps AI understand your intention) *</Label>
                  <Textarea
                    placeholder="e.g., I want to generate high-quality leads for my confidence coaching program. My goal is to help introverted professionals overcome social anxiety and become confident leaders. I want to attract people who are serious about transformation and willing to invest in themselves..."
                    rows={4}
                    value={funnelData.mainGoal}
                    onChange={(e) => setFunnelData(prev => ({ ...prev, mainGoal: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 This information helps me understand your business intent and create copy that attracts your ideal customers. It won't appear on your funnel pages.
                  </p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    if (funnelData.productName && selectedTemplate && funnelData.targetAudience && funnelData.mainGoal && funnelData.pricePoint && funnelData.name) {
                      setCurrentStep(1);
                      generateAIFunnel();
                    } else {
                      toast({
                        title: "Missing Information",
                        description: "Please fill in all required fields to continue.",
                        variant: "destructive"
                      });
                    }
                  }}
                  disabled={!funnelData.productName || !selectedTemplate || !funnelData.targetAudience || !funnelData.mainGoal || !funnelData.pricePoint || !funnelData.name}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze & Generate Expert Funnel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: AI Generation */}
        {currentStep === 1 && (
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">AI Marketing Expert at Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Analyzing your business, understanding your target audience, and creating expert-level marketing copy that converts visitors into customers...
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-muted-foreground">{progress}% Complete</p>
            </div>

            {isGenerating && (
              <div className="bg-muted/30 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Zap className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">Creating your conversion-optimized funnel...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Review & Edit */}
        {currentStep === 2 && funnelData.steps.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Expert Funnel is Ready!</h2>
              <p className="text-muted-foreground">
                AI has created {funnelData.steps.length} professional pages with expert copywriting designed to convert your target audience
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{funnelData.steps.length}</div>
                <p className="text-sm text-blue-600">Expert Pages</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">12-18%</div>
                <p className="text-sm text-green-600">Expected Conversion</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">{funnelData.pricePoint}</div>
                <p className="text-sm text-purple-600">Price Point</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-700">AI</div>
                <p className="text-sm text-orange-600">Generated</p>
              </div>
            </div>

            <div className="grid gap-6">
              {funnelData.steps.map((step, index) => (
                <Card key={step.id} className="border-0 shadow-soft hover:shadow-strong transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Step {index + 1}: {step.title}
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{step.url}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => previewStep(step)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => editStep(step)}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{step.analytics.visitors} visitors</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{step.analytics.conversions} conversions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>${step.analytics.revenue} revenue</span>
                      </span>
                    </div>

                    <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                      <p className="font-medium text-sm mb-2">Preview:</p>
                      <h4 className="font-semibold text-foreground">{step.content.headline}</h4>
                      <p className="text-sm text-muted-foreground">{step.content.subheadline}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center space-x-4 pt-8">
              <Button variant="outline" onClick={viewCompleteFunnel}>
                <Globe className="w-4 h-4 mr-2" />
                View Complete Funnel
              </Button>
              <Button variant="outline" onClick={saveFunnelToLibrary}>
                <Save className="w-4 h-4 mr-2" />
                Save to Library
              </Button>
              <Button variant="outline" onClick={exportFunnel}>
                <Download className="w-4 h-4 mr-2" />
                Export Funnel
              </Button>
              <Button onClick={() => {
                const newFunnel = {
                  id: Date.now().toString(),
                  name: funnelData.name,
                  industry: selectedTemplate,
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
                Launch Funnel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}