import { pgTable, text, serial, integer, boolean, json, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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
export const usersRelations = relations(users, ({ many }) => ({
  funnels: many(funnels),
  leadMagnets: many(leadMagnets),
  leads: many(leads),
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
