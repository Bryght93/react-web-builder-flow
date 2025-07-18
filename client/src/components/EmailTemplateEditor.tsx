import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  Save, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet,
  Palette,
  Type,
  Image as ImageIcon,
  Link,
  MousePointer,
  Copy,
  Trash2,
  Plus,
  Settings,
  Sparkles,
  Undo,
  Redo,
  Zap,
  Star,
  Shield,
  Users,
  Play
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
}

interface EmailContent {
  subject: string;
  preheader: string;
  body: EmailElement[];
}

interface EmailElement {
  id: string;
  type: 'header' | 'hero' | 'content' | 'cta' | 'footer' | 'image' | 'divider' | 'countdown' | 'newsletter_intro' | 'article_grid' | 'abandoned_cart_hero' | 'urgency_timer' | 'course_hero' | 'curriculum_preview' | 'elegant_header' | 'invitation_hero' | 'rsvp_section' | 'welcome_hero' | 'feature_grid' | 'progress_tracker' | 'social_proof' | 'newsletter_header' | 'quote_block' | 'event_details' | 'early_bird_offer' | 'video_embed' | 'testimonial_carousel' | 'pricing_table' | 'faq_section' | 'contact_info' | 'spacer';
  content: any;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    borderWidth?: string;
    borderColor?: string;
    boxShadow?: string;
  };
}

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onClose: () => void;
}

