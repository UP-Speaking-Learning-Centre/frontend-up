'use client';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherScheduleResponse } from '@/types/schedule';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import scheduleData from '@/data/schedule.json';
import { useEffect } from 'react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';

const fetchTeacherSchedule = async (locationId: number): Promise<TeacherScheduleResponse> => {
    const response = await api.get<TeacherScheduleResponse>(
        ENDPOINTS.fetchTeacherSchedule.expand({ locationId })
    );
    return response.data;
};

export const useGetTeacherScheduleQuery = (): UseQueryResult<TeacherScheduleResponse> => {
    const locationId = useScheduleManagementStore(s => s.locationId);
    const query = useQuery({
        queryKey: ['teacher-schedule', locationId],
        queryFn: () => fetchTeacherSchedule(locationId as number),
        enabled: !!locationId,
    });

    return query;
};
