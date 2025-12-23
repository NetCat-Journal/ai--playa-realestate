import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addAgent = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        whatsapp: v.string(),
        photo: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to add agents");
        }
        const agentId = await ctx.db.insert("agents", {
            name: args.name,
            email: args.email,
            phone: args.phone,
            whatsapp: args.whatsapp,
            photo: args.photo,
        });
        return agentId;
    }
})

export const editAgent = mutation({
    args: {
        agentId: v.id("agents"),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        whatsapp: v.optional(v.string()),
        photo: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Must be signed in to edit agents");
        }
        const updates: any = {};

        if (args.name !== undefined) updates.name = args.name;
        if (args.email !== undefined) updates.email = args.email;
        if (args.phone !== undefined) updates.phone = args.phone;
        if (args.whatsapp !== undefined) updates.whatsapp = args.whatsapp;
        if (args.photo !== undefined) updates.photo = args.photo;

        await ctx.db.patch(args.agentId, updates);
        return args.agentId;
    }
})

export const getAgents = query({
    handler: async (ctx) => {
        const agents = await ctx.db.query("agents").collect();
        return agents;
    }
})

export const getAgentById = query({
    args: {
        agentId: v.id("agents"),
    },
    handler: async (ctx, args) => {
        const agent = await ctx.db.get(args.agentId);
        return agent;
    }
})

export const deleteAgent = mutation({
    args: {
        id: v.id("agents"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})  