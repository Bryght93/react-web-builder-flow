import { useState, useCallback, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Type,
  Image as ImageIcon,
  Layout,
  Square,
  Mail,
  Phone,
  MapPin,
  Star,
  Play,
  Users,
  BarChart3,
  Zap,
  Settings,
  Palette,
  Eye,
  Save,
  Undo,
  Redo,
  Plus,
  Trash2,
  Copy,
  Move,
  X,
  Layers,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

// Element types available in the builder
const ELEMENT_TYPES = {
  HEADING: 'heading',
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  FORM: 'form',
  VIDEO: 'video',
  SPACER: 'spacer',
  DIVIDER: 'divider',
  CONTAINER: 'container',
  COLUMNS: 'columns',
  TESTIMONIAL: 'testimonial',
  STATS: 'stats',
  CTA: 'cta',
  COUNTDOWN: 'countdown'
};

// Available elements sidebar
const AVAILABLE_ELEMENTS = [
  { 
    type: ELEMENT_TYPES.HEADING, 
    label: 'Heading', 
    icon: Type, 
    category: 'Basic',
    defaultProps: { text: 'Your Heading Here', level: 'h2', align: 'left', color: '#000000' }
  },
  { 
    type: ELEMENT_TYPES.TEXT, 
    label: 'Text', 
    icon: Type, 
    category: 'Basic',
    defaultProps: { text: 'Your text content goes here...', align: 'left', color: '#666666' }
  },
  { 
    type: ELEMENT_TYPES.IMAGE, 
    label: 'Image', 
    icon: ImageIcon, 
    category: 'Media',
    defaultProps: { src: '/placeholder.svg', alt: 'Image', width: '100%', height: 'auto', align: 'center' }
  },
  { 
    type: ELEMENT_TYPES.BUTTON, 
    label: 'Button', 
    icon: Square, 
    category: 'Interactive',
    defaultProps: { text: 'Click Here', variant: 'primary', size: 'medium', link: '#', align: 'left' }
  },
  { 
    type: ELEMENT_TYPES.FORM, 
    label: 'Lead Form', 
    icon: Mail, 
    category: 'Lead Generation',
    defaultProps: { title: 'Get Your Free Guide', fields: ['name', 'email'], button: 'Download Now' }
  },
  { 
    type: ELEMENT_TYPES.VIDEO, 
    label: 'Video', 
    icon: Play, 
    category: 'Media',
    defaultProps: { src: '', thumbnail: '/placeholder.svg', autoplay: false, controls: true }
  },
  { 
    type: ELEMENT_TYPES.TESTIMONIAL, 
    label: 'Testimonial', 
    icon: Users, 
    category: 'Social Proof',
    defaultProps: { 
      quote: 'This product changed my life!', 
      author: 'John Doe', 
      role: 'CEO', 
      company: 'Acme Corp',
      avatar: '/placeholder.svg',
      rating: 5
    }
  },
  { 
    type: ELEMENT_TYPES.STATS, 
    label: 'Stats Counter', 
    icon: BarChart3, 
    category: 'Data',
    defaultProps: { 
      stats: [
        { number: '1000+', label: 'Happy Customers' },
        { number: '99%', label: 'Success Rate' },
        { number: '24/7', label: 'Support' }
      ]
    }
  },
  { 
    type: ELEMENT_TYPES.CTA, 
    label: 'Call to Action', 
    icon: Zap, 
    category: 'Marketing',
    defaultProps: { 
      headline: 'Ready to Get Started?', 
      subtext: 'Join thousands of satisfied customers',
      buttonText: 'Start Free Trial',
      buttonLink: '#'
    }
  },
  { 
    type: ELEMENT_TYPES.COUNTDOWN, 
    label: 'Countdown Timer', 
    icon: Zap, 
    category: 'Marketing',
    defaultProps: { 
      title: 'Limited Time Offer!',
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    }
  },
  { 
    type: ELEMENT_TYPES.SPACER, 
    label: 'Spacer', 
    icon: Layout, 
    category: 'Layout',
    defaultProps: { height: '50px' }
  },
  { 
    type: ELEMENT_TYPES.DIVIDER, 
    label: 'Divider', 
    icon: Layout, 
    category: 'Layout',
    defaultProps: { style: 'solid', color: '#e5e5e5', thickness: '1px' }
  }
];

interface PageElement {
  id: string;
  type: string;
  content: any;
  styles?: any;
}

interface SortableElementProps {
  element: PageElement;
  onEdit: (element: PageElement) => void;
  onDelete: (id: string) => void;
  onDuplicate: (element: PageElement) => void;
  isSelected: boolean;
  onClick: (element: PageElement) => void;
}

// Sortable element wrapper
function SortableElement({ element, onEdit, onDelete, onDuplicate, isSelected, onClick }: SortableElementProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer border-2 transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/50'
      }`}
      onClick={() => onClick(element)}
    >
      {/* Element controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
        <Button size="icon" variant="secondary" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onEdit(element); }}>
          <Settings className="w-3 h-3" />
        </Button>
        <Button size="icon" variant="secondary" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onDuplicate(element); }}>
          <Copy className="w-3 h-3" />
        </Button>
        <Button size="icon" variant="destructive" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onDelete(element.id); }}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10"
      >
        <div className="p-1 bg-primary text-white rounded">
          <Move className="w-3 h-3" />
        </div>
      </div>

      {/* Element content */}
      <div className="p-4">
        <ElementRenderer element={element} />
      </div>
    </div>
  );
}

// Element renderer based on type
function ElementRenderer({ element }: { element: PageElement }) {
  const { type, content } = element;

  switch (type) {
    case ELEMENT_TYPES.HEADING:
      const HeadingTag = content.level || 'h2';
      return (
        <HeadingTag 
          className={`font-bold text-${content.align || 'left'}`} 
          style={{ color: content.color || '#000000' }}
        >
          {content.text || 'Heading'}
        </HeadingTag>
      );

    case ELEMENT_TYPES.TEXT:
      return (
        <p 
          className={`text-${content.align || 'left'}`}
          style={{ color: content.color || '#666666' }}
        >
          {content.text || 'Text content'}
        </p>
      );

    case ELEMENT_TYPES.IMAGE:
      return (
        <div className={`text-${content.align || 'center'}`}>
          <img 
            src={content.src || '/placeholder.svg'} 
            alt={content.alt || 'Image'} 
            className="max-w-full h-auto"
            style={{ width: content.width || '100%', height: content.height || 'auto' }}
          />
        </div>
      );

    case ELEMENT_TYPES.BUTTON:
      return (
        <div className={`text-${content.align || 'left'}`}>
          <Button 
            variant={content.variant === 'primary' ? 'default' : 'outline'}
            size={content.size || 'default'}
          >
            {content.text || 'Button'}
          </Button>
        </div>
      );

    case ELEMENT_TYPES.FORM:
      return (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>{content.title || 'Lead Form'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.fields?.includes('name') && (
              <div>
                <Label>Name</Label>
                <Input placeholder="Your name" />
              </div>
            )}
            {content.fields?.includes('email') && (
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="your@email.com" />
              </div>
            )}
            {content.fields?.includes('phone') && (
              <div>
                <Label>Phone</Label>
                <Input type="tel" placeholder="Your phone number" />
              </div>
            )}
            <Button className="w-full">{content.button || 'Submit'}</Button>
          </CardContent>
        </Card>
      );

    case ELEMENT_TYPES.TESTIMONIAL:
      return (
        <Card className="max-w-md">
          <CardContent className="p-6">
            <div className="flex mb-2">
              {[...Array(content.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="italic mb-4">"{content.quote}"</p>
            <div className="flex items-center">
              <img src={content.avatar || '/placeholder.svg'} className="w-10 h-10 rounded-full mr-3" alt="Avatar" />
              <div>
                <div className="font-semibold">{content.author}</div>
                <div className="text-sm text-muted-foreground">{content.role} at {content.company}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case ELEMENT_TYPES.STATS:
      return (
        <div className="grid grid-cols-3 gap-4 text-center">
          {content.stats?.map((stat: any, index: number) => (
            <div key={index}>
              <div className="text-2xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      );

    case ELEMENT_TYPES.CTA:
      return (
        <Card className="text-center p-8 bg-gradient-primary text-white">
          <CardContent>
            <h3 className="text-2xl font-bold mb-2">{content.headline}</h3>
            <p className="mb-4 opacity-90">{content.subtext}</p>
            <Button variant="secondary">{content.buttonText}</Button>
          </CardContent>
        </Card>
      );

    case ELEMENT_TYPES.SPACER:
      return <div style={{ height: content.height || '50px' }} />;

    case ELEMENT_TYPES.DIVIDER:
      return (
        <hr 
          style={{ 
            borderStyle: content.style || 'solid',
            borderColor: content.color || '#e5e5e5',
            borderWidth: content.thickness || '1px'
          }} 
        />
      );

    default:
      return <div className="p-4 bg-muted text-center">Unknown Element</div>;
  }
}

// Property editor for selected element
function PropertyEditor({ element, onUpdate, onClose }: { 
  element: PageElement | null; 
  onUpdate: (element: PageElement) => void;
  onClose: () => void;
}) {
  if (!element) return null;

  const updateContent = (field: string, value: any) => {
    onUpdate({
      ...element,
      content: { ...element.content, [field]: value }
    });
  };

  return (
    <div className="p-4 border-l bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Element Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {element.type === ELEMENT_TYPES.HEADING && (
          <>
            <div>
              <Label>Text</Label>
              <Input 
                value={element.content.text || ''} 
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Heading text"
              />
            </div>
            <div>
              <Label>Level</Label>
              <Select value={element.content.level} onValueChange={(value) => updateContent('level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Alignment</Label>
              <Select value={element.content.align} onValueChange={(value) => updateContent('align', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <Input 
                type="color"
                value={element.content.color || '#000000'} 
                onChange={(e) => updateContent('color', e.target.value)}
              />
            </div>
          </>
        )}

        {element.type === ELEMENT_TYPES.TEXT && (
          <>
            <div>
              <Label>Text</Label>
              <Textarea 
                value={element.content.text || ''} 
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Your text content"
                rows={4}
              />
            </div>
            <div>
              <Label>Alignment</Label>
              <Select value={element.content.align} onValueChange={(value) => updateContent('align', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <Input 
                type="color"
                value={element.content.color || '#666666'} 
                onChange={(e) => updateContent('color', e.target.value)}
              />
            </div>
          </>
        )}

        {element.type === ELEMENT_TYPES.BUTTON && (
          <>
            <div>
              <Label>Button Text</Label>
              <Input 
                value={element.content.text || ''} 
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label>Link</Label>
              <Input 
                value={element.content.link || ''} 
                onChange={(e) => updateContent('link', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label>Style</Label>
              <Select value={element.content.variant} onValueChange={(value) => updateContent('variant', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {element.type === ELEMENT_TYPES.FORM && (
          <>
            <div>
              <Label>Form Title</Label>
              <Input 
                value={element.content.title || ''} 
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Form title"
              />
            </div>
            <div>
              <Label>Button Text</Label>
              <Input 
                value={element.content.button || ''} 
                onChange={(e) => updateContent('button', e.target.value)}
                placeholder="Submit button text"
              />
            </div>
          </>
        )}

        {/* Add more property editors for other element types as needed */}
      </div>
    </div>
  );
}

interface PageBuilderProps {
  initialElements?: PageElement[];
  onSave?: (elements: PageElement[]) => void;
  onClose?: () => void;
}

export default function PageBuilder({ initialElements = [], onSave, onClose }: PageBuilderProps) {
  const [elements, setElements] = useState<PageElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPropertyEditor, setShowPropertyEditor] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if we're dropping from sidebar (adding new element)
    if (typeof active.id === 'string' && active.id.startsWith('sidebar-')) {
      const elementType = active.id.replace('sidebar-', '');
      const template = AVAILABLE_ELEMENTS.find(el => el.type === elementType);

      if (template) {
        const newElement: PageElement = {
          id: `element-${Date.now()}`,
          type: template.type,
          content: { ...template.defaultProps }
        };

        // Insert at the position of the over element, or at the end
        const overIndex = elements.findIndex(el => el.id === over.id);
        if (overIndex !== -1) {
          const newElements = [...elements];
          newElements.splice(overIndex + 1, 0, newElement);
          setElements(newElements);
        } else {
          setElements(prev => [...prev, newElement]);
        }

        toast({
          title: "Element Added",
          description: `${template.label} has been added to your page.`,
        });
      }
      return;
    }

    // Reordering existing elements
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex(el => el.id === active.id);
      const newIndex = elements.findIndex(el => el.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setElements(arrayMove(elements, oldIndex, newIndex));
      }
    }
  };

  const addElement = (type: string) => {
    const template = AVAILABLE_ELEMENTS.find(el => el.type === type);
    if (!template) return;

    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type: template.type,
      content: { ...template.defaultProps }
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
    setShowPropertyEditor(true);
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
      setShowPropertyEditor(false);
    }
  };

  const duplicateElement = (element: PageElement) => {
    const newElement: PageElement = {
      ...element,
      id: `element-${Date.now()}`,
    };

    const index = elements.findIndex(el => el.id === element.id);
    const newElements = [...elements];
    newElements.splice(index + 1, 0, newElement);
    setElements(newElements);
  };

  const updateElement = (updatedElement: PageElement) => {
    setElements(prev => prev.map(el => el.id === updatedElement.id ? updatedElement : el));
    setSelectedElement(updatedElement);
  };

  const selectElement = (element: PageElement) => {
    setSelectedElement(element);
    setShowPropertyEditor(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(elements);
    }
    toast({
      title: "Page Saved",
      description: "Your page has been saved successfully.",
    });
  };

  const categories = ['All', ...Array.from(new Set(AVAILABLE_ELEMENTS.map(el => el.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredElements = selectedCategory === 'All' 
    ? AVAILABLE_ELEMENTS 
    : AVAILABLE_ELEMENTS.filter(el => el.category === selectedCategory);

  return (
    <div className="h-screen flex bg-background">
        {/* Component Palette */}
        <div className="w-64 border-r bg-muted/30 overflow-y-auto">
          <div className="p-3">
            <h3 className="font-semibold mb-3 text-sm">Components</h3>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_ELEMENTS.map((component) => (
                <div
                  key={component.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', component.type);
                  }}
                  className="p-3 bg-card border border-border rounded-lg cursor-grab hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center space-y-1">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <div className="text-xs font-medium">{component.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-xs text-muted-foreground mb-2">Quick Actions</h4>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-8"
                onClick={() => setElements([])}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs h-8"
                onClick={() => {
                  const template = [
                    { id: '1', type: 'heading', content: { text: 'Welcome to Our Page', level: 'h1', align: 'center' } },
                    { id: '2', type: 'text', content: { text: 'This is a sample paragraph.', align: 'center' } },
                    { id: '3', type: 'button', content: { text: 'Get Started', variant: 'primary', align: 'center' } }
                  ];
                  setElements(template);
                }}
              >
                <Layout className="w-3 h-3 mr-1" />
                Load Template
              </Button>
            </div>
          </div>
        </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 border-b bg-background px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-semibold">Page Builder</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-muted/50 p-8">
          <div className={`mx-auto bg-white min-h-full shadow-soft ${
            viewMode === 'desktop' ? 'max-w-6xl' : 
            viewMode === 'tablet' ? 'max-w-2xl' : 
            'max-w-sm'
          }`}>
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                {elements.length === 0 ? (
                  <div className="p-20 text-center text-muted-foreground">
                    <MousePointer className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Start Building Your Page</h3>
                    <p>Drag elements from the sidebar to begin creating your page.</p>
                  </div>
                ) : (
                  elements.map((element) => (
                    <SortableElement
                      key={element.id}
                      element={element}
                      onEdit={selectElement}
                      onDelete={deleteElement}
                      onDuplicate={duplicateElement}
                      isSelected={selectedElement?.id === element.id}
                      onClick={selectElement}
                    />
                  ))
                )}
              </SortableContext>

              <DragOverlay>
                {activeId && (
                  <div className="bg-white p-4 shadow-strong rounded border">
                    Dragging element...
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Property Editor Sidebar */}
      {showPropertyEditor && selectedElement && (
        <div className="w-80 bg-background">
          <PropertyEditor
            element={selectedElement}
            onUpdate={updateElement}
            onClose={() => setShowPropertyEditor(false)}
          />
        </div>
      )}
    </div>
  );
}