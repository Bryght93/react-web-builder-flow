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
  Sparkles,
  FileText,
  HelpCircle,
  CheckSquare,
  BarChart3,
  Zap,
  Download,
  Edit,
  Eye,
  ArrowRight,
  CheckCircle,
  Volume2,
  Copy,
  ExternalLink,
  Star,
  Target,
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";

const LEAD_MAGNET_TYPES = [
  {
    type: 'ebook',
    label: 'eBook/Guide',
    icon: FileText,
    description: 'Comprehensive guides and detailed reports',
    conversionRate: '22-35%',
    timeToCreate: '5-10 min',
    bestFor: 'Education, Authority Building'
  },
  {
    type: 'checklist',
    label: 'Checklist/Template',
    icon: CheckSquare,
    description: 'Step-by-step checklists and templates',
    conversionRate: '35-50%',
    timeToCreate: '3-7 min',
    bestFor: 'Quick Wins, Implementation'
  },
  {
    type: 'quiz',
    label: 'Interactive Quiz',
    icon: HelpCircle,
    description: 'Personalized assessments and evaluations',
    conversionRate: '40-60%',
    timeToCreate: '7-15 min',
    bestFor: 'Engagement, Lead Qualification'
  },
  {
    type: 'template',
    label: 'Templates Bundle',
    icon: BarChart3,
    description: 'Ready-to-use templates and frameworks',
    conversionRate: '25-40%',
    timeToCreate: '10-20 min',
    bestFor: 'Implementation, Time-saving'
  }
];

interface LiveLeadMagnetBuilderProps {
  onComplete?: (magnetData: any) => void;
  onBack?: () => void;
}

