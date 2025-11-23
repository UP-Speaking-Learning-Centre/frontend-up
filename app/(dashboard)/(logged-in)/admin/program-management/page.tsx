'use client';
import Overlay from '@/components/layout/overlay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import useGetProgram from '@/features/placement-test-admin/queries/use-get-program';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const { data, isLoading } = useGetProgram();

    if (isLoading) return <Overlay />;

    return (
        <DashboardContentLayout pageTitle="Program Management">
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Program Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data?.map((program, index) => (
                            <Card
                                key={index}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 overflow-hidden"
                            >
                                <div className="relative w-full aspect-[19/10] rounded-lg overflow-hidden">
                                    <Image
                                        src={
                                            program.name === 'School Program'
                                                ? '/school.jpg'
                                                : '/regluar.jpeg'
                                        }
                                        alt={program.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-900">{program.name}</h3>

                                    <Button
                                        className="w-full mt-6"
                                        onClick={() =>
                                            router.replace(
                                                ROUTES.adminProgramManagementId.expand({
                                                    id: program.id,
                                                })
                                            )
                                        }
                                    >
                                        Lihat Detail
                                    </Button>
                                </div>

                                {/* Description */}
                                {/* <div className="px-4 pb-4">
                                    <p className="text-sm leading-relaxed">{program.description}</p>
                                </div> */}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
