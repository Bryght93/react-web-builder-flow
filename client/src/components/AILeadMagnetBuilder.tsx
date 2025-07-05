import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Brain,
  FileText,
  HelpCircle,
  CheckSquare,
  BarChart3,
  Copy,
  Zap,
  Download,
  Edit,
  Eye,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Rocket,
  Star,
  PlayCircle
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
    type: 'quiz',
    label: 'Interactive Quiz',
    icon: HelpCircle,
    description: 'Personalized assessments and evaluations',
    conversionRate: '35-50%',
    timeToCreate: '3-7 min',
    bestFor: 'Engagement, Lead Qualification'
  },
  {
    type: 'checklist',
    label: 'Checklist',
    icon: CheckSquare,
    description: 'Step-by-step action items and workflows',
    conversionRate: '18-28%',
    timeToCreate: '2-5 min',
    bestFor: 'Quick Wins, Implementation'
  },
  {
    type: 'template',
    label: 'Template',
    icon: Copy,
    description: 'Ready-to-use templates and frameworks',
    conversionRate: '25-40%',
    timeToCreate: '3-8 min',
    bestFor: 'Tools, Productivity'
  },
  {
    type: 'webinar',
    label: 'Webinar',
    icon: PlayCircle,
    description: 'Live or recorded training sessions',
    conversionRate: '45-65%',
    timeToCreate: '10-15 min',
    bestFor: 'High-ticket, Trust Building'
  },
  {
    type: 'assessment',
    label: 'Assessment Tool',
    icon: BarChart3,
    description: 'Diagnostic tools and scorecards',
    conversionRate: '30-45%',
    timeToCreate: '5-10 min',
    bestFor: 'Consulting, Personalization'
  }
];

