'use client';
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

function Agents() {
    const agents = useQuery(api.agents.getAgents);
    if (agents === undefined) {
        return <div>Loading...</div>;
    }

    if (agents.length === 0) {
        return <div>No agents found</div>;
    }

    return (
        <div>{agents.map(a => a.name)}</div>
    )
}

export default Agents