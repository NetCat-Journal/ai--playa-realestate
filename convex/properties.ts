import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addProperty = mutation({
    args: {
        title_es: v.string(),
        title_en: v.string(),
        price: v.number(),
        bedrooms: v.number(),
        description_es: v.string(),
        description_en: v.string(),
        bathrooms: v.number(),
        size: v.number(),
        type: v.string(),
        address: v.string(),
        neighborhood: v.optional(v.string()),
        distanceToBeach: v.optional(v.number()),
        coordinates: v.object({ lat: v.number(), lng: v.number() }),
        photos: v.array(v.string()),
        features: v.array(v.string()),
        status: v.string(),
        agentId: v.id("agents"),
    },
    handler: async (ctx, args) => {
        const propertyId = await ctx.db.insert("properties", {
            title_es: args.title_es,
            title_en: args.title_en,
            price: args.price,
            bedrooms: args.bedrooms,
            description_es: args.description_es,
            description_en: args.description_en,
            bathrooms: args.bathrooms,
            size: args.size,
            type: args.type,
            address: args.address,
            neighborhood: args.neighborhood,
            distanceToBeach: args.distanceToBeach,
            coordinates: args.coordinates,
            photos: args.photos,
            features: args.features,
            status: args.status,
            agentId: args.agentId,
            updatedAt: Date.now(),
        })
        return propertyId;
    }
})