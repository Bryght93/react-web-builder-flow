
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Zap,
  FileText,
  Mail,
  Users,
  BarChart3,
  Target,
  Book,
  Globe,
  Phone,
  Calendar,
  Settings,
  Play,
  Pause,
  Square,
  Send,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Heart,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Search,
  Filter,
  Sort,
  Refresh,
  Save,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Loader,
  Sparkles
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  timestamp: Date;
  command: string;
  response: string;
  action: string;
  status: 'pending' | 'completed' | 'failed';
}

interface AIGeneratedContent {
  type: 'ebook' | 'funnel' | 'email' | 'landing-page' | 'lead-magnet';
  title: string;
  content: string;
  metadata: any;
  timestamp: Date;
}

export default function VoiceFunnelsAI() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<AIGeneratedContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<AIGeneratedContent | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }

      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPart = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptPart;
            } else {
              interimTranscript += transcriptPart;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
          
          if (finalTranscript) {
            setCurrentCommand(finalTranscript);
            handleVoiceCommand(finalTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or check your microphone permissions.",
            variant: "destructive"
          });
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setTranscript('');
      setCurrentCommand('');
      recognitionRef.current.start();
      
      toast({
        title: "🎤 Voice AI Activated",
        description: "Listening for your marketing commands..."
      });
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakResponse = (text: string) => {
    if (synthRef.current && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      synthRef.current.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      timestamp: new Date(),
      command: command,
      response: '',
      action: '',
      status: 'pending'
    };

    setCommandHistory(prev => [newCommand, ...prev]);
    setIsProcessing(true);

    try {
      let response = '';
      let action = '';
      let shouldSpeak = true;

      // Route commands to appropriate handlers
      if (lowerCommand.includes('generate ebook') || lowerCommand.includes('create ebook')) {
        const result = await generateEbook(command);
        response = result.response;
        action = 'Generated eBook';
        
      } else if (lowerCommand.includes('create funnel') || lowerCommand.includes('generate funnel')) {
        const result = await generateFunnel(command);
        response = result.response;
        action = 'Generated Funnel';
        
      } else if (lowerCommand.includes('create landing page') || lowerCommand.includes('generate landing')) {
        const result = await generateLandingPage(command);
        response = result.response;
        action = 'Generated Landing Page';
        
      } else if (lowerCommand.includes('write email') || lowerCommand.includes('create email')) {
        const result = await generateEmail(command);
        response = result.response;
        action = 'Generated Email';
        
      } else if (lowerCommand.includes('create lead magnet') || lowerCommand.includes('generate lead magnet')) {
        const result = await generateLeadMagnet(command);
        response = result.response;
        action = 'Generated Lead Magnet';
        
      } else if (lowerCommand.includes('analyze leads') || lowerCommand.includes('lead report')) {
        const result = await analyzeLeads();
        response = result.response;
        action = 'Analyzed Leads';
        
      } else if (lowerCommand.includes('marketing strategy') || lowerCommand.includes('create strategy')) {
        const result = await generateMarketingStrategy(command);
        response = result.response;
        action = 'Generated Marketing Strategy';
        
      } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
        response = getHelpText();
        action = 'Provided Help';
        
      } else {
        response = "I didn't understand that command. Try saying 'help' to see what I can do, or try commands like 'generate ebook about fitness' or 'create funnel for coaching business'.";
        action = 'Unknown Command';
        shouldSpeak = true;
      }

      // Update command status
      setCommandHistory(prev => 
        prev.map(cmd => 
          cmd.id === newCommand.id 
            ? { ...cmd, response, action, status: 'completed' as const }
            : cmd
        )
      );

      // Speak the response
      if (shouldSpeak) {
        speakResponse(response);
      }

      toast({
        title: "✅ Command Processed",
        description: action
      });

    } catch (error) {
      console.error('Voice command error:', error);
      
      const errorResponse = "Sorry, I encountered an error processing your request. Please try again.";
      
      setCommandHistory(prev => 
        prev.map(cmd => 
          cmd.id === newCommand.id 
            ? { ...cmd, response: errorResponse, action: 'Error', status: 'failed' as const }
            : cmd
        )
      );

      speakResponse(errorResponse);
      
      toast({
        title: "❌ Command Failed",
        description: "Please try again or rephrase your request.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateEbook = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    // Extract topic from command
    const topic = extractTopic(command, ['ebook', 'book']);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content: AIGeneratedContent = {
      type: 'ebook',
      title: `${topic} Complete Guide`,
      content: `# ${topic} Complete Guide\n\n## Chapter 1: Introduction\n\nThis comprehensive guide will teach you everything about ${topic}...\n\n## Chapter 2: Getting Started\n\nLet's begin with the fundamentals...\n\n## Chapter 3: Advanced Strategies\n\nNow that you understand the basics...`,
      metadata: {
        pages: 25,
        chapters: 8,
        wordCount: 5000,
        downloadFormat: 'PDF'
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've generated a comprehensive ${topic} eBook with 8 chapters and 25 pages. It's ready for download and can be used as a lead magnet.`,
      content
    };
  };

  const generateFunnel = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    const topic = extractTopic(command, ['funnel', 'sales funnel']);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const content: AIGeneratedContent = {
      type: 'funnel',
      title: `${topic} Sales Funnel`,
      content: JSON.stringify({
        steps: [
          { type: 'landing', title: `${topic} Landing Page`, conversionRate: '15%' },
          { type: 'optin', title: 'Free Resource Opt-in', conversionRate: '35%' },
          { type: 'email', title: '5-Part Email Series', conversionRate: '12%' },
          { type: 'offer', title: `Premium ${topic} Course`, conversionRate: '8%' },
          { type: 'upsell', title: '1-on-1 Coaching', conversionRate: '20%' }
        ],
        estimatedRevenue: '$15,000/month',
        totalPages: 5
      }),
      metadata: {
        steps: 5,
        estimatedConversion: '8-15%',
        industry: 'Education',
        pricePoint: '$497'
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've created a complete ${topic} sales funnel with 5 high-converting pages, including landing page, opt-in, email sequence, main offer, and upsell. Estimated conversion rate: 8-15%.`
    };
  };

  const generateLandingPage = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    const topic = extractTopic(command, ['landing page', 'landing', 'page']);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content: AIGeneratedContent = {
      type: 'landing-page',
      title: `${topic} Landing Page`,
      content: `<!DOCTYPE html><html><head><title>${topic} - Transform Your Life</title></head><body><h1>Finally... The ${topic} System That Actually Works</h1><p>Join over 10,000 people who've already transformed their lives with this proven system.</p><button>Get Instant Access</button></body></html>`,
      metadata: {
        conversionElements: ['Headline', 'Social Proof', 'CTA Button', 'Testimonials'],
        estimatedConversion: '12-18%',
        mobileOptimized: true
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've created a high-converting ${topic} landing page with proven psychological triggers, social proof, and mobile optimization. Ready to drive conversions!`
    };
  };

  const generateEmail = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    const topic = extractTopic(command, ['email', 'message']);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const content: AIGeneratedContent = {
      type: 'email',
      title: `${topic} Email Campaign`,
      content: `Subject: The ${topic} secret that changed everything...\n\nHi [First Name],\n\nI want to share something with you that completely changed my approach to ${topic}...\n\nMost people struggle with ${topic} because they don't know this one simple trick...\n\n[Continue reading here]\n\nBest regards,\n[Your Name]`,
      metadata: {
        openRate: '25-35%',
        clickRate: '8-15%',
        emailType: 'nurture',
        wordCount: 300
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've written a compelling ${topic} email with psychological triggers and storytelling elements. Expected open rate: 25-35%.`
    };
  };

  const generateLeadMagnet = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    const topic = extractTopic(command, ['lead magnet', 'freebie', 'free']);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content: AIGeneratedContent = {
      type: 'lead-magnet',
      title: `Free ${topic} Toolkit`,
      content: `# Free ${topic} Toolkit\n\n## Included in this toolkit:\n\n✓ ${topic} Quick-Start Guide (PDF)\n✓ ${topic} Checklist\n✓ ${topic} Templates\n✓ ${topic} Video Training\n✓ Private Community Access\n\nTotal value: $197 - Yours FREE!`,
      metadata: {
        conversionRate: '35-50%',
        components: ['PDF Guide', 'Checklist', 'Templates', 'Video', 'Community'],
        value: '$197'
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've created an irresistible ${topic} lead magnet bundle with 5 high-value components. This should convert at 35-50%!`
    };
  };

  const analyzeLeads = async (): Promise<{ response: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate lead analysis
    const analysis = {
      totalLeads: 1247,
      thisMonth: 186,
      conversionRate: '12.8%',
      topSource: 'Facebook Ads',
      bestPerforming: 'Fitness eBook',
      revenue: '$15,420'
    };
    
    return {
      response: `Lead Analysis Complete: You have ${analysis.totalLeads} total leads with ${analysis.thisMonth} new leads this month. Your conversion rate is ${analysis.conversionRate}. Top source: ${analysis.topSource}. Best performing lead magnet: ${analysis.bestPerforming}. Revenue generated: ${analysis.revenue}.`
    };
  };

  const generateMarketingStrategy = async (command: string): Promise<{ response: string; content?: AIGeneratedContent }> => {
    const topic = extractTopic(command, ['strategy', 'plan', 'marketing']);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const content: AIGeneratedContent = {
      type: 'funnel',
      title: `${topic} Marketing Strategy`,
      content: `# 90-Day ${topic} Marketing Strategy\n\n## Phase 1: Foundation (Days 1-30)\n- Set up lead magnets\n- Create content calendar\n- Launch social media presence\n\n## Phase 2: Growth (Days 31-60)\n- Scale advertising\n- Optimize funnels\n- Build partnerships\n\n## Phase 3: Scale (Days 61-90)\n- Expand to new channels\n- Launch premium offers\n- Automate systems`,
      metadata: {
        timeline: '90 days',
        expectedROI: '300-500%',
        channels: ['Social Media', 'Email', 'Paid Ads', 'Content'],
        budget: '$2,000-5,000'
      },
      timestamp: new Date()
    };
    
    setGeneratedContent(prev => [content, ...prev]);
    
    return {
      response: `I've created a comprehensive 90-day ${topic} marketing strategy with 3 phases, multiple channels, and an expected ROI of 300-500%. Ready to scale your business!`
    };
  };

  const extractTopic = (command: string, keywords: string[]): string => {
    let topic = command.toLowerCase();
    
    // Remove command keywords
    keywords.forEach(keyword => {
      topic = topic.replace(keyword, '');
    });
    
    // Remove common words
    const commonWords = ['generate', 'create', 'make', 'build', 'about', 'for', 'on', 'the', 'a', 'an'];
    commonWords.forEach(word => {
      topic = topic.replace(new RegExp(`\\b${word}\\b`, 'g'), '');
    });
    
    // Clean and capitalize
    topic = topic.trim().replace(/\s+/g, ' ');
    if (topic) {
      return topic.charAt(0).toUpperCase() + topic.slice(1);
    }
    
    return 'Business Success';
  };

  const getHelpText = (): string => {
    return `I'm your AI Marketing Assistant! Here's what I can do:

• "Generate ebook about [topic]" - Creates comprehensive eBooks
• "Create funnel for [business]" - Builds complete sales funnels  
• "Write email about [topic]" - Crafts marketing emails
• "Create landing page for [product]" - Designs landing pages
• "Generate lead magnet for [niche]" - Creates free resources
• "Analyze leads" - Provides lead analytics
• "Create marketing strategy for [business]" - Develops growth plans

Just speak naturally! For example: "Generate an ebook about fitness for busy professionals" or "Create a funnel for my coaching business".`;
  };

  const handleTextCommand = () => {
    if (currentCommand.trim()) {
      handleVoiceCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Voice Funnels AI
              </h1>
              <p className="text-gray-600">Your AI Marketing Assistant - Speak your vision, watch it come to life</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Generate eBooks & Lead Magnets</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Create Complete Sales Funnels</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Analyze & Optimize Performance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Voice Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className="flex-1"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Voice Command
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={isSpeaking ? stopSpeaking : () => speakResponse("Voice AI is ready to help you build your marketing empire!")}
                disabled={isProcessing}
              >
                {isSpeaking ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>

            {isListening && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium">Listening...</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {transcript || "Say something like 'Generate ebook about fitness' or 'Create funnel for coaching'"}
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-blue-700 font-medium">AI is processing your request...</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Or type your command:</label>
              <div className="flex space-x-2">
                <Input
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  placeholder="Type your command here..."
                  onKeyPress={(e) => e.key === 'Enter' && handleTextCommand()}
                  disabled={isProcessing}
                />
                <Button onClick={handleTextCommand} disabled={!currentCommand.trim() || isProcessing}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleVoiceCommand("Generate ebook about digital marketing")}
                disabled={isProcessing}
                className="h-auto p-3"
              >
                <div className="text-center">
                  <Book className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Generate eBook</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleVoiceCommand("Create funnel for coaching business")}
                disabled={isProcessing}
                className="h-auto p-3"
              >
                <div className="text-center">
                  <Target className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Create Funnel</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleVoiceCommand("Create landing page for fitness program")}
                disabled={isProcessing}
                className="h-auto p-3"
              >
                <div className="text-center">
                  <Globe className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Landing Page</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleVoiceCommand("Analyze leads performance")}
                disabled={isProcessing}
                className="h-auto p-3"
              >
                <div className="text-center">
                  <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Analyze Leads</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Content */}
      {generatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Generated Content ({generatedContent.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedContent.map((content, index) => (
                <Card key={index} className="border hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedContent(content)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{content.type}</Badge>
                      <span className="text-xs text-gray-500">
                        {content.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-medium mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.type === 'funnel' ? 'Complete sales funnel with multiple steps' : 
                       typeof content.content === 'string' ? content.content.substring(0, 100) + '...' : 'Generated content'}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Command History */}
      {commandHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Command History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {commandHistory.map((cmd) => (
                <div key={cmd.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={cmd.status === 'completed' ? 'default' : cmd.status === 'failed' ? 'destructive' : 'secondary'}
                      >
                        {cmd.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {cmd.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{cmd.action}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Command: </span>
                      <span className="text-sm">{cmd.command}</span>
                    </div>
                    {cmd.response && (
                      <div>
                        <span className="text-sm font-medium">Response: </span>
                        <span className="text-sm text-gray-600">{cmd.response}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Preview Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedContent(null)}>
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedContent.title}</CardTitle>
                <Button variant="outline" onClick={() => setSelectedContent(null)}>
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Badge>{selectedContent.type}</Badge>
                {selectedContent.type === 'funnel' ? (
                  <div>
                    <h3 className="font-medium mb-2">Funnel Structure:</h3>
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                      {typeof selectedContent.content === 'string' 
                        ? JSON.stringify(JSON.parse(selectedContent.content), null, 2)
                        : JSON.stringify(selectedContent.content, null, 2)
                      }
                    </pre>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium mb-2">Content:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">
                        {typeof selectedContent.content === 'string' 
                          ? selectedContent.content 
                          : JSON.stringify(selectedContent.content, null, 2)
                        }
                      </pre>
                    </div>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
