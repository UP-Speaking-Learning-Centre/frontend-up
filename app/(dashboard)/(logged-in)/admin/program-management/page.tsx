'use client';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const Programs = Array(2).fill({
        name: 'School Program',
        imageUrl: '/placeholder.svg',
        description: 'Program',
        price: 'Rp 10.000.000',
        months: 6,
    });

    return (
        <DashboardContentLayout pageTitle="Location Management">
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Program Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Programs.map((program, index) => (
                            <Card
                                onClick={() =>
                                    router.replace(
                                        ROUTES.adminProgramManagementId.expand({ id: 1 })
                                    )
                                }
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:scale-105 cursor-pointer transition-all"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between p-4">
                                    <h3 className="font-semibold text-gray-900">{program.name}</h3>
                                </div>

                                {/* Profile Image */}
                                <div className="px-4 pb-3">
                                    <div className="relative w-full aspect-[19/10] rounded-lg overflow-hidden">
                                        <Image
                                            src={program.image || '/placeholder.svg'}
                                            alt={program.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="px-4 pb-4">
                                    {/* Available Locations */}
                                    <div className="mb-3">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            Description:
                                        </p>
                                        <p className="text-gray-700 text-sm">{program.address}</p>
                                    </div>
                                    <p className="text-sm">{program.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
