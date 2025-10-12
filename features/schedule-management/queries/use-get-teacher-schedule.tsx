'use client';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherScheduleResponse } from '@/types/schedule';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import scheduleData from '@/data/schedule.json';
import { useEffect } from 'react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { useNewStudyGroupStore } from '../stores/new-study-group-store';

const fetchTeacherSchedule = async (locationId: number): Promise<TeacherScheduleResponse> => {
    const response = await api.get<TeacherScheduleResponse>(
        ENDPOINTS.fetchTeacherSchedule.expand({ locationId })
    );

    return response.data;
};

export const useGetTeacherScheduleQuery = (
    fromStudyGroup = false
): UseQueryResult<TeacherScheduleResponse> => {
    const locationId = useScheduleManagementStore(s => s.locationId);
    const { locationId: locationIdFromStudyGroup } = useNewStudyGroupStore(s => s.formValue);

    const query = useQuery({
        queryKey: ['teacher-schedule', fromStudyGroup ? locationIdFromStudyGroup : locationId],
        queryFn: () =>
            fetchTeacherSchedule(
                fromStudyGroup ? (locationIdFromStudyGroup as number) : (locationId as number)
            ),
        enabled: fromStudyGroup ? !!locationIdFromStudyGroup : !!locationId,
    });

    return query;
};
