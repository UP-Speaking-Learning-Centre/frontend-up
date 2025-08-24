import Image from 'next/image';
import { MapPin } from 'lucide-react';
import SectionTitle from '@/components/section-title';

const locations = [
    {
        city: 'Jakarta',
        address: 'Jl. Sudirman No. 123, Jakarta Selatan',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+62 21 1234 5678',
    },
    {
        city: 'Bandung',
        address: 'Jl. Asia Afrika No. 456, Bandung',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+62 22 9876 5432',
    },
    {
        city: 'Surabaya',
        address: 'Jl. Pemuda No. 789, Surabaya',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+62 31 8765 4321',
    },
];

export default function LocationsSection() {
    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        title="Our Locations"
                        subtitle="Find Us Everywhere"
                        description="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla."
                    />
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {locations.map(location => (
                        <div
                            key={location.city}
                            className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={location.image || '/placeholder.svg'}
                                    alt={`${location.city} campus`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-[#CE6439]" />
                                        <h3 className="ml-2 text-xl font-semibold text-gray-900">
                                            {location.city}
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-base text-gray-500">
                                        {location.address}
                                    </p>
                                    <div className="mt-4 space-y-1">
                                        <p className="text-sm text-gray-500">
                                            Phone: {location.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
