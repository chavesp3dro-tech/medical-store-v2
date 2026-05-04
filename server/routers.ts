import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  categories: router({
    list: publicProcedure.query(() => db.getCategories()),
    get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getCategoryById(input.id)),
    create: protectedProcedure
      .input(z.object({ name: z.string(), slug: z.string(), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.createCategory(input);
      }),
    update: protectedProcedure
      .input(z.object({ id: z.number(), name: z.string().optional(), slug: z.string().optional(), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const { id, ...data } = input;
        await db.updateCategory(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.deleteCategory(input.id);
      }),
  }),

  products: router({
    list: publicProcedure.input(z.object({ categoryId: z.number().optional() }).optional()).query(({ input }) => db.getProducts(input?.categoryId)),
    get: publicProcedure.input(z.object({ id: z.number() }).optional()).query(({ input }) => input?.id ? db.getProductById(input.id) : null),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => db.getProductBySlug(input.slug)),
    create: protectedProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        specifications: z.any().optional(),
        price: z.string(),
        imageUrls: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.createProduct(input as any);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        specifications: z.any().optional(),
        price: z.string().optional(),
        imageUrls: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const { id, ...data } = input;
        await db.updateProduct(id, data as any);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.deleteProduct(input.id);
      }),
  }),

  faqs: router({
    list: publicProcedure.query(() => db.getFAQs()),
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.getAllFAQs();
    }),
    get: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.getFAQById(input.id);
    }),
    create: protectedProcedure
      .input(z.object({ question: z.string(), answer: z.string(), order: z.number().optional() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.createFAQ(input as any);
      }),
    update: protectedProcedure
      .input(z.object({ id: z.number(), question: z.string().optional(), answer: z.string().optional(), order: z.number().optional(), isActive: z.boolean().optional() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const { id, ...data } = input;
        await db.updateFAQ(id, data as any);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.deleteFAQ(input.id);
      }),
  }),

  contacts: router({
    create: publicProcedure
      .input(z.object({ name: z.string(), email: z.string().email(), phone: z.string().optional(), message: z.string(), type: z.enum(["contact", "vendor_request"]) }))
      .mutation(async ({ input }) => {
        await db.createContact(input as any);
        await notifyOwner({
          title: `Novo ${input.type === "vendor_request" ? "pedido de vendedor" : "contato"} recebido`,
          content: `Nome: ${input.name}\nEmail: ${input.email}\nTelefone: ${input.phone || "Não informado"}\n\nMensagem:\n${input.message}`,
        });
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.getContacts();
    }),
    get: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.getContactById(input.id);
    }),
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.updateContact(input.id, { isRead: true });
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.deleteContact(input.id);
      }),
  }),

  storeConfig: router({
    get: publicProcedure.query(() => db.getStoreConfig()),
    update: protectedProcedure
      .input(z.object({
        logoUrl: z.string().optional(),
        storeName: z.string().optional(),
        whatsappNumber: z.string().optional(),
        contactEmail: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        await db.updateStoreConfig(input as any);
      }),
  }),

  storage: router({
    uploadImage: protectedProcedure
      .input(z.object({
        filename: z.string(),
        base64Data: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          // Decode base64 to buffer
          const buffer = Buffer.from(input.base64Data, 'base64');
          
          // Generate unique filename
          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(2, 8);
          const fileKey = `products/${timestamp}-${randomStr}-${input.filename}`;
          
          // Upload to storage
          const { url, key } = await storagePut(fileKey, buffer, input.mimeType);
          
          return { url, key, filename: input.filename };
        } catch (error) {
          console.error('Upload error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to upload image',
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
