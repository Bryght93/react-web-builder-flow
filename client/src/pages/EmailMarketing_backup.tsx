import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Plus, 
  Send, 
  Users, 
  Target, 
  BarChart3, 
  Settings, 
  Play, 
  Pause, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Zap, 
  Mic, 
  MicOff, 
  Save, 
  Download, 
  Upload, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  Type,
  Image as ImageIcon,
  Sparkles,
  Brain,
  PenTool,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Palette,
  Layout,
  ChevronRight,
  ArrowRight,
  Timer,
  List,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

// Advanced Email Builder Component
const AdvancedEmailBuilder = ({ onSave, onClose, initialTemplate = null }) => {
  const [emailData, setEmailData] = useState({
    subject: initialTemplate?.subject || '',
    preheader: initialTemplate?.preheader || '',
    content: initialTemplate?.content || [],
    settings: {
      width: 600,
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      textColor: '#333333',
      linkColor: '#0066cc'
    }
  });

  const [selectedElement, setSelectedElement] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [previewMode, setPreviewMode] = useState('desktop');
  const recognitionRef = useRef(null);

  // Voice AI Integration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      toast({ title: "🎤 Voice control active", description: "Speak your email editing commands" });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const processVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    
    if (command.includes('add heading') || command.includes('add title')) {
      addElement('heading', { text: 'New Heading', fontSize: '24px', fontWeight: 'bold' });
      toast({ title: "✨ Added heading", description: "Heading element added via voice" });
    } else if (command.includes('add text') || command.includes('add paragraph')) {
      addElement('text', { text: 'Your text content here...', fontSize: '16px' });
      toast({ title: "✨ Added text", description: "Text element added via voice" });
    } else if (command.includes('add button')) {
      addElement('button', { text: 'Click Here', backgroundColor: '#0066cc', textColor: '#ffffff' });
      toast({ title: "✨ Added button", description: "Button element added via voice" });
    } else if (command.includes('add image')) {
      addElement('image', { src: 'https://via.placeholder.com/400x200', alt: 'Email Image' });
      toast({ title: "✨ Added image", description: "Image element added via voice" });
    } else if (command.includes('change background color to')) {
      const color = extractColorFromCommand(command);
      if (color) {
        setEmailData(prev => ({
          ...prev,
          settings: { ...prev.settings, backgroundColor: color }
        }));
        toast({ title: "🎨 Background updated", description: `Changed to ${color}` });
      }
    } else if (command.includes('save email') || command.includes('save template')) {
      handleSave();
    } else if (command.includes('preview')) {
      toast({ title: "👁️ Preview mode", description: "Showing email preview" });
    }
  };

  const extractColorFromCommand = (command: string) => {
    const colorMap = {
      'blue': '#0066cc',
      'red': '#cc0000',
      'green': '#00cc00',
      'black': '#000000',
      'white': '#ffffff',
      'gray': '#888888',
      'grey': '#888888',
      'purple': '#6600cc',
      'orange': '#ff6600',
      'yellow': '#ffcc00'
    };
    
    for (const [color, hex] of Object.entries(colorMap)) {
      if (command.includes(color)) {
        return hex;
      }
    }
    return null;
  };

  const addElement = (type: string, properties: any = {}) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      properties: {
        ...getDefaultProperties(type),
        ...properties
      }
    };
    
    setEmailData(prev => ({
      ...prev,
      content: [...prev.content, newElement]
    }));
  };

  const getDefaultProperties = (type: string) => {
    switch (type) {
      case 'heading':
        return { text: 'Heading Text', fontSize: '24px', fontWeight: 'bold', textAlign: 'left' };
      case 'text':
        return { text: 'Your content here...', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' };
      case 'button':
        return { 
          text: 'Click Here', 
          backgroundColor: '#0066cc', 
          textColor: '#ffffff',
          borderRadius: '5px',
          padding: '12px 24px',
          textAlign: 'center',
          link: '#'
        };
      case 'image':
        return { src: 'https://via.placeholder.com/400x200', alt: 'Email Image', width: '100%' };
      case 'divider':
        return { height: '1px', backgroundColor: '#dddddd', margin: '20px 0' };
      case 'spacer':
        return { height: '20px' };
      default:
        return {};
    }
  };

  const updateElement = (elementId: string, properties: any) => {
    setEmailData(prev => ({
      ...prev,
      content: prev.content.map(element =>
        element.id === elementId
          ? { ...element, properties: { ...element.properties, ...properties } }
          : element
      )
    }));
  };

  const deleteElement = (elementId: string) => {
    setEmailData(prev => ({
      ...prev,
      content: prev.content.filter(element => element.id !== elementId)
    }));
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    setEmailData(prev => {
      const content = [...prev.content];
      const index = content.findIndex(el => el.id === elementId);
      if (index === -1) return prev;

      if (direction === 'up' && index > 0) {
        [content[index], content[index - 1]] = [content[index - 1], content[index]];
      } else if (direction === 'down' && index < content.length - 1) {
        [content[index], content[index + 1]] = [content[index + 1], content[index]];
      }

      return { ...prev, content };
    });
  };

  const handleSave = () => {
    onSave(emailData);
    toast({ title: "💾 Email saved", description: "Your email template has been saved successfully" });
  };

  const generatePreviewHTML = () => {
    const { settings, content } = emailData;
    
    const elementsHTML = content.map(element => {
      switch (element.type) {
        case 'heading':
          return `
            <h2 style="
              font-size: ${element.properties.fontSize};
              font-weight: ${element.properties.fontWeight};
              text-align: ${element.properties.textAlign};
              color: ${settings.textColor};
              margin: 20px 0 10px 0;
              font-family: ${settings.fontFamily};
            ">${element.properties.text}</h2>
          `;
        case 'text':
          return `
            <p style="
              font-size: ${element.properties.fontSize};
              line-height: ${element.properties.lineHeight};
              text-align: ${element.properties.textAlign};
              color: ${settings.textColor};
              margin: 10px 0;
              font-family: ${settings.fontFamily};
            ">${element.properties.text}</p>
          `;
        case 'button':
          return `
            <div style="text-align: ${element.properties.textAlign}; margin: 20px 0;">
              <a href="${element.properties.link}" style="
                display: inline-block;
                background-color: ${element.properties.backgroundColor};
                color: ${element.properties.textColor};
                padding: ${element.properties.padding};
                border-radius: ${element.properties.borderRadius};
                text-decoration: none;
                font-family: ${settings.fontFamily};
                font-weight: bold;
              ">${element.properties.text}</a>
            </div>
          `;
        case 'image':
          return `
            <div style="text-align: center; margin: 20px 0;">
              <img src="${element.properties.src}" alt="${element.properties.alt}" style="
                width: ${element.properties.width};
                max-width: 100%;
                height: auto;
                border-radius: 5px;
              ">
            </div>
          `;
        case 'divider':
          return `
            <hr style="
              height: ${element.properties.height};
              background-color: ${element.properties.backgroundColor};
              border: none;
              margin: ${element.properties.margin};
            ">
          `;
        case 'spacer':
          return `<div style="height: ${element.properties.height};"></div>`;
        default:
          return '';
      }
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailData.subject}</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: ${settings.fontFamily};">
        <div style="
          max-width: ${settings.width}px;
          margin: 0 auto;
          background-color: ${settings.backgroundColor};
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
          ${elementsHTML}
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onClose}>
              ← Back
            </Button>
            <h1 className="text-xl font-semibold">Advanced Email Builder</h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              AI-Powered
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="sm"
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? "Stop" : "Voice"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}>
              {previewMode === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-600">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Element Library */}
          <div className="w-80 border-r bg-muted/30 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Email Details</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Subject line..."
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  />
                  <Input
                    placeholder="Preheader text..."
                    value={emailData.preheader}
                    onChange={(e) => setEmailData(prev => ({ ...prev, preheader: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-3 block">Add Elements</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'heading', icon: Type, label: 'Heading' },
                    { type: 'text', icon: AlignLeft, label: 'Text' },
                    { type: 'button', icon: Layout, label: 'Button' },
                    { type: 'image', icon: ImageIcon, label: 'Image' },
                    { type: 'divider', icon: Layers, label: 'Divider' },
                    { type: 'spacer', icon: Layout, label: 'Spacer' }
                  ].map(({ type, icon: Icon, label }) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center space-y-1"
                      onClick={() => addElement(type)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Element Properties Panel */}
              {selectedElement && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Element Properties</Label>
                  <div className="space-y-3">
                    {selectedElement.type === 'heading' && (
                      <>
                        <div>
                          <Label className="text-xs">Text</Label>
                          <Input
                            value={selectedElement.properties.text}
                            onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Font Size</Label>
                          <Select
                            value={selectedElement.properties.fontSize}
                            onValueChange={(value) => updateElement(selectedElement.id, { fontSize: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20px">20px</SelectItem>
                              <SelectItem value="24px">24px</SelectItem>
                              <SelectItem value="28px">28px</SelectItem>
                              <SelectItem value="32px">32px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {selectedElement.type === 'button' && (
                      <>
                        <div>
                          <Label className="text-xs">Button Text</Label>
                          <Input
                            value={selectedElement.properties.text}
                            onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Link URL</Label>
                          <Input
                            value={selectedElement.properties.link}
                            onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Background Color</Label>
                          <Input
                            type="color"
                            value={selectedElement.properties.backgroundColor}
                            onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                          />
                        </div>
                      </>
                    )}

                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveElement(selectedElement.id, 'up')}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveElement(selectedElement.id, 'down')}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteElement(selectedElement.id);
                          setSelectedElement(null);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            <div className="mx-auto" style={{ width: previewMode === 'desktop' ? '600px' : '320px' }}>
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundColor: emailData.settings.backgroundColor }}
              >
                <div className="p-6">
                  {emailData.content.map((element) => (
                    <div
                      key={element.id}
                      className={`cursor-pointer relative group ${
                        selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedElement(element)}
                    >
                      {element.type === 'heading' && (
                        <h2
                          style={{
                            fontSize: element.properties.fontSize,
                            fontWeight: element.properties.fontWeight,
                            textAlign: element.properties.textAlign,
                            color: emailData.settings.textColor,
                            margin: '20px 0 10px 0',
                            fontFamily: emailData.settings.fontFamily
                          }}
                        >
                          {element.properties.text}
                        </h2>
                      )}

                      {element.type === 'text' && (
                        <p
                          style={{
                            fontSize: element.properties.fontSize,
                            lineHeight: element.properties.lineHeight,
                            textAlign: element.properties.textAlign,
                            color: emailData.settings.textColor,
                            margin: '10px 0',
                            fontFamily: emailData.settings.fontFamily
                          }}
                        >
                          {element.properties.text}
                        </p>
                      )}

                      {element.type === 'button' && (
                        <div style={{ textAlign: element.properties.textAlign, margin: '20px 0' }}>
                          <a
                            href={element.properties.link}
                            style={{
                              display: 'inline-block',
                              backgroundColor: element.properties.backgroundColor,
                              color: element.properties.textColor,
                              padding: element.properties.padding,
                              borderRadius: element.properties.borderRadius,
                              textDecoration: 'none',
                              fontFamily: emailData.settings.fontFamily,
                              fontWeight: 'bold'
                            }}
                          >
                            {element.properties.text}
                          </a>
                        </div>
                      )}

                      {element.type === 'image' && (
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                          <img
                            src={element.properties.src}
                            alt={element.properties.alt}
                            style={{
                              width: element.properties.width,
                              maxWidth: '100%',
                              height: 'auto',
                              borderRadius: '5px'
                            }}
                          />
                        </div>
                      )}

                      {element.type === 'divider' && (
                        <hr
                          style={{
                            height: element.properties.height,
                            backgroundColor: element.properties.backgroundColor,
                            border: 'none',
                            margin: element.properties.margin
                          }}
                        />
                      )}

                      {element.type === 'spacer' && (
                        <div style={{ height: element.properties.height }}></div>
                      )}
                    </div>
                  ))}

                  {emailData.content.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start building your email by adding elements</p>
                      <p className="text-sm">Or use voice commands like "add heading" or "add button"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailMarketing = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Mock data for demonstration
  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      type: "automation",
      status: "active",
      subscribers: 2847,
      openRate: 42.3,
      clickRate: 8.7,
      revenue: "$12,450",
      lastSent: "2 hours ago",
      emails: 5
    },
    {
      id: 2,
      name: "Product Launch",
      type: "broadcast",
      status: "sent",
      subscribers: 5632,
      openRate: 38.9,
      clickRate: 12.4,
      revenue: "$28,900",
      lastSent: "1 day ago",
      emails: 1
    },
    {
      id: 3,
      name: "Re-engagement Campaign",
      type: "automation",
      status: "draft",
      subscribers: 1205,
      openRate: 0,
      clickRate: 0,
      revenue: "$0",
      lastSent: "Never",
      emails: 3
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Welcome Email",
      category: "onboarding",
      thumbnail: "https://via.placeholder.com/300x200",
      description: "Perfect for new subscriber welcome sequences"
    },
    {
      id: 2,
      name: "Product Announcement",
      category: "promotional",
      thumbnail: "https://via.placeholder.com/300x200",
      description: "Announce new products with style"
    },
    {
      id: 3,
      name: "Newsletter",
      category: "content",
      thumbnail: "https://via.placeholder.com/300x200",
      description: "Clean newsletter template for regular updates"
    }
  ];

  const analytics = {
    totalSubscribers: 8749,
    totalSent: 45632,
    averageOpenRate: 41.2,
    averageClickRate: 9.8,
    totalRevenue: "$94,650",
    growth: "+12.5%"
  };

  if (showBuilder) {
    return (
      <AdvancedEmailBuilder
        onSave={(emailData) => {
          console.log('Email saved:', emailData);
          setShowBuilder(false);
          toast({ title: "Email template saved successfully!" });
        }}
        onClose={() => setShowBuilder(false)}
        initialTemplate={selectedCampaign}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Email Marketing
          </h1>
          <p className="text-muted-foreground mt-2">
            Advanced email marketing with AI-powered drag & drop builder
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Contacts
          </Button>
          <Button 
            onClick={() => setShowBuilder(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Create Email
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalSubscribers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalSent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Emails Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.averageOpenRate}%</p>
                <p className="text-xs text-muted-foreground">Open Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.averageClickRate}%</p>
                <p className="text-xs text-muted-foreground">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalRevenue}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{analytics.growth}</p>
                <p className="text-xs text-muted-foreground">Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Email Campaigns</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search campaigns..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        campaign.status === 'active' ? 'bg-green-500' :
                        campaign.status === 'sent' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="capitalize">{campaign.type}</span>
                          <span>•</span>
                          <span>{campaign.subscribers.toLocaleString()} subscribers</span>
                          <span>•</span>
                          <span>Last sent: {campaign.lastSent}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{campaign.openRate}%</p>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{campaign.clickRate}%</p>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{campaign.revenue}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowBuilder(true);
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button 
              onClick={() => setShowBuilder(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-blue-500" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="text-center py-20">
            <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Email Automation</h3>
            <p className="text-muted-foreground mb-6">Create powerful automated email sequences</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <div className="text-center py-20">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Contact Management</h3>
            <p className="text-muted-foreground mb-6">Manage your subscriber lists and segments</p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Import Contacts
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-6">Deep insights into your email performance</p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketing;