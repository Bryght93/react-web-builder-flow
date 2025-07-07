import { useState, useCallback, useRef, useEffect } from "react";
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
  DragOverEvent,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
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
  Monitor,
  Tablet,
  Smartphone,
  PanelLeft,
  MousePointer,
  Box,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Video,
  Music,
  ShoppingCart,
  Calendar,
  Clock,
  Grid,
  Columns,
  Rows,
  FileText,
  MessageCircle,
  Heart,
  ThumbsUp,
  Share,
  Download,
  Upload,
  Search,
  Filter,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  List,
  Hash,
  Quote,
  Code,
  Database,
  Globe,
  Wifi,
  Bluetooth,
  Battery,
  Signal,
  Volume2,
  Camera,
  Mic,
  Headphones,
  Printer,
  HardDrive,
  Cpu,
  Server,
  Cloud,
  Shield,
  Lock,
  Unlock,
  Key,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  BarChart,
  Target,
  Award,
  Medal,
  Trophy,
  Flag,
  Bookmark,
  Tag,
  Paperclip,
  Scissors,
  Ruler,
  Compass,
  Thermometer,
  Gauge,
  Timer,
  Bell,
  BellOff,
  Lightbulb,
  Flashlight,
  Flame,
  Droplet,
  Snowflake,
  Sun,
  Moon,
  Cloud as CloudIcon,
  Zap as Lightning,
  Rainbow,
  Umbrella,
  Car,
  Truck,
  Bike,
  Plane,
  Train,
  Bus,
  Ship,
  Rocket,
  Home,
  Building,
  Building2,
  Store,
  Factory,
  Warehouse,
  School,
  Hospital,
  Church,
  TreePine,
  Flower,
  Leaf,
  Sprout,
  Apple,
  Cherry,
  Grape,
  Carrot,
  Wheat,
  Coffee,
  Beer,
  Wine,
  Utensils,
  ChefHat,
  Pizza,
  Cake,
  IceCream,
  Candy,
  Gift,
  PartyPopper,
  Gamepad2,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartCard,
  Puzzle,
  Paintbrush,
  Pencil,
  Pen,
  Eraser,
  Highlighter,
  Brush,
  Palette as PaletteIcon,
} from "lucide-react";

interface PageElement {
  id: string;
  type: string;
  content: any;
  styles?: any;
  position?: { x: number; y: number };
}

interface ElementType {
  type: string;
  icon: any;
  label: string;
  description: string;
  category: string;
  premium?: boolean;
}

