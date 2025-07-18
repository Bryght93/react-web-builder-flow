import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
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
  Plus,
  GripVertical,
  Type,
  Image as ImageIcon,
  Layout,
  Grid3X3,
  Columns,
  Video,
  Link,
  Upload,
  Trash2,
  Copy,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
  Maximize2,
  Move
} from 'lucide-react';

interface EmailElement {
  id: string;
  type: 'container' | 'text' | 'image' | 'button' | 'video' | 'divider' | 'spacer' | 'two-column' | 'three-column' | 'header' | 'footer';
  content: any;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    padding?: string;
    margin?: string;
    borderRadius?: string;
    borderWidth?: string;
    borderColor?: string;
    boxShadow?: string;
    width?: string;
    height?: string;
  };
  children?: EmailElement[];
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  elements: EmailElement[];
  settings: {
    width: number;
    backgroundColor: string;
    fontFamily: string;
    previewText: string;
  };
}

interface AdvancedEmailEditorProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onClose: () => void;
}

const AdvancedEmailEditor: React.FC<AdvancedEmailEditorProps> = ({ template, onSave, onClose }) => {
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate>(template);
  const [selectedElement, setSelectedElement] = useState<EmailElement | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVideoEmbed, setShowVideoEmbed] = useState(false);
  const [isInlineEditing, setIsInlineEditing] = useState<string | null>(null);
  const [emailLists, setEmailLists] = useState([
    { id: '1', name: 'Newsletter Subscribers', count: 1250 },
    { id: '2', name: 'VIP Customers', count: 384 },
    { id: '3', name: 'Trial Users', count: 756 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const activeIndex = currentTemplate.elements.findIndex(el => el.id === active.id);
      const overIndex = currentTemplate.elements.findIndex(el => el.id === over.id);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const newElements = arrayMove(currentTemplate.elements, activeIndex, overIndex);
        setCurrentTemplate(prev => ({ ...prev, elements: newElements }));
      }
    }

    setActiveId(null);
  };

  const addElement = (type: EmailElement['type'], afterId?: string) => {
    const newElement: EmailElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      children: type === 'container' || type === 'two-column' || type === 'three-column' ? [] : undefined
    };

    setCurrentTemplate(prev => {
      const newElements = [...prev.elements];
      if (afterId) {
        const index = newElements.findIndex(el => el.id === afterId);
        newElements.splice(index + 1, 0, newElement);
      } else {
        newElements.push(newElement);
      }
      return { ...prev, elements: newElements };
    });

    setSelectedElement(newElement);
  };

  const updateElement = (elementId: string, updates: Partial<EmailElement>) => {
    setCurrentTemplate(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));

    if (selectedElement?.id === elementId) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteElement = (elementId: string) => {
    setCurrentTemplate(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));

    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (elementId: string) => {
    const element = currentTemplate.elements.find(el => el.id === elementId);
    if (element) {
      const duplicated = {
        ...element,
        id: `${element.type}-${Date.now()}`
      };
      addElement(duplicated.type as any);
      // Update the newly added element with the duplicated content
      setTimeout(() => {
        updateElement(duplicated.id, { content: element.content, styles: element.styles });
      }, 100);
    }
  };

  const getDefaultContent = (type: EmailElement['type']) => {
    const defaults: Record<string, any> = {
      container: { elements: [] },
      text: { html: '<p>Click to edit this text</p>' },
      image: { src: '/api/placeholder/400/300', alt: 'Image', width: '100%' },
      button: { text: 'Call to Action', href: '#', backgroundColor: '#007bff', textColor: '#ffffff' },
      video: { 
        type: 'embed', 
        url: '', 
        thumbnail: '/api/placeholder/600/400', 
        title: 'Video Title' 
      },
      divider: { style: 'solid', color: '#e5e5e5', thickness: 1 },
      spacer: { height: 40 },
      'two-column': { 
        leftColumn: { elements: [] }, 
        rightColumn: { elements: [] },
        ratio: '50/50'
      },
      'three-column': { 
        columns: [{ elements: [] }, { elements: [] }, { elements: [] }],
        ratio: '33/33/33'
      },
      header: { 
        logo: { src: '/api/placeholder/150/50', alt: 'Logo' },
        navigation: [],
        backgroundColor: '#ffffff'
      },
      footer: {
        companyInfo: 'Your Company Name',
        address: '123 Street, City, State 12345',
        unsubscribeText: 'Unsubscribe from this list',
        socialLinks: []
      }
    };
    return defaults[type] || {};
  };

  const getDefaultStyles = (type: EmailElement['type']) => {
    const defaults: Record<string, any> = {
      container: { padding: '20px', backgroundColor: '#ffffff' },
      text: { fontSize: '16px', textColor: '#333333', padding: '10px 0' },
      image: { padding: '10px 0', textAlign: 'center' },
      button: { 
        padding: '12px 24px', 
        borderRadius: '6px', 
        fontSize: '16px',
        fontWeight: '600',
        textAlign: 'center',
        margin: '10px 0'
      },
      video: { textAlign: 'center', padding: '20px 0' },
      divider: { margin: '20px 0' },
      spacer: { height: '40px' },
      'two-column': { padding: '20px 0' },
      'three-column': { padding: '20px 0' },
      header: { padding: '20px', backgroundColor: '#ffffff' },
      footer: { 
        padding: '30px 20px', 
        backgroundColor: '#f8f9fa', 
        fontSize: '14px',
        textColor: '#666666',
        textAlign: 'center'
      }
    };
    return defaults[type] || { padding: '10px 0' };
  };

  const handleImageUpload = (file: File) => {
    if (!selectedElement || selectedElement.type !== 'image') return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateElement(selectedElement.id, {
          content: { 
            ...selectedElement.content, 
            src: e.target.result as string 
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const startInlineEdit = (elementId: string) => {
    setIsInlineEditing(elementId);
  };

  const finishInlineEdit = () => {
    setIsInlineEditing(null);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Advanced Email Editor</DialogTitle>
          <DialogDescription>
            Create and edit professional email templates with drag-and-drop functionality
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full">
          {/* Left Sidebar - Elements & Tools */}
          <div className="w-80 bg-gray-50 border-r flex flex-col">
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold text-lg">Email Editor</h3>
              <p className="text-sm text-gray-600">Drag elements to build your email</p>
            </div>

            <Tabs defaultValue="elements" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="elements">Elements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="flex-1 p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Layout</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <DraggableElement type="container" icon={<Layout className="w-4 h-4" />} label="Container" />
                    <DraggableElement type="two-column" icon={<Columns className="w-4 h-4" />} label="2 Columns" />
                    <DraggableElement type="three-column" icon={<Grid3X3 className="w-4 h-4" />} label="3 Columns" />
                    <DraggableElement type="spacer" icon={<Maximize2 className="w-4 h-4" />} label="Spacer" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Content</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <DraggableElement type="text" icon={<Type className="w-4 h-4" />} label="Text" />
                    <DraggableElement type="image" icon={<ImageIcon className="w-4 h-4" />} label="Image" />
                    <DraggableElement type="button" icon={<Link className="w-4 h-4" />} label="Button" />
                    <DraggableElement type="video" icon={<Video className="w-4 h-4" />} label="Video" />
                    <DraggableElement type="divider" icon={<div className="w-4 h-0.5 bg-gray-400" />} label="Divider" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Structural</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <DraggableElement type="header" icon={<Layout className="w-4 h-4" />} label="Header" />
                    <DraggableElement type="footer" icon={<Layout className="w-4 h-4" />} label="Footer" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="flex-1 p-4 space-y-4">
                {selectedElement ? (
                  <ElementSettingsInline 
                    element={selectedElement} 
                    onUpdate={(updates) => updateElement(selectedElement.id, updates)}
                    onImageUpload={handleImageUpload}
                  />
                ) : (
                  <EmailSettingsInline 
                    template={currentTemplate}
                    onUpdate={(updates) => setCurrentTemplate(prev => ({ ...prev, ...updates }))}
                  />
                )}
              </TabsContent>

              <TabsContent value="send" className="flex-1 p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Email Lists</h4>
                  <div className="space-y-2">
                    {emailLists.map(list => (
                      <div key={list.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{list.name}</div>
                          <div className="text-sm text-gray-600">{list.count} subscribers</div>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Schedule</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Send now" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send now</SelectItem>
                      <SelectItem value="schedule">Schedule for later</SelectItem>
                      <SelectItem value="draft">Save as draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" size="lg">
                  Send Campaign
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Toolbar */}
            <div className="h-16 bg-white border-b flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <Input
                  value={currentTemplate.subject}
                  onChange={(e) => setCurrentTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Email subject line"
                  className="w-80"
                />
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
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

                <Button variant="outline" onClick={() => onSave(currentTemplate)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>

                <Button variant="ghost" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-gray-100 p-6 overflow-auto">
              <div className={`mx-auto bg-white shadow-lg ${
                previewMode === 'desktop' ? 'max-w-2xl' :
                previewMode === 'tablet' ? 'max-w-lg' : 'max-w-sm'
              }`}>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={currentTemplate.elements.map(el => el.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {currentTemplate.elements.map((element) => (
                      <SortableEmailElementInline
                        key={element.id}
                        element={element}
                        isSelected={selectedElement?.id === element.id}
                        onSelect={setSelectedElement}
                        onUpdate={(updates) => updateElement(element.id, updates)}
                        onDelete={() => deleteElement(element.id)}
                        onDuplicate={() => duplicateElement(element.id)}
                        onStartInlineEdit={() => startInlineEdit(element.id)}
                        isInlineEditing={isInlineEditing === element.id}
                        onFinishInlineEdit={finishInlineEdit}
                      />
                    ))}
                  </SortableContext>

                  <DragOverlay>
                    {activeId ? (
                      <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded">
                        Moving element...
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>

                {/* Drop Zone for new elements */}
                <DropZoneInline onDrop={(type) => addElement(type)} />
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
};

// Draggable Element Component for Sidebar
const DraggableElement: React.FC<{
  type: EmailElement['type'];
  icon: React.ReactNode;
  label: string;
}> = ({ type, icon, label }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: { type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border rounded-lg cursor-grab hover:bg-gray-100 flex flex-col items-center space-y-2 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {icon}
      <span className="text-xs font-medium text-center">{label}</span>
    </div>
  );
};

// Inline SortableEmailElement Component
const SortableEmailElementInline: React.FC<{
  element: EmailElement;
  isSelected: boolean;
  onSelect: (element: EmailElement) => void;
  onUpdate: (updates: Partial<EmailElement>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onStartInlineEdit: () => void;
  isInlineEditing: boolean;
  onFinishInlineEdit: () => void;
}> = ({ 
  element, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete, 
  onDuplicate,
  onStartInlineEdit,
  isInlineEditing,
  onFinishInlineEdit
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleContentChange = (newContent: any) => {
    onUpdate({ content: newContent });
  };

  const handleStyleChange = (newStyles: Partial<EmailElement['styles']>) => {
    onUpdate({ styles: { ...element.styles, ...newStyles } });
  };

  const elementStyles = {
    backgroundColor: element.styles.backgroundColor,
    color: element.styles.textColor,
    fontSize: element.styles.fontSize,
    fontWeight: element.styles.fontWeight,
    textAlign: element.styles.textAlign,
    padding: element.styles.padding || '10px',
    margin: element.styles.margin,
    borderRadius: element.styles.borderRadius,
    border: element.styles.borderWidth ? `${element.styles.borderWidth} solid ${element.styles.borderColor || '#e5e5e5'}` : 'none',
    boxShadow: element.styles.boxShadow,
    width: element.styles.width,
    height: element.styles.height,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'opacity-50' : ''} ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element);
      }}
    >
      {/* Element Controls */}
      <div className={`absolute top-2 right-2 flex space-x-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity ${
        isSelected ? 'opacity-100' : ''
      }`}>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-white shadow-sm"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Element Content */}
      <div style={elementStyles}>
        {element.type === 'text' && (
          <div className="min-h-[40px] cursor-pointer">
            {isInlineEditing ? (
              <Textarea
                value={element.content.html || ''}
                onChange={(e) => handleContentChange({ html: e.target.value })}
                className="w-full min-h-[80px] resize-none"
                autoFocus
                onBlur={onFinishInlineEdit}
              />
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: element.content.html || 'Click to edit text' }}
                onClick={onStartInlineEdit}
                className="prose prose-sm max-w-none"
              />
            )}
          </div>
        )}

        {element.type === 'image' && (
          <div className="text-center">
            <img
              src={element.content.src || '/api/placeholder/400/300'}
              alt={element.content.alt || 'Image'}
              style={{ 
                width: element.content.width || '100%',
                height: element.content.height || 'auto',
                borderRadius: element.styles.borderRadius
              }}
              className="max-w-full h-auto"
            />
          </div>
        )}

        {element.type === 'button' && (
          <div className="text-center">
            <button
              style={{
                backgroundColor: element.content.backgroundColor || '#007bff',
                color: element.content.textColor || '#ffffff',
                padding: element.styles.padding || '12px 24px',
                borderRadius: element.styles.borderRadius || '6px',
                border: 'none',
                fontSize: element.styles.fontSize || '16px',
                fontWeight: element.styles.fontWeight || '600',
                cursor: 'pointer',
              }}
            >
              {element.content.text || 'Button Text'}
            </button>
          </div>
        )}

        {element.type === 'spacer' && (
          <div 
            style={{ height: `${element.content.height || 40}px` }}
            className="border-2 border-dashed border-gray-300 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          >
            <span className="text-xs text-gray-500">Spacer - {element.content.height || 40}px</span>
          </div>
        )}

        {element.type === 'two-column' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Left Column</div>
            </div>
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Right Column</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline ElementSettings Component
const ElementSettingsInline: React.FC<{
  element: EmailElement;
  onUpdate: (updates: Partial<EmailElement>) => void;
  onImageUpload: (file: File) => void;
}> = ({ element, onUpdate, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentUpdate = (field: string, value: any) => {
    onUpdate({
      content: { ...element.content, [field]: value }
    });
  };

  const handleStyleUpdate = (field: string, value: any) => {
    onUpdate({
      styles: { ...element.styles, [field]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-3">Element: {element.type.replace('-', ' ').toUpperCase()}</h4>
      </div>

      {/* Content Settings */}
      <div className="space-y-3">
        <h5 className="font-medium text-sm">Content</h5>

        {element.type === 'text' && (
          <div>
            <label className="text-sm font-medium">Text Content</label>
            <Textarea
              value={element.content.html || ''}
              onChange={(e) => handleContentUpdate('html', e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
        )}

        {element.type === 'image' && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Image</label>
              <div className="mt-1 flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Input
                  placeholder="Or paste URL"
                  value={element.content.src || ''}
                  onChange={(e) => handleContentUpdate('src', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {element.type === 'button' && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={element.content.text || ''}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Link URL</label>
              <Input
                value={element.content.href || ''}
                onChange={(e) => handleContentUpdate('href', e.target.value)}
                className="mt-1"
                placeholder="https://example.com"
              />
            </div>
          </div>
        )}

        {element.type === 'spacer' && (
          <div>
            <label className="text-sm font-medium">Height (px)</label>
            <Slider
              value={[element.content.height || 40]}
              onValueChange={([value]) => handleContentUpdate('height', value)}
              max={200}
              min={10}
              step={10}
              className="mt-2"
            />
            <div className="text-sm text-gray-600 mt-1">{element.content.height || 40}px</div>
          </div>
        )}
      </div>

      {/* Style Settings */}
      <div className="space-y-3 border-t pt-4">
        <h5 className="font-medium text-sm">Styling</h5>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Background</label>
            <Input
              type="color"
              value={element.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
              className="mt-1 h-8"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Text Color</label>
            <Input
              type="color"
              value={element.styles.textColor || '#333333'}
              onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
              className="mt-1 h-8"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Padding</label>
          <Input
            value={element.styles.padding || '10px'}
            onChange={(e) => handleStyleUpdate('padding', e.target.value)}
            className="mt-1"
            placeholder="e.g., 10px, 10px 20px"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Border Radius</label>
          <Input
            value={element.styles.borderRadius || '0px'}
            onChange={(e) => handleStyleUpdate('borderRadius', e.target.value)}
            className="mt-1"
            placeholder="e.g., 8px"
          />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onImageUpload(file);
        }}
        className="hidden"
      />
    </div>
  );
};

// Inline EmailSettings Component
const EmailSettingsInline: React.FC<{
  template: any;
  onUpdate: (updates: any) => void;
}> = ({ template, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-3">Email Settings</h4>
      </div>

      <div>
        <label className="text-sm font-medium">Subject Line</label>
        <Input
          value={template.subject || ''}
          onChange={(e) => onUpdate({ subject: e.target.value })}
          className="mt-1"
          placeholder="Enter email subject"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Preview Text</label>
        <Input
          value={template.preheader || ''}
          onChange={(e) => onUpdate({ preheader: e.target.value })}
          className="mt-1"
          placeholder="Text that appears in email preview"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Background Color</label>
        <Input
          type="color"
          value={template.settings?.backgroundColor || '#ffffff'}
          onChange={(e) => onUpdate({ 
            settings: { ...template.settings, backgroundColor: e.target.value }
          })}
          className="mt-1 h-10"
        />
      </div>
    </div>
  );
};

// Inline DropZone Component
const DropZoneInline: React.FC<{
  onDrop: (type: EmailElement['type']) => void;
}> = ({ onDrop }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'email-drop-zone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[100px] border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      <div className="text-center text-gray-500">
        <Plus className="w-8 h-8 mx-auto mb-2" />
        <p>Drag elements here to add to your email</p>
      </div>
    </div>
  );
};

export default AdvancedEmailEditor;