import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Star,
  Mail,
  Palette,
  Zap,
  Layout,
  Image as ImageIcon,
  Type,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { EmailTemplateEditor } from './EmailTemplateEditor';

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  type: 'single' | 'sequence';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  emailCount: number;
  thumbnail: string;
  description: string;
  tags: string[];
  features: string[];
  designStyle: string;
  colors: string[];
  elements: any[];
  content: {
    subject: string;
    preheader: string;
    body: any[];
  }[];
  isFullyDesigned: boolean;
  rating: number;
  downloads: number;
  aiOptimized: boolean;
}

const EmailDesigner: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Fully designed email templates
  const fullyDesignedTemplates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Modern Welcome Series',
      category: 'welcome',
      industry: 'saas',
      type: 'sequence',
      difficulty: 'basic',
      emailCount: 3,
      thumbnail: '/api/placeholder/300/200',
      description: 'Clean, modern welcome sequence with gradient backgrounds and professional typography',
      tags: ['welcome', 'onboarding', 'modern', 'gradient'],
      features: ['3 email sequence', 'Gradient backgrounds', 'Mobile responsive', 'CTA buttons'],
      designStyle: 'Modern',
      colors: ['#667eea', '#764ba2', '#f093fb'],
      elements: [],
      content: [
        {
          subject: 'Welcome to [Company] - Your journey starts now! 🚀',
          preheader: 'We\'re excited to have you on board. Here\'s what happens next...',
          body: [
            {
              type: 'header',
              content: {
                logo: '[LOGO]',
                backgroundColor: '#667eea'
              }
            },
            {
              type: 'hero',
              content: {
                title: 'Welcome to [Company]!',
                subtitle: 'We\'re thrilled to have you join our community of innovators',
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textColor: '#ffffff'
              }
            },
            {
              type: 'content',
              content: {
                text: 'Hi [First Name],\n\nWelcome to [Company]! We\'re excited to help you [achieve specific goal]. Over the next few days, you\'ll receive emails with valuable tips and resources to get you started.\n\nHere\'s what you can expect:',
                items: [
                  'Step-by-step setup guide',
                  'Exclusive tips and strategies',
                  'Access to our community'
                ]
              }
            },
            {
              type: 'cta',
              content: {
                text: 'Get Started Now',
                link: '[SETUP_LINK]',
                backgroundColor: '#f093fb',
                textColor: '#ffffff'
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.8,
      downloads: 1247,
      aiOptimized: true
    },
    {
      id: '2',
      name: 'E-commerce Product Launch',
      category: 'product',
      industry: 'ecommerce',
      type: 'sequence',
      difficulty: 'intermediate',
      emailCount: 5,
      thumbnail: '/api/placeholder/300/200',
      description: 'Complete product launch sequence with countdown timers and social proof',
      tags: ['product launch', 'ecommerce', 'countdown', 'social proof'],
      features: ['5 email sequence', 'Countdown timers', 'Product showcases', 'Social proof'],
      designStyle: 'E-commerce',
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
      elements: [],
      content: [
        {
          subject: '🔥 Something amazing is coming... (Sneak peek inside)',
          preheader: 'Be the first to know about our biggest launch this year',
          body: [
            {
              type: 'header',
              content: {
                logo: '[LOGO]',
                backgroundColor: '#ff6b6b'
              }
            },
            {
              type: 'hero',
              content: {
                title: 'Something Big is Coming...',
                subtitle: 'Get ready for our biggest product launch this year',
                image: '[PRODUCT_TEASER_IMAGE]',
                backgroundColor: '#ffffff'
              }
            },
            {
              type: 'countdown',
              content: {
                title: 'Launch Countdown',
                endDate: '[LAUNCH_DATE]',
                backgroundColor: '#4ecdc4'
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.9,
      downloads: 892,
      aiOptimized: true
    },
    {
      id: '3',
      name: 'Professional Newsletter',
      category: 'newsletter',
      industry: 'business',
      type: 'single',
      difficulty: 'basic',
      emailCount: 1,
      thumbnail: '/api/placeholder/300/200',
      description: 'Clean, professional newsletter template perfect for B2B communications',
      tags: ['newsletter', 'professional', 'b2b', 'clean'],
      features: ['Single email', 'Clean layout', 'Multiple content blocks', 'Professional design'],
      designStyle: 'Professional',
      colors: ['#2c3e50', '#3498db', '#ecf0f1'],
      elements: [],
      content: [
        {
          subject: '[Company] Weekly Insights - [Date]',
          preheader: 'This week: Industry updates, expert tips, and more',
          body: [
            {
              type: 'header',
              content: {
                logo: '[LOGO]',
                navigation: ['Articles', 'Resources', 'About'],
                backgroundColor: '#2c3e50'
              }
            },
            {
              type: 'newsletter_intro',
              content: {
                title: 'Weekly Insights',
                date: '[CURRENT_DATE]',
                intro: 'Your weekly dose of industry insights and expert tips'
              }
            },
            {
              type: 'article_grid',
              content: {
                articles: [
                  {
                    title: '[ARTICLE_1_TITLE]',
                    excerpt: '[ARTICLE_1_EXCERPT]',
                    image: '[ARTICLE_1_IMAGE]',
                    link: '[ARTICLE_1_LINK]'
                  },
                  {
                    title: '[ARTICLE_2_TITLE]',
                    excerpt: '[ARTICLE_2_EXCERPT]',
                    image: '[ARTICLE_2_IMAGE]',
                    link: '[ARTICLE_2_LINK]'
                  }
                ]
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.7,
      downloads: 2103,
      aiOptimized: true
    },
    {
      id: '4',
      name: 'Abandoned Cart Recovery',
      category: 'recovery',
      industry: 'ecommerce',
      type: 'sequence',
      difficulty: 'advanced',
      emailCount: 3,
      thumbnail: '/api/placeholder/300/200',
      description: 'Highly converting abandoned cart sequence with personalization and urgency',
      tags: ['abandoned cart', 'ecommerce', 'urgency', 'personalization'],
      features: ['3 email sequence', 'Product images', 'Urgency elements', 'Discount codes'],
      designStyle: 'Conversion-focused',
      colors: ['#e74c3c', '#f39c12', '#27ae60'],
      elements: [],
      content: [
        {
          subject: 'You left something behind... 🛒',
          preheader: 'Your items are waiting for you. Complete your purchase now!',
          body: [
            {
              type: 'header',
              content: {
                logo: '[LOGO]',
                backgroundColor: '#e74c3c'
              }
            },
            {
              type: 'abandoned_cart_hero',
              content: {
                title: 'Don\'t Miss Out!',
                subtitle: 'Your items are still available, but not for long...',
                cartItems: '[CART_ITEMS]'
              }
            },
            {
              type: 'urgency_timer',
              content: {
                title: 'Complete your purchase within:',
                duration: '24 hours',
                backgroundColor: '#f39c12'
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.9,
      downloads: 1567,
      aiOptimized: true
    },
    {
      id: '5',
      name: 'Course Launch Sequence',
      category: 'education',
      industry: 'education',
      type: 'sequence',
      difficulty: 'intermediate',
      emailCount: 7,
      thumbnail: '/api/placeholder/300/200',
      description: 'Complete course launch sequence with student testimonials and curriculum highlights',
      tags: ['course', 'education', 'launch', 'testimonials'],
      features: ['7 email sequence', 'Video embeds', 'Testimonials', 'Curriculum preview'],
      designStyle: 'Educational',
      colors: ['#9b59b6', '#3498db', '#f1c40f'],
      elements: [],
      content: [
        {
          subject: '🎓 Your learning journey begins here...',
          preheader: 'Transform your skills with our comprehensive course',
          body: [
            {
              type: 'header',
              content: {
                logo: '[LOGO]',
                backgroundColor: '#9b59b6'
              }
            },
            {
              type: 'course_hero',
              content: {
                title: 'Master [Skill] in [Timeframe]',
                subtitle: 'Join thousands of students who have transformed their careers',
                video: '[COURSE_PREVIEW_VIDEO]',
                instructor: '[INSTRUCTOR_INFO]'
              }
            },
            {
              type: 'curriculum_preview',
              content: {
                modules: [
                  'Module 1: Foundation',
                  'Module 2: Intermediate Concepts',
                  'Module 3: Advanced Techniques',
                  'Module 4: Real-world Projects'
                ]
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.8,
      downloads: 743,
      aiOptimized: true
    },
    {
      id: '6',
      name: 'Event Invitation Suite',
      category: 'event',
      industry: 'events',
      type: 'sequence',
      difficulty: 'basic',
      emailCount: 4,
      thumbnail: '/api/placeholder/300/200',
      description: 'Elegant event invitation sequence with RSVP tracking and reminders',
      tags: ['event', 'invitation', 'rsvp', 'elegant'],
      features: ['4 email sequence', 'RSVP buttons', 'Event details', 'Calendar integration'],
      designStyle: 'Elegant',
      colors: ['#8e44ad', '#2c3e50', '#ecf0f1'],
      elements: [],
      content: [
        {
          subject: 'You\'re Invited: [Event Name] - [Date]',
          preheader: 'Join us for an exclusive event you won\'t want to miss',
          body: [
            {
              type: 'elegant_header',
              content: {
                logo: '[LOGO]',
                backgroundColor: '#8e44ad'
              }
            },
            {
              type: 'invitation_hero',
              content: {
                title: 'You\'re Invited',
                eventName: '[EVENT_NAME]',
                date: '[EVENT_DATE]',
                location: '[EVENT_LOCATION]',
                dress_code: '[DRESS_CODE]'
              }
            },
            {
              type: 'rsvp_section',
              content: {
                deadline: '[RSVP_DEADLINE]',
                buttons: ['Yes, I\'ll attend', 'Sorry, can\'t make it']
              }
            }
          ]
        }
      ],
      isFullyDesigned: true,
      rating: 4.6,
      downloads: 456,
      aiOptimized: true
    }
  ];

  const categories = ['all', 'welcome', 'product', 'newsletter', 'recovery', 'education', 'event'];
  const industries = ['all', 'saas', 'ecommerce', 'business', 'education', 'events', 'healthcare', 'finance'];
  const types = ['all', 'single', 'sequence'];

  const filteredTemplates = fullyDesignedTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesIndustry && matchesType && matchesSearch;
  });

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handleAIGenerate = async () => {
    // Simulate AI generation process
    console.log('Generating AI content for:', aiPrompt);
    setShowAIDialog(false);
    // Here you would integrate with your AI service
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Designer</h1>
            <p className="text-gray-600">Choose from fully designed templates or create with AI</p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create with AI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Email with AI</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Describe your email campaign</label>
                    <Input
                      placeholder="e.g., Welcome sequence for SaaS product launch..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleAIGenerate}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Badge variant="secondary" className="ml-auto">
            {filteredTemplates.length} templates
          </Badge>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {template.aiOptimized && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  {template.isFullyDesigned && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Star className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleTemplateSelect(template)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {template.type === 'sequence' ? `${template.emailCount} emails` : 'Single email'}
                  </Badge>
                  <span className="text-xs text-gray-500">{template.downloads} downloads</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Use Template
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Template Editor Modal */}
      {showEditor && selectedTemplate && (
        <EmailTemplateEditor
          template={selectedTemplate}
          onSave={(template) => {
            console.log('Template saved:', template);
            setShowEditor(false);
          }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
};

export default EmailDesigner;