// Comprehensive element library organized by categories
const elementLibrary: ElementType[] = [
  // Basic Elements
  { type: 'heading', icon: Type, label: 'Heading', description: 'Text heading (H1-H6)', category: 'Basic' },
  { type: 'paragraph', icon: FileText, label: 'Paragraph', description: 'Text paragraph', category: 'Basic' },
  { type: 'button', icon: MousePointer, label: 'Button', description: 'Call-to-action button', category: 'Basic' },
  { type: 'image', icon: ImageIcon, label: 'Image', description: 'Image element', category: 'Basic' },
  { type: 'video', icon: Video, label: 'Video', description: 'Video player', category: 'Basic' },
  { type: 'audio', icon: Music, label: 'Audio', description: 'Audio player', category: 'Basic' },
  { type: 'link', icon: Link, label: 'Link', description: 'Hyperlink', category: 'Basic' },
  { type: 'divider', icon: Separator, label: 'Divider', description: 'Horizontal line', category: 'Basic' },
  { type: 'spacer', icon: Square, label: 'Spacer', description: 'Empty space', category: 'Basic' },

  // Form Elements
  { type: 'form', icon: Layout, label: 'Form', description: 'Contact form', category: 'Forms' },
  { type: 'input', icon: Type, label: 'Input Field', description: 'Text input', category: 'Forms' },
  { type: 'textarea', icon: FileText, label: 'Textarea', description: 'Multi-line text input', category: 'Forms' },
  { type: 'select', icon: ChevronDown, label: 'Select', description: 'Dropdown select', category: 'Forms' },
  { type: 'checkbox', icon: Square, label: 'Checkbox', description: 'Checkbox input', category: 'Forms' },
  { type: 'radio', icon: Square, label: 'Radio Button', description: 'Radio button input', category: 'Forms' },
  { type: 'file-upload', icon: Upload, label: 'File Upload', description: 'File upload field', category: 'Forms' },
  { type: 'submit-button', icon: MousePointer, label: 'Submit Button', description: 'Form submit button', category: 'Forms' },

  // Layout Elements
  { type: 'container', icon: Box, label: 'Container', description: 'Content container', category: 'Layout' },
  { type: 'row', icon: Rows, label: 'Row', description: 'Horizontal row', category: 'Layout' },
  { type: 'column', icon: Columns, label: 'Column', description: 'Vertical column', category: 'Layout' },
  { type: 'grid', icon: Grid, label: 'Grid', description: 'Grid layout', category: 'Layout' },
  { type: 'tabs', icon: Layers, label: 'Tabs', description: 'Tab container', category: 'Layout' },
  { type: 'accordion', icon: List, label: 'Accordion', description: 'Collapsible content', category: 'Layout' },
  { type: 'card', icon: Square, label: 'Card', description: 'Card container', category: 'Layout' },
  { type: 'modal', icon: Square, label: 'Modal', description: 'Modal dialog', category: 'Layout', premium: true },

  // Media Elements
  { type: 'gallery', icon: ImageIcon, label: 'Gallery', description: 'Image gallery', category: 'Media' },
  { type: 'carousel', icon: Square, label: 'Carousel', description: 'Image carousel', category: 'Media' },
  { type: 'youtube', icon: Play, label: 'YouTube', description: 'YouTube video embed', category: 'Media' },
  { type: 'vimeo', icon: Play, label: 'Vimeo', description: 'Vimeo video embed', category: 'Media' },
  { type: 'audio-player', icon: Headphones, label: 'Audio Player', description: 'Custom audio player', category: 'Media' },
  { type: 'pdf-viewer', icon: FileText, label: 'PDF Viewer', description: 'PDF document viewer', category: 'Media', premium: true },

  // Interactive Elements
  { type: 'countdown', icon: Timer, label: 'Countdown', description: 'Countdown timer', category: 'Interactive' },
  { type: 'progress-bar', icon: BarChart3, label: 'Progress Bar', description: 'Progress indicator', category: 'Interactive' },
  { type: 'rating', icon: Star, label: 'Rating', description: 'Star rating', category: 'Interactive' },
  { type: 'toggle', icon: Settings, label: 'Toggle', description: 'Toggle switch', category: 'Interactive' },
  { type: 'slider', icon: Settings, label: 'Slider', description: 'Range slider', category: 'Interactive' },
  { type: 'tooltip', icon: MessageCircle, label: 'Tooltip', description: 'Hover tooltip', category: 'Interactive' },
  { type: 'popover', icon: MessageCircle, label: 'Popover', description: 'Click popover', category: 'Interactive' },

  // Social Elements
  { type: 'social-share', icon: Share, label: 'Social Share', description: 'Social media share buttons', category: 'Social' },
  { type: 'social-feed', icon: Users, label: 'Social Feed', description: 'Social media feed', category: 'Social', premium: true },
  { type: 'like-button', icon: Heart, label: 'Like Button', description: 'Like/favorite button', category: 'Social' },
  { type: 'follow-button', icon: Users, label: 'Follow Button', description: 'Social follow button', category: 'Social' },
  { type: 'comment-box', icon: MessageCircle, label: 'Comment Box', description: 'Comment section', category: 'Social' },

  // E-commerce Elements
  { type: 'product-card', icon: ShoppingCart, label: 'Product Card', description: 'Product showcase card', category: 'E-commerce', premium: true },
  { type: 'price-table', icon: DollarSign, label: 'Price Table', description: 'Pricing table', category: 'E-commerce' },
  { type: 'cart-button', icon: ShoppingCart, label: 'Cart Button', description: 'Add to cart button', category: 'E-commerce', premium: true },
  { type: 'checkout-form', icon: CreditCard, label: 'Checkout Form', description: 'Checkout form', category: 'E-commerce', premium: true },
  { type: 'currency-converter', icon: DollarSign, label: 'Currency Converter', description: 'Currency conversion tool', category: 'E-commerce', premium: true },

  // Chart Elements
  { type: 'bar-chart', icon: BarChart, label: 'Bar Chart', description: 'Bar chart visualization', category: 'Charts', premium: true },
  { type: 'line-chart', icon: LineChart, label: 'Line Chart', description: 'Line chart visualization', category: 'Charts', premium: true },
  { type: 'pie-chart', icon: PieChart, label: 'Pie Chart', description: 'Pie chart visualization', category: 'Charts', premium: true },
  { type: 'area-chart', icon: TrendingUp, label: 'Area Chart', description: 'Area chart visualization', category: 'Charts', premium: true },
  { type: 'donut-chart', icon: PieChart, label: 'Donut Chart', description: 'Donut chart visualization', category: 'Charts', premium: true },

  // Navigation Elements
  { type: 'navbar', icon: Menu, label: 'Navigation Bar', description: 'Navigation menu', category: 'Navigation' },
  { type: 'breadcrumb', icon: ChevronRight, label: 'Breadcrumb', description: 'Breadcrumb navigation', category: 'Navigation' },
  { type: 'pagination', icon: ChevronDown, label: 'Pagination', description: 'Page navigation', category: 'Navigation' },
  { type: 'sidebar', icon: PanelLeft, label: 'Sidebar', description: 'Side navigation', category: 'Navigation' },
  { type: 'footer', icon: Layout, label: 'Footer', description: 'Page footer', category: 'Navigation' },

  // Utility Elements
  { type: 'search-box', icon: Search, label: 'Search Box', description: 'Search input field', category: 'Utility' },
  { type: 'filter', icon: Filter, label: 'Filter', description: 'Content filter', category: 'Utility' },
  { type: 'sort', icon: Filter, label: 'Sort', description: 'Sort controls', category: 'Utility' },
  { type: 'calendar', icon: Calendar, label: 'Calendar', description: 'Date picker calendar', category: 'Utility' },
  { type: 'clock', icon: Clock, label: 'Clock', description: 'Digital clock', category: 'Utility' },
  { type: 'weather', icon: Sun, label: 'Weather', description: 'Weather widget', category: 'Utility', premium: true },
  { type: 'map', icon: MapPin, label: 'Map', description: 'Interactive map', category: 'Utility', premium: true },

  // Advanced Elements
  { type: 'code-block', icon: Code, label: 'Code Block', description: 'Code syntax highlighting', category: 'Advanced', premium: true },
  { type: 'table', icon: Grid, label: 'Table', description: 'Data table', category: 'Advanced' },
  { type: 'timeline', icon: Clock, label: 'Timeline', description: 'Event timeline', category: 'Advanced' },
  { type: 'testimonial', icon: Quote, label: 'Testimonial', description: 'Customer testimonial', category: 'Advanced' },
  { type: 'faq', icon: MessageCircle, label: 'FAQ', description: 'Frequently asked questions', category: 'Advanced' },
  { type: 'contact-info', icon: Phone, label: 'Contact Info', description: 'Contact information', category: 'Advanced' },
  { type: 'team-member', icon: Users, label: 'Team Member', description: 'Team member profile', category: 'Advanced' },
  { type: 'feature-list', icon: List, label: 'Feature List', description: 'Feature showcase list', category: 'Advanced' },
  { type: 'before-after', icon: Square, label: 'Before/After', description: 'Before and after comparison', category: 'Advanced', premium: true },
  { type: 'animated-counter', icon: Hash, label: 'Animated Counter', description: 'Animated number counter', category: 'Advanced', premium: true },
];

