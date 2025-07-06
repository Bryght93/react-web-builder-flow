import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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
  X
} from "lucide-react";
import PageBuilder from "./PageBuilder";
import AIPageAssistant from "./AIPageAssistant";

interface FunnelStep {
  id: string;
  type: 'landing' | 'optin' | 'thankyou' | 'email' | 'offer' | 'upsell' | 'downsell';
  title: string;
  description: string;
  content: {
    headline?: string;
    subheadline?: string;
    bodyText?: string;
    ctaText?: string;
    images?: string[];
    colors?: {
      primary: string;
      secondary: string;
      background: string;
    };
  };
  isComplete: boolean;
}

interface LiveFunnelBuilderProps {
  onComplete?: (funnelData: any) => void;
  onBack?: () => void;
  initialFunnelData?: any;
}

// Helper functions for enhanced step content
const getStepColors = (stepType: string) => {
  const colorSchemes = {
    landing: { primary: '#10b981', secondary: '#047857', background: '#f0fdf4' },
    optin: { primary: '#3b82f6', secondary: '#1d4ed8', background: '#eff6ff' },
    thankyou: { primary: '#06b6d4', secondary: '#0891b2', background: '#f0fdff' },
    email: { primary: '#8b5cf6', secondary: '#7c3aed', background: '#faf5ff' },
    offer: { primary: '#ef4444', secondary: '#dc2626', background: '#fef2f2' },
    upsell: { primary: '#f59e0b', secondary: '#d97706', background: '#fffbeb' },
    downsell: { primary: '#6b7280', secondary: '#4b5563', background: '#f9fafb' }
  };
  return colorSchemes[stepType] || colorSchemes.landing;
};

const getStepHeadline = (stepType: string, data: any) => {
  const headlines = {
    landing: `Transform Your Life with ${data.productName}`,
    optin: `Get Your FREE ${data.productName} Guide`,
    thankyou: `Thank You! Your ${data.productName} is On Its Way`,
    email: `Welcome to Your ${data.productName} Journey`,
    offer: `Get The Complete ${data.productName} System`,
    upsell: `Upgrade Your ${data.productName} Experience`,
    downsell: `Don't Miss This Special Offer`
  };
  return headlines[stepType] || `${data.productName} - ${stepType}`;
};

const getStepSubheadline = (stepType: string, data: any) => {
  const subheadlines = {
    landing: `Join thousands who have achieved ${data.mainGoal?.toLowerCase() || 'success'} with our proven system`,
    optin: `Enter your details below to download your FREE guide instantly`,
    thankyou: `Check your email for instant access and next steps`,
    email: `You're about to discover the secrets that will change everything`,
    offer: `Everything you need to succeed, backed by our 60-day guarantee`,
    upsell: `Add premium features for just ${data.pricePoint || '$97'} more`,
    downsell: `This one-time offer expires in 15 minutes`
  };
  return subheadlines[stepType] || `Optimized for ${data.targetAudience}`;
};

const getStepBodyText = (stepType: string, data: any) => {
  const bodyTexts = {
    landing: `${data.productName} is specifically designed for ${data.targetAudience}. Our proven system has helped thousands achieve ${data.mainGoal?.toLowerCase() || 'their goals'}. Don't wait - your transformation starts today.`,
    optin: `This comprehensive guide reveals the exact strategies used by successful people in your field. Valued at ${data.pricePoint || '$97'}, it's yours FREE today. No spam, unsubscribe anytime.`,
    thankyou: `Your ${data.productName} guide is being sent to your email right now. While you wait, join our exclusive community of like-minded individuals on the same journey.`,
    email: `Over the next few days, you'll receive powerful insights and actionable strategies. Each email contains proven techniques you can implement immediately.`,
    offer: `The complete ${data.productName} system includes: Step-by-step training, downloadable resources, community access, and personal support. Limited time: Save 50% today only.`,
    upsell: `Take your results to the next level with our premium package. Get 1-on-1 coaching, advanced strategies, and priority support. This exclusive upgrade is only available to ${data.productName} customers.`,
    downsell: `Not ready for the full program? No problem! Get our essential starter package for just ${data.pricePoint || '$47'}. Same proven system, perfect for beginners.`
  };
  return bodyTexts[stepType] || `Professional ${stepType} content for ${data.productName}`;
};

