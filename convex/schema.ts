import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    properties: defineTable({
        title_es: v.string(),
        title_en: v.string(),
        description_es: v.string(),
        description_en: v.string(),
        price: v.number(),
        bedrooms: v.number(),
        bathrooms: v.number(),
        size: v.number(),
        type: v.string(), // (apartment, house, villa, etc.)
        address: v.string(),
        neighborhood: v.optional(v.string()),
        distanceToBeach: v.optional(v.number()),
        coordinates: v.object({ lat: v.number(), lng: v.number() }), //(lat/lng)
        photos: v.array(v.string()), // array of photo URLs
        features: v.array(v.string()), // (pool, garden, garage, etc.)
        status: v.string(), //(available/sold/rented)
        agentId: v.id("agents"),  //references Agent
        updatedAt: v.number(),
    })
        .index("by_status", ["status"]) // Fast queries by status
        .index("by_agent", ["agentId"]), // Fast queries by agent

    agents: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        whatsapp: v.string(),
        photo: v.optional(v.string()),
    })
        .index("by_email", ["email"]), // Find agent by email

});