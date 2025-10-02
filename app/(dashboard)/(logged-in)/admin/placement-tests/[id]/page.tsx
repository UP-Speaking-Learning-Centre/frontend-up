'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import MarkingProgress from '@/features/placement-test-admin/component/progress';
import QuestionDisplay from '@/features/placement-test-admin/component/question-display';
import QuestionNavigation from '@/features/placement-test-admin/component/question-navigation';
import StatusManagement from '@/features/placement-test-admin/component/status-management';
import useFetchDetailPlacementTestQuery from '@/features/placement-test-admin/queries/use-fetch-detail-placement-test';
import { useDisplayedPlacementTestStore } from '@/features/placement-test-admin/stores/displayed-placement-test-stores';
import { User } from 'lucide-react';
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <MarkingProgress />
                    <QuestionDisplay />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Question Navigator */}
                    <QuestionNavigation />

                    {/* Student Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Student Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label>Name</Label>
                                    <p className="font-medium">{student?.name}</p>
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <p className="font-medium">{student?.parentPhoneNumber}</p>
                                </div>
                                <div>
                                    <Label>Program</Label>
                                    <p className="font-medium">{test?.program}</p>
                                </div>
                                <div>
                                    <Label>Test Date</Label>
                                    <p className="font-medium">
                                        {new Date(testDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Management */}
                    <StatusManagement />
                </div>
            </div>
        </DashboardContentLayout>
    );
}
