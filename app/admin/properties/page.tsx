'use client';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function Properties() {
    const properties = useQuery(api.properties.getProperties);
    if (properties === undefined) {
        return <div>Loading...</div>;
    }

    if (properties.length === 0) {
        return <div>No properties yet</div>;
    }
    return (
        <div>
            <h1>All properties</h1>
            <div className="grid gap-4">
                {properties.map(p => {
                    return (
                        <div key={p._id}>
                            <h2 className="font-bold text-xl">{p.title_en}</h2>
                            <h2 className="font-bold text-xl">{p.title_es}</h2>
                            <p>Price: ${p.price.toLocaleString()}</p>
                            <p>Bedrooms: {p.bedrooms}</p>
                            <p>Bathrooms: {p.bathrooms}</p>
                            <p>Size: {p.size} sqft</p>
                            <p>Type: {p.type}</p>
                            <p>Address: {p.address}</p>
                            <p>Status: {p.status}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Properties;