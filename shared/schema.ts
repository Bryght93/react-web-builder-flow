import { pgTable, text, serial, integer, boolean, json, jsonb, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phoneNumber: varchar("phone_number"),
  accountType: varchar("account_type").default("Free"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  // Business & Marketing Context
  businessName: varchar("business_name"),
  industry: varchar("industry"),
  targetAudience: text("target_audience"),
  mainGoal: text("main_goal"),
  productServiceDescription: text("product_service_description"),
  
  // AI Funnel Customization
  funnelObjective: text("funnel_objective"),
  preferredFunnelStyle: varchar("preferred_funnel_style"),
  leadMagnetType: varchar("lead_magnet_type"),
  preferredPlatform: varchar("preferred_platform"),
  crmIntegration: text("crm_integration"),
  
  // Performance & Usage Tracking
  funnelsCreated: integer("funnels_created").default(0),
  lastActive: timestamp("last_active"),
  leadsCollected: integer("leads_collected").default(0),
  emailsSent: integer("emails_sent").default(0),
  openRate: decimal("open_rate", { precision: 5, scale: 2 }),
  clickRate: decimal("click_rate", { precision: 5, scale: 2 }),
  
  // Tools & Features Access
  hasAccessTo: text("has_access_to").array(),
  currentPlan: varchar("current_plan").default("Starter"),
  
  // Optional Advanced Fields
  customDomain: varchar("custom_domain"),
  aiPromptHistory: jsonb("ai_prompt_history"),
  zapierWebhooks: text("zapier_webhooks").array(),
  referralCode: varchar("referral_code"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const billingHistory = pgTable("billing_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subscriptionType: varchar("subscription_type").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  paymentMethod: varchar("payment_method"),
  invoiceUrl: varchar("invoice_url"),
  status: varchar("status").default("pending"),
  billingDate: timestamp("billing_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  memberEmail: varchar("member_email").notNull(),
  role: varchar("role").default("member"),
  permissions: text("permissions").array(),
  invitedAt: timestamp("invited_at").defaultNow(),
  joinedAt: timestamp("joined_at"),
  status: varchar("status").default("pending"),
});

export const funnels = pgTable("funnels", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'lead_magnet', 'sales', 'webinar', etc.
  status: text("status").notNull().default('draft'), // 'draft', 'live', 'paused'
  settings: json("settings"),
  analytics: json("analytics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  funnelId: integer("funnel_id").references(() => funnels.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'landing', 'optin', 'thankyou', 'offer', 'upsell', 'downsell'
  url: text("url").notNull(),
  content: json("content"), // Page content and styling
  elements: json("elements"), // Array of page elements
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leadMagnets = pgTable("lead_magnets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'ebook', 'quiz', 'checklist', 'template', 'video'
  description: text("description"),
  content: json("content"),
  landingPageId: integer("landing_page_id").references(() => pages.id),
  status: text("status").notNull().default('draft'),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  funnelId: integer("funnel_id").references(() => funnels.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  source: text("source"), // 'organic', 'facebook', 'instagram', 'google', etc.
  status: text("status").notNull().default('new'), // 'new', 'qualified', 'contacted', 'converted'
  score: integer("score").default(0),
  notes: text("notes"),
  customFields: json("custom_fields"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'funnel', 'page', 'email'
  type: text("type").notNull(),
  content: json("content"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Email Marketing Tables
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  preheader: text("preheader"),
  content: json("content").notNull(),
  type: text("type").notNull(), // 'broadcast', 'automation', 'sequence'
  status: text("status").notNull().default('draft'), // 'draft', 'scheduled', 'sent', 'active', 'paused'
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  settings: json("settings"),
  stats: json("stats"), // open rate, click rate, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subject: text("subject"),
  preheader: text("preheader"),
  content: json("content").notNull(),
  thumbnail: text("thumbnail"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailContacts = pgTable("email_contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  tags: text("tags").array(),
  customFields: json("custom_fields"),
  status: text("status").notNull().default('subscribed'), // 'subscribed', 'unsubscribed', 'bounced'
  source: text("source"), // where they came from
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailAutomations = pgTable("email_automations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(), // 'signup', 'purchase', 'tag_added', etc.
  conditions: json("conditions"),
  emails: json("emails").notNull(), // array of email sequences
  status: text("status").notNull().default('draft'), // 'draft', 'active', 'paused'
  stats: json("stats"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const emailSends = pgTable("email_sends", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => emailCampaigns.id),
  contactId: integer("contact_id").references(() => emailContacts.id),
  status: text("status").notNull(), // 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  sentAt: timestamp("sent_at").defaultNow(),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  bouncedAt: timestamp("bounced_at"),
  unsubscribedAt: timestamp("unsubscribed_at"),
  metadata: json("metadata")
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles),
  funnels: many(funnels),
  leadMagnets: many(leadMagnets),
  leads: many(leads),
  billingHistory: many(billingHistory),
  teamMembers: many(teamMembers),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const billingHistoryRelations = relations(billingHistory, ({ one }) => ({
  user: one(users, {
    fields: [billingHistory.userId],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const funnelsRelations = relations(funnels, ({ one, many }) => ({
  user: one(users, { fields: [funnels.userId], references: [users.id] }),
  pages: many(pages),
  leads: many(leads),
}));

export const pagesRelations = relations(pages, ({ one }) => ({
  funnel: one(funnels, { fields: [pages.funnelId], references: [funnels.id] }),
}));

export const leadMagnetsRelations = relations(leadMagnets, ({ one }) => ({
  user: one(users, { fields: [leadMagnets.userId], references: [users.id] }),
  landingPage: one(pages, { fields: [leadMagnets.landingPageId], references: [pages.id] }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, { fields: [leads.userId], references: [users.id] }),
  funnel: one(funnels, { fields: [leads.funnelId], references: [funnels.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFunnelSchema = createInsertSchema(funnels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadMagnetSchema = createInsertSchema(leadMagnets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type Funnel = typeof funnels.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertLeadMagnet = z.infer<typeof insertLeadMagnetSchema>;
export type LeadMagnet = typeof leadMagnets.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

// Email Marketing Types
export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertEmailContactSchema = createInsertSchema(emailContacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  subscribedAt: true,
  unsubscribedAt: true
});

export const insertEmailAutomationSchema = createInsertSchema(emailAutomations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailContact = z.infer<typeof insertEmailContactSchema>;
export type EmailContact = typeof emailContacts.$inferSelect;
export type InsertEmailAutomation = z.infer<typeof insertEmailAutomationSchema>;
export type EmailAutomation = typeof emailAutomations.$inferSelect;
export type EmailSend = typeof emailSends.$inferSelect;

// User Profile Types
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBillingHistorySchema = createInsertSchema(billingHistory).omit({
  id: true,
  createdAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  invitedAt: true,
  joinedAt: true,
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertBillingHistory = z.infer<typeof insertBillingHistorySchema>;
export type BillingHistory = typeof billingHistory.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
