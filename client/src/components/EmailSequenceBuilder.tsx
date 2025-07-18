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
  Minimize2,
  MousePointer,
  Brain,
  Activity,
  DollarSign,
  Minus
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
        subject: getTemplateSubject(template, i),
        delay: template.type === 'broadcast' ? 0 : (i === 0 ? 0 : i),
        delayUnit: template.type === 'broadcast' ? 'minutes' : (i === 0 ? 'minutes' : 'days'),
        content: getTemplateContent(template, i),
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
        subject: getTemplateSubject(template, i),
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
        subject: getTemplateSubject(template, i),
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

  const getTemplateSubject = (template: any, emailIndex: number) => {
    // Get proper subjects for each template type
    if (template.name === 'Welcome Series') {
      const subjects = [
        'Welcome to our community! 🎉',
        'Ready to get started? Here\'s your roadmap 🗺️',
        'Your free resource library awaits 📚'
      ];
      return subjects[emailIndex] || subjects[0];
    }

    if (template.name === 'Product Launch') {
      const subjects = [
        'Something BIG is coming... 🚀',
        'Introducing [Product Name] - Features revealed! ✨',
        'The benefits that will change your life 💫',
        'What our customers are saying (amazing!) 🌟',
        '🔥 LAUNCH DAY: Get [Product Name] now!'
      ];
      return subjects[emailIndex] || subjects[0];
    }

    if (template.name === 'Nurture Sequence') {
      const subjects = [
        'The #1 mistake most people make (and how to avoid it)',
        '3 quick tips that changed everything for me',
        'Case study: How Sarah increased her results by 300%',
        'The secret strategy nobody talks about',
        'Success story: From zero to hero in 30 days',
        'Special offer just for you (limited time)',
        'What\'s next on your journey?'
      ];
      return subjects[emailIndex] || subjects[0];
    }

    if (template.name === 'Abandoned Cart') {
      const subjects = [
        'You left something behind... 🛒',
        'Still thinking? Here\'s 15% off! 💸',
        'Last chance: Your cart expires soon ⏰'
      ];
      return subjects[emailIndex] || subjects[0];
    }

    // Broadcast templates
    if (template.type === 'broadcast') {
      if (template.name === 'Product Announcement') {
        return '🎉 Exciting News: [Product Name] is Here!';
      }
      if (template.name === 'Newsletter') {
        return '📰 Your Weekly Update - [Date]';
      }
      if (template.name === 'Special Offer') {
        return '🔥 Limited Time: 50% Off Everything!';
      }
      if (template.name === 'Event Invitation') {
        return '🎟️ You\'re Invited: [Event Name]';
      }
    }

    return `${template.name} - Email ${emailIndex + 1}`;
  };

  const getTemplateContent = (template: any, emailIndex: number) => {
    // Generate detailed template content based on template type and email index
    
    // Welcome Series Templates
    if (template.name === 'Welcome Series') {
      const welcomeEmails = [
        // Email 1: Welcome
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Welcome to Our Community! 🎉', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nWelcome to our amazing community! We\'re thrilled to have you on board and can\'t wait to help you achieve your goals.\n\nHere\'s what you can expect from us:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '✅ Weekly tips and strategies\n✅ Exclusive member content\n✅ Direct access to our support team\n✅ Community of like-minded individuals', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Access Your Dashboard', 
              backgroundColor: '#4CAF50', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'Questions? Just reply to this email - we read every single one!\n\nBest regards,\nThe [Company Name] Team', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ],
        // Email 2: Getting Started
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Ready to Get Started? Here\'s Your Roadmap 🗺️', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nNow that you\'re part of our community, let\'s make sure you get the most out of your experience. Here\'s your step-by-step guide to success:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'STEP 1: Complete your profile setup (2 minutes)\nThis helps us personalize your experience and connect you with relevant content.\n\nSTEP 2: Explore our resource library (10 minutes)\nWe\'ve curated the best materials to help you succeed faster.\n\nSTEP 3: Join our community discussions (5 minutes)\nConnect with other members and share your journey.\n\nSTEP 4: Schedule your success call (optional)\nGet personalized guidance from our team.', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Complete Setup Now', 
              backgroundColor: '#2196F3', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'Questions? Just reply to this email - I personally read every single one!\n\nTo your success,\n[Your Name]\nFounder, [Company Name]', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ],
        // Email 3: Resources
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Your Free Resource Library Awaits 📚', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI wanted to personally share some of our most valuable resources with you. These have helped thousands of our members achieve incredible results:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '🎯 The Ultimate Success Framework (PDF Guide)\n📊 Weekly Progress Tracker (Spreadsheet)\n🎥 Exclusive Video Training Series\n💡 Quick Win Checklist\n📞 Free 1:1 Strategy Call', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Download Resources', 
              backgroundColor: '#FF9800', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'Pro tip: Start with the Success Framework - it\'s our most popular resource for a reason!\n\nTo your success,\n[Your Name]', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ]
      ];
      return welcomeEmails[emailIndex] || welcomeEmails[0];
    }

    // Product Launch Templates
    if (template.name === 'Product Launch') {
      const launchEmails = [
        // Email 1: Teaser
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Something BIG is Coming... 🚀', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI\'ve been working on something incredible for the past few months, and I can barely contain my excitement!\n\nOn [Launch Date], I\'m revealing a game-changing solution that will transform how you [solve problem/achieve goal].', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'Here\'s a sneak peek of what\'s coming:\n\n• [Benefit 1]\n• [Benefit 2] \n• [Benefit 3]\n• And so much more...', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Get Early Access', 
              backgroundColor: '#E91E63', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 2: Features
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Introducing ProFlow - Features Revealed! ✨', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nThe wait is almost over! Today I\'m excited to show you exactly what ProFlow can do for you.\n\nThese features alone will save you 10+ hours per week...', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '🎯 SMART AUTOMATION: Set it once, run forever\nSaves 15 hours per week on repetitive tasks\n\n⚡ INSTANT ANALYTICS: Real-time insights dashboard\nMake data-driven decisions in seconds, not days\n\n🚀 AI OPTIMIZATION: Machine learning recommendations\nAutomatically improves your results over time\n\n🛡️ ENTERPRISE SECURITY: Bank-level encryption\nYour data is safer than in Fort Knox', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Watch Live Demo', 
              backgroundColor: '#9C27B0', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 3: Benefits
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'The Benefits That Will Change Your Life 💫', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nYesterday I showed you what ProFlow can do. Today, let me show you what it will do FOR YOU.\n\nThese aren\'t just features... they\'re life-changers:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '⏰ GET YOUR LIFE BACK\nSpend evenings with family instead of working late\n\n💰 INCREASE YOUR INCOME\nFree time to focus on revenue-generating activities\n\n😌 REDUCE STRESS\nNo more scrambling to meet deadlines\n\n🚀 SCALE YOUR BUSINESS\nHandle 10x more work without hiring more people\n\n🏆 BECOME THE EXPERT\nStay ahead of competitors who are still doing things manually', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Start Your Transformation', 
              backgroundColor: '#FF5722', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 4: Social Proof
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'What Our Customers Are Saying (Amazing!) 🌟', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nDon\'t take my word for it. Here\'s what real customers are saying about ProFlow...\n\nThese results speak for themselves:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '"ProFlow saved my business. I was drowning in manual work, now I\'m scaling faster than ever. 500% ROI in 3 months!" - Mike J., CEO\n\n"I got my life back! Now I work 30 hours instead of 60 and make more money. My family thanks you!" - Sarah L., Consultant\n\n"This is magic. Tasks that took days now take minutes. My clients think I hired a team!" - David R., Freelancer\n\nOver 10,000 successful customers and counting...', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Join 10,000+ Happy Customers', 
              backgroundColor: '#4CAF50', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 5: Launch
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '🔥 LAUNCH DAY: Get ProFlow Now!', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nIT\'S HERE! After months of anticipation, ProFlow is officially available.\n\nBut here\'s the thing... I\'m only accepting 500 founding members at this special price.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '🎉 FOUNDING MEMBER BENEFITS:\n• 50% off regular price (Save $500)\n• Lifetime updates included\n• Priority support (24/7)\n• Exclusive founder\'s community\n• 60-day money-back guarantee\n\n⏰ HURRY: Only 247 spots left!\n\nRegular price: $997\nFounding member price: $497', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Get ProFlow for $497 (Save $500)', 
              backgroundColor: '#E91E63', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '16px 32px',
              textAlign: 'center',
              link: '#'
            }
          }
        ]
      ];
      return launchEmails[emailIndex] || launchEmails[0];
    }

    // Nurture Sequence Templates
    if (template.name === 'Nurture Sequence') {
      const nurtureEmails = [
        // Email 1: Value
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'The #1 Mistake Most People Make (And How to Avoid It)', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI see this mistake everywhere, and it breaks my heart because it\'s so easily avoidable.\n\nThe mistake? Trying to do everything at once instead of focusing on one proven strategy.\n\nHere\'s why this happens and what to do instead:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'WHY IT HAPPENS:\n• Information overload from too many sources\n• Fear of missing out on the "next big thing"\n• Lack of a clear, step-by-step plan\n\nTHE SOLUTION:\n• Pick ONE strategy and master it\n• Follow a proven framework\n• Track your progress consistently\n\nResult: 10x better results in half the time', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Get the Complete Framework', 
              backgroundColor: '#607D8B', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 2: Tips
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '3 Quick Tips That Changed Everything For Me', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nYesterday I shared the biggest mistake I see people make. Today, I want to give you 3 simple tips that completely transformed my results.\n\nThese might seem basic, but don\'t let that fool you...', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'TIP #1: Start your day with your most important task\nBefore checking email, social media, or anything else.\n\nTIP #2: Set a timer for 25 minutes and work with zero distractions\nYou\'ll be amazed at what you can accomplish.\n\nTIP #3: Review your progress every Friday\nWhat worked? What didn\'t? Adjust for next week.\n\nTry these for just one week and watch what happens.', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Get My Complete System', 
              backgroundColor: '#4CAF50', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 3: Case Study
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Case Study: How Sarah Increased Her Results by 300%', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI want to share an incredible success story with you.\n\nMeet Sarah, a busy mom of two who was struggling to find time for her goals...\n\nShe was overwhelmed, scattered, and making very little progress despite working hard every day.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'BEFORE:\n• Working 12+ hours but seeing minimal results\n• Constantly switching between projects\n• Feeling burned out and frustrated\n\nAFTER (using our system):\n• 300% increase in productivity\n• 50% reduction in working hours\n• Achieved her biggest goal in just 90 days\n\n"I wish I had found this system years ago!" - Sarah M.', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'See How Sarah Did It', 
              backgroundColor: '#FF9800', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ]
      ];
      return nurtureEmails[emailIndex] || nurtureEmails[0];
    }

    // Abandoned Cart Templates
    if (template.name === 'Abandoned Cart') {
      const cartEmails = [
        // Email 1: Reminder
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'You Left Something Behind... 🛒', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI noticed you were interested in [Product Name] but didn\'t complete your purchase.\n\nNo worries - I\'ve saved your cart for you!', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'In your cart:\n• [Product Name] - $[Price]\n• [Additional items if any]\n\nTotal: $[Total Amount]', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Complete Your Purchase', 
              backgroundColor: '#4CAF50', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ],
        // Email 2: Incentive
        [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: 'Still Thinking? Here\'s 15% Off! 💸', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI understand - sometimes we need a little time to think things through.\n\nTo help make your decision easier, I\'m offering you an exclusive 15% discount on your order.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'Use code: SAVE15\n\nYour new total: $[Discounted Total]\nSavings: $[Discount Amount]\n\n⏰ This offer expires in 48 hours!', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Claim 15% Discount', 
              backgroundColor: '#FF5722', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ]
      ];
      return cartEmails[emailIndex] || cartEmails[0];
    }

    // Broadcast Templates
    if (template.type === 'broadcast') {
      
      // Product Announcement
      if (template.name === 'Product Announcement') {
        return [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '🎉 Exciting News: [Product Name] is Here!', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nToday marks a special day for our company and for you!\n\nAfter months of development and testing, we\'re thrilled to announce the launch of [Product Name] - our most innovative solution yet.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: 'What makes [Product Name] special:\n\n✨ [Key Feature 1] - [Benefit]\n🚀 [Key Feature 2] - [Benefit]\n💡 [Key Feature 3] - [Benefit]\n🎯 [Key Feature 4] - [Benefit]', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Explore [Product Name]', 
              backgroundColor: '#3F51B5', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'LAUNCH SPECIAL: Get 25% off for the first 100 customers!\nUse code: LAUNCH25\n\nThank you for being part of our journey!\n\nBest regards,\n[Your Name]', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ];
      }

      // Newsletter
      if (template.name === 'Newsletter') {
        return [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '📰 Your Weekly Update - [Date]', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nWelcome to this week\'s edition of our newsletter! Here\'s what\'s been happening and what you need to know:', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '📈 INDUSTRY NEWS\n[News item 1]\n[News item 2]\n\n💡 TIP OF THE WEEK\n[Practical tip related to your industry]\n\n🎯 FEATURED CONTENT\n[Link to blog post, video, or resource]\n\n🗓️ UPCOMING EVENTS\n[Any webinars, workshops, or events]', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Read Full Newsletter', 
              backgroundColor: '#795548', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          }
        ];
      }

      // Special Offer
      if (template.name === 'Special Offer') {
        return [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '🔥 Limited Time: 50% Off Everything!', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nThis email is going to be short and sweet because this deal is too good to miss!\n\nFor the next 48 hours ONLY, you can get 50% off our entire store.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '⚡ WHAT\'S INCLUDED:\n• All products and services\n• No minimum purchase required\n• Free shipping on orders over $50\n• Instant download for digital products\n\n⏰ DEADLINE: [End Date] at midnight', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Shop 50% Off Sale', 
              backgroundColor: '#F44336', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '16px 32px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'Use code: SAVE50\n\nDon\'t wait - this offer expires soon!\n\nHappy shopping!\n[Your Name]', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ];
      }

      // Event Invitation  
      if (template.name === 'Event Invitation') {
        return [
          {
            id: 'heading-1',
            type: 'heading',
            properties: { text: '🎟️ You\'re Invited: [Event Name]', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            id: 'text-1',
            type: 'text',
            properties: { text: 'Hi [First Name],\n\nI\'m excited to personally invite you to [Event Name], an exclusive event designed for [target audience].\n\nThis isn\'t your typical [event type] - we\'re bringing together [description of attendees/speakers] for an unforgettable experience.', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }
          },
          {
            id: 'text-2',
            type: 'text',
            properties: { text: '📅 DATE: [Event Date]\n🕐 TIME: [Start Time] - [End Time]\n📍 LOCATION: [Venue/Virtual]\n🎤 SPEAKERS: [Speaker names]\n\nWHAT YOU\'LL LEARN:\n• [Learning outcome 1]\n• [Learning outcome 2]\n• [Learning outcome 3]', fontSize: '16px', lineHeight: '1.8', textAlign: 'left' }
          },
          {
            id: 'button-1',
            type: 'button',
            properties: { 
              text: 'Reserve Your Spot', 
              backgroundColor: '#673AB7', 
              textColor: '#ffffff',
              borderRadius: '8px',
              padding: '14px 28px',
              textAlign: 'center',
              link: '#'
            }
          },
          {
            id: 'text-3',
            type: 'text',
            properties: { text: 'Seats are limited and filling up fast!\n\nLooking forward to seeing you there,\n[Your Name]', fontSize: '14px', lineHeight: '1.5', textAlign: 'left' }
          }
        ];
      }
    }

    // Default fallback content
    return [
      {
        id: 'heading-1',
        type: 'heading',
        properties: { text: `${template.name} - Email ${emailIndex + 1}`, fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
      },
      {
        id: 'text-1',
        type: 'text',
        properties: { text: 'This is a customizable email template. Edit this content to match your brand and message, or use our AI assistant to help you create compelling copy.', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
      },
      {
        id: 'button-1',
        type: 'button',
        properties: { 
          text: 'Call to Action', 
          backgroundColor: '#0066cc', 
          textColor: '#ffffff',
          borderRadius: '5px',
          padding: '12px 24px',
          textAlign: 'center',
          link: '#'
        }
      }
    ];
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
                <Card key={template.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 hover:border-blue-500">
                  {/* Email Template Visual Preview */}
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-white/90">{template.category}</Badge>
                    </div>
                    
                    {/* Mini Email Preview */}
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="w-full max-w-[200px] bg-white rounded-lg shadow-lg border overflow-hidden">
                        {/* Email Header */}
                        <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Email Content Preview */}
                        <div className="p-3 space-y-2">
                          {/* Subject Line */}
                          <div className="h-2 bg-gray-800 rounded w-3/4"></div>
                          
                          {/* Header Image Placeholder */}
                          {template.name.includes('Welcome') && (
                            <div className="h-8 bg-gradient-to-r from-green-200 to-blue-200 rounded"></div>
                          )}
                          {template.name.includes('Product') && (
                            <div className="h-8 bg-gradient-to-r from-orange-200 to-red-200 rounded"></div>
                          )}
                          {template.name.includes('Newsletter') && (
                            <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded"></div>
                          )}
                          {template.name.includes('Nurture') && (
                            <div className="h-8 bg-gradient-to-r from-yellow-200 to-orange-200 rounded"></div>
                          )}
                          {template.name.includes('Cart') && (
                            <div className="h-8 bg-gradient-to-r from-red-200 to-pink-200 rounded"></div>
                          )}
                          
                          {/* Content Lines */}
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                          </div>
                          
                          {/* CTA Button */}
                          <div className="mt-2">
                            <div className="h-4 bg-blue-500 rounded text-white flex items-center justify-center">
                              <span className="text-[8px] font-medium">Call to Action</span>
                            </div>
                          </div>
                          
                          {/* Footer */}
                          <div className="space-y-0.5 pt-1">
                            <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelection(template);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-1" />
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
                <Card key={template.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 hover:border-purple-500">
                  {/* Email Template Visual Preview */}
                  <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-white/90 border-purple-300">{template.category}</Badge>
                    </div>
                    
                    {/* Advanced Template Preview */}
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="w-full max-w-[200px] bg-white rounded-lg shadow-lg border overflow-hidden">
                        {/* Email Header with Advanced Styling */}
                        <div className="h-6 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Advanced Email Content Preview */}
                        <div className="p-3 space-y-2">
                          {/* Advanced Subject Line */}
                          <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded w-4/5"></div>
                          
                          {/* Advanced Header Image with More Detail */}
                          <div className="space-y-1">
                            {template.name.includes('Advanced') && (
                              <div className="h-8 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              </div>
                            )}
                            {template.name.includes('E-commerce') && (
                              <div className="h-8 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 rounded relative">
                                <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded"></div>
                                <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/60 rounded"></div>
                              </div>
                            )}
                            {template.name.includes('SaaS') && (
                              <div className="h-8 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 rounded relative">
                                <div className="absolute inset-1 border border-white/30 rounded"></div>
                              </div>
                            )}
                          </div>
                          
                          {/* Advanced Content Structure */}
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-400 rounded w-full"></div>
                            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-3/4"></div>
                          </div>
                          
                          {/* Multiple CTA Buttons for Advanced */}
                          <div className="space-y-1">
                            <div className="h-3 bg-purple-500 rounded text-white flex items-center justify-center">
                              <span className="text-[7px] font-medium">Primary CTA</span>
                            </div>
                            <div className="h-2 bg-purple-300 rounded text-white flex items-center justify-center">
                              <span className="text-[6px] font-medium">Secondary</span>
                            </div>
                          </div>
                          
                          {/* Advanced Footer with Social Icons */}
                          <div className="space-y-0.5 pt-1 border-t border-gray-200">
                            <div className="flex space-x-0.5 justify-center">
                              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                            </div>
                            <div className="h-0.5 bg-gray-200 rounded w-2/3 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1 hover:bg-purple-50 hover:border-purple-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTemplateSelection(template);
                          }}
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-1" />
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

    // Get sample content for the template preview
    const getSampleEmailContent = (template: any) => {
      if (template.name.includes('Welcome')) {
        return {
          subject: "Welcome to [Your Company] - Let's Get Started! 🎉",
          content: (
            <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
              {/* Email Header */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Welcome to [Your Company]!</h1>
                <p className="text-blue-100">We're thrilled to have you on board</p>
              </div>
              
              {/* Email Body */}
              <div className="p-6 space-y-4">
                <div className="text-gray-800">
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">Welcome to our amazing community! We're excited to help you achieve your goals and can't wait to show you what we have in store.</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <h3 className="font-semibold mb-2">What you can expect:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>✅ Weekly tips and strategies</li>
                      <li>✅ Exclusive member content</li>
                      <li>✅ Direct access to our support team</li>
                      <li>✅ Community of like-minded individuals</li>
                    </ul>
                  </div>
                  
                  <div className="text-center my-6">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Get Started Now
                    </button>
                  </div>
                  
                  <p className="text-sm">Best regards,<br />The [Your Company] Team</p>
                </div>
              </div>
              
              {/* Email Footer */}
              <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
                <div className="flex justify-center space-x-4 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
                <p>[Your Company] | [Address] | <a href="#" className="text-blue-600 underline">Unsubscribe</a></p>
              </div>
            </div>
          )
        };
      }
      
      if (template.name.includes('Product') || template.name.includes('Launch')) {
        return {
          subject: "🚀 Introducing [Product Name] - Get Ready to Be Amazed!",
          content: (
            <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
              {/* Product Launch Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Something BIG is Coming...</h1>
                <p className="text-purple-100">Get ready for [Product Name]</p>
              </div>
              
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-orange-200 to-red-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-lg shadow-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-gray-700 font-medium">[Product Image]</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-gray-800">
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">After months of development, we're finally ready to introduce [Product Name] - the solution you've been waiting for!</p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">🌟 Key Features:</h3>
                    <ul className="space-y-1 text-sm text-yellow-700">
                      <li>• Revolutionary [Feature 1]</li>
                      <li>• Advanced [Feature 2]</li>
                      <li>• Seamless [Feature 3]</li>
                    </ul>
                  </div>
                  
                  <div className="text-center my-6">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
                <p>[Your Company] | <a href="#" className="text-blue-600 underline">Unsubscribe</a></p>
              </div>
            </div>
          )
        };
      }
      
      // Nurture Templates
      if (template.name.includes('Lead') || template.name.includes('Nurture')) {
        return {
          subject: "Your journey continues - here's what's next 🎯",
          content: (
            <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
              {/* Nurture Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Next Steps in Your Journey</h1>
                <p className="text-green-100">We're here to help you succeed</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-gray-800">
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">I hope you found value in our previous email. Today, I want to share some insights that will help you take the next step forward.</p>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
                    <h3 className="font-semibold text-green-800 mb-2">🌱 Growth Tip:</h3>
                    <p className="text-sm text-green-700">Consistency is key to achieving your goals. Small daily actions compound over time.</p>
                  </div>
                  
                  <div className="text-center my-6">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Continue Your Journey
                    </button>
                  </div>
                  
                  <p className="text-sm">Best regards,<br />Your Success Team</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
                <p>[Your Company] | <a href="#" className="text-green-600 underline">Unsubscribe</a></p>
              </div>
            </div>
          )
        };
      }
      
      // Customer Templates
      if (template.name.includes('Customer') || template.name.includes('Onboarding')) {
        return {
          subject: "Welcome aboard! Let's get you started 🚀",
          content: (
            <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
              {/* Customer Onboarding Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Welcome to the Family!</h1>
                <p className="text-blue-100">Your success is our priority</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-gray-800">
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">Welcome! We're excited to have you as our customer and can't wait to help you achieve amazing results.</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg my-4">
                    <h3 className="font-semibold mb-2">🎯 Your Next Steps:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>✅ Complete your profile setup</li>
                      <li>✅ Explore key features</li>
                      <li>✅ Schedule your onboarding call</li>
                      <li>✅ Join our community</li>
                    </ul>
                  </div>
                  
                  <div className="text-center my-6">
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Get Started Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
                <p>[Your Company] | <a href="#" className="text-blue-600 underline">Unsubscribe</a></p>
              </div>
            </div>
          )
        };
      }
      
      // Newsletter Templates
      if (template.name.includes('Newsletter') || template.name.includes('Weekly')) {
        return {
          subject: "Weekly insights: What you need to know this week 📰",
          content: (
            <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
              {/* Newsletter Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">This Week's Insights</h1>
                <p className="text-indigo-100">Stay ahead with expert insights</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-gray-800">
                  <p className="mb-3">Hi [First Name],</p>
                  <p className="mb-3">Here are this week's top insights and updates you won't want to miss.</p>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-800">📈 Trending Topic</h4>
                      <p className="text-sm text-gray-600">Key insight about industry trends...</p>
                    </div>
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-green-800">💡 Pro Tip</h4>
                      <p className="text-sm text-gray-600">Expert advice to improve your results...</p>
                    </div>
                  </div>
                  
                  <div className="text-center my-6">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Read Full Newsletter
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
                <p>[Your Company] | <a href="#" className="text-blue-600 underline">Unsubscribe</a></p>
              </div>
            </div>
          )
        };
      }
      
      // Default template
      return {
        subject: `${template.name} - Professional Email Template`,
        content: (
          <div className="bg-white max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-6 text-center">
              <h1 className="text-2xl font-bold mb-2">{template.name}</h1>
              <p className="text-gray-200">Professional email template</p>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-800">This is a sample preview of the {template.name} template. The actual content will be customized based on your business needs and brand.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Template includes:</h3>
                <ul className="space-y-1 text-sm">
                  {template.features.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium">
                  Call to Action
                </button>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 text-center text-xs text-gray-600">
              <p>[Your Company] | <a href="#" className="text-blue-600 underline">Unsubscribe</a></p>
            </div>
          </div>
        )
      };
    };

    const sampleEmail = getSampleEmailContent(selectedTemplate);

    return (
      <Dialog open={showTemplatePreview} onOpenChange={setShowTemplatePreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                {selectedTemplate.name} Preview
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedTemplate.category}</Badge>
                <Badge variant="secondary">{selectedTemplate.difficulty}</Badge>
              </div>
            </div>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Email Preview */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Preview
                </h3>
                
                {/* Subject Line Preview */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-600 mb-1">Subject Line:</div>
                  <div className="font-medium">{sampleEmail.subject}</div>
                </div>
                
                {/* Email Content Preview */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  {sampleEmail.content}
                </div>
              </div>
            </div>
            
            {/* Right Side - Template Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Template Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <div className="capitalize">{selectedTemplate.type}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Emails:</span>
                    <div>{selectedTemplate.emails} email{selectedTemplate.emails > 1 ? 's' : ''}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <div>{selectedTemplate.estimatedTime}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Industry:</span>
                    <div>{selectedTemplate.industry}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Features Included</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Customize content for your brand</li>
                  <li>• Edit with our drag-and-drop editor</li>
                  <li>• Use AI to generate personalized copy</li>
                  <li>• Preview and test before sending</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowTemplatePreview(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
            <Button 
              onClick={() => {
                setShowTemplatePreview(false);
                handleTemplateSelection(selectedTemplate);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Select & Customize
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (view === 'campaigns') {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Create Your Email Campaign</h1>
          <p className="text-muted-foreground text-lg">Choose how you'd like to create your email sequence</p>
        </div>

        {/* Campaign Creation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Use Template Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500 relative overflow-hidden"
            onClick={() => createFromTemplate()}
          >
            <CardContent className="p-0">
              {/* Template Preview Image */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded">Recommended</span>
                </div>
                {/* Template Preview Grid */}
                <div className="grid grid-cols-2 gap-2 p-4 w-full max-w-xs">
                  <div className="bg-white rounded shadow-sm p-3 space-y-2">
                    <div className="h-2 bg-blue-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-blue-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                  <div className="bg-white rounded shadow-sm p-3 space-y-2">
                    <div className="h-2 bg-green-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-green-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                  <div className="bg-white rounded shadow-sm p-3 space-y-2 col-span-2">
                    <div className="h-2 bg-purple-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-full"></div>
                    <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-purple-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Use Template</h3>
                <p className="text-gray-600 text-sm">Start with professionally designed email templates</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-purple-500 relative overflow-hidden"
            onClick={() => createWithAI()}
          >
            <CardContent className="p-0">
              {/* AI Preview Image */}
              <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Most Popular</span>
                </div>
                {/* AI Magic Animation */}
                <div className="relative">
                  <div className="w-24 h-32 bg-white rounded-lg shadow-lg p-3 space-y-2 relative">
                    <div className="h-2 bg-purple-200 rounded animate-pulse"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4 animate-pulse delay-100"></div>
                    <div className="h-1 bg-gray-200 rounded w-1/2 animate-pulse delay-200"></div>
                    <div className="h-4 bg-purple-500 rounded text-xs text-white flex items-center justify-center">AI</div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                    </div>
                  </div>
                  {/* Magic sparkles */}
                  <div className="absolute -top-4 -left-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-4">
                    <div className="w-1 h-1 bg-purple-300 rounded-full animate-ping delay-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">AI Generated</h3>
                <p className="text-gray-600 text-sm">Let AI create personalized email sequences for your business</p>
              </div>
            </CardContent>
          </Card>

          {/* Start from Scratch Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500 relative overflow-hidden"
            onClick={() => createFromScratch()}
          >
            <CardContent className="p-0">
              {/* Blank Canvas Preview */}
              <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Full Control</span>
                </div>
                {/* Blank Canvas with Grid */}
                <div className="relative">
                  <div className="w-24 h-32 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                    <Plus className="w-8 h-8 text-gray-400" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-4 grid-rows-6 h-full w-full">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="border-r border-b border-gray-300 last:border-r-0"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Design tools */}
                  <div className="absolute -top-2 -left-2">
                    <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                      <PenTool className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-4 h-4 bg-green-400 rounded flex items-center justify-center">
                      <FileText className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Start from Scratch</h3>
                <p className="text-gray-600 text-sm">Build your email sequence from the ground up</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="personalization">Personalization</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="nurture">Nurture</TabsTrigger>
            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            {/* A/B Testing Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  A/B Testing
                </CardTitle>
                <CardDescription>Test different versions to improve performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-dashed border-2 border-muted-foreground/20">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Plus className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Create A/B Test</h4>
                          <p className="text-sm text-muted-foreground">Test subject lines, content, or send times</p>
                        </div>
                        <Button size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          New Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {[
                    { name: "Subject Line Test", variants: 2, winner: "Version A", lift: "+15%", status: "Complete" },
                    { name: "CTA Button Test", variants: 3, winner: "Version B", lift: "+8%", status: "Running" },
                    { name: "Send Time Test", variants: 2, winner: "TBD", lift: "TBD", status: "Draft" }
                  ].map((test, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{test.name}</h4>
                            <Badge variant={test.status === 'Complete' ? 'default' : test.status === 'Running' ? 'secondary' : 'outline'}>
                              {test.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Variants:</span>
                              <span className="font-medium ml-1">{test.variants}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Winner:</span>
                              <span className="font-medium ml-1">{test.winner}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Lift:</span>
                              <span className="font-medium ml-1 text-green-600">{test.lift}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaigns List */}
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
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            A/B Test
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nurtureTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 hover:border-green-500">
                  {/* Email Template Visual Preview */}
                  <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-white/90">{template.category}</Badge>
                    </div>
                    
                    {/* Mini Email Preview for Nurture */}
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="w-full max-w-[200px] bg-white rounded-lg shadow-lg border overflow-hidden">
                        {/* Email Header */}
                        <div className="h-6 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Email Content Preview */}
                        <div className="p-3 space-y-2">
                          {/* Subject Line */}
                          <div className="h-2 bg-gray-800 rounded w-3/4"></div>
                          
                          {/* Header Image Placeholder - Nurture specific */}
                          {template.name.includes('Welcome') && (
                            <div className="h-8 bg-gradient-to-r from-green-200 to-emerald-200 rounded"></div>
                          )}
                          {template.name.includes('Lead') && (
                            <div className="h-8 bg-gradient-to-r from-green-200 to-teal-200 rounded"></div>
                          )}
                          {template.name.includes('Customer') && (
                            <div className="h-8 bg-gradient-to-r from-emerald-200 to-green-300 rounded"></div>
                          )}
                          
                          {/* Content Lines */}
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                          </div>
                          
                          {/* CTA Button */}
                          <div className="mt-2">
                            <div className="h-4 bg-green-500 rounded text-white flex items-center justify-center">
                              <span className="text-[8px] font-medium">Nurture CTA</span>
                            </div>
                          </div>
                          
                          {/* Footer */}
                          <div className="space-y-0.5 pt-1">
                            <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1 hover:bg-green-50 hover:border-green-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            createCampaignFromTemplateFunction(template);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="broadcast" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {broadcastTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 hover:border-blue-500">
                  {/* Email Template Visual Preview */}
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-white/90">{template.category}</Badge>
                    </div>
                    
                    {/* Mini Email Preview for Broadcast */}
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="w-full max-w-[200px] bg-white rounded-lg shadow-lg border overflow-hidden">
                        {/* Email Header */}
                        <div className="h-6 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Email Content Preview */}
                        <div className="p-3 space-y-2">
                          {/* Subject Line */}
                          <div className="h-2 bg-gray-800 rounded w-3/4"></div>
                          
                          {/* Header Image Placeholder - Broadcast specific */}
                          {template.name.includes('Product') && (
                            <div className="h-8 bg-gradient-to-r from-blue-200 to-cyan-200 rounded"></div>
                          )}
                          {template.name.includes('Newsletter') && (
                            <div className="h-8 bg-gradient-to-r from-cyan-200 to-blue-300 rounded"></div>
                          )}
                          {template.name.includes('Announcement') && (
                            <div className="h-8 bg-gradient-to-r from-blue-300 to-indigo-200 rounded"></div>
                          )}
                          
                          {/* Content Lines */}
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                          </div>
                          
                          {/* CTA Button */}
                          <div className="mt-2">
                            <div className="h-4 bg-blue-500 rounded text-white flex items-center justify-center">
                              <span className="text-[8px] font-medium">Broadcast CTA</span>
                            </div>
                          </div>
                          
                          {/* Footer */}
                          <div className="space-y-0.5 pt-1">
                            <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Megaphone className="w-4 h-4 mr-1" />
                          {template.emails} Email{template.emails > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {template.estimatedTime}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setShowTemplatePreview(true);
                          }}
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            createCampaignFromTemplateFunction(template);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Megaphone className="w-4 h-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Visual Automation Builder Tab */}
          <TabsContent value="automation" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Automation Canvas */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Automation Canvas
                  </CardTitle>
                  <CardDescription>Build visual automation flows with drag-and-drop</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 h-96 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Zap className="w-12 h-12 mx-auto text-muted-foreground/40" />
                      <div>
                        <h3 className="font-semibold text-lg">Visual Flow Builder</h3>
                        <p className="text-sm text-muted-foreground">Drag elements to create automation sequences</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Trigger
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Users className="w-4 h-4 mr-2" />
                          Tag Added
                        </Button>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          <Target className="w-4 h-4 mr-2" />
                          Purchase Made
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Time Delay
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automation Blocks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="w-5 h-5 mr-2" />
                    Automation Blocks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Trigger Blocks</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "New Subscriber", icon: Users, color: "bg-blue-500" },
                        { name: "Tag Added", icon: Target, color: "bg-green-500" },
                        { name: "Email Opened", icon: Eye, color: "bg-purple-500" },
                        { name: "Link Clicked", icon: MousePointer, color: "bg-orange-500" }
                      ].map((block, index) => (
                        <div key={index} className="flex items-center p-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                          <div className={`w-8 h-8 ${block.color} rounded flex items-center justify-center mr-3`}>
                            <block.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{block.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Action Blocks</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "Send Email", icon: Mail, color: "bg-red-500" },
                        { name: "Add Tag", icon: Target, color: "bg-cyan-500" },
                        { name: "Wait", icon: Clock, color: "bg-yellow-500" },
                        { name: "Condition", icon: CheckCircle, color: "bg-indigo-500" }
                      ].map((block, index) => (
                        <div key={index} className="flex items-center p-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                          <div className={`w-8 h-8 ${block.color} rounded flex items-center justify-center mr-3`}>
                            <block.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{block.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sequence Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Sequence Library
                </CardTitle>
                <CardDescription>Ready-to-use automation sequences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Welcome Series", desc: "5-email welcome sequence", emails: 5, icon: Heart },
                    { name: "Cart Abandonment", desc: "Recover abandoned carts", emails: 3, icon: Target },
                    { name: "Post-Purchase", desc: "Thank you & feedback", emails: 2, icon: CheckCircle },
                    { name: "Lead Nurture", desc: "Warm up cold leads", emails: 7, icon: Target },
                    { name: "Re-engagement", desc: "Win back inactive users", emails: 4, icon: RefreshCw },
                    { name: "Product Launch", desc: "Build anticipation", emails: 6, icon: Zap }
                  ].map((sequence, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <sequence.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{sequence.name}</h4>
                            <p className="text-xs text-muted-foreground">{sequence.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{sequence.emails} emails</span>
                          <Button size="sm" variant="outline">Use Template</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Email Heatmaps */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Email Heatmaps
                  </CardTitle>
                  <CardDescription>See where subscribers click in your emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Select>
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Select campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Series #1</SelectItem>
                          <SelectItem value="promo">Spring Promotion</SelectItem>
                          <SelectItem value="newsletter">Monthly Newsletter</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
                          <div className="text-center">
                            <h3 className="font-semibold text-blue-800 mb-2">Email Preview</h3>
                            <div className="space-y-2">
                              <div className="bg-red-100 p-2 rounded text-sm">
                                <span className="font-medium">Header (45 clicks)</span>
                              </div>
                              <div className="bg-yellow-100 p-2 rounded text-sm">
                                <span className="font-medium">Main Content (23 clicks)</span>
                              </div>
                              <div className="bg-green-100 p-2 rounded text-sm">
                                <span className="font-medium">CTA Button (127 clicks)</span>
                              </div>
                              <div className="bg-blue-100 p-2 rounded text-sm">
                                <span className="font-medium">Footer (8 clicks)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                              <span>High Activity</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
                              <span>Medium Activity</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
                              <span>Low Activity</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24.5%</div>
                      <div className="text-sm text-muted-foreground">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">5.2%</div>
                      <div className="text-sm text-muted-foreground">Click Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">$2,450</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">1.8%</div>
                      <div className="text-sm text-muted-foreground">Unsubscribe</div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Top Performing Emails</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        { name: "Welcome Email #1", rate: "32.1%", revenue: "$890" },
                        { name: "Product Launch", rate: "28.7%", revenue: "$1,200" },
                        { name: "Newsletter #12", rate: "19.3%", revenue: "$360" }
                      ].map((email, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="text-sm font-medium">{email.name}</p>
                            <p className="text-xs text-muted-foreground">{email.rate} open • {email.revenue}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Attribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Revenue Attribution
                </CardTitle>
                <CardDescription>Track revenue by email campaign and subscriber segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { campaign: "Welcome Series", revenue: "$4,250", conversion: "12.3%" },
                    { campaign: "Product Launch", revenue: "$8,900", conversion: "8.7%" },
                    { campaign: "Newsletter", revenue: "$2,100", conversion: "3.2%" },
                    { campaign: "Re-engagement", revenue: "$1,800", conversion: "15.1%" }
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">{item.campaign}</h4>
                          <div className="text-2xl font-bold text-green-600">{item.revenue}</div>
                          <div className="text-sm text-muted-foreground">{item.conversion} conversion</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Management Tab */}
          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subscribers Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Subscribers
                  </CardTitle>
                  <CardDescription>Manage your email subscribers and segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Subscriber
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Import CSV
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search subscribers..." className="w-64" />
                      <Button size="sm" variant="outline">
                        <Sliders className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Email</th>
                          <th className="text-left p-3 text-sm font-medium">Name</th>
                          <th className="text-left p-3 text-sm font-medium">Tags</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                          <th className="text-left p-3 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { email: "john@example.com", name: "John Doe", tags: ["VIP", "Customer"], status: "Active" },
                          { email: "jane@example.com", name: "Jane Smith", tags: ["Lead"], status: "Active" },
                          { email: "mike@example.com", name: "Mike Johnson", tags: ["Prospect"], status: "Unsubscribed" }
                        ].map((subscriber, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3 text-sm">{subscriber.email}</td>
                            <td className="p-3 text-sm">{subscriber.name}</td>
                            <td className="p-3 text-sm">
                              <div className="flex gap-1">
                                {subscriber.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <Badge variant={subscriber.status === "Active" ? "default" : "secondary"}>
                                {subscriber.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Segments and Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Segments & Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Create Segment</Label>
                    <div className="mt-2 space-y-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tag">Has Tag</SelectItem>
                          <SelectItem value="opened">Opened Email</SelectItem>
                          <SelectItem value="clicked">Clicked Link</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Segment
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Manage Tags</Label>
                    <div className="mt-2 space-y-2">
                      {["VIP", "Customer", "Lead", "Prospect"].map((tag) => (
                        <div key={tag} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{tag}</span>
                          <Button size="sm" variant="ghost">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button className="w-full" size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tag
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms & Landing Pages Tab */}
          <TabsContent value="forms" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Email Forms
                  </CardTitle>
                  <CardDescription>Create and manage signup forms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center h-24 bg-muted rounded-lg mb-3">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium text-sm">Embedded Form</h4>
                        <p className="text-xs text-muted-foreground">Add to any website</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center h-24 bg-muted rounded-lg mb-3">
                          <Globe className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium text-sm">Popup Form</h4>
                        <p className="text-xs text-muted-foreground">Exit intent & timed</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Form
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Landing Pages
                  </CardTitle>
                  <CardDescription>Standalone pages for lead capture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { name: "Free Guide Landing", visits: 1250, conversion: "24%" },
                      { name: "Webinar Signup", visits: 890, conversion: "18%" },
                      { name: "Newsletter Signup", visits: 560, conversion: "31%" }
                    ].map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{page.name}</p>
                          <p className="text-xs text-muted-foreground">{page.visits} visits • {page.conversion} conversion</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Landing Page
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Personalization Tab */}
          <TabsContent value="personalization" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Merge Tags
                  </CardTitle>
                  <CardDescription>Personalize emails with subscriber data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "{{name}}", "{{email}}", "{{company}}", "{{city}}", 
                      "{{purchase_date}}", "{{last_click}}", "{{custom_field}}", "{{score}}"
                    ].map((tag) => (
                      <Button key={tag} variant="outline" size="sm" className="font-mono text-xs">
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Example Usage</Label>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm">Hi <code className="bg-background px-1 rounded">&#123;&#123;name&#125;&#125;</code>,</p>
                      <p className="text-sm">Thanks for joining from <code className="bg-background px-1 rounded">&#123;&#123;city&#125;&#125;</code>!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="w-5 h-5 mr-2" />
                    Conditional Content
                  </CardTitle>
                  <CardDescription>Show different content based on subscriber data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Condition Rules</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tag">Tag</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                            <SelectItem value="purchase">Purchase</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Is" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="is">Is</SelectItem>
                            <SelectItem value="is-not">Is Not</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Value" className="flex-1" />
                      </div>
                      <Button size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Condition
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart AI Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Persona-Driven Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Persona Content
                  </CardTitle>
                  <CardDescription>Automatically adapt content tone by audience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Gen Z Audience</p>
                        <p className="text-xs text-muted-foreground">Fun, casual, emoji-rich</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Professionals</p>
                        <p className="text-xs text-muted-foreground">Formal, authoritative</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Seniors</p>
                        <p className="text-xs text-muted-foreground">Clear, respectful</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Personas
                  </Button>
                </CardContent>
              </Card>

              {/* Smart Send Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Smart Send Time
                  </CardTitle>
                  <CardDescription>AI learns best send time for each contact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enable Smart Timing</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Current Insights</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Best hour:</span>
                          <span className="font-medium">9-10 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best day:</span>
                          <span className="font-medium">Tuesday</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Improvement:</span>
                          <span className="font-medium text-green-600">+23%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    View Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Smart Tagging */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Smart Tagging
                  </CardTitle>
                  <CardDescription>AI recommends tags based on behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Suggested Rule</span>
                        <Badge variant="outline">New</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Add "hot-lead" tag if user clicks 3+ emails
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Accept</Button>
                        <Button size="sm" variant="ghost">Dismiss</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Active Rule</span>
                        <Badge variant="default">Running</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tag "engaged" if opens 5+ emails in 30 days
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Rule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Compliance Checklist
                  </CardTitle>
                  <CardDescription>GDPR & CAN-SPAM compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { item: "Unsubscribe link in all emails", status: "complete" },
                      { item: "Physical address in footer", status: "complete" },
                      { item: "Clear sender identification", status: "complete" },
                      { item: "Double opt-in process", status: "pending" },
                      { item: "Data retention policy", status: "pending" }
                    ].map((check, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${check.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                          {check.status === 'complete' && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm">{check.item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Compliance Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Email Footer
                  </CardTitle>
                  <CardDescription>Required footer information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Company Name</Label>
                    <Input placeholder="Your Company Name" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Physical Address</Label>
                    <Textarea placeholder="123 Main St, City, State 12345" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Unsubscribe Text</Label>
                    <Input placeholder="Click here to unsubscribe" className="mt-1" />
                  </div>
                  <Button className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Footer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          
        </Tabs>
        
        <AIGenerationDialog />
        <TemplatePreviewDialog />
      </div>
    );
  }

  // Builder view - Clean organized layout
  return (
    <div className="h-screen flex flex-col max-w-full">
      {/* Header */}
      <div className="border-b bg-background p-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setView('campaigns')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{selectedCampaign?.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedEmailStep ? `Editing: ${selectedEmailStep.name}` : 'Select an email to edit'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}>
              {previewMode === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
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
        {/* Left Panel - Email Sequence Steps */}
        <div className="w-64 border-r bg-muted/30 overflow-y-auto shrink-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
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

        {/* Center Panel - Email Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Email Canvas */}
          <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
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
                      <p className="text-sm">Start building your email by adding elements</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Element Toolbar - Moved to bottom */}
          <div className="border-t p-3 bg-background shrink-0">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => addElement('heading')}>
                <Type className="w-4 h-4 mr-2" />
                Heading
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('text')}>
                <PenTool className="w-4 h-4 mr-2" />
                Text
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('button')}>
                <Target className="w-4 h-4 mr-2" />
                Button
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('image')}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('divider')}>
                <Minus className="w-4 h-4 mr-2" />
                Divider
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('spacer')}>
                <Move className="w-4 h-4 mr-2" />
                Spacer
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Organized Sections */}
        {showAIAssistant ? (
          <AIAssistantPanel />
        ) : (
          <div className="w-80 border-l bg-background overflow-y-auto shrink-0">
            <Tabs defaultValue="settings" className="w-full h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>

              {/* Settings Tab */}
              <TabsContent value="settings" className="p-4 space-y-4">
                {selectedEmailStep && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Email Settings
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Email Name</Label>
                          <Input 
                            value={selectedEmailStep.name}
                            onChange={(e) => updateEmailStep({ name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Subject Line</Label>
                          <Input 
                            value={selectedEmailStep.subject}
                            onChange={(e) => updateEmailStep({ subject: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Preview Text</Label>
                          <Input 
                            placeholder="Add preview text..."
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Background Color</Label>
                          <Input 
                            type="color"
                            defaultValue="#ffffff"
                            className="mt-1 h-10"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Send Delay</Label>
                          <div className="flex space-x-2 mt-1">
                            <Input 
                              type="number"
                              value={selectedEmailStep.delay}
                              onChange={(e) => updateEmailStep({ delay: parseInt(e.target.value) || 0 })}
                              className="w-20"
                            />
                            <Select value={selectedEmailStep.delayUnit} onValueChange={(value: any) => updateEmailStep({ delayUnit: value })}>
                              <SelectTrigger className="w-24">
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
                  </>
                )}
                
                {!selectedEmailStep && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select an email to edit settings</p>
                  </div>
                )}
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Layout & Components
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Layout Grid</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="h-12 flex flex-col">
                          <div className="w-6 h-6 border rounded grid grid-cols-1 gap-0.5 mb-1">
                            <div className="bg-muted rounded-sm"></div>
                          </div>
                          <span className="text-xs">1 Column</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-12 flex flex-col">
                          <div className="w-6 h-6 border rounded grid grid-cols-2 gap-0.5 mb-1">
                            <div className="bg-muted rounded-sm"></div>
                            <div className="bg-muted rounded-sm"></div>
                          </div>
                          <span className="text-xs">2 Column</span>
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="w-full h-12 flex flex-col">
                          <div className="w-6 h-6 border rounded grid grid-cols-3 gap-0.5 mb-1">
                            <div className="bg-muted rounded-sm"></div>
                            <div className="bg-muted rounded-sm"></div>
                            <div className="bg-muted rounded-sm"></div>
                          </div>
                          <span className="text-xs">3 Column</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Flexbox Controls</Label>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <AlignLeft className="w-4 h-4 mr-2" />
                          Align Left
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <AlignCenter className="w-4 h-4 mr-2" />
                          Align Center
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <AlignRight className="w-4 h-4 mr-2" />
                          Align Right
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Content Components</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => addElement('heading')}>
                          <Type className="w-4 h-4 mr-1" />
                          Text
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addElement('image')}>
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Image
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addElement('button')}>
                          <Target className="w-4 h-4 mr-1" />
                          Button
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addElement('divider')}>
                          <Minus className="w-4 h-4 mr-1" />
                          Divider
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedElement && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Element Properties
                    </h4>
                    
                    <div className="space-y-3">
                      {(selectedElement.type === 'heading' || selectedElement.type === 'text') && (
                        <>
                          <div>
                            <Label className="text-sm">Text Content</Label>
                            <Textarea
                              value={selectedElement.properties.text}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1 h-20"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Font Size</Label>
                            <Input
                              value={selectedElement.properties.fontSize}
                              onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Text Align</Label>
                            <Select value={selectedElement.properties.textAlign} onValueChange={(value) => updateElement(selectedElement.id, { textAlign: value })}>
                              <SelectTrigger className="mt-1">
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
                            <Label className="text-sm">Button Text</Label>
                            <Input
                              value={selectedElement.properties.text}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Link URL</Label>
                            <Input
                              value={selectedElement.properties.link}
                              onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Background Color</Label>
                            <Input
                              type="color"
                              value={selectedElement.properties.backgroundColor}
                              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}

                      {selectedElement.type === 'image' && (
                        <>
                          <div>
                            <Label className="text-sm">Image URL</Label>
                            <Input
                              value={selectedElement.properties.src}
                              onChange={(e) => updateElement(selectedElement.id, { src: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Alt Text</Label>
                            <Input
                              value={selectedElement.properties.alt}
                              onChange={(e) => updateElement(selectedElement.id, { alt: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteElement(selectedElement.id)}
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Element
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* AI Tab */}
              <TabsContent value="ai" className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Features
                  </h3>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full h-12 flex flex-col"
                      onClick={() => setShowAIAssistant(true)}
                    >
                      <Brain className="w-5 h-5 mb-1" />
                      <span className="text-xs">AI Assistant</span>
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-12 flex flex-col"
                        onClick={() => {
                          setAIAssistantMode('content');
                          setShowAIAssistant(true);
                          setUserPrompt('Generate engaging email content');
                        }}
                      >
                        <Wand2 className="w-4 h-4 mb-1" />
                        <span className="text-xs">Generate</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-12 flex flex-col"
                        onClick={() => {
                          setAIAssistantMode('edit');
                          setShowAIAssistant(true);
                          setUserPrompt('Improve this email content');
                        }}
                      >
                        <Edit3 className="w-4 h-4 mb-1" />
                        <span className="text-xs">Improve</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-12 flex flex-col"
                        onClick={() => {
                          setAIAssistantMode('strategy');
                          setShowAIAssistant(true);
                          setUserPrompt('Provide marketing strategy advice');
                        }}
                      >
                        <TrendingUp className="w-4 h-4 mb-1" />
                        <span className="text-xs">Strategy</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-12 flex flex-col"
                        onClick={() => {
                          setAIAssistantMode('compliance');
                          setShowAIAssistant(true);
                          setUserPrompt('Check compliance requirements');
                        }}
                      >
                        <Shield className="w-4 h-4 mb-1" />
                        <span className="text-xs">Compliance</span>
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Content Generation</Label>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('content');
                            setShowAIAssistant(true);
                            setUserPrompt(`Generate an engaging subject line for this ${selectedCampaign?.type} email`);
                          }}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Subject Line
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('content');
                            setShowAIAssistant(true);
                            setUserPrompt('Generate a compelling headline');
                          }}
                        >
                          <Type className="w-4 h-4 mr-2" />
                          Headline
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('content');
                            setShowAIAssistant(true);
                            setUserPrompt('Generate email body content');
                          }}
                        >
                          <PenTool className="w-4 h-4 mr-2" />
                          Body Content
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('content');
                            setShowAIAssistant(true);
                            setUserPrompt('Generate a strong call-to-action');
                          }}
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Call to Action
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Marketing Tools</Label>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('content');
                            setShowAIAssistant(true);
                            setUserPrompt('Generate an image for this email');
                          }}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Generate Image
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('strategy');
                            setShowAIAssistant(true);
                            setUserPrompt('Check email deliverability');
                          }}
                        >
                          <BarChart className="w-4 h-4 mr-2" />
                          Deliverability
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setAIAssistantMode('strategy');
                            setShowAIAssistant(true);
                            setUserPrompt('Show best practices');
                          }}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Best Practices
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}