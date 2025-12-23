'use client';
import { useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';

function EditAgent() {
    const editAgent = useMutation(api.agents.editAgent);
    const ref = useRef<HTMLFormElement>(null);
    const params = useParams();
    const router = useRouter();
    const agentId = params.id as Id<"agents">;
    const agent = useQuery(api.agents.getAgentById, { agentId });

    if (agent === undefined) {
        return <div>Loading...</div>;
    }

    const editAgentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editAgent({
                agentId,
                name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
                phone: (e.currentTarget.elements.namedItem("phone") as HTMLInputElement).value,
                email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
                whatsapp: (e.currentTarget.elements.namedItem("whatsapp") as HTMLInputElement).value,
                photo: (e.currentTarget.elements.namedItem("photo") as HTMLInputElement).value,
            })
            alert("Agent updated successfully!");
            router.push('/admin/agents');
        }
        catch (err) {
            console.error("Failed to edit agent:", err);
        }
    }
    return (
        <div>
            <div>Edit Agent</div>
            <form ref={ref} onSubmit={editAgentHandler}>
                <div>
                    <input type="text" name="name" placeholder="Name" defaultValue={agent?.name} />
                </div>
                <div>
                    <input type="text" name="phone" placeholder="Phone" defaultValue={agent?.phone} />
                </div>
                <div>
                    <input type="text" name="email" placeholder="Email" defaultValue={agent?.email} />
                </div>
                <div>
                    <input type="text" name="whatsapp" placeholder="WhatsApp" defaultValue={agent?.whatsapp} />
                </div>
                <div>
                    <input type="text" name="photo" placeholder="Photo" defaultValue={agent?.photo} />
                </div>
                <button type='submit'>Edit Agent</button>
            </form>
        </div>

    )
}

export default EditAgent;