import React, { useState } from 'react';
import { Puck, Config, Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Send, Monitor, Smartphone, Settings, Palette, Type, Image as ImageIcon, Link, Layers, Grid, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';

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

// Define email component types for Puck
interface HeadingProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  color: string;
  textAlign: 'left' | 'center' | 'right';
}

interface TextProps {
  text: string;
  color: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
}

interface ButtonProps {
  text: string;
  href: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  padding: string;
}

interface ImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  borderRadius: number;
}

interface SpacerProps {
  height: number;
}

interface DividerProps {
  color: string;
  thickness: number;
  style: 'solid' | 'dashed' | 'dotted';
}

interface ContainerProps {
  backgroundColor: string;
  padding: string;
  maxWidth: string;
  children: React.ReactNode;
}

interface LayoutBlockProps {
  columns: 1 | 2 | 3 | 4;
  backgroundColor: string;
  padding: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted';
  fullWidth: boolean;
  stackOnMobile: boolean;
  children: React.ReactNode;
}

interface SocialIconsProps {
  icons: { platform: string; url: string; color: string }[];
  size: number;
  style: 'circle' | 'square' | 'rounded';
  spacing: number;
}

interface LinkBarProps {
  links: { text: string; url: string }[];
  alignment: 'left' | 'center' | 'right';
  color: string;
  fontSize: number;
  spacing: number;
}

interface TextWrapImageProps {
  src: string;
  alt: string;
  text: string;
  imagePosition: 'left' | 'right';
  imageWidth: string;
  borderRadius: number;
}

interface VideoProps {
  thumbnailSrc: string;
  videoUrl: string;
  alt: string;
  width: string;
  height: string;
  borderRadius: number;
}

interface HTMLBlockProps {
  htmlContent: string;
}

// Puck component definitions
const HeadingComponent = ({ text, level, fontSize: customFontSize, color, textAlign, fontWeight, lineHeight, marginBottom }: any) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const defaultFontSize = {
    1: 32,
    2: 28,
    3: 24,
    4: 20,
    5: 18,
    6: 16,
  }[level];
  
  return (
    <Tag style={{ 
      color, 
      textAlign, 
      fontSize: `${customFontSize || defaultFontSize}px`,
      fontWeight: fontWeight || 'bold',
      lineHeight: lineHeight || 1.2,
      marginBottom: `${marginBottom || 16}px`,
      marginTop: 0,
      fontFamily: 'Arial, sans-serif'
    }}>
      {text}
    </Tag>
  );
};

const TextComponent = ({ text, color, fontSize, textAlign, fontWeight, lineHeight, marginBottom }: any) => (
  <p style={{ 
    color, 
    fontSize: `${fontSize}px`, 
    textAlign, 
    fontWeight: fontWeight || 'normal',
    lineHeight: lineHeight || 1.5,
    marginBottom: `${marginBottom || 16}px`,
    marginTop: 0,
    fontFamily: 'Arial, sans-serif',
    whiteSpace: 'pre-wrap'
  }}>
    {text}
  </p>
);

const ButtonComponent = ({ text, href, backgroundColor, textColor, borderRadius, padding }: ButtonProps) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
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
  </div>
);

const ImageComponent = ({ src, alt, width, height, borderRadius }: ImageProps) => (
  <div style={{ textAlign: 'center', margin: '16px 0' }}>
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
  </div>
);

const SpacerComponent = ({ height }: SpacerProps) => (
  <div style={{ height: `${height}px` }} />
);

const DividerComponent = ({ color, thickness, style }: DividerProps) => (
  <hr style={{ 
    border: 'none',
    borderTop: `${thickness}px ${style} ${color}`,
    margin: '20px 0',
    width: '100%'
  }} />
);

const ContainerComponent = ({ backgroundColor, backgroundImage, padding, borderRadius, borderWidth, borderColor, maxWidth, textAlign, children }: any) => (
  <div style={{ 
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding,
    borderRadius: `${borderRadius}px`,
    border: borderWidth ? `${borderWidth}px solid ${borderColor}` : 'none',
    maxWidth,
    margin: '0 auto',
    textAlign,
    minHeight: '60px',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '16px'
  }}>
    {children}
  </div>
);

