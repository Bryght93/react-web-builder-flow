import React, { useState, useEffect } from 'react';
import { Puck, Config, Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Monitor, Smartphone, Settings, Palette, Type, Image as ImageIcon, Link, Layers, Grid, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Download, Mail, Tablet } from 'lucide-react';

// Color Picker Component
const ColorPicker = ({ value, onChange, label }: { value: string, onChange: (color: string) => void, label: string }) => {
  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
    '#ff0000', '#ff6600', '#ffcc00', '#66ff00', '#00ff66', '#00ccff',
    '#0066ff', '#6600ff', '#cc00ff', '#ff0066', '#dc2626', '#ea580c',
    '#ca8a04', '#16a34a', '#059669', '#0891b2', '#2563eb', '#7c3aed',
    '#c026d3', '#e11d48', '#f97316', '#eab308', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899'
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
          placeholder="#000000"
        />
      </div>
      <div className="grid grid-cols-6 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded border ${value === color ? 'border-blue-500 border-2' : 'border-gray-300'}`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Rich Text Editor Component
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
          <Button size="sm" variant="ghost" onClick={() => handleFormat('bold')}>
            <Bold className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('italic')}>
            <Italic className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('underline')}>
            <Underline className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('hiliteColor', '#ffff00')}>
            <Palette className="w-4 h-4" />
          </Button>
          <div className="border-l h-6 mx-2"></div>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('justifyLeft')}>
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('justifyCenter')}>
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleFormat('justifyRight')}>
            <AlignRight className="w-4 h-4" />
          </Button>
          <div className="ml-auto">
            <Button size="sm" onClick={() => {
              onChange(currentValue);
              setIsEditing(false);
            }}>
              Save
            </Button>
          </div>
        </div>
        <div
          contentEditable
          className="min-h-[100px] p-4 outline-none"
          dangerouslySetInnerHTML={{ __html: currentValue }}
          onInput={(e) => setCurrentValue(e.currentTarget.innerHTML)}
          style={{ lineHeight: '1.6' }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="min-h-[40px] p-2 border border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500"
      dangerouslySetInnerHTML={{ __html: value || 'Click to edit text...' }}
    />
  );
};