const INDUSTRIES = [
  { value: 'fitness', label: 'Fitness & Health', icon: '💪' },
  { value: 'business', label: 'Business Consulting', icon: '💼' },
  { value: 'marketing', label: 'Marketing & Digital', icon: '📱' },
  { value: 'realestate', label: 'Real Estate', icon: '🏠' },
  { value: 'finance', label: 'Finance & Investment', icon: '💰' },
  { value: 'education', label: 'Education & Coaching', icon: '🎓' },
  { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { value: 'saas', label: 'SaaS & Technology', icon: '⚙️' },
  { value: 'creative', label: 'Creative & Design', icon: '🎨' },
  { value: 'lifestyle', label: 'Lifestyle & Personal', icon: '✨' }
];

const SAMPLE_LEAD_MAGNETS = {
  fitness: [
    { title: '7-Day Fat Burning Meal Plan', type: 'ebook', desc: 'Complete nutrition guide with recipes' },
    { title: 'What\'s Your Fitness Personality?', type: 'quiz', desc: 'Personalized workout recommendations' },
    { title: '30-Day Home Workout Challenge', type: 'checklist', desc: 'Progressive exercise routine' }
  ],
  business: [
    { title: 'Small Business Growth Blueprint', type: 'ebook', desc: 'Step-by-step scaling strategies' },
    { title: 'Business Readiness Assessment', type: 'assessment', desc: 'Evaluate your business health' },
    { title: 'Weekly Business Review Template', type: 'template', desc: 'Track KPIs and progress' }
  ],
  marketing: [
    { title: 'Social Media Content Calendar', type: 'template', desc: '30-day content planning tool' },
    { title: 'Which Marketing Channel Fits You?', type: 'quiz', desc: 'Find your best marketing approach' },
    { title: 'SEO Optimization Checklist', type: 'checklist', desc: '50-point website audit guide' }
  ]
};

interface AILeadMagnetBuilderProps {
  onComplete?: (magnetData: any) => void;
  onBack?: () => void;
}

export default function AILeadMagnetBuilder({ onComplete, onBack }: AILeadMagnetBuilderProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    description: '',
    targetAudience: '',
    mainGoal: '',
    currentChallenges: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedMagnet, setGeneratedMagnet] = useState<any>(null);
  const { toast } = useToast();

  const selectedTypeData = LEAD_MAGNET_TYPES.find(t => t.type === selectedType);
  const selectedIndustryData = INDUSTRIES.find(i => i.value === selectedIndustry);
  const sampleMagnets = selectedIndustry ? SAMPLE_LEAD_MAGNETS[selectedIndustry as keyof typeof SAMPLE_LEAD_MAGNETS] || [] : [];

  const handleGenerateMagnet = async () => {
    if (!selectedType || !selectedIndustry || !businessInfo.name || !businessInfo.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your lead magnet.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation process
    const steps = [
      { progress: 20, message: "Analyzing your business..." },
      { progress: 40, message: "Researching industry trends..." },
      { progress: 60, message: "Creating content outline..." },
      { progress: 80, message: "Generating lead magnet..." },
      { progress: 100, message: "Finalizing details..." }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Generate mock lead magnet data
    const magnetData = {
      id: `magnet-${Date.now()}`,
      title: generateTitle(selectedType, selectedIndustry, businessInfo),
      type: selectedTypeData?.label,
      industry: selectedIndustryData?.label,
      description: generateDescription(selectedType, selectedIndustry, businessInfo),
      content: generateContent(selectedType, selectedIndustry, businessInfo),
      landingPage: generateLandingPageContent(selectedType, selectedIndustry, businessInfo),
      emailSequence: generateEmailSequence(selectedType, selectedIndustry, businessInfo),
      conversionRate: selectedTypeData?.conversionRate,
      estimatedLeads: Math.floor(Math.random() * 500) + 100,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setGeneratedMagnet(magnetData);
    setIsGenerating(false);
    setStep(4);

    toast({
      title: "Lead Magnet Generated! 🎉",
      description: "Your AI-powered lead magnet is ready for review.",
    });
  };

  const generateTitle = (type: string, industry: string, business: any) => {
    const templates = {
      ebook: [
        `The Ultimate ${business.name} Guide`,
        `${industry.charAt(0).toUpperCase() + industry.slice(1)} Success Blueprint`,
        `The Complete ${business.targetAudience || 'Professional'} Handbook`
      ],
      quiz: [
        `What's Your ${industry.charAt(0).toUpperCase() + industry.slice(1)} Personality?`,
        `Are You Ready for ${business.mainGoal || 'Success'}?`,
        `Which ${industry.charAt(0).toUpperCase() + industry.slice(1)} Strategy Fits You?`
      ],
      checklist: [
        `${business.targetAudience || 'Professional'} Success Checklist`,
        `30-Day ${industry.charAt(0).toUpperCase() + industry.slice(1)} Action Plan`,
        `The ${business.mainGoal || 'Growth'} Checklist`
      ]
    };

    const typeTemplates = templates[type as keyof typeof templates] || templates.ebook;
    return typeTemplates[Math.floor(Math.random() * typeTemplates.length)];
  };

  const generateDescription = (type: string, industry: string, business: any) => {
    return `A comprehensive ${type} designed specifically for ${business.targetAudience || 'professionals'} in the ${industry} industry. This resource will help you ${business.mainGoal || 'achieve success'} by addressing ${business.currentChallenges || 'common challenges'}.`;
  };

  const generateContent = (type: string, industry: string, business: any) => {
    const contents = {
      ebook: [
        "Chapter 1: Understanding Your Market",
        "Chapter 2: Setting Clear Goals",
        "Chapter 3: Creating Your Strategy",
        "Chapter 4: Implementation Plan",
        "Chapter 5: Measuring Success"
      ],
      quiz: [
        "Question 1: What's your current experience level?",
        "Question 2: What's your primary goal?",
        "Question 3: What's your biggest challenge?",
        "Question 4: How much time can you dedicate?",
        "Question 5: What's your preferred learning style?"
      ],
      checklist: [
        "✓ Define your objectives",
        "✓ Research your target market",
        "✓ Create your action plan",
        "✓ Set up tracking systems",
        "✓ Launch and optimize"
      ]
    };

    return contents[type as keyof typeof contents] || contents.ebook;
  };

  const generateLandingPageContent = (type: string, industry: string, business: any) => {
    return {
      headline: `Get Your Free ${selectedTypeData?.label} and Transform Your ${industry.charAt(0).toUpperCase() + industry.slice(1)} Business`,
      subheadline: `Join thousands of ${business.targetAudience || 'professionals'} who have already downloaded this valuable resource.`,
      benefits: [
        `Learn the proven strategies that work in ${industry}`,
        `Get step-by-step guidance from industry experts`,
        `Avoid common mistakes that cost time and money`,
        `Access exclusive tips and insider secrets`
      ],
      cta: `Download Your Free ${selectedTypeData?.label} Now`
    };
  };

  const generateEmailSequence = (type: string, industry: string, business: any) => {
    return [
      {
        subject: `Your ${selectedTypeData?.label} is here! 📥`,
        preview: "Thanks for downloading - here's your free resource",
        content: `Hi there!\n\nThanks for downloading our ${selectedTypeData?.label}. You've taken the first step towards ${business.mainGoal || 'success'}!\n\nBest regards,\n${business.name} Team`
      },
      {
        subject: `Did you get a chance to review your ${selectedTypeData?.label}?`,
        preview: "Quick check-in + bonus tip inside",
        content: `I wanted to follow up and see if you've had a chance to go through your ${selectedTypeData?.label}.\n\nHere's a quick bonus tip: [Personalized tip based on their industry]\n\nLet me know if you have any questions!`
      },
      {
        subject: `The #1 mistake in ${industry} (and how to avoid it)`,
        preview: "This could save you months of frustration",
        content: `After helping hundreds of ${business.targetAudience || 'professionals'}, I've noticed one common mistake that keeps people stuck...\n\n[Industry-specific insight]\n\nWant to learn more? Let's chat!`
      }
    ];
  };

  const handleComplete = () => {
    if (onComplete && generatedMagnet) {
      onComplete(generatedMagnet);
    }
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Brain className="w-8 h-8 mr-3 text-primary" />
              AI Lead Magnet Builder
            </h1>
            <p className="text-muted-foreground">Let AI create the perfect lead magnet for your business</p>
          </div>
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>

        {/* Step 1: Choose Lead Magnet Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Lead Magnet Type</h2>
              <p className="text-muted-foreground">Select the type that best fits your business goals</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEAD_MAGNET_TYPES.map((type) => (
                <Card
                  key={type.type}
                  className={`cursor-pointer transition-all hover:shadow-strong ${
                    selectedType === type.type ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedType(type.type)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {type.conversionRate}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{type.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best for:</span>
                        <span className="font-medium">{type.bestFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time to create:</span>
                        <span className="font-medium">{type.timeToCreate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                variant="gradient"
                onClick={() => setStep(2)}
                disabled={!selectedType}
                className="px-8"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Industry */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Select Your Industry</h2>
              <p className="text-muted-foreground">This helps us customize your lead magnet content</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INDUSTRIES.map((industry) => (
                <Card
                  key={industry.value}
                  className={`cursor-pointer transition-all hover:shadow-soft ${
                    selectedIndustry === industry.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedIndustry(industry.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{industry.icon}</span>
                      <span className="font-medium">{industry.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sample Lead Magnets */}
            {selectedIndustry && sampleMagnets.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Popular {selectedIndustryData?.label} Lead Magnets:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {sampleMagnets.map((sample, index) => (
                    <Card key={index} className="border-0 bg-muted/50">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-1">{sample.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{sample.desc}</p>
                        <Badge variant="outline" className="text-xs">
                          {LEAD_MAGNET_TYPES.find(t => t.type === sample.type)?.label}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                variant="gradient"
                onClick={() => setStep(3)}
                disabled={!selectedIndustry}
                className="px-8"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Business Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Tell Us About Your Business</h2>
              <p className="text-muted-foreground">This information helps AI create personalized content</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={businessInfo.name}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your business or brand name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessDesc">Business Description *</Label>
                    <Textarea
                      id="businessDesc"
                      value={businessInfo.description}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what your business does, your services, and what makes you unique..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      value={businessInfo.targetAudience}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                      placeholder="e.g., Busy professionals aged 25-45, Small business owners"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Goals & Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mainGoal">Main Goal</Label>
                    <Input
                      id="mainGoal"
                      value={businessInfo.mainGoal}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, mainGoal: e.target.value }))}
                      placeholder="e.g., Get more clients, Increase revenue, Build authority"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenges">Current Challenges</Label>
                    <Textarea
                      id="challenges"
                      value={businessInfo.currentChallenges}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, currentChallenges: e.target.value }))}
                      placeholder="What challenges do you or your audience face that this lead magnet could help solve?"
                      rows={4}
                    />
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-accent" />
                      AI Will Generate:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Compelling title and content</li>
                      <li>• Landing page copy</li>
                      <li>• Email follow-up sequence</li>
                      <li>• Lead qualification questions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button
                variant="ai"
                onClick={handleGenerateMagnet}
                disabled={!businessInfo.name || !businessInfo.description}
                className="px-8"
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Generate with AI
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Generation Progress & Results */}
        {step === 4 && (
          <div className="space-y-6">
            {isGenerating ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold mb-4">AI is Creating Your Lead Magnet...</h2>
                <div className="max-w-md mx-auto">
                  <Progress value={generationProgress} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {generationProgress < 100 ? 'Processing...' : 'Almost done!'}
                  </p>
                </div>
              </div>
            ) : generatedMagnet ? (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500" />
                    Your Lead Magnet is Ready!
                  </h2>
                  <p className="text-muted-foreground">Review and customize your AI-generated lead magnet</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Lead Magnet Preview */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-soft">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-primary" />
                            {generatedMagnet.title}
                          </CardTitle>
                          <Badge variant="outline">{generatedMagnet.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{generatedMagnet.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium">Content Outline:</h4>
                          <ul className="space-y-1">
                            {generatedMagnet.content.map((item: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="w-5 h-5 mr-2 text-primary" />
                          Landing Page Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-6 border border-border rounded-lg bg-muted/30">
                          <h3 className="text-xl font-bold mb-2">{generatedMagnet.landingPage.headline}</h3>
                          <p className="text-muted-foreground mb-4">{generatedMagnet.landingPage.subheadline}</p>
                          <ul className="space-y-2 mb-4">
                            {generatedMagnet.landingPage.benefits.map((benefit: string, index: number) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckSquare className="w-4 h-4 mr-2 text-success" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          <Button variant="gradient" className="w-full">
                            {generatedMagnet.landingPage.cta}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Stats & Actions */}
                  <div className="space-y-6">
                    <Card className="border-0 shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Expected Conversion:</span>
                          <Badge variant="outline">{generatedMagnet.conversionRate}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Est. Monthly Leads:</span>
                          <span className="font-semibold text-primary">{generatedMagnet.estimatedLeads}+</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Industry:</span>
                          <span className="font-medium">{generatedMagnet.industry}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Content
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Landing Page
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Download Assets
                        </Button>
                        <Button variant="gradient" className="w-full" onClick={handleComplete}>
                          <Rocket className="w-4 h-4 mr-2" />
                          Launch Lead Magnet
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft bg-accent/5">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-accent" />
                          What's Included:
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Complete lead magnet content</li>
                          <li>• Optimized landing page</li>
                          <li>• 5-email follow-up sequence</li>
                          <li>• Lead capture forms</li>
                          <li>• Analytics tracking setup</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    ← Back to Edit
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                    <Button variant="gradient" onClick={handleComplete}>
                      <Rocket className="w-4 h-4 mr-2" />
                      Complete Setup
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}