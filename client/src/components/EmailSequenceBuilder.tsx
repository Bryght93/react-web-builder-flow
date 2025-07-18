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
  Grid3X3,
  LayoutGrid,
  Columns2,
  Columns3,
  Rows3
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
    previewText?: string;
    backgroundColor?: string;
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
  const [layoutMode, setLayoutMode] = useState<'1col' | '2col' | '3col' | 'grid' | 'flex'>('1col');
  const [rightPanelTab, setRightPanelTab] = useState<'settings' | 'design' | 'ai'>('settings');
  const [personalInfo, setPersonalInfo] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    campaignGoal: '',
    numberOfEmails: 5,
    tone: 'professional',
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
      const newCampaign = createEmptyCampaign(type);
      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');
    } else if (currentCreationFlow === 'template') {
      setView('template-selection');
    } else if (currentCreationFlow === 'ai') {
      setView('personal-info');
    }
  };

  const handleTemplateSelection = async (template: any) => {
    setSelectedTemplate(template);
    if (currentCreationFlow === 'ai') {
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
      const newCampaign = createCampaignFromTemplate(template);
      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');
    }
  };

  const handlePersonalInfoSubmit = () => {
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
        settings: { 
          list: "all-subscribers", 
          sendTime: "immediate",
          previewText: "",
          backgroundColor: "#ffffff"
        }
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
        settings: { 
          list: "all-subscribers", 
          sendTime: template.type === 'broadcast' ? "immediate" : (i === 0 ? "immediate" : "9:00 AM"),
          previewText: "",
          backgroundColor: "#ffffff"
        }
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
          settings: { 
            list: "all-subscribers", 
            sendTime: "immediate",
            previewText: "Get started with our community",
            backgroundColor: "#ffffff"
          }
        }
      ]
    }
  ]);

  // Comprehensive Email Templates
  const nurtureTemplates = [
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
    }
  ];

  const broadcastTemplates = [
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
        settings: { list: "all-subscribers", sendTime: template.type === 'broadcast' ? "immediate" : (i === 0 ? "immediate" : "9:00 AM"), previewText: "",
          backgroundColor: "#ffffff" }
      }))
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setSelectedEmailStep(newCampaign.emailSequence[0]);
    setView('builder');
  };

  const generateAIEmails = async (params: any) => {
    setIsGenerating(true);
    try {
      // Mock AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newCampaign: EmailCampaign = {
        id: campaigns.length + 1,
        name: `AI-Generated ${params.campaignType} Campaign`,
        description: `AI-generated ${params.campaignType} campaign for ${params.targetAudience}`,
        status: 'draft',
        type: params.campaignType,
        subscribers: 0,
        stats: { opens: "0%", clicks: "0%", revenue: "$0" },
        emailSequence: [{
          id: 1,
          name: params.campaignType === 'broadcast' ? `${params.brandName} Broadcast` : `Email 1`,
          subject: 'AI Generated Subject Line',
          delay: 0,
          delayUnit: 'minutes',
          content: [{
            id: '1',
            type: 'text',
            properties: { text: 'AI generated email content...', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
          }],
          settings: { 
            list: "all-subscribers", 
            sendTime: "immediate",
            previewText: "AI generated preview",
            backgroundColor: "#ffffff"
          }
        }]
      };

      setCampaigns([...campaigns, newCampaign]);
      setSelectedCampaign(newCampaign);
      setSelectedEmailStep(newCampaign.emailSequence[0]);
      setView('builder');

      toast({
        title: "AI Emails Generated!",
        description: `Successfully generated ${params.campaignType} emails.`,
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

  const getTemplateSubject = (template: any, emailIndex: number) => {
    return `${template.name} - Email ${emailIndex + 1}`;
  };

  const getTemplateContent = (template: any, emailIndex: number) => {
    return [
      {
        id: 'heading-1',
        type: 'heading',
        properties: { text: `${template.name} - Email ${emailIndex + 1}`, fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
      },
      {
        id: 'text-1',
        type: 'text',
        properties: { text: 'This is a customizable email template. Edit this content to match your brand and message.', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
      }
    ];
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

  const addEmailStep = () => {
    if (!selectedCampaign) return;

    const newStep: EmailStep = {
      id: selectedCampaign.emailSequence.length + 1,
      name: `Email ${selectedCampaign.emailSequence.length + 1}`,
      subject: `Subject for Email ${selectedCampaign.emailSequence.length + 1}`,
      delay: selectedCampaign.emailSequence.length,
      delayUnit: 'days',
      content: [],
      settings: { 
        list: "all-subscribers", 
        sendTime: "9:00 AM",
        previewText: "",
        backgroundColor: "#ffffff"
      }
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Campaigns list view
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
          </div>
        </div>

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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Builder view - New clean layout
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 shrink-0">
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
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Email Sequence Steps */}
        <div className="w-72 border-r bg-muted/30 overflow-y-auto shrink-0">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Email Sequence</h3>
              {selectedCampaign?.type === 'nurture' && (
                <Button size="sm" variant="outline" onClick={addEmailStep}>
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {selectedCampaign?.emailSequence.map((step, index) => (
                <Card 
                  key={step.id} 
                  className={`cursor-pointer transition-all ${
                    selectedEmailStep?.id === step.id ? 'border-primary bg-primary/5 shadow-sm' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedEmailStep(step)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{step.name}</h4>
                        <p className="text-xs text-muted-foreground truncate mt-1">{step.subject}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                          <Timer className="w-3 h-3" />
                          <span>
                            {step.delay === 0 ? 'Immediate' : `${step.delay}${step.delayUnit.charAt(0)}`}
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
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          {/* Email Canvas */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mx-auto" style={{ width: previewMode === 'desktop' ? '600px' : '375px', maxWidth: '100%' }}>
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[400px]"
                style={{ backgroundColor: selectedEmailStep?.settings.backgroundColor || '#ffffff' }}
              >
                <div className="p-6">
                  {selectedEmailStep?.content.map((element) => (
                    <div
                      key={element.id}
                      className={`cursor-pointer relative group mb-4 ${
                        selectedElement?.id === element.id ? 'ring-2 ring-blue-500 rounded p-2' : 'hover:ring-1 hover:ring-gray-300 hover:rounded hover:p-2'
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
                    <div className="text-center py-16 text-gray-500">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">Start building your email</p>
                      <p className="text-sm">Add elements from the design panel</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add Elements Toolbar - Moved to bottom */}
          <div className="border-t bg-white p-4">
            <div className="flex flex-wrap gap-2 justify-center">
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
                <Trash2 className="w-4 h-4 mr-2" />
                Divider
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement('spacer')}>
                <Move className="w-4 h-4 mr-2" />
                Spacer
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Settings, Design, AI */}
        <div className="w-80 border-l bg-background overflow-y-auto shrink-0">
          <div className="border-b">
            <div className="grid grid-cols-3">
              <button
                className={`p-3 text-sm font-medium border-b-2 ${
                  rightPanelTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setRightPanelTab('settings')}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" />
                Settings
              </button>
              <button
                className={`p-3 text-sm font-medium border-b-2 ${
                  rightPanelTab === 'design' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setRightPanelTab('design')}
              >
                <Palette className="w-4 h-4 mx-auto mb-1" />
                Design
              </button>
              <button
                className={`p-3 text-sm font-medium border-b-2 ${
                  rightPanelTab === 'ai' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setRightPanelTab('ai')}
              >
                <Sparkles className="w-4 h-4 mx-auto mb-1" />
                AI
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Settings Tab */}
            {rightPanelTab === 'settings' && selectedEmailStep && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Subject Line</Label>
                  <Input 
                    value={selectedEmailStep.subject}
                    onChange={(e) => updateEmailStep({ subject: e.target.value })}
                    className="mt-2"
                    placeholder="Enter email subject"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Preview Text</Label>
                  <Input 
                    value={selectedEmailStep.settings.previewText || ''}
                    onChange={(e) => updateEmailStep({ 
                      settings: { 
                        ...selectedEmailStep.settings, 
                        previewText: e.target.value 
                      } 
                    })}
                    className="mt-2"
                    placeholder="Enter preview text"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Background Color</Label>
                  <div className="mt-2 flex space-x-2">
                    <Input 
                      type="color"
                      value={selectedEmailStep.settings.backgroundColor || '#ffffff'}
                      onChange={(e) => updateEmailStep({ 
                        settings: { 
                          ...selectedEmailStep.settings, 
                          backgroundColor: e.target.value 
                        } 
                      })}
                      className="w-16 h-10"
                    />
                    <Input 
                      value={selectedEmailStep.settings.backgroundColor || '#ffffff'}
                      onChange={(e) => updateEmailStep({ 
                        settings: { 
                          ...selectedEmailStep.settings, 
                          backgroundColor: e.target.value 
                        } 
                      })}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Send Delay</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input 
                      type="number"
                      value={selectedEmailStep.delay}
                      onChange={(e) => updateEmailStep({ delay: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                    <Select value={selectedEmailStep.delayUnit} onValueChange={(value: any) => updateEmailStep({ delayUnit: value })}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Design Tab */}
            {rightPanelTab === 'design' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Layout</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={layoutMode === '1col' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('1col')}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <div className="w-6 h-8 border-2 rounded mb-1"></div>
                      <span className="text-xs">1 Column</span>
                    </Button>
                    <Button
                      variant={layoutMode === '2col' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('2col')}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <Columns2 className="w-6 h-6 mb-1" />
                      <span className="text-xs">2 Columns</span>
                    </Button>
                    <Button
                      variant={layoutMode === '3col' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('3col')}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <Columns3 className="w-6 h-6 mb-1" />
                      <span className="text-xs">3 Columns</span>
                    </Button>
                    <Button
                      variant={layoutMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLayoutMode('grid')}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <LayoutGrid className="w-6 h-6 mb-1" />
                      <span className="text-xs">Grid</span>
                    </Button>
                  </div>
                </div>

                {selectedElement && (
                  <div>
                    <Label className="text-sm font-medium">Component Properties</Label>
                    <div className="mt-3 space-y-3">
                      {(selectedElement.type === 'heading' || selectedElement.type === 'text') && (
                        <>
                          <div>
                            <Label className="text-xs">Text Content</Label>
                            <Textarea
                              value={selectedElement.properties.text}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1 h-16"
                              rows={2}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Font Size</Label>
                            <Input
                              value={selectedElement.properties.fontSize}
                              onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Text Alignment</Label>
                            <div className="flex space-x-1 mt-1">
                              <Button
                                variant={selectedElement.properties.textAlign === 'left' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateElement(selectedElement.id, { textAlign: 'left' })}
                              >
                                <AlignLeft className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={selectedElement.properties.textAlign === 'center' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateElement(selectedElement.id, { textAlign: 'center' })}
                              >
                                <AlignCenter className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={selectedElement.properties.textAlign === 'right' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateElement(selectedElement.id, { textAlign: 'right' })}
                              >
                                <AlignRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedElement.type === 'button' && (
                        <>
                          <div>
                            <Label className="text-xs">Button Text</Label>
                            <Input
                              value={selectedElement.properties.text}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Link URL</Label>
                            <Input
                              value={selectedElement.properties.link}
                              onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Background Color</Label>
                            <Input
                              type="color"
                              value={selectedElement.properties.backgroundColor}
                              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
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
              </div>
            )}

            {/* AI Tab */}
            {rightPanelTab === 'ai' && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">AI Assistant</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get help with content, strategy, and optimization
                  </p>
                </div>

                <div>
                  <Label className="text-xs">Quick Actions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Wand2 className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-1" />
                      Improve
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-1" />
                      Check
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Optimize
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Content Generation</Label>
                  <div className="space-y-2 mt-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Type className="w-4 h-4 mr-2" />
                      Subject Lines
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <PenTool className="w-4 h-4 mr-2" />
                      Email Body
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Call to Action
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      Images
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Voice Assistant</Label>
                  <Button
                    variant={voiceListening ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVoiceListening(!voiceListening)}
                    className="w-full mt-2"
                  >
                    {voiceListening ? (
                      <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4 mr-2" />
                    )}
                    {voiceListening ? 'Listening...' : 'Voice Command'}
                  </Button>
                </div>

                <div>
                  <Label className="text-xs">AI Chat</Label>
                  <Textarea
                    placeholder="Ask me anything about your email..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="mt-2 h-20"
                    rows={3}
                  />
                  <Button
                    size="sm"
                    disabled={isProcessingAI || !userPrompt.trim()}
                    className="w-full mt-2"
                  >
                    {isProcessingAI ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <MessageSquare className="w-4 h-4 mr-2" />
                    )}
                    {isProcessingAI ? 'Processing...' : 'Ask AI'}
                  </Button>
                </div>

                {aiResponse && (
                  <div>
                    <Label className="text-xs">AI Response</Label>
                    <div className="bg-muted rounded-lg p-3 mt-2">
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {aiResponse}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}