// Enhanced Heading Component with better sizing and formatting
const HeadingComponent = ({ text, level, fontSize: customFontSize, color, textAlign, fontWeight, lineHeight, marginBottom, breakText }: any) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const defaultFontSize = {
    1: 48,
    2: 40,
    3: 32,
    4: 28,
    5: 24,
    6: 20,
  }[level];

  const styles = {
    color, 
    textAlign, 
    fontSize: `${customFontSize || defaultFontSize}px`,
    fontWeight: fontWeight || 'bold',
    lineHeight: lineHeight || 1.2,
    marginBottom: `${marginBottom || 16}px`,
    marginTop: 0,
    fontFamily: 'Arial, sans-serif',
    wordBreak: breakText ? 'break-word' : 'normal',
    overflowWrap: breakText ? 'break-word' : 'normal',
  } as React.CSSProperties;

  return (
    <div className="responsive-heading">
      <Tag style={styles}>
        {text}
      </Tag>
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-heading h1 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.8, 24)}px !important; }
          .responsive-heading h2 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.85, 22)}px !important; }
          .responsive-heading h3 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.9, 20)}px !important; }
        }
        @media (max-width: 480px) {
          .responsive-heading h1 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.7, 20)}px !important; }
          .responsive-heading h2 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.75, 18)}px !important; }
          .responsive-heading h3 { font-size: ${Math.max((customFontSize || defaultFontSize) * 0.8, 16)}px !important; }
        }
      `}</style>
    </div>
  );
};

// Enhanced Text Component with rich text editing
const TextComponent = ({ text, color, fontSize, textAlign, fontWeight, lineHeight, marginBottom, breakText }: any) => (
  <div className="responsive-text" style={{ marginBottom: `${marginBottom || 16}px` }}>
    <div style={{ 
      color, 
      fontSize: `${fontSize}px`, 
      textAlign, 
      fontWeight: fontWeight || 'normal',
      lineHeight: lineHeight || 1.5,
      marginTop: 0,
      fontFamily: 'Arial, sans-serif',
      whiteSpace: 'pre-wrap',
      wordBreak: breakText ? 'break-word' : 'normal',
      overflowWrap: breakText ? 'break-word' : 'normal',
    }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
    <style jsx>{`
      @media (max-width: 768px) {
        .responsive-text { font-size: ${Math.max(fontSize * 0.9, 14)}px !important; }
      }
      @media (max-width: 480px) {
        .responsive-text { font-size: ${Math.max(fontSize * 0.85, 12)}px !important; }
      }
    `}</style>
  </div>
);

// Enhanced Button Component with responsiveness
const ButtonComponent = ({ text, href, backgroundColor, textColor, borderRadius, padding }: any) => (
  <div className="responsive-button" style={{ textAlign: 'center', margin: '20px 0' }}>
    <a
      href={href}
      style={{
        display: 'inline-block',
        backgroundColor,
        color: textColor,
        padding,
        borderRadius: `${borderRadius}px`,
        textDecoration: 'none',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {text}
    </a>
    <style jsx>{`
      @media (max-width: 480px) {
        .responsive-button a {
          display: block !important;
          width: 90% !important;
          margin: 0 auto !important;
          padding: 14px 20px !important;
        }
      }
    `}</style>
  </div>
);

// Enhanced Image Component with responsiveness
const ImageComponent = ({ src, alt, width, height, borderRadius }: any) => (
  <div className="responsive-image" style={{ textAlign: 'center', margin: '16px 0' }}>
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        borderRadius: `${borderRadius}px`,
        maxWidth: '100%',
        objectFit: 'cover'
      }}
    />
    <style jsx>{`
      @media (max-width: 768px) {
        .responsive-image img { width: 100% !important; height: auto !important; }
      }
    `}</style>
  </div>
);

// Spacer Component
const SpacerComponent = ({ height }: any) => (
  <div className="responsive-spacer" style={{ height: `${height}px` }}>
    <style jsx>{`
      @media (max-width: 768px) {
        .responsive-spacer { height: ${Math.max(height * 0.7, 10)}px !important; }
      }
    `}</style>
  </div>
);

// Divider Component
const DividerComponent = ({ color, thickness, style }: any) => (
  <hr style={{ 
    border: 'none',
    borderTop: `${thickness}px ${style} ${color}`,
    margin: '20px 0',
    width: '100%'
  }} />
);

// Enhanced Container Component with proper drop zones
const ContainerComponent = ({ backgroundColor, backgroundImage, padding, borderRadius, borderWidth, borderColor, maxWidth, textAlign, children }: any) => (
  <div className="responsive-container" style={{ 
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding,
    borderRadius: `${borderRadius}px`,
    border: borderWidth ? `${borderWidth}px solid ${borderColor}` : 'none',
    maxWidth,
    width: '100%',
    margin: '0 auto',
    textAlign,
    minHeight: '60px',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '16px'
  }}>
    {children}
    <style jsx>{`
      @media (max-width: 768px) {
        .responsive-container {
          max-width: 100% !important;
          padding: 20px 15px !important;
          margin: 0 10px 16px 10px !important;
        }
      }
      @media (max-width: 480px) {
        .responsive-container {
          padding: 15px 10px !important;
          margin: 0 5px 16px 5px !important;
        }
      }
    `}</style>
  </div>
);

// Enhanced Layout Block Component with proper drop zones
const LayoutBlockComponent = ({ layout, backgroundColor, padding, gap, verticalAlign, mobileStack, children }: any) => {
  const getGridStyle = () => {
    const baseStyle = {
      backgroundColor,
      padding,
      margin: '16px 0',
      display: 'grid',
      gap: `${gap}px`,
      alignItems: verticalAlign,
    };

    switch (layout) {
      case 'text-image':
        return { ...baseStyle, gridTemplateColumns: '1fr 1fr' };
      case 'image-text':
        return { ...baseStyle, gridTemplateColumns: '1fr 1fr' };
      case 'text-text':
        return { ...baseStyle, gridTemplateColumns: '1fr 1fr' };
      case 'three-col':
        return { ...baseStyle, gridTemplateColumns: '1fr 1fr 1fr' };
      default:
        return { ...baseStyle, gridTemplateColumns: '1fr' };
    }
  };

  return (
    <div className="responsive-layout" style={getGridStyle()}>
      {children}
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-layout {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced Puck configuration
const config: Config = {
  components: {
    // Enhanced Container with drop zones
    Container: {
      fields: {
        backgroundColor: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        backgroundImage: {
          type: 'text',
          label: 'Background Image URL',
        },
        padding: {
          type: 'text',
          label: 'Padding (e.g., 40px 30px)',
        },
        borderRadius: {
          type: 'number',
          label: 'Border Radius (px)',
          min: 0,
          max: 50,
        },
        borderWidth: {
          type: 'number',
          label: 'Border Width (px)',
          min: 0,
          max: 10,
        },
        borderColor: {
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#e5e7eb'} 
              onChange={onChange} 
              label="Border Color"
            />
          )
        },
        maxWidth: {
          type: 'text',
          label: 'Max Width (e.g., 600px, 100%)',
        },
        textAlign: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        backgroundColor: '#ffffff',
        backgroundImage: '',
        padding: '40px 30px',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#e5e7eb',
        maxWidth: '100%',
        textAlign: 'left',
      },
      render: ContainerComponent,
    },

    // Layout Block with proper drop zones
    LayoutBlock: {
      fields: {
        layout: {
          type: 'select',
          options: [
            { label: 'Text Left + Image Right', value: 'text-image' },
            { label: 'Image Left + Text Right', value: 'image-text' },
            { label: 'Text + Text (2 Columns)', value: 'text-text' },
            { label: 'Single Column', value: 'single' },
            { label: '3 Columns', value: 'three-col' },
          ],
        },
        backgroundColor: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        padding: {
          type: 'text',
          label: 'Padding (e.g., 20px 16px)',
        },
        gap: {
          type: 'number',
          label: 'Column Gap (px)',
          min: 0,
          max: 50,
        },
        verticalAlign: {
          type: 'select',
          options: [
            { label: 'Top', value: 'flex-start' },
            { label: 'Middle', value: 'center' },
            { label: 'Bottom', value: 'flex-end' },
          ],
        },
        mobileStack: {
          type: 'radio',
          options: [
            { label: 'Stack on Mobile', value: true },
            { label: 'Keep Layout', value: false },
          ],
        },
      },
      defaultProps: {
        layout: 'text-image',
        backgroundColor: '#ffffff',
        padding: '20px',
        gap: 20,
        verticalAlign: 'center',
        mobileStack: true,
      },
      render: LayoutBlockComponent,
    },

    // Enhanced Heading with better font sizes and formatting
    Heading: {
      fields: {
        text: { type: 'textarea', label: 'Heading Text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1 - Main Title (48px)', value: 1 },
            { label: 'H2 - Section Title (40px)', value: 2 },
            { label: 'H3 - Subsection (32px)', value: 3 },
            { label: 'H4 - Small Heading (28px)', value: 4 },
            { label: 'H5 - Smaller (24px)', value: 5 },
            { label: 'H6 - Smallest (20px)', value: 6 },
          ],
        },
        fontSize: {
          type: 'number',
          label: 'Custom Font Size (px)',
          min: 12,
          max: 96,
        },
        color: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#333333'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
        textAlign: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        fontWeight: {
          type: 'select',
          options: [
            { label: 'Light', value: '300' },
            { label: 'Normal', value: 'normal' },
            { label: 'Medium', value: '500' },
            { label: 'Bold', value: 'bold' },
            { label: 'Extra Bold', value: '800' },
            { label: 'Black', value: '900' },
          ],
        },
        lineHeight: {
          type: 'number',
          label: 'Line Height',
          min: 1,
          max: 3,
          step: 0.1,
        },
        marginBottom: {
          type: 'number',
          label: 'Bottom Margin (px)',
          min: 0,
          max: 60,
        },
        breakText: {
          type: 'radio',
          options: [
            { label: 'Yes - Break Long Words', value: true },
            { label: 'No - Keep Words Intact', value: false },
          ],
        },
      },
      defaultProps: {
        text: 'Your Heading Here',
        level: 2,
        fontSize: 40,
        color: '#333333',
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginBottom: 16,
        breakText: false,
      },
      render: HeadingComponent,
    },

    // Enhanced Text with rich editing
    Text: {
      fields: {
        text: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <RichTextEditor value={value || ''} onChange={onChange} />
          )
        },
        color: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#666666'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
        fontSize: { 
          type: 'number', 
          label: 'Font Size (px)',
          min: 10,
          max: 48,
        },
        lineHeight: {
          type: 'number',
          label: 'Line Height',
          min: 1,
          max: 3,
          step: 0.1,
        },
        textAlign: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
            { label: 'Justify', value: 'justify' },
          ],
        },
        fontWeight: {
          type: 'select',
          options: [
            { label: 'Light', value: '300' },
            { label: 'Normal', value: 'normal' },
            { label: 'Medium', value: '500' },
            { label: 'Bold', value: 'bold' },
          ],
        },
        marginBottom: {
          type: 'number',
          label: 'Bottom Margin (px)',
          min: 0,
          max: 60,
        },
        breakText: {
          type: 'radio',
          options: [
            { label: 'Yes - Break Long Words', value: true },
            { label: 'No - Keep Words Intact', value: false },
          ],
        },
      },
      defaultProps: {
        text: 'Your email content goes here. You can format this text with bold, italic, underline, and more using the rich text editor.',
        color: '#666666',
        fontSize: 16,
        lineHeight: 1.5,
        textAlign: 'left',
        fontWeight: 'normal',
        marginBottom: 16,
        breakText: false,
      },
      render: TextComponent,
    },

    Button: {
      fields: {
        text: { type: 'text', label: 'Button Text' },
        href: { type: 'text', label: 'Link URL' },
        backgroundColor: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#2563eb'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        textColor: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
        borderRadius: { 
          type: 'number', 
          label: 'Border Radius (px)',
          min: 0,
          max: 50,
        },
        padding: { 
          type: 'text', 
          label: 'Padding (e.g., 16px 32px)' 
        },
      },
      defaultProps: {
        text: 'Click Here',
        href: 'https://example.com',
        backgroundColor: '#2563eb',
        textColor: '#ffffff',
        borderRadius: 8,
        padding: '16px 32px',
      },
      render: ButtonComponent,
    },

    Image: {
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        width: { type: 'text', label: 'Width (e.g., 100%, 300px)' },
        height: { type: 'text', label: 'Height (e.g., auto, 200px)' },
        borderRadius: { 
          type: 'number', 
          label: 'Border Radius (px)',
          min: 0,
          max: 50,
        },
      },
      defaultProps: {
        src: 'https://via.placeholder.com/600x300/e2e8f0/64748b?text=Your+Image',
        alt: 'Email Image',
        width: '100%',
        height: 'auto',
        borderRadius: 0,
      },
      render: ImageComponent,
    },

    Spacer: {
      fields: {
        height: { 
          type: 'number', 
          label: 'Height (px)',
          min: 5,
          max: 200,
        },
      },
      defaultProps: {
        height: 20,
      },
      render: SpacerComponent,
    },

    Divider: {
      fields: {
        color: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#e2e8f0'} 
              onChange={onChange} 
              label="Divider Color"
            />
          )
        },
        thickness: { 
          type: 'number', 
          label: 'Thickness (px)',
          min: 1,
          max: 10,
        },
        style: {
          type: 'select',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
          ],
        },
      },
      defaultProps: {
        color: '#e2e8f0',
        thickness: 1,
        style: 'solid',
      },
      render: DividerComponent,
    },
  },

  categories: {
    'Layout': {
      components: ['Container', 'LayoutBlock']
    },
    'Content': {
      components: ['Heading', 'Text', 'Image']
    },
    'Interactive': {
      components: ['Button']
    },
    'Design': {
      components: ['Spacer', 'Divider']
    }
  },

  root: {
    fields: {
      emailBackgroundColor: {
        type: 'custom',
        render: ({ onChange, value }) => (
          <ColorPicker 
            value={value || '#f8fafc'} 
            onChange={onChange} 
            label="Canvas Background Color"
          />
        )
      },
      contentWidth: {
        type: 'text',
        label: 'Content Width (e.g., 600px)',
      },
      contentBackgroundColor: {
        type: 'custom',
        render: ({ onChange, value }) => (
          <ColorPicker 
            value={value || '#ffffff'} 
            onChange={onChange} 
            label="Content Background Color"
          />
        )
      },
      fontFamily: {
        type: 'select',
        options: [
          { label: 'Arial', value: 'Arial, sans-serif' },
          { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
          { label: 'Georgia', value: 'Georgia, serif' },
          { label: 'Times New Roman', value: 'Times New Roman, serif' },
          { label: 'Verdana', value: 'Verdana, sans-serif' },
        ],
      },
      padding: {
        type: 'text',
        label: 'Canvas Padding (e.g., 40px 20px)',
      },
    },
    defaultProps: {
      emailBackgroundColor: '#f8fafc',
      contentWidth: '100%',
      contentBackgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
    },
    render: ({ children, emailBackgroundColor, contentWidth, contentBackgroundColor, fontFamily, padding }) => (
      <div style={{ 
        backgroundColor: emailBackgroundColor,
        fontFamily,
        padding,
        minHeight: '100vh',
        fontSize: '16px',
      }}>
        <div style={{ 
          maxWidth: contentWidth, 
          width: '100%',
          margin: '0 auto',
          backgroundColor: contentBackgroundColor,
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          minHeight: '400px',
        }}>
          {children}
        </div>
      </div>
    ),
  },
};

// Interface definitions
interface PuckEmailEditorProps {
  onBack: () => void;
  onSave: (data: Data) => void;
  initialData?: Data;
  emailTemplate?: {
    id?: number;
    name: string;
    subject: string;
  };
}

// Enhanced Email Editor Component
export default function PuckEmailEditor({ 
  onBack, 
  onSave, 
  initialData,
  emailTemplate 
}: PuckEmailEditorProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentData, setCurrentData] = useState<Data>(initialData || getTemplateContent());

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (currentData) {
        // Save as draft to "My Emails"
        const draftEmail = {
          id: Date.now(),
          name: emailTemplate?.name || 'Untitled Email',
          subject: emailTemplate?.subject || 'No Subject',
          content: currentData,
          status: 'draft',
          lastModified: new Date().toISOString(),
          type: 'email'
        };

        // Save to localStorage for "My Emails" library
        const savedEmails = JSON.parse(localStorage.getItem('myEmails') || '[]');
        const existingIndex = savedEmails.findIndex((email: any) => 
          email.name === draftEmail.name && email.status === 'draft'
        );

        if (existingIndex >= 0) {
          savedEmails[existingIndex] = draftEmail;
        } else {
          savedEmails.unshift(draftEmail);
        }

        localStorage.setItem('myEmails', JSON.stringify(savedEmails));
      }
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [currentData, emailTemplate]);

  function getTemplateContent() {
    const templateName = emailTemplate?.name;

    if (initialData && initialData.content && initialData.content.length > 0) {
      return initialData;
    }

    if (templateName?.includes('Welcome')) {
      return {
        content: [
          {
            type: "Container",
            props: {
              id: "container-1",
              backgroundColor: '#ffffff',
              padding: '40px 30px',
              maxWidth: '100%',
            }
          },
          {
            type: "Heading",
            props: {
              id: "heading-1",
              text: "🎉 Welcome to Our Community!",
              level: 1,
              color: '#2563eb',
              textAlign: 'center',
              fontSize: 48,
            },
          },
          {
            type: "Text",
            props: {
              id: "text-1",
              text: "Hi there! We're thrilled to have you join our community. Get ready for an amazing journey ahead!",
              color: '#475569',
              fontSize: 16,
              textAlign: 'left',
              fontWeight: 'normal',
            },
          },
          {
            type: "Button",
            props: {
              id: "button-1",
              text: "Get Started Now",
              href: "https://example.com/get-started",
              backgroundColor: '#2563eb',
              textColor: '#ffffff',
              borderRadius: 8,
              padding: '16px 32px',
            },
          },
        ],
        root: {
          emailBackgroundColor: '#f8fafc',
          contentWidth: '100%',
          fontFamily: 'Arial, sans-serif',
        }
      };
    }

    return {
      content: [
        {
          type: "Container",
          props: {
            id: "container-default",
            backgroundColor: '#ffffff',
            padding: '40px 30px',
            maxWidth: '100%',
          }
        },
        {
          type: "Heading",
          props: {
            id: "heading-default",
            text: "Your Email Title",
            level: 2,
            color: '#333333',
            textAlign: 'center',
            fontSize: 40,
          },
        },
        {
          type: "Text",
          props: {
            id: "text-default",
            text: "Start building your email by dragging components from the sidebar. You can add text, images, buttons, and more!",
            color: '#666666',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'normal',
          },
        },
      ],
      root: {
        emailBackgroundColor: '#f8fafc',
        contentWidth: '100%',
        fontFamily: 'Arial, sans-serif',
      }
    };
  }

  const handleDataChange = (data: Data) => {
    setCurrentData(data);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced Header Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {emailTemplate?.name || 'Email Editor'}
            </span>
            <Badge variant="outline" className="text-xs">Auto-saving</Badge>
          </div>
        </div>

        {/* Top Toolbar */}
        <div className="flex items-center gap-3">
          {/* Preview Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className="h-8 px-3"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
              className="h-8 px-3"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="h-8 px-3"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>

          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onSave(currentData)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
        </div>
      </div>

      {/* Enhanced Puck Editor */}
      <div className="flex-1 relative">
        <Puck
          config={config}
          data={currentData}
          onChange={handleDataChange}
          onPublish={(data: Data) => {
            onSave(data);
          }}
          ui={{
            leftSideBarVisible: true,
            rightSideBarVisible: true,
            headerVisible: false,
          }}
          iframe={{
            enabled: true,
            waitForStyles: true,
          }}
        />
      </div>

      {/* Enhanced CSS for proper responsive design and drop zones */}
      <style jsx global>{`
        /* Full screen Puck editor */
        .Puck {
          height: 100vh !important;
          font-size: 14px;
        }

        /* Component sidebar styling */
        .Puck-sidebarSection {
          margin-bottom: 20px;
        }

        .Puck-sidebarSectionTitle {
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8b8b8b;
          margin-bottom: 12px;
          padding: 0 16px;
        }

        /* Component grid - 2x2 square blocks */
        .Puck-componentList {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 12px !important;
          padding: 0 16px !important;
        }

        /* Individual component blocks */
        .Puck-component {
          aspect-ratio: 1 !important;
          border: 2px solid #e0e0e0 !important;
          border-radius: 12px !important;
          padding: 16px 8px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          background: white !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          text-align: center !important;
          min-height: 90px !important;
          max-height: 90px !important;
          width: 100% !important;
        }

        .Puck-component:hover {
          border-color: #4CAF50 !important;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15) !important;
          transform: translateY(-2px) !important;
        }

        .Puck-component.Puck-component--selected {
          border-color: #2196F3 !important;
          background: #f0f8ff !important;
        }

        /* Component label styling */
        .Puck-componentLabel {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #333333 !important;
          line-height: 1.2 !important;
          text-align: center !important;
        }

        /* Preview area styling with responsive views */
        .Puck-preview {
          background: #f5f5f5 !important;
          padding: 30px !important;
          overflow-y: auto !important;
        }

        .Puck-previewFrame {
          background: white !important;
          border-radius: 8px !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1) !important;
          max-width: ${previewMode === 'mobile' ? '375px' : previewMode === 'tablet' ? '768px' : '100%'} !important;
          margin: 0 auto !important;
          transition: max-width 0.3s ease !important;
          min-height: 500px !important;
        }

        /* Enhanced drop zones for containers and layout blocks */
        .Puck-dropZone {
          min-height: 80px !important;
          border: 2px dashed #cccccc !important;
          border-radius: 8px !important;
          margin: 8px 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #888888 !important;
          font-size: 13px !important;
          background: #fafafa !important;
          position: relative !important;
        }

        .Puck-dropZone:hover, .Puck-dropZone--isOver {
          border-color: #2196F3 !important;
          background: #f0f8ff !important;
          color: #2196F3 !important;
        }

        .Puck-dropZone::after {
          content: "Drop components here" !important;
          position: absolute !important;
          pointer-events: none !important;
        }

        /* Proper container and layout block drop zones */
        .Puck-render [data-puck-component-type="Container"] .Puck-dropZone,
        .Puck-render [data-puck-component-type="LayoutBlock"] .Puck-dropZone {
          min-height: 100px !important;
          border: 2px dashed #4CAF50 !important;
          background: #f8fff8 !important;
        }

        /* Right sidebar styling */
        .Puck-fields {
          padding: 20px !important;
          background: #fafafa !important;
        }

        .Puck-field {
          margin-bottom: 20px !important;
        }

        .Puck-fieldLabel {
          font-weight: 600 !important;
          font-size: 13px !important;
          color: #333333 !important;
          margin-bottom: 8px !important;
          display: block !important;
        }

        /* Enhanced input styling */
        .Puck-input, .Puck-textarea, .Puck-select {
          width: 100% !important;
          padding: 10px 14px !important;
          border: 2px solid #e0e0e0 !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          background: white !important;
          font-family: inherit !important;
        }

        .Puck-input:focus, .Puck-textarea:focus, .Puck-select:focus {
          outline: none !important;
          border-color: #2196F3 !important;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1) !important;
        }

        /* Sidebar widths */
        .Puck-sidebarLeft {
          width: 320px !important;
          background: #fafafa !important;
          border-right: 1px solid #e0e0e0 !important;
        }

        .Puck-sidebarRight {
          width: 350px !important;
          background: #fafafa !important;
          border-left: 1px solid #e0e0e0 !important;
        }

        /* Make content areas properly droppable */
        .Puck-render {
          min-height: 400px !important;
          padding: 20px !important;
        }

        /* Mobile responsive styles for the email content */
        @media (max-width: 768px) {
          .responsive-container,
          .responsive-heading,
          .responsive-text,
          .responsive-button,
          .responsive-image,
          .responsive-layout {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}