const getStepCTA = (stepType: string, data: any) => {
  const ctas = {
    landing: 'Get Started Today',
    optin: 'Download FREE Guide',
    thankyou: 'Join Our Community',
    email: 'Check Your Email',
    offer: `Get ${data.productName} - ${data.pricePoint || 'Special Price'}`,
    upsell: 'Upgrade Now',
    downsell: 'Get Starter Package'
  };
  return ctas[stepType] || 'Continue';
};

const industryTemplates = [
  {
    id: "fitness",
    name: "Fitness & Health",
    description: "Personal training, nutrition, wellness coaching",
    defaultSteps: ["landing", "optin", "email", "offer"]
  },
  {
    id: "business",
    name: "Business Coaching",
    description: "Entrepreneurship, productivity, leadership",
    defaultSteps: ["landing", "optin", "email", "offer", "upsell"]
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "SEO, social media, content marketing",
    defaultSteps: ["landing", "optin", "thankyou", "email", "offer"]
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Product sales, retail, dropshipping",
    defaultSteps: ["landing", "offer", "upsell", "downsell"]
  }
];

// Function to generate default images for each step
const generateStepImages = (stepType: string, data: any): string[] => {
  const imageDefaults = {
    landing: [
      `https://source.unsplash.com/800x600/?${data.productName},fitness`,
      `https://source.unsplash.com/800x600/?${data.targetAudience},lifestyle`
    ],
    optin: [
      `https://source.unsplash.com/800x600/?${data.productName},guide`,
      `https://source.unsplash.com/800x600/?email,subscription`
    ],
    thankyou: [
      `https://source.unsplash.com/800x600/?thankyou,celebration`,
      `https://source.unsplash.com/800x600/?email,confirmation`
    ],
    email: [
      `https://source.unsplash.com/800x600/?email,marketing`,
      `https://source.unsplash.com/800x600/?newsletter,communication`
    ],
    offer: [
      `https://source.unsplash.com/800x600/?sale,discount`,
      `https://source.unsplash.com/800x600/?${data.productName},deal`
    ],
    upsell: [
      `https://source.unsplash.com/800x600/?upgrade,premium`,
      `https://source.unsplash.com/800x600/?exclusive,deal`
    ],
    downsell: [
      `https://source.unsplash.com/800x600/?discount,bargain`,
      `https://source.unsplash.com/800x600/?alternative,offer`
    ]
  };
  return imageDefaults[stepType] || [`https://source.unsplash.com/800x600/?${data.productName}`];
};

