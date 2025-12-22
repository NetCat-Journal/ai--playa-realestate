'use client';
import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function AddAgent() {
    const addAgent = useMutation(api.agents.addAgent);
    const ref = useRef<HTMLFormElement>(null);
    const params = useParams();
    const router = useRouter();

    const addAgentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addAgent({
                name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
                phone: (e.currentTarget.elements.namedItem("phone") as HTMLInputElement).value,
                email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
                whatsapp: (e.currentTarget.elements.namedItem("whatsapp") as HTMLInputElement).value,
                photo: (e.currentTarget.elements.namedItem("photo") as HTMLInputElement).value,
            });
            console.log("Agent added successfully!");
            e.currentTarget?.reset();
            alert("Agent added!");
            if (ref.current) {
                const inputs = ref.current.querySelectorAll('input, textarea, select');
                inputs.forEach((input: any) => {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    } else if (input.tagName === 'SELECT') {
                        input.selectedIndex = 0;
                    } else {
                        input.value = '';
                    }
                });
            }
            router.push('/admin/agents');
        }
        catch (err) {
            console.error("Failed to add agent:", err);
        }
    }

    return (
        <div>
            <div> AddAgent</div>
            <form ref={ref} onSubmit={addAgentHandler}>
                <div>
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    <input type="text" name="phone" placeholder="Phone" />
                </div>
                <div>
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div>
                    <input type="text" name="whatsapp" placeholder="WhatsApp" />
                </div>
                <div>
                    <input type="text" name="photo" placeholder="Photo" />
                </div>
                <button type='submit'>Add Agent</button>
            </form>
        </div>

    )
}

export default AddAgent;