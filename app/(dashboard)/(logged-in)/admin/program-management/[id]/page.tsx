'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import ProgramDetailControl from '@/features/admin/components/program-detail-control';
import ProgramDetailDrawer from '@/features/admin/components/program-detail-drawer';
import ProgramDetailInformasiHarga from '@/features/admin/components/program-detail-informasi-harga';
import useGetProgramById from '@/features/admin/queries/useGetProgramById';
import { useProgramDetailStore } from '@/features/admin/stores/program-detail';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    const { data, isLoading } = useGetProgramById();
    const isDrawerOpen = useProgramDetailStore(s => s.isDrawerOpen);

    const handleOpenInformasiHarga = () => {
        const el = document.getElementById('harga');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <DashboardContentLayout pageTitle="Program Detail">
            <div className="min-h-screen grid grid-cols-12 gap-4 bg-gray-50">
                <div className="col-span-12">
                    {/* Header */}
                    <Link
                        href={ROUTES.adminProgramManagement}
                        className="flex items-center w-fit gap-3 mb-6 hover:underline"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="text-[#020817]">Kembali</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-3 justify-between">
                        <Skeleton loading={isLoading} className="h-8 w-64 mb-2">
                            <h1 className="text-lg font-semibold text-[#020817]">
                                Program Detail - {data?.items[0].title}
                            </h1>
                        </Skeleton>
                        <Button
                            onClick={handleOpenInformasiHarga}
                            variant={'ghost'}
                            className="flex items-center gap-2 text-primary group hover:bg-transparent"
                        >
                            <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                                <span className="text-xs">i</span>
                            </div>
                            <span className="text-sm group-hover:underline">Informasi Harga</span>
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {/* School Program Section */}
                        <Skeleton loading={isLoading} className="h-28">
                            {data?.items.map((item, idx) => (
                                <ProgramDetailControl
                                    id={idx.toString()}
                                    key={idx.toString()}
                                    item={item}
                                    isChild={false}
                                    section="Program"
                                />
                            ))}
                        </Skeleton>
                    </div>

                    <ProgramDetailInformasiHarga />
                </div>
                <ProgramDetailDrawer />
            </div>
        </DashboardContentLayout>
    );
};

export default page;
