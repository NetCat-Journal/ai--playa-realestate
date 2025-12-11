import { mutation, query } from "./_generated/server";
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

export const getProperties = query({
    handler: async (ctx) => {
        const properties = await ctx.db.query("properties").collect();
        return properties;
    }
})

export const getPropertiesById = query({
    args: {
        propertyId: v.id("properties"),
    },
    handler: async (ctx, args) => {
        const property = await ctx.db.get(args.propertyId);
        return property;
    }
})

export const getPropertiesByStatus = query({
    args: {
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const propertiesByStatus = await ctx.db.query("properties").filter((q) => q.eq(q.field("status"), args.status)).collect();
        return propertiesByStatus;
    }
})


export const updateProperty = mutation({
    args: {
        propertyId: v.id("properties"),
        price: v.optional(v.number()),
        title_es: v.optional(v.string()),
        title_en: v.optional(v.string()),
        description_es: v.optional(v.string()),
        description_en: v.optional(v.string()),
        photos: v.optional(v.array(v.string())),
        features: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const updatedProperty = await ctx.db.patch(args.propertyId, {
            price: args.price,
            title_es: args.title_es,
            title_en: args.title_en,
            description_es: args.description_es,
            description_en: args.description_en,
            photos: args.photos,
            features: args.features,
            updatedAt: Date.now(),
        });
        return updatedProperty;
    }
})

export const deleteProperty = mutation({
    args: {
        propertyId: v.id("properties"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.propertyId);
        return true;
    }
})