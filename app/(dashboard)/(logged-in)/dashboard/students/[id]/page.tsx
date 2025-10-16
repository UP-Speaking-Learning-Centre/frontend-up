'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import SelectStudent from '@/features/dashboard/components/select-student';
import PlacementTestPending from '@/features/home/components/placement-test-pending';
import PlacementTestSuccess from '@/features/home/components/placement-test-success';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { BookOpen, Calendar, Home, User } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function DashboardPage() {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetProfileById(Number(id));

    return (
        <DashboardContentLayout pageTitle="Detail Student" extras={<SelectStudent />}>
            <div className="space-y-6">
                {/* Student Overview */}
                <div className="mb-8">
                    <h1 className="text-lg text-gray-600 font-normal">
                        Detail student dari{' '}
                        <span className="text-gray-800 font-semibold">{data?.name}</span>
                    </h1>
                </div>
                {data?.latestResult?.status !== 'success' ? (
                    <PlacementTestPending />
                ) : (
                    <>
                        {data.latestResult.status === 'success' && <PlacementTestSuccess />}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="col-span-2">
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <BookOpen className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">
                                                Current Program
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {data?.preferredProgramName}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Calendar className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">
                                                Current Level
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {data?.level}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">
                                                Package
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">-</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Student Details */}
                        <div className="">
                            {/* Schedule Information */}
                            <Card>
                                <CardHeader className="border-b">
                                    <CardTitle className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                                        Class Schedule
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 p-4 gap-6">
                                    {(data?.schedules.length ?? 0) > 0 &&
                                        data?.schedules.map(schedule => (
                                            <div className="grid grid-cols-1 gap-4 p-4 border border-green-200 rounded-lg">
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-600">
                                                            Days
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {schedule.dayOfWeek}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-600">
                                                            Time
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {schedule.startTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <Home className="w-4 h-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-600">
                                                            Location
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {schedule.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center">
                                                        <User className="w-4 h-4 text-gray-500 mr-2" />
                                                        <span className="text-sm text-gray-600">
                                                            Mentor
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {schedule.teacherMemberName}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Progress Section */}
                        {/* <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Learning Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">
                                                Attendance Rate
                                            </span>
                                            <span className="text-sm text-gray-600">85%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{ width: '85%' }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">
                                                Average Score
                                            </span>
                                            <span className="text-sm text-gray-600">8.5/10</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: '85%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}
                    </>
                )}
            </div>
        </DashboardContentLayout>
    );
}
