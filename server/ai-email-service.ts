import OpenAI from "openai";

// AI Email Generation Service
export class AIEmailService {
  private openai: OpenAI | null = null;

  constructor() {
    // Initialize OpenAI only if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY 
      });
    }
  }

  async generateEmailSequence(params: {
    campaignType: 'nurture' | 'broadcast';
    industry: string;
    targetAudience: string;
    campaignGoal: string;
    emailCount: number;
    tone: 'professional' | 'friendly' | 'casual' | 'urgent';
    brandName: string;
    template?: any;
    // Enhanced business context
    productService?: string;
    uniqueSellingPoint?: string;
    customerPainPoints?: string;
    competitiveDifferentiator?: string;
    priceRange?: string;
    currentMarketing?: string;
    audienceAge?: string;
    audienceGender?: string;
    audienceIncome?: string;
    purchaseMotivation?: string;
  }): Promise<GeneratedEmail[]> {
    
    // If OpenAI is not available, return dummy content
    if (!this.openai) {
      return this.generateDummyEmailSequence(params);
    }

    try {
      // Build comprehensive business context for AI
      const businessContext = this.buildBusinessContext(params);
      
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a world-class email marketing copywriter and business strategist. Your expertise includes:
            - Conversion-focused copywriting that drives sales
            - Deep understanding of consumer psychology and buying behavior
            - Mastery of persuasive writing techniques and marketing frameworks
            - Ability to craft compelling narratives that resonate with specific audiences

            Your task: Create a high-converting ${params.campaignType} email sequence for ${params.brandName}.

            BUSINESS CONTEXT:
            ${businessContext}

            WRITING REQUIREMENTS:
            - Use a ${params.tone} tone throughout
            - Focus on solving customer pain points and highlighting unique benefits
            - Include psychological triggers and persuasive elements
            - Make each email valuable and engaging, not just promotional
            - Build trust and credibility through the sequence
            - Include strong, action-oriented calls-to-action
            - Use proven copywriting formulas (AIDA, PAS, etc.)
            - Address objections and build desire progressively

            ${params.template ? `Template Foundation: Use "${params.template.name}" as inspiration. Key features: ${params.template.features?.join(', ') || 'N/A'}. Description: ${params.template.description}` : ''}

            Return ONLY valid JSON with this exact structure:
            {
              "emails": [
                {
                  "subject": "Compelling subject line",
                  "content": "Full HTML email content with proper structure",
                  "send_delay": number (days),
                  "call_to_action": "Specific CTA text",
                  "email_type": "nurture" or "broadcast"
                }
              ]
            }`
          },
          {
            role: "user",
            content: `Generate ${params.emailCount} professional, high-converting ${params.campaignType} emails that will drive sales for ${params.brandName}.

            Each email must:
            1. Have a compelling, curiosity-driven subject line
            2. Open with a hook that addresses customer pain points
            3. Present the product/service as the solution
            4. Include social proof, benefits, and value propositions
            5. Build urgency or scarcity when appropriate
            6. End with a clear, compelling call-to-action
            7. Be properly formatted with HTML structure
            8. Progressive timing: ${params.campaignType === 'nurture' ? 'spaced over days/weeks' : 'immediate delivery'}

            Focus on persuasive copywriting that converts prospects into customers.`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content);
      return result.emails || [];
    } catch (error) {
      console.error('AI Email Generation Error:', error);
      return this.generateDummyEmailSequence(params);
    }
  }

  private buildBusinessContext(params: any): string {
    let context = `Company: ${params.brandName} in the ${params.industry} industry
Target Audience: ${params.targetAudience}
Campaign Goal: ${params.campaignGoal}`;

    if (params.productService) {
      context += `\nProduct/Service: ${params.productService}`;
    }
    if (params.uniqueSellingPoint) {
      context += `\nUnique Selling Point: ${params.uniqueSellingPoint}`;
    }
    if (params.customerPainPoints) {
      context += `\nCustomer Pain Points: ${params.customerPainPoints}`;
    }
    if (params.competitiveDifferentiator) {
      context += `\nCompetitive Advantage: ${params.competitiveDifferentiator}`;
    }
    if (params.priceRange) {
      context += `\nPrice Range: ${params.priceRange}`;
    }
    if (params.audienceAge || params.audienceGender || params.audienceIncome) {
      context += `\nAudience Demographics: Age: ${params.audienceAge || 'N/A'}, Gender: ${params.audienceGender || 'Mixed'}, Income: ${params.audienceIncome || 'N/A'}`;
    }
    if (params.purchaseMotivation) {
      context += `\nPurchase Motivation: ${params.purchaseMotivation}`;
    }
    if (params.currentMarketing) {
      context += `\nCurrent Marketing: ${params.currentMarketing}`;
    }

    return context;
  }

  private generateDummyEmailSequence(params: {
    campaignType: 'nurture' | 'broadcast';
    industry: string;
    targetAudience: string;
    campaignGoal: string;
    emailCount: number;
    tone: 'professional' | 'friendly' | 'casual' | 'urgent';
    brandName: string;
    template?: any;
    productService?: string;
    uniqueSellingPoint?: string;
    customerPainPoints?: string;
  }): GeneratedEmail[] {
    
    const emails: GeneratedEmail[] = [];
    
    // Get template-specific context
    const templateContext = params.template ? {
      name: params.template.name,
      description: params.template.description,
      features: params.template.features || [],
      category: params.template.category || 'general'
    } : null;
    
    if (params.campaignType === 'nurture') {
      // Generate nurture sequence with personalized content
      const nurtureTemplates = [
        {
          subject: templateContext ? 
            `Welcome to ${params.brandName} - Your ${templateContext.name} Journey Begins!` :
            `Welcome to ${params.brandName}! 🎉`,
          content: `<h2>Welcome to Our Community!</h2><p>Hi there,</p><p>Thanks for joining ${params.brandName}! We're excited to have you as part of our ${params.targetAudience} community in the ${params.industry} industry.</p>${templateContext ? `<p>You've chosen our ${templateContext.name} approach, which is perfect for achieving ${params.campaignGoal}.</p>` : ''}<p>Over the next few days, I'll be sharing valuable insights about ${params.industry} that will help you ${params.campaignGoal}.</p><p>Best regards,<br>The ${params.brandName} Team</p>`,
          send_delay: 0,
          call_to_action: 'Get Started'
        },
        {
          subject: `Your ${params.industry} Journey Starts Here`,
          content: `<h2>Getting Started Guide</h2><p>Hello again,</p><p>Yesterday you joined our community, and today I want to share the first steps to ${params.campaignGoal}.</p><p>Here's what successful ${params.targetAudience} do first:</p><ul><li>Step 1: Understand your current situation</li><li>Step 2: Set clear, measurable goals</li><li>Step 3: Create an action plan</li></ul><p>Ready to dive deeper?</p>`,
          send_delay: 1,
          call_to_action: 'Learn More'
        },
        {
          subject: `The #1 Mistake Most ${params.targetAudience} Make`,
          content: `<h2>Avoid This Common Mistake</h2><p>Hi,</p><p>I've worked with thousands of ${params.targetAudience} in the ${params.industry} space, and I've noticed a pattern...</p><p>The biggest mistake people make when trying to ${params.campaignGoal} is jumping straight into tactics without understanding the fundamentals.</p><p>Here's what you should do instead:</p><p>Focus on building a strong foundation first. This means understanding your audience, defining your value proposition, and creating systems that scale.</p>`,
          send_delay: 3,
          call_to_action: 'Get the Guide'
        },
        {
          subject: `Case Study: How [Client] Achieved ${params.campaignGoal}`,
          content: `<h2>Real Success Story</h2><p>Hi,</p><p>I want to share a quick case study about one of our clients who achieved amazing results...</p><p>Meet Sarah, a ${params.targetAudience} who was struggling with ${params.campaignGoal}. Within 90 days of implementing our strategy, she:</p><ul><li>Increased her results by 300%</li><li>Saved 10 hours per week</li><li>Built a sustainable system</li></ul><p>Want to know her exact strategy?</p>`,
          send_delay: 5,
          call_to_action: 'Read Full Case Study'
        },
        {
          subject: `Ready to Take Action?`,
          content: `<h2>Your Next Steps</h2><p>Hi,</p><p>Over the past week, I've shared valuable insights about ${params.industry} and ${params.campaignGoal}.</p><p>Now it's time to take action. Here's what I recommend:</p><p>1. Review the resources I've shared<br>2. Choose one strategy to implement this week<br>3. Schedule time to work on it consistently</p><p>Remember, knowledge without action is just entertainment. Are you ready to transform your ${params.industry} results?</p>`,
          send_delay: 7,
          call_to_action: 'Get Started Now'
        }
      ];
      
      return nurtureTemplates.slice(0, params.emailCount).map((template, index) => ({
        subject: template.subject,
        content: template.content,
        send_delay: template.send_delay,
        call_to_action: template.call_to_action,
        email_type: 'nurture'
      }));
    } else {
      // Generate broadcast emails
      const broadcastTemplates = [
        {
          subject: `🔥 Limited Time: Special Offer for ${params.targetAudience}`,
          content: `<h2>Exclusive Offer Just for You!</h2><p>Hi,</p><p>I have exciting news! For the next 48 hours only, we're offering an exclusive discount on our ${params.industry} solution.</p><p>This is perfect for ${params.targetAudience} who want to ${params.campaignGoal}.</p><p><strong>What you get:</strong></p><ul><li>Complete system and templates</li><li>Step-by-step implementation guide</li><li>30-day money-back guarantee</li></ul><p>But hurry - this offer expires soon!</p>`,
          send_delay: 0,
          call_to_action: 'Claim Your Discount'
        },
        {
          subject: `New ${params.industry} Resource Available`,
          content: `<h2>Fresh Content Just Released</h2><p>Hello,</p><p>I just published a comprehensive guide about ${params.campaignGoal} that I think you'll love.</p><p>This resource covers:</p><ul><li>Latest ${params.industry} trends</li><li>Proven strategies that work</li><li>Real-world examples</li><li>Action steps you can implement today</li></ul><p>Best part? It's completely free for our community members.</p>`,
          send_delay: 0,
          call_to_action: 'Download Now'
        },
        {
          subject: `Quick Question About Your ${params.industry} Goals`,
          content: `<h2>I'd Love to Help</h2><p>Hi,</p><p>I hope you're having a great week! I wanted to reach out because I've been thinking about our ${params.targetAudience} community.</p><p>I'm curious - what's your biggest challenge when it comes to ${params.campaignGoal}?</p><p>Hit reply and let me know. I read every email and often create content based on your feedback.</p><p>Looking forward to hearing from you!</p>`,
          send_delay: 0,
          call_to_action: 'Reply to This Email'
        }
      ];

      return broadcastTemplates.slice(0, params.emailCount).map((template, index) => ({
        subject: template.subject,
        content: template.content,
        send_delay: 0,
        call_to_action: template.call_to_action,
        email_type: 'broadcast'
      }));
    }
  }

  async processAssistantRequest(prompt: string, mode: string, context: any): Promise<{content: string, suggestions?: any}> {
    if (!this.openai) {
      return this.generateDummyAssistantResponse(prompt, mode, context);
    }

    try {
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: this.getSystemPromptForMode(mode)
          },
          {
            role: "user",
            content: `${prompt}\n\nContext: ${JSON.stringify(context)}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const result = JSON.parse(response.choices[0].message.content!);
      return {
        content: result.response,
        suggestions: result.suggestions
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateDummyAssistantResponse(prompt, mode, context);
    }
  }

  private getSystemPromptForMode(mode: string): string {
    const prompts = {
      content: `You are an expert email marketing content creator. Generate engaging, conversion-focused content that follows best practices. Always respond in JSON format with 'response' and optional 'suggestions' fields.`,
      edit: `You are an expert email editor. Provide suggestions to improve existing content for better engagement and conversion. Focus on clarity, persuasion, and marketing effectiveness. Always respond in JSON format with 'response' and optional 'suggestions' fields.`,
      strategy: `You are a strategic email marketing consultant. Provide actionable advice on email marketing strategy, campaign optimization, and performance improvement. Always respond in JSON format with 'response' and optional 'suggestions' fields.`,
      compliance: `You are a legal compliance expert for email marketing. Check content for GDPR, CAN-SPAM, and other regulatory compliance. Identify issues and provide corrections. Always respond in JSON format with 'response' and optional 'suggestions' fields.`
    };
    return prompts[mode as keyof typeof prompts] || prompts.content;
  }

  private generateDummyAssistantResponse(prompt: string, mode: string, context: any): {content: string, suggestions?: any} {
    const responses = {
      content: {
        response: "I'd be happy to help you create engaging email content! Here are some suggestions based on your request:\n\n• Focus on clear, benefit-driven messaging\n• Use action-oriented language\n• Include social proof or testimonials\n• Create urgency when appropriate\n• Ensure mobile-friendly formatting\n\nWould you like me to elaborate on any of these points?",
        suggestions: {
          elementUpdates: {
            text: "Transform Your Business Today - Join 10,000+ Success Stories"
          }
        }
      },
      edit: {
        response: "Here are my suggestions to improve your email content:\n\n• Strengthen your headline to be more specific\n• Add emotional triggers to increase engagement\n• Include a clear value proposition\n• Improve your call-to-action clarity\n• Optimize for mobile readability\n\nI can help you implement these changes step by step.",
        suggestions: {
          elementUpdates: {
            text: "Discover the Simple System That's Helping Entrepreneurs Like You Generate 6-Figure Results"
          }
        }
      },
      strategy: {
        response: "Based on your campaign, here's my strategic advice:\n\n• Segment your audience for better targeting\n• Use A/B testing for subject lines\n• Implement progressive profiling\n• Create nurture sequences based on behavior\n• Track key metrics: open rates, click-through rates, conversions\n\nConsider implementing automation triggers for better engagement.",
        suggestions: {
          stepUpdates: {
            subject: "🚀 [URGENT] Your Success Blueprint Inside (24hrs only)"
          }
        }
      },
      compliance: {
        response: "Compliance Review Results:\n\n✅ GDPR Compliant: Include unsubscribe link\n✅ CAN-SPAM Compliant: Add physical address\n⚠️ Recommendation: Add clear consent reminder\n⚠️ Recommendation: Include privacy policy link\n\nYour email meets basic compliance requirements. Consider adding data processing transparency for enhanced trust.",
        suggestions: {
          stepUpdates: {
            content: "Add footer with unsubscribe link and physical address"
          }
        }
      }
    };

    return responses[mode as keyof typeof responses] || responses.content;
  }
}

export interface GeneratedEmail {
  subject: string;
  content: string;
  send_delay: number;
  call_to_action: string;
  email_type: 'nurture' | 'broadcast';
}

export const aiEmailService = new AIEmailService();