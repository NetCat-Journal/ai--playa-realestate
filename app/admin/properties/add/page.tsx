'use client';
import { useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

function AddProperty() {
    const addProperty = useMutation(api.properties.addProperty);
    const agents = useQuery(api.agents.getAgents) || [];
    const formRef = useRef<HTMLFormElement>(null);

    const addPropertyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await addProperty({
                title_en: formData.get("title_en") as string,
                title_es: formData.get("title_es") as string,
                description_en: formData.get("description_en") as string,
                description_es: formData.get("description_es") as string,
                price: Number(formData.get("price")),
                bedrooms: Number(formData.get("bedrooms")),
                bathrooms: Number(formData.get("bathrooms")),
                size: Number(formData.get("size")),
                type: formData.get("type") as string,
                address: formData.get("address") as string,
                neighborhood: formData.get("neighborhood") as string || undefined,
                distanceToBeach: Number(formData.get("distanceToBeach")) || undefined,
                coordinates: {
                    lat: Number(formData.get("lat")) || 0,
                    lng: Number(formData.get("lng")) || 0
                },
                photos: [],
                features: [],
                status: formData.get("status") as string,
                agentId: formData.get("agentId") as Id<"agents">,
            });

            console.log("Property added successfully!");
            e.currentTarget?.reset();
            alert("Property added!");
            if (formRef.current) {
                const inputs = formRef.current.querySelectorAll('input, textarea, select');
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
        }
        catch (err) {
            console.error("Failed to add property:", err);
        }

    }

    return (
        <div>
            <div>
                Add Property
            </div>
            <form ref={formRef} onSubmit={addPropertyHandler}>
                <div>
                    <input type="text" name="title_en" placeholder="Title in english" />
                </div>
                <div>
                    <input type="text" name="title_es" placeholder="Title in spanish" />
                </div>
                <div>
                    <input type="text" name="description_en" placeholder="Description in english" />
                </div>
                <div>
                    <input type="text" name="description_es" placeholder="Descriptio in spanish" />
                </div>
                <div>
                    <input type="number" name="price" placeholder="Price" />
                </div>
                <div>
                    <input type="number" name="bedrooms" placeholder="Bedrooms" />
                </div>
                <div>
                    <input type="number" name="bathrooms" placeholder="Bathrooms" />
                </div>
                <div>
                    <input type="number" name="size" placeholder="Size" />
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
                    <input type="text" name="address" placeholder="Address" />
                </div>
                <div>
                    <input type="text" name="neighborhood" placeholder="Neighborhood" />
                </div>
                <div>
                    <input type="number" name="lat" placeholder="Latitude" />
                </div>
                <div>
                    <input type="number" name="lng" placeholder="Longitude" />
                </div>
                <div>
                    <input type="number" name="distanceToBeach" placeholder="Distance to Beach" />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status" required>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                    </select>
                </div>
                <div>
                    <label>Agent</label>
                    <select name="agentId" required >
                        <option value="">Select agent...</option>
                        {agents.map(agent => (
                            <option key={agent._id} value={agent._id}>
                                {agent.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Property</button>
            </form>
        </div>
    )
}

export default AddProperty;