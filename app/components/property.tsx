import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
interface PropertyProps {
    property: any;
}

function Property({ property }: PropertyProps) {
    const agent = useQuery(api.agents.getAgentById, { agentId: property.agentId });
    const msg = `Hello, I am interested in the property located at ${property.address}. Could you please provide me with more details? Thank you!`;
    return (
        <div>
            <div>{property.address}</div>
            <div>
                {agent ? (
                    <a
                        aria-label={`Chat with ${agent.name} on WhatsApp`}
                        href={`https://wa.me/${agent.whatsapp}?text=${msg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <img
                            alt="WhatsApp"
                            src="/img/whats-app-icon.svg"
                            width={24}
                            height={24}
                        />
                        <span>Message {agent.name}</span>
                    </a>
                ) : (
                    <div className="text-gray-500">
                        No WhatsApp available
                    </div>
                )}

            </div>
        </div>

    )
}

export default Property