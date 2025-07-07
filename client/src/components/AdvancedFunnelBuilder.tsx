import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { 
  DndContext, 
  DragOverlay, 
  useDraggable, 
  useDroppable, 
  DragEndEvent,
  DragStartEvent,
  closestCenter 
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Type, Image, Video, Calendar, Clock, Star, Heart, Share2, Mail,
  Phone, MapPin, Globe, User, Users, Award, Trophy, Target, Zap, Sparkles, ShoppingCart,
  CreditCard, Gift, Tag, Percent, DollarSign, TrendingUp, BarChart3, PieChart, LineChart,
  FileText, Download, Upload, Link, QrCode, Search, Filter, Sort, Grid, List, Layout,
  Columns, Rows, Square, Circle, Triangle, Hexagon, Diamond, Play, Pause, Stop, Volume2,
  VolumeX, Repeat, Shuffle, SkipBack, SkipForward, Rewind, FastForward, Mic, MicOff,
  Camera, CameraOff, Monitor, Smartphone, Tablet, Laptop, Desktop, Tv, Radio, Headphones,
  MessageSquare, MessageCircle, Send, Inbox, Archive, Trash2, Edit, Save, Settings,
  Cog, Wrench, Hammer, Screwdriver, Paintbrush, Palette, Eyedropper, Layers, Move,
  RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Crop, Scissors, Copy, Paste, Undo,
  Redo, Maximize, Minimize, Expand, Compress, ZoomIn, ZoomOut, Focus, Blur, Contrast,
  Brightness, Saturation, Hue, Temperature, Exposure, Shadows, Highlights, Clarity,
  Vibrance, Noise, Grain, Vignette, Border, Frame, Mask, Gradient, Pattern, Texture,
  X, Check, Plus, Minus, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowUp,
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownLeft, ArrowUpLeft, ArrowDownRight,
  Navigation, Compass, Map, Route, Flag, Bookmark, BookOpen, Book, Library, Folder,
  FolderOpen, File, FilePlus, FileImage, FileVideo, FileAudio, FileCode, Database,
  Server, Cloud, CloudUpload, CloudDownload, Wifi, WifiOff, Bluetooth, BluetoothOff,
  Battery, BatteryLow, Plug, Power, PowerOff, Refresh, RefreshCw, Loader, Spinner,
  AlertCircle, AlertTriangle, Info, HelpCircle, Question, Lightbulb, Flame, Droplet,
  Snowflake, Sun, Moon, CloudRain, CloudSnow, CloudLightning, Wind, Eye, EyeOff,
  Lock, Unlock, Shield, ShieldCheck, ShieldAlert, Key, Fingerprint, Scan,
  Barcode, Hash, AtSign, PlusCircle, MinusCircle, XCircle, CheckCircle,
  PlayCircle, PauseCircle, StopCircle, RecordCircle, UploadCloud, DownloadCloud,
  Timer, Stopwatch, Alarm, Bell, BellOff, Volume, VolumeDown, VolumeUp, Mute, Unmute,
  Rss, Podcast, Music, Disc, Vinyl, Cassette, Calculator, Network, GitBranch, Code,
  TestTube, Magnet, ExternalLink, MousePointer, Hand, TrendingDown, UserPlus, ClipboardList
} from "lucide-react";

