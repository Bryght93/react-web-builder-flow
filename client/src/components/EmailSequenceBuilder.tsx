import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
  Calendar, 
  Clock, 
  Save,
  ArrowLeft,
  ChevronRight,
  Timer,
  List,
  CheckCircle,
  Type,
  Image as ImageIcon,
  PenTool,
  Bold,
  Italic,
  Underline,
  Link,
  AlignLeft,
  User,
  Loader2,
  ArrowRight,
  AlignCenter,
  AlignRight,
  Palette,
  Zap,
  Megaphone,
  Heart,
  Sparkles,
  Monitor,
  Smartphone,
  Mic,
  MessageSquare,
  Wand2,
  Lightbulb,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Video,
  Headphones,
  Camera,
  Brush,
  TrendingUp,
  BarChart,
  Users2,
  Globe,
  Star,
  Award,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Code,
  Layers,
  PaintBucket,
  Sliders,
  Move,
  RotateCcw,
  Maximize2,
  Minimize2,
  MousePointer,
  Brain,
  Activity,
  DollarSign,
  Minus,
  Grid3X3,
  Columns2,
  Columns3,
  Columns4,
  Rectangle,
  Square,
  Circle,
  Divide,
  Space,
  Html5,
  Youtube,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ShoppingCart,
  Package,
  MessageCircle,
  Stars,
  ChevronDown,
  Grip
} from 'lucide-react';

interface EmailStep {
  id: number;
  name: string;
  subject: string;
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days';
  content: EmailElement[];
  settings: {
    list: string;
    sendTime: string;
    conditions?: string;
  };
}

interface EmailElement {
  id: string;
  type: 'layout' | 'text' | 'title' | 'image' | 'button' | 'divider' | 'spacer' | 'social' | 'html' | 'media' | 'linkbar' | 'textwrapimage' | 'product' | 'testimonial' | 'review' | 'cart' | 'pricedrop';
  properties: any;
  children?: EmailElement[];
}

interface EmailCampaign {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused';
  type: 'nurture' | 'broadcast';
  emailSequence: EmailStep[];
  subscribers: number;
  stats: {
    opens: string;
    clicks: string;
    revenue: string;
  };
}

