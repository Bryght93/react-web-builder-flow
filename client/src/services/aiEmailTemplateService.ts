import { apiRequest } from '@/lib/queryClient';

export interface AIEmailGenerationParams {
  templateId: string;
  businessName: string;
  industry: string;
  targetAudience: string;
  productService: string;
  campaignGoal: string;
  brandTone: 'professional' | 'friendly' | 'authoritative' | 'casual' | 'luxurious';
  brandColors?: string[];
  customInstructions?: string;
}

export interface AIGeneratedContent {
  subject: string;
  preheader: string;
  content: {
    headlines: string[];
    bodyText: string[];
    ctaTexts: string[];
    personalizations: Record<string, string>;
  };
  colorSuggestions?: string[];
  imageSuggestions?: string[];
}

export class AIEmailTemplateService {
  static async generateContentForTemplate(params: AIEmailGenerationParams): Promise<AIGeneratedContent[]> {
    try {
      const response = await apiRequest('/api/ai/email-templates/generate', {
        method: 'POST',
        body: JSON.stringify(params),
      });

      return response;
    } catch (error) {
      console.error('AI Email Generation Error:', error);
      return this.getFallbackContent(params);
    }
  }

  static async generateSequenceContent(params: AIEmailGenerationParams & { emailCount: number }): Promise<AIGeneratedContent[]> {
    try {
      const response = await apiRequest('/api/ai/email-templates/generate-sequence', {
        method: 'POST',
        body: JSON.stringify(params),
      });

      return response;
    } catch (error) {
      console.error('AI Sequence Generation Error:', error);
      return this.getFallbackSequenceContent(params);
    }
  }

  static async optimizeExistingContent(content: any, optimizationGoal: string): Promise<any> {
    try {
      const response = await apiRequest('/api/ai/email-templates/optimize', {
        method: 'POST',
        body: JSON.stringify({ content, optimizationGoal }),
      });

      return response;
    } catch (error) {
      console.error('AI Optimization Error:', error);
      return content;
    }
  }

  static async generateColorPalette(brandDescription: string, industry: string): Promise<string[]> {
    try {
      const response = await apiRequest('/api/ai/email-templates/colors', {
        method: 'POST',
        body: JSON.stringify({ brandDescription, industry }),
      });

      return response.colors;
    } catch (error) {
      console.error('AI Color Generation Error:', error);
      return this.getDefaultColorPalette(industry);
    }
  }

  static async generateCopyVariations(originalText: string, variationCount: number = 3): Promise<string[]> {
    try {
      const response = await apiRequest('/api/ai/email-templates/copy-variations', {
        method: 'POST',
        body: JSON.stringify({ originalText, variationCount }),
      });

      return response.variations;
    } catch (error) {
      console.error('AI Copy Variation Error:', error);
      return [originalText];
    }
  }

  private static getFallbackContent(params: AIEmailGenerationParams): AIGeneratedContent[] {
    return [{
      subject: `Welcome to ${params.businessName}! Your journey begins now`,
      preheader: `We're excited to help you achieve your goals with ${params.productService}`,
      content: {
        headlines: [
          `Welcome to ${params.businessName}!`,
          `Ready to transform your ${params.industry} experience?`,
          `Let's get you started with ${params.productService}`
        ],
        bodyText: [
          `Hi there!\n\nWelcome to ${params.businessName}! We're thrilled to have you join our community of ${params.targetAudience}.\n\nOur ${params.productService} is designed specifically to help businesses like yours succeed in the ${params.industry} industry.`,
          `Here's what you can expect from us:\n\n• Personalized guidance tailored to your needs\n• Industry-leading tools and resources\n• Dedicated support from our expert team\n• Proven strategies that deliver results`,
          `Ready to get started? Click the button below to access your dashboard and begin your journey with us.`
        ],
        ctaTexts: [
          'Get Started Now',
          'Access My Dashboard',
          'Begin My Journey'
        ],
        personalizations: {
          '[BUSINESS_NAME]': params.businessName,
          '[INDUSTRY]': params.industry,
          '[TARGET_AUDIENCE]': params.targetAudience,
          '[PRODUCT_SERVICE]': params.productService
        }
      },
      colorSuggestions: this.getDefaultColorPalette(params.industry),
      imageSuggestions: [
        'Professional team collaboration',
        'Success celebration',
        'Modern workspace',
        'Growth chart visualization'
      ]
    }];
  }

  private static getFallbackSequenceContent(params: AIEmailGenerationParams & { emailCount: number }): AIGeneratedContent[] {
    const sequence: AIGeneratedContent[] = [];
    const baseContent = this.getFallbackContent(params)[0];

    for (let i = 0; i < params.emailCount; i++) {
      sequence.push({
        ...baseContent,
        subject: `${baseContent.subject} - Email ${i + 1}`,
        preheader: `${baseContent.preheader} - Part ${i + 1}`,
      });
    }

    return sequence;
  }

  private static getDefaultColorPalette(industry: string): string[] {
    const palettes: Record<string, string[]> = {
      'saas': ['#667eea', '#764ba2', '#f093fb'],
      'ecommerce': ['#ff6b6b', '#4ecdc4', '#45b7d1'],
      'business': ['#2c3e50', '#3498db', '#ecf0f1'],
      'education': ['#9b59b6', '#3498db', '#f1c40f'],
      'events': ['#8e44ad', '#2c3e50', '#ecf0f1'],
      'healthcare': ['#27ae60', '#2980b9', '#f8f9fa'],
      'finance': ['#34495e', '#2980b9', '#ecf0f1'],
      'default': ['#667eea', '#764ba2', '#f093fb']
    };

    return palettes[industry] || palettes.default;
  }
}

export default AIEmailTemplateService;