'use client';

import { ROUTES } from '@/constants/routes';
import ProgramDetailControl from '@/features/admin/components/program-detail-control';
import ProgramDetailDrawer from '@/features/admin/components/program-detail-drawer';
import { useProgramDetailStore } from '@/features/admin/stores/program-detail';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { ProgramDetailTreeInterface } from '@/types/program-detail';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    const programTree: ProgramDetailTreeInterface = {
        title: 'Groups',
        items: [
            {
                title: 'School Program',
                description:
                    'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',

                children: {
                    title: 'Levels',
                    items: [
                        {
                            title: 'School Program',
                            description:
                                'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',
                            children: {
                                title: 'Grade',
                                items: [
                                    {
                                        title: 'School Program',
                                        description:
                                            'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',
                                    },
                                    {
                                        title: 'School Program',
                                        description:
                                            'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                title: 'School Program',
                description:
                    'Dirancang khusus buat pelajar sekolah yang mau naik level English sekaligus lebih pede tampil di kelas maupun lomba.',
            },
        ],
    };
    const { isDrawerOpen } = useProgramDetailStore();

    return (
        <DashboardContentLayout pageTitle="Program Detail">
            <div className="min-h-screen bg-gray-50 flex relative">
                <div className={clsx(isDrawerOpen ? 'w-2/3' : 'w-full','transition-all')}>
                    {/* Header */}
                    <Link href={ROUTES.adminProgramManagement} className="flex items-center gap-3 mb-6 hover:underline">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="text-[#020817]">Kembali</span>
                    </Link>
                    <div className="flex items-center gap-4 justify-between">
                        <h1 className="text-md font-semibold text-[#020817]">
                            Program Detail - School Program
                        </h1>
                        <Link
                            href={'#'}
                            className="flex items-center gap-2 text-primary group mb-5"
                        >
                            <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                                <span className="text-xs">i</span>
                            </div>
                            <span className="text-sm group-hover:underline">Informasi Harga</span>
                        </Link>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* School Program Section */}
                        <ProgramDetailControl children={programTree} isChild={false} />
                    </div>
                </div>
                <ProgramDetailDrawer />
            </div>
        </DashboardContentLayout>
    );
};

export default page;
