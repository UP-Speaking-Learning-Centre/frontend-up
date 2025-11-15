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
import TeacherScheduleGrid from '@/features/schedule-management/components/schedule-table';

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
                                <SelectTrigger className="w-64">
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

                {data && <TeacherScheduleGrid />}
            </div>
        </DashboardContentLayout>
    );
};

export default Page;
