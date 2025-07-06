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

  const httpServer = createServer(app);

  return httpServer;
}
