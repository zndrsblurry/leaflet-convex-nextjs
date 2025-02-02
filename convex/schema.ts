import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
const messages = defineTable({
  author: v.string(),
  body: v.string(),
});

const zones = defineTable({
  name: v.string(),
  coordinates: v.array(v.array(v.number())), // [[lat, lng], [lat, lng], ...]
  description: v.optional(v.string()),
  isActive: v.boolean(),
  createdAt: v.number(), // Unix timestamp
  updatedAt: v.number(), // Unix timestamp
  area: v.number(), // Calculated area in square meters
});

export default defineSchema({
  messages,
  zones,
});
