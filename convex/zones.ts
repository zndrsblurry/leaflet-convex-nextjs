import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("zones").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    coordinates: v.array(v.array(v.number())),
    description: v.optional(v.string()),
    area: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("zones", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("zones"),
    name: v.optional(v.string()),
    coordinates: v.optional(v.array(v.array(v.number()))),
    description: v.optional(v.string()),
    area: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("zones") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
