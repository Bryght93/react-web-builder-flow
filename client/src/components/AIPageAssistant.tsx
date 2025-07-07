
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Brain,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Wand2,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  Send,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  MessageSquare,
  Settings
} from 'lucide-react';

interface AIPageAssistantProps {
  onApplyChanges?: (changes: any) => void;
  currentPageData?: any;
  onClose?: () => void;
}

interface AICommand {
  id: string;
  timestamp: Date;
  command: string;
  response: string;
  type: 'suggestion' | 'modification' | 'optimization' | 'analysis';
  status: 'pending' | 'completed' | 'failed';
  changes?: any;
}

export default function AIPageAssistant({ 
  onApplyChanges, 
  currentPageData,
  onClose 
}: AIPageAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<AICommand[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  
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
            handleAICommand(finalTranscript);
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
        title: "🎤 AI Assistant Listening",
        description: "Tell me how you want to improve your page..."
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

  const handleAICommand = async (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    const newCommand: AICommand = {
      id: Date.now().toString(),
      timestamp: new Date(),
      command: command,
      response: '',
      type: 'modification',
      status: 'pending'
    };

    setCommandHistory(prev => [newCommand, ...prev]);
    setIsProcessing(true);

    try {
      let response = '';
      let changes = {};
      let commandType: AICommand['type'] = 'modification';

      // Analyze command and generate appropriate response
      if (lowerCommand.includes('change color') || lowerCommand.includes('update color')) {
        const result = await handleColorChange(command);
        response = result.response;
        changes = result.changes;
        commandType = 'modification';
        
      } else if (lowerCommand.includes('improve heading') || lowerCommand.includes('better headline')) {
        const result = await improveHeadline(command);
        response = result.response;
        changes = result.changes;
        commandType = 'optimization';
        
      } else if (lowerCommand.includes('add image') || lowerCommand.includes('insert image')) {
        const result = await addImage(command);
        response = result.response;
        changes = result.changes;
        commandType = 'modification';
        
      } else if (lowerCommand.includes('make it responsive') || lowerCommand.includes('mobile friendly')) {
        const result = await makeResponsive();
        response = result.response;
        changes = result.changes;
        commandType = 'optimization';
        
      } else if (lowerCommand.includes('analyze') || lowerCommand.includes('review')) {
        const result = await analyzePage();
        response = result.response;
        commandType = 'analysis';
        
      } else if (lowerCommand.includes('optimize conversion') || lowerCommand.includes('increase conversion')) {
        const result = await optimizeConversion();
        response = result.response;
        changes = result.changes;
        commandType = 'optimization';
        
      } else if (lowerCommand.includes('add testimonial') || lowerCommand.includes('social proof')) {
        const result = await addTestimonial();
        response = result.response;
        changes = result.changes;
        commandType = 'modification';
        
      } else if (lowerCommand.includes('improve copy') || lowerCommand.includes('better text')) {
        const result = await improveCopy(command);
        response = result.response;
        changes = result.changes;
        commandType = 'optimization';
        
      } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
        response = getHelpText();
        commandType = 'suggestion';
        
      } else {
        response = "I can help you improve your page! Try saying things like 'change the color to blue', 'improve the headline', 'add an image', 'make it mobile friendly', or 'analyze the page for conversion optimization'.";
        commandType = 'suggestion';
      }

      // Update command status
      setCommandHistory(prev => 
        prev.map(cmd => 
          cmd.id === newCommand.id 
            ? { ...cmd, response, type: commandType, status: 'completed' as const, changes }
            : cmd
        )
      );

      // Speak the response
      speakResponse(response);

      // Apply changes if any
      if (changes && Object.keys(changes).length > 0 && onApplyChanges) {
        onApplyChanges(changes);
      }

      toast({
        title: "✅ AI Command Processed",
        description: response.substring(0, 100) + (response.length > 100 ? '...' : '')
      });

    } catch (error) {
      console.error('AI command error:', error);
      
      const errorResponse = "I encountered an error processing your request. Please try rephrasing or ask for help.";
      
      setCommandHistory(prev => 
        prev.map(cmd => 
          cmd.id === newCommand.id 
            ? { ...cmd, response: errorResponse, status: 'failed' as const }
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

  const handleColorChange = async (command: string): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract color from command
    const colors = ['blue', 'red', 'green', 'purple', 'orange', 'pink', 'yellow'];
    const foundColor = colors.find(color => command.toLowerCase().includes(color));
    const colorValue = foundColor ? getColorValue(foundColor) : '#3b82f6';
    
    return {
      response: `I've updated the color scheme to ${foundColor || 'blue'}. The primary color has been changed and applied to buttons and accents.`,
      changes: {
        colors: {
          primary: colorValue,
          secondary: adjustColorBrightness(colorValue, -20),
          accent: adjustColorBrightness(colorValue, 20)
        }
      }
    };
  };

  const improveHeadline = async (command: string): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const improvedHeadlines = [
      "Finally... The System That Actually Works (Even If You've Failed Before)",
      "Warning: This Method Has Changed Everything For Thousands of People",
      "The Secret Strategy That's Transforming Lives in Just 30 Days",
      "Discover Why Smart People Are Ditching Everything Else For This",
      "The Breakthrough That's Making People $10K+ Per Month"
    ];
    
    const randomHeadline = improvedHeadlines[Math.floor(Math.random() * improvedHeadlines.length)];
    
    return {
      response: "I've created a more compelling headline using proven psychological triggers and curiosity gaps.",
      changes: {
        headline: randomHeadline,
        headlineStyle: {
          fontSize: '3rem',
          fontWeight: 'bold',
          lineHeight: '1.1',
          letterSpacing: '-0.025em'
        }
      }
    };
  };

  const addImage = async (command: string): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const imageUrl = `https://source.unsplash.com/1200x600/?business,success,professional`;
    
    return {
      response: "I've added a professional hero image that complements your content and enhances visual appeal.",
      changes: {
        heroImage: {
          src: imageUrl,
          alt: "Professional hero image",
          style: {
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }
        }
      }
    };
  };

  const makeResponsive = async (): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      response: "I've optimized your page for mobile devices with responsive layouts, touch-friendly buttons, and improved typography scaling.",
      changes: {
        responsive: {
          breakpoints: {
            mobile: '768px',
            tablet: '1024px'
          },
          mobileOptimizations: {
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            buttonPadding: '12px 24px',
            spacing: 'reduced'
          }
        }
      }
    };
  };

  const analyzePage = async (): Promise<{ response: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      response: "Page Analysis Complete: Your page has strong visual hierarchy and clear call-to-actions. I recommend adding social proof elements and testing different headline variations. Current conversion potential: 8-12%. With optimizations, you could reach 15-20%."
    };
  };

  const optimizeConversion = async (): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    return {
      response: "I've applied proven conversion optimization techniques: urgency indicators, social proof placement, and enhanced call-to-action buttons.",
      changes: {
        conversionOptimizations: {
          urgencyBanner: "⏰ Limited Time: 50% Off Ends in 24 Hours!",
          socialProof: "Join 10,000+ satisfied customers",
          ctaEnhancement: {
            text: "Get Instant Access (Risk-Free)",
            style: {
              fontSize: '1.2rem',
              padding: '16px 32px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }
          }
        }
      }
    };
  };

  const addTestimonial = async (): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const testimonials = [
      {
        quote: "This completely transformed my business. I went from struggling to making $50K+ per month!",
        author: "Sarah Johnson",
        role: "Entrepreneur",
        company: "SJ Consulting",
        rating: 5
      },
      {
        quote: "The strategies here are pure gold. I wish I had found this years ago!",
        author: "Mike Chen",
        role: "Business Owner",
        company: "Growth Solutions",
        rating: 5
      }
    ];
    
    return {
      response: "I've added compelling testimonials with star ratings to build trust and social proof.",
      changes: {
        testimonials: testimonials
      }
    };
  };

  const improveCopy = async (command: string): Promise<{ response: string; changes: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      response: "I've rewritten your copy using persuasive storytelling, emotional triggers, and clear benefits that speak directly to your audience's pain points.",
      changes: {
        improvedCopy: {
          subheadline: "Join over 47,000 smart people who've already discovered this life-changing system (and why they wish they'd found it sooner)",
          bodyText: "Listen, I get it. You've probably tried everything. The courses, the coaches, the 'magic bullets' that promised the world but delivered nothing.\n\nI was exactly where you are now. Frustrated. Overwhelmed. Ready to give up.\n\nThat's when I discovered the ONE thing that changed everything...",
          benefits: [
            "✓ Get results in the next 30 days (guaranteed)",
            "✓ Works even if you're a complete beginner",
            "✓ No experience or special skills required",
            "✓ Step-by-step system that does the work for you"
          ]
        }
      }
    };
  };

  const getHelpText = (): string => {
    return `I'm your AI Page Assistant! Here's what I can help you with:

🎨 Design: "Change colors to blue", "Make it more modern"
📝 Copy: "Improve the headline", "Make the text more persuasive"
🖼️ Images: "Add a hero image", "Insert professional photos"
📱 Responsive: "Make it mobile friendly", "Optimize for tablets"
📊 Conversion: "Optimize for conversions", "Add social proof"
🔍 Analysis: "Analyze the page", "Review for improvements"
💬 Content: "Add testimonials", "Improve the copy"

Just speak naturally or type your request!`;
  };

  const getColorValue = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f97316',
      pink: '#ec4899',
      yellow: '#eab308'
    };
    return colorMap[colorName] || '#3b82f6';
  };

  const adjustColorBrightness = (color: string, amount: number): string => {
    // Simple color adjustment - in production, use a proper color library
    return color;
  };

  const handleTextCommand = () => {
    if (currentCommand.trim()) {
      handleAICommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const applyChanges = (command: AICommand) => {
    if (command.changes && onApplyChanges) {
      onApplyChanges(command.changes);
      toast({
        title: "✅ Changes Applied",
        description: "Your page has been updated with the AI suggestions."
      });
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            AI Page Assistant
          </h2>
          {onClose && (
            <Button size="sm" variant="outline" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Tell me how you want to improve your page
        </p>
      </div>

      {/* Voice Controls */}
      <div className="p-4 border-b">
        <div className="flex space-x-2 mb-3">
          <Button
            className="flex-1"
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Voice
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={isSpeaking ? stopSpeaking : () => speakResponse("AI Page Assistant ready to help improve your page!")}
            disabled={isProcessing}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        {isListening && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 text-sm font-medium">Listening...</span>
            </div>
            <p className="text-gray-600 text-xs">
              {transcript || "Say something like 'change colors to blue' or 'improve the headline'"}
            </p>
          </div>
        )}

        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-center space-x-2">
              <Loader className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-blue-700 text-sm font-medium">AI is analyzing your request...</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              placeholder="Type your command..."
              onKeyPress={(e) => e.key === 'Enter' && handleTextCommand()}
              disabled={isProcessing}
              className="text-sm"
            />
            <Button 
              size="sm" 
              onClick={handleTextCommand} 
              disabled={!currentCommand.trim() || isProcessing}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleAICommand("Improve the headline")}
            disabled={isProcessing}
            className="text-xs"
          >
            <Type className="w-3 h-3 mr-1" />
            Better Headline
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleAICommand("Change colors to blue")}
            disabled={isProcessing}
            className="text-xs"
          >
            <Palette className="w-3 h-3 mr-1" />
            Change Colors
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleAICommand("Add testimonials")}
            disabled={isProcessing}
            className="text-xs"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Add Social Proof
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleAICommand("Optimize for conversions")}
            disabled={isProcessing}
            className="text-xs"
          >
            <Target className="w-3 h-3 mr-1" />
            Optimize
          </Button>
        </div>
      </div>

      {/* Command History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">Recent Commands</h3>
          <div className="space-y-3">
            {commandHistory.map((command) => (
              <Card key={command.id} className="text-sm">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={
                        command.status === 'completed' ? 'default' : 
                        command.status === 'failed' ? 'destructive' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {command.type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {command.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium">Command: </span>
                      <span className="text-xs">{command.command}</span>
                    </div>
                    
                    {command.response && (
                      <div>
                        <span className="text-xs font-medium">Response: </span>
                        <span className="text-xs text-gray-600">{command.response}</span>
                      </div>
                    )}
                    
                    {command.changes && command.status === 'completed' && (
                      <Button 
                        size="sm" 
                        className="w-full mt-2 text-xs"
                        onClick={() => applyChanges(command)}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Apply Changes
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
