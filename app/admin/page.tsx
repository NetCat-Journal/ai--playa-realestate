import Link from "next/link"

function AdminPage() {
    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl">Admin Dashboard</h1>
            <div className="flex flex-col gap-4">
                <Link href={'admin/properties'} className="text-blue-600 hover:underline">View Properties</Link>
                <Link href={'admin/properties/add'} className="text-blue-600 hover:underline">Add Properties</Link>
                <Link href={'admin/agents'} className="text-blue-600 hover:underline">View Agents</Link>
                <Link href={'admin/agents/add'} className="text-blue-600 hover:underline">Add Agent</Link>
            </div>
        </div>
    )
}

export default AdminPage