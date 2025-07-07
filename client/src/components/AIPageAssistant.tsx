
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Send,
  Image,
  Type,
  Palette,
  Wand2,
  MessageSquare,
  Upload
} from "lucide-react";

interface AIPageAssistantProps {
  onContentUpdate: (content: any) => void;
  currentContent: any;
  pageType: string;
}

export default function AIPageAssistant({ onContentUpdate, currentContent, pageType }: AIPageAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const aiSuggestions = {
    'funnel-setup': [
      "Generate complete funnel description",
      "Suggest target audience",
      "Recommend price point",
      "Create compelling funnel name",
      "Add industry-specific goals"
    ],
    landing: [
      "Make the headline more compelling",
      "Add social proof elements",
      "Improve the call-to-action button",
      "Create urgency in the copy",
      "Add benefit bullet points"
    ],
    optin: [
      "Optimize the form fields",
      "Add a privacy guarantee",
      "Create a better lead magnet offer",
      "Improve the value proposition",
      "Add testimonials"
    ],
    offer: [
      "Add pricing comparison table",
      "Include money-back guarantee",
      "Add customer testimonials",
      "Create payment options",
      "Highlight key benefits"
    ]
  };

  const processAIRequest = async (userPrompt: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let updatedContent = { ...currentContent };
      
      // Handle funnel setup AI
      if (pageType === 'funnel-setup') {
        if (userPrompt.toLowerCase().includes('complete') || userPrompt.toLowerCase().includes('generate')) {
          updatedContent = {
            funnelData: generateCompleteFunnelSetup(userPrompt)
          };
        } else if (userPrompt.toLowerCase().includes('name')) {
          updatedContent = {
            funnelData: { name: generateFunnelName(userPrompt) }
          };
        } else if (userPrompt.toLowerCase().includes('audience')) {
          updatedContent = {
            funnelData: { targetAudience: generateTargetAudience(userPrompt) }
          };
        } else if (userPrompt.toLowerCase().includes('price')) {
          updatedContent = {
            funnelData: { pricePoint: generatePricePoint(userPrompt) }
          };
        } else {
          updatedContent = {
            funnelData: generateCompleteFunnelSetup(userPrompt)
          };
        }
      } else {
        // Simple AI logic based on prompt keywords for other page types
        if (userPrompt.toLowerCase().includes('headline')) {
          updatedContent.headline = generateHeadline(userPrompt, pageType);
        } else if (userPrompt.toLowerCase().includes('button') || userPrompt.toLowerCase().includes('cta')) {
          updatedContent.ctaText = generateCTA(userPrompt, pageType);
        } else if (userPrompt.toLowerCase().includes('color') || userPrompt.toLowerCase().includes('design')) {
          updatedContent.colors = generateColorScheme(userPrompt);
        } else if (userPrompt.toLowerCase().includes('copy') || userPrompt.toLowerCase().includes('text')) {
          updatedContent.bodyText = generateBodyText(userPrompt, pageType);
        } else {
          // General improvement
          updatedContent = improveGeneralContent(userPrompt, currentContent, pageType);
        }
      }
      
      onContentUpdate(updatedContent);
      
      toast({
        title: "AI Assistant Applied Changes",
        description: "Your page has been updated based on your request",
      });
      
    } catch (error) {
      toast({
        title: "AI Processing Failed",
        description: "Please try again with a different request",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setPrompt("");
    }
  };

  const generateHeadline = (prompt: string, type: string) => {
    const headlines = {
      landing: [
        "Transform Your Business in 30 Days or Less",
        "The Secret System That's Changing Everything",
        "Finally! A Solution That Actually Works"
      ],
      optin: [
        "Get Your Free Guide - Download Instantly",
        "Unlock the Secrets - No Cost, No Catch",
        "Free Training: Master This in 7 Days"
      ],
      offer: [
        "Limited Time: Save 50% Today Only",
        "The Complete System - Everything Included",
        "Join 10,000+ Success Stories"
      ]
    };
    
    const typeHeadlines = headlines[type as keyof typeof headlines] || headlines.landing;
    return typeHeadlines[Math.floor(Math.random() * typeHeadlines.length)];
  };

  const generateCTA = (prompt: string, type: string) => {
    const ctas = {
      landing: ["Start Your Transformation", "Get Instant Access", "Claim Your Spot"],
      optin: ["Download Free Guide", "Get Instant Access", "Send Me The Guide"],
      offer: ["Get Complete System", "Start Today", "Join Now - 50% Off"]
    };
    
    const typeCtas = ctas[type as keyof typeof ctas] || ctas.landing;
    return typeCtas[Math.floor(Math.random() * typeCtas.length)];
  };

  const generateColorScheme = (prompt: string) => {
    const schemes = [
      { primary: '#3b82f6', secondary: '#1e40af', background: '#f8fafc' },
      { primary: '#10b981', secondary: '#047857', background: '#f0fdf4' },
      { primary: '#ef4444', secondary: '#dc2626', background: '#fef2f2' },
      { primary: '#8b5cf6', secondary: '#7c3aed', background: '#faf5ff' }
    ];
    
    return schemes[Math.floor(Math.random() * schemes.length)];
  };

  const generateBodyText = (prompt: string, type: string) => {
    const texts = {
      landing: "Discover the proven system that's helped thousands achieve their goals faster than ever before. Our step-by-step approach eliminates guesswork and delivers real results.",
      optin: "This comprehensive guide contains everything you need to get started. Valued at $97, it's yours free today. Join thousands of successful students.",
      offer: "Get the complete system with step-by-step training, templates, and personal support. 60-day money-back guarantee included."
    };
    
    return texts[type as keyof typeof texts] || texts.landing;
  };

  const improveGeneralContent = (prompt: string, content: any, type: string) => {
    return {
      ...content,
      headline: generateHeadline(prompt, type),
      bodyText: generateBodyText(prompt, type),
      ctaText: generateCTA(prompt, type)
    };
  };

  const generateCompleteFunnelSetup = (prompt: string) => {
    const industries = ['fitness', 'business', 'marketing', 'ecommerce'];
    const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
    
    const templates = {
      fitness: {
        name: '30-Day Transformation Challenge',
        productName: 'Ultimate Fitness Program',
        targetAudience: 'Busy professionals aged 25-45 who want to lose weight and build muscle but struggle with time constraints and motivation',
        mainGoal: 'Help people achieve their fitness goals through structured workouts and nutrition plans',
        pricePoint: '$297'
      },
      business: {
        name: 'Business Growth Accelerator',
        productName: 'Entrepreneur Success System',
        targetAudience: 'Small business owners and entrepreneurs looking to scale their business and increase revenue',
        mainGoal: 'Provide actionable strategies for business growth and sustainable success',
        pricePoint: '$997'
      },
      marketing: {
        name: 'Digital Marketing Mastery',
        productName: 'Complete Marketing Blueprint',
        targetAudience: 'Marketing professionals and business owners who want to master digital marketing strategies',
        mainGoal: 'Teach effective digital marketing techniques that drive traffic and conversions',
        pricePoint: '$497'
      },
      ecommerce: {
        name: 'E-commerce Empire Builder',
        productName: 'Dropshipping Success Formula',
        targetAudience: 'Aspiring e-commerce entrepreneurs who want to build profitable online stores',
        mainGoal: 'Guide students through building and scaling successful e-commerce businesses',
        pricePoint: '$697'
      }
    };
    
    return templates[randomIndustry];
  };

  const generateFunnelName = (prompt: string) => {
    const names = [
      'Ultimate Success Blueprint',
      'Transform Your Life Today',
      'Master Class Academy',
      'Elite Performance System',
      'Revolutionary Method',
      'Complete Success Formula'
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateTargetAudience = (prompt: string) => {
    const audiences = [
      'Professionals aged 25-45 who want to improve their skills and advance their careers',
      'Entrepreneurs and business owners looking to scale their ventures',
      'Individuals seeking personal transformation and growth',
      'Students and lifelong learners wanting to master new skills'
    ];
    return audiences[Math.floor(Math.random() * audiences.length)];
  };

  const generatePricePoint = (prompt: string) => {
    const prices = ['$197', '$297', '$497', '$697', '$997'];
    return prices[Math.floor(Math.random() * prices.length)];
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        
        toast({
          title: "Image Uploaded",
          description: "AI is analyzing your image to create a matching design...",
        });
        
        // Simulate AI image analysis
        setTimeout(() => {
          const updatedContent = {
            ...currentContent,
            images: [imageData],
            colors: generateColorScheme("modern professional")
          };
          
          onContentUpdate(updatedContent);
          
          toast({
            title: "Design Updated",
            description: "Your page design has been updated to match the uploaded image",
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>AI Page Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Suggestions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Quick Improvements</h4>
          <div className="flex flex-wrap gap-2">
            {(aiSuggestions[pageType as keyof typeof aiSuggestions] || aiSuggestions.landing).map((suggestion, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                onClick={() => processAIRequest(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Prompt Input */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Tell AI what to change</h4>
          <div className="flex space-x-2">
            <Textarea
              placeholder="e.g., 'Make the headline more exciting' or 'Change colors to blue theme' or 'Add more urgency to the copy'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => processAIRequest(prompt)}
              disabled={!prompt.trim() || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  AI is working...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Apply AI Changes
                </>
              )}
            </Button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              title="Upload image for AI to match design"
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => processAIRequest("improve headline to be more compelling")}
          >
            <Type className="w-4 h-4 mr-1" />
            Fix Text
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => processAIRequest("update colors to modern professional theme")}
          >
            <Palette className="w-4 h-4 mr-1" />
            Fix Colors
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => processAIRequest("optimize for better conversions")}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Optimize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
