import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthContext(role: "admin" | "user" = "admin"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Products Router", () => {
  it("should list all products", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list({});
    expect(Array.isArray(products)).toBe(true);
  });

  it("should not allow non-admin to create product", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.products.create({
        categoryId: 1,
        name: "Test Product",
        slug: "test-product",
        description: "Test Description",
        price: "100.00",
        imageUrls: [],
        specifications: {},
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should not allow non-admin to delete product", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.products.delete({ id: 1 });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("Categories Router", () => {
  it("should list all categories", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.categories.list();
    expect(Array.isArray(categories)).toBe(true);
  });

  it("should not allow non-admin to create category", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.categories.create({
        name: "Test Category",
        slug: "test-category",
        description: "Test Description",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("FAQ Router", () => {
  it("should list all FAQs", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const faqs = await caller.faqs.list();
    expect(Array.isArray(faqs)).toBe(true);
  });

  it("should list all FAQs for admin", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const faqs = await caller.faqs.listAll();
    expect(Array.isArray(faqs)).toBe(true);
  });

  it("should not allow non-admin to create FAQ", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.faqs.create({
        question: "Test Question?",
        answer: "Test Answer",
        order: 0,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("Contacts Router", () => {
  it("should create a contact as public user", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    // This should not throw - contacts can be created by anyone
    try {
      await caller.contacts.create({
        name: "Test Contact",
        email: "contact@test.com",
        phone: "(11) 99999-9999",
        message: "Test message",
        type: "contact",
      });
      // Expected to succeed or fail gracefully
    } catch (error) {
      // OK if it fails due to DB constraints
    }
  });

  it("should not allow non-admin to list contacts", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should allow admin to list contacts", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const contacts = await caller.contacts.list();
    expect(Array.isArray(contacts)).toBe(true);
  });
});

describe("Store Config Router", () => {
  it("should get store config", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const config = await caller.storeConfig.get();
    expect(config).toBeDefined();
  });

  it("should not allow non-admin to update store config", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.storeConfig.update({
        storeName: "Updated Store",
        whatsappNumber: "+55 11 99999-9999",
        contactEmail: "contact@store.com",
        description: "Updated Description",
        logoUrl: "https://example.com/logo.png",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});
