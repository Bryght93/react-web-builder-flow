import { 
  users, 
  funnels, 
  pages, 
  leadMagnets, 
  leads, 
  templates,
  type User, 
  type InsertUser,
  type Funnel,
  type InsertFunnel,
  type Page,
  type InsertPage,
  type LeadMagnet,
  type InsertLeadMagnet,
  type Lead,
  type InsertLead,
  type Template,
  type InsertTemplate
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Funnel methods
  getFunnels(userId: number): Promise<Funnel[]>;
  getFunnel(id: number): Promise<Funnel | undefined>;
  createFunnel(funnel: InsertFunnel): Promise<Funnel>;
  updateFunnel(id: number, funnel: Partial<InsertFunnel>): Promise<Funnel>;
  deleteFunnel(id: number): Promise<void>;
  
  // Page methods
  getPages(funnelId: number): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: number): Promise<void>;
  
  // Lead Magnet methods
  getLeadMagnets(userId: number): Promise<LeadMagnet[]>;
  getLeadMagnet(id: number): Promise<LeadMagnet | undefined>;
  createLeadMagnet(leadMagnet: InsertLeadMagnet): Promise<LeadMagnet>;
  updateLeadMagnet(id: number, leadMagnet: Partial<InsertLeadMagnet>): Promise<LeadMagnet>;
  deleteLeadMagnet(id: number): Promise<void>;
  
  // Lead methods
  getLeads(userId: number): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead>;
  deleteLead(id: number): Promise<void>;
  
  // Template methods
  getTemplates(category?: string): Promise<Template[]>;
  getTemplate(id: number): Promise<Template | undefined>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template>;
  deleteTemplate(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Funnel methods
  async getFunnels(userId: number): Promise<Funnel[]> {
    return await db
      .select()
      .from(funnels)
      .where(eq(funnels.userId, userId))
      .orderBy(desc(funnels.createdAt));
  }

  async getFunnel(id: number): Promise<Funnel | undefined> {
    const [funnel] = await db.select().from(funnels).where(eq(funnels.id, id));
    return funnel || undefined;
  }

  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const [newFunnel] = await db
      .insert(funnels)
      .values(funnel)
      .returning();
    return newFunnel;
  }

  async updateFunnel(id: number, funnel: Partial<InsertFunnel>): Promise<Funnel> {
    const [updatedFunnel] = await db
      .update(funnels)
      .set({ ...funnel, updatedAt: new Date() })
      .where(eq(funnels.id, id))
      .returning();
    return updatedFunnel;
  }

  async deleteFunnel(id: number): Promise<void> {
    await db.delete(funnels).where(eq(funnels.id, id));
  }

  // Page methods
  async getPages(funnelId: number): Promise<Page[]> {
    return await db
      .select()
      .from(pages)
      .where(eq(pages.funnelId, funnelId))
      .orderBy(pages.order);
  }

  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db
      .insert(pages)
      .values(page)
      .returning();
    return newPage;
  }

  async updatePage(id: number, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Lead Magnet methods
  async getLeadMagnets(userId: number): Promise<LeadMagnet[]> {
    return await db
      .select()
      .from(leadMagnets)
      .where(eq(leadMagnets.userId, userId))
      .orderBy(desc(leadMagnets.createdAt));
  }

  async getLeadMagnet(id: number): Promise<LeadMagnet | undefined> {
    const [leadMagnet] = await db.select().from(leadMagnets).where(eq(leadMagnets.id, id));
    return leadMagnet || undefined;
  }

  async createLeadMagnet(leadMagnet: InsertLeadMagnet): Promise<LeadMagnet> {
    const [newLeadMagnet] = await db
      .insert(leadMagnets)
      .values(leadMagnet)
      .returning();
    return newLeadMagnet;
  }

  async updateLeadMagnet(id: number, leadMagnet: Partial<InsertLeadMagnet>): Promise<LeadMagnet> {
    const [updatedLeadMagnet] = await db
      .update(leadMagnets)
      .set({ ...leadMagnet, updatedAt: new Date() })
      .where(eq(leadMagnets.id, id))
      .returning();
    return updatedLeadMagnet;
  }

  async deleteLeadMagnet(id: number): Promise<void> {
    await db.delete(leadMagnets).where(eq(leadMagnets.id, id));
  }

  // Lead methods
  async getLeads(userId: number): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.userId, userId))
      .orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values(lead)
      .returning();
    return newLead;
  }

  async updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead> {
    const [updatedLead] = await db
      .update(leads)
      .set({ ...lead, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return updatedLead;
  }

  async deleteLead(id: number): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  // Template methods
  async getTemplates(category?: string): Promise<Template[]> {
    const query = db.select().from(templates);
    
    if (category) {
      return await query.where(eq(templates.category, category)).orderBy(desc(templates.createdAt));
    }
    
    return await query.orderBy(desc(templates.createdAt));
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    const [template] = await db.select().from(templates).where(eq(templates.id, id));
    return template || undefined;
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const [newTemplate] = await db
      .insert(templates)
      .values(template)
      .returning();
    return newTemplate;
  }

  async updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template> {
    const [updatedTemplate] = await db
      .update(templates)
      .set(template)
      .where(eq(templates.id, id))
      .returning();
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }
}

export const storage = new DatabaseStorage();
