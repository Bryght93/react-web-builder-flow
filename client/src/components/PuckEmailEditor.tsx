import React from 'react';
import { Puck, Config, Data } from '@measured/puck';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, Send } from 'lucide-react';

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

// Puck component definitions
const HeadingComponent = ({ text, level, color, textAlign }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag style={{ color, textAlign, margin: '16px 0', fontFamily: 'Arial, sans-serif' }}>
      {text}
    </Tag>
  );
};

const TextComponent = ({ text, color, fontSize, textAlign, fontWeight }: TextProps) => (
  <p style={{ 
    color, 
    fontSize: `${fontSize}px`, 
    textAlign, 
    fontWeight,
    margin: '12px 0',
    lineHeight: 1.6,
    fontFamily: 'Arial, sans-serif'
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

const ContainerComponent = ({ backgroundColor, padding, maxWidth, children }: ContainerProps) => (
  <div style={{ 
    backgroundColor, 
    padding, 
    maxWidth, 
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  }}>
    {children}
  </div>
);

// Enhanced Layout Components
const LayoutBlock = ({ columns, children, backgroundColor, padding }: { 
  columns: 1 | 2 | 3 | 4, 
  children: React.ReactNode, 
  backgroundColor: string, 
  padding: string 
}) => (
  <div style={{ 
    backgroundColor, 
    padding, 
    display: 'grid', 
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '16px',
    marginBottom: '16px'
  }}>
    {children}
  </div>
);

const SocialIcons = ({ icons, size, style }: { 
  icons: string[], 
  size: number, 
  style: 'circle' | 'square' | 'rounded' 
}) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
    {icons.map((icon, index) => (
      <div 
        key={index}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#3b82f6',
          borderRadius: style === 'circle' ? '50%' : style === 'rounded' ? '4px' : '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: `${size * 0.6}px`,
          cursor: 'pointer'
        }}
      >
        {icon[0].toUpperCase()}
      </div>
    ))}
  </div>
);

