import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus,
  Settings,
  Palette,
  Type,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Trash2,
  Copy,
  Move,
  Grid3x3,
  LayoutGrid,
  Columns,
  Brain,
  Sparkles,
  Wand2,
  Eye,
  Code,
  MousePointer,
  Activity,
  DollarSign,
  Zap,
  Mail,
  Send,
  Clock,
  Users
} from 'lucide-react';

interface EmailStep {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  content: any;
  delay: number;
  type: 'welcome' | 'follow-up' | 'promotional' | 'nurture' | 'custom';
  isActive: boolean;
}

interface LayoutBlock {
  id: string;
  type: 'layout';
  columns: number;
  background: {
    color: string;
    image?: string;
    fullWidth: boolean;
  };
  padding: number[];
  margin: number[];
  border: {
    width: number;
    style: string;
    color: string;
  };
  children: ContentElement[];
}

interface ContentElement {
  id: string;
  type: 'text' | 'title' | 'image' | 'button' | 'divider' | 'spacer' | 'social' | 'html';
  content: any;
  styles: any;
}

const EmailSequenceBuilder: React.FC = () => {
  const [sequence, setSequence] = useState<EmailStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<EmailStep | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const templateLibrary = [
    {
      id: 'welcome-series',
      name: 'Welcome Series',
      description: 'A complete 7-email welcome sequence',
      emails: [
        { name: 'Welcome Email', subject: 'Welcome to our community!', previewText: 'Thanks for joining us' },
        { name: 'Getting Started', subject: 'Your first steps', previewText: 'Here\'s how to get started' },
        { name: 'Success Stories', subject: 'See what others achieved', previewText: 'Real customer success stories' }
      ]
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      description: 'Build excitement for your new product',
      emails: [
        { name: 'Coming Soon', subject: 'Something big is coming...', previewText: 'Get ready for launch' },
        { name: 'Launch Day', subject: 'It\'s here! Introducing...', previewText: 'Your wait is over' }
      ]
    },
    {
      id: 'nurture-sequence',
      name: 'Lead Nurture',
      description: 'Convert leads into customers',
      emails: [
        { name: 'Value Email 1', subject: 'Free resource inside', previewText: 'Exclusive content for you' },
        { name: 'Social Proof', subject: 'What our customers say', previewText: 'Reviews and testimonials' }
      ]
    }
  ];

  const handleTemplateSelect = (template: any) => {
    const newSequence = template.emails.map((email: any, index: number) => ({
      id: `step-${Date.now()}-${index}`,
      name: email.name,
      subject: email.subject,
      previewText: email.previewText,
      content: { blocks: [] },
      delay: index === 0 ? 0 : (index * 24),
      type: index === 0 ? 'welcome' : 'follow-up',
      isActive: true
    }));
    setSequence(newSequence);
  };

  const addCustomStep = () => {
    const newStep: EmailStep = {
      id: `step-${Date.now()}`,
      name: `Email ${sequence.length + 1}`,
      subject: '',
      previewText: '',
      content: { blocks: [] },
      delay: sequence.length === 0 ? 0 : 24,
      type: 'custom',
      isActive: true
    };
    setSequence([...sequence, newStep]);
  };

  const openEditor = (step: EmailStep) => {
    setSelectedStep(step);
    setIsEditorOpen(true);
  };

  const layoutBlocks = [
    { name: 'Single Column', columns: 1, icon: AlignLeft },
    { name: 'Two Columns', columns: 2, icon: Columns },
    { name: 'Three Columns', columns: 3, icon: Grid3x3 },
    { name: 'Four Columns', columns: 4, icon: LayoutGrid }
  ];

  const contentElements = [
    { name: 'Text', type: 'text', icon: Type, description: 'Add paragraph text' },
    { name: 'Title', type: 'title', icon: Type, description: 'Add heading text' },
    { name: 'Image', type: 'image', icon: Image, description: 'Add images' },
    { name: 'Button', type: 'button', icon: MousePointer, description: 'Add CTA buttons' },
    { name: 'Divider', type: 'divider', icon: AlignCenter, description: 'Add horizontal lines' },
    { name: 'Spacer', type: 'spacer', icon: Move, description: 'Add blank space' },
    { name: 'Social', type: 'social', icon: Users, description: 'Add social icons' },
    { name: 'HTML', type: 'html', icon: Code, description: 'Custom HTML/CSS' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Main Controls */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Email Steps */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Email Sequence</h3>
            <Badge variant="secondary">{sequence.length} emails</Badge>
          </div>

          {sequence.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No emails in sequence</p>
              <div className="space-y-2">
                <Button 
                  onClick={addCustomStep} 
                  className="w-full"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create from Scratch
                </Button>
                <p className="text-xs text-gray-400">or choose a template below</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {sequence.map((step, index) => (
                  <div
                    key={step.id}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => openEditor(step)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="font-medium text-sm">{step.name}</span>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{step.subject}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Template Library */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Template Library</h4>
          <div className="space-y-2">
            {templateLibrary.map((template) => (
              <div
                key={template.id}
                className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleTemplateSelect(template)}
              >
                <h5 className="font-medium text-sm text-gray-900">{template.name}</h5>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="text-xs">
                    {template.emails.length} emails
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Email Button */}
        <div className="p-4">
          <Button 
            onClick={addCustomStep} 
            className="w-full"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Email
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      {isEditorOpen && selectedStep ? (
        <div className="flex-1 flex">
          {/* Design Controls */}
          <div className="w-80 bg-white border-r border-gray-200">
            <Tabs defaultValue="settings" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="settings" className="text-xs">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="design" className="text-xs">
                  <Palette className="h-4 w-4 mr-1" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="ai" className="text-xs">
                  <Brain className="h-4 w-4 mr-1" />
                  AI
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="settings" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="subject">Subject Line</Label>
                        <Input
                          id="subject"
                          value={selectedStep.subject}
                          onChange={(e) => {
                            const updated = { ...selectedStep, subject: e.target.value };
                            setSelectedStep(updated);
                            setSequence(sequence.map(s => s.id === updated.id ? updated : s));
                          }}
                          placeholder="Enter subject line"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="preview">Preview Text</Label>
                        <Input
                          id="preview"
                          value={selectedStep.previewText}
                          onChange={(e) => {
                            const updated = { ...selectedStep, previewText: e.target.value };
                            setSelectedStep(updated);
                            setSequence(sequence.map(s => s.id === updated.id ? updated : s));
                          }}
                          placeholder="Preview text shown in inbox"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Background Color</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            type="color"
                            defaultValue="#ffffff"
                            className="w-12 h-8 p-0 border-0"
                          />
                          <Input defaultValue="#ffffff" className="flex-1" />
                        </div>
                      </div>

                      <div>
                        <Label>Email Type</Label>
                        <Select defaultValue={selectedStep.type}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="welcome">Welcome</SelectItem>
                            <SelectItem value="follow-up">Follow-up</SelectItem>
                            <SelectItem value="promotional">Promotional</SelectItem>
                            <SelectItem value="nurture">Nurture</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="design" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-6">
                      {/* Layout Blocks */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Layout Blocks</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {layoutBlocks.map((block) => (
                            <div
                              key={block.columns}
                              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-center"
                            >
                              <block.icon className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                              <span className="text-xs text-gray-700">{block.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content Elements */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Content Elements</h4>
                        <div className="space-y-2">
                          {contentElements.map((element) => (
                            <div
                              key={element.type}
                              className="flex items-center p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <element.icon className="h-5 w-5 text-gray-600 mr-3" />
                              <div>
                                <span className="text-sm font-medium text-gray-900">{element.name}</span>
                                <p className="text-xs text-gray-500">{element.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Element Properties */}
                      {selectedElement && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Properties</h4>
                          <div className="space-y-4">
                            <div>
                              <Label>Font Size</Label>
                              <Slider
                                defaultValue={[16]}
                                max={48}
                                min={8}
                                step={1}
                                className="mt-2"
                              />
                            </div>
                            <div>
                              <Label>Text Color</Label>
                              <div className="flex items-center space-x-2 mt-1">
                                <Input
                                  type="color"
                                  defaultValue="#000000"
                                  className="w-12 h-8 p-0 border-0"
                                />
                                <Input defaultValue="#000000" className="flex-1" />
                              </div>
                            </div>
                            <div>
                              <Label>Alignment</Label>
                              <div className="flex space-x-1 mt-1">
                                <Button variant="outline" size="sm">
                                  <AlignLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <AlignCenter className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <AlignRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="ai" className="h-full m-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      <div className="text-center py-6">
                        <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">AI Features</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Let AI help you create better emails
                        </p>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate Subject Lines
                      </Button>

                      <Button className="w-full" variant="outline">
                        <Brain className="h-4 w-4 mr-2" />
                        AI Content Writer
                      </Button>

                      <Button className="w-full" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Optimizer
                      </Button>

                      <Button className="w-full" variant="outline">
                        <Activity className="h-4 w-4 mr-2" />
                        Performance Predictor
                      </Button>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 p-8">
                {/* Email Canvas */}
                <div className="space-y-6">
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Email</h3>
                    <p className="text-gray-500 mb-4">
                      Drag layout blocks and content elements from the left panel
                    </p>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Block
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Select an Email to Edit</h3>
            <p className="text-gray-500 mb-6">
              Choose an email from your sequence or create a new one to start designing
            </p>
            <div className="space-x-3">
              <Button onClick={addCustomStep}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Email
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Sequence
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSequenceBuilder;