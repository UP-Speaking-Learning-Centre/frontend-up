'use client';

import React from 'react';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { Card } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { ScheduleItem, TeacherScheduleResponse } from '@/types/schedule';
import { days, dayNames, timeSlots } from '@/constants/schedule';
import ScheduleCell from '@/features/schedule-management/components/schedule-cell';
import Legend from '@/features/schedule-management/components/legend';

import useMapTeacherSchedule from '@/features/schedule-management/hooks/use-map-teacher-schedule';
import { useGetTeacherScheduleQuery } from '@/features/schedule-management/queries/use-get-teacher-schedule';
import { Skeleton } from '@/components/ui/skeleton';
import useGetLocation from '@/features/placement-test-admin/queries/use-get-location';
import { useScheduleManagementStore } from '@/features/schedule-management/stores/schedule-management-store';
import AddNewStudyGroup from '@/features/schedule-management/components/add-new-study-group/form';
import AddNewStudyGroupTrigger from '@/features/schedule-management/components/add-new-study-group/trigger';

const Page = () => {
    const { data, isLoading: isLoadingSchedule } = useGetTeacherScheduleQuery();
    const setLocationId = useScheduleManagementStore(s => s.setLocationId);
    const locationId = useScheduleManagementStore(s => s.locationId);
    const { isLoading: isLoadingLocation, data: locationData } = useGetLocation();

    const isLoading = isLoadingSchedule || isLoadingLocation;
    const { scheduleData, teachers, getBookingInfo } = useMapTeacherSchedule({
        data: data as TeacherScheduleResponse,
    });

    return (
        <DashboardContentLayout pageTitle="Schedule Management">
            <div className="space-y-8">
                <div className="flex max-md:items-start items-center max-md:flex-col-reverse gap-8 justify-between">
                    <Skeleton className="h-10 w-64 max-md:w-full" loading={isLoadingLocation}>
                        <div className="flex items-center gap-2">
                            Cabang:
                            <Select
                                onValueChange={val => setLocationId(Number(val))}
                                value={String(locationId)}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Pilih cabang" />
                                </SelectTrigger>
                                <SelectContent className="w-fit">
                                    {locationData?.map(location => (
                                        <SelectItem
                                            key={String(location.locationId)}
                                            value={String(location.locationId)}
                                        >
                                            {location.locationName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </Skeleton>
                    <Skeleton className="h-10 w-52 max-md:w-full" loading={isLoading}>
                        <AddNewStudyGroupTrigger />
                    </Skeleton>
                </div>

                <Skeleton loading={isLoading} className="h-14 w-96">
                    <Legend />
                </Skeleton>

                <div className="space-y-8">
                    {days.map((day, dayIndex) => (
                        <div key={day} className="space-y-4">
                            {/* Day Header */}
                            <div className="flex items-center gap-4">
                                <Skeleton loading={isLoading} className="h-8 w-32">
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {dayNames[dayIndex]}
                                    </h2>
                                </Skeleton>
                                <div className="flex-1 border-t border-2 border-border"></div>
                            </div>

                            {/* Schedule Table for Current Day */}
                            <Card className="overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="sr-only p-3 text-left font-medium text-muted-foreground"></th>
                                                {teachers.map(teacher => (
                                                    <th
                                                        key={teacher}
                                                        className="min-w-[140px] p-3 text-center font-medium text-muted-foreground"
                                                    >
                                                        <div className="space-y-1 flex items-center flex-col">
                                                            <Skeleton
                                                                loading={isLoading}
                                                                className="h-6 w-20"
                                                            >
                                                                <div className="font-semibold text-foreground">
                                                                    {teacher}
                                                                </div>
                                                            </Skeleton>
                                                            <Skeleton
                                                                loading={isLoading}
                                                                className="h-4 w-12"
                                                            >
                                                                <div className="text-xs">
                                                                    {scheduleData?.find(
                                                                        (item: ScheduleItem) =>
                                                                            item.teacherMemberName ===
                                                                            teacher
                                                                    )?.teacherAlias || ''}
                                                                </div>
                                                            </Skeleton>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {timeSlots.map(timeSlot => (
                                                <tr key={timeSlot.display} className="border-b">
                                                    <td className="p-3 font-medium text-sm text-muted-foreground whitespace-nowrap">
                                                        <Skeleton
                                                            loading={isLoading}
                                                            className="h-14 w-20"
                                                        >
                                                            {timeSlot.display}
                                                        </Skeleton>
                                                    </td>
                                                    {teachers.map((teacher, index) => {
                                                        return (
                                                            <ScheduleCell
                                                                loading={isLoading}
                                                                key={`${teacher}-${index}`}
                                                                bookingInfo={getBookingInfo(
                                                                    day,
                                                                    timeSlot,
                                                                    teacher
                                                                )}
                                                                teacher={teacher}
                                                            />
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default Page;