interface SortableElementProps {
  element: PageElement;
  onEdit: (element: PageElement) => void;
  onDelete: (id: string) => void;
  onDuplicate: (element: PageElement) => void;
  isSelected: boolean;
  onClick: (element: PageElement) => void;
}

function SortableElement({ element, onEdit, onDelete, onDuplicate, isSelected, onClick }: SortableElementProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-move hover:border-blue-400 transition-colors",
        isSelected && "border-blue-500 bg-blue-50",
        isDragging && "opacity-50"
      )}
      onClick={() => onClick(element)}
    >
      <div className="absolute top-2 right-2 flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(element);
          }}
          className="h-6 w-6 p-0 hover:bg-white"
        >
          <Settings className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(element);
          }}
          className="h-6 w-6 p-0 hover:bg-white"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(element.id);
          }}
          className="h-6 w-6 p-0 hover:bg-white text-red-500"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      
      <ElementRenderer element={element} />
    </div>
  );
}

function ElementRenderer({ element }: { element: PageElement }) {
  const getElementContent = () => {
    switch (element.type) {
      case 'heading':
        return <h2 className="text-2xl font-bold">{element.content || 'Heading'}</h2>;
      case 'paragraph':
        return <p className="text-gray-700">{element.content || 'This is a paragraph text. Click to edit.'}</p>;
      case 'button':
        return (
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {element.content || 'Click Me'}
          </button>
        );
      case 'image':
        return (
          <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-sm text-gray-500">Image placeholder</span>
          </div>
        );
      case 'video':
        return (
          <div className="w-full h-32 bg-gray-900 rounded flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
            <span className="ml-2 text-sm text-white">Video placeholder</span>
          </div>
        );
      case 'form':
        return (
          <div className="space-y-3">
            <input className="w-full p-2 border rounded" placeholder="Name" />
            <input className="w-full p-2 border rounded" placeholder="Email" />
            <button className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
          </div>
        );
      case 'divider':
        return <hr className="border-gray-300" />;
      case 'spacer':
        return <div className="h-8 bg-gray-100 rounded opacity-50"></div>;
      default:
        return (
          <div className="p-3 bg-gray-100 rounded text-center">
            <span className="text-sm text-gray-600">{element.type}</span>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        ...element.styles,
        fontSize: element.styles?.fontSize || 'inherit',
        color: element.styles?.color || 'inherit',
        backgroundColor: element.styles?.backgroundColor || 'transparent',
        textAlign: element.styles?.textAlign || 'left',
      }}
    >
      {getElementContent()}
    </div>
  );
}

