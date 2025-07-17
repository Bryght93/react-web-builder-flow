import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Target, DollarSign, BarChart3, Play, Pause, Eye, Edit, Zap, Users, MapPin, Calendar, TrendingUp, FileText, Globe, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AIAdLauncher() {
  const [selectedFunnel, setSelectedFunnel] = useState("");
  const [budget, setBudget] = useState([10]);
  const [duration, setDuration] = useState("7");
  const [targetingType, setTargetingType] = useState("ai-suggested");
  const [adGenerated, setAdGenerated] = useState(false);
  const [adLaunched, setAdLaunched] = useState(false);
  const [userMode, setUserMode] = useState("simplicity");
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignGoal, setCampaignGoal] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [creativeCopy, setCreativeCopy] = useState("");
  const [budgetSchedule, setBudgetSchedule] = useState({ type: "daily", amount: 10 });

  const wizardSteps = [
    { id: 1, title: "Campaign Goal", description: "Choose your advertising objective" },
    { id: 2, title: "Platform & Audience", description: "Select platforms and target audience" },
    { id: 3, title: "Creative & Copy", description: "Create your ad content" },
    { id: 4, title: "Budget & Schedule", description: "Set your budget and timing" },
    { id: 5, title: "Review & Launch", description: "Review and launch your campaign" }
  ];

  const platforms = [
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "instagram", name: "Instagram", icon: "📸" },
    { id: "google", name: "Google Ads", icon: "🔍" },
    { id: "tiktok", name: "TikTok", icon: "🎵" },
    { id: "linkedin", name: "LinkedIn", icon: "💼" },
    { id: "twitter", name: "Twitter/X", icon: "🐦" }
  ];

  const funnels = [
    { id: 1, name: "Lead Magnet Funnel", type: "Lead Generation", conversions: "12.3%" },
    { id: 2, name: "Product Launch Funnel", type: "Sales", conversions: "8.7%" },
    { id: 3, name: "Webinar Registration", type: "Event", conversions: "15.2%" },
    { id: 4, name: "Free Trial Signup", type: "SaaS", conversions: "9.8%" }
  ];

  const adCampaigns = [
    {
      id: 1,
      name: "Lead Magnet Campaign",
      status: "Active",
      platform: "Facebook + Instagram",
      budget: "$15/day",
      impressions: "12,547",
      clicks: "234",
      conversions: "18",
      cpc: "$0.64",
      cpa: "$12.50"
    },
    {
      id: 2,
      name: "Product Launch Ads",
      status: "Active",
      platform: "Facebook",
      budget: "$25/day",
      impressions: "8,932",
      clicks: "167",
      conversions: "12",
      cpc: "$0.89",
      cpa: "$18.75"
    },
    {
      id: 3,
      name: "Webinar Promotion",
      status: "Paused",
      platform: "Instagram",
      budget: "$10/day",
      impressions: "5,421",
      clicks: "89",
      conversions: "8",
      cpc: "$0.56",
      cpa: "$7.25"
    }
  ];

  const aiTargetingSuggestions = [
    { category: "Demographics", suggestions: ["Age: 25-45", "Gender: All", "Education: College+"] },
    { category: "Interests", suggestions: ["Digital Marketing", "Entrepreneurship", "Online Business", "Lead Generation"] },
    { category: "Behaviors", suggestions: ["Small Business Owners", "Engaged Shoppers", "Technology Early Adopters"] },
    { category: "Lookalike", suggestions: ["Similar to current customers", "Based on email subscribers", "Website visitors"] }
  ];

  const generateAd = () => {
    setAdGenerated(true);
  };

  const launchAd = () => {
    setAdLaunched(true);
  };

  // Mock AI functions that will be ready for API integration
  const generateAdCopy = async (productService: string, audience: string, tone: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockCopy = {
      professional: `🎯 STOP Wasting Money on ${productService} That Don't Work!\n\nListen, ${audience}... I know you're skeptical. You've been burned before by "miracle solutions" that promised the world and delivered nothing.\n\nBut here's the brutal truth: While you're sitting there doing nothing, your competitors are already using this proven ${productService.toLowerCase()} system to dominate the market.\n\n✅ PROVEN: 2,847 clients achieved results in 30 days\n✅ GUARANTEED: Full refund if you don't see results\n✅ EXCLUSIVE: Only 50 spots available this month\n\nFACT: Every day you wait costs you $247 in lost opportunities.\n\nYour two choices:\n1. Keep struggling with outdated methods\n2. Join the winners who took action\n\n👉 Click NOW - Your Future Self Will Thank You!`,
      casual: `Hey ${audience.toLowerCase()}... Can I be brutally honest? 👋\n\nYou're probably thinking "Another ${productService.toLowerCase()} pitch? Yeah right..."\n\nI get it. I was skeptical too. Tried everything. Wasted $3,000+.\n\nThen I found THIS system. (Changed everything)\n\nLook, I'm not gonna sugarcoat it:\n• Takes 2-3 weeks to see results\n• You'll need to follow the process exactly\n• Not for lazy people\n\nBUT... if you're serious about success:\n📈 Sarah made $12K in month 1\n📈 Mike quit his job after 6 weeks\n📈 Lisa doubled her income in 90 days\n\nProof inside. No BS. No hype.\n\n👆 See the evidence yourself`,
      urgent: `🚨 FINAL WARNING: This ${productService} Opportunity Expires in 11 Hours!\n\nListen ${audience.toUpperCase()}, I'll be straight with you...\n\nWhile you've been "thinking about it," 847 smart people already secured their spot.\n\nOnly 53 LEFT.\n\nHere's what happens when these spots are gone:\n❌ Price jumps from $97 to $497\n❌ Bonuses worth $1,200 disappear\n❌ You wait 6 months for the next opening\n\nI've seen too many people miss out and regret it for months.\n\nDon't be that person who says "I wish I had acted."\n\nYour last chance is RIGHT NOW.\n\n⏰ 11 hours left\n⏰ 53 spots remaining\n⏰ $1,200 in bonuses included\n\n🔥 SECURE YOUR SPOT BEFORE THE DEADLINE!`,
      friendly: `Hi ${audience.toLowerCase()}! 😊\n\nI know what you're thinking... "Another person trying to sell me something."\n\nFair enough. You should be skeptical.\n\nBut before you scroll past, let me share why this ${productService.toLowerCase()} is different:\n\n🎯 Created by someone who actually USED it (not just teaches it)\n🎯 Tested with 1,000+ real people like you\n🎯 Comes with a "prove it works" guarantee\n\nLook, I could flood you with testimonials, but actions speak louder than words.\n\nThat's why I'm giving you a 30-day trial. If it doesn't work for you, keep the bonuses and get your money back.\n\nNo risk. All reward.\n\n💙 Ready to see if this works for you?`
    };

    return mockCopy[tone as keyof typeof mockCopy] || mockCopy.professional;
  };

  const analyzeVisual = async (file: File) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      engagementScore: Math.floor(Math.random() * 40) + 60, // 60-100
      colorBalance: Math.floor(Math.random() * 30) + 70, // 70-100
      textReadability: Math.floor(Math.random() * 25) + 75, // 75-100
      suggestions: [
        "Consider adding more contrast to improve readability",
        "The color palette works well for your target audience",
        "Text placement could be optimized for mobile viewing"
      ]
    };
  };

  const generateHeadlineVariations = async (originalHeadline: string, goal: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const variations = {
      clicks: [
        `${originalHeadline} - Click to Learn More!`,
        `Discover: ${originalHeadline}`,
        `Don't Miss: ${originalHeadline}`,
        `New: ${originalHeadline} (Limited Time)`
      ],
      conversions: [
        `Get Results: ${originalHeadline}`,
        `Proven Solution: ${originalHeadline}`,
        `Transform Your Life: ${originalHeadline}`,
        `Success Story: ${originalHeadline}`
      ],
      engagement: [
        `What if: ${originalHeadline}?`,
        `The Truth About: ${originalHeadline}`,
        `Why Everyone's Talking About: ${originalHeadline}`,
        `You Won't Believe: ${originalHeadline}`
      ]
    };

    return variations[goal as keyof typeof variations] || variations.clicks;
  };

  const auditAd = async (adUrl: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    return {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      improvements: [
        {
          category: "Copy",
          suggestion: "Add emotional triggers to increase engagement",
          impact: "Medium",
          priority: "High"
        },
        {
          category: "Visual",
          suggestion: "Use brighter colors to stand out in feed",
          impact: "High", 
          priority: "Medium"
        },
        {
          category: "Targeting",
          suggestion: "Narrow age range to 25-35 for better performance",
          impact: "Medium",
          priority: "High"
        },
        {
          category: "Budget",
          suggestion: "Increase budget by 20% during peak hours",
          impact: "High",
          priority: "Low"
        }
      ]
    };
  };

  // State for AI features
  const [copyGeneratorState, setCopyGeneratorState] = useState({
    productService: '',
    audience: '',
    tone: '',
    generatedCopy: '',
    isGenerating: false,
    savedToLibrary: false // Added state to track if saved to library
  });

  const [visualAnalyzerState, setVisualAnalyzerState] = useState({
    selectedFile: null as File | null,
    analysisResult: null as any,
    isAnalyzing: false
  });

  const [headlineTesterState, setHeadlineTesterState] = useState({
    originalHeadline: '',
    optimizationGoal: '',
    variations: [] as string[],
    isGenerating: false
  });

  const [adAuditState, setAdAuditState] = useState({
    adUrl: '',
    auditResult: null as any,
    isAuditing: false
  });

  // AI Feature selection state
  const [selectedAIFeature, setSelectedAIFeature] = useState('multi-platform');

  // New enhanced AI features state
  const [carouselAdState, setCarouselAdState] = useState({
    generationType: '',
    productName: '',
    keyBenefits: '',
    audience: '',
    dimensions: '',
    colorScheme: '',
    isGenerating: false,
    generatedAds: [] as any[],
    generatedImageAd: null as any
  });

  const [videoAdState, setVideoAdState] = useState({
    funnel: '',
    audience: '',
    tone: 'professional',
    isGenerating: false,
    generatedScript: ''
  });

  const [targetingPresetsState, setTargetingPresetsState] = useState({
    business: '',
    audience: '',
    isGenerating: false,
    generatedPresets: [] as any[]
  });

  const [multiPlatformState, setMultiPlatformState] = useState({
    funnel: '',
    audience: '',
    tone: 'professional',
    selectedPlatforms: [] as string[],
    isGenerating: false,
    generatedCopies: {} as any
  });

  // Enhanced AI handler functions for professional marketing
  const handleGenerateCopy = async () => {
    if (!copyGeneratorState.productService || !copyGeneratorState.audience || !copyGeneratorState.tone) {
      alert('Please fill in all fields');
      return;
    }

    setCopyGeneratorState(prev => ({ ...prev, isGenerating: true }));

    try {
      const generatedCopy = await generateAdCopy(
        copyGeneratorState.productService,
        copyGeneratorState.audience,
        copyGeneratorState.tone
      );
      // Automatically save to library after generating
      setCopyGeneratorState(prev => ({ ...prev, generatedCopy, isGenerating: false, savedToLibrary: true }));
    } catch (error) {
      setCopyGeneratorState(prev => ({ ...prev, isGenerating: false }));
      alert('Error generating copy. Please try again.');
    }
  };

  const handleGenerateCarouselAds = async () => {
    if (!carouselAdState.generationType || !carouselAdState.productName || !carouselAdState.audience) {
      alert('Please fill in all required fields');
      return;
    }

    setCarouselAdState(prev => ({ ...prev, isGenerating: true }));

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (carouselAdState.generationType === 'image-creative') {
      // Generate single ad creative
      const mockImageAd = {
        headline: `Master ${carouselAdState.productName} in Record Time!`,
        bulletPoints: carouselAdState.keyBenefits.split(',').slice(0, 4).map(benefit => benefit.trim()),
        cta: "CLAIM YOUR SPOT NOW - LIMITED TIME!",
        designElements: {
          colorScheme: carouselAdState.colorScheme,
          dimensions: carouselAdState.dimensions,
          style: "Professional with high-impact visuals"
        }
      };

      setCarouselAdState(prev => ({ 
        ...prev, 
        generatedImageAd: mockImageAd, 
        isGenerating: false 
      }));
    } else {
      // Generate carousel ads
      const benefits = carouselAdState.keyBenefits.split(',').map(b => b.trim());

      const mockCarouselAds = [
        {
          id: 1,
          title: "The Problem",
          headline: `Why ${carouselAdState.audience} Struggle with ${carouselAdState.productName.split(' ')[0]}`,
          description: "Most people fail because they don't know these 3 hidden obstacles...",
          image: "🚫",
          bulletPoints: ["Lack of proven system", "Information overload", "No step-by-step guidance"]
        },
        {
          id: 2,
          title: "The Solution", 
          headline: `${carouselAdState.productName} - The System That Actually Works`,
          description: "This proven framework has helped thousands achieve results...",
          image: "✅",
          bulletPoints: benefits.slice(0, 3)
        },
        {
          id: 3,
          title: "What You Get",
          headline: "Everything You Need to Succeed",
          description: "Complete system with templates, examples, and support...",
          image: "📦",
          bulletPoints: benefits.slice(3, 6)
        },
        {
          id: 4,
          title: "Social Proof",
          headline: "Real Results From Real People",
          description: "See how students went from zero to hero in just weeks...",
          image: "📈",
          bulletPoints: ["Sarah: $10K in month 1", "Mike: Quit his job after 6 weeks", "Lisa: Doubled income in 90 days"]
        },
        {
          id: 5,
          title: "The Offer",
          headline: `Get ${carouselAdState.productName} (Limited Time)`,
          description: "Join thousands who've already transformed their results. Act now!",
          image: "🎯",
          bulletPoints: ["Limited time pricing", "30-day money back guarantee", "Instant access"]
        }
      ];

      setCarouselAdState(prev => ({ 
        ...prev, 
        generatedAds: mockCarouselAds, 
        isGenerating: false 
      }));
    }
  };

  const handleGenerateVideoScript = async () => {
    if (!videoAdState.funnel || !videoAdState.audience) {
      alert('Please fill in funnel and audience fields');
      return;
    }

    setVideoAdState(prev => ({ ...prev, isGenerating: true }));

    // Simulate AI generating video script
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockVideoScript = `🎬 VIDEO AD SCRIPT - ${videoAdState.funnel.toUpperCase()}\n\n[HOOK - 0-3 seconds]\n"Stop! If you're a ${videoAdState.audience.toLowerCase()} struggling with ${videoAdState.funnel.toLowerCase()}, this will change everything..."\n\n[PROBLEM - 3-8 seconds]\n"I know you've tried everything. Downloaded the free PDFs. Watched the YouTube videos. Maybe even bought a few courses.\n\nBut you're still stuck, right?"\n\n[AGITATE - 8-15 seconds]\n"Meanwhile, your competitors are crushing it. They're getting the results you want. And every day you wait, you fall further behind.\n\nThe truth? It's not your fault. You just don't have the right system."\n\n[SOLUTION - 15-25 seconds]\n"That's why I created this ${videoAdState.funnel} framework. It's the exact system that helped me go from struggling to generating $50K/month.\n\nAnd now, 2,847 people have used it to transform their business."\n\n[PROOF - 25-35 seconds]\n"Like Sarah, who made $12K in her first month. Or Mike, who quit his job after 6 weeks. Real people. Real results."\n\n[CALL TO ACTION - 35-45 seconds]\n"Look, I could charge $2,000 for this. But for the next 48 hours, you can get everything for just $97.\n\nClick the link below. Your future self will thank you."\n\n[URGENCY - 45-50 seconds]\n"But hurry. This offer expires in 48 hours. Don't be the person who says 'I wish I had acted.'"\n\n[FINAL CTA - 50-60 seconds]\n"Click now. Take action. Your breakthrough is waiting."\n\n[END SCREEN]\n"👆 CLICK HERE TO GET STARTED"`;

    setVideoAdState(prev => ({ ...prev, generatedScript: mockVideoScript, isGenerating: false }));
  };

  const handleGenerateTargetingPresets = async () => {
    if (!targetingPresetsState.business || !targetingPresetsState.audience) {
      alert('Please fill in business and audience fields');
      return;
    }

    setTargetingPresetsState(prev => ({ ...prev, isGenerating: true }));

    // Simulate AI generating targeting presets
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockPresets = [
      {
        id: 1,
        name: "High-Intent Warm Audience",
        description: "People who visited your site but didn't buy",
        targeting: {
          demographics: "Age: 25-45, All genders, College+",
          interests: [`${targetingPresetsState.business}`, "Online Learning", "Business Growth"],
          behaviors: "Visited website in last 30 days, Didn't purchase",
          lookalike: "Based on email subscribers (1%)"
        },
        expectedCPA: "$15-25",
        estimatedReach: "45,000-78,000"
      },
      {
        id: 2,
        name: "Cold Audience - Competitor Interest",
        description: "People interested in your competitors",
        targeting: {
          demographics: "Age: 28-50, All genders, College+",
          interests: ["Digital Marketing", "Online Business", "Entrepreneurship"],
          behaviors: "Engaged with competitor content, Small business owners",
          lookalike: "Based on purchasers (2%)"
        },
        expectedCPA: "$28-40",
        estimatedReach: "120,000-250,000"
      },
      {
        id: 3,
        name: "Retargeting High-Value Prospects",
        description: "People who engaged but need more nurturing",
        targeting: {
          demographics: "Age: 30-55, All genders, College+",
          interests: [`${targetingPresetsState.business}`, "Professional Development"],
          behaviors: "Clicked ads, Watched videos 50%+, Didn't convert",
          lookalike: "Based on high-value customers (1%)"
        },
        expectedCPA: "$12-18",
        estimatedReach: "15,000-32,000"
      }
    ];

    setTargetingPresetsState(prev => ({ ...prev, generatedPresets: mockPresets, isGenerating: false }));
  };

  const handleGenerateMultiPlatformCopy = async () => {
    if (!multiPlatformState.funnel || !multiPlatformState.audience || multiPlatformState.selectedPlatforms.length === 0) {
      alert('Please fill in all fields and select at least one platform');
      return;
    }

    setMultiPlatformState(prev => ({ ...prev, isGenerating: true }));

    // Simulate AI generating platform-specific copy
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockPlatformCopies = {
      facebook: {
        tone: "value-based",
        copy: `🎯 ATTENTION ${multiPlatformState.audience.toUpperCase()}!\n\nAre you tired of watching others succeed with ${multiPlatformState.funnel.toLowerCase()} while you're stuck?\n\nHere's the truth: You don't need more information. You need a proven SYSTEM.\n\n✅ Step-by-step framework\n✅ Real case studies\n✅ 30-day money-back guarantee\n\nOver 2,847 people have already transformed their business with this method.\n\nYour turn. Click the link below.`,
        cta: "Get Instant Access Now →"
      },
      instagram: {
        tone: "curiosity",
        copy: `What if I told you that ${multiPlatformState.audience.toLowerCase()} are making $10K/month with ${multiPlatformState.funnel.toLowerCase()}... 🤔\n\nAnd they're doing it with a simple 3-step system that takes 30 minutes a day?\n\nI know it sounds too good to be true...\n\nBut I've got the proof. 📈\n\nSwipe to see the exact method that's working right now.\n\n#${multiPlatformState.funnel.replace(/\s+/g, '')} #Success #Business`,
        cta: "Link in bio 👆"
      },
      tiktok: {
        tone: "urgency",
        copy: `POV: You're a ${multiPlatformState.audience.toLowerCase()} who's been struggling with ${multiPlatformState.funnel.toLowerCase()} for MONTHS 😩\n\nThen you discover this ONE system that changes everything...\n\nIt's literally what Sarah used to make $12K in her first month 🤯\n\nBut here's the catch: This method only works if you actually USE it\n\nReady to stop making excuses? 👇`,
        cta: "Click the link NOW ⬇️"
      },
      youtube: {
        tone: "testimonial-style",
        copy: `"I was skeptical about ${multiPlatformState.funnel.toLowerCase()} systems. Tried everything. Wasted $3,000+.\n\nThen I found this method...\n\nIn 90 days, I went from $0 to $15K/month. My life completely changed.\n\nIf you're a ${multiPlatformState.audience.toLowerCase()} who's tired of struggling, this is for you.\n\nWatch the full training to see exactly how I did it."`,
        cta: "👆 WATCH THE TRAINING"
      },
      google: {
        tone: "value-based",
        copy: `${multiPlatformState.funnel} System for ${multiPlatformState.audience}\n\nProven Method | 2,847 Success Stories | 30-Day Guarantee\n\nTired of struggling? Get the exact system that generated $2.4M in results.\n\n✓ Step-by-step training\n✓ Real case studies\n✓ Money-back guarantee\n\nJoin thousands who've already transformed their business.`,
        cta: "Get Started Today"
      }
    };

    const generatedCopies = {};
    multiPlatformState.selectedPlatforms.forEach(platform => {
      generatedCopies[platform] = mockPlatformCopies[platform];
    });

    setMultiPlatformState(prev => ({ ...prev, generatedCopies, isGenerating: false }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setVisualAnalyzerState(prev => ({ ...prev, selectedFile: file, isAnalyzing: true }));

    try {
      const analysisResult = await analyzeVisual(file);
      setVisualAnalyzerState(prev => ({ ...prev, analysisResult, isAnalyzing: false }));
    } catch (error) {
      setVisualAnalyzerState(prev => ({ ...prev, isAnalyzing: false }));
      alert('Error analyzing image. Please try again.');
    }
  };

  const handleGenerateHeadlines = async () => {
    if (!headlineTesterState.originalHeadline || !headlineTesterState.optimizationGoal) {
      alert('Please fill in all fields');
      return;
    }

    setHeadlineTesterState(prev => ({ ...prev, isGenerating: true }));

    try {
      const variations = await generateHeadlineVariations(
        headlineTesterState.originalHeadline,
        headlineTesterState.optimizationGoal
      );
      setHeadlineTesterState(prev => ({ ...prev, variations, isGenerating: false }));
    } catch (error) {
      setHeadlineTesterState(prev => ({ ...prev, isGenerating: false }));
      alert('Error generating headlines. Please try again.');
    }
  };

  const handleAuditAd = async () => {
    if (!adAuditState.adUrl) {
      alert('Please enter an ad URL');
      return;
    }

    setAdAuditState(prev => ({ ...prev, isAuditing: true }));

    try {
      const auditResult = await auditAd(adAuditState.adUrl);
      setAdAuditState(prev => ({ ...prev, auditResult, isAuditing: false }));
    } catch (error) {
      setAdAuditState(prev => ({ ...prev, isAuditing: false }));
      alert('Error auditing ad. Please try again.');
    }
  };

  // Quick action handlers
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'boost':
        alert('🚀 Boosting your best performing product ads by 25%! Campaign updated.');
        break;
      case 'duplicate':
        alert('📋 Top performing ad duplicated across 3 new audiences. Check your campaigns.');
        break;
      case 'rebalance':
        alert('⚖️ AI has rebalanced your budget. Moved $50 from low-performing to high-performing ads.');
        break;
      case 'summary':
        alert('📊 Weekly summary: 23% increase in conversions, $145 saved through optimization.');
        break;
      default:
        alert('Action completed successfully!');
    }
  };

  // Generate AI copy for wizard
  const handleGenerateWizardCopy = async () => {
    if (!campaignGoal) {
      alert('Please select a campaign goal first');
      return;
    }

    const mockCopy = {
      awareness: "Discover the solution that's changing everything. Join thousands who've already made the switch to better results.",
      traffic: "Ready to transform your business? Click to learn the proven strategies that actually work.",
      leads: "Get exclusive access to our proven system. Enter your email and start seeing results in 24 hours.",
      sales: "Limited time offer: Get 50% off our bestselling product. Thousands of happy customers can't be wrong!",
      retargeting: "Still thinking about it? Here's what you missed - and why you should act now."
    };

    const copy = mockCopy[campaignGoal as keyof typeof mockCopy] || mockCopy.awareness;
    setCreativeCopy(copy);
    alert('AI copy generated! Check the Creative & Copy section.');
  };

    // Function to handle content regeneration
    const regenerateContent = (type: string, state: any) => {
      if (type === 'copy') {
        // Trigger copy generation again
        handleGenerateCopy();
      } else if (type === 'carousel') {
        // Logic to regenerate carousel ads
        handleGenerateCarouselAds();
      } else if (type === 'video') {
        // Logic to regenerate video script
        handleGenerateVideoScript();
      }
    };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Ad Launcher</h1>
          <p className="text-muted-foreground">Launch Facebook & Instagram ads directly from your app</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="create">New Campaign</TabsTrigger>
          <TabsTrigger value="library">Ad Library</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai-assist">AI Assist</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$847</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2x</div>
                <p className="text-xs text-muted-foreground">Return on ad spend</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap```tool_code
-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Optimization Opportunity</p>
                      <p className="text-sm text-muted-foreground">Increase budget on Instagram ads by 25%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Ad Fatigue Detected</p>
                      <p className="text-sm text-muted-foreground">Webinar ad needs creative refresh</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => alert('📊 Opening full AI insights report... Detailed analysis of all campaigns, opportunities, and recommendations.')}>
                  View Full Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('boost')}>
                  <Zap className="w-4 h-4 mr-2" />
                  1-Click Boost Best Product
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('duplicate')}>
                  <Target className="w-4 h-4 mr-2" />
                  Duplicate Top Performer
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('rebalance')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  AI Budget Rebalancer
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => handleQuickAction('summary')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Weekly Smart Summary
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          {/* User Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Mode</CardTitle>
              <CardDescription>Select how you'd like to create your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    userMode === "simplicity" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setUserMode("simplicity")}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-medium">🙌 Simplicity Mode</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">AI builds your ad in 5 clicks. Perfect for beginners.</p>
                </div>
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    userMode === "pro" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setUserMode("pro")}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="font-medium">🤓 Pro Mode</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Full control over targeting, bidding, and optimization.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Step Wizard */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Wizard</CardTitle>
              <CardDescription>Launch your campaign in 5 simple steps</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-6">
                {wizardSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep === step.id ? "bg-primary text-primary-foreground" :
                      currentStep > step.id ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-green-500" : "bg-muted"
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Step 1: Campaign Goal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: "awareness", title: "Brand Awareness", desc: "Reach more people", icon: "👁️" },
                      { id: "traffic", title: "Website Traffic", desc: "Drive visitors to your site", icon: "🚀" },
                      { id: "leads", title: "Lead Generation", desc: "Capture leads and contacts", icon: "🎯" },
                      { id: "sales", title: "Sales", desc: "Drive purchases and revenue", icon: "💰" },
                      { id: "retargeting", title: "Retargeting", desc: "Re-engage past visitors", icon: "🔄" }
                    ].map((goal) => (
                      <div 
                        key={goal.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          campaignGoal === goal.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setCampaignGoal(goal.id)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{goal.icon}</div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground">{goal.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Step 2: Platform & Audience</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Platforms</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {platforms.map((platform) => (
                          <div 
                            key={platform.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedPlatforms.includes(platform.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => {
                              if (selectedPlatforms.includes(platform.id)) {
                                setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                              } else {
                                setSelectedPlatforms([...selectedPlatforms, platform.id]);
                              }
                            }}
                          >
                            <div className="text-center">
                              <div className="text-xl mb-1">{platform.icon}</div>
                              <p className="text-sm font-medium">{platform.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {userMode === "simplicity" && (
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">🤖 AI Suggested Targeting</h4>
                        <p className="text-sm text-muted-foreground mb-3">Based on your goal "{campaignGoal}", we recommend:</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Age: 25-45</Badge>
                          <Badge variant="secondary">Interests: Digital Marketing</Badge>
                          <Badge variant="secondary">Location: Nigeria</Badge>
                          <Badge variant="secondary">Lookalike: Similar to customers</Badge>
                        </div>
                      </div>
                    )}

                    {userMode === "pro" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Age Range</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select age range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="18-24">18-24</SelectItem>
                                <SelectItem value="25-34">25-34</SelectItem>
                                <SelectItem value="35-44">35-44</SelectItem>
                                <SelectItem value="45-54">45-54</SelectItem>
                                <SelectItem value="55+">55+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input placeholder="Enter target locations" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Interests</Label>
                          <Textarea placeholder="Enter interests, behaviors, or keywords..." rows={3} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Step 3: Creative & Copy</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Ad Copy</Label>
                        <Textarea 
                          placeholder="Enter your ad copy or let AI generate it..."
                          rows={4}
                          value={creativeCopy}
                          onChange={(e) => setCreativeCopy(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Call-to-Action</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select CTA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="learn-more">Learn More</SelectItem>
                            <SelectItem value="sign-up">Sign Up</SelectItem>
                            <SelectItem value="shop-now">Shop Now</SelectItem>
                            <SelectItem value="download">Download</SelectItem>
                            <SelectItem value="get-quote">Get Quote</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" className="w-full" onClick={handleGenerateWizardCopy}>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate with AI
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Creative Assets</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">Upload images or videos</p>
                          <Button variant="outline" className="mt-4">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Platform requirements:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Facebook: 1200x628px (recommended)</li>
                          <li>Instagram: 1080x1080px (square)</li>
                          <li>TikTok: 1080x1920px (vertical)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Step 4: Budget & Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Budget Type</Label>
                        <div className="flex space-x-4">
                          <div 
                            className={`p-3 border rounded-lg cursor-pointer flex-1 text-center ${
                              budgetSchedule.type === "daily" ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            onClick={() => setBudgetSchedule({...budgetSchedule, type: "daily"})}
                          >
                            <p className="font-medium">Daily Budget</p>
                            <p className="text-sm text-muted-foreground">Spend per day</p>
                          </div>
                          <div 
                            className={`p-3 border rounded-lg cursor-pointer flex-1 text-center ${
                              budgetSchedule.type === "lifetime" ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            onClick={() => setBudgetSchedule({...budgetSchedule, type: "lifetime"})}
                          >
                            <p className="font-medium">Lifetime Budget</p>
                            <p className="text-sm text-muted-foreground">Total to spend</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount: ${budgetSchedule.amount}</Label>
                        <Slider
                          value={[budgetSchedule.amount]}
                          onValueChange={(value) => setBudgetSchedule({...budgetSchedule, amount: value[0]})}
                          max={500}
                          min={5}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>$5</span>
                          <span>$500+</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Campaign Duration</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Days</SelectItem>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="14">14 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">📊 Smart Spend Estimator</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Estimated Daily Reach:</span>
                            <span className="font-medium">{Math.round(budgetSchedule.amount * 120)} - {Math.round(budgetSchedule.amount * 200)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expected Clicks:</span>
                            <span className="font-medium">{Math.round(budgetSchedule.amount * 2.4)} - {Math.round(budgetSchedule.amount * 6.4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Est. Cost per Click:</span>
                            <span className="font-medium">$0.42 - $0.68</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Step 5: Review & Launch</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Campaign Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Goal:</span>
                            <span className="text-sm capitalize">{campaignGoal || "Not selected"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Platforms:</span>
                            <span className="text-sm">{selectedPlatforms.length > 0 ? selectedPlatforms.join(", ") : "None"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Budget:</span>
                            <span className="text-sm">${budgetSchedule.amount}/{budgetSchedule.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Duration:</span>
                            <span className="text-sm">{duration} {duration === "ongoing" ? "" : "days"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Mode:</span>
                            <span className="text-sm capitalize">{userMode}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex items-center space-x-2">
                        <Switch id="ai-optimize" />
                        <Label htmlFor="ai-optimize" className="text-sm">
                          "Optimize for Me" - Let AI improve copy & targeting
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={launchAd}
                          disabled={!campaignGoal || selectedPlatforms.length === 0}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Launch Campaign
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => alert('💾 Campaign saved as draft! You can continue editing later from your dashboard.')}>
                          Save as Draft
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="border rounded-lg p-4 bg-muted/50">
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="font-medium text-sm">Your Business</p>
                                <p className="text-xs text-muted-foreground">Sponsored</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm text-muted-foreground">Your Creative</span>
                              </div>

                              <div>
                                <p className="font-medium text-sm">
                                  {creativeCopy || "Your ad copy will appear here"}
                                </p>
                              </div>

                              <Button variant="outline" size="sm" className="w-full">
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  disabled={currentStep === 5}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Original Ad Setup - now hidden or used for Pro mode */}
            <div className="lg:col-span-2 space-y-6" style={{ display: 'none' }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Campaign Setup</span>
                  </CardTitle>
                  <CardDescription>
                    Configure your ad campaign settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="funnel">Select Funnel</Label>
                    <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your funnel" />
                      </SelectTrigger>
                      <SelectContent>
                        {funnels.map((funnel) => (
                          <SelectItem key={funnel.id} value={funnel.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>{funnel.name}</span>
                              <Badge variant="outline" className="ml-2">{funnel.type}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Budget: ${budget[0]}</Label>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$5</span>
                      <span>$100+</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* AI Targeting */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>AI Smart Targeting</span>
                  </CardTitle>
                  <CardDescription>
                    AI-suggested targeting based on your niche and funnel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={targetingType === "ai-suggested"}
                        onCheckedChange={(checked) => setTargetingType(checked ? "ai-suggested" : "manual")}
                      />
                      <Label>Use AI-suggested targeting</Label>
                    </div>
                  </div>

                  {targetingType === "ai-suggested" && (
                    <div className="space-y-4">
                      {aiTargetingSuggestions.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-medium text-sm">{category.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.suggestions.map((suggestion, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {targetingType === "manual" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Custom Audience</Label>
                        <Textarea
                          placeholder="Describe your target audience..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Age Range</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45-54">45-54</SelectItem>
                              <SelectItem value="55+">55+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input placeholder="Enter locations" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {!adGenerated ? (
                <Button 
                  onClick={generateAd}
                  disabled={!selectedFunnel}
                  className="w-full"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Ad Content with AI
                </Button>
              ) : (
                <Button 
                  onClick={launchAd}
                  disabled={adLaunched}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {adLaunched ? "Ad Launched!" : "Launch Ad Campaign"}
                </Button>
              )}
            </div>

            {/* Ad Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Preview</CardTitle>
                  <CardDescription>
                    See how your ad will appear
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {adGenerated ? (
                    <div className="space-y-4">
                      {/* Mock ad preview */}
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">Your Business</p>
                            <p className="text-xs text-muted-foreground">Sponsored</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">Ad Image/Video</span>
                          </div>

                          <div>
                            <h4 className="font-semibold">🚀 Transform Your Business Today!</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Join thousands who've discovered the secret to generating quality leads automatically...
                            </p>
                          </div>

                          <Button variant="outline" size="sm" className="w-full">
                            Learn More
                          </Button>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Generate ad content to see preview</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estimated Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Reach</span>
                      <span className="font-medium">1,200 - 3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expected Clicks</span>
                      <span className="font-medium">24 - 64</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Est. CPC</span>
                      <span className="font-medium">$0.42 - $0.68</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium">8% - 15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Active Campaigns</h2>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {adCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{campaign.platform}</span>
                        <span>{campaign.budget}</span>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => alert(`✏️ Opening ${campaign.name} campaign editor... You can modify targeting, budget, and schedule.`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => alert(`${campaign.status === "Active" ? "⏸️ Campaign paused" : "▶️ Campaign resumed"} successfully!`)}>
                        {campaign.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-medium">{campaign.impressions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-medium">{campaign.clicks}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CPC</p>
                      <p className="font-medium">{campaign.cpc}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CPA</p>
                      <p className="font-medium">{campaign.cpa}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CTR</p>
                      <p className="font-medium">
                        {((parseInt(campaign.clicks) / parseInt(campaign.impressions.replace(',', ''))) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Ad Library</h2>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Import Ad
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Ad Copies</CardTitle>
                <CardDescription>Your generated ad content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Lead Magnet Ad</p>
                    <p className="text-xs text-muted-foreground">Professional tone • Saved to library</p>
                  </div>
                  <Button variant="outline" className="w-full">View All</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Scripts</CardTitle>
                <CardDescription>Generated video ad scripts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Course Launch Script</p>
                    <p className="text-xs text-muted-foreground">60 seconds • Saved to library</p>
                  </div>
                  <Button variant="outline" className="w-full">View All</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carousel Ads</CardTitle>
                <CardDescription>Image ad creatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">Product Showcase</p>
                    <p className="text-xs text-muted-foreground">5 slides • Saved to library</p>
                  </div>
                  <Button variant="outline" className="w-full">View All</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audiences" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Audience Management</h2>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Create Audience
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Audiences</CardTitle>
                <CardDescription>Your custom audience segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Warm Leads", size: "2,847", description: "Website visitors, didn't convert" },
                    { name: "Course Buyers", size: "423", description: "Previous course purchasers" },
                    { name: "Email Subscribers", size: "5,621", description: "Newsletter subscribers" }
                  ].map((audience, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{audience.name}</p>
                        <p className="text-sm text-muted-foreground">{audience.description}</p>
                      </div>
                      <Badge variant="outline">{audience.size}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Audience Builder</CardTitle>
                <CardDescription>Create audiences with AI assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Input placeholder="e.g., Online Course Creator" />
                </div>
                <div className="space-y-2">
                  <Label>Target Customer</Label>
                  <Textarea placeholder="Describe your ideal customer..." rows={3} />
                </div>
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Audience Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Campaign Analytics</h2>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,847</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2x</div>
                <p className="text-xs text-muted-foreground">Return on ad spend</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cost per Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.50</div>
                <p className="text-xs text-muted-foreground">-15% improvement</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Click-through Rate</span>
                      <span>2.4%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span>8.7%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ad Relevance Score</span>
                      <span>9.2/10</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { platform: "Facebook", spend: "$1,420", conversions: "67", roas: "4.8x" },
                    { platform: "Instagram", spend: "$892", conversions: "34", roas: "3.9x" },
                    { platform: "Google", spend: "$535", conversions: "41", roas: "4.1x" }
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{platform.platform}</p>
                        <p className="text-sm text-muted-foreground">{platform.spend} spent</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{platform.conversions} conversions</p>
                        <p className="text-sm text-muted-foreground">{platform.roas} ROAS</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-assist" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">AI Assist</h2>
              <p className="text-muted-foreground">Advanced AI tools for marketing professionals</p>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-blue-100">
              ✨ Pro Features
            </Badge>
          </div>

          <div className="flex gap-6 h-[600px]">
            {/* Left Sidebar - AI Feature Navigation */}
            <div className="w-80 border-r border-border pr-6">
              <div className="space-y-2">
                <Button
                  variant={selectedAIFeature === 'multi-platform' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('multi-platform')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🌐</span>
                    <div className="text-left">
                      <div className="font-medium">Multi-Platform Copy Generator</div>
                      <div className="text-xs text-muted-foreground">Platform-optimized ad copy</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'video-script' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('video-script')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎬</span>
                    <div className="text-left">
                      <div className="font-medium">Video Ad Script Generator</div>
                      <div className="text-xs text-muted-foreground">Turn scripts into videos</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'carousel-image' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('carousel-image')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <div className="text-left">
                      <div className="font-medium">Carousel/Image Ad Generator</div>
                      <div className="text-xs text-muted-foreground">AI-powered creative design</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'targeting-presets' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('targeting-presets')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🎯</span>
                    <div className="text-left">
                      <div className="font-medium">AI Targeting Preset Generator</div>
                      <div className="text-xs text-muted-foreground">Custom audience presets</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'visual-analyzer' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('visual-analyzer')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📊</span>
                    <div className="text-left">
                      <div className="font-medium">Visual Ad Analyzer</div>
                      <div className="text-xs text-muted-foreground">Performance optimization</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'headline-tester' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('headline-tester')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🔍</span>
                    <div className="text-left">
                      <div className="font-medium">Headline Variations Tester</div>
                      <div className="text-xs text-muted-foreground">A/B testing variations</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={selectedAIFeature === 'competitor-audit' ? 'default' : 'ghost'}
                  className="w-full justify-start h-12"
                  onClick={() => setSelectedAIFeature('competitor-audit')}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🕵️</span>
                    <div className="text-left">
                      <div className="font-medium">Competitor Ad Audit</div>
                      <div className="text-xs text-muted-foreground">Analysis & improvements</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Content Area - Full Feature Display */}
            <div className="flex-1 overflow-y-auto">
              {selectedAIFeature === 'multi-platform' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🌐</span>
                      <span>Multi-Platform Ad Copy Generator</span>
                    </CardTitle>
                    <CardDescription>Generate platform-optimized ad copy for multiple channels simultaneously</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Funnel/Product</Label>
                          <Input 
                            placeholder="e.g., 30-Day Copywriting Course, Lead Generation Webinar..." 
                            value={multiPlatformState.funnel}
                            onChange={(e) => setMultiPlatformState(prev => ({ ...prev, funnel: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Audience</Label>
                          <Input 
                            placeholder="e.g., Entrepreneurs, 25-45, interested in online business..." 
                            value={multiPlatformState.audience}
                            onChange={(e) => setMultiPlatformState(prev => ({ ...prev, audience: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tone</Label>
                          <Select value={multiPlatformState.tone} onValueChange={(value) => setMultiPlatformState(prev => ({ ...prev, tone: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual/Friendly</SelectItem>
                              <SelectItem value="urgent">Urgent/Scarcity</SelectItem>
                              <SelectItem value="friendly">Warm/Personal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Platforms</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: "facebook", name: "Facebook", icon: "📘" },
                              { id: "instagram", name: "Instagram", icon: "📸" },
                              { id: "tiktok", name: "TikTok", icon: "🎵" },
                              { id: "youtube", name: "YouTube", icon: "📺" },
                              { id: "google", name: "Google Ads", icon: "🔍" },
                              { id: "linkedin", name: "LinkedIn", icon: "💼" }
                            ].map((platform) => (
                              <div 
                                key={platform.id}
                                className={`p-3 border rounded cursor-pointer text-center ${
                                  multiPlatformState.selectedPlatforms.includes(platform.id) 
                                    ? "border-primary bg-primary/5" 
                                    : "border-border hover:border-primary/50"
                                }`}
                                onClick={() => {
                                  const platforms = multiPlatformState.selectedPlatforms.includes(platform.id)
                                    ? multiPlatformState.selectedPlatforms.filter(p => p !== platform.id)
                                    : [...multiPlatformState.selectedPlatforms, platform.id];
                                  setMultiPlatformState(prev => ({ ...prev, selectedPlatforms: platforms }));
                                }}
                              >
                                <div className="text-xl mb-1">{platform.icon}</div>
                                <div className="text-sm">{platform.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerateMultiPlatformCopy} 
                      disabled={multiPlatformState.isGenerating}
                      size="lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {multiPlatformState.isGenerating ? 'Generating Copy...' : 'Generate Platform-Specific Copy'}
                    </Button>

                    {/* Display generated copies */}
                    {Object.keys(multiPlatformState.generatedCopies).length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">Generated Copy:</h4>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => regenerateContent('multiplatform', multiPlatformState)}
                            >
                              🔄 Regenerate
                            </Button>
                            <Button size="sm" variant="outline">
                              📚 Save to Library
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {Object.entries(multiPlatformState.generatedCopies).map(([platform, copy]: [string, any]) => (
                            <div key={platform} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium capitalize">{platform}</h5>
                                <Badge variant="outline">{copy.tone}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">
                                {copy.copy}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">CTA: {copy.cta}</span>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">Copy</Button>
                                  <Button size="sm" variant="outline">Edit</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedAIFeature === 'video-script' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🎬</span>
                      <span>Video Ad Script Generator</span>
                    </CardTitle>
                    <CardDescription>Create compelling video ad scripts with AI assistance and turn them into videos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Funnel/Product</Label>
                          <Input 
                            placeholder="e.g., Online Course, SaaS Product, Coaching Program..." 
                            value={videoAdState.funnel}
                            onChange={(e) => setVideoAdState(prev => ({ ...prev, funnel: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Audience</Label>
                          <Input 
                            placeholder="e.g., Small business owners, content creators..." 
                            value={videoAdState.audience}
                            onChange={(e) => setVideoAdState(prev => ({ ...prev, audience: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Script Tone</Label>
                          <Select value={videoAdState.tone} onValueChange={(value) => setVideoAdState(prev => ({ ...prev, tone: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="testimonial">Testimonial-style</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Script Features:</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Hook within first 3 seconds</li>
                            <li>• Problem/solution structure</li>
                            <li>• Social proof integration</li>
                            <li>• Strong call-to-action</li>
                            <li>• Optimized for 30-60 seconds</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerateVideoScript} 
                      disabled={videoAdState.isGenerating}
                      size="lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {videoAdState.isGenerating ? 'Generating Script...' : 'Generate Video Script'}
                    </Button>

                    {/* Display generated script */}
                    {videoAdState.generatedScript && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">Generated Script:</h4>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => regenerateContent('video', videoAdState)}
                            >
                              🔄 Regenerate
                            </Button>
                            <Button size="sm" variant="outline">
                              📚 Save to Library
                            </Button>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <pre className="text-sm whitespace-pre-line text-muted-foreground max-h-96 overflow-y-auto">
                            {videoAdState.generatedScript}
                          </pre>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button size="sm" className="w-full">
                            🎥 Turn to Video
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            🎤 Add Voiceover
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            ✏️ Edit Manually
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            🤖 Edit with AI
                          </Button>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          📤 Export & Save
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedAIFeature === 'carousel-image' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🎯</span>
                      <span>Carousel/Image Ad Generator</span>
                    </CardTitle>
                    <CardDescription>Generate carousel ads or creative image ads with AI-powered design</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Generation Type</Label>
                          <Select 
                            value={carouselAdState.generationType} 
                            onValueChange={(value) => setCarouselAdState(prev => ({ ...prev, generationType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose generation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="carousel">📱 Carousel Ads (Multiple slides)</SelectItem>
                              <SelectItem value="image-creative">🎨 Image Ad Creative (Single design)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Product/Service Name</Label>
                          <Input 
                            placeholder="e.g., 30 Days Copywriting Course" 
                            value={carouselAdState.productName}
                            onChange={(e) => setCarouselAdState(prev => ({ ...prev, productName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Audience</Label>
                          <Input 
                            placeholder="e.g., Entrepreneurs, marketers, small business owners..." 
                            value={carouselAdState.audience}
                            onChange={(e) => setCarouselAdState(prev => ({ ...prev, audience: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {carouselAdState.generationType === 'image-creative' && (
                          <>
                            <div className="space-y-2">
                              <Label>Dimensions</Label>
                              <Select 
                                value={carouselAdState.dimensions} 
                                onValueChange={(value) => setCarouselAdState(prev => ({ ...prev, dimensions: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1200x628">📘 Facebook Feed (1200x628)</SelectItem>
                                  <SelectItem value="1080x1080">📸 Instagram Square (1080x1080)</SelectItem>
                                  <SelectItem value="1080x1920">📱 Instagram Story (1080x1920)</SelectItem>
                                  <SelectItem value="1200x900">💼 LinkedIn (1200x900)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Color Scheme</Label>
                              <Select 
                                value={carouselAdState.colorScheme} 
                                onValueChange={(value) => setCarouselAdState(prev => ({ ...prev, colorScheme: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select colors" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="blue-white">🔵 Blue & White</SelectItem>
                                  <SelectItem value="red-black">🔴 Red & Black</SelectItem>
                                  <SelectItem value="green-gold">🟢 Green & Gold</SelectItem>
                                  <SelectItem value="purple-pink">🟣 Purple & Pink</SelectItem>
                                  <SelectItem value="orange-blue">🟠 Orange & Blue</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Key Benefits/Features (comma-separated)</Label>
                      <Textarea 
                        placeholder="e.g., Learn fast, Get templates, Expert support, Money-back guarantee, Instant access" 
                        value={carouselAdState.keyBenefits}
                        onChange={(e) => setCarouselAdState(prev => ({ ...prev, keyBenefits: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerateCarouselAds} 
                      disabled={carouselAdState.isGenerating}
                      size="lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {carouselAdState.isGenerating ? 'Generating...' : 
                        carouselAdState.generationType === 'carousel' ? 'Generate Carousel Ads' : 'Generate Image Creative'}
                    </Button>

                    {/* Display generated results */}
                    {(carouselAdState.generatedAds.length > 0 || carouselAdState.generatedImageAd) && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">
                            {carouselAdState.generationType === 'carousel' ? 'Generated Carousel:' : 'Generated Image Ad:'}
                          </h4>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => regenerateContent('carousel', carouselAdState)}
                            >
                              🔄 Regenerate
                            </Button>
                            <Button size="sm" variant="outline">
                              📚 Save to Library
                            </Button>
                          </div>
                        </div>

                        {/* Carousel display */}
                        {carouselAdState.generatedAds.length > 0 && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {carouselAdState.generatedAds.map((ad, index) => (
                              <div key={ad.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium">Slide {index + 1}: {ad.title}</h5>
                                  <span className="text-2xl">{ad.image}</span>
                                </div>
                                <h6 className="font-medium text-sm mb-2">{ad.headline}</h6>
                                <p className="text-xs text-muted-foreground mb-3">{ad.description}</p>
                                <div className="space-y-1">
                                  {ad.bulletPoints.map((point: string, idx: number) => (
                                    <div key={idx} className="text-xs flex items-center">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                      {point}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Image ad display */}
                        {carouselAdState.generatedImageAd && (
                          <div className="border rounded-lg p-6">
                            <h5 className="font-bold text-xl mb-3">{carouselAdState.generatedImageAd.headline}</h5>
                            <div className="space-y-2 mb-4">
                              {carouselAdState.generatedImageAd.bulletPoints.map((point: string, idx: number) => (
                                <div key={idx} className="text-sm flex items-center">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                  {point}
                                </div>
                              ))}
                            </div>
                            <div className="bg-primary text-primary-foreground p-3 rounded text-center font-bold">
                              {carouselAdState.generatedImageAd.cta}
                            </div>
                            <div className="mt-4 text-sm text-muted-foreground space-y-1">
                              <p><strong>Design:</strong> {carouselAdState.generatedImageAd.designElements.style}</p>
                              <p><strong>Colors:</strong> {carouselAdState.generatedImageAd.designElements.colorScheme}</p>
                              <p><strong>Size:</strong> {carouselAdState.generatedImageAd.designElements.dimensions}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Other AI features with similar full-page layouts */}
              {selectedAIFeature === 'targeting-presets' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🎯</span>
                      <span>AI Targeting Preset Generator</span>
                    </CardTitle>
                    <CardDescription>Generate custom audience targeting presets for your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Business/Product</Label>
                          <Input 
                            placeholder="e.g., Online Fitness Coaching" 
                            value={targetingPresetsState.business}
                            onChange={(e) => setTargetingPresetsState(prev => ({ ...prev, business: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ideal Customer</Label>
                          <Textarea 
                            placeholder="Describe your ideal customer demographics and interests..." 
                            value={targetingPresetsState.audience}
                            onChange={(e) => setTargetingPresetsState(prev => ({ ...prev, audience: e.target.value }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Preset Types:</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Warm audiences (retargeting)</li>
                            <li>• Cold lookalike audiences</li>
                            <li>• Interest-based targeting</li>
                            <li>• Competitor audiences</li>
                            <li>• Custom combinations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerateTargetingPresets} 
                      disabled={targetingPresetsState.isGenerating}
                      size="lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {targetingPresetsState.isGenerating ? 'Generating Presets...' : 'Generate Targeting Presets'}
                    </Button>

                    {/* Display generated presets */}
                    {targetingPresetsState.generatedPresets.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Generated Targeting Presets:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {targetingPresetsState.generatedPresets.map((preset) => (
                            <div key={preset.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium">{preset.name}</h5>
                                <Badge variant="outline">{preset.expectedCPA}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                              <div className="text-sm space-y-2">
                                <p><strong>Demographics:</strong> {preset.targeting.demographics}</p>
                                <p><strong>Interests:</strong> {preset.targeting.interests.join(", ")}</p>
                                <p><strong>Behaviors:</strong> {preset.targeting.behaviors}</p>
                              </div>
                              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                <span className="text-sm text-muted-foreground">Reach: {preset.estimatedReach}</span>
                                <Button size="sm" variant="outline">Use Preset</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedAIFeature === 'visual-analyzer' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">📊</span>
                      <span>Visual Ad Analyzer</span>
                    </CardTitle>
                    <CardDescription>Analyze your ad visuals for performance optimization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Upload Ad Creative</Label>
                        <Input 
                          type="file" 
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="h-12"
                        />
                      </div>

                      {visualAnalyzerState.isAnalyzing && (
                        <div className="text-center py-8">
                          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-muted-foreground">Analyzing visual...</p>
                        </div>
                      )}

                      {visualAnalyzerState.analysisResult && (
                        <div className="space-y-6">
                          <h4 className="text-lg font-medium">Analysis Results:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-primary mb-2">
                                {visualAnalyzerState.analysisResult.engagementScore}/100
                              </div>
                              <p className="text-sm font-medium">Engagement Score</p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-primary mb-2">
                                {visualAnalyzerState.analysisResult.colorBalance}/100
                              </div>
                              <p className="text-sm font-medium">Color Balance</p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-primary mb-2">
                                {visualAnalyzerState.analysisResult.textReadability}/100
                              </div>
                              <p className="text-sm font-medium">Text Readability</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-medium">Optimization Suggestions:</h5>
                            <div className="space-y-2">
                              {visualAnalyzerState.analysisResult.suggestions.map((suggestion: string, index: number) => (
                                <div key={index} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                                  <span className="text-primary">•</span>
                                  <p className="text-sm">{suggestion}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedAIFeature === 'headline-tester' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🔍</span>
                      <span>Headline Variations Tester</span>
                    </CardTitle>
                    <CardDescription>Generate multiple headline variations for A/B testing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Original Headline</Label>
                          <Input 
                            placeholder="Enter your current headline..." 
                            value={headlineTesterState.originalHeadline}
                            onChange={(e) => setHeadlineTesterState(prev => ({ ...prev, originalHeadline: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Optimization Goal</Label>
                          <Select 
                            value={headlineTesterState.optimizationGoal} 
                            onValueChange={(value) => setHeadlineTesterState(prev => ({ ...prev, optimizationGoal: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select goal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clicks">More Clicks</SelectItem>
                              <SelectItem value="conversions">More Conversions</SelectItem>
                              <SelectItem value="engagement">More Engagement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Variation Types:</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Question-based headlines</li>
                            <li>• Benefit-focused versions</li>
                            <li>• Urgency and scarcity angles</li>
                            <li>• Social proof integration</li>
                            <li>• Curiosity-driven hooks</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerateHeadlines} 
                      disabled={headlineTesterState.isGenerating}
                      size="lg"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {headlineTesterState.isGenerating ? 'Generating...' : 'Generate Variations'}
                    </Button>

                    {headlineTesterState.variations.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Headline Variations:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {headlineTesterState.variations.map((variation, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <p className="font-medium mb-2">Variation {index + 1}</p>
                              <p className="text-sm">{variation}</p>
                              <div className="flex justify-end mt-3 space-x-2">
                                <Button size="sm" variant="outline">Copy</Button>
                                <Button size="sm" variant="outline">Test</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedAIFeature === 'competitor-audit' && (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-xl">🕵️</span>
                      <span>Competitor Ad Audit</span>
                    </CardTitle>
                    <CardDescription>Analyze competitor ads and get improvement suggestions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Competitor Ad URL</Label>
                        <Input 
                          placeholder="Paste competitor ad URL or Facebook ad library link..." 
                          value={adAuditState.adUrl}
                          onChange={(e) => setAdAuditState(prev => ({ ...prev, adUrl: e.target.value }))}
                          className="h-12"
                        />
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={handleAuditAd} 
                        disabled={adAuditState.isAuditing}
                        size="lg"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {adAuditState.isAuditing ? 'Analyzing...' : 'Audit Competitor Ad'}
                      </Button>

                      {adAuditState.auditResult && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium">Audit Results:</h4>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{adAuditState.auditResult.score}/100</div>
                              <p className="text-sm text-muted-foreground">Overall Score</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-medium">Improvement Opportunities:</h5>
                            <div className="space-y-3">
                              {adAuditState.auditResult.improvements.map((improvement: any, index: number) => (
                                <div key={index} className="p-4 border rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{improvement.category}</span>
                                    <div className="flex space-x-2">
                                      <Badge variant="outline">{improvement.impact} Impact</Badge>
                                      <Badge variant={improvement.priority === "High" ? "default" : "secondary"}>
                                        {improvement.priority} Priority
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Default state when no feature is selected */}
              {!selectedAIFeature && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🤖</div>
                    <h3 className="text-xl font-semibold">Select an AI Feature</h3>
                    <p className="text-muted-foreground">Choose a feature from the sidebar to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Settings</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your social media and advertising accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { platform: "Facebook", account: "Your Business Page", status: "Connected" },
                    { platform: "Instagram", account: "@yourbusiness", status: "Connected" },
                    { platform: "Google Ads", account: "yourbusiness@gmail.com", status: "Not Connected" },
                    { platform: "TikTok", account: "@yourbusiness", status: "Not Connected" }
                  ].map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{account.platform}</p>
                        <p className="text-sm text-muted-foreground">{account.account}</p>
                      </div>
                      <Badge variant={account.status === "Connected" ? "default" : "outline"}>
                        {account.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { label: "Campaign performance alerts", checked: true },
                    { label: "Budget threshold warnings", checked: true },
                    { label: "Weekly performance reports", checked: false },
                    { label: "AI optimization suggestions", checked: true }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{notification.label}</span>
                      <Switch defaultChecked={notification.checked} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}