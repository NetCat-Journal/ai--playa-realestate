'use client';
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

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
                        <div key={a._id}>
                            <h1>{a.name}</h1>
                            <p>{a.phone}</p>
                            <p>{a.email}</p>
                            <p>{a.photo}</p>
                            <p>{a.whatsapp}</p>
                        </div>
                        <button onClick={(e) => deleteAgentHandler(a._id)}>Delete agent</button>
                        <Link href={`/admin/agents/${a._id}/edit}`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Agents