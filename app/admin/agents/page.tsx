'use client';
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";

function Agents() {
    const agents = useQuery(api.agents.getAgents);
    const deleteAgent = useMutation(api.agents.deleteAgent);
    if (agents === undefined) {
        return <div>Loading...</div>;
    }

    if (agents.length === 0) {
        return <div>No agents found</div>;
    }

    const deleteAgentHandler = async (id: Id<"agents">) => {
        if (!confirm("Are you sure you want to delete this agent?")) {
            return;
        }
        try {
            await deleteAgent({ id });
        }
        catch (err) {
            console.error("Failed to delete agent:", err);
        }
    }

    return (
        <div>
            {agents.map(a => {
                return (
                    <div>
                        <div key={a._id}>{a.name} - {a.email}</div>
                        <button onClick={(e) => deleteAgentHandler(a._id)}>Delete agent</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Agents