function ElementLibraryPanel({ onAddElement }: { onAddElement: (elementType: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Basic');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(elementLibrary.map(el => el.category)));

  const filteredElements = elementLibrary.filter(element => 
    element.category === selectedCategory &&
    (element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
     element.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-80 border-l bg-white h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-3">Element Library</h3>
        <Input
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {filteredElements.map((element) => (
            <div
              key={element.type}
              className={cn(
                "p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors relative",
                "flex flex-col items-center text-center space-y-2"
              )}
              onClick={() => onAddElement(element.type)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', element.type);
              }}
            >
              {element.premium && (
                <Badge className="absolute top-1 right-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                  PRO
                </Badge>
              )}
              <element.icon className="h-6 w-6 text-gray-600" />
              <div>
                <div className="text-sm font-medium">{element.label}</div>
                <div className="text-xs text-gray-500">{element.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyEditor({ element, onUpdate, onClose }: { 
  element: PageElement;
  onUpdate: (element: PageElement) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    content: element.content || '',
    fontSize: element.styles?.fontSize || '16px',
    color: element.styles?.color || '#000000',
    backgroundColor: element.styles?.backgroundColor || 'transparent',
    textAlign: element.styles?.textAlign || 'left',
    padding: element.styles?.padding || '0px',
    margin: element.styles?.margin || '0px',
    borderRadius: element.styles?.borderRadius || '0px',
    borderWidth: element.styles?.borderWidth || '0px',
    borderColor: element.styles?.borderColor || '#000000',
  });

  const handleSave = () => {
    const updatedElement: PageElement = {
      ...element,
      content: formData.content,
      styles: {
        ...element.styles,
        fontSize: formData.fontSize,
        color: formData.color,
        backgroundColor: formData.backgroundColor,
        textAlign: formData.textAlign,
        padding: formData.padding,
        margin: formData.margin,
        borderRadius: formData.borderRadius,
        borderWidth: formData.borderWidth,
        borderColor: formData.borderColor,
      },
    };
    onUpdate(updatedElement);
    onClose();
  };

  return (
    <div className="w-80 border-l bg-white h-full overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Element Properties</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter content..."
            className="mt-1"
          />
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance">Style</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                value={formData.fontSize}
                onChange={(e) => setFormData({ ...formData, fontSize: e.target.value })}
                placeholder="16px"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="color">Text Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={formData.backgroundColor === 'transparent' ? '#ffffff' : formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="textAlign">Text Alignment</Label>
              <Select value={formData.textAlign} onValueChange={(value) => setFormData({ ...formData, textAlign: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={formData.padding}
                onChange={(e) => setFormData({ ...formData, padding: e.target.value })}
                placeholder="0px"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={formData.margin}
                onChange={(e) => setFormData({ ...formData, margin: e.target.value })}
                placeholder="0px"
                className="mt-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div>
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                value={formData.borderRadius}
                onChange={(e) => setFormData({ ...formData, borderRadius: e.target.value })}
                placeholder="0px"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="borderWidth">Border Width</Label>
              <Input
                id="borderWidth"
                value={formData.borderWidth}
                onChange={(e) => setFormData({ ...formData, borderWidth: e.target.value })}
                placeholder="0px"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="borderColor">Border Color</Label>
              <Input
                id="borderColor"
                type="color"
                value={formData.borderColor}
                onChange={(e) => setFormData({ ...formData, borderColor: e.target.value })}
                className="mt-1"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">Save Changes</Button>
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

interface AdvancedPageBuilderProps {
  initialElements?: PageElement[];
  onSave?: (elements: PageElement[]) => void;
  onClose?: () => void;
}

export default function AdvancedPageBuilder({ initialElements = [], onSave, onClose }: AdvancedPageBuilderProps) {
  const [elements, setElements] = useState<PageElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [editingElement, setEditingElement] = useState<PageElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState<PageElement[][]>([initialElements]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const saveToHistory = useCallback((newElements: PageElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newElements = arrayMove(items, oldIndex, newIndex);
        saveToHistory(newElements);
        return newElements;
      });
    }
    
    setActiveId(null);
  };

  const addElement = useCallback((elementType: string) => {
    const newElement: PageElement = {
      id: `${elementType}-${Date.now()}`,
      type: elementType,
      content: getDefaultContent(elementType),
      styles: getDefaultStyles(elementType),
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    
    toast({
      title: "Element added",
      description: `${elementType} element has been added to your page.`,
    });
  }, [elements, saveToHistory, toast]);

  const updateElement = useCallback((updatedElement: PageElement) => {
    const newElements = elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    );
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(updatedElement);
  }, [elements, saveToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(null);
    setEditingElement(null);
    
    toast({
      title: "Element deleted",
      description: "The element has been removed from your page.",
    });
  }, [elements, saveToHistory, toast]);

  const duplicateElement = useCallback((element: PageElement) => {
    const newElement: PageElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    
    toast({
      title: "Element duplicated",
      description: "The element has been duplicated.",
    });
  }, [elements, saveToHistory, toast]);

  const selectElement = useCallback((element: PageElement) => {
    setSelectedElement(element);
    setEditingElement(null);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(elements);
    }
    toast({
      title: "Page saved",
      description: "Your page has been saved successfully.",
    });
  }, [elements, onSave, toast]);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLibraryOpen(!isLibraryOpen)}
          >
            <PanelLeft className="h-4 w-4 mr-2" />
            {isLibraryOpen ? 'Hide' : 'Show'} Library
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={undo} disabled={historyIndex === 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={redo} disabled={historyIndex === history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className={cn("mx-auto bg-white rounded-lg shadow-lg min-h-[800px]", getPreviewWidth())}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                <div className="p-6 space-y-4">
                  {elements.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Layout className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Your page is empty. Drag elements from the library to get started.</p>
                    </div>
                  ) : (
                    elements.map(element => (
                      <SortableElement
                        key={element.id}
                        element={element}
                        onEdit={setEditingElement}
                        onDelete={deleteElement}
                        onDuplicate={duplicateElement}
                        isSelected={selectedElement?.id === element.id}
                        onClick={selectElement}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
              
              <DragOverlay>
                {activeId ? (
                  <div className="p-4 bg-white border rounded-lg shadow-lg">
                    <ElementRenderer element={elements.find(el => el.id === activeId)!} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>

        {/* Right Panel */}
        {isLibraryOpen && (
          <div className="w-80 border-l bg-white">
            {editingElement ? (
              <PropertyEditor
                element={editingElement}
                onUpdate={updateElement}
                onClose={() => setEditingElement(null)}
              />
            ) : (
              <ElementLibraryPanel onAddElement={addElement} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getDefaultContent(elementType: string): string {
  switch (elementType) {
    case 'heading': return 'Your Heading Here';
    case 'paragraph': return 'This is a paragraph of text. You can edit this content to say whatever you want.';
    case 'button': return 'Click Me';
    case 'link': return 'Link Text';
    default: return '';
  }
}

function getDefaultStyles(elementType: string): any {
  switch (elementType) {
    case 'heading':
      return {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '16px',
      };
    case 'paragraph':
      return {
        fontSize: '16px',
        color: '#374151',
        lineHeight: '1.6',
        marginBottom: '16px',
      };
    case 'button':
      return {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
      };
    default:
      return {};
  }
}