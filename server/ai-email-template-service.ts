import OpenAI from "openai";

let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });
}

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
  static async generateContentForTemplate(params: AIEmailGenerationParams): Promise<AIGeneratedContent> {
    if (!openai) {
      console.log('OpenAI not configured, using fallback content');
      return this.getFallbackContent(params);
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert email marketing copywriter and designer. Your task is to generate high-converting email content that maintains the visual design structure while replacing placeholder content with compelling, personalized copy.

            Brand Context:
            - Business: ${params.businessName}
            - Industry: ${params.industry}
            - Target Audience: ${params.targetAudience}
            - Product/Service: ${params.productService}
            - Campaign Goal: ${params.campaignGoal}
            - Brand Tone: ${params.brandTone}
            
            Requirements:
            1. Generate content that fits the existing template structure
            2. Create compelling subject lines with high open rates
            3. Write persuasive copy that drives action
            4. Maintain brand voice and tone consistently
            5. Include personalization placeholders
            6. Suggest complementary colors and images
            
            Respond with JSON containing all content elements.`
          },
          {
            role: "user",
            content: `Generate compelling email content for template ${params.templateId}. ${params.customInstructions ? `Additional instructions: ${params.customInstructions}` : ''}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        subject: result.subject || `Welcome to ${params.businessName}!`,
        preheader: result.preheader || `Your journey starts now...`,
        content: {
          headlines: result.content?.headlines || [`Welcome to ${params.businessName}!`],
          bodyText: result.content?.bodyText || [`We're excited to help you succeed.`],
          ctaTexts: result.content?.ctaTexts || ['Get Started'],
          personalizations: result.content?.personalizations || {
            '[BUSINESS_NAME]': params.businessName,
            '[INDUSTRY]': params.industry
          }
        },
        colorSuggestions: result.colorSuggestions || this.getDefaultColors(params.industry),
        imageSuggestions: result.imageSuggestions || ['Professional team photo', 'Product showcase']
      };
    } catch (error) {
      console.error('AI Email Generation Error:', error);
      return this.getFallbackContent(params);
    }
  }

  static async generateSequenceContent(params: AIEmailGenerationParams & { emailCount: number }): Promise<AIGeneratedContent[]> {
    if (!openai) {
      console.log('OpenAI not configured, using fallback sequence content');
      return Array(params.emailCount).fill(null).map((_, i) => this.getFallbackContent({
        ...params,
        campaignGoal: `${params.campaignGoal} - Email ${i + 1}`
      }));
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert email sequence strategist. Create a ${params.emailCount}-email sequence that guides prospects through a complete customer journey.

            Brand Context:
            - Business: ${params.businessName}
            - Industry: ${params.industry}
            - Target Audience: ${params.targetAudience}
            - Product/Service: ${params.productService}
            - Campaign Goal: ${params.campaignGoal}
            - Brand Tone: ${params.brandTone}
            
            Sequence Strategy:
            Email 1: Welcome & Set Expectations
            Email 2: Provide Value/Education
            Email 3: Social Proof/Case Studies
            Email 4+: Address Objections & Drive Action
            
            Each email must have escalating urgency and value.
            Respond with JSON array of ${params.emailCount} email objects.`
          },
          {
            role: "user",
            content: `Generate a complete ${params.emailCount}-email sequence for ${params.campaignGoal}. ${params.customInstructions ? `Additional instructions: ${params.customInstructions}` : ''}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.emails || Array(params.emailCount).fill(null).map((_, i) => this.getFallbackContent({
        ...params,
        campaignGoal: `${params.campaignGoal} - Email ${i + 1}`
      }));
    } catch (error) {
      console.error('AI Sequence Generation Error:', error);
      return Array(params.emailCount).fill(null).map((_, i) => this.getFallbackContent({
        ...params,
        campaignGoal: `${params.campaignGoal} - Email ${i + 1}`
      }));
    }
  }

  static async optimizeExistingContent(content: any, optimizationGoal: string): Promise<any> {
    if (!openai) {
      console.log('OpenAI not configured, returning original content');
      return content;
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an email optimization expert. Analyze the provided email content and improve it based on the optimization goal.
            
            Focus on:
            1. Improving open rates (subject lines)
            2. Increasing click-through rates (CTAs)
            3. Enhancing readability and engagement
            4. Maintaining brand consistency
            5. A/B testing opportunities
            
            Respond with optimized content in the same structure.`
          },
          {
            role: "user",
            content: `Optimize this email content for: ${optimizationGoal}\n\nContent: ${JSON.stringify(content)}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.optimizedContent || content;
    } catch (error) {
      console.error('AI Optimization Error:', error);
      return content;
    }
  }

  static async generateColorPalette(brandDescription: string, industry: string): Promise<string[]> {
    if (!openai) {
      console.log('OpenAI not configured, using default colors');
      return this.getDefaultColors(industry);
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a brand color expert. Generate a cohesive color palette based on brand description and industry.
            
            Consider:
            1. Industry psychology and conventions
            2. Brand personality and values
            3. Email accessibility and readability
            4. Conversion optimization
            
            Respond with JSON containing an array of hex color codes.`
          },
          {
            role: "user",
            content: `Generate a color palette for: ${brandDescription} in the ${industry} industry`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.colors || this.getDefaultColors(industry);
    } catch (error) {
      console.error('AI Color Generation Error:', error);
      return this.getDefaultColors(industry);
    }
  }

  static async generateCopyVariations(originalText: string, variationCount: number = 3): Promise<string[]> {
    if (!openai) {
      console.log('OpenAI not configured, returning original text');
      return [originalText];
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a copywriting expert. Create ${variationCount} high-converting variations of the provided text.
            
            Each variation should:
            1. Maintain the core message
            2. Test different emotional triggers
            3. Vary length and structure
            4. Optimize for different personality types
            
            Respond with JSON array of text variations.`
          },
          {
            role: "user",
            content: `Create ${variationCount} variations of: "${originalText}"`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result.variations || [originalText];
    } catch (error) {
      console.error('AI Copy Variation Error:', error);
      return [originalText];
    }
  }

  private static getFallbackContent(params: AIEmailGenerationParams): AIGeneratedContent {
    return {
      subject: `Welcome to ${params.businessName}! Your ${params.campaignGoal.toLowerCase()} starts now`,
      preheader: `We're excited to help you achieve your goals in ${params.industry}`,
      content: {
        headlines: [
          `Welcome to ${params.businessName}!`,
          `Transform Your ${params.industry} Experience`,
          `Ready to Achieve Your Goals?`
        ],
        bodyText: [
          `Hi there!\n\nWelcome to ${params.businessName}! We're thrilled to have you join our community of successful ${params.targetAudience}.`,
          `Our ${params.productService} is specifically designed to help businesses like yours excel in the ${params.industry} industry.`,
          `Here's what you can expect:\n• Expert guidance tailored to your needs\n• Proven strategies that deliver results\n• Dedicated support every step of the way`
        ],
        ctaTexts: [
          'Get Started Now',
          'Access Your Dashboard',
          'Begin Your Journey'
        ],
        personalizations: {
          '[BUSINESS_NAME]': params.businessName,
          '[INDUSTRY]': params.industry,
          '[TARGET_AUDIENCE]': params.targetAudience,
          '[PRODUCT_SERVICE]': params.productService,
          '[CAMPAIGN_GOAL]': params.campaignGoal
        }
      },
      colorSuggestions: this.getDefaultColors(params.industry),
      imageSuggestions: [
        'Professional team collaboration',
        'Success achievement moment',
        'Modern workspace environment',
        'Growth and progress visualization'
      ]
    };
  }

  private static getDefaultColors(industry: string): string[] {
    const colorPalettes: Record<string, string[]> = {
      'saas': ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'],
      'ecommerce': ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa726', '#26a69a'],
      'business': ['#2c3e50', '#3498db', '#ecf0f1', '#34495e', '#2980b9'],
      'education': ['#9b59b6', '#3498db', '#f1c40f', '#e74c3c', '#27ae60'],
      'events': ['#8e44ad', '#2c3e50', '#ecf0f1', '#9b59b6', '#34495e'],
      'healthcare': ['#27ae60', '#2980b9', '#f8f9fa', '#16a085', '#2c3e50'],
      'finance': ['#34495e', '#2980b9', '#ecf0f1', '#2c3e50', '#3498db'],
      'default': ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe']
    };

    return colorPalettes[industry] || colorPalettes.default;
  }
}