// Component library with 100+ components
const componentLibrary = [
  // Basic Elements
  { id: 'heading', name: 'Heading', icon: Type, category: 'Basic', description: 'Title or heading text' },
  { id: 'paragraph', name: 'Paragraph', icon: FileText, category: 'Basic', description: 'Regular text content' },
  { id: 'button', name: 'Button', icon: Square, category: 'Basic', description: 'Click action button' },
  { id: 'link', name: 'Link', icon: Link, category: 'Basic', description: 'Hyperlink element' },
  { id: 'image', name: 'Image', icon: Image, category: 'Basic', description: 'Image element' },
  { id: 'video', name: 'Video', icon: Video, category: 'Basic', description: 'Video player' },
  { id: 'divider', name: 'Divider', icon: Minus, category: 'Basic', description: 'Section separator' },
  { id: 'spacer', name: 'Spacer', icon: Move, category: 'Basic', description: 'Empty space' },
  
  // Form Elements
  { id: 'text-input', name: 'Text Input', icon: Type, category: 'Forms', description: 'Single line text input' },
  { id: 'email-input', name: 'Email Input', icon: Mail, category: 'Forms', description: 'Email field' },
  { id: 'phone-input', name: 'Phone Input', icon: Phone, category: 'Forms', description: 'Phone number field' },
  { id: 'textarea', name: 'Textarea', icon: FileText, category: 'Forms', description: 'Multi-line text input' },
  { id: 'select', name: 'Select', icon: ChevronDown, category: 'Forms', description: 'Dropdown selection' },
  { id: 'checkbox', name: 'Checkbox', icon: Check, category: 'Forms', description: 'Checkbox input' },
  { id: 'radio', name: 'Radio', icon: Circle, category: 'Forms', description: 'Radio button' },
  { id: 'date-picker', name: 'Date Picker', icon: Calendar, category: 'Forms', description: 'Date selection' },
  { id: 'time-picker', name: 'Time Picker', icon: Clock, category: 'Forms', description: 'Time selection' },
  { id: 'file-upload', name: 'File Upload', icon: Upload, category: 'Forms', description: 'File upload field' },
  { id: 'slider', name: 'Slider', icon: Minus, category: 'Forms', description: 'Range slider' },
  { id: 'switch', name: 'Switch', icon: Circle, category: 'Forms', description: 'Toggle switch' },
  { id: 'rating', name: 'Rating', icon: Star, category: 'Forms', description: 'Star rating input' },
  
  // Layout Elements
  { id: 'container', name: 'Container', icon: Square, category: 'Layout', description: 'Content container' },
  { id: 'section', name: 'Section', icon: Layout, category: 'Layout', description: 'Page section' },
  { id: 'column', name: 'Column', icon: Columns, category: 'Layout', description: 'Column layout' },
  { id: 'row', name: 'Row', icon: Rows, category: 'Layout', description: 'Row layout' },
  { id: 'grid', name: 'Grid', icon: Grid, category: 'Layout', description: 'Grid layout' },
  { id: 'flex', name: 'Flex', icon: Layout, category: 'Layout', description: 'Flexible layout' },
  { id: 'card', name: 'Card', icon: Square, category: 'Layout', description: 'Card component' },
  { id: 'sidebar', name: 'Sidebar', icon: Columns, category: 'Layout', description: 'Side navigation' },
  { id: 'header', name: 'Header', icon: Layout, category: 'Layout', description: 'Page header' },
  { id: 'footer', name: 'Footer', icon: Layout, category: 'Layout', description: 'Page footer' },
  { id: 'navbar', name: 'Navbar', icon: Navigation, category: 'Layout', description: 'Navigation bar' },
  
  // Media Elements
  { id: 'gallery', name: 'Gallery', icon: Image, category: 'Media', description: 'Image gallery' },
  { id: 'carousel', name: 'Carousel', icon: ChevronRight, category: 'Media', description: 'Image carousel' },
  { id: 'audio', name: 'Audio', icon: Volume2, category: 'Media', description: 'Audio player' },
  { id: 'youtube', name: 'YouTube', icon: Play, category: 'Media', description: 'YouTube embed' },
  { id: 'vimeo', name: 'Vimeo', icon: Play, category: 'Media', description: 'Vimeo embed' },
  { id: 'iframe', name: 'iFrame', icon: Monitor, category: 'Media', description: 'Embedded content' },
  { id: 'slideshow', name: 'Slideshow', icon: Monitor, category: 'Media', description: 'Slide presentation' },
  
  // Navigation Elements
  { id: 'menu', name: 'Menu', icon: List, category: 'Navigation', description: 'Navigation menu' },
  { id: 'breadcrumb', name: 'Breadcrumb', icon: ChevronRight, category: 'Navigation', description: 'Breadcrumb navigation' },
  { id: 'pagination', name: 'Pagination', icon: ChevronRight, category: 'Navigation', description: 'Page pagination' },
  { id: 'tabs', name: 'Tabs', icon: Layout, category: 'Navigation', description: 'Tab navigation' },
  { id: 'accordion', name: 'Accordion', icon: ChevronDown, category: 'Navigation', description: 'Collapsible content' },
  { id: 'dropdown', name: 'Dropdown', icon: ChevronDown, category: 'Navigation', description: 'Dropdown menu' },
  { id: 'modal', name: 'Modal', icon: Square, category: 'Navigation', description: 'Modal popup' },
  
  // Social Elements
  { id: 'social-share', name: 'Social Share', icon: Share2, category: 'Social', description: 'Social sharing buttons' },
  { id: 'social-feed', name: 'Social Feed', icon: MessageSquare, category: 'Social', description: 'Social media feed' },
  { id: 'like-button', name: 'Like Button', icon: Heart, category: 'Social', description: 'Like/favorite button' },
  { id: 'comment-box', name: 'Comment Box', icon: MessageCircle, category: 'Social', description: 'Comment section' },
  { id: 'review', name: 'Review', icon: Star, category: 'Social', description: 'User review' },
  { id: 'testimonial', name: 'Testimonial', icon: MessageSquare, category: 'Social', description: 'Customer testimonial' },
  { id: 'social-proof', name: 'Social Proof', icon: Users, category: 'Social', description: 'Social proof counter' },
  
  // E-commerce Elements
  { id: 'product-card', name: 'Product Card', icon: ShoppingCart, category: 'E-commerce', description: 'Product showcase' },
  { id: 'price', name: 'Price', icon: DollarSign, category: 'E-commerce', description: 'Price display' },
  { id: 'add-to-cart', name: 'Add to Cart', icon: ShoppingCart, category: 'E-commerce', description: 'Add to cart button' },
  { id: 'checkout', name: 'Checkout', icon: CreditCard, category: 'E-commerce', description: 'Checkout form' },
  { id: 'coupon', name: 'Coupon', icon: Tag, category: 'E-commerce', description: 'Discount coupon' },
  { id: 'wishlist', name: 'Wishlist', icon: Heart, category: 'E-commerce', description: 'Wishlist button' },
  { id: 'cart', name: 'Cart', icon: ShoppingCart, category: 'E-commerce', description: 'Shopping cart' },
  { id: 'product-filter', name: 'Product Filter', icon: Filter, category: 'E-commerce', description: 'Product filtering' },
  { id: 'search-bar', name: 'Search Bar', icon: Search, category: 'E-commerce', description: 'Product search' },
  
  // Analytics Elements
  { id: 'chart', name: 'Chart', icon: BarChart3, category: 'Analytics', description: 'Data chart' },
  { id: 'counter', name: 'Counter', icon: Hash, category: 'Analytics', description: 'Number counter' },
  { id: 'progress-bar', name: 'Progress Bar', icon: TrendingUp, category: 'Analytics', description: 'Progress indicator' },
  { id: 'metric', name: 'Metric', icon: Target, category: 'Analytics', description: 'Key metric display' },
  { id: 'kpi', name: 'KPI', icon: Trophy, category: 'Analytics', description: 'Key performance indicator' },
  { id: 'gauge', name: 'Gauge', icon: Circle, category: 'Analytics', description: 'Gauge meter' },
  { id: 'heatmap', name: 'Heatmap', icon: PieChart, category: 'Analytics', description: 'Heatmap visualization' },
  
  // Marketing Elements
  { id: 'cta-banner', name: 'CTA Banner', icon: Target, category: 'Marketing', description: 'Call-to-action banner' },
  { id: 'countdown', name: 'Countdown', icon: Timer, category: 'Marketing', description: 'Countdown timer' },
  { id: 'popup', name: 'Popup', icon: AlertCircle, category: 'Marketing', description: 'Marketing popup' },
  { id: 'notification', name: 'Notification', icon: Bell, category: 'Marketing', description: 'Notification banner' },
  { id: 'badge', name: 'Badge', icon: Award, category: 'Marketing', description: 'Badge or label' },
  { id: 'ribbon', name: 'Ribbon', icon: Gift, category: 'Marketing', description: 'Promotional ribbon' },
  { id: 'highlight', name: 'Highlight', icon: Lightbulb, category: 'Marketing', description: 'Highlighted content' },
  { id: 'alert', name: 'Alert', icon: AlertTriangle, category: 'Marketing', description: 'Alert message' },
  
  // Contact Elements
  { id: 'contact-form', name: 'Contact Form', icon: Mail, category: 'Contact', description: 'Contact form' },
  { id: 'address', name: 'Address', icon: MapPin, category: 'Contact', description: 'Address display' },
  { id: 'map', name: 'Map', icon: Map, category: 'Contact', description: 'Map embed' },
  { id: 'phone', name: 'Phone', icon: Phone, category: 'Contact', description: 'Phone number' },
  { id: 'email', name: 'Email', icon: Mail, category: 'Contact', description: 'Email address' },
  { id: 'hours', name: 'Hours', icon: Clock, category: 'Contact', description: 'Business hours' },
  { id: 'location', name: 'Location', icon: MapPin, category: 'Contact', description: 'Location info' },
  
  // Content Elements
  { id: 'quote', name: 'Quote', icon: MessageSquare, category: 'Content', description: 'Quote block' },
  { id: 'list', name: 'List', icon: List, category: 'Content', description: 'Bullet list' },
  { id: 'table', name: 'Table', icon: Grid, category: 'Content', description: 'Data table' },
  { id: 'code', name: 'Code', icon: Code, category: 'Content', description: 'Code block' },
  { id: 'embed', name: 'Embed', icon: Code, category: 'Content', description: 'Embed code' },
  { id: 'rss', name: 'RSS', icon: Rss, category: 'Content', description: 'RSS feed' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, category: 'Content', description: 'Calendar widget' },
  { id: 'weather', name: 'Weather', icon: Sun, category: 'Content', description: 'Weather widget' },
  { id: 'clock', name: 'Clock', icon: Clock, category: 'Content', description: 'Clock widget' },
  { id: 'qr-code', name: 'QR Code', icon: QrCode, category: 'Content', description: 'QR code generator' },
  { id: 'barcode', name: 'Barcode', icon: Barcode, category: 'Content', description: 'Barcode display' },
  
  // Advanced Elements
  { id: 'chatbot', name: 'Chatbot', icon: MessageSquare, category: 'Advanced', description: 'AI chatbot' },
  { id: 'voice-recorder', name: 'Voice Recorder', icon: Mic, category: 'Advanced', description: 'Voice recording' },
  { id: 'screen-recorder', name: 'Screen Recorder', icon: Monitor, category: 'Advanced', description: 'Screen recording' },
  { id: 'live-chat', name: 'Live Chat', icon: MessageCircle, category: 'Advanced', description: 'Live chat widget' },
  { id: 'survey', name: 'Survey', icon: ClipboardList, category: 'Advanced', description: 'Survey form' },
  { id: 'quiz', name: 'Quiz', icon: HelpCircle, category: 'Advanced', description: 'Interactive quiz' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, category: 'Advanced', description: 'Calculator widget' },
  { id: 'booking', name: 'Booking', icon: Calendar, category: 'Advanced', description: 'Appointment booking' },
  { id: 'payment', name: 'Payment', icon: CreditCard, category: 'Advanced', description: 'Payment form' },
  { id: 'subscription', name: 'Subscription', icon: Repeat, category: 'Advanced', description: 'Subscription form' },
  { id: 'login', name: 'Login', icon: Lock, category: 'Advanced', description: 'Login form' },
  { id: 'signup', name: 'Signup', icon: UserPlus, category: 'Advanced', description: 'Signup form' },
  { id: 'profile', name: 'Profile', icon: User, category: 'Advanced', description: 'User profile' },
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3, category: 'Advanced', description: 'Dashboard widget' },
  { id: 'feed', name: 'Feed', icon: Rss, category: 'Advanced', description: 'Content feed' },
  { id: 'timeline', name: 'Timeline', icon: Clock, category: 'Advanced', description: 'Timeline component' },
  { id: 'kanban', name: 'Kanban', icon: Columns, category: 'Advanced', description: 'Kanban board' },
  { id: 'gantt', name: 'Gantt', icon: BarChart3, category: 'Advanced', description: 'Gantt chart' },
  { id: 'mindmap', name: 'Mindmap', icon: Network, category: 'Advanced', description: 'Mind map' },
  { id: 'flowchart', name: 'Flowchart', icon: GitBranch, category: 'Advanced', description: 'Flowchart diagram' },
  { id: 'org-chart', name: 'Org Chart', icon: Users, category: 'Advanced', description: 'Organization chart' },
  { id: 'tree', name: 'Tree', icon: GitBranch, category: 'Advanced', description: 'Tree structure' },
  { id: 'network', name: 'Network', icon: Network, category: 'Advanced', description: 'Network diagram' },
  { id: 'api', name: 'API', icon: Code, category: 'Advanced', description: 'API integration' },
  { id: 'webhook', name: 'Webhook', icon: Zap, category: 'Advanced', description: 'Webhook trigger' },
  { id: 'automation', name: 'Automation', icon: Cog, category: 'Advanced', description: 'Automation rule' },
  { id: 'ai-assistant', name: 'AI Assistant', icon: Sparkles, category: 'Advanced', description: 'AI assistant' },
  { id: 'recommendation', name: 'Recommendation', icon: Target, category: 'Advanced', description: 'AI recommendations' },
  { id: 'personalization', name: 'Personalization', icon: User, category: 'Advanced', description: 'Content personalization' },
  { id: 'ab-test', name: 'A/B Test', icon: TestTube, category: 'Advanced', description: 'A/B testing' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, category: 'Advanced', description: 'Analytics tracking' },
  { id: 'heatmap-tracking', name: 'Heatmap Tracking', icon: Eye, category: 'Advanced', description: 'Heatmap tracking' },
  { id: 'conversion-tracking', name: 'Conversion Tracking', icon: Target, category: 'Advanced', description: 'Conversion tracking' },
  { id: 'pixel-tracking', name: 'Pixel Tracking', icon: Square, category: 'Advanced', description: 'Pixel tracking' },
  { id: 'utm-tracking', name: 'UTM Tracking', icon: Link, category: 'Advanced', description: 'UTM parameter tracking' },
  { id: 'lead-capture', name: 'Lead Capture', icon: Target, category: 'Advanced', description: 'Lead capture form' },
  { id: 'lead-magnet', name: 'Lead Magnet', icon: Magnet, category: 'Advanced', description: 'Lead magnet offer' },
  { id: 'exit-intent', name: 'Exit Intent', icon: ExternalLink, category: 'Advanced', description: 'Exit intent popup' },
  { id: 'scroll-trigger', name: 'Scroll Trigger', icon: ArrowDown, category: 'Advanced', description: 'Scroll-triggered action' },
  { id: 'time-trigger', name: 'Time Trigger', icon: Clock, category: 'Advanced', description: 'Time-triggered action' },
  { id: 'click-trigger', name: 'Click Trigger', icon: MousePointer, category: 'Advanced', description: 'Click-triggered action' },
  { id: 'hover-trigger', name: 'Hover Trigger', icon: Hand, category: 'Advanced', description: 'Hover-triggered action' },
  { id: 'device-trigger', name: 'Device Trigger', icon: Smartphone, category: 'Advanced', description: 'Device-specific trigger' },
  { id: 'geo-trigger', name: 'Geo Trigger', icon: MapPin, category: 'Advanced', description: 'Location-based trigger' },
  { id: 'referrer-trigger', name: 'Referrer Trigger', icon: ExternalLink, category: 'Advanced', description: 'Referrer-based trigger' },
  { id: 'traffic-source', name: 'Traffic Source', icon: TrendingUp, category: 'Advanced', description: 'Traffic source tracking' },
  { id: 'session-replay', name: 'Session Replay', icon: Play, category: 'Advanced', description: 'Session replay' },
  { id: 'user-journey', name: 'User Journey', icon: Route, category: 'Advanced', description: 'User journey tracking' },
  { id: 'funnel-analytics', name: 'Funnel Analytics', icon: TrendingUp, category: 'Advanced', description: 'Funnel analytics' },
  { id: 'cohort-analysis', name: 'Cohort Analysis', icon: Users, category: 'Advanced', description: 'Cohort analysis' },
  { id: 'retention-analysis', name: 'Retention Analysis', icon: Repeat, category: 'Advanced', description: 'Retention analysis' },
  { id: 'churn-analysis', name: 'Churn Analysis', icon: TrendingDown, category: 'Advanced', description: 'Churn analysis' },
  { id: 'ltv-analysis', name: 'LTV Analysis', icon: DollarSign, category: 'Advanced', description: 'Lifetime value analysis' },
  { id: 'roas-analysis', name: 'ROAS Analysis', icon: Target, category: 'Advanced', description: 'Return on ad spend analysis' },
];

