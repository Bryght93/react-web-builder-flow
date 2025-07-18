import React, { useState, useRef } from 'react';
import { useSortable, useDroppable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  GripVertical, 
  Settings, 
  Trash2, 
  Copy, 
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Plus
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

// Sortable Email Element Component
export const SortableEmailElement: React.FC<{
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
      <EmailElementRenderer
        element={element}
        onContentChange={handleContentChange}
        onStyleChange={handleStyleChange}
        onStartInlineEdit={onStartInlineEdit}
        isInlineEditing={isInlineEditing}
        onFinishInlineEdit={onFinishInlineEdit}
      />
    </div>
  );
};

// Element Renderer Component
const EmailElementRenderer: React.FC<{
  element: EmailElement;
  onContentChange: (content: any) => void;
  onStyleChange: (styles: Partial<EmailElement['styles']>) => void;
  onStartInlineEdit: () => void;
  isInlineEditing: boolean;
  onFinishInlineEdit: () => void;
}> = ({ element, onContentChange, onStyleChange, onStartInlineEdit, isInlineEditing, onFinishInlineEdit }) => {
  const [tempContent, setTempContent] = useState(element.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const elementStyles = {
    backgroundColor: element.styles.backgroundColor,
    color: element.styles.textColor,
    fontSize: element.styles.fontSize,
    fontWeight: element.styles.fontWeight,
    textAlign: element.styles.textAlign,
    padding: element.styles.padding,
    margin: element.styles.margin,
    borderRadius: element.styles.borderRadius,
    border: element.styles.borderWidth ? `${element.styles.borderWidth} solid ${element.styles.borderColor || '#e5e5e5'}` : 'none',
    boxShadow: element.styles.boxShadow,
    width: element.styles.width,
    height: element.styles.height,
  };

  const handleInlineEditSave = () => {
    onContentChange(tempContent);
    onFinishInlineEdit();
  };

  const handleInlineEditCancel = () => {
    setTempContent(element.content);
    onFinishInlineEdit();
  };

  switch (element.type) {
    case 'text':
      return (
        <div style={elementStyles} className="min-h-[40px] cursor-pointer">
          {isInlineEditing ? (
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={tempContent.html || ''}
                onChange={(e) => setTempContent({ ...tempContent, html: e.target.value })}
                className="w-full min-h-[80px] resize-none"
                autoFocus
                onBlur={handleInlineEditSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleInlineEditSave();
                  } else if (e.key === 'Escape') {
                    handleInlineEditCancel();
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                Ctrl+Enter to save, Esc to cancel
              </div>
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: element.content.html || 'Click to edit text' }}
              onClick={onStartInlineEdit}
              className="prose prose-sm max-w-none"
            />
          )}
        </div>
      );

    case 'image':
      return (
        <div style={elementStyles} className="text-center">
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
          {!element.content.src && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload image</p>
              </div>
            </div>
          )}
        </div>
      );

    case 'button':
      return (
        <div style={{ ...elementStyles, display: 'inline-block' }}>
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
              textDecoration: 'none',
            }}
          >
            {element.content.text || 'Button Text'}
          </button>
        </div>
      );

    case 'video':
      return (
        <div style={elementStyles} className="text-center">
          <div className="relative inline-block">
            <img
              src={element.content.thumbnail || '/api/placeholder/600/400'}
              alt="Video thumbnail"
              className="w-full max-w-md h-auto rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
            </div>
            {element.content.title && (
              <div className="mt-2 font-medium">{element.content.title}</div>
            )}
          </div>
        </div>
      );

    case 'divider':
      return (
        <div style={elementStyles}>
          <hr 
            style={{
              border: 'none',
              borderTop: `${element.content.thickness || 1}px ${element.content.style || 'solid'} ${element.content.color || '#e5e5e5'}`,
              margin: '0',
            }}
          />
        </div>
      );

    case 'spacer':
      return (
        <div 
          style={{
            ...elementStyles,
            height: `${element.content.height || 40}px`,
            backgroundColor: 'transparent'
          }}
          className="border-2 border-dashed border-gray-300 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs text-gray-500">Spacer - {element.content.height || 40}px</span>
        </div>
      );

    case 'two-column':
      return (
        <div style={elementStyles}>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Left Column</div>
            </div>
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Right Column</div>
            </div>
          </div>
        </div>
      );

    case 'three-column':
      return (
        <div style={elementStyles}>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Column 1</div>
            </div>
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Column 2</div>
            </div>
            <div className="border border-dashed border-gray-300 p-4 min-h-[100px]">
              <div className="text-center text-gray-500 text-sm">Column 3</div>
            </div>
          </div>
        </div>
      );

    case 'header':
      return (
        <div style={elementStyles}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={element.content.logo?.src || '/api/placeholder/150/50'} 
                alt="Logo"
                className="h-8"
              />
            </div>
            <nav className="flex space-x-4">
              {element.content.navigation?.map((item: string, index: number) => (
                <a key={index} href="#" className="text-sm hover:underline">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      );

    case 'footer':
      return (
        <div style={elementStyles}>
          <div className="text-center space-y-2">
            <div className="font-medium">{element.content.companyInfo}</div>
            <div className="text-sm">{element.content.address}</div>
            <div className="text-sm">
              <a href="#" className="underline">{element.content.unsubscribeText}</a>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div style={elementStyles} className="p-4 border border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            Unknown element type: {element.type}
          </div>
        </div>
      );
  }
};

// Element Settings Panel
export const ElementSettings: React.FC<{
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
            <div>
              <label className="text-sm font-medium">Alt Text</label>
              <Input
                value={element.content.alt || ''}
                onChange={(e) => handleContentUpdate('alt', e.target.value)}
                className="mt-1"
              />
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
            <div>
              <label className="text-sm font-medium">Button Color</label>
              <Input
                type="color"
                value={element.content.backgroundColor || '#007bff'}
                onChange={(e) => handleContentUpdate('backgroundColor', e.target.value)}
                className="mt-1 h-10"
              />
            </div>
          </div>
        )}

        {element.type === 'video' && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Video URL</label>
              <Input
                value={element.content.url || ''}
                onChange={(e) => handleContentUpdate('url', e.target.value)}
                className="mt-1"
                placeholder="YouTube, Vimeo, or direct video URL"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Video Title</label>
              <Input
                value={element.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                className="mt-1"
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
          <label className="text-sm font-medium">Text Alignment</label>
          <div className="flex mt-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={element.styles.textAlign === 'left' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'left')}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={element.styles.textAlign === 'center' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'center')}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={element.styles.textAlign === 'right' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'right')}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Font Size</label>
          <Select
            value={element.styles.fontSize || '16px'}
            onValueChange={(value) => handleStyleUpdate('fontSize', value)}
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
              <SelectItem value="28px">28px</SelectItem>
              <SelectItem value="32px">32px</SelectItem>
            </SelectContent>
          </Select>
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
            placeholder="e.g., 8px, 0.5rem"
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

// Email Settings Panel
export const EmailSettings: React.FC<{
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
        <label className="text-sm font-medium">Email Width</label>
        <Slider
          value={[template.settings?.width || 600]}
          onValueChange={([value]) => onUpdate({ 
            settings: { ...template.settings, width: value }
          })}
          max={800}
          min={400}
          step={50}
          className="mt-2"
        />
        <div className="text-sm text-gray-600 mt-1">{template.settings?.width || 600}px</div>
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

      <div>
        <label className="text-sm font-medium">Font Family</label>
        <Select
          value={template.settings?.fontFamily || 'Arial, sans-serif'}
          onValueChange={(value) => onUpdate({ 
            settings: { ...template.settings, fontFamily: value }
          })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial, sans-serif">Arial</SelectItem>
            <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
            <SelectItem value="Georgia, serif">Georgia</SelectItem>
            <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
            <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// Drop Zone Component
export const DropZone: React.FC<{
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