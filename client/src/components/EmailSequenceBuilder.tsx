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
  AlignCenter,
  AlignRight,
  Palette
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
  type: 'heading' | 'text' | 'button' | 'image' | 'divider' | 'spacer';
  properties: any;
}

interface EmailCampaign {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused';
  emailSequence: EmailStep[];
  subscribers: number;
  stats: {
    opens: string;
    clicks: string;
    revenue: string;
  };
}

export default function EmailSequenceBuilder() {
  const [view, setView] = useState<'campaigns' | 'builder'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [selectedEmailStep, setSelectedEmailStep] = useState<EmailStep | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: 1,
      name: "Welcome Series",
      description: "Onboard new subscribers with a 3-email welcome sequence",
      status: 'active',
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
              type: 'heading',
              properties: { text: 'Welcome to Our Community!', fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }
            },
            {
              id: '2', 
              type: 'text',
              properties: { text: 'Thanks for joining us! We\'re excited to have you on board.', fontSize: '16px', lineHeight: '1.5', textAlign: 'left' }
            }
          ],
          settings: { list: "all-subscribers", sendTime: "immediate" }
        },
        {
          id: 2,
          name: "Getting Started",
          subject: "Here's how to get started",
          delay: 1,
          delayUnit: 'days',
          content: [],
          settings: { list: "all-subscribers", sendTime: "9:00 AM" }
        },
        {
          id: 3,
          name: "Resources",
          subject: "Helpful resources for you",
          delay: 3,
          delayUnit: 'days',
          content: [],
          settings: { list: "all-subscribers", sendTime: "9:00 AM" }
        }
      ]
    },
    {
      id: 2,
      name: "Product Launch Series",
      description: "5-email sequence for product launches",
      status: 'draft',
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: []
    }
  ]);

  // Email sequence templates
  const sequenceTemplates = [
    {
      name: "Welcome Series",
      description: "3-email onboarding sequence",
      emails: 3,
      category: "Onboarding"
    },
    {
      name: "Product Launch",
      description: "5-email launch campaign",
      emails: 5,
      category: "Sales"
    },
    {
      name: "Nurture Sequence",
      description: "7-email nurture campaign",
      emails: 7,
      category: "Nurture"
    },
    {
      name: "Abandoned Cart",
      description: "3-email recovery sequence",
      emails: 3,
      category: "Recovery"
    }
  ];

  const createNewCampaign = (template: any) => {
    const newCampaign: EmailCampaign = {
      id: campaigns.length + 1,
      name: `New ${template.name}`,
      description: template.description,
      status: 'draft',
      subscribers: 0,
      stats: { opens: "0%", clicks: "0%", revenue: "$0" },
      emailSequence: Array.from({ length: template.emails }, (_, i) => ({
        id: i + 1,
        name: `Email ${i + 1}`,
        subject: `Subject for Email ${i + 1}`,
        delay: i === 0 ? 0 : i,
        delayUnit: i === 0 ? 'minutes' : 'days',
        content: [],
        settings: { list: "all-subscribers", sendTime: i === 0 ? "immediate" : "9:00 AM" }
      }))
    };
    
    setCampaigns([...campaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    setSelectedEmailStep(newCampaign.emailSequence[0]);
    setView('builder');
  };

  const addEmailStep = () => {
    if (!selectedCampaign) return;
    
    const newStep: EmailStep = {
      id: selectedCampaign.emailSequence.length + 1,
      name: `Email ${selectedCampaign.emailSequence.length + 1}`,
      subject: `Subject for Email ${selectedCampaign.emailSequence.length + 1}`,
      delay: selectedCampaign.emailSequence.length,
      delayUnit: 'days',
      content: [],
      settings: { list: "all-subscribers", sendTime: "9:00 AM" }
    };

    const updatedCampaign = {
      ...selectedCampaign,
      emailSequence: [...selectedCampaign.emailSequence, newStep]
    };

    setSelectedCampaign(updatedCampaign);
    setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? updatedCampaign : c));
  };

  const addElement = (type: string) => {
    if (!selectedEmailStep) return;

    const newElement: EmailElement = {
      id: Date.now().toString(),
      type: type as any,
      properties: getDefaultProperties(type)
    };

    const updatedContent = [...selectedEmailStep.content, newElement];
    updateEmailStep({ content: updatedContent });
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

    const updatedContent = selectedEmailStep.content.map(element =>
      element.id === elementId
        ? { ...element, properties: { ...element.properties, ...properties } }
        : element
    );

    updateEmailStep({ content: updatedContent });
  };

  const deleteElement = (elementId: string) => {
    if (!selectedEmailStep) return;

    const updatedContent = selectedEmailStep.content.filter(element => element.id !== elementId);
    updateEmailStep({ content: updatedContent });
    setSelectedElement(null);
  };

  if (view === 'campaigns') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Designer</h1>
            <p className="text-muted-foreground">Create beautiful email sequences that convert</p>
          </div>
          <Button onClick={() => setView('builder')} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{campaign.name}</h3>
                          <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'draft' ? 'secondary' : 'outline'}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{campaign.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{campaign.emailSequence.length} emails</span>
                          <span>•</span>
                          <span>{campaign.subscribers.toLocaleString()} subscribers</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{campaign.stats.opens}</p>
                          <p className="text-xs text-muted-foreground">Open Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{campaign.stats.clicks}</p>
                          <p className="text-xs text-muted-foreground">Click Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{campaign.stats.revenue}</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
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
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sequenceTemplates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => createNewCampaign(template)}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{template.emails} emails</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Builder view
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setView('campaigns')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{selectedCampaign?.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedEmailStep ? `Editing: ${selectedEmailStep.name}` : 'Select an email to edit'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send Test
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Email Sequence Steps */}
        <div className="w-80 border-r bg-muted/50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Email Sequence</h3>
              <Button size="sm" onClick={addEmailStep}>
                <Plus className="w-4 h-4 mr-2" />
                Add Email
              </Button>
            </div>

            <div className="space-y-2">
              {selectedCampaign?.emailSequence.map((step, index) => (
                <Card 
                  key={step.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedEmailStep?.id === step.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedEmailStep(step)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{step.name}</h4>
                        <p className="text-xs text-muted-foreground">{step.subject}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                          <Timer className="w-3 h-3" />
                          <span>
                            {step.delay === 0 ? 'Immediate' : `${step.delay} ${step.delayUnit}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Email Editor */}
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            {/* Email Settings */}
            {selectedEmailStep && (
              <div className="border-b p-4 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs">Email Name</Label>
                    <Input 
                      value={selectedEmailStep.name}
                      onChange={(e) => updateEmailStep({ name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Subject Line</Label>
                    <Input 
                      value={selectedEmailStep.subject}
                      onChange={(e) => updateEmailStep({ subject: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Send Delay</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        type="number"
                        value={selectedEmailStep.delay}
                        onChange={(e) => updateEmailStep({ delay: parseInt(e.target.value) || 0 })}
                        className="w-20"
                      />
                      <Select value={selectedEmailStep.delayUnit} onValueChange={(value: any) => updateEmailStep({ delayUnit: value })}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">min</SelectItem>
                          <SelectItem value="hours">hrs</SelectItem>
                          <SelectItem value="days">days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Element Toolbar */}
            <div className="border-b p-3 bg-background">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Add Elements:</span>
                <Button variant="outline" size="sm" onClick={() => addElement('heading')}>
                  <Type className="w-4 h-4 mr-2" />
                  Heading
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement('text')}>
                  <PenTool className="w-4 h-4 mr-2" />
                  Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement('button')}>
                  <Target className="w-4 h-4 mr-2" />
                  Button
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement('image')}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement('divider')}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Divider
                </Button>
              </div>
            </div>

            {/* Email Canvas */}
            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
              <div className="mx-auto" style={{ width: previewMode === 'desktop' ? '600px' : '320px' }}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    {selectedEmailStep?.content.map((element) => (
                      <div
                        key={element.id}
                        className={`cursor-pointer relative group mb-4 ${
                          selectedElement?.id === element.id ? 'ring-2 ring-blue-500 rounded' : ''
                        }`}
                        onClick={() => setSelectedElement(element)}
                      >
                        {element.type === 'heading' && (
                          <h2
                            style={{
                              fontSize: element.properties.fontSize,
                              fontWeight: element.properties.fontWeight,
                              textAlign: element.properties.textAlign,
                              margin: '0'
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
                              margin: '0'
                            }}
                          >
                            {element.properties.text}
                          </p>
                        )}

                        {element.type === 'button' && (
                          <div style={{ textAlign: element.properties.textAlign }}>
                            <a
                              href={element.properties.link}
                              style={{
                                display: 'inline-block',
                                backgroundColor: element.properties.backgroundColor,
                                color: element.properties.textColor,
                                padding: element.properties.padding,
                                borderRadius: element.properties.borderRadius,
                                textDecoration: 'none',
                                fontWeight: 'bold'
                              }}
                            >
                              {element.properties.text}
                            </a>
                          </div>
                        )}

                        {element.type === 'image' && (
                          <div style={{ textAlign: 'center' }}>
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

                    {selectedEmailStep?.content.length === 0 && (
                      <div className="text-center py-20 text-gray-500">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Start building your email by adding elements above</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Element Properties */}
          <div className="w-80 border-l bg-background overflow-y-auto">
            <div className="p-4">
              {selectedElement ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Element Properties</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteElement(selectedElement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {(selectedElement.type === 'heading' || selectedElement.type === 'text') && (
                    <>
                      <div>
                        <Label className="text-xs">Text Content</Label>
                        <Textarea
                          value={selectedElement.properties.text}
                          onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Font Size</Label>
                        <Input
                          value={selectedElement.properties.fontSize}
                          onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Text Align</Label>
                        <Select value={selectedElement.properties.textAlign} onValueChange={(value) => updateElement(selectedElement.id, { textAlign: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
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
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Link URL</Label>
                        <Input
                          value={selectedElement.properties.link}
                          onChange={(e) => updateElement(selectedElement.id, { link: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Background Color</Label>
                        <Input
                          type="color"
                          value={selectedElement.properties.backgroundColor}
                          onChange={(e) => updateElement(selectedElement.id, { backgroundColor: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}

                  {selectedElement.type === 'image' && (
                    <>
                      <div>
                        <Label className="text-xs">Image URL</Label>
                        <Input
                          value={selectedElement.properties.src}
                          onChange={(e) => updateElement(selectedElement.id, { src: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Alt Text</Label>
                        <Input
                          value={selectedElement.properties.alt}
                          onChange={(e) => updateElement(selectedElement.id, { alt: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an element to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}