// Enhanced Layout Block Component with proper grid functionality
const LayoutBlockComponent = ({ layout, backgroundColor, padding, gap, verticalAlign, mobileStack }: any) => {
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

  const renderContent = () => {
    switch (layout) {
      case 'text-image':
        return (
          <>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              📝 Text Content Area
            </div>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              🖼️ Image Area
            </div>
          </>
        );
      case 'image-text':
        return (
          <>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              🖼️ Image Area
            </div>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              📝 Text Content Area
            </div>
          </>
        );
      case 'text-text':
        return (
          <>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              📝 Text Column 1
            </div>
            <div style={{ 
              minHeight: '120px', 
              border: '2px dashed #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '14px',
              padding: '20px'
            }}>
              📝 Text Column 2
            </div>
          </>
        );
      case 'three-col':
        return Array.from({ length: 3 }, (_, i) => (
          <div key={i} style={{ 
            minHeight: '120px', 
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '14px',
            padding: '20px'
          }}>
            Column {i + 1}
          </div>
        ));
      default:
        return (
          <div style={{ 
            minHeight: '120px', 
            border: '2px dashed #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '14px',
            padding: '20px'
          }}>
            📄 Single Column Content
          </div>
        );
    }
  };

  return (
    <div style={getGridStyle()}>
      {renderContent()}
    </div>
  );
};

