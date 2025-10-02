import Image from 'next/image';
import { MapPin } from 'lucide-react';
import SectionTitle from '@/components/section-title';
import Link from 'next/link';

const locations = [
    {
        city: 'Kuningan 1',
        address:
            'Jl. Aruji Kartawinata Dalam No.19 , Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat',
        image: '/placeholder.svg?height=300&width=400',
        mapUrl: 'https://maps.app.goo.gl/X1T1FTcSiazf5f1U9',
    },
    {
        city: 'Kuningan 2 (Soon)',
        address:
            'Jl. Aruji Kartawinata No.X, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511',
        image: '/placeholder.svg?height=300&width=400',
        mapUrl: 'https://maps.app.goo.gl/fWfGkcu7tPYM4vLj6',
    },
    {
        city: 'Luragung',
        address:
            'Jl. Raya Luragung - Kuningan, Sindangsuka, Kec. Luragung, Kabupaten Kuningan, Jawa Barat 45581 (sebrang Kolam Renang Tirta Agung Mas)',
        image: '/placeholder.svg?height=300&width=400',
        mapUrl: 'https://maps.app.goo.gl/c9Av9zLYduEzu3P6A',
    },
];

export default function LocationsSection() {
    return (
        <div className="bg-secondary py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <SectionTitle
                        variant="white"
                        title="Our Locations"
                        subtitle="Find Us Everywhere"
                        description="Gak perlu jauh-jauh! UP! sudah hadir di beberapa titik strategis biar lebih dekat sama Moms Dad & anak. Tinggal pilih lokasi terdekat dan mulai perjalanan upgrade bahasa Inggrissekarang."
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
                                </div>
                                <Link
                                    className="mt-4 text-sm underline text-primary"
                                    href={location.mapUrl}
                                    target="_blank"
                                >
                                    Open in google map
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
