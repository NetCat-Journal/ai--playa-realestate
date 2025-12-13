'use client';
import { useQuery, useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

function Properties() {
    const properties = useQuery(api.properties.getProperties);
    const deleteProperty = useMutation(api.properties.deleteProperty);

    if (properties === undefined) {
        return <div>Loading...</div>;
    }

    if (properties.length === 0) {
        return <div>No properties yet</div>;
    }

    const deletePropertyHandler = async (id: Id<"properties">) => {
        if (!confirm("Are you sure you want to delete this property?")) {
            return;
        }
        try {
            await deleteProperty({ id });
        }
        catch (err) {
            console.error("Failed to delete property:", err);
        }
        alert("Delete property functionality to be implemented");
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
                            <div>
                                <button onClick={(e) => deletePropertyHandler(p._id)}>Delete Property</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Properties;