// Page Builder Component for Funnel Steps
function PageBuilderForStep({ step, onSave, onClose }: { 
  step: FunnelStep; 
  onSave: (step: FunnelStep) => void;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(step);

  const handleAIContentUpdate = (updatedContent: any) => {
    setCurrentStep(prev => ({
      ...prev,
      content: updatedContent
    }));
  };

  // Convert funnel step content to page elements
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

    if (step.content.bodyText) {
      elements.push({
        id: `body-${Date.now()}`,
        type: 'text',
        content: {
          text: step.content.bodyText,
          align: 'center',
          color: '#444444'
        }
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
    // Convert page elements back to funnel step content
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
    <div className="h-screen flex">
      {/* AI Assistant Sidebar */}
      <div className="w-80 border-r bg-muted/30 overflow-y-auto">
        <div className="p-4">
          <AIPageAssistant
            onContentUpdate={handleAIContentUpdate}
            currentContent={currentStep.content}
            pageType={currentStep.type}
          />
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b bg-background px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-semibold">Editing: {currentStep.title}</h1>
            <Badge variant="outline">{currentStep.type}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close Editor
            </Button>
            <Button onClick={() => {
              onSave(currentStep);
              onClose();
            }}>
              Save Page Design
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <PageBuilder
            initialElements={getInitialElements(currentStep)}
            onSave={(elements) => {
              const updatedContent = convertElementsToContent(elements, currentStep);
              handleAIContentUpdate(updatedContent);
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
}

export default function LiveFunnelBuilder({ onComplete, onBack, initialFunnelData }: LiveFunnelBuilderProps) {
  const [currentStep, setCurrentStep] = useState(initialFunnelData ? 2 : 0); // Go to review if editing
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(initialFunnelData ? 100 : 0);
  const [funnelData, setFunnelData] = useState({
    name: initialFunnelData?.name || "",
    industry: initialFunnelData?.industry || "",
    targetAudience: initialFunnelData?.targetAudience || "",
    mainGoal: initialFunnelData?.goal || "",
    productName: initialFunnelData?.productName || "",
    pricePoint: initialFunnelData?.pricePoint || "",
    steps: initialFunnelData?.steps || [] as FunnelStep[]
  });
  const [selectedTemplate, setSelectedTemplate] = useState(initialFunnelData?.industry || "");
  const [currentStepEdit, setCurrentStepEdit] = useState<FunnelStep | null>(null);
  const { toast } = useToast();
  const synthRef = useRef<any>(null);

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);
    }
  };

  const generateLiveFunnel = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Step 1: Generate funnel structure (20%)
      setProgress(20);
      toast({ title: "Generating funnel structure..." });

      const template = industryTemplates.find(t => t.id === selectedTemplate);
      const stepTypes = template?.defaultSteps || ["landing", "optin", "email", "offer"];

      // Step 2: Generate content for each step (80%)
      const steps: FunnelStep[] = [];
      const stepProgress = 60 / stepTypes.length;

      for (let i = 0; i < stepTypes.length; i++) {
        const stepType = stepTypes[i] as FunnelStep['type'];
        const currentProgress = 20 + (i + 1) * stepProgress;
        setProgress(currentProgress);
        toast({ title: `Creating ${stepType} page...` });

        try {
          const stepContent = await generateStepContent(stepType, funnelData);
          steps.push({
            id: `step-${i + 1}`,
            type: stepType,
            title: stepContent.title || `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Page`,
            description: stepContent.description || `High-converting ${stepType} page`,
            content: {
              ...stepContent.content,
              colors: stepContent.content?.colors || getStepColors(stepType),
              images: stepContent.content?.images || generateStepImages(stepType, funnelData)
            },
            isComplete: true
          });
        } catch (stepError) {
          console.log(`Using fallback content for ${stepType} step`);
          // Use enhanced fallback content with visual design and images
          steps.push({
            id: `step-${i + 1}`,
            type: stepType,
            title: `${stepType.charAt(0).toUpperCase() + stepType.slice(1)} Page`,
            description: `High-converting ${stepType} page for ${funnelData.productName}`,
            content: {
              headline: getStepHeadline(stepType, funnelData),
              subheadline: getStepSubheadline(stepType, funnelData),
              bodyText: getStepBodyText(stepType, funnelData),
              ctaText: getStepCTA(stepType, funnelData),
              colors: getStepColors(stepType),
              images: generateStepImages(stepType, funnelData)
            },
            isComplete: true
          });
        }

        // Realistic generation time
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setFunnelData(prev => ({ ...prev, steps }));
      setProgress(100);

      toast({
        title: "Funnel Generated Successfully!",
        description: `Created ${steps.length} pages with complete copy and design`,
      });

      speakText(`Your ${funnelData.productName} funnel is ready with ${steps.length} optimized pages!`);

      // Auto-advance to review step after 2 seconds
      setTimeout(() => {
        setCurrentStep(2);
      }, 2000);

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

  const generateStepContent = async (stepType: FunnelStep['type'], data: any) => {
    try {
      const response = await fetch('/api/generate-funnel-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepType, funnelData: data })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  const editStep = (step: FunnelStep) => {
    setCurrentStepEdit(step);
  };

  const saveStepEdit = () => {
    if (!currentStepEdit) return;

    setFunnelData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === currentStepEdit.id ? currentStepEdit : step
      )
    }));
    setCurrentStepEdit(null);
    toast({ title: "Step updated successfully" });
  };

  const previewStep = (step: FunnelStep) => {
    // Create a preview URL based on the step
    const previewUrl = `/preview/${step.type}/${step.id}`;
    window.open(previewUrl, '_blank', 'width=1200,height=800');

    toast({ 
      title: `Previewing ${step.title}`, 
      description: "Opening live preview in new tab..." 
    });
  };

  const steps = [
    { title: "Funnel Setup", description: "Configure your funnel basics" },
    { title: "Generate Content", description: "AI creates your funnel pages" },
    { title: "Review & Edit", description: "Customize your funnel" },
    { title: "Launch", description: "Make your funnel live" }
  ];

  if (currentStep === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-primary" />
            <span>Live Funnel Builder</span>
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
                }}>
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
              <h3 className="font-medium mb-2">Funnel Structure Preview</h3>
              <div className="flex flex-wrap gap-2">
                {industryTemplates.find(t => t.id === selectedTemplate)?.defaultSteps.map((step, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {step.replace(/([A-Z])/g, ' $1').trim()} Page
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button 
              onClick={() => setCurrentStep(1)}
              disabled={!funnelData.name || !selectedTemplate || !funnelData.productName}
            >
              Continue to Generation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 1) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>Generating Your Funnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-primary animate-pulse" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Creating Your {funnelData.productName} Funnel</h3>
              <p className="text-muted-foreground">
                AI is generating copy, design, and optimization for each funnel step
              </p>
            </div>

            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
            </div>

            {!isGenerating && progress === 0 && (
              <Button onClick={generateLiveFunnel} size="lg" className="mt-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Live Funnel
              </Button>
            )}

            {progress === 100 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Funnel Generated Successfully!</span>
                </div>
                <Button onClick={() => setCurrentStep(2)} size="lg">
                  Review Your Funnel
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
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary" />
                <span>Review & Edit Your Funnel Pages</span>
              </div>
              <Button
                variant="outline"
                onClick={() => speakText(`Your ${funnelData.productName} funnel includes ${funnelData.steps.length} professionally designed pages ready for customization.`)}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Read Funnel Summary
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {funnelData.steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => previewStep(step)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Preview Page
                    </Button>
                    <Button variant="default" size="sm" onClick={() => editStep(step)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Page Design
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Visual Page Preview */}
                <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="p-6 min-h-[300px]" style={{ backgroundColor: step.content.colors?.background || '#ffffff' }}>
                    {/* Page Preview */}
                    <div className="space-y-6">
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
                        <div className="max-w-2xl mx-auto text-center">
                          <p className="text-lg leading-relaxed">{step.content.bodyText}</p>
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
                      {step.type === 'offer' && step.content.ctaText && (
                        <div className="text-center">
                          <Button size="lg" className="text-lg px-8 py-4" style={{ backgroundColor: step.content.colors?.primary || '#ef4444' }}>
                            {step.content.ctaText}
                          </Button>
                        </div>
                      )}
                      {(step.type === 'landing' || step.type === 'thankyou') && step.content.ctaText && (
                        <div className="text-center">
                          <Button size="lg" className="text-lg px-8 py-4" style={{ backgroundColor: step.content.colors?.primary || '#10b981' }}>
                            {step.content.ctaText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back to Generation
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            Launch Funnel
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Full-Screen Page Editor Modal */}
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>Funnel Launched Successfully!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Your {funnelData.productName} funnel is now live!</h3>
            <p className="text-muted-foreground">
              All {funnelData.steps.length} pages are optimized and ready to convert visitors into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Landing Pages</p>
              <p className="text-sm text-muted-foreground">{funnelData.steps.filter(s => s.type === 'landing' || s.type === 'optin').length} Created</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Mail className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Email Sequences</p>
              <p className="text-sm text-muted-foreground">{funnelData.steps.filter(s => s.type === 'email').length} Set Up</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Sales Pages</p>
              <p className="text-sm text-muted-foreground">{funnelData.steps.filter(s => s.type === 'offer' || s.type === 'upsell').length} Ready</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => {
                const funnelUrl = `/live-funnel/${funnelData.name.toLowerCase().replace(/\s+/g, '-')}`;
                window.open(funnelUrl, '_blank', 'width=1200,height=800');
                toast({ 
                  title: "Opening Live Funnel", 
                  description: "Your funnel is opening in a new tab" 
                });
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Live Funnel
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
                traffic: 0
              };
              onComplete?.(newFunnel);
            }}>
              <Target className="w-4 h-4 mr-2" />
              Go to Funnels Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}