import { mutation } from "./_generated/server";
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