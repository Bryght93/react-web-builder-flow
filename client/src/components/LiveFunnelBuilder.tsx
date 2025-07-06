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
  Trash2
} from "lucide-react";

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
}

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

export default function LiveFunnelBuilder({ onComplete, onBack }: LiveFunnelBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [funnelData, setFunnelData] = useState({
    name: "",
    industry: "",
    targetAudience: "",
    mainGoal: "",
    productName: "",
    pricePoint: "",
    steps: [] as FunnelStep[]
  });
  const [selectedTemplate, setSelectedTemplate] = useState("");
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
        setProgress(20 + (i + 1) * stepProgress);
        toast({ title: `Creating ${stepType} page...` });

        const stepContent = await generateStepContent(stepType, funnelData);
        steps.push({
          id: `step-${i + 1}`,
          type: stepType,
          title: stepContent.title,
          description: stepContent.description,
          content: stepContent.content,
          isComplete: true
        });

        // Simulate realistic generation time
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setFunnelData(prev => ({ ...prev, steps }));
      setProgress(100);
      
      toast({
        title: "Funnel Generated Successfully!",
        description: `Created ${steps.length} pages with complete copy and design`,
      });

      speakText(`Your ${funnelData.productName} funnel is ready with ${steps.length} optimized pages!`);

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate funnel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateStepContent = async (stepType: FunnelStep['type'], data: any) => {
    const response = await apiRequest('/api/generate-funnel-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stepType, funnelData: data })
    });
    return response.json();
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
    toast({ title: `Previewing ${step.title}`, description: "Opening preview in new tab..." });
    // In a real implementation, this would open a preview window
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
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary" />
                <span>Review & Edit Your Funnel</span>
              </div>
              <Button
                variant="outline"
                onClick={() => speakText(`Your ${funnelData.productName} funnel includes ${funnelData.steps.length} optimized pages with professional copy and design.`)}
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
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => editStep(step)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  {step.content.headline && (
                    <div>
                      <Label className="text-xs text-muted-foreground">HEADLINE</Label>
                      <p className="font-medium text-lg">{step.content.headline}</p>
                    </div>
                  )}
                  {step.content.subheadline && (
                    <div>
                      <Label className="text-xs text-muted-foreground">SUBHEADLINE</Label>
                      <p className="text-muted-foreground">{step.content.subheadline}</p>
                    </div>
                  )}
                  {step.content.bodyText && (
                    <div>
                      <Label className="text-xs text-muted-foreground">BODY TEXT</Label>
                      <p className="text-sm">{step.content.bodyText}</p>
                    </div>
                  )}
                  {step.content.ctaText && (
                    <div>
                      <Label className="text-xs text-muted-foreground">CALL TO ACTION</Label>
                      <Button className="mt-1">{step.content.ctaText}</Button>
                    </div>
                  )}
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

        {/* Edit Modal */}
        {currentStepEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit {currentStepEdit.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Headline</Label>
                  <Input
                    value={currentStepEdit.content.headline || ""}
                    onChange={(e) => setCurrentStepEdit(prev => prev ? {
                      ...prev,
                      content: { ...prev.content, headline: e.target.value }
                    } : null)}
                  />
                </div>
                <div>
                  <Label>Subheadline</Label>
                  <Input
                    value={currentStepEdit.content.subheadline || ""}
                    onChange={(e) => setCurrentStepEdit(prev => prev ? {
                      ...prev,
                      content: { ...prev.content, subheadline: e.target.value }
                    } : null)}
                  />
                </div>
                <div>
                  <Label>Body Text</Label>
                  <Textarea
                    value={currentStepEdit.content.bodyText || ""}
                    onChange={(e) => setCurrentStepEdit(prev => prev ? {
                      ...prev,
                      content: { ...prev.content, bodyText: e.target.value }
                    } : null)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Call to Action</Label>
                  <Input
                    value={currentStepEdit.content.ctaText || ""}
                    onChange={(e) => setCurrentStepEdit(prev => prev ? {
                      ...prev,
                      content: { ...prev.content, ctaText: e.target.value }
                    } : null)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCurrentStepEdit(null)}>
                    Cancel
                  </Button>
                  <Button onClick={saveStepEdit}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
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
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Live Funnel
            </Button>
            <Button onClick={() => onComplete?.(funnelData)}>
              <Target className="w-4 h-4 mr-2" />
              Go to Funnels Dashboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}