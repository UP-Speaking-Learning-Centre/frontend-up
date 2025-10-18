'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import MarkingProgress from '@/features/placement-test-admin/component/progress';
import QuestionDisplay from '@/features/placement-test-admin/component/question-display';
import QuestionNavigation from '@/features/placement-test-admin/component/question-navigation';
import StatusManagement from '@/features/placement-test-admin/component/status-management';
import useFetchDetailPlacementTestQuery from '@/features/placement-test-admin/queries/use-fetch-detail-placement-test';
import { useDisplayedPlacementTestStore } from '@/features/placement-test-admin/stores/displayed-placement-test-stores';
import { renderDateToIndonesian } from '@/lib/moment';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PlacementTestDetailPage() {
    const { id } = useParams();
    const { isLoading } = useFetchDetailPlacementTestQuery({ id: id as string });

    const student = useDisplayedPlacementTestStore(s => s.student);
    const test = useDisplayedPlacementTestStore(s => s.test);
    const testDate = useDisplayedPlacementTestStore(s => s.testDate);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-2xl font-bold">Loading...</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DashboardContentLayout pageTitle={`Placement Test Detail - ${student?.name}`}>
            <Link
                href={ROUTES.adminPlacementTests}
                className="flex items-center w-fit gap-3 hover:underline"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <span className="text-[#020817]">Kembali</span>
            </Link>
            <div className="flex items-center max-md:flex-col gap-6 justify-end mb-6 border-b-4 border-secondary py-6">
                <div className="flex gap-6 md:gap-12 max-md:flex-col  max-md:w-full justify-end">
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Nama</p>
                        <p className="font-semibold text-neutral-900">{student?.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">No. HP</p>
                        <p className="font-semibold text-neutral-900">
                            {student?.parentPhoneNumber}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Program</p>
                        <p className="font-semibold text-neutral-900">{test?.program}</p>
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Tanggal Placement</p>
                        <p className="font-semibold text-neutral-900">
                            {renderDateToIndonesian(testDate)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <MarkingProgress />
                    <QuestionDisplay />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Question Navigator */}
                    <QuestionNavigation />

                    {/* Status Management */}
                    <StatusManagement />
                </div>
            </div>
        </DashboardContentLayout>
    );
}
