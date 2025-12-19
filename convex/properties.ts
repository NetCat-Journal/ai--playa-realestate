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
        createdBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to add properties");
        }
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
            createdBy: identity.subject,
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
        title_es: v.optional(v.string()),
        title_en: v.optional(v.string()),
        description_es: v.optional(v.string()),
        description_en: v.optional(v.string()),
        price: v.optional(v.number()),
        bedrooms: v.optional(v.number()),
        bathrooms: v.optional(v.number()),
        size: v.optional(v.number()),
        type: v.optional(v.string()),
        address: v.optional(v.string()),
        neighborhood: v.optional(v.string()),
        distanceToBeach: v.optional(v.number()),
        coordinates: v.optional(v.object({ lat: v.number(), lng: v.number() })),
        photos: v.optional(v.array(v.string())),
        features: v.optional(v.array(v.string())),
        status: v.optional(v.string()),
        agentId: v.optional(v.id("agents")),
        createdBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const updates: any = {
            updatedAt: Date.now(),
        };
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to update properties");
        }

        if (args.title_es !== undefined) updates.title_es = args.title_es;
        if (args.title_en !== undefined) updates.title_en = args.title_en;
        if (args.description_es !== undefined) updates.description_es = args.description_es;
        if (args.description_en !== undefined) updates.description_en = args.description_en;
        if (args.price !== undefined) updates.price = args.price;
        if (args.bedrooms !== undefined) updates.bedrooms = args.bedrooms;
        if (args.bathrooms !== undefined) updates.bathrooms = args.bathrooms;
        if (args.size !== undefined) updates.size = args.size;
        if (args.type !== undefined) updates.type = args.type;
        if (args.address !== undefined) updates.address = args.address;
        if (args.neighborhood !== undefined) updates.neighborhood = args.neighborhood;
        if (args.distanceToBeach !== undefined) updates.distanceToBeach = args.distanceToBeach;
        if (args.coordinates !== undefined) updates.coordinates = args.coordinates;
        if (args.photos !== undefined) updates.photos = args.photos;
        if (args.features !== undefined) updates.features = args.features;
        if (args.status !== undefined) updates.status = args.status;
        if (args.agentId !== undefined) updates.agentId = args.agentId;

        await ctx.db.patch(args.propertyId, updates);
        return args.propertyId;
    }
})

export const deleteProperty = mutation({
    args: {
        id: v.id("properties"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to delete properties");
        }
        await ctx.db.delete(args.id);
        return true;
    }
})