export const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({
  template,
  onSave,
  onClose
}) => {
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate>(template);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const currentEmail = currentTemplate.content[currentEmailIndex];

  const handleElementUpdate = (elementId: string, updates: Partial<EmailElement>) => {
    const updatedTemplate = { ...currentTemplate };
    const emailIndex = currentEmailIndex;
    const elementIndex = updatedTemplate.content[emailIndex].body.findIndex(el => el.id === elementId);
    
    if (elementIndex !== -1) {
      updatedTemplate.content[emailIndex].body[elementIndex] = {
        ...updatedTemplate.content[emailIndex].body[elementIndex],
        ...updates
      };
      setCurrentTemplate(updatedTemplate);
    }
  };

  const handleSubjectUpdate = (subject: string) => {
    const updatedTemplate = { ...currentTemplate };
    updatedTemplate.content[currentEmailIndex].subject = subject;
    setCurrentTemplate(updatedTemplate);
  };

  const handlePreheaderUpdate = (preheader: string) => {
    const updatedTemplate = { ...currentTemplate };
    updatedTemplate.content[currentEmailIndex].preheader = preheader;
    setCurrentTemplate(updatedTemplate);
  };

  const addNewElement = (type: string, afterElementId?: string) => {
    const newElement: EmailElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    };

    const updatedTemplate = { ...currentTemplate };
    const emailIndex = currentEmailIndex;
    
    if (afterElementId) {
      const elementIndex = updatedTemplate.content[emailIndex].body.findIndex(el => el.id === afterElementId);
      updatedTemplate.content[emailIndex].body.splice(elementIndex + 1, 0, newElement);
    } else {
      updatedTemplate.content[emailIndex].body.push(newElement);
    }
    
    setCurrentTemplate(updatedTemplate);
    setSelectedElement(newElement);
  };

  const deleteElement = (elementId: string) => {
    const updatedTemplate = { ...currentTemplate };
    const emailIndex = currentEmailIndex;
    updatedTemplate.content[emailIndex].body = updatedTemplate.content[emailIndex].body.filter(el => el.id !== elementId);
    setCurrentTemplate(updatedTemplate);
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (elementId: string) => {
    const elementToDuplicate = currentEmail.body.find(el => el.id === elementId);
    if (elementToDuplicate) {
      const duplicatedElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`
      };
      addNewElement(duplicatedElement.type, elementId);
    }
  };

  const getDefaultContent = (type: string) => {
    const defaults: Record<string, any> = {
      header: {
        logo: '[Your Logo]',
        backgroundColor: '#667eea',
        navigation: ['Dashboard', 'Features', 'Support']
      },
      content: {
        text: 'Add your content here...'
      },
      cta: {
        text: 'Call to Action',
        backgroundColor: '#f093fb',
        textColor: '#ffffff'
      },
      welcome_hero: {
        title: 'Welcome to Our Platform',
        subtitle: 'Start your journey with us today',
        image: '/api/placeholder/500/300',
        ctaText: 'Get Started',
        ctaLink: '#'
      },
      feature_grid: {
        title: 'Key Features',
        features: [
          { icon: 'Zap', title: 'Fast', description: 'Lightning-fast performance' },
          { icon: 'Shield', title: 'Secure', description: 'Bank-level security' },
          { icon: 'Users', title: 'Collaborative', description: 'Work together seamlessly' }
        ]
      },
      progress_tracker: {
        title: 'Your Progress',
        steps: [
          { step: 1, title: 'Step 1', completed: true },
          { step: 2, title: 'Step 2', completed: false }
        ]
      },
      social_proof: {
        title: 'Trusted by thousands',
        testimonials: [
          { name: 'John D.', rating: 5, text: 'Amazing experience!' }
        ]
      },
      video_embed: {
        title: 'Watch Our Introduction',
        videoUrl: 'https://example.com/video',
        thumbnail: '/api/placeholder/500/300',
        duration: '2:30'
      },
      pricing_table: {
        title: 'Choose Your Plan',
        plans: [
          {
            name: 'Basic',
            price: '$9',
            period: '/month',
            features: ['Feature 1', 'Feature 2'],
            highlighted: false
          },
          {
            name: 'Pro',
            price: '$19',
            period: '/month',
            features: ['Everything in Basic', 'Feature 3', 'Feature 4'],
            highlighted: true
          }
        ]
      },
      faq_section: {
        title: 'Frequently Asked Questions',
        faqs: [
          { question: 'How does it work?', answer: 'It\'s simple and intuitive.' },
          { question: 'Is it secure?', answer: 'Yes, we use industry-standard security.' }
        ]
      },
      spacer: {
        height: '40px'
      },
      quote_block: {
        quote: 'Innovation is the ability to see change as an opportunity, not a threat.',
        author: 'Steve Jobs',
        backgroundColor: '#f8f9fa'
      },
      article_grid: {
        title: 'Latest Articles',
        articles: [
          {
            title: 'Article Title',
            excerpt: 'Article description...',
            image: '/api/placeholder/300/200',
            readTime: '3 min read',
            category: 'Technology'
          }
        ]
      }
    };
    return defaults[type] || {};
  };

  const getDefaultStyles = (type: string) => {
    const defaults: Record<string, any> = {
      welcome_hero: { padding: '60px 20px', textAlign: 'center' },
      feature_grid: { padding: '40px 20px' },
      progress_tracker: { padding: '30px 20px' },
      social_proof: { padding: '40px 20px', backgroundColor: '#f8f9fa' },
      video_embed: { padding: '30px 20px', textAlign: 'center' },
      pricing_table: { padding: '50px 20px' },
      faq_section: { padding: '40px 20px' },
      spacer: { padding: '0' }
    };
    return defaults[type] || { padding: '20px' };
  };

  const renderElement = (element: EmailElement) => {
    const baseStyles = {
      backgroundColor: element.styles?.backgroundColor || '#ffffff',
      color: element.styles?.textColor || '#333333',
      fontSize: element.styles?.fontSize || '16px',
      fontWeight: element.styles?.fontWeight || 'normal',
      textAlign: element.styles?.textAlign || 'left',
      padding: element.styles?.padding || '20px',
      margin: element.styles?.margin || '0',
      borderRadius: element.styles?.borderRadius || '0',
      border: element.styles?.borderWidth ? `${element.styles.borderWidth} solid ${element.styles.borderColor || '#e5e5e5'}` : 'none',
      boxShadow: element.styles?.boxShadow || 'none',
    };

    const isSelected = selectedElement?.id === element.id;

    const ElementWrapper = ({ children }: { children: React.ReactNode }) => (
      <div 
        className={`relative group cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={baseStyles}
        onClick={() => setSelectedElement(element)}
      >
        {children}
        
        {/* Element Controls Overlay */}
        <div className={`absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
          <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white" onClick={(e) => {
            e.stopPropagation();
            duplicateElement(element.id);
          }}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-white" onClick={(e) => {
            e.stopPropagation();
            deleteElement(element.id);
          }}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Add Element Button */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-blue-500 text-white border-blue-500" onClick={(e) => {
            e.stopPropagation();
            // Show element selector
          }}>
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );

    switch (element.type) {
      case 'header':
        return (
          <ElementWrapper key={element.id}>
            <div className="flex items-center justify-between">
              <div className="text-white font-bold text-xl">
                {element.content.logo || '[Your Logo]'}
              </div>
              {element.content.navigation && (
                <div className="flex space-x-4">
                  {element.content.navigation.map((item: string, index: number) => (
                    <span key={index} className="text-white hover:text-gray-200 cursor-pointer">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ElementWrapper>
        );

      case 'hero':
      case 'welcome_hero':
        return (
          <ElementWrapper key={element.id}>
            <h1 className="text-4xl font-bold mb-4" style={{ color: element.content.textColor || '#ffffff' }}>
              {element.content.title || '[Hero Title]'}
            </h1>
            <p className="text-xl mb-6" style={{ color: element.content.textColor || '#ffffff' }}>
              {element.content.subtitle || '[Hero Subtitle]'}
            </p>
            {element.content.image && (
              <img 
                src={element.content.image} 
                alt="Hero" 
                className="mx-auto mb-6 rounded-lg shadow-lg"
                style={{ maxWidth: '500px', height: 'auto' }}
              />
            )}
            {element.content.ctaText && (
              <button
                className="px-8 py-3 rounded-lg font-semibold text-lg transition-colors mt-4"
                style={{
                  backgroundColor: element.content.ctaColor || '#f093fb',
                  color: element.content.ctaTextColor || '#ffffff',
                  border: 'none'
                }}
              >
                {element.content.ctaText}
              </button>
            )}
          </ElementWrapper>
        );

      case 'content':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ ...baseStyles }}
            onClick={() => setSelectedElement(element)}
          >
            <div className="prose max-w-none">
              <p className="mb-4">
                {element.content.text || '[Content text goes here]'}
              </p>
              {element.content.items && (
                <ul className="list-disc list-inside space-y-2">
                  {element.content.items.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ padding: '30px 20px', textAlign: 'center' }}
            onClick={() => setSelectedElement(element)}
          >
            <button
              className="px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              style={{
                backgroundColor: element.content.backgroundColor || '#f093fb',
                color: element.content.textColor || '#ffffff',
                border: 'none'
              }}
            >
              {element.content.text || '[Button Text]'}
            </button>
          </div>
        );

      case 'countdown':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ 
              backgroundColor: element.content.backgroundColor || '#4ecdc4',
              padding: '30px 20px',
              textAlign: 'center'
            }}
            onClick={() => setSelectedElement(element)}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {element.content.title || 'Countdown Timer'}
            </h3>
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">23</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">14</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">32</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>
          </div>
        );

      case 'feature_grid':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-3xl font-bold text-center mb-8">
              {element.content.title || 'Key Features'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {element.content.features?.map((feature: any, index: number) => {
                const IconComponent = feature.icon === 'Zap' ? Zap : feature.icon === 'Shield' ? Shield : feature.icon === 'Users' ? Users : Zap;
                return (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </ElementWrapper>
        );

      case 'progress_tracker':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-2xl font-bold text-center mb-8">
              {element.content.title || 'Your Progress'}
            </h2>
            <div className="max-w-md mx-auto">
              {element.content.steps?.map((step: any, index: number) => (
                <div key={index} className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.step}
                  </div>
                  <span className={`font-medium ${step.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </ElementWrapper>
        );

      case 'social_proof':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-2xl font-bold text-center mb-8">
              {element.content.title || 'What Our Customers Say'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {element.content.testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                </div>
              ))}
            </div>
          </ElementWrapper>
        );

      case 'video_embed':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-2xl font-bold text-center mb-6">
              {element.content.title || 'Watch Our Video'}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img 
                  src={element.content.thumbnail || '/api/placeholder/600/400'} 
                  alt="Video thumbnail"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                {element.content.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {element.content.duration}
                  </div>
                )}
              </div>
            </div>
          </ElementWrapper>
        );

      case 'pricing_table':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-3xl font-bold text-center mb-12">
              {element.content.title || 'Choose Your Plan'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {element.content.plans?.map((plan: any, index: number) => (
                <div key={index} className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden ${
                  plan.highlighted ? 'border-blue-500 transform scale-105' : 'border-gray-200'
                }`}>
                  {plan.highlighted && (
                    <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-4">
                      {plan.price}<span className="text-lg text-gray-600">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                      plan.highlighted 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}>
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ElementWrapper>
        );

      case 'faq_section':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-3xl font-bold text-center mb-12">
              {element.content.title || 'Frequently Asked Questions'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {element.content.faqs?.map((faq: any, index: number) => (
                <div key={index} className="bg-white border rounded-lg">
                  <button className="w-full text-left px-6 py-4 font-semibold hover:bg-gray-50">
                    {faq.question}
                  </button>
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </ElementWrapper>
        );

      case 'spacer':
        return (
          <ElementWrapper key={element.id}>
            <div style={{ height: element.content.height || '40px' }} className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Spacer - {element.content.height || '40px'}</span>
            </div>
          </ElementWrapper>
        );

      case 'article_grid':
        return (
          <ElementWrapper key={element.id}>
            <h2 className="text-2xl font-bold mb-8">
              {element.content.title || 'Latest Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {element.content.articles?.map((article: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <img 
                    src={article.image || '/api/placeholder/300/200'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-blue-600 font-medium">{article.category}</span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {article.title || '[Article Title]'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {article.excerpt || '[Article excerpt]'}
                    </p>
                    <button className="text-blue-600 font-medium hover:text-blue-700">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ElementWrapper>
        );

      default:
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''} p-4 bg-gray-100 border-2 border-dashed border-gray-300`}
            onClick={() => setSelectedElement(element)}
          >
            <p className="text-gray-500 text-center">
              {element.type.charAt(0).toUpperCase() + element.type.slice(1)} Element
            </p>
          </div>
        );
    }
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '600px';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Email Template Editor</DialogTitle>
        </DialogHeader>
        <div className="flex h-[90vh]">
          {/* Left Sidebar - Tools */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Email Editor</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="emails" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="emails">Emails</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>

              <TabsContent value="emails" className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium">Email Sequence</label>
                  {currentTemplate.type === 'sequence' && (
                    <div className="mt-2 space-y-2">
                      {currentTemplate.content.map((email, index) => (
                        <div 
                          key={index}
                          className={`p-3 border rounded cursor-pointer ${
                            currentEmailIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setCurrentEmailIndex(index)}
                        >
                          <div className="text-sm font-medium">Email {index + 1}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {email.subject || '[No subject]'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Subject Line</label>
                  <Input
                    value={currentEmail?.subject || ''}
                    onChange={(e) => handleSubjectUpdate(e.target.value)}
                    placeholder="Enter subject line..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Preheader</label>
                  <Input
                    value={currentEmail?.preheader || ''}
                    onChange={(e) => handlePreheaderUpdate(e.target.value)}
                    placeholder="Enter preheader text..."
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="design" className="p-4 space-y-4">
                {selectedElement ? (
                  <div>
                    <h4 className="font-medium mb-3">Element Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Element Type</label>
                        <Badge variant="outline" className="mt-1 block w-fit">
                          {selectedElement.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      {/* Text Content Fields */}
                      {(selectedElement.type === 'content' || selectedElement.type === 'quote_block') && (
                        <div>
                          <label className="text-sm font-medium">Text Content</label>
                          <Textarea
                            value={selectedElement.content.text || selectedElement.content.quote || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { 
                                ...selectedElement.content, 
                                [selectedElement.type === 'quote_block' ? 'quote' : 'text']: e.target.value 
                              }
                            })}
                            className="mt-1"
                            rows={4}
                          />
                        </div>
                      )}

                      {/* Title Fields */}
                      {(selectedElement.type === 'hero' || selectedElement.type === 'welcome_hero' || 
                        selectedElement.type === 'feature_grid' || selectedElement.type === 'progress_tracker' ||
                        selectedElement.type === 'social_proof' || selectedElement.type === 'video_embed' ||
                        selectedElement.type === 'pricing_table' || selectedElement.type === 'faq_section') && (
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={selectedElement.content.title || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { ...selectedElement.content, title: e.target.value }
                            })}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {/* Subtitle Fields */}
                      {(selectedElement.type === 'hero' || selectedElement.type === 'welcome_hero') && (
                        <div>
                          <label className="text-sm font-medium">Subtitle</label>
                          <Input
                            value={selectedElement.content.subtitle || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { ...selectedElement.content, subtitle: e.target.value }
                            })}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {/* CTA Text */}
                      {(selectedElement.type === 'cta' || selectedElement.type === 'welcome_hero') && (
                        <div>
                          <label className="text-sm font-medium">Button Text</label>
                          <Input
                            value={selectedElement.content.ctaText || selectedElement.content.text || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { 
                                ...selectedElement.content, 
                                [selectedElement.type === 'cta' ? 'text' : 'ctaText']: e.target.value 
                              }
                            })}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {/* Spacer Height */}
                      {selectedElement.type === 'spacer' && (
                        <div>
                          <label className="text-sm font-medium">Height</label>
                          <Input
                            value={selectedElement.content.height || '40px'}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { ...selectedElement.content, height: e.target.value }
                            })}
                            className="mt-1"
                            placeholder="e.g., 40px, 2rem, 100px"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium">Background Color</label>
                        <Input
                          type="color"
                          value={selectedElement.styles?.backgroundColor || '#ffffff'}
                          onChange={(e) => handleElementUpdate(selectedElement.id, {
                            styles: { ...selectedElement.styles, backgroundColor: e.target.value }
                          })}
                          className="mt-1 h-10"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Text Color</label>
                        <Input
                          type="color"
                          value={selectedElement.styles?.textColor || '#333333'}
                          onChange={(e) => handleElementUpdate(selectedElement.id, {
                            styles: { ...selectedElement.styles, textColor: e.target.value }
                          })}
                          className="mt-1 h-10"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Font Size</label>
                        <Select
                          value={selectedElement.styles?.fontSize || '16px'}
                          onValueChange={(value) => handleElementUpdate(selectedElement.id, {
                            styles: { ...selectedElement.styles, fontSize: value }
                          })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12px">12px</SelectItem>
                            <SelectItem value="14px">14px</SelectItem>
                            <SelectItem value="16px">16px</SelectItem>
                            <SelectItem value="18px">18px</SelectItem>
                            <SelectItem value="20px">20px</SelectItem>
                            <SelectItem value="24px">24px</SelectItem>
                            <SelectItem value="32px">32px</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Padding</label>
                        <Input
                          value={selectedElement.styles?.padding || '20px'}
                          onChange={(e) => handleElementUpdate(selectedElement.id, {
                            styles: { ...selectedElement.styles, padding: e.target.value }
                          })}
                          className="mt-1"
                          placeholder="e.g., 20px, 1rem 2rem"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Border Radius</label>
                        <Input
                          value={selectedElement.styles?.borderRadius || '0'}
                          onChange={(e) => handleElementUpdate(selectedElement.id, {
                            styles: { ...selectedElement.styles, borderRadius: e.target.value }
                          })}
                          className="mt-1"
                          placeholder="e.g., 8px, 0.5rem"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <MousePointer className="w-8 h-8 mx-auto mb-2" />
                    <p>Select an element to edit its properties</p>
                  </div>
                )}

                {/* Add Element Buttons */}
                <div className="border-t pt-4">
                  <h5 className="font-medium mb-3">Add New Element</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => addNewElement('welcome_hero')}>
                      <Zap className="w-3 h-3 mr-1" />
                      Hero
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('feature_grid')}>
                      <Settings className="w-3 h-3 mr-1" />
                      Features
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('social_proof')}>
                      <Star className="w-3 h-3 mr-1" />
                      Testimonials
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('video_embed')}>
                      <Eye className="w-3 h-3 mr-1" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('pricing_table')}>
                      <Type className="w-3 h-3 mr-1" />
                      Pricing
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('faq_section')}>
                      <Plus className="w-3 h-3 mr-1" />
                      FAQ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('spacer')}>
                      <Copy className="w-3 h-3 mr-1" />
                      Spacer
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNewElement('content')}>
                      <Type className="w-3 h-3 mr-1" />
                      Text
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">AI Assistant</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Describe changes you want</label>
                      <Textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g., Make the hero section more engaging for SaaS companies..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Apply AI Changes
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-medium mb-2">Quick AI Actions</h5>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Type className="w-4 h-4 mr-2" />
                      Improve Copy
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Optimize Colors
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MousePointer className="w-4 h-4 mr-2" />
                      Enhance CTAs
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Email Preview */}
          <div className="flex-1 bg-gray-100 flex flex-col">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="font-semibold">{currentTemplate.name}</h3>
                {currentTemplate.type === 'sequence' && (
                  <Badge variant="outline">
                    Email {currentEmailIndex + 1} of {currentTemplate.emailCount}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex border rounded">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                
                <Button 
                  onClick={() => onSave(currentTemplate)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Email Canvas */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mx-auto transition-all duration-300" style={{ width: getPreviewWidth() }}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {currentEmail?.body.map(renderElement)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};