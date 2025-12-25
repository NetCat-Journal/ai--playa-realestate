import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Property from "../components/property";

function PublicPage() {
    const results = useQuery(api.properties.getPropertiesByStatus, { status: "available" });

    if (results === undefined) {
        return <div>Loading...</div>;
    }

    if (results.length === 0) {
        return <div>No available properties</div>;
    }
    return (
        <div>{results.map(p => (<Property key={p._id} property={p} />))}</div>
    )
}

export default PublicPage;