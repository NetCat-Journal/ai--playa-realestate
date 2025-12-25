
interface PropertyProps {
    property: any;
}

function Property({ property }: PropertyProps) {
    return (
        <div>{property.address}</div>
    )
}

export default Property