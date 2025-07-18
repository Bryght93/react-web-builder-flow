import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import AdvancedEmailEditor from './AdvancedEmailEditor';
import { 
  Mail, 
  Zap, 
  Plus, 
  Eye, 
  Edit, 
  Copy, 
  Trash2,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Palette,
  Layout,
  Image as ImageIcon,
  Type,
  MousePointer
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  type: 'single' | 'sequence';
  emailCount: number;
  content: EmailContent[];
  isFullyDesigned: boolean;
  thumbnail: string;
  description: string;
  features: string[];
  conversionRate?: number;
  popularity?: number;
}

interface EmailContent {
  subject: string;
  preheader: string;
  body: EmailElement[];
}

interface EmailElement {
  id: string;
  type: string;
  content: any;
  styles?: any;
}

const EmailDesigner: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const mockTemplates: EmailTemplate[] = [
      {
        id: '1',
        name: 'SaaS Welcome Series',
        category: 'welcome',
        industry: 'saas',
        type: 'sequence',
        emailCount: 5,
        isFullyDesigned: true,
        thumbnail: '/api/placeholder/400/300',
        description: 'Complete onboarding sequence for SaaS products',
        features: ['Responsive Design', 'A/B Testing Ready', 'CTA Optimization'],
        conversionRate: 24.5,
        popularity: 95,
        content: [
          {
            subject: 'Welcome to [PRODUCT_NAME] - Let\'s get you started!',
            preheader: 'Your account is ready. Here\'s what to do next...',
            body: [
              {
                id: 'header-1',
                type: 'header',
                content: {
                  logo: '[Your Logo]',
                  backgroundColor: '#667eea',
                  navigation: ['Dashboard', 'Features', 'Support']
                }
              },
              {
                id: 'hero-1',
                type: 'welcome_hero',
                content: {
                  title: 'Welcome to the future of [INDUSTRY]',
                  subtitle: 'You\'re just minutes away from transforming your workflow',
                  image: '/api/placeholder/500/300',
                  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  textColor: '#ffffff',
                  ctaText: 'Complete Your Setup',
                  ctaLink: '#'
                }
              },
              {
                id: 'feature-grid-1',
                type: 'feature_grid',
                content: {
                  title: 'What you can achieve in your first week',
                  features: [
                    {
                      icon: 'Zap',
                      title: 'Instant Setup',
                      description: 'Get up and running in under 5 minutes'
                    },
                    {
                      icon: 'Users',
                      title: 'Team Collaboration',
                      description: 'Invite your team and work together seamlessly'
                    },
                    {
                      icon: 'TrendingUp',
                      title: 'Real-time Analytics',
                      description: 'Track your progress with detailed insights'
                    }
                  ]
                }
              },
              {
                id: 'progress-tracker-1',
                type: 'progress_tracker',
                content: {
                  title: 'Your Setup Progress',
                  steps: [
                    { step: 1, title: 'Account Created', completed: true },
                    { step: 2, title: 'Complete Profile', completed: false },
                    { step: 3, title: 'Invite Team', completed: false },
                    { step: 4, title: 'First Project', completed: false }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'E-commerce Abandoned Cart',
        category: 'ecommerce',
        industry: 'retail',
        type: 'sequence',
        emailCount: 3,
        isFullyDesigned: true,
        thumbnail: '/api/placeholder/400/300',
        description: 'Recover lost sales with this proven cart recovery sequence',
        features: ['Product Showcase', 'Urgency Timers', 'Social Proof'],
        conversionRate: 31.2,
        popularity: 88,
        content: [
          {
            subject: 'You left something behind...',
            preheader: 'Complete your purchase and save 10%',
            body: [
              {
                id: 'header-2',
                type: 'header',
                content: {
                  logo: '[Your Store]',
                  backgroundColor: '#ff6b6b'
                }
              },
              {
                id: 'cart-hero-1',
                type: 'abandoned_cart_hero',
                content: {
                  title: 'Don\'t let it slip away',
                  subtitle: 'Your items are waiting for you',
                  cartItems: [
                    {
                      name: 'Premium Headphones',
                      image: '/api/placeholder/100/100',
                      price: '$299.99',
                      quantity: 1
                    }
                  ],
                  totalAmount: '$299.99',
                  discountCode: 'SAVE10'
                }
              },
              {
                id: 'urgency-1',
                type: 'urgency_timer',
                content: {
                  title: 'Limited Time Offer',
                  subtitle: 'Save 10% if you complete your order within:',
                  hours: 23,
                  minutes: 45,
                  backgroundColor: '#ff6b6b'
                }
              },
              {
                id: 'social-proof-1',
                type: 'social_proof',
                content: {
                  title: 'Join 50,000+ happy customers',
                  testimonials: [
                    {
                      name: 'Sarah J.',
                      rating: 5,
                      text: 'Best purchase I\'ve made this year!'
                    },
                    {
                      name: 'Mike R.',
                      rating: 5,
                      text: 'Outstanding quality and fast shipping'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: '3',
        name: 'Newsletter Modern',
        category: 'newsletter',
        industry: 'media',
        type: 'single',
        emailCount: 1,
        isFullyDesigned: true,
        thumbnail: '/api/placeholder/400/300',
        description: 'Clean, modern newsletter template for content creators',
        features: ['Article Grid', 'Reading Time', 'Social Sharing'],
        conversionRate: 18.7,
        popularity: 76,
        content: [
          {
            subject: 'This week in [INDUSTRY]: Top stories and insights',
            preheader: 'The most important updates you need to know',
            body: [
              {
                id: 'newsletter-header-1',
                type: 'newsletter_header',
                content: {
                  logo: '[Publication Name]',
                  issueNumber: 'Issue #47',
                  date: 'March 15, 2024',
                  backgroundColor: '#2c3e50'
                }
              },
              {
                id: 'newsletter-intro-1',
                type: 'newsletter_intro',
                content: {
                  greeting: 'Hello [FIRST_NAME],',
                  text: 'This week has been packed with exciting developments in [INDUSTRY]. Here are the stories that caught our attention and why they matter to you.',
                  author: 'Sarah Thompson',
                  authorTitle: 'Chief Editor'
                }
              },
              {
                id: 'article-grid-1',
                type: 'article_grid',
                content: {
                  title: 'Top Stories This Week',
                  articles: [
                    {
                      title: 'The Future of AI in Business',
                      excerpt: 'How artificial intelligence is reshaping industries and what it means for your business strategy.',
                      image: '/api/placeholder/300/200',
                      readTime: '5 min read',
                      category: 'Technology'
                    },
                    {
                      title: 'Marketing Trends to Watch',
                      excerpt: 'The latest marketing strategies that are driving results for leading brands.',
                      image: '/api/placeholder/300/200',
                      readTime: '3 min read',
                      category: 'Marketing'
                    }
                  ]
                }
              },
              {
                id: 'quote-block-1',
                type: 'quote_block',
                content: {
                  quote: 'Innovation is the ability to see change as an opportunity, not a threat.',
                  author: 'Steve Jobs',
                  backgroundColor: '#f8f9fa'
                }
              }
            ]
          }
        ]
      },
      {
        id: '4',
        name: 'Event Invitation Elegant',
        category: 'events',
        industry: 'events',
        type: 'single',
        emailCount: 1,
        isFullyDesigned: true,
        thumbnail: '/api/placeholder/400/300',
        description: 'Sophisticated event invitation template',
        features: ['RSVP Integration', 'Calendar Widget', 'Location Map'],
        conversionRate: 42.1,
        popularity: 91,
        content: [
          {
            subject: 'You\'re invited to an exclusive event',
            preheader: 'Join us for an unforgettable evening',
            body: [
              {
                id: 'elegant-header-1',
                type: 'elegant_header',
                content: {
                  logo: '[Event Organizer]',
                  backgroundColor: '#8e44ad',
                  pattern: 'geometric'
                }
              },
              {
                id: 'invitation-hero-1',
                type: 'invitation_hero',
                content: {
                  title: 'Annual Innovation Summit 2024',
                  subtitle: 'Shaping the Future Together',
                  date: 'April 15, 2024',
                  time: '6:00 PM - 10:00 PM',
                  venue: 'Grand Ballroom, Marriott Hotel',
                  image: '/api/placeholder/600/400',
                  backgroundColor: 'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)'
                }
              },
              {
                id: 'event-details-1',
                type: 'event_details',
                content: {
                  agenda: [
                    { time: '6:00 PM', activity: 'Registration & Welcome Drinks' },
                    { time: '7:00 PM', activity: 'Keynote: The Future of Innovation' },
                    { time: '8:30 PM', activity: 'Panel Discussion' },
                    { time: '9:30 PM', activity: 'Networking & Closing' }
                  ],
                  speakers: [
                    {
                      name: 'Dr. Jane Smith',
                      title: 'Chief Innovation Officer',
                      company: 'TechCorp',
                      image: '/api/placeholder/100/100'
                    }
                  ]
                }
              },
              {
                id: 'rsvp-section-1',
                type: 'rsvp_section',
                content: {
                  title: 'Reserve Your Spot',
                  subtitle: 'Limited seats available',
                  ctaText: 'RSVP Now',
                  deadline: 'April 10, 2024',
                  backgroundColor: '#e74c3c'
                }
              }
            ]
          }
        ]
      },
      {
        id: '5',
        name: 'Course Launch Sequence',
        category: 'education',
        industry: 'education',
        type: 'sequence',
        emailCount: 7,
        isFullyDesigned: true,
        thumbnail: '/api/placeholder/400/300',
        description: 'Complete course launch sequence with early bird offers',
        features: ['Video Embeds', 'Progress Bars', 'Student Testimonials'],
        conversionRate: 28.9,
        popularity: 84,
        content: [
          {
            subject: 'Your journey to mastery begins now',
            preheader: 'Welcome to [COURSE_NAME] - Early bird pricing inside',
            body: [
              {
                id: 'course-header-1',
                type: 'header',
                content: {
                  logo: '[Academy Name]',
                  backgroundColor: '#27ae60'
                }
              },
              {
                id: 'course-hero-1',
                type: 'course_hero',
                content: {
                  title: 'Master [SKILL] in 30 Days',
                  subtitle: 'From beginner to expert with our proven system',
                  instructor: 'John Smith',
                  instructorTitle: 'Industry Expert with 15+ years experience',
                  studentCount: '12,347',
                  rating: 4.9,
                  image: '/api/placeholder/500/300',
                  backgroundColor: '#27ae60'
                }
              },
              {
                id: 'curriculum-1',
                type: 'curriculum_preview',
                content: {
                  title: 'What You\'ll Learn',
                  modules: [
                    {
                      week: 1,
                      title: 'Foundations',
                      lessons: ['Introduction to [SKILL]', 'Core Concepts', 'First Project'],
                      duration: '3 hours'
                    },
                    {
                      week: 2,
                      title: 'Intermediate Techniques',
                      lessons: ['Advanced Methods', 'Real-world Applications', 'Case Studies'],
                      duration: '4 hours'
                    },
                    {
                      week: 3,
                      title: 'Expert Level',
                      lessons: ['Professional Strategies', 'Industry Secrets', 'Portfolio Project'],
                      duration: '5 hours'
                    }
                  ]
                }
              },
              {
                id: 'early-bird-1',
                type: 'early_bird_offer',
                content: {
                  title: 'Early Bird Special',
                  originalPrice: '$497',
                  earlyPrice: '$297',
                  savings: '$200',
                  deadline: '48 hours',
                  benefits: ['Lifetime Access', 'Private Community', '1-on-1 Coaching Call'],
                  backgroundColor: '#f39c12'
                }
              }
            ]
          }
        ]
      }
    ];

    setTemplates(mockTemplates);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const handleEditTemplate = (template: EmailTemplate) => {
    // Convert to advanced editor format
    const advancedTemplate = {
      id: template.id,
      name: template.name,
      subject: template.content[0]?.subject || '',
      preheader: template.content[0]?.preheader || '',
      elements: template.content[0]?.body?.map(element => ({
        id: element.id,
        type: mapElementType(element.type as string),
        content: convertElementContent(element.content, element.type as string),
        styles: element.styles || {},
        children: undefined
      })) || [],
      settings: {
        width: 600,
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        previewText: template.content[0]?.preheader || ''
      }
    };
    
    setSelectedTemplate(advancedTemplate as any);
    setIsEditorOpen(true);
  };

  const mapElementType = (oldType: string): any => {
    const typeMap: Record<string, string> = {
      'content': 'text',
      'cta': 'button',
      'hero': 'text',
      'welcome_hero': 'container',
      'header': 'header',
      'footer': 'footer',
      'feature_grid': 'container',
      'social_proof': 'container',
      'video_embed': 'video',
      'pricing_table': 'container',
      'spacer': 'spacer',
      'divider': 'divider'
    };
    return typeMap[oldType] || 'text';
  };

  const convertElementContent = (content: any, type: string) => {
    switch (type) {
      case 'content':
        return { html: content.text || 'Click to edit text' };
      case 'cta':
        return { 
          text: content.text || 'Button', 
          href: content.link || '#',
          backgroundColor: content.backgroundColor || '#007bff',
          textColor: content.textColor || '#ffffff'
        };
      case 'welcome_hero':
        return { 
          html: `<h1>${content.title || 'Welcome'}</h1><p>${content.subtitle || 'Subtitle'}</p>` 
        };
      case 'video_embed':
        return {
          url: content.videoUrl || '',
          thumbnail: content.thumbnail || '/api/placeholder/600/400',
          title: content.title || 'Video'
        };
      case 'spacer':
        return { height: content.height || 40 };
      case 'divider':
        return { style: 'solid', color: '#e5e5e5', thickness: 1 };
      default:
        return content;
    }
  };

  const handleSaveTemplate = (updatedTemplate: EmailTemplate) => {
    setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    setIsEditorOpen(false);
    setSelectedTemplate(null);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'welcome', label: 'Welcome Series' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'events', label: 'Events' },
    { value: 'education', label: 'Education' },
    { value: 'promotional', label: 'Promotional' }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'saas', label: 'SaaS & Technology' },
    { value: 'retail', label: 'E-commerce & Retail' },
    { value: 'media', label: 'Media & Publishing' },
    { value: 'events', label: 'Events & Hospitality' },
    { value: 'education', label: 'Education & Training' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Designer</h1>
              <p className="text-gray-600">Create stunning, high-converting email campaigns with AI-powered templates</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Template
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    {template.type === 'sequence' ? `${template.emailCount} Emails` : 'Single Email'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  {template.conversionRate && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {template.conversionRate}% CVR
                    </Badge>
                  )}
                  <div className="flex items-center bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{template.popularity}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleEditTemplate(template)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or create a custom template</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Template
            </Button>
          </div>
        )}
      </div>

      {/* Advanced Email Template Editor */}
      {isEditorOpen && selectedTemplate && (
        <AdvancedEmailEditor
          template={selectedTemplate as any}
          onSave={(updatedTemplate: any) => {
            // Convert back to old format if needed
            handleSaveTemplate(updatedTemplate);
          }}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedTemplate(null);
          }}
        />
      )}
    </div>
  );
};

export default EmailDesigner;