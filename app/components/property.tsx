import Image from 'next/image'


interface PropertyProps {
    property: any;
}

function Property({ property }: PropertyProps) {
    return (
        <div>
            <div>{property.address}</div>
            <div>
                <Image src="/img/whats-app-icon.svg" alt="WhatsApp"
                    width={24}
                    height={24} />
            </div>
        </div>

    )
}

export default Property