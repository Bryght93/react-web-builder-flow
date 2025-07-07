import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Type,
  Image as ImageIcon,
  Layout,
  Square,
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  Undo,
  Redo,
  Copy,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  X
} from 'lucide-react';

interface PageElement {
  id: string;
  type: 'heading' | 'text' | 'image' | 'button' | 'form' | 'testimonial' | 'video';
  content: {
    text?: string;
    src?: string;
    alt?: string;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    align?: 'left' | 'center' | 'right';
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline';
    padding?: string;
    margin?: string;
    borderRadius?: string;
    border?: string;
    width?: string;
    height?: string;
    link?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    fields?: string[];
    button?: string;
    title?: string;
    quote?: string;
    author?: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
  };
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

interface AdvancedPageBuilderProps {
  initialElements?: PageElement[];
  onSave: (elements: PageElement[]) => void;
  onClose: () => void;
}

export default function AdvancedPageBuilder({ 
  initialElements = [], 
  onSave, 
  onClose 
}: AdvancedPageBuilderProps) {
  const [elements, setElements] = useState<PageElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<PageElement[][]>([initialElements]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addToHistory = (newElements: PageElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };

  const addElement = (type: PageElement['type']) => {
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      position: { x: 50, y: 50 },
      size: { width: 300, height: 100 }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);

    toast({
      title: "Element Added",
      description: `${type} element added to the canvas`
    });
  };

  const getDefaultContent = (type: PageElement['type']) => {
    switch (type) {
      case 'heading':
        return { text: 'Your Headline Here', level: 'h1' as const, align: 'center' as const, color: '#000000' };
      case 'text':
        return { text: 'Your text content goes here...', align: 'left' as const, color: '#333333' };
      case 'image':
        return { src: 'https://via.placeholder.com/300x200', alt: 'Placeholder image', width: '100%' };
      case 'button':
        return { text: 'Click Here', variant: 'primary' as const, size: 'medium' as const, backgroundColor: '#3b82f6', color: '#ffffff' };
      case 'form':
        return { title: 'Contact Form', fields: ['name', 'email'], button: 'Submit' };
      case 'testimonial':
        return { quote: 'This product changed my life!', author: 'John Doe', role: 'Customer', rating: 5 };
      case 'video':
        return { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', width: '100%', height: '315px' };
      default:
        return {};
    }
  };

  const updateElement = (id: string, updates: Partial<PageElement>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);

    toast({
      title: "Element Deleted",
      description: "Element removed from canvas"
    });
  };

  const duplicateElement = (element: PageElement) => {
    const newElement: PageElement = {
      ...element,
      id: `element-${Date.now()}`,
      position: { x: element.position.x + 20, y: element.position.y + 20 }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);

    toast({
      title: "Element Duplicated",
      description: "Element copied successfully"
    });
  };

  const handleMouseDown = (e: React.MouseEvent, element: PageElement) => {
    e.preventDefault();
    setSelectedElement(element);
    setIsDragging(true);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.position.x,
        y: e.clientY - rect.top - element.position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      updateElement(selectedElement.id, {
        position: { x: Math.max(0, newX), y: Math.max(0, newY) }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderElement = (element: PageElement) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      minHeight: element.size.height,
      cursor: isDragging ? 'grabbing' : 'grab',
      border: selectedElement?.id === element.id ? '2px solid #3b82f6' : '1px solid transparent',
      borderRadius: '4px',
      padding: '8px',
      backgroundColor: element.content.backgroundColor || 'transparent'
    };

    let content;
    switch (element.type) {
      case 'heading':
        const HeadingTag = element.content.level || 'h1';
        content = (
          <HeadingTag style={{
            textAlign: element.content.align as any,
            color: element.content.color,
            fontWeight: element.content.fontWeight,
            fontSize: element.content.fontSize,
            margin: 0
          }}>
            {element.content.text}
          </HeadingTag>
        );
        break;

      case 'text':
        content = (
          <p style={{
            textAlign: element.content.align as any,
            color: element.content.color,
            fontWeight: element.content.fontWeight,
            fontStyle: element.content.fontStyle,
            textDecoration: element.content.textDecoration,
            fontSize: element.content.fontSize,
            margin: 0
          }}>
            {element.content.text}
          </p>
        );
        break;

      case 'image':
        content = (
          <img 
            src={element.content.src} 
            alt={element.content.alt}
            style={{
              width: element.content.width || '100%',
              height: element.content.height || 'auto',
              borderRadius: element.content.borderRadius,
              border: element.content.border
            }}
          />
        );
        break;

      case 'button':
        content = (
          <button style={{
            backgroundColor: element.content.backgroundColor,
            color: element.content.color,
            padding: element.content.size === 'large' ? '12px 24px' : element.content.size === 'small' ? '6px 12px' : '8px 16px',
            border: element.content.variant === 'outline' ? `2px solid ${element.content.backgroundColor}` : 'none',
            borderRadius: element.content.borderRadius || '6px',
            fontSize: element.content.fontSize,
            fontWeight: element.content.fontWeight,
            cursor: 'pointer',
            width: '100%'
          }}>
            {element.content.text}
          </button>
        );
        break;

      case 'form':
        content = (
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>{element.content.title}</h3>
            {element.content.fields?.map((field, index) => (
              <input
                key={index}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '4px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            ))}
            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '8px',
              cursor: 'pointer'
            }}>
              {element.content.button}
            </button>
          </div>
        );
        break;

      case 'testimonial':
        content = (
          <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              {[...Array(element.content.rating || 5)].map((_, i) => (
                <span key={i} style={{ color: '#fbbf24' }}>★</span>
              ))}
            </div>
            <p style={{ fontStyle: 'italic', margin: '0 0 12px 0' }}>"{element.content.quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {element.content.avatar && (
                <img 
                  src={element.content.avatar} 
                  alt={element.content.author}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px' }}
                />
              )}
              <div>
                <div style={{ fontWeight: 'bold' }}>{element.content.author}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{element.content.role}</div>
              </div>
            </div>
          </div>
        );
        break;

      default:
        content = <div>Unknown element type</div>;
    }

    return (
      <div
        key={element.id}
        style={style}
        onMouseDown={(e) => handleMouseDown(e, element)}
        onClick={() => setSelectedElement(element)}
      >
        {content}
        {selectedElement?.id === element.id && (
          <div className="absolute -top-8 left-0 flex space-x-1">
            <Button size="sm" variant="outline" onClick={() => duplicateElement(element)}>
              <Copy className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => deleteElement(element.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const getViewportStyle = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '800px' };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">Advanced Page Builder</h1>

          {/* Element Tools */}
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => addElement('heading')}>
              <Type className="w-4 h-4 mr-1" />
              Heading
            </Button>
            <Button size="sm" onClick={() => addElement('text')}>
              <Type className="w-4 h-4 mr-1" />
              Text
            </Button>
            <Button size="sm" onClick={() => addElement('image')}>
              <ImageIcon className="w-4 h-4 mr-1" />
              Image
            </Button>
            <Button size="sm" onClick={() => addElement('button')}>
              <Square className="w-4 h-4 mr-1" />
              Button
            </Button>
            <Button size="sm" onClick={() => addElement('form')}>
              <Layout className="w-4 h-4 mr-1" />
              Form
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Viewport Controls */}
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'tablet' ? 'default' : 'outline'}
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* History Controls */}
          <Button size="sm" onClick={undo} disabled={historyIndex <= 0}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
            <Redo className="w-4 h-4" />
          </Button>

          {/* Actions */}
          <Button size="sm" onClick={() => onSave(elements)}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Canvas */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex justify-center">
            <div
              ref={canvasRef}
              className="bg-white shadow-lg relative"
              style={{
                ...getViewportStyle(),
                backgroundImage: showGrid ? 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
                backgroundSize: showGrid ? '20px 20px' : 'auto'
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {elements.map(renderElement)}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedElement && (
          <div className="w-80 bg-white border-l p-4 overflow-y-auto">
            <h3 className="font-semibold mb-4">Element Properties</h3>

            <div className="space-y-4">
              <div>
                <Label>Element Type</Label>
                <p className="text-sm text-gray-600 capitalize">{selectedElement.type}</p>
              </div>

              {selectedElement.content.text !== undefined && (
                <div>
                  <Label htmlFor="text">Text Content</Label>
                  <Textarea
                    id="text"
                    value={selectedElement.content.text}
                    onChange={(e) => updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, text: e.target.value }
                    })}
                  />
                </div>
              )}

              {selectedElement.type === 'heading' && (
                <div>
                  <Label htmlFor="level">Heading Level</Label>
                  <Select
                    value={selectedElement.content.level}
                    onValueChange={(value) => updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, level: value as any }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="h1">H1</SelectItem>
                      <SelectItem value="h2">H2</SelectItem>
                      <SelectItem value="h3">H3</SelectItem>
                      <SelectItem value="h4">H4</SelectItem>
                      <SelectItem value="h5">H5</SelectItem>
                      <SelectItem value="h6">H6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedElement.content.src !== undefined && (
                <div>
                  <Label htmlFor="src">Image URL</Label>
                  <Input
                    id="src"
                    value={selectedElement.content.src}
                    onChange={(e) => updateElement(selectedElement.id, {
                      content: { ...selectedElement.content, src: e.target.value }
                    })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="color">Text Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={selectedElement.content.color || '#000000'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, color: e.target.value }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={selectedElement.content.backgroundColor || '#ffffff'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    content: { ...selectedElement.content, backgroundColor: e.target.value }
                  })}
                />
              </div>

              {selectedElement.content.align !== undefined && (
                <div>
                  <Label>Text Alignment</Label>
                  <div className="flex space-x-1 mt-1">
                    <Button
                      size="sm"
                      variant={selectedElement.content.align === 'left' ? 'default' : 'outline'}
                      onClick={() => updateElement(selectedElement.id, {
                        content: { ...selectedElement.content, align: 'left' }
                      })}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedElement.content.align === 'center' ? 'default' : 'outline'}
                      onClick={() => updateElement(selectedElement.id, {
                        content: { ...selectedElement.content, align: 'center' }
                      })}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedElement.content.align === 'right' ? 'default' : 'outline'}
                      onClick={() => updateElement(selectedElement.id, {
                        content: { ...selectedElement.content, align: 'right' }
                      })}
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={selectedElement.size.width}
                    onChange={(e) => updateElement(selectedElement.id, {
                      size: { ...selectedElement.size, width: parseInt(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={selectedElement.size.height}
                    onChange={(e) => updateElement(selectedElement.id, {
                      size: { ...selectedElement.size, height: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}