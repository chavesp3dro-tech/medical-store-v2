import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, InsertCategory, products, InsertProduct, faqs, InsertFAQ, contacts, InsertContact, storeConfig, InsertStoreConfig } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ CATEGORIES ============
export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result[0];
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(categories).values(data);
}

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(categories).set(data).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(categories).where(eq(categories.id, id));
}

// ============ PRODUCTS ============
export async function getProducts(categoryId?: number) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(products.isActive, true)];
  if (categoryId) {
    conditions.push(eq(products.categoryId, categoryId));
  }
  return db.select().from(products).where(and(...conditions)).orderBy(products.name);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0];
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(data);
  return result;
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

// ============ FAQs ============
export async function getFAQs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(faqs.order);
}

export async function getAllFAQs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(faqs).orderBy(faqs.order);
}

export async function getFAQById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
  return result[0];
}

export async function createFAQ(data: InsertFAQ) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(faqs).values(data);
}

export async function updateFAQ(id: number, data: Partial<InsertFAQ>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(faqs).set(data).where(eq(faqs.id, id));
}

export async function deleteFAQ(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(faqs).where(eq(faqs.id, id));
}

// ============ CONTACTS ============
export async function createContact(data: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contacts).values(data);
}

export async function getContacts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contacts).orderBy(contacts.createdAt);
}

export async function getContactById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
  return result[0];
}

export async function updateContact(id: number, data: Partial<InsertContact>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contacts).set(data).where(eq(contacts.id, id));
}

export async function deleteContact(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(contacts).where(eq(contacts.id, id));
}

// ============ STORE CONFIG ============
export async function getStoreConfig() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(storeConfig).limit(1);
  return result[0] || null;
}

export async function updateStoreConfig(data: Partial<InsertStoreConfig>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const config = await getStoreConfig();
  if (config) {
    await db.update(storeConfig).set(data).where(eq(storeConfig.id, config.id));
  } else {
    await db.insert(storeConfig).values(data as InsertStoreConfig);
  }
}
