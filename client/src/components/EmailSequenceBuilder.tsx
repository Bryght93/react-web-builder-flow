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
  AlignCenter,
  AlignRight,
  Palette,
  Zap,
  Megaphone,
  Heart,
  Loader2,
  Sparkles,
  Monitor,
  Smartphone
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
  const [view, setView] = useState<'campaigns' | 'builder' | 'ai-generator'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [selectedEmailStep, setSelectedEmailStep] = useState<EmailStep | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const { toast } = useToast();

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

  // Email sequence templates
  const nurtureTemplates = [
    {
      name: "Welcome Series",
      description: "3-email onboarding sequence",
      emails: 3,
      category: "Onboarding",
      type: "nurture"
    },
    {
      name: "Product Launch",
      description: "5-email launch campaign",
      emails: 5,
      category: "Sales",
      type: "nurture"
    },
    {
      name: "Nurture Sequence",
      description: "7-email nurture campaign",
      emails: 7,
      category: "Nurture",
      type: "nurture"
    },
    {
      name: "Abandoned Cart",
      description: "3-email recovery sequence",
      emails: 3,
      category: "Recovery",
      type: "nurture"
    }
  ];

  const broadcastTemplates = [
    {
      name: "Product Announcement",
      description: "Single email for product launches",
      emails: 1,
      category: "Announcement",
      type: "broadcast"
    },
    {
      name: "Newsletter",
      description: "Regular newsletter broadcast",
      emails: 1,
      category: "Newsletter",
      type: "broadcast"
    },
    {
      name: "Special Offer",
      description: "Promotional offer broadcast",
      emails: 1,
      category: "Promotion",
      type: "broadcast"
    },
    {
      name: "Event Invitation",
      description: "Event announcement broadcast",
      emails: 1,
      category: "Event",
      type: "broadcast"
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
  }) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emails');
      }

      const data = await response.json();
      const emails = data.emails;

      // Create new campaign with AI-generated emails
      const newCampaign: EmailCampaign = {
        id: campaigns.length + 1,
        name: `AI-Generated ${params.campaignType} Campaign`,
        description: `AI-generated ${params.campaignType} campaign for ${params.targetAudience}`,
        status: 'draft',
        type: params.campaignType,
        subscribers: 0,
        stats: { opens: "0%", clicks: "0%", revenue: "$0" },
        emailSequence: emails.map((email: any, index: number) => ({
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
        description: `Successfully generated ${emails.length} ${params.campaignType} emails.`,
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

  // AI Generation Dialog Component
  const AIGenerationDialog = () => {
    const [campaignType, setCampaignType] = useState<'nurture' | 'broadcast'>('nurture');
    const [formData, setFormData] = useState({
      industry: '',
      targetAudience: '',
      campaignGoal: '',
      emailCount: 5,
      tone: 'professional',
      brandName: ''
    });

    const handleGenerate = () => {
      generateAIEmails({
        campaignType,
        ...formData,
        emailCount: Number(formData.emailCount),
        tone: formData.tone as any
      });
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
            <div>
              <Label className="text-sm font-medium">Campaign Type</Label>
              <RadioGroup value={campaignType} onValueChange={(value: any) => setCampaignType(value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nurture" id="nurture" />
                  <Label htmlFor="nurture" className="flex items-center cursor-pointer">
                    <Heart className="w-4 h-4 mr-2 text-green-500" />
                    Nurture Sequence - Build relationships over time
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="broadcast" id="broadcast" />
                  <Label htmlFor="broadcast" className="flex items-center cursor-pointer">
                    <Megaphone className="w-4 h-4 mr-2 text-blue-500" />
                    Broadcast Email - One-time announcement
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Brand Name</Label>
                <Input
                  value={formData.brandName}
                  onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <Label className="text-sm">Industry</Label>
                <Input
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  placeholder="e.g., Marketing, Finance, Health"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Target Audience</Label>
              <Input
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="e.g., Small business owners, Marketing professionals"
              />
            </div>

            <div>
              <Label className="text-sm">Campaign Goal</Label>
              <Input
                value={formData.campaignGoal}
                onChange={(e) => setFormData({...formData, campaignGoal: e.target.value})}
                placeholder="e.g., Increase sales, Build brand awareness"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Number of Emails</Label>
                <Select value={formData.emailCount.toString()} onValueChange={(value) => setFormData({...formData, emailCount: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignType === 'broadcast' ? (
                      <SelectItem value="1">1 Email</SelectItem>
                    ) : (
                      <>
                        <SelectItem value="3">3 Emails</SelectItem>
                        <SelectItem value="5">5 Emails</SelectItem>
                        <SelectItem value="7">7 Emails</SelectItem>
                        <SelectItem value="10">10 Emails</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Emails
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
            <Button onClick={() => setShowAIDialog(true)} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generator
            </Button>
            <Button variant="outline" onClick={() => setView('builder')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
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
                  <Label className="text-xs">Subject Line</Label>
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

        {/* Right Panel - Element Properties - Responsive */}
        <div className="w-60 lg:w-72 border-l bg-background overflow-y-auto shrink-0">
          <div className="p-3">
            {selectedElement ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Properties</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteElement(selectedElement.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {(selectedElement.type === 'heading' || selectedElement.type === 'text') && (
                  <>
                    <div>
                      <Label className="text-xs">Text Content</Label>
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
                      <Label className="text-xs">Button Text</Label>
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
                      <Label className="text-xs">Image URL</Label>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}