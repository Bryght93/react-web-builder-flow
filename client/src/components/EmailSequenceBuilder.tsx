import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Plus, 
  Send, 
  Users, 
  Target, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  Calendar, 
  Clock, 
  Save,
  ArrowLeft,
  ChevronRight,
  Timer,
  List,
  CheckCircle,
  Type,
  Image as ImageIcon,
  PenTool,
  Bold,
  Italic,
  Underline,
  Link,
  AlignLeft,
  User,
  Loader2,
  ArrowRight,
  AlignCenter,
  AlignRight,
  Palette,
  Zap,
  Megaphone,
  Heart,
  Sparkles,
  Monitor,
  Smartphone,
  Mic,
  MessageSquare,
  Wand2,
  Lightbulb,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Video,
  Headphones,
  Camera,
  Brush,
  TrendingUp,
  BarChart,
  Users2,
  Globe,
  Star,
  Award,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Code,
  Layers,
  PaintBucket,
  Sliders,
  Move,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface EmailStep {
  id: number;
  name: string;
  subject: string;
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days';
  content: EmailElement[];
  settings: {
    list: string;
    sendTime: string;
    conditions?: string;
  };
}

interface EmailElement {
  id: string;
  type: 'heading' | 'text' | 'button' | 'image' | 'divider' | 'spacer';
  properties: any;
}

interface EmailCampaign {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused';
  type: 'nurture' | 'broadcast';
  emailSequence: EmailStep[];
  subscribers: number;
  stats: {
    opens: string;
    clicks: string;
    revenue: string;
  };
}

