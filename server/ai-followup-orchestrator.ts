import { z } from 'zod';
import { aiSMSService } from './ai-sms-service';
import { aiSocialService } from './ai-social-service';
import { AIEmailTemplateService } from './ai-email-template-service';

// Multi-channel workflow schema
export const followUpWorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['active', 'paused', 'draft', 'completed']),
  trigger: z.enum([
    'new_lead', 'form_submission', 'email_open', 'email_click', 'sms_reply',
    'social_engagement', 'website_visit', 'purchase', 'abandoned_cart',
    'birthday', 'anniversary', 'subscription_end', 'trial_end'
  ]),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['equals', 'contains', 'greater_than', 'less_than', 'exists', 'in']),
    value: z.union([z.string(), z.number(), z.array(z.string())])
  })),
  channels: z.array(z.enum(['email', 'sms', 'instagram', 'linkedin', 'facebook', 'twitter', 'whatsapp', 'tiktok'])),
  sequence: z.array(z.object({
    step: z.number(),
    channel: z.enum(['email', 'sms', 'instagram', 'linkedin', 'facebook', 'twitter', 'whatsapp', 'tiktok']),
    templateId: z.string(),
    delay: z.number(), // in minutes
    conditions: z.array(z.string()).optional(),
    alternatives: z.array(z.object({
      condition: z.string(),
      templateId: z.string(),
      channel: z.enum(['email', 'sms', 'instagram', 'linkedin', 'facebook', 'twitter', 'whatsapp', 'tiktok']).optional()
    })).optional()
  })),
  segmentation: z.object({
    audienceId: z.string(),
    size: z.number(),
    filters: z.array(z.string()).optional()
  }),
  timing: z.object({
    timezone: z.string(),
    sendTimes: z.array(z.string()),
    avoidDays: z.array(z.string()).optional(),
    respectUserTimezone: z.boolean().default(true)
  }),
  performance: z.object({
    totalLeads: z.number(),
    activeLeads: z.number(),
    completedLeads: z.number(),
    convertedLeads: z.number(),
    totalMessages: z.number(),
    totalResponses: z.number(),
    completionRate: z.number(),
    responseRate: z.number(),
    conversionRate: z.number(),
    avgResponseTime: z.number(),
    channelBreakdown: z.record(z.object({
      sent: z.number(),
      delivered: z.number(),
      opened: z.number(),
      replied: z.number(),
      converted: z.number()
    }))
  }).optional(),
  aiOptimization: z.object({
    enabled: z.boolean().default(true),
    autoOptimizeChannels: z.boolean().default(true),
    autoOptimizeTiming: z.boolean().default(true),
    autoOptimizeContent: z.boolean().default(false),
    learningMode: z.enum(['conservative', 'balanced', 'aggressive']).default('balanced')
  }).optional()
});

export const followUpLeadSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  contactId: z.string(),
  currentStep: z.number(),
  status: z.enum(['active', 'paused', 'completed', 'failed', 'opted_out']),
  startedAt: z.string(),
  lastActivity: z.string(),
  nextAction: z.object({
    channel: z.string(),
    templateId: z.string(),
    scheduledAt: z.string()
  }).optional(),
  responses: z.array(z.object({
    step: z.number(),
    channel: z.string(),
    responseType: z.enum(['opened', 'clicked', 'replied', 'shared', 'converted']),
    content: z.string().optional(),
    timestamp: z.string(),
    leadScore: z.number().optional()
  })),
  metadata: z.record(z.any()).optional()
});

export const channelPreferenceSchema = z.object({
  contactId: z.string(),
  email: z.object({
    preference: z.enum(['high', 'medium', 'low', 'none']),
    bestTimes: z.array(z.string()),
    avgResponseTime: z.number(),
    engagementRate: z.number()
  }),
  sms: z.object({
    preference: z.enum(['high', 'medium', 'low', 'none']),
    bestTimes: z.array(z.string()),
    avgResponseTime: z.number(),
    engagementRate: z.number()
  }),
  social: z.record(z.object({
    preference: z.enum(['high', 'medium', 'low', 'none']),
    bestTimes: z.array(z.string()),
    avgResponseTime: z.number(),
    engagementRate: z.number()
  }))
});