const LinkBar = ({ links, backgroundColor, textColor }: { 
  links: string[], 
  backgroundColor: string, 
  textColor: string 
}) => (
  <div style={{ 
    backgroundColor, 
    padding: '12px', 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '20px',
    marginBottom: '16px'
  }}>
    {links.map((link, index) => (
      <a 
        key={index}
        href="#"
        style={{ 
          color: textColor, 
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        {link}
      </a>
    ))}
  </div>
);

// Puck configuration for email components
const config: Config = {
  components: {
    LayoutBlock: {
      fields: {
        columns: {
          type: 'select',
          options: [
            { label: '1 Column', value: 1 },
            { label: '2 Columns', value: 2 },
            { label: '3 Columns', value: 3 },
            { label: '4 Columns', value: 4 },
          ],
        },
        backgroundColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        padding: { type: 'text' },
      },
      defaultProps: {
        columns: 1,
        backgroundColor: '#ffffff',
        padding: '20px',
      },
      render: LayoutBlock,
    },
    Heading: {
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 1 },
            { label: 'H2', value: 2 },
            { label: 'H3', value: 3 },
            { label: 'H4', value: 4 },
            { label: 'H5', value: 5 },
            { label: 'H6', value: 6 },
          ],
        },
        color: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
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
      },
      defaultProps: {
        text: 'Heading Text',
        level: 2,
        color: '#333333',
        textAlign: 'left',
      },
      render: HeadingComponent,
    },
    Text: {
      fields: {
        text: { type: 'textarea' },
        color: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#666666'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
        fontSize: { type: 'number' },
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
          ],
        },
      },
      defaultProps: {
        text: 'Your email content goes here...',
        color: '#666666',
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'normal',
      },
      render: TextComponent,
    },
    Button: {
      fields: {
        text: { type: 'text' },
        href: { type: 'text' },
        backgroundColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#007bff'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        textColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
        borderRadius: { type: 'number' },
        padding: { type: 'text' },
      },
      defaultProps: {
        text: 'Click Here',
        href: '#',
        backgroundColor: '#007bff',
        textColor: '#ffffff',
        borderRadius: 4,
        padding: '12px 24px',
      },
      render: ButtonComponent,
    },
    SocialIcons: {
      fields: {
        icons: {
          type: 'array',
          arrayFields: {
            name: { type: 'text' }
          }
        },
        size: { type: 'number' },
        style: {
          type: 'select',
          options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' },
            { label: 'Rounded', value: 'rounded' },
          ],
        },
      },
      defaultProps: {
        icons: ['Facebook', 'Twitter', 'Instagram'],
        size: 32,
        style: 'circle',
      },
      render: SocialIcons,
    },
    LinkBar: {
      fields: {
        links: {
          type: 'array',
          arrayFields: {
            name: { type: 'text' }
          }
        },
        backgroundColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#f8fafc'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        textColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#1e293b'} 
              onChange={onChange} 
              label="Text Color"
            />
          )
        },
      },
      defaultProps: {
        links: ['Home', 'About', 'Services', 'Contact'],
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
      },
      render: LinkBar,
    },
    Image: {
      fields: {
        src: { type: 'text' },
        alt: { type: 'text' },
        width: { type: 'text' },
        height: { type: 'text' },
        borderRadius: { type: 'number' },
      },
      defaultProps: {
        src: 'https://via.placeholder.com/400x200',
        alt: 'Image',
        width: '100%',
        height: '200px',
        borderRadius: 0,
      },
      render: ImageComponent,
    },
    Spacer: {
      fields: {
        height: { type: 'number' },
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
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#e0e0e0'} 
              onChange={onChange} 
              label="Divider Color"
            />
          )
        },
        thickness: { type: 'number' },
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
        color: '#e0e0e0',
        thickness: 1,
        style: 'solid',
      },
      render: DividerComponent,
    },
    Container: {
      fields: {
        backgroundColor: { 
          type: 'custom',
          render: ({ field, onChange, value }) => (
            <ColorPicker 
              value={value || '#ffffff'} 
              onChange={onChange} 
              label="Background Color"
            />
          )
        },
        padding: { type: 'text' },
        maxWidth: { type: 'text' },
      },
      defaultProps: {
        backgroundColor: '#ffffff',
        padding: '20px',
        maxWidth: '600px',
      },
      render: ContainerComponent,
    },
  },
  root: {
    props: {
      backgroundColor: { 
        type: 'custom',
        render: ({ field, onChange, value }) => (
          <ColorPicker 
            value={value || '#f5f5f5'} 
            onChange={onChange} 
            label="Email Background"
          />
        )
      },
      padding: { type: 'text' },
    },
    render: ({ backgroundColor, padding, children }) => (
      <div style={{ 
        backgroundColor: backgroundColor || '#f5f5f5', 
        padding: padding || '20px', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        overflowY: 'auto'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    ),
  },
};

interface PuckEmailEditorProps {
  onBack: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  emailTemplate?: {
    name: string;
    subject: string;
  };
}

export default function PuckEmailEditor({ 
  onBack, 
  onSave, 
  initialData,
  emailTemplate 
}: PuckEmailEditorProps) {
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
          type: "Spacer",
          props: {
            id: "spacer-1",
            height: 20,
          },
        },
        {
          type: "Text",
          props: {
            id: "text-1",
            text: "Hi there! We're thrilled to have you join our community. You've just taken the first step towards amazing content, exclusive offers, and valuable insights.",
            color: '#475569',
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
        {
          type: "Spacer",
          props: {
            id: "spacer-2",
            height: 30,
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
        {
          type: "Spacer",
          props: {
            id: "spacer-3",
            height: 40,
          },
        },
        {
          type: "Divider",
          props: {
            id: "divider-1",
            color: '#e2e8f0',
            thickness: 1,
            style: 'solid',
          },
        },
        {
          type: "Text",
          props: {
            id: "text-2",
            text: "What to expect next:\n• Weekly valuable content\n• Exclusive member offers\n• Early access to new features",
            color: '#64748b',
            fontSize: 14,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
      ];
    } else if (templateName?.includes('Product Launch')) {
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
            text: "🚀 Something Big is Coming!",
            level: 1,
            color: '#dc2626',
            textAlign: 'center',
          },
        },
        {
          type: "Text",
          props: {
            id: "text-1",
            text: "We've been working hard behind the scenes, and we can't wait to share our latest innovation with you. Get ready for something that will change everything.",
            color: '#475569',
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
        {
          type: "Image",
          props: {
            id: "image-1",
            src: 'https://via.placeholder.com/500x250/dc2626/ffffff?text=Product+Preview',
            alt: 'Product Preview',
            width: '100%',
            height: '250px',
            borderRadius: 8,
          },
        },
        {
          type: "Button",
          props: {
            id: "button-1",
            text: "Be The First to Know",
            href: "https://example.com/early-access",
            backgroundColor: '#dc2626',
            textColor: '#ffffff',
            borderRadius: 8,
            padding: '16px 32px',
          },
        },
      ];
    } else if (templateName?.includes('Newsletter')) {
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
            text: "📰 This Week's Newsletter",
            level: 1,
            color: '#059669',
            textAlign: 'center',
          },
        },
        {
          type: "Text",
          props: {
            id: "text-1",
            text: "Here are the top stories and insights we've curated just for you this week.",
            color: '#475569',
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
        {
          type: "Heading",
          props: {
            id: "heading-2",
            text: "Featured Article",
            level: 3,
            color: '#059669',
            textAlign: 'left',
          },
        },
        {
          type: "Text",
          props: {
            id: "text-2",
            text: "Learn the latest strategies that top companies are using to scale their businesses. This comprehensive guide covers everything you need to know.",
            color: '#475569',
            fontSize: 14,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
        {
          type: "Button",
          props: {
            id: "button-1",
            text: "Read Full Article",
            href: "https://example.com/article",
            backgroundColor: '#059669',
            textColor: '#ffffff',
            borderRadius: 6,
            padding: '12px 24px',
          },
        },
      ];
    } else {
      // Default template
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
            text: emailTemplate?.name || "Email Template",
            level: 1,
            color: '#1f2937',
            textAlign: 'center',
          },
        },
        {
          type: "Text",
          props: {
            id: "text-1",
            text: "Start editing this template by dragging components from the left sidebar or clicking on elements to modify them.",
            color: '#6b7280',
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'normal',
          },
        },
        {
          type: "Button",
          props: {
            id: "button-1",
            text: "Call to Action",
            href: "#",
            backgroundColor: '#3b82f6',
            textColor: '#ffffff',
            borderRadius: 6,
            padding: '12px 24px',
          },
        },
      ];
    }
  };

  const [data, setData] = React.useState<Data>(() => {
    // If we have valid initial data, use it directly
    if (initialData && initialData.content && initialData.content.length > 0) {
      return initialData;
    }
    
    // Otherwise, create template-specific content
    return {
      content: getTemplateContent(),
      root: {
        props: {
          backgroundColor: '#f8fafc',
          padding: '20px',
        }
      },
    };
  });

  const [previewMode, setPreviewMode] = React.useState(false);

  const handleSave = () => {
    onSave({
      ...data,
      subject: emailTemplate?.subject || 'Untitled Email',
      name: emailTemplate?.name || 'Untitled Template',
    });
  };

  const generateEmailHTML = () => {
    // Convert Puck data to email-ready HTML
    const renderContent = (content: any[]) => {
      return content.map((item) => {
        switch (item.type) {
          case 'Heading':
            const HeadingTag = `h${item.props.level}`;
            return `<${HeadingTag} style="color: ${item.props.color}; text-align: ${item.props.textAlign}; margin: 16px 0; font-family: Arial, sans-serif;">${item.props.text}</${HeadingTag}>`;
          
          case 'Text':
            return `<p style="color: ${item.props.color}; font-size: ${item.props.fontSize}px; text-align: ${item.props.textAlign}; font-weight: ${item.props.fontWeight}; margin: 12px 0; line-height: 1.6; font-family: Arial, sans-serif;">${item.props.text}</p>`;
          
          case 'Button':
            return `<div style="text-align: center; margin: 20px 0;"><a href="${item.props.href}" style="display: inline-block; background-color: ${item.props.backgroundColor}; color: ${item.props.textColor}; padding: ${item.props.padding}; border-radius: ${item.props.borderRadius}px; text-decoration: none; font-weight: bold; font-family: Arial, sans-serif;">${item.props.text}</a></div>`;
          
          case 'Image':
            return `<div style="text-align: center; margin: 16px 0;"><img src="${item.props.src}" alt="${item.props.alt}" style="width: ${item.props.width}; height: ${item.props.height}; border-radius: ${item.props.borderRadius}px; max-width: 100%; object-fit: cover;" /></div>`;
          
          case 'Spacer':
            return `<div style="height: ${item.props.height}px;"></div>`;
          
          case 'Divider':
            return `<hr style="border: none; border-top: ${item.props.thickness}px ${item.props.style} ${item.props.color}; margin: 20px 0; width: 100%;" />`;
          
          case 'Container':
            return `<div style="background-color: ${item.props.backgroundColor}; padding: ${item.props.padding}; max-width: ${item.props.maxWidth}; margin: 0 auto; font-family: Arial, sans-serif; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">${renderContent(item.props.children || [])}</div>`;
          
          default:
            return '';
        }
      }).join('');
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${emailTemplate?.subject || 'Email'}</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            @media only screen and (max-width: 600px) {
              .email-container { width: 100% !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: ${data.root?.props?.backgroundColor || '#f5f5f5'};">
          <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: ${data.root?.props?.backgroundColor || '#f5f5f5'}; padding: ${data.root?.props?.padding || '20px'};">
            ${renderContent(data.content || [])}
          </div>
        </body>
      </html>
    `;
  };

  const sendEmail = async () => {
    const emailHTML = generateEmailHTML();
    const emailData = {
      subject: emailTemplate?.subject || 'Untitled Email',
      html: emailHTML,
      data: data
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (response.ok) {
        console.log('Email sent successfully');
        // Add success notification
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const generateSMSContent = () => {
    // Extract text content for SMS (no HTML, character limit)
    const textContent = data.content?.map((item: any) => {
      switch (item.type) {
        case 'Heading':
        case 'Text':
          return item.props.text;
        case 'Button':
          return `${item.props.text}: ${item.props.href}`;
        default:
          return '';
      }
    }).filter(Boolean).join('\n\n');

    // Truncate to SMS limits (160 chars for single SMS)
    return textContent?.substring(0, 160) + (textContent?.length > 160 ? '...' : '');
  };

  const sendSMS = async () => {
    const smsContent = generateSMSContent();
    const smsData = {
      message: smsContent,
      data: data
    };

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsData)
      });
      
      if (response.ok) {
        console.log('SMS sent successfully');
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-lg font-semibold">
              {emailTemplate?.name || 'Email Editor'}
            </h1>
            <p className="text-sm text-gray-500">
              Subject: {emailTemplate?.subject || 'Untitled Email'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={sendSMS}>
            <Send className="h-4 w-4 mr-2" />
            Send SMS
          </Button>
          <Button size="sm" onClick={sendEmail}>
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save & Continue
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Puck
          config={config}
          data={data}
          onPublish={(newData) => setData(newData)}
          ui={{
            leftSideBarVisible: true,
            rightSideBarVisible: true,
            headerVisible: false,
          }}
        />
      </div>
    </div>
  );
}