import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Sparkles, 
  PenTool, 
  FileText, 
  Mail,
  Eye,
  Edit3,
  Clock,
  Loader2,
  Target,
  Heart,
  Megaphone,
  CheckCircle
} from 'lucide-react';

interface Email {
  id: number;
  name: string;
  subject: string;
  content: any[];
  delay?: number;
  delayUnit?: 'minutes' | 'hours' | 'days';
}

interface EmailSequence {
  id: number;
  name: string;
  type: 'sequence' | 'broadcast';
  description: string;
  emails: Email[];
  status: 'draft' | 'active' | 'paused';
}

interface EmailTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  type: 'sequence' | 'broadcast';
  emailCount: number;
  difficulty: 'basic' | 'advanced';
  estimatedTime: string;
}

export default function EmailBuilder() {
  const [view, setView] = useState<'main' | 'type-selection' | 'template-selection' | 'puck-editor'>('main');
  const [selectedType, setSelectedType] = useState<'sequence' | 'broadcast' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [currentCreationFlow, setCurrentCreationFlow] = useState<'ai' | 'template' | 'scratch'>('template');
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample templates for sequences
  const sequenceTemplates: EmailTemplate[] = [
    {
      id: 1,
      name: "Welcome Series",
      description: "3-email welcome sequence for new subscribers",
      category: "onboarding",
      type: "sequence",
      emailCount: 3,
      difficulty: "basic",
      estimatedTime: "15 min"
    },
    {
      id: 2,
      name: "Product Launch Sequence",
      description: "5-email series building anticipation for product launch",
      category: "promotional",
      type: "sequence", 
      emailCount: 5,
      difficulty: "advanced",
      estimatedTime: "25 min"
    },
    {
      id: 3,
      name: "Nurture Sequence",
      description: "7-email series to nurture and convert leads",
      category: "nurture",
      type: "sequence",
      emailCount: 7,
      difficulty: "advanced",
      estimatedTime: "35 min"
    },
    {
      id: 4,
      name: "Abandoned Cart Recovery",
      description: "3-email sequence to recover abandoned cart customers",
      category: "ecommerce",
      type: "sequence",
      emailCount: 3,
      difficulty: "basic",
      estimatedTime: "20 min"
    }
  ];

  // Sample templates for broadcasts
  const broadcastTemplates: EmailTemplate[] = [
    {
      id: 1,
      name: "Newsletter",
      description: "Weekly newsletter template",
      category: "content",
      type: "broadcast",
      emailCount: 1,
      difficulty: "basic",
      estimatedTime: "10 min"
    },
    {
      id: 2,
      name: "Product Announcement",
      description: "Single email to announce new products",
      category: "promotional",
      type: "broadcast",
      emailCount: 1,
      difficulty: "basic",
      estimatedTime: "12 min"
    },
    {
      id: 3,
      name: "Special Offer",
      description: "Limited time offer email",
      category: "promotional",
      type: "broadcast",
      emailCount: 1,
      difficulty: "basic",
      estimatedTime: "15 min"
    },
    {
      id: 4,
      name: "Event Invitation",
      description: "Invite subscribers to webinars or events",
      category: "event",
      type: "broadcast",
      emailCount: 1,
      difficulty: "basic",
      estimatedTime: "18 min"
    }
  ];

  const createFromAI = () => {
    setCurrentCreationFlow('ai');
    setView('type-selection');
  };

  const createFromTemplate = () => {
    setCurrentCreationFlow('template');
    setView('type-selection');
  };

  const createFromScratch = () => {
    setCurrentCreationFlow('scratch');
    setView('type-selection');
  };

  const handleTypeSelection = (type: 'sequence' | 'broadcast') => {
    setSelectedType(type);
    if (currentCreationFlow === 'scratch') {
      // Go directly to Puck editor for scratch
      setView('puck-editor');
    } else {
      // Show template selection for AI and template flows
      setView('template-selection');
    }
  };

  const handleTemplateSelection = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setView('puck-editor');
  };

  // Main view with three cards
  if (view === 'main') {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Email Builder</h1>
          <p className="text-muted-foreground text-lg">Create beautiful emails with our drag-and-drop editor</p>
        </div>

        {/* Three Creation Cards - Exactly like Campaign Builder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* AI Generated Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-purple-500 relative overflow-hidden"
            onClick={() => createFromAI()}
          >
            <CardContent className="p-0">
              {/* AI Preview Image */}
              <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Most Popular</span>
                </div>
                {/* AI Magic Animation */}
                <div className="relative">
                  <div className="w-24 h-32 bg-white rounded-lg shadow-lg p-3 space-y-2 relative">
                    <div className="h-2 bg-purple-200 rounded animate-pulse"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4 animate-pulse delay-100"></div>
                    <div className="h-1 bg-gray-200 rounded w-1/2 animate-pulse delay-200"></div>
                    <div className="h-4 bg-purple-500 rounded text-xs text-white flex items-center justify-center">AI</div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                    </div>
                  </div>
                  {/* Magic sparkles */}
                  <div className="absolute -top-4 -left-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-4">
                    <div className="w-1 h-1 bg-purple-300 rounded-full animate-ping delay-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">AI Generated</h3>
                <p className="text-gray-600 text-sm">Let AI create personalized email content and sequences</p>
              </div>
            </CardContent>
          </Card>

          {/* Use Template Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500 relative overflow-hidden"
            onClick={() => createFromTemplate()}
          >
            <CardContent className="p-0">
              {/* Template Preview Image */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded">Recommended</span>
                </div>
                {/* Template Preview Grid */}
                <div className="grid grid-cols-2 gap-2 p-4 w-full max-w-xs">
                  <div className="bg-white rounded shadow-sm p-3 space-y-2">
                    <div className="h-2 bg-blue-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-blue-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                  <div className="bg-white rounded shadow-sm p-3 space-y-2">
                    <div className="h-2 bg-green-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-green-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                  <div className="bg-white rounded shadow-sm p-3 space-y-2 col-span-2">
                    <div className="h-2 bg-purple-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-full"></div>
                    <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-purple-500 rounded text-xs text-white flex items-center justify-center">CTA</div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Use Template</h3>
                <p className="text-gray-600 text-sm">Start with professionally designed email templates</p>
              </div>
            </CardContent>
          </Card>

          {/* Start from Scratch Card */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500 relative overflow-hidden"
            onClick={() => createFromScratch()}
          >
            <CardContent className="p-0">
              {/* Blank Canvas Preview */}
              <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Full Control</span>
                </div>
                {/* Blank Canvas with Grid */}
                <div className="relative">
                  <div className="w-24 h-32 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                    <Plus className="w-8 h-8 text-gray-400" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-4 grid-rows-6 h-full w-full">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="border-r border-b border-gray-300 last:border-r-0"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Design tools */}
                  <div className="absolute -top-2 -left-2">
                    <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                      <PenTool className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-4 h-4 bg-green-400 rounded flex items-center justify-center">
                      <FileText className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">Start from Scratch</h3>
                <p className="text-gray-600 text-sm">Build your email from the ground up with full control</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Type Selection View (Sequence vs Broadcast)
  if (view === 'type-selection') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setView('main')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email Builder
          </Button>
          <h1 className="text-3xl font-bold mb-2">Choose Email Type</h1>
          <p className="text-muted-foreground">
            {currentCreationFlow === 'scratch' && 'Select the type of email to build from scratch'}
            {currentCreationFlow === 'template' && 'Choose the type of template you want to use'}
            {currentCreationFlow === 'ai' && 'Select the type of AI-generated email'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500"
            onClick={() => handleTypeSelection('sequence')}
          >
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl">Email Sequence</CardTitle>
              <CardDescription className="text-center">
                Create a series of emails sent over time to nurture your audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Multiple emails (3-10)
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Automated timing
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Relationship building
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Higher conversion rates
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500"
            onClick={() => handleTypeSelection('broadcast')}
          >
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl">Broadcast Email</CardTitle>
              <CardDescription className="text-center">
                Create a single email to send to your entire audience at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Single email
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Immediate delivery
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Announcements & updates
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Quick setup
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Template Selection View
  if (view === 'template-selection') {
    const availableTemplates = selectedType === 'sequence' ? sequenceTemplates : broadcastTemplates;

    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setView('type-selection')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email Type
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            Choose {selectedType === 'sequence' ? 'Sequence' : 'Broadcast'} Template
          </h1>
          <p className="text-muted-foreground">
            Select a template to customize with our drag-and-drop editor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTemplates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 hover:border-blue-500">
              {/* Template Preview */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center border-b">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white/90 border-blue-300">{template.category}</Badge>
                </div>
                
                {/* Email Preview */}
                <div className="w-full max-w-[180px] bg-white rounded-lg shadow-lg border overflow-hidden">
                  {/* Email Header */}
                  <div className="h-4 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center px-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Email Content Preview */}
                  <div className="p-2 space-y-1">
                    <div className="h-1.5 bg-blue-200 rounded w-4/5"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-full"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-2 bg-blue-500 rounded mt-1"></div>
                  </div>
                </div>
              </div>
              
              {/* Template Info */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {template.emailCount} Email{template.emailCount > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {template.estimatedTime}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setShowTemplatePreview(true);
                      }}
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelection(template);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-1" />
                          Select
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Email Editor View
  if (view === 'puck-editor') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setView(currentCreationFlow === 'scratch' ? 'type-selection' : 'template-selection')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  {selectedTemplate ? selectedTemplate.name : `New ${selectedType || 'Email'}`}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedType === 'sequence' ? 'Email Sequence Builder' : 'Broadcast Email Builder'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Save Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Launch Campaign</Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Left Sidebar - Email Sequence Manager (for sequences only) */}
          {selectedType === 'sequence' && (
            <div className="w-80 bg-white border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Email Sequence</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Email
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Drag to reorder emails in your sequence
                </p>
              </div>
              
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {/* Sample emails in sequence */}
                {[
                  { id: 1, subject: 'Welcome to our community!', delay: '0', status: 'editing' },
                  { id: 2, subject: 'Here\'s what you need to know', delay: '1 day', status: 'draft' },
                  { id: 3, subject: 'Special offer just for you', delay: '3 days', status: 'draft' }
                ].map((email, index) => (
                  <div key={email.id} className={`border rounded-lg p-3 cursor-pointer transition-all ${index === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Email {email.id}</span>
                      <div className="flex items-center space-x-1">
                        <Badge variant={email.status === 'editing' ? 'default' : 'secondary'} className="text-xs">
                          {email.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{email.subject}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Send after {email.delay}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* Editor Toolbar */}
            <div className="bg-white border-b p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h4 className="font-medium">
                    {selectedType === 'sequence' ? 'Email 1: Welcome to our community!' : 'Broadcast Email'}
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    Test Send
                  </Button>
                </div>
              </div>
            </div>

            {/* Email Canvas */}
            <div className="flex-1 bg-gray-100 p-6 overflow-auto">
              <div className="max-w-2xl mx-auto">
                {/* Email Preview */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
                  {/* Email Header */}
                  <div className="bg-gray-800 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Your Company</p>
                          <p className="text-xs opacity-75">hello@yourcompany.com</p>
                        </div>
                      </div>
                      <div className="text-xs opacity-75">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Email Subject */}
                  <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedType === 'sequence' ? 'Welcome to our community!' : 'Your Amazing Subject Line'}
                    </h2>
                  </div>

                  {/* Email Body */}
                  <div className="p-6 space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        Hi there! 👋
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedType === 'sequence' 
                          ? "Welcome to our amazing community! We're thrilled to have you on board. This is the beginning of something great."
                          : "We have some exciting news to share with you today. Get ready for something amazing!"
                        }
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Over the next few days, you'll receive valuable content that will help you succeed. Here's what to expect:
                      </p>
                      <ul className="text-gray-700">
                        <li>Exclusive tips and strategies</li>
                        <li>Behind-the-scenes content</li>
                        <li>Special offers and discounts</li>
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center py-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                        Get Started Now
                      </Button>
                    </div>

                    <div className="border-t pt-4 text-center text-sm text-gray-500">
                      <p>Best regards,<br />The Your Company Team</p>
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                    <p>You're receiving this email because you subscribed to our newsletter.</p>
                    <p className="mt-1">
                      <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a> | 
                      <a href="#" className="text-blue-600 hover:underline ml-1">Update Preferences</a>
                    </p>
                  </div>
                </div>

                {/* Editing Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">🎨 Start Building Your Email!</h4>
                  <p className="text-blue-800 text-sm">
                    Your drag-and-drop email editor will be integrated here. You'll be able to:
                  </p>
                  <ul className="mt-2 text-sm text-blue-800 space-y-1">
                    <li>• Customize text, images, and buttons</li>
                    <li>• Add dynamic content blocks</li>
                    <li>• Preview on different devices</li>
                    <li>• Test email deliverability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Element Library */}
          <div className="w-64 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-2">Add Elements</h3>
              <p className="text-sm text-muted-foreground">Drag elements into your email</p>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {/* Element Categories */}
              {[
                { icon: FileText, name: 'Text Block', desc: 'Add paragraphs, headers' },
                { icon: Target, name: 'Button', desc: 'Call-to-action button' },
                { icon: Mail, name: 'Image', desc: 'Upload or select images' },
                { icon: Heart, name: 'Divider', desc: 'Separate content sections' },
                { icon: CheckCircle, name: 'Social Icons', desc: 'Link to social media' },
                { icon: Clock, name: 'Countdown', desc: 'Add urgency timers' }
              ].map((element, index) => (
                <div key={index} className="border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <div className="flex items-center space-x-2">
                    <element.icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">{element.name}</p>
                      <p className="text-xs text-gray-500">{element.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}