export default function EmailSequenceBuilder() {
  const [view, setView] = useState<'campaigns' | 'builder' | 'template-selection' | 'campaign-type' | 'personal-info'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [selectedEmailStep, setSelectedEmailStep] = useState<EmailStep | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantMode, setAIAssistantMode] = useState<'content' | 'edit' | 'strategy' | 'compliance'>('content');
  const [voiceListening, setVoiceListening] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [currentCreationFlow, setCurrentCreationFlow] = useState<'scratch' | 'template' | 'ai'>('scratch');
  const [selectedCampaignType, setSelectedCampaignType] = useState<'nurture' | 'broadcast'>('nurture');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    campaignGoal: '',
    numberOfEmails: 5,
    tone: 'professional',
    // Enhanced business context fields
    productService: '',
    uniqueSellingPoint: '',
    targetMarket: '',
    customerPainPoints: '',
    businessGoals: '',
    competitiveDifferentiator: '',
    priceRange: '',
    currentMarketing: '',
    audienceAge: '',
    audienceGender: '',
    audienceIncome: '',
    customerBehavior: '',
    purchaseMotivation: ''
  });
  const { toast } = useToast();

  // Navigation handlers
  const handleCampaignTypeSelection = (type: 'nurture' | 'broadcast') => {
    setSelectedCampaignType(type);
    if (currentCreationFlow === 'scratch') {
      // For scratch, go directly to builder
      const newCampaign = createEmptyCampaign(type);
      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');
    } else if (currentCreationFlow === 'template') {
      // For template, show template selection
      setView('template-selection');
    } else if (currentCreationFlow === 'ai') {
      // For AI, show personal information form first
      setView('personal-info');
    }
  };

  const handleTemplateSelection = async (template: any) => {
    setSelectedTemplate(template);
    if (currentCreationFlow === 'ai') {
      // For AI flow, generate emails directly using the business context and template
      await generateAIEmails({
        campaignType: selectedCampaignType,
        industry: personalInfo.industry,
        targetAudience: personalInfo.targetAudience,
        campaignGoal: personalInfo.campaignGoal,
        emailCount: personalInfo.numberOfEmails,
        tone: personalInfo.tone as 'professional' | 'friendly' | 'casual' | 'urgent',
        brandName: personalInfo.brandName,
        template: template
      });
    } else {
      // For template flow, create campaign and go to builder
      const newCampaign = createCampaignFromTemplate(template);
      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');
    }
  };

  const handlePersonalInfoSubmit = () => {
    // After personal info is submitted, show template selection
    setView('template-selection');
  };

  // Helper functions
  const createEmptyCampaign = (type: 'nurture' | 'broadcast'): EmailCampaign => {
    return {
      id: Date.now(),
      name: `New ${type === 'nurture' ? 'Nurture Sequence' : 'Broadcast Campaign'}`,
      description: `A new ${type} campaign`,
      status: 'draft',
      type,
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: [{
        id: 1,
        name: type === 'nurture' ? 'Email 1' : 'Broadcast Email',
        subject: 'Your subject line here',
        delay: 0,
        delayUnit: 'minutes',
        content: [],
        settings: { list: "all-subscribers", sendTime: "immediate" }
      }]
    };
  };

  const createCampaignFromTemplate = (template: any): EmailCampaign => {
    return {
      id: Date.now(),
      name: template.name,
      description: template.description,
      status: 'draft',
      type: template.type,
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: Array.from({ length: template.emails }, (_, i) => ({
        id: i + 1,
        name: template.type === 'broadcast' ? template.name : `Email ${i + 1}`,
        subject: `Subject for ${template.type === 'broadcast' ? template.name : `Email ${i + 1}`}`,
        delay: template.type === 'broadcast' ? 0 : (i === 0 ? 0 : i),
        delayUnit: template.type === 'broadcast' ? 'minutes' : (i === 0 ? 'minutes' : 'days'),
        content: [],
        settings: { list: "all-subscribers", sendTime: template.type === 'broadcast' ? "immediate" : (i === 0 ? "immediate" : "9:00 AM") }
      }))
    };
  };

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: 1,
      name: "Welcome Series",
      description: "Onboard new subscribers with a 3-email welcome sequence",
      status: 'active',
      type: 'nurture',
      subscribers: 1247,
      stats: { opens: "24.5%", clicks: "8.2%", revenue: "$1,247" },
      emailSequence: [
        {
          id: 1,
          name: "Welcome Email",
          subject: "Welcome to our community! 🎉",
          delay: 0,
          delayUnit: 'minutes',
          content: [
            {
              id: '1',
              type: 'heading',
              properties: { text: 'Welcome to Our Community!', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
            },
            {
              id: '2', 
              type: 'text',
              properties: { text: 'Thanks for joining us! We\'re excited to have you on board.', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
            }
          ],
          settings: { list: "all-subscribers", sendTime: "immediate" }
        },
        {
          id: 2,
          name: "Getting Started",
          subject: "Here's how to get started",
          delay: 1,
          delayUnit: 'days',
          content: [],
          settings: { list: "all-subscribers", sendTime: "9:00 AM" }
        },
        {
          id: 3,
          name: "Resources",
          subject: "Helpful resources for you",
          delay: 3,
          delayUnit: 'days',
          content: [],
          settings: { list: "all-subscribers", sendTime: "9:00 AM" }
        }
      ]
    },
    {
      id: 2,
      name: "Product Launch Announcement",
      description: "Single broadcast email for product launches",
      status: 'draft',
      type: 'broadcast',
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: []
    }
  ]);

  // Comprehensive Email Templates
  const nurtureTemplates = [
    // Basic Templates
    {
      id: 1,
      name: "Welcome Series",
      description: "3-email onboarding sequence for new subscribers",
      emails: 3,
      category: "Onboarding",
      type: "nurture",
      difficulty: "basic",
      industry: "General",
      preview: "Welcome! → Getting Started → Resources",
      features: ["Personal welcome", "Setup guide", "Resource library"],
      estimatedTime: "15 min"
    },
    {
      id: 2,
      name: "Product Launch",
      description: "5-email launch campaign with anticipation building",
      emails: 5,
      category: "Sales",
      type: "nurture",
      difficulty: "basic",
      industry: "E-commerce",
      preview: "Teaser → Features → Benefits → Social Proof → Launch",
      features: ["Product teasers", "Feature highlights", "Customer testimonials"],
      estimatedTime: "25 min"
    },
    {
      id: 3,
      name: "Nurture Sequence",
      description: "7-email nurture campaign for lead warming",
      emails: 7,
      category: "Nurture",
      type: "nurture",
      difficulty: "basic",
      industry: "B2B",
      preview: "Value → Tips → Case Study → More Tips → Success Story → Offer → Follow-up",
      features: ["Educational content", "Case studies", "Soft pitch"],
      estimatedTime: "35 min"
    },
    {
      id: 4,
      name: "Abandoned Cart",
      description: "3-email recovery sequence for lost sales",
      emails: 3,
      category: "Recovery",
      type: "nurture",
      difficulty: "basic",
      industry: "E-commerce",
      preview: "Reminder → Incentive → Final Call",
      features: ["Cart reminders", "Discount offers", "Urgency tactics"],
      estimatedTime: "20 min"
    },
    // Advanced Templates
    {
      id: 5,
      name: "Authority Builder",
      description: "10-email sequence to establish thought leadership",
      emails: 10,
      category: "Authority",
      type: "nurture",
      difficulty: "advanced",
      industry: "Consulting",
      preview: "Introduction → Industry Insight → Personal Story → Expertise → Framework → Case Study → Lesson → Behind Scenes → Community → Partnership",
      features: ["Personal branding", "Industry insights", "Community building"],
      estimatedTime: "60 min"
    },
    {
      id: 6,
      name: "Course Launch Sequence",
      description: "12-email educational product launch",
      emails: 12,
      category: "Education",
      type: "nurture",
      difficulty: "advanced",
      industry: "Education",
      preview: "Problem → Solution → Preview → Testimonials → Curriculum → Bonus → Price → FAQ → Countdown → Last Chance → Closed → Bonus",
      features: ["Educational content", "Progressive disclosure", "Countdown timers"],
      estimatedTime: "90 min"
    },
    {
      id: 7,
      name: "Event Promotion",
      description: "8-email webinar/event promotion sequence",
      emails: 8,
      category: "Event",
      type: "nurture",
      difficulty: "advanced",
      industry: "Events",
      preview: "Announce → Value → Speakers → Agenda → Registration → Reminder → Final Call → Follow-up",
      features: ["Event details", "Speaker highlights", "Registration tracking"],
      estimatedTime: "45 min"
    },
    {
      id: 8,
      name: "Re-engagement Campaign",
      description: "6-email sequence to win back inactive subscribers",
      emails: 6,
      category: "Re-engagement",
      type: "nurture",
      difficulty: "advanced",
      industry: "General",
      preview: "We Miss You → What's New → Exclusive Offer → Final Attempt → Goodbye → Win-Back",
      features: ["Personalized messaging", "Exclusive offers", "Feedback requests"],
      estimatedTime: "40 min"
    }
  ];

  const broadcastTemplates = [
    // Basic Templates
    {
      id: 9,
      name: "Product Announcement",
      description: "Single email for product launches",
      emails: 1,
      category: "Announcement",
      type: "broadcast",
      difficulty: "basic",
      industry: "E-commerce",
      preview: "Exciting News: New Product Launch!",
      features: ["Product showcase", "Key benefits", "Clear CTA"],
      estimatedTime: "10 min"
    },
    {
      id: 10,
      name: "Newsletter",
      description: "Regular newsletter broadcast template",
      emails: 1,
      category: "Newsletter",
      type: "broadcast",
      difficulty: "basic",
      industry: "General",
      preview: "Monthly Update: Industry News & Tips",
      features: ["Multiple sections", "Industry updates", "Personal touch"],
      estimatedTime: "15 min"
    },
    {
      id: 11,
      name: "Special Offer",
      description: "Promotional offer broadcast",
      emails: 1,
      category: "Promotion",
      type: "broadcast",
      difficulty: "basic",
      industry: "E-commerce",
      preview: "Limited Time: 50% Off Everything!",
      features: ["Discount highlight", "Urgency elements", "Product showcase"],
      estimatedTime: "12 min"
    },
    {
      id: 12,
      name: "Event Invitation",
      description: "Event announcement broadcast",
      emails: 1,
      category: "Event",
      type: "broadcast",
      difficulty: "basic",
      industry: "Events",
      preview: "You're Invited: Exclusive Webinar",
      features: ["Event details", "Speaker info", "Registration link"],
      estimatedTime: "10 min"
    },
    // Advanced Templates
    {
      id: 13,
      name: "Survey & Feedback",
      description: "Interactive feedback collection email",
      emails: 1,
      category: "Feedback",
      type: "broadcast",
      difficulty: "advanced",
      industry: "General",
      preview: "Help Us Improve: Quick Survey Inside",
      features: ["Interactive elements", "Personalized questions", "Incentive offers"],
      estimatedTime: "20 min"
    },
    {
      id: 14,
      name: "Case Study Showcase",
      description: "Success story broadcast email",
      emails: 1,
      category: "Social Proof",
      type: "broadcast",
      difficulty: "advanced",
      industry: "B2B",
      preview: "Success Story: How [Client] Increased Revenue 300%",
      features: ["Detailed case study", "Data visualization", "Call to action"],
      estimatedTime: "25 min"
    },
    {
      id: 15,
      name: "Interactive Content",
      description: "Engaging interactive email experience",
      emails: 1,
      category: "Interactive",
      type: "broadcast",
      difficulty: "advanced",
      industry: "General",
      preview: "Take Our Quiz: What's Your Marketing Type?",
      features: ["Interactive quiz", "Personalized results", "Follow-up actions"],
      estimatedTime: "30 min"
    },
    {
      id: 16,
      name: "Holiday Campaign",
      description: "Seasonal holiday promotion email",
      emails: 1,
      category: "Seasonal",
      type: "broadcast",
      difficulty: "advanced",
      industry: "E-commerce",
      preview: "Holiday Special: Gifts They'll Love",
      features: ["Seasonal design", "Gift guides", "Multi-product showcase"],
      estimatedTime: "35 min"
    }
  ];

  const createNewCampaign = (template: any) => {
    const newCampaign: EmailCampaign = {
      id: campaigns.length + 1,
      name: `New ${template.name}`,
      description: template.description,
      status: 'draft',
      type: template.type,
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: Array.from({ length: template.emails }, (_, i) => ({
        id: i + 1,
        name: template.type === 'broadcast' ? `${template.name}` : `Email ${i + 1}`,
        subject: `Subject for ${template.type === 'broadcast' ? template.name : `Email ${i + 1}`}`,
        delay: template.type === 'broadcast' ? 0 : (i === 0 ? 0 : i),
        delayUnit: template.type === 'broadcast' ? 'minutes' : (i === 0 ? 'minutes' : 'days'),
        content: [],
        settings: { list: "all-subscribers", sendTime: template.type === 'broadcast' ? "immediate" : (i === 0 ? "immediate" : "9:00 AM") }
      }))
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setSelectedEmailStep(newCampaign.emailSequence[0]);
    setView('builder');
  };

  const generateAIEmails = async (params: {
    campaignType: 'nurture' | 'broadcast';
    industry: string;
    targetAudience: string;
    campaignGoal: string;
    emailCount: number;
    tone: 'professional' | 'friendly' | 'casual' | 'urgent';
    brandName: string;
    template?: any;
  }) => {
    setIsGenerating(true);
    try {
      // Combine template params with comprehensive business context
      const enhancedParams = {
        ...params,
        // Enhanced business context from personalInfo
        productService: personalInfo.productService,
        uniqueSellingPoint: personalInfo.uniqueSellingPoint,
        customerPainPoints: personalInfo.customerPainPoints,
        competitiveDifferentiator: personalInfo.competitiveDifferentiator,
        priceRange: personalInfo.priceRange,
        currentMarketing: personalInfo.currentMarketing,
        audienceAge: personalInfo.audienceAge,
        audienceGender: personalInfo.audienceGender,
        audienceIncome: personalInfo.audienceIncome,
        purchaseMotivation: personalInfo.purchaseMotivation,
      };

      const response = await fetch('/api/ai/generate-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedParams),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emails');
      }

      const data = await response.json();
      
      // Create new campaign with AI-generated emails
      const newCampaign: EmailCampaign = {
        id: campaigns.length + 1,
        name: data.campaign?.name || `AI-Generated ${params.campaignType} Campaign`,
        description: data.campaign?.description || `AI-generated ${params.campaignType} campaign for ${params.targetAudience}`,
        status: 'draft',
        type: params.campaignType,
        subscribers: 0,
        stats: { opens: "0%", clicks: "0%", revenue: "$0" },
        emailSequence: (data.emails || []).map((email: any, index: number) => ({
          id: index + 1,
          name: params.campaignType === 'broadcast' ? `${params.brandName} Broadcast` : `Email ${index + 1}`,
          subject: email.subject,
          delay: email.send_delay,
          delayUnit: 'days',
          content: parseEmailContent(email.content),
          settings: { list: "all-subscribers", sendTime: index === 0 ? "immediate" : "9:00 AM" }
        }))
      };

      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');
      setShowAIDialog(false);
      
      toast({
        title: "AI Emails Generated!",
        description: `Successfully generated ${data.emails?.length || 0} ${params.campaignType} emails.`,
      });
    } catch (error) {
      console.error('AI Generation Error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const parseEmailContent = (htmlContent: string): EmailElement[] => {
    // Simple HTML parser for AI-generated content
    const elements: EmailElement[] = [];
    
    // Extract headings
    const headings = htmlContent.match(/<h[1-6]>(.*?)<\/h[1-6]>/g);
    if (headings) {
      headings.forEach((heading, index) => {
        const text = heading.replace(/<[^>]*>/g, '');
        elements.push({
          id: `heading-${index}`,
          type: 'heading',
          properties: { text, fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }
        });
      });
    }

    // Extract paragraphs
    const paragraphs = htmlContent.match(/<p>(.*?)<\/p>/g);
    if (paragraphs) {
      paragraphs.forEach((paragraph, index) => {
        const text = paragraph.replace(/<[^>]*>/g, '');
        elements.push({
          id: `text-${index}`,
          type: 'text',
          properties: { text, fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
        });
      });
    }

    // If no elements found, create a basic text element
    if (elements.length === 0) {
      elements.push({
        id: 'text-default',
        type: 'text',
        properties: { text: htmlContent.replace(/<[^>]*>/g, ''), fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
      });
    }

    return elements;
  };

  // AI Assistant Functions
  const processAIRequest = async (prompt: string, mode: string) => {
    setIsProcessingAI(true);
    try {
      const response = await fetch('/api/ai/process-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          mode,
          context: {
            emailStep: selectedEmailStep,
            element: selectedElement,
            campaign: selectedCampaign
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process AI request');
      }

      const data = await response.json();
      setAIResponse(data.response);
      
      // Apply suggestions if available
      if (data.suggestions) {
        applySuggestions(data.suggestions);
      }
      
    } catch (error) {
      console.error('AI Processing Error:', error);
      setAIResponse('Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      setIsProcessingAI(false);
    }
  };

  const applySuggestions = (suggestions: any) => {
    if (suggestions.elementUpdates && selectedElement) {
      updateElement(selectedElement.id, suggestions.elementUpdates);
    }
    if (suggestions.stepUpdates && selectedEmailStep) {
      updateEmailStep(suggestions.stepUpdates);
    }
  };

  const generateAIContent = async (contentType: 'subject' | 'headline' | 'body' | 'cta') => {
    const prompts = {
      subject: `Generate an engaging email subject line for ${selectedCampaign?.type || 'email'} campaign targeting ${selectedCampaign?.description || 'subscribers'}`,
      headline: 'Create a compelling headline for this email that grabs attention',
      body: `Write engaging email body content for ${selectedCampaign?.type || 'email'} campaign`,
      cta: 'Generate a strong call-to-action button text that drives conversions'
    };
    
    await processAIRequest(prompts[contentType], 'content');
  };

  const checkCompliance = async () => {
    const compliancePrompt = `Check this email for marketing compliance (GDPR, CAN-SPAM, etc.): 
    Subject: ${selectedEmailStep?.subject}
    Content: ${selectedEmailStep?.content.map(el => el.properties.text).join(' ')}`;
    
    await processAIRequest(compliancePrompt, 'compliance');
  };

  const getMarketingStrategy = async () => {
    const strategyPrompt = `Provide marketing strategy advice for this ${selectedCampaign?.type} campaign: ${selectedCampaign?.description}`;
    await processAIRequest(strategyPrompt, 'strategy');
  };

  const startVoiceListening = () => {
    setVoiceListening(true);
    // Voice recognition would be implemented here
    setTimeout(() => {
      setVoiceListening(false);
      setUserPrompt("Generate a compelling email subject line about productivity tips");
    }, 3000);
  };

  const createFromScratch = () => {
    setCurrentCreationFlow('scratch');
    setView('campaign-type');
  };

  const createFromTemplate = () => {
    setCurrentCreationFlow('template');
    setView('campaign-type');
  };

  const createWithAI = () => {
    setCurrentCreationFlow('ai');
    setView('campaign-type');
  };





  const createCampaignFromTemplateFunction = (template: any) => {
    const newCampaign: EmailCampaign = {
      id: campaigns.length + 1,
      name: `${template.name} Campaign`,
      description: template.description,
      status: 'draft',
      type: template.type,
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: Array.from({ length: template.emails }, (_, i) => ({
        id: i + 1,
        name: template.type === 'broadcast' ? template.name : `Email ${i + 1}`,
        subject: `Subject for ${template.type === 'broadcast' ? template.name : `Email ${i + 1}`}`,
        delay: template.type === 'broadcast' ? 0 : (i === 0 ? 0 : i),
        delayUnit: template.type === 'broadcast' ? 'minutes' : (i === 0 ? 'minutes' : 'days'),
        content: getTemplateContent(template, i),
        settings: { list: "all-subscribers", sendTime: template.type === 'broadcast' ? "immediate" : (i === 0 ? "immediate" : "9:00 AM") }
      }))
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setSelectedEmailStep(newCampaign.emailSequence[0]);
    setView('builder');
  };

  const getTemplateContent = (template: any, emailIndex: number) => {
    // Basic template content structure
    const content = [
      {
        id: 'heading-1',
        type: 'heading',
        properties: { text: `${template.name} - Email ${emailIndex + 1}`, fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
      },
      {
        id: 'text-1',
        type: 'text',
        properties: { text: 'This is a template email. Customize this content to match your brand and message.', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
      },
      {
        id: 'button-1',
        type: 'button',
        properties: { 
          text: 'Learn More', 
          backgroundColor: '#0066cc', 
          textColor: '#ffffff',
          borderRadius: '5px',
          padding: '12px 24px',
          textAlign: 'center',
          link: '#'
        }
      }
    ];
    
    return content;
  };

  const addEmailStep = () => {
    if (!selectedCampaign) return;
    
    const newStep: EmailStep = {
      id: selectedCampaign.emailSequence.length + 1,
      name: `Email ${selectedCampaign.emailSequence.length + 1}`,
      subject: `Subject for Email ${selectedCampaign.emailSequence.length + 1}`,
      delay: selectedCampaign.emailSequence.length,
      delayUnit: 'days',
      content: [],
      settings: { list: "all-subscribers", sendTime: "9:00 AM" }
    };

    const updatedCampaign = {
      ...selectedCampaign,
      emailSequence: [...selectedCampaign.emailSequence, newStep]
    };

    setSelectedCampaign(updatedCampaign);
    setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? updatedCampaign : c));
  };

  const addElement = (type: string) => {
    if (!selectedEmailStep) return;

    const newElement: EmailElement = {
      id: Date.now().toString(),
      type: type as any,
      properties: getDefaultProperties(type)
    };

    const updatedContent = [...selectedEmailStep.content, newElement];
    updateEmailStep({ content: updatedContent });
  };

  const getDefaultProperties = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Heading Text', fontSize: '24px', fontWeight: 'bold', textAlign: 'left' };
      case 'text':
        return { text: 'Your content here...', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' };
      case 'button':
        return { 
          text: 'Click Here', 
          backgroundColor: '#0066cc', 
          textColor: '#ffffff',
          borderRadius: '5px',
          padding: '12px 24px',
          textAlign: 'center',
          link: '#'
        };
      case 'image':
        return { src: 'https://via.placeholder.com/400x200', alt: 'Email Image', width: '100%' };
      case 'divider':
        return { height: '1px', backgroundColor: '#dddddd', margin: '20px 0' };
      case 'spacer':
        return { height: '20px' };
      default:
        return {};
    }
  };

  const updateEmailStep = (updates: Partial<EmailStep>) => {
    if (!selectedEmailStep || !selectedCampaign) return;

    const updatedStep = { ...selectedEmailStep, ...updates };
    const updatedSequence = selectedCampaign.emailSequence.map(step => 
      step.id === selectedEmailStep.id ? updatedStep : step
    );
    const updatedCampaign = { ...selectedCampaign, emailSequence: updatedSequence };

    setSelectedEmailStep(updatedStep);
    setSelectedCampaign(updatedCampaign);
    setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? updatedCampaign : c));
  };

  const updateElement = (elementId: string, properties: any) => {
    if (!selectedEmailStep) return;

    const updatedContent = selectedEmailStep.content.map(element =>
      element.id === elementId
        ? { ...element, properties: { ...element.properties, ...properties } }
        : element
    );

    updateEmailStep({ content: updatedContent });
  };

  const deleteElement = (elementId: string) => {
    if (!selectedEmailStep) return;

    const updatedContent = selectedEmailStep.content.filter(element => element.id !== elementId);
    updateEmailStep({ content: updatedContent });
    setSelectedElement(null);
  };

  // AI Assistant Panel Component
  const AIAssistantPanel = () => {
    return (
      <div className="w-80 border-l bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* AI Assistant Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-sm">AI Marketing Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAIAssistant(false)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* AI Mode Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Assistant Mode</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={aiAssistantMode === 'content' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAIAssistantMode('content')}
                className="text-xs"
              >
                <PenTool className="w-3 h-3 mr-1" />
                Content
              </Button>
              <Button
                variant={aiAssistantMode === 'edit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAIAssistantMode('edit')}
                className="text-xs"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant={aiAssistantMode === 'strategy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAIAssistantMode('strategy')}
                className="text-xs"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Strategy
              </Button>
              <Button
                variant={aiAssistantMode === 'compliance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAIAssistantMode('compliance')}
                className="text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                Compliance
              </Button>
            </div>
          </div>

          {/* Voice Input */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Voice Command</Label>
            <div className="flex space-x-2">
              <Button
                variant={voiceListening ? 'default' : 'outline'}
                size="sm"
                onClick={startVoiceListening}
                className="flex-1"
              >
                {voiceListening ? (
                  <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                ) : (
                  <Mic className="w-4 h-4 mr-2" />
                )}
                {voiceListening ? 'Listening...' : 'Voice Input'}
              </Button>
            </div>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Text Prompt</Label>
            <div className="space-y-2">
              <Textarea
                placeholder="Ask me anything about your email campaign..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="h-20 text-xs"
                rows={3}
              />
              <Button
                size="sm"
                onClick={() => processAIRequest(userPrompt, aiAssistantMode)}
                disabled={isProcessingAI || !userPrompt.trim()}
                className="w-full"
              >
                {isProcessingAI ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4 mr-2" />
                )}
                {isProcessingAI ? 'Processing...' : 'Ask AI'}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Quick Actions</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAIContent('subject')}
                className="text-xs"
              >
                <FileText className="w-3 h-3 mr-1" />
                Subject
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAIContent('headline')}
                className="text-xs"
              >
                <Type className="w-3 h-3 mr-1" />
                Headline
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAIContent('body')}
                className="text-xs"
              >
                <PenTool className="w-3 h-3 mr-1" />
                Body
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAIContent('cta')}
                className="text-xs"
              >
                <Target className="w-3 h-3 mr-1" />
                CTA
              </Button>
            </div>
          </div>

          {/* AI Response Area */}
          {aiResponse && (
            <div className="space-y-2">
              <Label className="text-xs font-medium">AI Response</Label>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {aiResponse}
                </p>
              </div>
            </div>
          )}

          {/* Marketing Tools */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Marketing Tools</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={checkCompliance}
                className="w-full text-xs"
              >
                <Shield className="w-3 h-3 mr-2" />
                Check Compliance
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={getMarketingStrategy}
                className="w-full text-xs"
              >
                <TrendingUp className="w-3 h-3 mr-2" />
                Strategy Tips
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => processAIRequest('Suggest improvements for better email deliverability', 'strategy')}
                className="w-full text-xs"
              >
                <BarChart className="w-3 h-3 mr-2" />
                Deliverability
              </Button>
            </div>
          </div>

          {/* Content Generation */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Content Generation</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => processAIRequest('Generate an image for this email campaign', 'content')}
                className="w-full text-xs"
              >
                <Camera className="w-3 h-3 mr-2" />
                Generate Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => processAIRequest('Suggest video content ideas for this campaign', 'content')}
                className="w-full text-xs"
              >
                <Video className="w-3 h-3 mr-2" />
                Video Ideas
              </Button>
            </div>
          </div>

          {/* Help & Guidelines */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Help & Guidelines</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => processAIRequest('Show me best practices for email marketing', 'strategy')}
                className="w-full text-xs"
              >
                <BookOpen className="w-3 h-3 mr-2" />
                Best Practices
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => processAIRequest('What are the legal requirements for email marketing?', 'compliance')}
                className="w-full text-xs"
              >
                <HelpCircle className="w-3 h-3 mr-2" />
                Legal Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AI Generation Dialog Component
  const AIGenerationDialog = () => {
    const handleGenerate = () => {
      generateAIEmails({
        campaignType: selectedCampaignType,
        industry: personalInfo.industry,
        targetAudience: personalInfo.targetAudience,
        campaignGoal: personalInfo.campaignGoal,
        emailCount: personalInfo.numberOfEmails,
        tone: personalInfo.tone as any,
        brandName: personalInfo.brandName,
        template: selectedTemplate
      });
      setShowAIDialog(false);
    };

    return (
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              AI Email Generator
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {selectedTemplate && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Selected Template</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedTemplate.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium">Campaign Type</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {selectedCampaignType === 'nurture' ? (
                    <Heart className="w-4 h-4 text-green-500" />
                  ) : (
                    <Megaphone className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="font-medium">
                    {selectedCampaignType === 'nurture' ? 'Nurture Sequence' : 'Broadcast Email'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Business Intelligence for AI
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-blue-600">Brand</Label>
                    <p className="text-sm font-medium">{personalInfo.brandName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-blue-600">Industry</Label>
                    <p className="text-sm">{personalInfo.industry}</p>
                  </div>
                </div>
                
                {personalInfo.productService && (
                  <div>
                    <Label className="text-sm font-medium text-green-600">Product/Service</Label>
                    <p className="text-sm">{personalInfo.productService}</p>
                  </div>
                )}
                
                {personalInfo.uniqueSellingPoint && (
                  <div>
                    <Label className="text-sm font-medium text-purple-600">Unique Selling Point</Label>
                    <p className="text-sm">{personalInfo.uniqueSellingPoint}</p>
                  </div>
                )}
                
                <div>
                  <Label className="text-sm font-medium text-orange-600">Target Audience</Label>
                  <p className="text-sm">{personalInfo.targetAudience}</p>
                </div>
                
                {personalInfo.customerPainPoints && (
                  <div>
                    <Label className="text-sm font-medium text-red-600">Customer Pain Points</Label>
                    <p className="text-sm">{personalInfo.customerPainPoints}</p>
                  </div>
                )}
                
                <div>
                  <Label className="text-sm font-medium text-indigo-600">Campaign Goal</Label>
                  <p className="text-sm">{personalInfo.campaignGoal}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <div className="text-center">
                    <Label className="text-xs font-medium text-gray-500">Emails</Label>
                    <p className="text-sm font-semibold">{personalInfo.numberOfEmails}</p>
                  </div>
                  <div className="text-center">
                    <Label className="text-xs font-medium text-gray-500">Tone</Label>
                    <p className="text-sm font-semibold capitalize">{personalInfo.tone}</p>
                  </div>
                  <div className="text-center">
                    <Label className="text-xs font-medium text-gray-500">Type</Label>
                    <p className="text-sm font-semibold capitalize">{selectedCampaignType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Lightbulb className="w-4 h-4 mr-2 text-purple-600" />
                <h4 className="font-medium text-purple-800">AI Marketing Expert Ready</h4>
              </div>
              <p className="text-sm text-purple-700 mb-4">
                Your AI will now analyze your business context and create professional, high-converting email copy that speaks directly to your audience's pain points and drives sales.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Marketing Copy...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate High-Converting Emails
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Campaign Type Selection View
  if (view === 'campaign-type') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setView('campaigns')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email Designer
          </Button>
          <h1 className="text-3xl font-bold mb-2">Choose Campaign Type</h1>
          <p className="text-muted-foreground">
            {currentCreationFlow === 'scratch' && 'Start building your email campaign from scratch'}
            {currentCreationFlow === 'template' && 'Select a template to customize'}
            {currentCreationFlow === 'ai' && 'Choose the type of AI-generated campaign'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500"
            onClick={() => handleCampaignTypeSelection('nurture')}
          >
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl">Nurture Sequence</CardTitle>
              <CardDescription className="text-center">
                Build relationships with multiple emails sent over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Multiple emails (3-12)
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Automated timing
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Relationship building
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Higher conversion rates
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500"
            onClick={() => handleCampaignTypeSelection('broadcast')}
          >
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl">Broadcast Email</CardTitle>
              <CardDescription className="text-center">
                Send a single email to your entire audience at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Single email
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Immediate delivery
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Announcements & updates
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Quick setup
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Personal Information View - Enhanced Business Context
  if (view === 'personal-info') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <Button variant="ghost" size="sm" onClick={() => setView('campaign-type')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaign Type
          </Button>
          <h2 className="text-3xl font-bold mb-2">Business Context for AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help our AI understand your business deeply so we can create compelling, personalized marketing copy that resonates with your audience and drives sales.
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                Basic Business Information
              </CardTitle>
              <CardDescription>Core details about your company and industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Brand Name *</Label>
                  <Input
                    type="text"
                    placeholder="Your Company Name"
                    value={personalInfo.brandName}
                    onChange={(e) => setPersonalInfo({...personalInfo, brandName: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">Industry *</Label>
                  <Input
                    type="text"
                    placeholder="e.g., SaaS, E-commerce, Consulting, Health & Wellness"
                    value={personalInfo.industry}
                    onChange={(e) => setPersonalInfo({...personalInfo, industry: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2">Product/Service Description *</Label>
                <Textarea
                  placeholder="Describe what you sell. Be specific about features, benefits, and how it helps customers solve problems."
                  className="min-h-[80px]"
                  value={personalInfo.productService}
                  onChange={(e) => setPersonalInfo({...personalInfo, productService: e.target.value})}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Unique Selling Point *</Label>
                <Textarea
                  placeholder="What makes you different from competitors? What's your unique advantage or benefit?"
                  className="min-h-[60px]"
                  value={personalInfo.uniqueSellingPoint}
                  onChange={(e) => setPersonalInfo({...personalInfo, uniqueSellingPoint: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Price Range</Label>
                  <Select value={personalInfo.priceRange} onValueChange={(value) => setPersonalInfo({...personalInfo, priceRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-200">$50 - $200</SelectItem>
                      <SelectItem value="200-500">$200 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="over-10000">Over $10,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">Competitive Differentiator</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Fastest delivery, Best customer service, Lowest price"
                    value={personalInfo.competitiveDifferentiator}
                    onChange={(e) => setPersonalInfo({...personalInfo, competitiveDifferentiator: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Target Audience Analysis
              </CardTitle>
              <CardDescription>Help AI understand who you're selling to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2">Target Audience *</Label>
                <Textarea
                  placeholder="Who is your ideal customer? Be specific: job titles, company sizes, demographics, interests."
                  className="min-h-[80px]"
                  value={personalInfo.targetAudience}
                  onChange={(e) => setPersonalInfo({...personalInfo, targetAudience: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Age Range</Label>
                  <Select value={personalInfo.audienceAge} onValueChange={(value) => setPersonalInfo({...personalInfo, audienceAge: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46-55">46-55</SelectItem>
                      <SelectItem value="56-65">56-65</SelectItem>
                      <SelectItem value="65+">65+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">Gender</Label>
                  <Select value={personalInfo.audienceGender} onValueChange={(value) => setPersonalInfo({...personalInfo, audienceGender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="female">Primarily Female</SelectItem>
                      <SelectItem value="male">Primarily Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">Income Level</Label>
                  <Select value={personalInfo.audienceIncome} onValueChange={(value) => setPersonalInfo({...personalInfo, audienceIncome: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-30k">Under $30k</SelectItem>
                      <SelectItem value="30k-50k">$30k - $50k</SelectItem>
                      <SelectItem value="50k-75k">$50k - $75k</SelectItem>
                      <SelectItem value="75k-100k">$75k - $100k</SelectItem>
                      <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                      <SelectItem value="over-150k">Over $150k</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Customer Pain Points *</Label>
                <Textarea
                  placeholder="What problems, frustrations, or challenges does your audience face that your product solves?"
                  className="min-h-[80px]"
                  value={personalInfo.customerPainPoints}
                  onChange={(e) => setPersonalInfo({...personalInfo, customerPainPoints: e.target.value})}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Purchase Motivation</Label>
                <Textarea
                  placeholder="Why do customers buy from you? What drives their purchasing decisions?"
                  className="min-h-[60px]"
                  value={personalInfo.purchaseMotivation}
                  onChange={(e) => setPersonalInfo({...personalInfo, purchaseMotivation: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Marketing Goals & Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Marketing Goals & Strategy
              </CardTitle>
              <CardDescription>Define your objectives and current approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2">Campaign Goal *</Label>
                <Textarea
                  placeholder="What do you want to achieve? Increase sales, build brand awareness, launch new product, nurture leads, etc."
                  className="min-h-[80px]"
                  value={personalInfo.campaignGoal}
                  onChange={(e) => setPersonalInfo({...personalInfo, campaignGoal: e.target.value})}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">Current Marketing Approach</Label>
                <Textarea
                  placeholder="What marketing channels and strategies are you currently using? Social media, ads, content marketing, etc."
                  className="min-h-[60px]"
                  value={personalInfo.currentMarketing}
                  onChange={(e) => setPersonalInfo({...personalInfo, currentMarketing: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Number of Emails</Label>
                  <Select value={personalInfo.numberOfEmails.toString()} onValueChange={(value) => setPersonalInfo({...personalInfo, numberOfEmails: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Email</SelectItem>
                      <SelectItem value="3">3 Emails</SelectItem>
                      <SelectItem value="5">5 Emails</SelectItem>
                      <SelectItem value="7">7 Emails</SelectItem>
                      <SelectItem value="10">10 Emails</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2">Communication Tone</Label>
                  <Select value={personalInfo.tone} onValueChange={(value) => setPersonalInfo({...personalInfo, tone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setView('campaign-type')}>
              Cancel
            </Button>
            <Button 
              onClick={handlePersonalInfoSubmit}
              disabled={!personalInfo.brandName || !personalInfo.industry || !personalInfo.targetAudience || !personalInfo.campaignGoal || !personalInfo.productService || !personalInfo.uniqueSellingPoint || !personalInfo.customerPainPoints}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Continue to Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Template Selection View
  if (view === 'template-selection') {
    const availableTemplates = selectedCampaignType === 'nurture' ? nurtureTemplates : broadcastTemplates;
    const basicTemplates = availableTemplates.filter(t => t.difficulty === 'basic');
    const advancedTemplates = availableTemplates.filter(t => t.difficulty === 'advanced');

    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => currentCreationFlow === 'ai' ? setView('personal-info') : setView('campaign-type')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentCreationFlow === 'ai' ? 'Back to Business Info' : 'Back to Campaign Type'}
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            Choose {selectedCampaignType === 'nurture' ? 'Nurture Sequence' : 'Broadcast Email'} Template
          </h1>
          <p className="text-muted-foreground">
            {currentCreationFlow === 'template' && 'Select a template to customize with our drag-and-drop editor'}
            {currentCreationFlow === 'ai' && 'Choose a template for AI to generate complete content'}
          </p>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Templates</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {basicTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium">Preview:</span>
                        <div className="bg-gray-50 p-2 rounded text-xs mt-1">
                          {template.preview}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleTemplateSelection(template)}
                          className="flex-1"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Select
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium">Preview:</span>
                        <div className="bg-gray-50 p-2 rounded text-xs mt-1">
                          {template.preview}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleTemplateSelection(template)}
                          className="flex-1"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Select
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Template Preview Dialog
  const TemplatePreviewDialog = () => {
    if (!selectedTemplate) return null;

    return (
      <Dialog open={showTemplatePreview} onOpenChange={setShowTemplatePreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              {selectedTemplate.name} Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Template Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {selectedTemplate.type}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {selectedTemplate.category}
                </div>
                <div>
                  <span className="font-medium">Emails:</span> {selectedTemplate.emails}
                </div>
                <div>
                  <span className="font-medium">Estimated Time:</span> {selectedTemplate.estimatedTime}
                </div>
                <div>
                  <span className="font-medium">Industry:</span> {selectedTemplate.industry}
                </div>
                <div>
                  <span className="font-medium">Difficulty:</span> {selectedTemplate.difficulty}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Email Flow Preview</h3>
              <div className="bg-white border rounded-lg p-4">
                <div className="text-sm font-mono">
                  {selectedTemplate.preview}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features Included</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowTemplatePreview(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowTemplatePreview(false);
                handleTemplateSelection(selectedTemplate);
              }}>
                Select This Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (view === 'campaigns') {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Email Designer</h1>
            <p className="text-muted-foreground">Create beautiful email sequences that convert</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => createFromScratch()} className="bg-gradient-to-r from-green-600 to-teal-600">
              <Wand2 className="w-4 h-4 mr-2" />
              Create from Scratch
            </Button>
            <Button onClick={() => createFromTemplate()} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <FileText className="w-4 h-4 mr-2" />
              Create
            </Button>
            <Button onClick={() => createWithAI()} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Create with AI
            </Button>
            <Button variant="outline" onClick={() => setView('builder')}>
              <Plus className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </div>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="nurture">Nurture Templates</TabsTrigger>
            <TabsTrigger value="broadcast">Broadcast Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            {campaign.type === 'nurture' ? (
                              <Heart className="w-4 h-4 text-green-500" />
                            ) : (
                              <Megaphone className="w-4 h-4 text-blue-500" />
                            )}
                            <h3 className="text-lg sm:text-xl font-semibold">{campaign.name}</h3>
                          </div>
                          <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'draft' ? 'secondary' : 'outline'}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {campaign.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{campaign.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{campaign.emailSequence.length} emails</span>
                          <span>•</span>
                          <span>{campaign.subscribers.toLocaleString()} subscribers</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex space-x-4">
                          <div className="text-center">
                            <p className="text-lg sm:text-2xl font-bold text-blue-600">{campaign.stats.opens}</p>
                            <p className="text-xs text-muted-foreground">Open Rate</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg sm:text-2xl font-bold text-green-600">{campaign.stats.clicks}</p>
                            <p className="text-xs text-muted-foreground">Click Rate</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg sm:text-2xl font-bold text-purple-600">{campaign.stats.revenue}</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setSelectedEmailStep(campaign.emailSequence[0]);
                              setView('builder');
                            }}
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nurture" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {nurtureTemplates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createNewCampaign(template)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{template.emails} emails</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="broadcast" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {broadcastTemplates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createNewCampaign(template)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Megaphone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{template.emails} email</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <AIGenerationDialog />
        <TemplatePreviewDialog />
      </div>
    );
  }

  // Builder view - Responsive layout for laptop screens
  return (
    <div className="h-screen flex flex-col max-w-full">
      {/* Header - Responsive */}
      <div className="border-b bg-background p-2 sm:p-4 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setView('campaigns')}>
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">{selectedCampaign?.name}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {selectedEmailStep ? `Editing: ${selectedEmailStep.name}` : 'Select an email to edit'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}>
              {previewMode === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </Button>
            <Button 
              variant={showAIAssistant ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              AI Assistant
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-1" />
              Test
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Email Sequence Steps - Responsive */}
        <div className="w-60 lg:w-72 border-r bg-muted/50 overflow-y-auto shrink-0">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Email Sequence</h3>
              {selectedCampaign?.type === 'nurture' && (
                <Button size="sm" onClick={addEmailStep}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {selectedCampaign?.emailSequence.map((step, index) => (
                <Card 
                  key={step.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedEmailStep?.id === step.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedEmailStep(step)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs truncate">{step.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{step.subject}</p>
                        <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
                          <Timer className="w-3 h-3" />
                          <span>
                            {step.delay === 0 ? 'Now' : `${step.delay}${step.delayUnit.charAt(0)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Email Editor - Responsive */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Email Settings - Responsive */}
          {selectedEmailStep && (
            <div className="border-b p-3 bg-background shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Email Name</Label>
                  <Input 
                    value={selectedEmailStep.name}
                    onChange={(e) => updateEmailStep({ name: e.target.value })}
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Subject Line</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAIAssistantMode('content');
                        setShowAIAssistant(true);
                        setUserPrompt(`Generate an engaging subject line for this ${selectedCampaign?.type} email campaign about ${selectedCampaign?.description}`);
                      }}
                      className="h-6 px-2"
                    >
                      <Sparkles className="w-3 h-3" />
                    </Button>
                  </div>
                  <Input 
                    value={selectedEmailStep.subject}
                    onChange={(e) => updateEmailStep({ subject: e.target.value })}
                    className="mt-1 h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Send Delay</Label>
                  <div className="flex space-x-1 mt-1">
                    <Input 
                      type="number"
                      value={selectedEmailStep.delay}
                      onChange={(e) => updateEmailStep({ delay: parseInt(e.target.value) || 0 })}
                      className="w-16 h-8"
                    />
                    <Select value={selectedEmailStep.delayUnit} onValueChange={(value: any) => updateEmailStep({ delayUnit: value })}>
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">min</SelectItem>
                        <SelectItem value="hours">hrs</SelectItem>
                        <SelectItem value="days">days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Element Toolbar - Responsive */}
          <div className="border-b p-2 bg-background shrink-0">
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs font-medium mr-2">Add:</span>
              <Button variant="outline" size="sm" onClick={() => addElement('heading')}>
                <Type className="w-4 h-4 mr-1" />
                Heading
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('text')}>
                <PenTool className="w-4 h-4 mr-1" />
                Text
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('button')}>
                <Target className="w-4 h-4 mr-1" />
                Button
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('image')}>
                <ImageIcon className="w-4 h-4 mr-1" />
                Image
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('divider')}>
                <Trash2 className="w-4 h-4 mr-1" />
                Divider
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('spacer')}>
                <Move className="w-4 h-4 mr-1" />
                Spacer
              </Button>
            </div>
            
            {/* AI Quick Actions */}
            <div className="flex flex-wrap items-center gap-1 border-t pt-2 mt-2">
              <span className="text-xs font-medium mr-2">AI:</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setAIAssistantMode('content');
                  setShowAIAssistant(true);
                  setUserPrompt('Generate engaging email content for this section');
                }}
              >
                <Wand2 className="w-3 h-3 mr-1" />
                Generate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setAIAssistantMode('edit');
                  setShowAIAssistant(true);
                  setUserPrompt('Review and improve this email content');
                }}
              >
                <Edit3 className="w-3 h-3 mr-1" />
                Improve
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setAIAssistantMode('compliance');
                  setShowAIAssistant(true);
                  setUserPrompt('Check this email for compliance and legal requirements');
                }}
              >
                <Shield className="w-3 h-3 mr-1" />
                Compliance
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setAIAssistantMode('strategy');
                  setShowAIAssistant(true);
                  setUserPrompt('Provide marketing strategy advice for this email');
                }}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Strategy
              </Button>
            </div>
          </div>

          {/* Email Canvas - Responsive */}
          <div className="flex-1 bg-gray-100 p-3 overflow-y-auto">
            <div className="mx-auto" style={{ width: previewMode === 'desktop' ? '500px' : '320px', maxWidth: '100%' }}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  {selectedEmailStep?.content.map((element) => (
                    <div
                      key={element.id}
                      className={`cursor-pointer relative group mb-3 ${
                        selectedElement?.id === element.id ? 'ring-2 ring-blue-500 rounded p-1' : ''
                      }`}
                      onClick={() => setSelectedElement(element)}
                    >
                      {element.type === 'heading' && (
                        <h2
                          style={{
                            fontSize: element.properties.fontSize,
                            fontWeight: element.properties.fontWeight,
                            textAlign: element.properties.textAlign,
                            margin: '0'
                          }}
                        >
                          {element.properties.text}
                        </h2>
                      )}

                      {element.type === 'text' && (
                        <p
                          style={{
                            fontSize: element.properties.fontSize,
                            lineHeight: element.properties.lineHeight,
                            textAlign: element.properties.textAlign,
                            margin: '0'
                          }}
                        >
                          {element.properties.text}
                        </p>
                      )}

                      {element.type === 'button' && (
                        <div style={{ textAlign: element.properties.textAlign }}>
                          <a
                            href={element.properties.link}
                            style={{
                              display: 'inline-block',
                              backgroundColor: element.properties.backgroundColor,
                              color: element.properties.textColor,
                              padding: element.properties.padding,
                              borderRadius: element.properties.borderRadius,
                              textDecoration: 'none',
                              fontWeight: 'bold'
                            }}
                          >
                            {element.properties.text}
                          </a>
                        </div>
                      )}

                      {element.type === 'image' && (
                        <div style={{ textAlign: 'center' }}>
                          <img
                            src={element.properties.src}
                            alt={element.properties.alt}
                            style={{
                              width: element.properties.width,
                              maxWidth: '100%',
                              height: 'auto',
                              borderRadius: '5px'
                            }}
                          />
                        </div>
                      )}

                      {element.type === 'divider' && (
                        <hr
                          style={{
                            height: element.properties.height,
                            backgroundColor: element.properties.backgroundColor,
                            border: 'none',
                            margin: element.properties.margin
                          }}
                        />
                      )}

                      {element.type === 'spacer' && (
                        <div style={{ height: element.properties.height }}></div>
                      )}
                    </div>
                  ))}

                  {selectedEmailStep?.content.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Start building your email by adding elements above</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Element Properties or AI Assistant - Responsive */}
        {showAIAssistant ? (
          <AIAssistantPanel />
        ) : (
          <div className="w-60 lg:w-72 border-l bg-background overflow-y-auto shrink-0">
            <div className="p-3">
              {selectedElement ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Properties</h3>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAIAssistant(true)}
                        title="Get AI help with this element"
                      >
                        <Sparkles className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteElement(selectedElement.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {(selectedElement.type === 'heading' || selectedElement.type === 'text') && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Text Content</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAIAssistantMode('content');
                              setShowAIAssistant(true);
                              setUserPrompt(`Improve this ${selectedElement.type} text: "${selectedElement.properties.text}"`);
                            }}
                            className="h-6 px-2"
                          >
                            <Wand2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <Textarea
                          value={selectedElement.properties.text}
                          onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                          className="mt-1 h-20"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Font Size</Label>
                        <Input
                          value={selectedElement.properties.fontSize}
                          onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Text Align</Label>
                        <Select value={selectedElement.properties.textAlign} onValueChange={(value) => updateElement(selectedElement.id, { textAlign: value })}>
                          <SelectTrigger className="mt-1 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedElement.type === 'button' && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Button Text</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAIAssistantMode('content');
                              setShowAIAssistant(true);
                              setUserPrompt(`Improve this call-to-action button text: "${selectedElement.properties.text}"`);
                            }}
                            className="h-6 px-2"
                          >
                            <Wand2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <Input
                          value={selectedElement.properties.text}
                          onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link URL</Label>
                        <Input
                          value={selectedElement.properties.link}
                          onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Background Color</Label>
                        <Input
                          type="color"
                          value={selectedElement.properties.backgroundColor}
                          onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                    </>
                  )}

                  {selectedElement.type === 'image' && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Image URL</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAIAssistantMode('content');
                              setShowAIAssistant(true);
                              setUserPrompt('Generate an image for this email campaign');
                            }}
                            className="h-6 px-2"
                          >
                            <Camera className="w-3 h-3" />
                          </Button>
                        </div>
                        <Input
                          value={selectedElement.properties.src}
                          onChange={(e) => updateElement(selectedElement.id, { src: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Alt Text</Label>
                        <Input
                          value={selectedElement.properties.alt}
                          onChange={(e) => updateElement(selectedElement.id, { alt: e.target.value })}
                          className="mt-1 h-8"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select an element to edit its properties</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAIAssistant(true)}
                    className="mt-4"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Open AI Assistant
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}