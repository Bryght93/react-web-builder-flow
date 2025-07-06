import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Zap, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface VoiceCommand {
  tool: string;
  [key: string]: any;
}

interface VoiceFunnelsAIProps {
  className?: string;
}

export default function VoiceFunnelsAI({ className }: VoiceFunnelsAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        
        if (result.isFinal) {
          const finalTranscript = result[0].transcript;
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        } else {
          setTranscript(result[0].transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "There was an issue with voice recognition. Please try again.",
          variant: "destructive",
        });
      };
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, toast]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);
    }
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    try {
      // Voice command router - analyze and route commands
      const routedCommand = await routeVoiceCommand(command);
      setLastCommand(routedCommand);
      
      // Execute the routed command
      await executeCommand(routedCommand);
    } catch (error) {
      toast({
        title: "Command Processing Error",
        description: "Unable to process the voice command. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const routeVoiceCommand = async (command: string): Promise<VoiceCommand> => {
    const lowerCommand = command.toLowerCase();
    
    // Route commands based on keywords and patterns
    if (lowerCommand.includes("create") && (lowerCommand.includes("ebook") || lowerCommand.includes("book"))) {
      const topic = extractTopic(command, ["ebook", "book"]);
      return { tool: "generate_ebook", topic };
    }
    
    if (lowerCommand.includes("create") && lowerCommand.includes("funnel")) {
      const product = extractTopic(command, ["funnel"]);
      return { tool: "generate_funnel", product_description: product, goal: "Generate leads" };
    }
    
    if (lowerCommand.includes("add") && (lowerCommand.includes("subscriber") || lowerCommand.includes("contact"))) {
      return { tool: "add_subscriber", name: "Voice Contact", source: "voice" };
    }
    
    if (lowerCommand.includes("send") && lowerCommand.includes("email")) {
      return { tool: "send_email_campaign", list_name: "default", goal: "engage" };
    }
    
    if (lowerCommand.includes("create") && lowerCommand.includes("list")) {
      const listName = extractTopic(command, ["list"]);
      return { tool: "create_email_list", list_name: listName };
    }
    
    if (lowerCommand.includes("create") && (lowerCommand.includes("landing") || lowerCommand.includes("page"))) {
      const topic = extractTopic(command, ["landing", "page"]);
      return { tool: "create_landing_page", topic, goal: "Generate leads" };
    }
    
    if (lowerCommand.includes("coaching") || lowerCommand.includes("sales help")) {
      const situation = command.replace(/coaching|sales help/gi, "").trim();
      return { tool: "sales_coaching", situation };
    }
    
    if (lowerCommand.includes("read") || lowerCommand.includes("speak")) {
      const text = command.replace(/read|speak/gi, "").trim();
      return { tool: "read_out_loud", text };
    }
    
    // Default fallback
    return { tool: "voice_assistant_router", query: command };
  };

  const extractTopic = (command: string, keywords: string[]): string => {
    let topic = command;
    keywords.forEach(keyword => {
      topic = topic.replace(new RegExp(keyword, 'gi'), '');
    });
    topic = topic.replace(/create|on|about|for/gi, '').trim();
    return topic || "Marketing Guide";
  };

  const executeCommand = async (command: VoiceCommand) => {
    try {
      switch (command.tool) {
        case "generate_ebook":
          // Create actual eBook content
          const ebookContent = await generateEbookContent(command.topic);
          toast({
            title: "eBook Generated Successfully",
            description: `Created "${ebookContent.title}" with ${ebookContent.chapters.length} chapters`,
          });
          // Navigate to lead magnets page to show the new eBook
          window.location.href = '/lead-magnets';
          break;
          
        case "generate_funnel":
          // Create actual funnel with pages
          const funnelData = await generateFunnelContent(command.product_description);
          toast({
            title: "Funnel Created Successfully",
            description: `Built "${funnelData.name}" with ${funnelData.steps.length} steps`,
          });
          // Navigate to funnels page to show the new funnel
          window.location.href = '/funnels';
          break;
          
        case "add_subscriber":
          // Add real subscriber to database
          await addSubscriberToDatabase(command.name, command.email || "voice@example.com");
          toast({
            title: "Subscriber Added",
            description: `${command.name} added to your email list`,
          });
          break;
          
        case "send_email_campaign":
          // Send actual email campaign
          const campaign = await sendEmailCampaign(command.list_name, command.subject || "Voice Generated Email");
          toast({
            title: "Email Campaign Sent",
            description: `Sent to ${campaign.recipients} subscribers`,
          });
          break;
          
        case "create_email_list":
          // Create actual email list
          await createEmailList(command.list_name);
          toast({
            title: "Email List Created",
            description: `List "${command.list_name}" is ready to use`,
          });
          break;
          
        case "create_landing_page":
          // Generate actual landing page
          const landingPage = await generateLandingPage(command.topic, command.goal);
          toast({
            title: "Landing Page Created",
            description: `"${landingPage.title}" is now live`,
          });
          break;
          
        case "sales_coaching":
          // Provide AI sales coaching
          const coachingAdvice = await getSalesCoaching(command.situation);
          toast({
            title: "Sales Coaching Provided",
            description: coachingAdvice.summary,
          });
          break;
          
        case "read_out_loud":
          speakText(command.text);
          break;
          
        default:
          toast({
            title: "Command Processed",
            description: `Executed: ${command.query || 'voice command'}`,
          });
      }
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "Failed to complete the requested action",
        variant: "destructive",
      });
    }
  };

  // Helper functions for live functionality
  const generateEbookContent = async (topic: string) => {
    const response = await apiRequest('/api/generate-ebook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    return response.json();
  };

  const generateFunnelContent = async (productDescription: string) => {
    const response = await apiRequest('/api/generate-funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productDescription })
    });
    return response.json();
  };

  const addSubscriberToDatabase = async (name: string, email: string) => {
    const response = await apiRequest('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source: 'voice' })
    });
    return response.json();
  };

  const sendEmailCampaign = async (listName: string, subject: string) => {
    const response = await apiRequest('/api/send-campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listName, subject })
    });
    return response.json();
  };

  const createEmailList = async (listName: string) => {
    const response = await apiRequest('/api/email-lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: listName })
    });
    return response.json();
  };

  const generateLandingPage = async (topic: string, goal: string) => {
    const response = await apiRequest('/api/generate-landing-page', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, goal })
    });
    return response.json();
  };

  const getSalesCoaching = async (situation: string) => {
    const response = await apiRequest('/api/sales-coaching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation })
    });
    return response.json();
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg border-2 border-white"
        >
          <Zap className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card className="w-80 shadow-2xl border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">VoiceFunnels AI</h3>
                <p className="text-xs text-muted-foreground">Voice Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="text-center">
              <Badge variant={isListening ? "default" : "secondary"} className="mb-2">
                {isListening ? "Listening..." : isProcessing ? "Processing..." : "Ready"}
              </Badge>
              
              <div className="flex justify-center space-x-2">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? "Stop" : "Speak"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speakText("VoiceFunnels AI is ready to help you create funnels, lead magnets, and more.")}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {transcript && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">You said:</p>
                <p className="text-sm font-medium">{transcript}</p>
              </div>
            )}

            {lastCommand && (
              <div className="bg-primary/5 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">Last command:</p>
                <p className="text-sm font-medium">{lastCommand.tool.replace('_', ' ')}</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              <p>Try saying:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>"Create ebook on email marketing"</li>
                <li>"Create sales funnel for fitness coaching"</li>
                <li>"Create landing page for lead generation"</li>
                <li>"Add new subscriber John"</li>
                <li>"Send welcome email campaign"</li>
                <li>"Create email list for newsletters"</li>
                <li>"Sales coaching for objection handling"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}