import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
      
      speakText(`Command processed: ${routedCommand.tool.replace('_', ' ')}`);
    } catch (error) {
      toast({
        title: "Command Processing Error",
        description: "Unable to process the voice command. Please try again.",
        variant: "destructive",
      });
      speakText("Sorry, I couldn't process that command. Please try again.");
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
    // Simulate command execution
    switch (command.tool) {
      case "generate_ebook":
        toast({
          title: "eBook Creation Started",
          description: `Creating eBook on: ${command.topic}`,
        });
        break;
      case "generate_funnel":
        toast({
          title: "Funnel Creation Started", 
          description: `Building funnel for: ${command.product_description}`,
        });
        break;
      case "add_subscriber":
        toast({
          title: "Subscriber Added",
          description: "New contact added via voice command",
        });
        break;
      case "send_email_campaign":
        toast({
          title: "Email Campaign",
          description: "Preparing email campaign",
        });
        break;
      case "create_email_list":
        toast({
          title: "Email List Created",
          description: `New list: ${command.list_name}`,
        });
        break;
      case "read_out_loud":
        speakText(command.text);
        break;
      default:
        toast({
          title: "Command Recognized",
          description: `Processing: ${command.query || 'voice command'}`,
        });
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-gradient-primary hover:bg-gradient-primary/90 shadow-lg"
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
                <li>"Add new subscriber John"</li>
                <li>"Create sales funnel"</li>
                <li>"Send welcome email"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}