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