interface ElementData {
  id: string;
  type: string;
  content: string;
  styles: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: Record<string, any>;
}

interface FunnelData {
  id: string;
  name: string;
  elements: ElementData[];
  settings: Record<string, any>;
  lastModified: Date;
}

// Draggable Component Item
function DraggableComponent({ component }: { component: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: component
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = component.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-grab hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
      title={component.description}
    >
      <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
      <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-1 font-medium">
        {component.name.length > 8 ? component.name.substring(0, 8) + '...' : component.name}
      </span>
    </div>
  );
}

// Droppable Canvas Area
function DroppableCanvas({ elements, onElementClick, selectedElement }: { 
  elements: ElementData[], 
  onElementClick: (element: ElementData) => void,
  selectedElement: ElementData | null 
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas'
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-screen w-full bg-white dark:bg-gray-900 border-2 border-dashed transition-all duration-200 ${
        isOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
      } relative p-4`}
    >
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="mb-4">
              <Layout className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-lg font-medium">Drag components here to build your funnel</p>
            <p className="text-sm mt-2">Start by dragging elements from the component library</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onClick={() => onElementClick(element)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Canvas Element
function CanvasElement({ element, isSelected, onClick }: { 
  element: ElementData, 
  isSelected: boolean, 
  onClick: () => void 
}) {
  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        return (
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {element.content || 'Your Heading Here'}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-gray-700 dark:text-gray-300">
            {element.content || 'Your paragraph content goes here. Click to edit with AI.'}
          </p>
        );
      case 'button':
        return (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            {element.content || 'Click Me'}
          </Button>
        );
      case 'image':
        return (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            <span className="ml-2 text-gray-500 dark:text-gray-400">Image Placeholder</span>
          </div>
        );
      case 'video':
        return (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            <span className="ml-2 text-gray-500 dark:text-gray-400">Video Placeholder</span>
          </div>
        );
      case 'container':
        return (
          <div className="w-full min-h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Container - Drop elements here</span>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">
              {element.type} - {element.content || 'Click to edit'}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-200 p-2 rounded-lg ${
        isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
      }`}
      style={{
        transform: `translate(${element.position.x}px, ${element.position.y}px)`,
        width: element.size.width,
        height: element.size.height,
        ...element.styles
      }}
    >
      {renderElement()}
    </div>
  );
}

