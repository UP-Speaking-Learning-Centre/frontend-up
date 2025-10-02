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
            <div className="min-h-screen bg-gray-50 flex">
                <div className={clsx(isDrawerOpen ? 'w-2/3' : 'w-full', 'transition-all')}>
                    {/* Header */}
                    <Link
                        href={ROUTES.adminProgramManagement}
                        className="flex items-center gap-3 mb-6 hover:underline"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="text-[#020817]">Kembali</span>
                    </Link>
                    <div className="flex items-center gap-4 justify-between">
                        <h1 className="text-md font-semibold text-[#020817]">
                            Program Detail - School Program
                        </h1>
                        <Button
                            onClick={handleOpenInformasiHarga}
                            variant={'ghost'}
                            className="flex items-center gap-2 text-primary group mb-5 hover:bg-transparent"
                        >
                            <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                                <span className="text-xs">i</span>
                            </div>
                            <span className="text-sm group-hover:underline">Informasi Harga</span>
                        </Button>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* School Program Section */}
                        <Skeleton loading={isLoading} className="h-28">
                            {data?.items.map((item, idx) => (
                                <ProgramDetailControl
                                    id={idx.toString()}
                                    title={item.title}
                                    description={item.description}
                                    children={item.children}
                                    isChild={false}
                                />
                            ))}
                        </Skeleton>
                    </div>
                    <h2 className="text-md font-medium text-[#020817] my-4">
                        Program Detail - Harga
                    </h2>
                    <ProgramDetailInformasiHarga />
                </div>
                <ProgramDetailDrawer />
            </div>
        </DashboardContentLayout>
    );
};

export default page;