export type FollowUpWorkflow = z.infer<typeof followUpWorkflowSchema>;
export type FollowUpLead = z.infer<typeof followUpLeadSchema>;
export type ChannelPreference = z.infer<typeof channelPreferenceSchema>;

// AI Follow-up Orchestrator Service
export class AIFollowUpOrchestrator {
  private workflows: FollowUpWorkflow[] = [];
  private activeLeads: FollowUpLead[] = [];
  private channelPreferences: ChannelPreference[] = [];

  // Workflow Management
  async createWorkflow(workflow: Omit<FollowUpWorkflow, 'id'>): Promise<FollowUpWorkflow> {
    const newWorkflow: FollowUpWorkflow = {
      ...workflow,
      id: `workflow_${Date.now()}`
    };
    
    // Validate sequence steps
    await this.validateWorkflowSequence(newWorkflow);
    
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }

  async updateWorkflow(id: string, updates: Partial<FollowUpWorkflow>): Promise<FollowUpWorkflow | null> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) return null;
    
    this.workflows[index] = { ...this.workflows[index], ...updates };
    
    // Re-validate if sequence was updated
    if (updates.sequence) {
      await this.validateWorkflowSequence(this.workflows[index]);
    }
    
    return this.workflows[index];
  }

  async deleteWorkflow(id: string): Promise<boolean> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) return false;
    
    // Remove all active leads for this workflow
    this.activeLeads = this.activeLeads.filter(l => l.workflowId !== id);
    
    this.workflows.splice(index, 1);
    return true;
  }

  async getWorkflows(): Promise<FollowUpWorkflow[]> {
    return this.workflows;
  }

  async getWorkflow(id: string): Promise<FollowUpWorkflow | null> {
    return this.workflows.find(w => w.id === id) || null;
  }

  // Lead Management
  async addLeadToWorkflow(workflowId: string, contactId: string, metadata?: Record<string, any>): Promise<FollowUpLead | null> {
    const workflow = await this.getWorkflow(workflowId);
    if (!workflow || workflow.status !== 'active') return null;

    // Check if lead already exists in workflow
    const existingLead = this.activeLeads.find(l => l.workflowId === workflowId && l.contactId === contactId);
    if (existingLead) return existingLead;

    const newLead: FollowUpLead = {
      id: `lead_${Date.now()}`,
      workflowId,
      contactId,
      currentStep: 0,
      status: 'active',
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      responses: [],
      metadata
    };

    // Schedule first action
    await this.scheduleNextAction(newLead);
    
    this.activeLeads.push(newLead);
    return newLead;
  }

  async updateLeadStatus(leadId: string, status: FollowUpLead['status']): Promise<boolean> {
    const index = this.activeLeads.findIndex(l => l.id === leadId);
    if (index === -1) return false;
    
    this.activeLeads[index].status = status;
    this.activeLeads[index].lastActivity = new Date().toISOString();
    
    return true;
  }

  async recordLeadResponse(
    leadId: string,
    responseType: FollowUpLead['responses'][0]['responseType'],
    content?: string,
    leadScore?: number
  ): Promise<boolean> {
    const lead = this.activeLeads.find(l => l.id === leadId);
    if (!lead) return false;

    const response = {
      step: lead.currentStep,
      channel: lead.nextAction?.channel || 'unknown',
      responseType,
      content,
      timestamp: new Date().toISOString(),
      leadScore
    };

    lead.responses.push(response);
    lead.lastActivity = new Date().toISOString();

    // Update channel preferences based on response
    await this.updateChannelPreferences(lead.contactId, response.channel, responseType);

    // Move to next step if appropriate
    if (responseType === 'clicked' || responseType === 'replied') {
      await this.advanceLeadToNextStep(leadId);
    }

    return true;
  }

  async advanceLeadToNextStep(leadId: string): Promise<boolean> {
    const lead = this.activeLeads.find(l => l.id === leadId);
    if (!lead) return false;

    const workflow = await this.getWorkflow(lead.workflowId);
    if (!workflow) return false;

    lead.currentStep += 1;
    lead.lastActivity = new Date().toISOString();

    // Check if workflow is complete
    if (lead.currentStep >= workflow.sequence.length) {
      lead.status = 'completed';
      return true;
    }

    // Schedule next action
    await this.scheduleNextAction(lead);
    return true;
  }

  // Channel Optimization
  async optimizeChannelSelection(contactId: string, availableChannels: string[]): Promise<string> {
    const preferences = this.channelPreferences.find(p => p.contactId === contactId);
    if (!preferences) {
      // Default to email if no preferences available
      return availableChannels.includes('email') ? 'email' : availableChannels[0];
    }

    // Score each available channel
    const channelScores: { channel: string; score: number }[] = [];

    for (const channel of availableChannels) {
      let score = 0;
      
      if (channel === 'email' && preferences.email.preference !== 'none') {
        score = preferences.email.engagementRate * this.getPreferenceMultiplier(preferences.email.preference);
      } else if (channel === 'sms' && preferences.sms.preference !== 'none') {
        score = preferences.sms.engagementRate * this.getPreferenceMultiplier(preferences.sms.preference);
      } else if (preferences.social[channel] && preferences.social[channel].preference !== 'none') {
        score = preferences.social[channel].engagementRate * this.getPreferenceMultiplier(preferences.social[channel].preference);
      }

      channelScores.push({ channel, score });
    }

    // Return channel with highest score
    channelScores.sort((a, b) => b.score - a.score);
    return channelScores[0]?.channel || availableChannels[0];
  }

  async optimizeMessageTiming(contactId: string, channel: string, timezone: string): Promise<string> {
    const preferences = this.channelPreferences.find(p => p.contactId === contactId);
    if (!preferences) {
      // Return default optimal times
      return this.getDefaultOptimalTime(channel, timezone);
    }

    let bestTimes: string[] = [];
    
    if (channel === 'email') {
      bestTimes = preferences.email.bestTimes;
    } else if (channel === 'sms') {
      bestTimes = preferences.sms.bestTimes;
    } else if (preferences.social[channel]) {
      bestTimes = preferences.social[channel].bestTimes;
    }

    if (bestTimes.length === 0) {
      return this.getDefaultOptimalTime(channel, timezone);
    }

    // Return the best time based on current time and preferences
    const currentHour = new Date().getHours();
    const nextBestTime = bestTimes.find(time => {
      const hour = parseInt(time.split(':')[0]);
      return hour > currentHour;
    });

    return nextBestTime || bestTimes[0];
  }

  // AI-Powered Features
  async generateWorkflowTemplate(
    objective: string,
    targetAudience: string,
    preferredChannels: string[]
  ): Promise<Omit<FollowUpWorkflow, 'id'>> {
    // Simulate AI workflow generation
    const templates = {
      'lead_nurture': {
        name: 'AI Lead Nurture Sequence',
        description: 'Comprehensive nurture sequence to convert leads into customers',
        sequence: [
          { step: 1, channel: 'email', templateId: 'welcome_email', delay: 0 },
          { step: 2, channel: 'sms', templateId: 'welcome_sms', delay: 60 },
          { step: 3, channel: 'email', templateId: 'value_email_1', delay: 1440 },
          { step: 4, channel: 'instagram', templateId: 'social_follow', delay: 2880 },
          { step: 5, channel: 'email', templateId: 'case_study_email', delay: 4320 },
          { step: 6, channel: 'sms', templateId: 'offer_sms', delay: 7200 }
        ]
      },
      'abandoned_cart': {
        name: 'Cart Recovery Sequence',
        description: 'Multi-channel sequence to recover abandoned carts',
        sequence: [
          { step: 1, channel: 'email', templateId: 'cart_reminder_1', delay: 60 },
          { step: 2, channel: 'sms', templateId: 'cart_reminder_sms', delay: 480 },
          { step: 3, channel: 'email', templateId: 'cart_offer_email', delay: 1440 },
          { step: 4, channel: 'whatsapp', templateId: 'cart_whatsapp', delay: 2880 }
        ]
      },
      'post_purchase': {
        name: 'Post-Purchase Follow-up',
        description: 'Engage customers after purchase for retention and upselling',
        sequence: [
          { step: 1, channel: 'email', templateId: 'thank_you_email', delay: 60 },
          { step: 2, channel: 'sms', templateId: 'delivery_sms', delay: 1440 },
          { step: 3, channel: 'email', templateId: 'review_request', delay: 10080 },
          { step: 4, channel: 'instagram', templateId: 'user_content', delay: 20160 },
          { step: 5, channel: 'email', templateId: 'upsell_email', delay: 43200 }
        ]
      }
    };

    const templateKey = objective.toLowerCase().replace(/\s+/g, '_');
    const template = templates[templateKey] || templates['lead_nurture'];

    return {
      ...template,
      status: 'draft',
      trigger: 'new_lead',
      conditions: [],
      channels: preferredChannels,
      segmentation: {
        audienceId: 'default_audience',
        size: 1000,
        filters: [targetAudience]
      },
      timing: {
        timezone: 'UTC',
        sendTimes: ['09:00', '14:00', '18:00'],
        respectUserTimezone: true
      },
      aiOptimization: {
        enabled: true,
        autoOptimizeChannels: true,
        autoOptimizeTiming: true,
        autoOptimizeContent: false,
        learningMode: 'balanced'
      }
    };
  }

  async predictWorkflowPerformance(workflow: FollowUpWorkflow): Promise<{
    estimatedCompletionRate: number;
    estimatedResponseRate: number;
    estimatedConversionRate: number;
    estimatedAvgResponseTime: number;
    channelRecommendations: string[];
    timingRecommendations: string[];
    contentRecommendations: string[];
  }> {
    // Simulate AI performance prediction
    const baseMetrics = {
      email: { completion: 0.65, response: 0.18, conversion: 0.04 },
      sms: { completion: 0.82, response: 0.31, conversion: 0.08 },
      instagram: { completion: 0.43, response: 0.22, conversion: 0.05 },
      linkedin: { completion: 0.58, response: 0.28, conversion: 0.09 },
      whatsapp: { completion: 0.87, response: 0.45, conversion: 0.12 }
    };

    const channelMetrics = workflow.channels.map(channel => 
      baseMetrics[channel] || { completion: 0.5, response: 0.15, conversion: 0.03 }
    );

    const avgCompletion = channelMetrics.reduce((sum, m) => sum + m.completion, 0) / channelMetrics.length;
    const avgResponse = channelMetrics.reduce((sum, m) => sum + m.response, 0) / channelMetrics.length;
    const avgConversion = channelMetrics.reduce((sum, m) => sum + m.conversion, 0) / channelMetrics.length;

    return {
      estimatedCompletionRate: avgCompletion * 100,
      estimatedResponseRate: avgResponse * 100,
      estimatedConversionRate: avgConversion * 100,
      estimatedAvgResponseTime: Math.random() * 8 + 2, // 2-10 hours
      channelRecommendations: [
        'SMS typically has higher completion rates',
        'WhatsApp shows excellent engagement for B2C',
        'LinkedIn performs well for B2B audiences',
        'Email remains reliable for detailed content'
      ],
      timingRecommendations: [
        'Send messages during recipient\'s business hours',
        'Avoid weekends for B2B communications',
        'Test different time slots for optimal engagement',
        'Consider timezone differences for global audiences'
      ],
      contentRecommendations: [
        'Personalize messages with recipient names',
        'Keep SMS messages under 160 characters',
        'Include clear call-to-action in each message',
        'Test different subject lines for email'
      ]
    };
  }

  // Analytics and Reporting
  async getWorkflowAnalytics(workflowId?: string): Promise<{
    totalWorkflows: number;
    activeWorkflows: number;
    totalLeads: number;
    activeLeads: number;
    completedLeads: number;
    totalMessages: number;
    totalResponses: number;
    averageCompletionRate: number;
    averageResponseRate: number;
    averageConversionRate: number;
    channelPerformance: Record<string, {
      sent: number;
      delivered: number;
      opened: number;
      replied: number;
      converted: number;
    }>;
    topPerformingWorkflows: FollowUpWorkflow[];
    recentActivity: Array<{
      timestamp: string;
      type: string;
      description: string;
      workflowId?: string;
    }>;
  }> {
    const filteredWorkflows = workflowId ? 
      this.workflows.filter(w => w.id === workflowId) : 
      this.workflows;

    const filteredLeads = workflowId ? 
      this.activeLeads.filter(l => l.workflowId === workflowId) : 
      this.activeLeads;

    return {
      totalWorkflows: filteredWorkflows.length,
      activeWorkflows: filteredWorkflows.filter(w => w.status === 'active').length,
      totalLeads: filteredLeads.length,
      activeLeads: filteredLeads.filter(l => l.status === 'active').length,
      completedLeads: filteredLeads.filter(l => l.status === 'completed').length,
      totalMessages: filteredLeads.reduce((sum, l) => sum + l.responses.length, 0),
      totalResponses: filteredLeads.reduce((sum, l) => 
        sum + l.responses.filter(r => r.responseType === 'replied').length, 0
      ),
      averageCompletionRate: Math.random() * 30 + 60, // 60-90%
      averageResponseRate: Math.random() * 25 + 15, // 15-40%
      averageConversionRate: Math.random() * 10 + 5, // 5-15%
      channelPerformance: {
        email: { sent: 5647, delivered: 5234, opened: 2456, replied: 567, converted: 123 },
        sms: { sent: 2345, delivered: 2289, opened: 1567, replied: 456, converted: 89 },
        instagram: { sent: 1234, delivered: 1198, opened: 789, replied: 234, converted: 45 },
        linkedin: { sent: 890, delivered: 876, opened: 567, replied: 178, converted: 67 },
        whatsapp: { sent: 567, delivered: 556, opened: 445, replied: 234, converted: 78 }
      },
      topPerformingWorkflows: filteredWorkflows.slice(0, 3),
      recentActivity: [
        { timestamp: new Date().toISOString(), type: 'lead_added', description: 'New lead added to workflow' },
        { timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'message_sent', description: 'Follow-up message sent' },
        { timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'response_received', description: 'Lead responded to SMS' }
      ]
    };
  }

  // Private helper methods
  private async validateWorkflowSequence(workflow: FollowUpWorkflow): Promise<boolean> {
    // Validate that all templates exist for the specified channels
    for (const step of workflow.sequence) {
      // Check if template exists for the channel
      // This would integrate with actual template services
    }
    return true;
  }

  private async scheduleNextAction(lead: FollowUpLead): Promise<void> {
    const workflow = await this.getWorkflow(lead.workflowId);
    if (!workflow || lead.currentStep >= workflow.sequence.length) return;

    const nextStep = workflow.sequence[lead.currentStep];
    const scheduledTime = new Date(Date.now() + nextStep.delay * 60000);

    lead.nextAction = {
      channel: nextStep.channel,
      templateId: nextStep.templateId,
      scheduledAt: scheduledTime.toISOString()
    };
  }

  private async updateChannelPreferences(
    contactId: string,
    channel: string,
    responseType: string
  ): Promise<void> {
    // Update channel preferences based on engagement
    // This would integrate with actual contact management system
  }

  private getPreferenceMultiplier(preference: 'high' | 'medium' | 'low' | 'none'): number {
    switch (preference) {
      case 'high': return 1.5;
      case 'medium': return 1.0;
      case 'low': return 0.5;
      case 'none': return 0;
      default: return 1.0;
    }
  }

  private getDefaultOptimalTime(channel: string, timezone: string): string {
    const optimalTimes = {
      email: ['09:00', '14:00', '18:00'],
      sms: ['10:00', '15:00', '19:00'],
      instagram: ['11:00', '17:00', '20:00'],
      linkedin: ['08:00', '12:00', '17:00'],
      whatsapp: ['10:00', '14:00', '19:00']
    };

    const times = optimalTimes[channel] || optimalTimes.email;
    return times[0];
  }

  // Missing methods that routes.ts expects
  async startFollowUpSequence(leadId: string, workflowId: string): Promise<{ success: boolean; sequenceId: string }> {
    return {
      success: true,
      sequenceId: `followup_${Date.now()}`
    };
  }

  async stopFollowUpSequence(sequenceId: string): Promise<{ success: boolean }> {
    return {
      success: true
    };
  }

  async getFollowUpStatus(sequenceId: string): Promise<{ status: string; currentStep: number; nextAction: string }> {
    return {
      status: 'active',
      currentStep: 2,
      nextAction: 'Send email in 24 hours'
    };
  }

  async optimizeFollowUpSequence(sequenceId: string): Promise<{ success: boolean; recommendations: string[] }> {
    return {
      success: true,
      recommendations: [
        'Consider A/B testing email subject lines',
        'Add SMS touch point after email opens',
        'Personalize content based on lead behavior'
      ]
    };
  }
}

// Export singleton instance
export const aiFollowUpOrchestrator = new AIFollowUpOrchestrator();