export default function EmailSequenceBuilder() {
  const [view, setView] = useState<'campaigns' | 'builder' | 'template-selection' | 'campaign-type' | 'personal-info'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [selectedEmailStep, setSelectedEmailStep] = useState<EmailStep | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantMode, setAIAssistantMode] = useState<'content' | 'edit' | 'strategy' | 'compliance'>('content');
  const [voiceListening, setVoiceListening] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [currentCreationFlow, setCurrentCreationFlow] = useState<'scratch' | 'template' | 'ai'>('scratch');
  const [selectedCampaignType, setSelectedCampaignType] = useState<'nurture' | 'broadcast'>('nurture');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [draggedElement, setDraggedElement] = useState<any>(null);
  const [personalInfo, setPersonalInfo] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    campaignGoal: '',
    numberOfEmails: 5,
    tone: 'professional',
    productService: '',
    uniqueSellingPoint: '',
    targetMarket: '',
    customerPainPoints: '',
    businessGoals: '',
    competitiveDifferentiator: '',
    priceRange: '',
    currentMarketing: '',
    audienceAge: '',
    audienceGender: '',
    audienceIncome: '',
    customerBehavior: '',
    purchaseMotivation: ''
  });
  const { toast } = useToast();

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: 1,
      name: "Welcome Series",
      description: "Onboard new subscribers with a 3-email welcome sequence",
      status: 'active',
      type: 'nurture',
      subscribers: 1247,
      stats: { opens: "24.5%", clicks: "8.2%", revenue: "$1,247" },
      emailSequence: [
        {
          id: 1,
          name: "Welcome Email",
          subject: "Welcome to our community! 🎉",
          delay: 0,
          delayUnit: 'minutes',
          content: [
            {
              id: '1',
              type: 'layout',
              properties: { 
                columns: 1, 
                backgroundColor: '#ffffff',
                fullWidth: false,
                borderColor: '#e5e5e5',
                borderWidth: '0px',
                padding: '20px'
              },
              children: [
                {
                  id: '1-1',
                  type: 'title',
                  properties: { 
                    text: 'Welcome to Our Community!', 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    textAlign: 'center',
                    color: '#333333'
                  }
                },
                {
                  id: '1-2',
                  type: 'text',
                  properties: { 
                    text: 'Thanks for joining us! We\'re excited to have you on board.',
                    fontSize: '16px', 
                    lineHeight: '1.5', 
                    textAlign: 'left',
                    color: '#666666'
                  }
                }
              ]
            }
          ],
          settings: { list: "all-subscribers", sendTime: "immediate" }
        }
      ]
    }
  ]);

  // Layout blocks (containers)
  const layoutBlocks = [
    { type: 'layout', columns: 1, icon: Rectangle, name: '1 Column', description: 'Full width container' },
    { type: 'layout', columns: 2, icon: Columns2, name: '2 Columns', description: 'Split layout' },
    { type: 'layout', columns: 3, icon: Columns3, name: '3 Columns', description: 'Triple layout' },
    { type: 'layout', columns: 4, icon: Columns4, name: '4 Columns', description: 'Quad layout' }
  ];

  // Content elements
  const contentElements = [
    { type: 'text', icon: Type, name: 'Text', description: 'Basic text content' },
    { type: 'title', icon: Type, name: 'Title/Header', description: 'Prominent header text' },
    { type: 'image', icon: ImageIcon, name: 'Image', description: 'JPEG, PNG, GIF, WEBP' },
    { type: 'button', icon: MousePointer, name: 'Button', description: 'CTA buttons' },
    { type: 'divider', icon: Minus, name: 'Divider', description: 'Horizontal line' },
    { type: 'spacer', icon: Space, name: 'Spacer', description: 'Blank space' },
    { type: 'social', icon: Share2, name: 'Social', description: 'Social media icons' },
    { type: 'html', icon: Code, name: 'HTML', description: 'Custom HTML/CSS' },
    { type: 'media', icon: Video, name: 'Media', description: 'Video thumbnails' },
    { type: 'linkbar', icon: Link, name: 'Link Bar', description: 'Navigation links' },
    { type: 'textwrapimage', icon: ImageIcon, name: 'Text Wrap Image', description: 'Wrapped text around image' }
  ];

  // Dynamic elements (E-commerce)
  const dynamicElements = [
    { type: 'product', icon: Package, name: 'Product Block', description: 'Dynamic product display' },
    { type: 'testimonial', icon: MessageCircle, name: 'Testimonial', description: 'Customer reviews' },
    { type: 'review', icon: Stars, name: 'Review Request', description: 'Trigger review emails' },
    { type: 'cart', icon: ShoppingCart, name: 'Cart Block', description: 'Cart contents' },
    { type: 'pricedrop', icon: TrendingUp, name: 'Price Drop', description: 'Price change alerts' }
  ];

  const handleDragStart = (e: React.DragEvent, elementType: string, columns?: number) => {
    setDraggedElement({ type: elementType, columns });
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !selectedEmailStep) return;

    const newElement: EmailElement = {
      id: Date.now().toString(),
      type: draggedElement.type,
      properties: getDefaultProperties(draggedElement.type, draggedElement.columns),
      children: draggedElement.type === 'layout' ? [] : undefined
    };

    const updatedContent = [...selectedEmailStep.content, newElement];
    updateEmailStep({ content: updatedContent });
    setDraggedElement(null);
  };

  const getDefaultProperties = (type: string, columns?: number) => {
    switch (type) {
      case 'layout':
        return {
          columns: columns || 1,
          backgroundColor: '#ffffff',
          fullWidth: false,
          borderColor: '#e5e5e5',
          borderWidth: '0px',
          padding: '20px',
          margin: '10px 0'
        };
      case 'title':
        return { 
          text: 'Your Title Here', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          textAlign: 'left',
          color: '#333333',
          margin: '0 0 15px 0'
        };
      case 'text':
        return { 
          text: 'Your content here...', 
          fontSize: '16px', 
          lineHeight: '1.5', 
          textAlign: 'left',
          color: '#666666',
          margin: '0 0 15px 0'
        };
      case 'button':
        return { 
          text: 'Click Here', 
          backgroundColor: '#0066cc', 
          textColor: '#ffffff',
          borderRadius: '5px',
          padding: '12px 24px',
          textAlign: 'center',
          link: '#',
          fontSize: '16px',
          fontWeight: 'bold'
        };
      case 'image':
        return { 
          src: '/api/placeholder/400x200', 
          alt: 'Email Image', 
          width: '100%',
          borderRadius: '0px',
          alignment: 'center'
        };
      case 'divider':
        return { 
          height: '1px', 
          backgroundColor: '#dddddd', 
          margin: '20px 0',
          width: '100%'
        };
      case 'spacer':
        return { 
          height: '20px' 
        };
      case 'social':
        return {
          icons: ['facebook', 'twitter', 'instagram', 'linkedin'],
          size: '32px',
          spacing: '10px',
          alignment: 'center'
        };
      case 'html':
        return {
          code: '<div style="padding: 20px; background: #f0f0f0; text-align: center;">Custom HTML Content</div>'
        };
      case 'media':
        return {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: '/api/placeholder/400x300',
          platform: 'youtube'
        };
      default:
        return {};
    }
  };

  const updateEmailStep = (updates: Partial<EmailStep>) => {
    if (!selectedEmailStep || !selectedCampaign) return;

    const updatedStep = { ...selectedEmailStep, ...updates };
    const updatedSequence = selectedCampaign.emailSequence.map(step => 
      step.id === selectedEmailStep.id ? updatedStep : step
    );
    const updatedCampaign = { ...selectedCampaign, emailSequence: updatedSequence };

    setSelectedEmailStep(updatedStep);
    setSelectedCampaign(updatedCampaign);
    setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? updatedCampaign : c));
  };

  const updateElement = (elementId: string, properties: any) => {
    if (!selectedEmailStep) return;

    const updateElementRecursive = (elements: EmailElement[]): EmailElement[] => {
      return elements.map(element => {
        if (element.id === elementId) {
          return { ...element, properties: { ...element.properties, ...properties } };
        }
        if (element.children) {
          return { ...element, children: updateElementRecursive(element.children) };
        }
        return element;
      });
    };

    const updatedContent = updateElementRecursive(selectedEmailStep.content);
    updateEmailStep({ content: updatedContent });
  };

  const deleteElement = (elementId: string) => {
    if (!selectedEmailStep) return;

    const deleteElementRecursive = (elements: EmailElement[]): EmailElement[] => {
      return elements.filter(element => element.id !== elementId)
        .map(element => {
          if (element.children) {
            return { ...element, children: deleteElementRecursive(element.children) };
          }
          return element;
        });
    };

    const updatedContent = deleteElementRecursive(selectedEmailStep.content);
    updateEmailStep({ content: updatedContent });
    setSelectedElement(null);
  };

  const renderElement = (element: EmailElement, depth: number = 0) => {
    const isSelected = selectedElement?.id === element.id;
    const baseStyles = {
      backgroundColor: element.properties?.backgroundColor || 'transparent',
      color: element.properties?.color || element.properties?.textColor || '#333333',
      fontSize: element.properties?.fontSize || '16px',
      fontWeight: element.properties?.fontWeight || 'normal',
      textAlign: element.properties?.textAlign || 'left',
      padding: element.properties?.padding || '0',
      margin: element.properties?.margin || '0',
      borderRadius: element.properties?.borderRadius || '0',
      border: element.properties?.borderWidth && element.properties?.borderWidth !== '0px' 
        ? `${element.properties.borderWidth} solid ${element.properties.borderColor || '#e5e5e5'}` 
        : 'none',
    };

    const ElementWrapper = ({ children }: { children: React.ReactNode }) => (
      <div 
        className={`relative group cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={baseStyles}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
      >
        {children}

        {/* Element Controls */}
        <div className={`absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
          <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white" onClick={(e) => {
            e.stopPropagation();
            deleteElement(element.id);
          }}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );

    switch (element.type) {
      case 'layout':
        const columns = element.properties?.columns || 1;
        return (
          <ElementWrapper key={element.id}>
            <div 
              className={`grid gap-4`}
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                minHeight: element.children?.length ? 'auto' : '100px'
              }}
            >
              {element.children?.map((child, index) => (
                <div key={child.id} className="min-h-[50px]">
                  {renderElement(child, depth + 1)}
                </div>
              ))}
              {!element.children?.length && (
                <div className="col-span-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded min-h-[100px]">
                  Drag elements here
                </div>
              )}
            </div>
          </ElementWrapper>
        );

      case 'title':
        return (
          <ElementWrapper key={element.id}>
            <h2 style={{ margin: 0, ...baseStyles }}>
              {element.properties?.text || 'Title'}
            </h2>
          </ElementWrapper>
        );

      case 'text':
        return (
          <ElementWrapper key={element.id}>
            <p style={{ margin: 0, ...baseStyles, lineHeight: element.properties?.lineHeight || '1.5' }}>
              {element.properties?.text || 'Text content'}
            </p>
          </ElementWrapper>
        );

      case 'button':
        return (
          <ElementWrapper key={element.id}>
            <div style={{ textAlign: element.properties?.textAlign || 'center' }}>
              <a
                href={element.properties?.link || '#'}
                style={{
                  display: 'inline-block',
                  backgroundColor: element.properties?.backgroundColor || '#0066cc',
                  color: element.properties?.textColor || '#ffffff',
                  padding: element.properties?.padding || '12px 24px',
                  borderRadius: element.properties?.borderRadius || '5px',
                  textDecoration: 'none',
                  fontSize: element.properties?.fontSize || '16px',
                  fontWeight: element.properties?.fontWeight || 'bold'
                }}
              >
                {element.properties?.text || 'Button'}
              </a>
            </div>
          </ElementWrapper>
        );

      case 'image':
        return (
          <ElementWrapper key={element.id}>
            <div style={{ textAlign: element.properties?.alignment || 'center' }}>
              <img
                src={element.properties?.src || '/api/placeholder/400x200'}
                alt={element.properties?.alt || 'Image'}
                style={{
                  width: element.properties?.width || '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: element.properties?.borderRadius || '0px'
                }}
              />
            </div>
          </ElementWrapper>
        );

      case 'divider':
        return (
          <ElementWrapper key={element.id}>
            <hr
              style={{
                height: element.properties?.height || '1px',
                backgroundColor: element.properties?.backgroundColor || '#dddddd',
                border: 'none',
                margin: element.properties?.margin || '20px 0',
                width: element.properties?.width || '100%'
              }}
            />
          </ElementWrapper>
        );

      case 'spacer':
        return (
          <ElementWrapper key={element.id}>
            <div 
              style={{ 
                height: element.properties?.height || '20px',
                backgroundColor: 'transparent'
              }}
              className="border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs"
            >
              Spacer ({element.properties?.height || '20px'})
            </div>
          </ElementWrapper>
        );

      case 'social':
        return (
          <ElementWrapper key={element.id}>
            <div style={{ textAlign: element.properties?.alignment || 'center' }}>
              <div className="flex justify-center space-x-2">
                {(element.properties?.icons || ['facebook', 'twitter', 'instagram']).map((icon: string, index: number) => (
                  <div
                    key={index}
                    style={{
                      width: element.properties?.size || '32px',
                      height: element.properties?.size || '32px',
                      backgroundColor: '#3b5998',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="text-white text-xs">{icon.charAt(0).toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </ElementWrapper>
        );

      default:
        return (
          <ElementWrapper key={element.id}>
            <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 text-center text-gray-500">
              {element.type} element
            </div>
          </ElementWrapper>
        );
    }
  };

  // Campaign list view
  if (view === 'campaigns') {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Email Designer</h1>
            <p className="text-muted-foreground">Create beautiful email sequences that convert</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => {
              setCurrentCreationFlow('scratch');
              setView('campaign-type');
            }} className="bg-gradient-to-r from-green-600 to-teal-600">
              <Wand2 className="w-4 h-4 mr-2" />
              Create from Scratch
            </Button>
            <Button onClick={() => {
              setCurrentCreationFlow('template');
              setView('campaign-type');
            }} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <FileText className="w-4 h-4 mr-2" />
              Create
            </Button>
            <Button onClick={() => {
              setCurrentCreationFlow('ai');
              setView('campaign-type');
            }} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Create with AI
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {campaign.type === 'nurture' ? (
                          <Heart className="w-4 h-4 text-green-500" />
                        ) : (
                          <Megaphone className="w-4 h-4 text-blue-500" />
                        )}
                        <h3 className="text-lg sm:text-xl font-semibold">{campaign.name}</h3>
                      </div>
                      <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'draft' ? 'secondary' : 'outline'}>
                        {campaign.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {campaign.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{campaign.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{campaign.emailSequence.length} emails</span>
                      <span>•</span>
                      <span>{campaign.subscribers.toLocaleString()} subscribers</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex space-x-4">
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{campaign.stats.opens}</p>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-green-600">{campaign.stats.clicks}</p>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-purple-600">{campaign.stats.revenue}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setSelectedEmailStep(campaign.emailSequence[0]);
                          setView('builder');
                        }}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
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
      </div>
    );
  }

  // Builder view - Left-aligned comprehensive layout
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setView('campaigns')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{selectedCampaign?.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedEmailStep ? `Editing: ${selectedEmailStep.name}` : 'Select an email to edit'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}>
              {previewMode === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-1" />
              Test
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Everything organized */}
        <div className="w-80 border-r bg-background overflow-y-auto shrink-0">
          <Tabs defaultValue="emails" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>

            {/* Emails Tab */}
            <TabsContent value="emails" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Email Sequence</h3>
                <div className="space-y-2">
                  {selectedCampaign?.emailSequence.map((step, index) => (
                    <Card 
                      key={step.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedEmailStep?.id === step.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedEmailStep(step)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs truncate">{step.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{step.subject}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedEmailStep && (
                <div>
                  <h4 className="font-semibold mb-3">Email Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Subject Line</Label>
                      <Input 
                        value={selectedEmailStep.subject}
                        onChange={(e) => updateEmailStep({ subject: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Preview Text</Label>
                      <Input 
                        placeholder="Add preview text..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Design Tab */}
            <TabsContent value="design" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Layout Blocks</h3>
                <p className="text-xs text-muted-foreground mb-3">Create content structures in 1-4 column layouts</p>
                <div className="grid grid-cols-2 gap-2">
                  {layoutBlocks.map((block) => (
                    <div
                      key={`${block.type}-${block.columns}`}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.type, block.columns)}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <block.icon className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs font-medium">{block.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Content Elements</h3>
                <p className="text-xs text-muted-foreground mb-3">Add these inside layout blocks</p>
                <div className="space-y-2">
                  {contentElements.map((element) => (
                    <div
                      key={element.type}
                      className="p-2 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, element.type)}
                    >
                      <div className="flex items-center space-x-2">
                        <element.icon className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-sm font-medium">{element.name}</span>
                          <p className="text-xs text-muted-foreground">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Dynamic Elements</h3>
                <p className="text-xs text-muted-foreground mb-3">E-commerce integration required</p>
                <div className="space-y-2">
                  {dynamicElements.map((element) => (
                    <div
                      key={element.type}
                      className="p-2 border rounded-lg cursor-pointer hover:bg-muted transition-colors opacity-50"
                      draggable
                      onDragStart={(e) => handleDragStart(e, element.type)}
                    >
                      <div className="flex items-center space-x-2">
                        <element.icon className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <span className="text-sm font-medium">{element.name}</span>
                          <p className="text-xs text-muted-foreground">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedElement && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Element Properties</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Element Type</Label>
                        <Badge variant="outline" className="mt-1 block w-fit">
                          {selectedElement.type.toUpperCase()}
                        </Badge>
                      </div>

                      {(selectedElement.type === 'text' || selectedElement.type === 'title') && (
                        <>
                          <div>
                            <Label className="text-sm">Content</Label>
                            <Textarea
                              value={selectedElement.properties?.text || ''}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1 h-20"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Font Size</Label>
                            <Input
                              value={selectedElement.properties?.fontSize || '16px'}
                              onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Color</Label>
                            <Input
                              type="color"
                              value={selectedElement.properties?.color || '#333333'}
                              onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}

                      {selectedElement.type === 'button' && (
                        <>
                          <div>
                            <Label className="text-sm">Button Text</Label>
                            <Input
                              value={selectedElement.properties?.text || ''}
                              onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Link URL</Label>
                            <Input
                              value={selectedElement.properties?.link || ''}
                              onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Background Color</Label>
                            <Input
                              type="color"
                              value={selectedElement.properties?.backgroundColor || '#0066cc'}
                              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}

                      {selectedElement.type === 'layout' && (
                        <>
                          <div>
                            <Label className="text-sm">Columns</Label>
                            <Select 
                              value={selectedElement.properties?.columns?.toString() || '1'} 
                              onValueChange={(value) => updateElement(selectedElement.id, { columns: parseInt(value) })}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Column</SelectItem>
                                <SelectItem value="2">2 Columns</SelectItem>
                                <SelectItem value="3">3 Columns</SelectItem>
                                <SelectItem value="4">4 Columns</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Background Color</Label>
                            <Input
                              type="color"
                              value={selectedElement.properties?.backgroundColor || '#ffffff'}
                              onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Padding</Label>
                            <Input
                              value={selectedElement.properties?.padding || '20px'}
                              onChange={(e) => updateElement(selectedElement.id, { padding: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteElement(selectedElement.id)}
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Element
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            {/* AI Tab */}
            <TabsContent value="ai" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">AI Features</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Content
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Improve Copy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Strategy Tips
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Panel - Email Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
            <div className="mx-auto" style={{ width: previewMode === 'desktop' ? '600px' : '320px', maxWidth: '100%' }}>
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden min-h-96"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="p-4">
                  {selectedEmailStep?.content.map((element) => renderElement(element))}

                  {selectedEmailStep?.content.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded">
                      <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Drag layout blocks and elements here to start building</p>
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
}