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
  Redo
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
  type: 'header' | 'hero' | 'content' | 'cta' | 'footer' | 'image' | 'divider' | 'countdown' | 'newsletter_intro' | 'article_grid' | 'abandoned_cart_hero' | 'urgency_timer' | 'course_hero' | 'curriculum_preview' | 'elegant_header' | 'invitation_hero' | 'rsvp_section';
  content: any;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
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

  const renderElement = (element: EmailElement) => {
    const baseStyles = {
      backgroundColor: element.styles?.backgroundColor || '#ffffff',
      color: element.styles?.textColor || '#333333',
      fontSize: element.styles?.fontSize || '16px',
      fontWeight: element.styles?.fontWeight || 'normal',
      textAlign: element.styles?.textAlign || 'left',
      padding: element.styles?.padding || '20px',
      margin: element.styles?.margin || '0',
    };

    const isSelected = selectedElement?.id === element.id;

    switch (element.type) {
      case 'header':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ backgroundColor: element.content.backgroundColor || '#667eea', padding: '20px' }}
            onClick={() => setSelectedElement(element)}
          >
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
          </div>
        );

      case 'hero':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ 
              background: element.content.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '60px 20px',
              textAlign: 'center'
            }}
            onClick={() => setSelectedElement(element)}
          >
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
          </div>
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

      case 'article_grid':
        return (
          <div 
            key={element.id}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ padding: '30px 20px' }}
            onClick={() => setSelectedElement(element)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {element.content.articles?.map((article: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <img 
                    src={article.image || '/api/placeholder/300/200'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
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
          </div>
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
                          {selectedElement.type}
                        </Badge>
                      </div>

                      {selectedElement.type === 'content' && (
                        <div>
                          <label className="text-sm font-medium">Text Content</label>
                          <Textarea
                            value={selectedElement.content.text || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { ...selectedElement.content, text: e.target.value }
                            })}
                            className="mt-1"
                            rows={4}
                          />
                        </div>
                      )}

                      {(selectedElement.type === 'hero' || selectedElement.type === 'cta') && (
                        <div>
                          <label className="text-sm font-medium">
                            {selectedElement.type === 'hero' ? 'Title' : 'Button Text'}
                          </label>
                          <Input
                            value={selectedElement.content.title || selectedElement.content.text || ''}
                            onChange={(e) => handleElementUpdate(selectedElement.id, {
                              content: { 
                                ...selectedElement.content, 
                                [selectedElement.type === 'hero' ? 'title' : 'text']: e.target.value 
                              }
                            })}
                            className="mt-1"
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
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <MousePointer className="w-8 h-8 mx-auto mb-2" />
                    <p>Select an element to edit its properties</p>
                  </div>
                )}
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