// AI Assistant Panel
function AIAssistantPanel({ selectedElement, onUpdateElement }: { 
  selectedElement: ElementData | null, 
  onUpdateElement: (element: ElementData) => void 
}) {
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setAiInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processAIRequest = async () => {
    if (!aiInput.trim() || !selectedElement) return;

    setIsProcessing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Parse AI command and update element
      const updatedElement = { ...selectedElement };
      
      if (aiInput.toLowerCase().includes('change text to') || aiInput.toLowerCase().includes('change content to')) {
        const newContent = aiInput.toLowerCase().replace(/change (text|content) to/i, '').trim();
        updatedElement.content = newContent;
      } else if (aiInput.toLowerCase().includes('make it bigger')) {
        updatedElement.size = { 
          width: selectedElement.size.width * 1.2, 
          height: selectedElement.size.height * 1.2 
        };
      } else if (aiInput.toLowerCase().includes('make it smaller')) {
        updatedElement.size = { 
          width: selectedElement.size.width * 0.8, 
          height: selectedElement.size.height * 0.8 
        };
      } else if (aiInput.toLowerCase().includes('change color to')) {
        const color = aiInput.toLowerCase().replace(/change color to/i, '').trim();
        updatedElement.styles = { 
          ...selectedElement.styles, 
          color: color 
        };
      } else {
        // Generic content update
        updatedElement.content = aiInput;
      }

      onUpdateElement(updatedElement);
      toast.success('Element updated successfully!');
      setAiInput('');
    } catch (error) {
      toast.error('Failed to process AI request');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Assistant</h3>
          {selectedElement ? (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Editing: {selectedElement.type} element
            </div>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Click an element to edit with AI
            </div>
          )}
        </div>

        {selectedElement && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ai-input">Tell AI what you want to change:</Label>
              <div className="mt-2 space-y-2">
                <Textarea
                  id="ai-input"
                  placeholder="e.g., 'Change text to Welcome to our site', 'Make it bigger', 'Change color to blue'"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className={isListening ? 'bg-red-50 border-red-300 text-red-700' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isListening ? 'Stop' : 'Voice'}
                  </Button>
                  <Button
                    onClick={processAIRequest}
                    disabled={!aiInput.trim() || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Apply Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label>Quick Actions:</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setAiInput('Make the text bigger and bold');
                  processAIRequest();
                }}>
                  Make Bold
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setAiInput('Change color to blue');
                  processAIRequest();
                }}>
                  Blue Color
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setAiInput('Center align the content');
                  processAIRequest();
                }}>
                  Center
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setAiInput('Add more padding');
                  processAIRequest();
                }}>
                  Add Padding
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Advanced Funnel Builder Component
export default function AdvancedFunnelBuilder({ onComplete, onBack }: { 
  onComplete?: (funnel: FunnelData) => void, 
  onBack?: () => void 
}) {
  const [funnelData, setFunnelData] = useState<FunnelData>({
    id: Date.now().toString(),
    name: 'New Funnel',
    elements: [],
    settings: {},
    lastModified: new Date()
  });
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [activeCategory, setActiveCategory] = useState('Basic');
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const categories = ['Basic', 'Forms', 'Layout', 'Media', 'Navigation', 'Social', 'E-commerce', 'Analytics', 'Marketing', 'Contact', 'Content', 'Advanced'];

  const filteredComponents = componentLibrary.filter(comp => comp.category === activeCategory);

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'canvas') {
      const component = draggedItem;
      if (component) {
        const newElement: ElementData = {
          id: `${component.id}-${Date.now()}`,
          type: component.id,
          content: '',
          styles: {},
          position: { x: 0, y: funnelData.elements.length * 100 },
          size: { width: 'auto', height: 'auto' },
          properties: {}
        };

        setFunnelData(prev => ({
          ...prev,
          elements: [...prev.elements, newElement],
          lastModified: new Date()
        }));

        toast.success(`Added ${component.name} to funnel`);
      }
    }
    setDraggedItem(null);
  };

  const handleElementClick = (element: ElementData) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (updatedElement: ElementData) => {
    setFunnelData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === updatedElement.id ? updatedElement : el
      ),
      lastModified: new Date()
    }));
    setSelectedElement(updatedElement);
  };

  const handleSaveFunnel = () => {
    // Auto-save functionality
    const savedFunnels = JSON.parse(localStorage.getItem('savedFunnels') || '[]');
    const updatedFunnels = savedFunnels.filter((f: FunnelData) => f.id !== funnelData.id);
    updatedFunnels.push(funnelData);
    localStorage.setItem('savedFunnels', JSON.stringify(updatedFunnels));
    
    toast.success('Funnel saved to library!');
  };

  const handleExportFunnel = () => {
    const exportData = {
      ...funnelData,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${funnelData.name.replace(/\s+/g, '-')}-funnel.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Funnel exported successfully!');
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (funnelData.elements.length > 0) {
        handleSaveFunnel();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [funnelData]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <Input
                value={funnelData.name}
                onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last saved: {funnelData.lastModified.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={handleSaveFunnel}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleExportFunnel}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => onComplete?.(funnelData)}>
              <Check className="w-4 h-4 mr-2" />
              Complete
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Library Sidebar */}
        {!isPreviewMode && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Components ({componentLibrary.length})
              </h3>
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-3">
                  {categories.slice(0, 3).map(category => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="mt-2">
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Tabs>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="grid grid-cols-4 gap-2">
                {filteredComponents.map(component => (
                  <DraggableComponent key={component.id} component={component} />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <DroppableCanvas 
              elements={funnelData.elements} 
              onElementClick={handleElementClick}
              selectedElement={selectedElement}
            />
            <DragOverlay>
              {draggedItem && (
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg">
                  <draggedItem.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                    {draggedItem.name}
                  </span>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        {/* AI Assistant Panel */}
        {!isPreviewMode && (
          <AIAssistantPanel 
            selectedElement={selectedElement}
            onUpdateElement={handleUpdateElement}
          />
        )}
      </div>
    </div>
  );
}