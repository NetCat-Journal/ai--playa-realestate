'use client';
import { useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Id } from '@/convex/_generated/dataModel';
import { api } from "@/convex/_generated/api";

function EditProperty() {
    const params = useParams();
    const router = useRouter();
    const propertyId = params.id as Id<"properties">;
    const property = useQuery(api.properties.getPropertiesById, { propertyId });
    const updateProperty = useMutation(api.properties.updateProperty);
    const agents = useQuery(api.agents.getAgents) || [];
    const formRef = useRef<HTMLFormElement>(null);

    const updatePropertyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateProperty({
                propertyId,
                title_en: (e.currentTarget.elements.namedItem("title_en") as HTMLInputElement).value,
                title_es: (e.currentTarget.elements.namedItem("title_es") as HTMLInputElement).value,
                description_en: (e.currentTarget.elements.namedItem("description_en") as HTMLInputElement).value,
                description_es: (e.currentTarget.elements.namedItem("description_es") as HTMLInputElement).value,
                price: Number((e.currentTarget.elements.namedItem("price") as HTMLInputElement).value),
                bedrooms: Number((e.currentTarget.elements.namedItem("bedrooms") as HTMLInputElement).value),
                bathrooms: Number((e.currentTarget.elements.namedItem("bathrooms") as HTMLInputElement).value),
                size: Number((e.currentTarget.elements.namedItem("size") as HTMLInputElement).value),
                type: (e.currentTarget.elements.namedItem("type") as HTMLSelectElement).value,
                address: (e.currentTarget.elements.namedItem("address") as HTMLInputElement).value,
                neighborhood: (e.currentTarget.elements.namedItem("neighborhood") as HTMLInputElement).value,
                distanceToBeach: Number((e.currentTarget.elements.namedItem("distanceToBeach") as HTMLInputElement).value),
                coordinates: {
                    lat: Number((e.currentTarget.elements.namedItem("lat") as HTMLInputElement).value),
                    lng: Number((e.currentTarget.elements.namedItem("lng") as HTMLInputElement).value)
                },
                status: (e.currentTarget.elements.namedItem("status") as HTMLSelectElement).value,
                agentId: (e.currentTarget.elements.namedItem("agentId") as HTMLSelectElement).value as Id<"agents">,
            })
            alert("Property updated successfully!");
            router.push('/admin/properties');
        }
        catch (err) {
            console.error("Failed to update property:", err);

        }
    }

    return (
        <div>
            <h1>Edit Property</h1>
            <form ref={formRef} onSubmit={updatePropertyHandler}>
                <div>
                    <input type="text" name="title_en" defaultValue={property?.title_en} />
                </div>
                <div>
                    <input type="text" name="title_es" defaultValue={property?.title_es} />
                </div>
                <div>
                    <input type="text" name="description_en" defaultValue={property?.description_en} />
                </div>
                <div>
                    <input type="text" name="description_es" defaultValue={property?.description_es} />
                </div>
                <div>
                    <input type="number" name="price" defaultValue={property?.price} />
                </div>
                <div>
                    <input type="number" name="bedrooms" defaultValue={property?.bedrooms} />
                </div>
                <div>
                    <input type="number" name="bathrooms" defaultValue={property?.bathrooms} />
                </div>
                <div>
                    <input type="number" name="size" defaultValue={property?.size} />
                </div>
                <div><label>Type</label>
                    <select name="type" required>
                        <option value="">Select type...</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="villa">Villa</option>
                    </select>
                </div>
                <div>
                    <input type="text" name="address" defaultValue={property?.address} />
                </div>
                <div>
                    <input type="text" name="neighborhood" defaultValue={property?.neighborhood} />
                </div>
                <div>
                    <input type="number" name="lat" defaultValue={property?.coordinates.lat} />
                </div>
                <div>
                    <input type="number" name="lng" defaultValue={property?.coordinates.lng} />
                </div>
                <div>
                    <input type="number" name="distanceToBeach" defaultValue={property?.distanceToBeach} />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" required defaultValue={property?.status}>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                    </select>
                </div>
                <div>
                    <label>Agent</label>
                    <select name="agentId" required defaultValue={property?.agentId}>
                        <option value="">Select agent...</option>
                        {agents.map(agent => (
                            <option key={agent._id} value={agent._id}>
                                {agent.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Edit property</button>
            </form>
        </div>
    )
}


export default EditProperty;