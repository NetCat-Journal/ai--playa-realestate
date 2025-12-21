import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function PublicPage() {
    const results = useQuery(api.properties.getPropertiesByStatus, { status: "available" });

    if (results === undefined) {
        return <div>Loading...</div>;
    }

    if (results.length === 0) {
        return <div>No available properties</div>;
    }
    return (
        <div>{results.map(p => p.address)}</div>
    )
}

export default PublicPage;