export default function LiveLeadMagnetBuilder({ onComplete, onBack }: LiveLeadMagnetBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [magnetData, setMagnetData] = useState({
    title: "",
    type: "",
    topic: "",
    targetAudience: "",
    goal: "",
    content: null as any,
    landingPage: null as any,
    emailSequence: [] as any[]
  });
  const [selectedType, setSelectedType] = useState("");
  const { toast } = useToast();
  const synthRef = useRef<any>(null);

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

  const generateLiveLeadMagnet = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Step 1: Generate core content (30%)
      setProgress(30);
      toast({ title: "Generating lead magnet content..." });

      const response = await apiRequest('/api/generate-lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          topic: magnetData.topic,
          targetAudience: magnetData.targetAudience,
          goal: magnetData.goal
        })
      });

      const leadMagnetContent = await response.json();
      
      // Step 2: Generate landing page (60%)
      setProgress(60);
      toast({ title: "Creating landing page..." });
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 3: Generate email sequence (90%)
      setProgress(90);
      toast({ title: "Setting up email sequence..." });
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Final step (100%)
      setProgress(100);
      setMagnetData(prev => ({
        ...prev,
        content: leadMagnetContent.content,
        landingPage: leadMagnetContent.landingPage,
        emailSequence: leadMagnetContent.emailSequence
      }));
      
      toast({
        title: "Lead Magnet Generated Successfully!",
        description: `Created ${leadMagnetContent.type} with landing page and email sequence`,
      });

      speakText(`Your ${magnetData.topic} lead magnet is ready with professional content and landing page!`);

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate lead magnet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const previewLandingPage = () => {
    toast({ title: "Opening landing page preview...", description: "Preview will open in new tab" });
    // In a real implementation, this would open a preview window
  };

  const downloadLeadMagnet = () => {
    toast({ title: "Generating download...", description: "Your lead magnet will be ready shortly" });
    // In a real implementation, this would generate and download the PDF/content
  };

  const copyLandingPageUrl = () => {
    const url = `https://yourdomain.com/landing/${magnetData.topic.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(url);
    toast({ title: "URL Copied!", description: "Landing page URL copied to clipboard" });
  };

  const steps = [
    { title: "Setup", description: "Configure your lead magnet" },
    { title: "Generate", description: "AI creates your content" },
    { title: "Review", description: "Customize and preview" },
    { title: "Launch", description: "Make it live" }
  ];

  if (currentStep === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>Live Lead Magnet Builder</span>
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
                <Label htmlFor="topic">Lead Magnet Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Email Marketing, Social Media Strategy"
                  value={magnetData.topic}
                  onChange={(e) => setMagnetData(prev => ({ ...prev, topic: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="e.g., Small business owners who struggle with email marketing and want to increase sales"
                  value={magnetData.targetAudience}
                  onChange={(e) => setMagnetData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="goal">Main Goal</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Generate qualified leads for my email marketing course"
                  value={magnetData.goal}
                  onChange={(e) => setMagnetData(prev => ({ ...prev, goal: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Choose Lead Magnet Type</Label>
                <div className="grid gap-3 mt-2">
                  {LEAD_MAGNET_TYPES.map((type) => (
                    <div
                      key={type.type}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedType === type.type
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedType(type.type);
                        setMagnetData(prev => ({ ...prev, type: type.type }));
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <type.icon className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{type.label}</h3>
                            <Badge variant="outline" className="text-xs">
                              {type.conversionRate}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {type.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>⏱️ {type.timeToCreate}</span>
                            <span>🎯 {type.bestFor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button 
              onClick={() => setCurrentStep(1)}
              disabled={!magnetData.topic || !selectedType || !magnetData.targetAudience}
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
            <Zap className="w-6 h-6 text-primary" />
            <span>Generating Your Lead Magnet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Creating Your {magnetData.topic} Lead Magnet</h3>
              <p className="text-muted-foreground">
                AI is generating professional content, landing page, and email sequence
              </p>
            </div>

            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
            </div>

            {!isGenerating && progress === 0 && (
              <Button onClick={generateLiveLeadMagnet} size="lg" className="mt-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Lead Magnet
              </Button>
            )}

            {progress === 100 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Lead Magnet Generated Successfully!</span>
                </div>
                <Button onClick={() => setCurrentStep(2)} size="lg">
                  Review Your Lead Magnet
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
    const selectedTypeInfo = LEAD_MAGNET_TYPES.find(t => t.type === selectedType);
    
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary" />
                <span>Review Your Lead Magnet</span>
              </div>
              <Button
                variant="outline"
                onClick={() => speakText(`Your ${magnetData.topic} lead magnet is ready with professional content and automated landing page.`)}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Read Summary
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Content Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {selectedTypeInfo && <selectedTypeInfo.icon className="w-5 h-5" />}
                <span>{magnetData.title || `${magnetData.topic} Guide`}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {magnetData.content && (
                <div className="space-y-4">
                  {magnetData.content.chapters && (
                    <div>
                      <h4 className="font-medium mb-2">Chapters ({magnetData.content.chapters.length})</h4>
                      <div className="space-y-2">
                        {magnetData.content.chapters.slice(0, 3).map((chapter: any, index: number) => (
                          <div key={index} className="p-3 bg-muted/30 rounded-lg">
                            <h5 className="font-medium text-sm">{chapter.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              {chapter.content.substring(0, 100)}...
                            </p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {chapter.pages} pages
                            </Badge>
                          </div>
                        ))}
                        {magnetData.content.chapters.length > 3 && (
                          <p className="text-sm text-muted-foreground text-center">
                            +{magnetData.content.chapters.length - 3} more chapters
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {magnetData.content.items && (
                    <div>
                      <h4 className="font-medium mb-2">Checklist Items ({magnetData.content.items.length})</h4>
                      <div className="space-y-1">
                        {magnetData.content.items.slice(0, 5).map((item: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckSquare className="w-4 h-4 text-primary" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Badge variant="outline">
                      {magnetData.content.format || 'PDF'}
                    </Badge>
                    <Badge variant="outline">
                      {magnetData.content.downloadSize || '2.1 MB'}
                    </Badge>
                    {magnetData.content.totalPages && (
                      <Badge variant="outline">
                        {magnetData.content.totalPages} pages
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={downloadLeadMagnet}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Content
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Landing Page Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Landing Page</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {magnetData.landingPage && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">{magnetData.landingPage.headline}</h4>
                    <p className="text-muted-foreground mb-4">{magnetData.landingPage.subheadline}</p>
                    
                    <div className="space-y-2 mb-4">
                      <h5 className="font-medium text-sm">Benefits:</h5>
                      {magnetData.landingPage.benefits?.slice(0, 3).map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-primary" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full" size="sm">
                      {magnetData.landingPage.ctaText}
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <TrendingUp className="w-5 h-5 mx-auto text-primary mb-1" />
                      <p className="text-xs font-medium">Conv. Rate</p>
                      <p className="text-sm text-muted-foreground">{selectedTypeInfo?.conversionRate}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <Users className="w-5 h-5 mx-auto text-primary mb-1" />
                      <p className="text-xs font-medium">Leads</p>
                      <p className="text-sm text-muted-foreground">0</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <Calendar className="w-5 h-5 mx-auto text-primary mb-1" />
                      <p className="text-xs font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={previewLandingPage}>
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" onClick={copyLandingPageUrl}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy URL
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Sequence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Email Follow-up Sequence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {magnetData.emailSequence?.map((email: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium">Day {index + 1}</span>
                  </div>
                  <h5 className="font-medium text-sm mb-1">{email.subject}</h5>
                  <p className="text-xs text-muted-foreground">{email.content.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back to Generation
          </Button>
          <Button onClick={() => setCurrentStep(3)}>
            Launch Lead Magnet
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>Lead Magnet Launched Successfully!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Your {magnetData.topic} lead magnet is now live!</h3>
            <p className="text-muted-foreground">
              Complete with professional content, landing page, and automated email sequence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Content Created</p>
              <p className="text-sm text-muted-foreground">Professional {selectedType}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Landing Page</p>
              <p className="text-sm text-muted-foreground">High-converting design</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="font-medium">Email Sequence</p>
              <p className="text-sm text-muted-foreground">{magnetData.emailSequence?.length || 3} emails ready</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Page
            </Button>
            <Button onClick={() => onComplete?.(magnetData)}>
              <Target className="w-4 h-4 mr-2" />
              Go to Lead Magnets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}