const SocialIconsComponent = ({ icons, size, style, spacing }: SocialIconsProps) => (
  <div style={{ 
    display: 'flex', 
    gap: `${spacing}px`, 
    justifyContent: 'center',
    margin: '20px 0'
  }}>
    {icons.map((icon, index) => (
      <a 
        key={index}
        href={icon.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: icon.color,
          borderRadius: style === 'circle' ? '50%' : style === 'rounded' ? '8px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textDecoration: 'none',
          fontSize: `${size * 0.6}px`,
          fontWeight: 'bold',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {icon.platform.charAt(0).toUpperCase()}
      </a>
    ))}
  </div>
);

const LinkBarComponent = ({ links, alignment, color, fontSize, spacing }: LinkBarProps) => (
  <div style={{ 
    display: 'flex', 
    gap: `${spacing}px`,
    justifyContent: alignment,
    margin: '20px 0',
    flexWrap: 'wrap'
  }}>
    {links.map((link, index) => (
      <a
        key={index}
        href={link.url}
        style={{
          color,
          fontSize: `${fontSize}px`,
          textDecoration: 'none',
          fontFamily: 'Arial, sans-serif',
          padding: '8px 12px',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        {link.text}
      </a>
    ))}
  </div>
);

const TextWrapImageComponent = ({ src, alt, text, imagePosition, imageWidth, borderRadius }: TextWrapImageProps) => (
  <div style={{ 
    display: 'flex', 
    gap: '16px',
    alignItems: 'flex-start',
    flexDirection: imagePosition === 'left' ? 'row' : 'row-reverse',
    margin: '20px 0'
  }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: imageWidth,
        borderRadius: `${borderRadius}px`,
        flexShrink: 0
      }}
    />
    <p style={{
      margin: 0,
      lineHeight: 1.6,
      fontFamily: 'Arial, sans-serif',
      flex: 1
    }}>
      {text}
    </p>
  </div>
);

const VideoComponent = ({ thumbnailSrc, videoUrl, alt, width, height, borderRadius }: VideoProps) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={thumbnailSrc}
          alt={alt}
          style={{
            width,
            height,
            borderRadius: `${borderRadius}px`,
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px'
        }}>
          ▶
        </div>
      </div>
    </a>
  </div>
);

const HTMLBlockComponent = ({ htmlContent }: HTMLBlockProps) => (
  <div 
    style={{ margin: '16px 0' }}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
);

// Enhanced Puck configuration for email components with proper layout blocks
const config: Config = {
  components: {
    // Advanced Container with full editing capabilities
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
        maxWidth: '600px',
        textAlign: 'left',
      },
      render: ContainerComponent,
    },

    // Layout Block with proper grid functionality
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
            { label: 'Top', value: 'top' },
            { label: 'Middle', value: 'middle' },
            { label: 'Bottom', value: 'bottom' },
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
        verticalAlign: 'middle',
        mobileStack: true,
      },
      render: LayoutBlockComponent,
    },

    // Enhanced Text Elements with proper sizing
    Heading: {
      fields: {
        text: { type: 'text', label: 'Heading Text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1 - Main Title (32px)', value: 1 },
            { label: 'H2 - Section Title (28px)', value: 2 },
            { label: 'H3 - Subsection (24px)', value: 3 },
            { label: 'H4 - Small Heading (20px)', value: 4 },
          ],
        },
        fontSize: {
          type: 'number',
          label: 'Custom Font Size (px)',
          min: 12,
          max: 72,
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
            { label: 'Normal', value: 'normal' },
            { label: 'Bold', value: 'bold' },
            { label: 'Extra Bold', value: '800' },
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
      },
      defaultProps: {
        text: 'Your Heading Here',
        level: 2,
        fontSize: 28,
        color: '#333333',
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 1.2,
        marginBottom: 16,
      },
      render: HeadingComponent,
    },

    Text: {
      fields: {
        text: { type: 'textarea', label: 'Text Content' },
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
            { label: 'Normal', value: 'normal' },
            { label: 'Bold', value: 'bold' },
          ],
        },
        marginBottom: {
          type: 'number',
          label: 'Bottom Margin (px)',
          min: 0,
          max: 60,
        },
      },
      defaultProps: {
        text: 'Your email content goes here. You can add multiple paragraphs and format them as needed.',
        color: '#666666',
        fontSize: 16,
        lineHeight: 1.5,
        textAlign: 'left',
        fontWeight: 'normal',
        marginBottom: 16,
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
          max: 100,
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

    // Advanced Components
    SocialIcons: {
      fields: {
        icons: {
          type: 'array',
          arrayFields: {
            platform: { type: 'text', label: 'Platform Name' },
            url: { type: 'text', label: 'URL' },
            color: { 
              type: 'custom',
              render: ({ onChange, value }) => (
                <ColorPicker 
                  value={value || '#3b82f6'} 
                  onChange={onChange} 
                  label="Icon Color"
                />
              )
            },
          }
        },
        size: { 
          type: 'number', 
          label: 'Icon Size (px)',
          min: 20,
          max: 60,
        },
        style: {
          type: 'select',
          options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' },
            { label: 'Rounded', value: 'rounded' },
          ],
        },
        spacing: { 
          type: 'number', 
          label: 'Spacing (px)',
          min: 4,
          max: 20,
        },
      },
      defaultProps: {
        icons: [
          { platform: 'Facebook', url: 'https://facebook.com', color: '#1877f2' },
          { platform: 'Twitter', url: 'https://twitter.com', color: '#1da1f2' },
          { platform: 'Instagram', url: 'https://instagram.com', color: '#e4405f' },
        ],
        size: 32,
        style: 'circle',
        spacing: 8,
      },
      render: SocialIconsComponent,
    },

    LinkBar: {
      fields: {
        links: {
          type: 'array',
          arrayFields: {
            text: { type: 'text', label: 'Link Text' },
            url: { type: 'text', label: 'URL' },
          }
        },
        alignment: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        color: { 
          type: 'custom',
          render: ({ onChange, value }) => (
            <ColorPicker 
              value={value || '#2563eb'} 
              onChange={onChange} 
              label="Link Color"
            />
          )
        },
        fontSize: { 
          type: 'number', 
          label: 'Font Size (px)',
          min: 10,
          max: 24,
        },
        spacing: { 
          type: 'number', 
          label: 'Spacing (px)',
          min: 4,
          max: 30,
        },
      },
      defaultProps: {
        links: [
          { text: 'Home', url: 'https://example.com' },
          { text: 'About', url: 'https://example.com/about' },
          { text: 'Services', url: 'https://example.com/services' },
          { text: 'Contact', url: 'https://example.com/contact' },
        ],
        alignment: 'center',
        color: '#2563eb',
        fontSize: 14,
        spacing: 16,
      },
      render: LinkBarComponent,
    },

    TextWrapImage: {
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        text: { type: 'textarea', label: 'Text Content' },
        imagePosition: {
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        imageWidth: { type: 'text', label: 'Image Width (e.g., 150px, 30%)' },
        borderRadius: { 
          type: 'number', 
          label: 'Border Radius (px)',
          min: 0,
          max: 50,
        },
      },
      defaultProps: {
        src: 'https://via.placeholder.com/150x150/e2e8f0/64748b?text=Image',
        alt: 'Content Image',
        text: 'This text wraps around the image. You can position the image on the left or right side of the text content.',
        imagePosition: 'left',
        imageWidth: '150px',
        borderRadius: 0,
      },
      render: TextWrapImageComponent,
    },

    Video: {
      fields: {
        thumbnailSrc: { type: 'text', label: 'Thumbnail Image URL' },
        videoUrl: { type: 'text', label: 'Video URL (YouTube/Vimeo)' },
        alt: { type: 'text', label: 'Alt Text' },
        width: { type: 'text', label: 'Width (e.g., 100%, 400px)' },
        height: { type: 'text', label: 'Height (e.g., 225px)' },
        borderRadius: { 
          type: 'number', 
          label: 'Border Radius (px)',
          min: 0,
          max: 50,
        },
      },
      defaultProps: {
        thumbnailSrc: 'https://via.placeholder.com/560x315/e2e8f0/64748b?text=Video+Thumbnail',
        videoUrl: 'https://youtube.com/watch?v=example',
        alt: 'Video Preview',
        width: '100%',
        height: '315px',
        borderRadius: 8,
      },
      render: VideoComponent,
    },

    HTMLBlock: {
      fields: {
        htmlContent: { 
          type: 'textarea', 
          label: 'HTML/CSS Code' 
        },
      },
      defaultProps: {
        htmlContent: '<div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; text-align: center;"><h3>Custom HTML Block</h3><p>Add your custom HTML and CSS here.</p></div>',
      },
      render: HTMLBlockComponent,
    },
  },

  // Categories for better organization (like in Mailchimp)
  categories: {
    'Layout': {
      components: ['Container', 'LayoutBlock']
    },
    'Content': {
      components: ['Heading', 'Text', 'Image', 'Video']
    },
    'Interactive': {
      components: ['Button', 'LinkBar']
    },
    'Design': {
      components: ['Spacer', 'Divider', 'SocialIcons']
    },
    'Advanced': {
      components: ['TextWrapImage', 'HTMLBlock']
    }
  },

  // Enhanced root configuration for email canvas
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
      backgroundImage: {
        type: 'text',
        label: 'Canvas Background Image URL',
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
      backgroundImage: '',
      contentWidth: '600px',
      contentBackgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
    },
    render: ({ children, emailBackgroundColor, backgroundImage, contentWidth, contentBackgroundColor, fontFamily, padding }) => (
      <div style={{ 
        backgroundColor: emailBackgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily,
        padding,
        minHeight: '100vh',
        fontSize: '16px',
      }}>
        <div style={{ 
          maxWidth: contentWidth, 
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

// Template and interface definitions
interface PuckEmailEditorProps {
  onBack: () => void;
  onSave: (data: Data) => void;
  initialData?: Data;
  emailTemplate?: {
    id: number;
    name: string;
    subject: string;
  };
}

// Enhanced Email Editor Component with full-screen layout and Mailchimp-style interface
export default function PuckEmailEditor({ 
  onBack, 
  onSave, 
  initialData,
  emailTemplate 
}: PuckEmailEditorProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showGlobalStyles, setShowGlobalStyles] = useState(false);

  // Create template-specific content based on the selected template
  const getTemplateContent = () => {
    const templateName = emailTemplate?.name;
    
    // If we have initial data passed in, use it
    if (initialData && initialData.content && initialData.content.length > 0) {
      return initialData.content;
    }
    
    if (templateName?.includes('Welcome')) {
      return [
        {
          type: "Container",
          props: {
            id: "container-1",
            backgroundColor: '#ffffff',
            padding: '40px 30px',
            maxWidth: '600px',
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
          },
        },
        {
          type: "Text",
          props: {
            id: "text-1",
            text: "Hi there! We're thrilled to have you join our community.",
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
      ];
    }
    
    // Default empty content
    return [
      {
        type: "Container",
        props: {
          id: "container-default",
          backgroundColor: '#ffffff',
          padding: '40px 30px',
          maxWidth: '600px',
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
        },
      },
      {
        type: "Text",
        props: {
          id: "text-default",
          text: "Start building your email by dragging components from the sidebar.",
          color: '#666666',
          fontSize: 16,
          textAlign: 'center',
          fontWeight: 'normal',
        },
      },
    ];
  };

  const initialPuckData: Data = {
    content: getTemplateContent(),
    root: {
      emailBackgroundColor: '#f8fafc',
      contentWidth: '600px',
      fontFamily: 'Arial, sans-serif',
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced Header Bar - Mailchimp Style */}
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
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="h-8 px-3"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Enhanced Action Buttons with All Save Options */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview Live
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Save as Template
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save as Draft
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onSave(initialPuckData)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
          
          <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Test
          </Button>
        </div>
      </div>

      {/* Enhanced Puck Editor with Full Screen and Custom Layout */}
      <div className="flex-1 relative">
        <Puck
          config={config}
          data={initialPuckData}
          onPublish={(data: Data) => {
            onSave(data);
          }}
          ui={{
            leftSideBarVisible: true,
            rightSideBarVisible: true,
            headerVisible: false,
            // Custom component layout - 2x2 grid like Mailchimp
            componentList: {
              category: 'inline',
              components: {
                // Layout section - appears as 2x2 grid
                'Layout': [
                  { Component: 'Container', Icon: () => <Layers className="w-5 h-5" /> },
                  { Component: 'LayoutBlock', Icon: () => <Grid className="w-5 h-5" /> },
                ],
                // Content section  
                'Content': [
                  { Component: 'Heading', Icon: () => <Type className="w-5 h-5" /> },
                  { Component: 'Text', Icon: () => <AlignLeft className="w-5 h-5" /> },
                  { Component: 'Image', Icon: () => <ImageIcon className="w-5 h-5" /> },
                  { Component: 'Video', Icon: () => <Monitor className="w-5 h-5" /> },
                ],
                // Interactive section
                'Interactive': [
                  { Component: 'Button', Icon: () => <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">BTN</div> },
                  { Component: 'LinkBar', Icon: () => <Link className="w-5 h-5" /> },
                ],
                // Design section
                'Design': [
                  { Component: 'Spacer', Icon: () => <div className="w-5 h-1 bg-gray-400 rounded"></div> },
                  { Component: 'Divider', Icon: () => <div className="w-5 h-px bg-gray-400"></div> },
                  { Component: 'SocialIcons', Icon: () => <div className="flex gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><div className="w-2 h-2 bg-pink-500 rounded-full"></div></div> },
                ],
                // Advanced section  
                'Advanced': [
                  { Component: 'TextWrapImage', Icon: () => <div className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /><Type className="w-3 h-3" /></div> },
                  { Component: 'HTMLBlock', Icon: () => <div className="text-xs font-mono">&lt;/&gt;</div> },
                ],
              }
            },
          }}
          // Enhanced styling for full-screen and Mailchimp-like appearance
          iframe={{
            enabled: true,
            waitForStyles: true,
          }}
        />
      </div>

      {/* Enhanced CSS for Mailchimp-style 2x2 square component blocks */}
      <style jsx global>{`
        /* Full screen Puck editor */
        .Puck {
          height: 100vh !important;
          font-size: 14px;
        }
        
        /* Component sidebar styling - EXACTLY like your screenshot */
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
        
        /* CRITICAL: Component grid - EXACTLY 2x2 square blocks like your screenshot */
        .Puck-componentList {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 12px !important;
          padding: 0 16px !important;
        }
        
        /* CRITICAL: Individual component blocks - EXACTLY square like your screenshot */
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
        
        /* Component icon styling */
        .Puck-component > div:first-child {
          font-size: 24px !important;
          margin-bottom: 4px !important;
        }
        
        /* Component label styling - EXACTLY like your screenshot */
        .Puck-componentLabel {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #333333 !important;
          line-height: 1.2 !important;
          text-align: center !important;
        }
        
        /* Dots under component name like your screenshot */
        .Puck-componentLabel::after {
          content: '••••••';
          display: block;
          color: #cccccc;
          font-size: 8px;
          margin-top: 4px;
          letter-spacing: 1px;
        }
        
        /* Preview area styling - larger content like Mailchimp */
        .Puck-preview {
          background: #f5f5f5 !important;
          padding: 30px !important;
          overflow-y: auto !important;
          zoom: 1.2 !important;
        }
        
        .Puck-previewFrame {
          background: white !important;
          border-radius: 8px !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1) !important;
          max-width: ${previewMode === 'mobile' ? '375px' : '700px'} !important;
          margin: 0 auto !important;
          transition: max-width 0.3s ease !important;
          min-height: 500px !important;
        }
        
        /* ZOOM content to make text larger and more visible */
        .Puck-preview .Puck-render > * {
          zoom: 1.1 !important;
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
        
        /* Enhanced input styling for better visibility */
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
        
        /* Left sidebar width for better component visibility - WIDER */
        .Puck-sidebarLeft {
          width: 320px !important;
          background: #fafafa !important;
          border-right: 1px solid #e0e0e0 !important;
        }
        
        /* Right sidebar width */
        .Puck-sidebarRight {
          width: 350px !important;
          background: #fafafa !important;
          border-left: 1px solid #e0e0e0 !important;
        }
        
        /* Make content areas droppable and more visible */
        .Puck-render {
          min-height: 400px !important;
          padding: 20px !important;
        }
        
        /* Enhanced container drop zones */
        .Puck-dropZone {
          min-height: 60px !important;
          border: 2px dashed #cccccc !important;
          border-radius: 8px !important;
          margin: 8px 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #888888 !important;
          font-size: 13px !important;
          background: #fafafa !important;
        }
        
        .Puck-dropZone:hover, .Puck-dropZone--isOver {
          border-color: #2196F3 !important;
          background: #f0f8ff !important;
          color: #2196F3 !important;
        }
      `}</style>
    </div>
  );
}