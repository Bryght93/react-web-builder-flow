import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Voice AI API endpoints
  
  // Generate eBook content
  app.post("/api/generate-ebook", async (req, res) => {
    try {
      const { topic } = req.body;
      
      const ebookContent = {
        id: Date.now().toString(),
        title: `The Ultimate Guide to ${topic}`,
        topic,
        type: 'ebook',
        status: 'active',
        downloads: 0,
        conversion: 0,
        created: new Date().toISOString().split('T')[0],
        chapters: [
          { id: 1, title: `Introduction to ${topic}`, content: `Welcome to your comprehensive guide on ${topic}. This ebook will transform your understanding...` },
          { id: 2, title: `Getting Started with ${topic}`, content: `Let's begin your journey with the fundamentals of ${topic}...` },
          { id: 3, title: `Advanced ${topic} Strategies`, content: `Now that you have the basics, let's explore advanced techniques...` },
          { id: 4, title: `Common ${topic} Mistakes to Avoid`, content: `Learn from others' mistakes and avoid these common pitfalls...` },
          { id: 5, title: `${topic} Case Studies`, content: `Real-world examples of successful ${topic} implementations...` },
          { id: 6, title: `Next Steps and Resources`, content: `Continue your ${topic} journey with these recommended resources...` }
        ],
        landingPageUrl: `/landing/${topic.toLowerCase().replace(/\s+/g, '-')}`,
        downloadUrl: `/download/ebook-${topic.toLowerCase().replace(/\s+/g, '-')}.pdf`
      };
      
      res.json(ebookContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate ebook" });
    }
  });

  // Generate funnel content
  app.post("/api/generate-funnel", async (req, res) => {
    try {
      const { productDescription } = req.body;
      
      const funnelData = {
        id: Date.now().toString(),
        name: `${productDescription} Sales Funnel`,
        industry: 'Marketing',
        goal: 'Generate leads and sales',
        status: 'active',
        leads: 0,
        conversion: 0,
        revenue: 0,
        created: new Date().toISOString().split('T')[0],
        steps: [
          {
            id: 'landing',
            type: 'landing',
            title: 'Landing Page',
            description: `Capture attention with compelling ${productDescription} offer`,
            url: `/funnel/landing/${productDescription.toLowerCase().replace(/\s+/g, '-')}`,
            conversionRate: 0
          },
          {
            id: 'optin',
            type: 'optin',
            title: 'Lead Magnet',
            description: `Free resource about ${productDescription}`,
            url: `/funnel/optin/${productDescription.toLowerCase().replace(/\s+/g, '-')}`,
            conversionRate: 0
          },
          {
            id: 'email',
            type: 'email',
            title: 'Email Sequence',
            description: `5-part email series about ${productDescription}`,
            emails: 5,
            conversionRate: 0
          },
          {
            id: 'offer',
            type: 'offer',
            title: 'Main Offer',
            description: `Premium ${productDescription} program`,
            price: 497,
            conversionRate: 0
          }
        ],
        traffic: 0,
        totalRevenue: 0
      };
      
      res.json(funnelData);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate funnel" });
    }
  });

  // Add subscriber
  app.post("/api/subscribers", async (req, res) => {
    try {
      const { name, email, source } = req.body;
      
      const subscriber = {
        id: Date.now().toString(),
        name,
        email,
        source,
        status: 'active',
        score: 75,
        lastActivity: new Date().toISOString(),
        tags: ['voice-generated'],
        notes: `Added via ${source} on ${new Date().toLocaleDateString()}`
      };
      
      res.json(subscriber);
    } catch (error) {
      res.status(500).json({ error: "Failed to add subscriber" });
    }
  });

  // Send email campaign
  app.post("/api/send-campaign", async (req, res) => {
    try {
      const { listName, subject } = req.body;
      
      const campaign = {
        id: Date.now().toString(),
        name: `${listName} - ${subject}`,
        subject,
        recipients: Math.floor(Math.random() * 500) + 100, // Simulate recipient count
        sent: true,
        sentAt: new Date().toISOString(),
        openRate: Math.floor(Math.random() * 30) + 15, // 15-45% open rate
        clickRate: Math.floor(Math.random() * 10) + 3, // 3-13% click rate
        status: 'sent'
      };
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to send campaign" });
    }
  });

  // Create email list
  app.post("/api/email-lists", async (req, res) => {
    try {
      const { name } = req.body;
      
      const emailList = {
        id: Date.now().toString(),
        name,
        description: `Voice-generated email list for ${name}`,
        subscribers: 0,
        created: new Date().toISOString(),
        status: 'active',
        tags: ['voice-generated'],
        autoresponders: [],
        segmentRules: []
      };
      
      res.json(emailList);
    } catch (error) {
      res.status(500).json({ error: "Failed to create email list" });
    }
  });

  // Generate landing page
  app.post("/api/generate-landing-page", async (req, res) => {
    try {
      const { topic, goal } = req.body;
      
      const landingPage = {
        id: Date.now().toString(),
        title: `${topic} Landing Page`,
        topic,
        goal,
        url: `/landing/${topic.toLowerCase().replace(/\s+/g, '-')}`,
        elements: [
          {
            type: 'headline',
            content: `Transform Your Business with ${topic}`,
            styles: { fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }
          },
          {
            type: 'subheadline',
            content: `Discover the proven strategies that top professionals use to master ${topic}`,
            styles: { fontSize: '24px', textAlign: 'center', color: '#666' }
          },
          {
            type: 'form',
            content: 'Lead capture form',
            fields: ['name', 'email'],
            styles: { maxWidth: '400px', margin: '0 auto' }
          },
          {
            type: 'button',
            content: 'Get Instant Access',
            styles: { backgroundColor: '#3b82f6', color: 'white', padding: '16px 32px' }
          }
        ],
        conversions: 0,
        views: 0,
        conversionRate: 0,
        created: new Date().toISOString(),
        status: 'active'
      };
      
      res.json(landingPage);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate landing page" });
    }
  });

  // Sales coaching
  app.post("/api/sales-coaching", async (req, res) => {
    try {
      const { situation } = req.body;
      
      const coachingAdvice = {
        id: Date.now().toString(),
        situation,
        summary: `AI coaching for ${situation}`,
        advice: [
          {
            title: 'Immediate Action',
            content: `For ${situation}, focus on building rapport and understanding the client's specific needs.`
          },
          {
            title: 'Key Questions to Ask',
            content: `What specific challenges are you facing? What would success look like for you?`
          },
          {
            title: 'Objection Handling',
            content: `Common objections and how to address them professionally and confidently.`
          },
          {
            title: 'Next Steps',
            content: `Follow up within 24 hours with a personalized proposal based on their needs.`
          }
        ],
        confidence: 'high',
        created: new Date().toISOString()
      };
      
      res.json(coachingAdvice);
    } catch (error) {
      res.status(500).json({ error: "Failed to provide sales coaching" });
    }
  });

  // Generate funnel step content
  app.post("/api/generate-funnel-step", async (req, res) => {
    try {
      const { stepType, funnelData } = req.body;
      
      const stepTemplates = {
        landing: {
          title: 'Landing Page',
          description: `High-converting landing page for ${funnelData.productName}`,
          content: {
            headline: `Transform Your Life with ${funnelData.productName}`,
            subheadline: `Join thousands who have already discovered the secret to ${funnelData.mainGoal.toLowerCase()}`,
            bodyText: `Are you tired of struggling with the same challenges? ${funnelData.productName} is specifically designed for ${funnelData.targetAudience.split(' ').slice(0, 5).join(' ')}... Our proven system has helped over 10,000 people achieve their goals faster than they ever thought possible.`,
            ctaText: 'Get Started Now - FREE',
            colors: { primary: '#3b82f6', secondary: '#1e40af', background: '#f8fafc' }
          }
        },
        optin: {
          title: 'Lead Magnet Opt-in',
          description: 'Capture leads with valuable free content',
          content: {
            headline: `Get Your FREE ${funnelData.productName} Starter Guide`,
            subheadline: 'Download our exclusive guide and start seeing results in just 7 days',
            bodyText: `This comprehensive guide includes step-by-step instructions, insider tips, and everything you need to get started with ${funnelData.productName}. Valued at ${funnelData.pricePoint}, yours FREE today.`,
            ctaText: 'Download FREE Guide',
            colors: { primary: '#10b981', secondary: '#047857', background: '#f0fdf4' }
          }
        },
        email: {
          title: 'Email Sequence',
          description: 'Automated nurture sequence',
          content: {
            headline: 'Welcome to Your Transformation Journey',
            subheadline: 'Your first email is already on its way',
            bodyText: `Over the next 5 days, you'll receive powerful insights about ${funnelData.productName}. Each email contains actionable strategies you can implement immediately.`,
            ctaText: 'Check Your Email',
            colors: { primary: '#8b5cf6', secondary: '#7c3aed', background: '#faf5ff' }
          }
        },
        offer: {
          title: 'Main Offer',
          description: `Premium ${funnelData.productName} program`,
          content: {
            headline: `Get The Complete ${funnelData.productName} System`,
            subheadline: `Everything you need to succeed, backed by our 60-day guarantee`,
            bodyText: `The complete system includes: Step-by-step video training, downloadable resources, private community access, weekly group coaching calls, and personal support. Limited time offer: Save 50% today only.`,
            ctaText: `Get Complete System - ${funnelData.pricePoint}`,
            colors: { primary: '#ef4444', secondary: '#dc2626', background: '#fef2f2' }
          }
        },
        upsell: {
          title: 'Exclusive Upsell',
          description: 'Premium addon offer',
          content: {
            headline: `Add 1-on-1 Coaching For Just $297 More`,
            subheadline: 'Accelerate your results with personal guidance',
            bodyText: `Get direct access to expert coaching with personalized strategies for your specific situation. This exclusive add-on is only available to ${funnelData.productName} customers.`,
            ctaText: 'Add 1-on-1 Coaching',
            colors: { primary: '#f59e0b', secondary: '#d97706', background: '#fffbeb' }
          }
        },
        thankyou: {
          title: 'Thank You Page',
          description: 'Confirmation and next steps',
          content: {
            headline: 'Welcome to the Community!',
            subheadline: 'Your transformation starts now',
            bodyText: `Thank you for joining ${funnelData.productName}! Check your email for login details and your welcome package. Join our private community to connect with others on the same journey.`,
            ctaText: 'Join Private Community',
            colors: { primary: '#06b6d4', secondary: '#0891b2', background: '#f0fdff' }
          }
        }
      };

      const stepContent = stepTemplates[stepType as keyof typeof stepTemplates];
      res.json(stepContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate step content" });
    }
  });

  // Generate live lead magnet
  app.post("/api/generate-lead-magnet", async (req, res) => {
    try {
      const { type, topic, targetAudience, goal } = req.body;
      
      const leadMagnetContent = {
        id: Date.now().toString(),
        title: `The Ultimate ${topic} Guide`,
        type,
        topic,
        targetAudience,
        goal,
        status: 'active',
        downloads: 0,
        conversion: 0,
        created: new Date().toISOString().split('T')[0],
        content: generateLeadMagnetContent(type, topic, targetAudience),
        landingPage: {
          headline: `Free Download: Master ${topic} in 30 Days`,
          subheadline: `Get the exact strategies used by successful professionals to excel at ${topic}`,
          benefits: [
            `Learn the #1 secret to ${topic} success`,
            'Step-by-step implementation guide',
            'Real-world case studies and examples',
            'Bonus templates and checklists',
            'Avoid the most common costly mistakes'
          ],
          ctaText: 'Download Free Guide Now'
        },
        emailSequence: [
          {
            subject: `Your ${topic} guide is here!`,
            content: `Thanks for downloading our ${topic} guide. Here's what to focus on first...`
          },
          {
            subject: `The #1 ${topic} mistake (avoid this!)`,
            content: `Yesterday I shared the guide, today let me tell you about the biggest mistake I see...`
          },
          {
            subject: `Quick ${topic} win (do this today)`,
            content: `Here's a simple strategy you can implement today to see immediate results with ${topic}...`
          }
        ]
      };
      
      res.json(leadMagnetContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate lead magnet" });
    }
  });

  function generateLeadMagnetContent(type: string, topic: string, targetAudience: string) {
    switch (type) {
      case 'ebook':
        return {
          chapters: [
            {
              title: `Introduction to ${topic}`,
              content: `Welcome to your comprehensive guide on ${topic}. This guide is specifically designed for ${targetAudience} who want to master ${topic} quickly and effectively.`,
              pages: 8
            },
            {
              title: `The ${topic} Fundamentals`,
              content: `Before diving into advanced strategies, let's establish a solid foundation. Understanding these core principles will accelerate your ${topic} journey.`,
              pages: 12
            },
            {
              title: `Advanced ${topic} Strategies`,
              content: `Now that you have the basics down, let's explore the advanced techniques that separate beginners from experts in ${topic}.`,
              pages: 15
            },
            {
              title: `Common ${topic} Mistakes to Avoid`,
              content: `Learn from the mistakes of others. These are the most common pitfalls that can derail your ${topic} progress.`,
              pages: 10
            },
            {
              title: `${topic} Tools and Resources`,
              content: `A curated list of the best tools, software, and resources to accelerate your ${topic} success.`,
              pages: 8
            },
            {
              title: `Next Steps and Action Plan`,
              content: `Your 30-day action plan to implement everything you've learned and achieve measurable results with ${topic}.`,
              pages: 12
            }
          ],
          totalPages: 65,
          format: 'PDF',
          downloadSize: '2.3 MB'
        };
      case 'checklist':
        return {
          items: [
            `Complete ${topic} audit and assessment`,
            `Set up essential ${topic} tools and systems`,
            `Create your ${topic} strategy document`,
            `Implement first ${topic} campaign`,
            `Track and measure ${topic} results`,
            `Optimize based on initial performance`,
            `Scale successful ${topic} activities`,
            `Build long-term ${topic} processes`
          ],
          format: 'PDF Checklist',
          downloadSize: '0.8 MB'
        };
      case 'template':
        return {
          templates: [
            `${topic} Planning Template`,
            `${topic} Tracking Spreadsheet`,
            `${topic} Email Templates`,
            `${topic} Social Media Templates`,
            `${topic} Presentation Slides`,
            `${topic} Contract Templates`
          ],
          format: 'Multiple Files (ZIP)',
          downloadSize: '4.2 MB'
        };
      default:
        return {
          description: `Comprehensive ${topic} resource for ${targetAudience}`,
          format: 'PDF',
          downloadSize: '1.5 MB'
        };
    }
  }

  const httpServer = createServer(app);

  return httpServer;
}
