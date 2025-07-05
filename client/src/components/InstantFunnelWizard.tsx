import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, 
  Target, 
  Zap, 
  FileText, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  goals: string[];
  landingCopy: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  emailSequence: string[];
  dmOutreach: string[];
}

const industryTemplates: IndustryTemplate[] = [
  {
    id: "fitness-coach",
    name: "Fitness Coach",
    description: "Personal training and wellness coaching",
    icon: Target,
    goals: ["Book free consults", "Sell workout programs", "Build email list", "Promote nutrition plans"],
    landingCopy: {
      headline: "Transform Your Body in 90 Days",
      subheadline: "Get a personalized fitness plan that fits your busy lifestyle. Book your free consultation today!",
      cta: "Get My Free Consultation"
    },
    emailSequence: [
      "Welcome! Here's your fitness assessment...",
      "The #1 mistake that's sabotaging your results...",
      "Why most people fail at fitness (and how to avoid it)...",
      "Your personalized workout plan is ready..."
    ],
    dmOutreach: [
      "Hi! I noticed you're interested in fitness. I help busy professionals transform their bodies in 90 days...",
      "Quick question - what's your biggest fitness challenge right now?"
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate Agent",
    description: "Property sales and investment guidance",
    icon: FileText,
    goals: ["Generate property leads", "Schedule home tours", "Build buyer list", "Promote listings"],
    landingCopy: {
      headline: "Find Your Dream Home Today",
      subheadline: "Get exclusive access to off-market properties and expert guidance from a local real estate professional.",
      cta: "View Available Properties"
    },
    emailSequence: [
      "Welcome to your home search journey...",
      "New properties matching your criteria...",
      "Market insights you need to know...",
      "Ready to make an offer? Here's how..."
    ],
    dmOutreach: [
      "Hi! Are you currently looking to buy or sell property in the area?",
      "I have some exclusive listings that might interest you..."
    ]
  },
  {
    id: "business-consultant",
    name: "Business Consultant",
    description: "Strategy and growth consulting",
    icon: Sparkles,
    goals: ["Book strategy calls", "Sell consulting packages", "Generate qualified leads", "Promote workshops"],
    landingCopy: {
      headline: "Scale Your Business to 7 Figures",
      subheadline: "Discover the proven strategies that helped 100+ businesses double their revenue in 12 months.",
      cta: "Book Strategy Session"
    },
    emailSequence: [
      "Welcome! Here's your business growth assessment...",
      "The revenue bottleneck killing your growth...",
      "How to systemize your business for scale...",
      "Ready to implement? Let's talk strategy..."
    ],
    dmOutreach: [
      "Hi! I help business owners scale to 7 figures. What's your biggest growth challenge?",
      "I'd love to share some insights that could help your business..."
    ]
  },
  {
    id: "marketing-agency",
    name: "Marketing Agency",
    description: "Digital marketing and advertising services",
    icon: Zap,
    goals: ["Generate agency leads", "Book audit calls", "Sell marketing services", "Promote case studies"],
    landingCopy: {
      headline: "10X Your Marketing ROI",
      subheadline: "Our proven system has generated over $50M in revenue for our clients. Get your free marketing audit.",
      cta: "Get Free Marketing Audit"
    },
    emailSequence: [
      "Welcome! Your marketing audit is being prepared...",
      "The marketing mistakes costing you money...",
      "Case study: How we 10X'd a client's ROI...",
      "Ready to scale your marketing? Let's chat..."
    ],
    dmOutreach: [
      "Hi! I noticed your business could benefit from better marketing ROI...",
      "Would you be interested in a free marketing audit?"
    ]
  }
];

interface InstantFunnelWizardProps {
  onComplete: (funnelData: any) => void;
  onBack: () => void;
}

export default function InstantFunnelWizard({ onComplete, onBack }: InstantFunnelWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryTemplate | null>(null);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleIndustrySelect = (industryId: string) => {
    const industry = industryTemplates.find(t => t.id === industryId);
    setSelectedIndustry(industry || null);
    setCurrentStep(2);
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    setCurrentStep(3);
  };

  const generateInstantFunnel = async () => {
    if (!selectedIndustry || !selectedGoal) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const funnelData = {
        id: Date.now().toString(),
        name: `${selectedIndustry.name} - ${selectedGoal}`,
        industry: selectedIndustry.name,
        goal: selectedGoal,
        status: 'draft' as const,
        leads: 0,
        conversion: 0,
        revenue: 0,
        created: "Just now",
        steps: 7,
        traffic: 0,
        template: selectedIndustry,
        generatedContent: {
          landingPage: {
            headline: selectedIndustry.landingCopy.headline,
            subheadline: selectedIndustry.landingCopy.subheadline,
            cta: selectedIndustry.landingCopy.cta
          },
          emailSequence: selectedIndustry.emailSequence,
          dmOutreach: selectedIndustry.dmOutreach
        }
      };

      onComplete(funnelData);
      setIsGenerating(false);
      
      toast({
        title: "🎉 Instant Funnel Created!",
        description: `Your ${selectedIndustry.name} funnel is ready with landing page, emails, and outreach templates.`,
      });
    }, 3000);
  };

  const steps = [
    { number: 1, title: "Pick Industry", completed: currentStep > 1 },
    { number: 2, title: "Choose Goal", completed: currentStep > 2 },
    { number: 3, title: "Generate", completed: false }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Instant Funnel Builder</h1>
            <p className="text-muted-foreground">Perfect funnel system in 3 clicks</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${step.completed 
                    ? 'bg-success border-success text-white' 
                    : currentStep === step.number 
                      ? 'border-primary text-primary bg-primary/10' 
                      : 'border-muted-foreground text-muted-foreground'
                  }
                `}>
                  {step.completed ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Industry Selection */}
        {currentStep === 1 && (
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-center">Pick Your Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {industryTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:shadow-strong transition-all border-2 hover:border-primary/50"
                    onClick={() => handleIndustrySelect(template.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <template.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goal Selection */}
        {currentStep === 2 && selectedIndustry && (
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-center">Choose Your Goal</CardTitle>
              <p className="text-center text-muted-foreground">What do you want to achieve with your {selectedIndustry.name} funnel?</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedIndustry.goals.map((goal) => (
                  <Card 
                    key={goal}
                    className="cursor-pointer hover:shadow-strong transition-all border-2 hover:border-primary/50"
                    onClick={() => handleGoalSelect(goal)}
                  >
                    <CardContent className="p-6 text-center">
                      <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h3 className="text-base font-medium">{goal}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Generation */}
        {currentStep === 3 && selectedIndustry && selectedGoal && (
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-center">Ready to Generate Your Funnel!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <selectedIndustry.icon className="w-6 h-6 text-primary" />
                  <span className="text-lg font-medium">{selectedIndustry.name}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Target className="w-5 h-5 text-success" />
                  <span className="text-base">{selectedGoal}</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Your AI-Generated Funnel Will Include:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Optimized Landing Page</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-success" />
                    <span>Email Follow-up Series</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <span>DM Outreach Templates</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="ai" 
                size="lg" 
                className="w-full max-w-md" 
                onClick={generateInstantFunnel}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    AI is Creating Your Funnel...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Perfect Funnel
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}