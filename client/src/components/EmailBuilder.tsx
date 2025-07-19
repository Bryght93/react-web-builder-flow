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
import PuckEmailEditor from './PuckEmailEditor';
import EmailSequenceEditor from './EmailSequenceEditor';

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

export default function EmailBuilder({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<
    'main' | 'type-selection' | 'template-selection' | 'puck-editor' | 'sequence-editor' | 'my-emails'
  >('main');
  const [selectedType, setSelectedType] = useState<'sequence' | 'broadcast' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [currentCreationFlow, setCurrentCreationFlow] = useState<'ai' | 'template' | 'scratch'>('template');
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingEmail, setEditingEmail] = useState<any>(null);

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
      // For scratch flow, go directly to Puck editor
      setView('puck-editor');
    } else {
      // Show template selection for AI and template flows
      setView('template-selection');
    }
  };

  const handleTemplateSelection = (template: EmailTemplate) => {
    setIsGenerating(true);
    setSelectedTemplate(template);

    // Simulate template loading
    setTimeout(() => {
      setIsGenerating(false);

      // Use sequence editor for multi-email templates, Puck editor for single emails
      if (template.emailCount > 1) {
        setView('sequence-editor');
      } else {
        setView('puck-editor');
      }
    }, 1500);
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

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* My Emails Library */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-indigo-500" 
            onClick={() => setView('my-emails')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">My Emails</CardTitle>
              <CardDescription>
                View all your saved emails and drafts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Drafts</Badge>
                <Badge variant="secondary">Completed</Badge>
                <Badge variant="secondary">Templates</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Access your email library with auto-saved drafts and completed templates.
              </p>
            </CardContent>
          </Card>

          {/* Create from Template */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500" 
            onClick={() => {
              setCurrentCreationFlow('template');
              setView('type-selection');
            }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Use Template</CardTitle>
              <CardDescription>
                Start with professionally designed templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Welcome Series</Badge>
                <Badge variant="secondary">Product Launch</Badge>
                <Badge variant="secondary">Newsletter</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Choose from our collection of proven email templates.
              </p>
            </CardContent>
          </Card>

          {/* Create from Scratch */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-green-500" 
            onClick={() => {
              setCurrentCreationFlow('scratch');
              setView('type-selection');
            }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Start from Scratch</CardTitle>
              <CardDescription>
                Build your email from the ground up
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">Drag & Drop</Badge>
                <Badge variant="outline">Custom Design</Badge>
                <Badge variant="outline">Full Control</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Use our intuitive drag-and-drop editor to create custom designs.
              </p>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-500">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">AI Assistant</CardTitle>
              <CardDescription>
                Let AI help you create emails
              </CardDescription>
              <Badge className="bg-purple-100 text-purple-700 mt-2">Coming Soon</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">Smart Content</Badge>
                <Badge variant="outline">Auto Design</Badge>
                <Badge variant="outline">Optimization</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Describe your goals and let AI create the perfect template.
              </p>
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

  // Puck Editor View
  if (view === 'puck-editor') {
    const handleSaveEmail = (emailData: any) => {
      console.log('Email saved:', emailData);
      // Here you would save to your backend
      setView('main');
    };

    const handleBackFromEditor = () => {
      if (currentCreationFlow === 'scratch') {
        setView('type-selection');
      } else {
        setView('template-selection');
      }
    };

    return (
      <PuckEmailEditor
        onBack={handleBackFromEditor}
        onSave={handleSaveEmail}
        emailTemplate={{
          name: selectedTemplate?.name || `New ${selectedType} Email`,
          subject: selectedTemplate?.name ? `${selectedTemplate.name} - Subject` : 'Your Email Subject Here'
        }}
        initialData={null} // Let PuckEmailEditor handle template content based on selected template
      />
    );
  }

  // Email Sequence Editor View
  if (view === 'sequence-editor' && selectedTemplate) {
    return (
      <EmailSequenceEditor
        onBack={() => setView('template-selection')}
        template={selectedTemplate}
      />
    );
  }

  // My Emails View
  if (view === 'my-emails') {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setView('main')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email Builder
          </Button>
          <h1 className="text-3xl font-bold mb-2">My Emails</h1>
          <p className="text-muted-foreground">
            Manage your saved emails, drafts, and templates
          </p>
        </div>
        {/* Placeholder for email list */}
        <div>
          <p>Your saved emails will appear here.</p>
        </div>
      </div>
    );
  }

  return null;
}