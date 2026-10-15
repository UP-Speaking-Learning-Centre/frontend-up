'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import students from '@/data/students.json';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { AvailableStudentForStudyGroup, StudendOfStudyGrouResponse } from '@/types/students';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useEffect } from 'react';

const fetchAvailableStudent = async (
    studyGroupId: number
): Promise<AvailableStudentForStudyGroup[]> => {
    const response = await api.get<any>(
        ENDPOINTS.fetchAvailableStudent.expand({ studyGroupId })
    );
    return Array.isArray(response.data) ? response.data : response.data?.data || [];
};

export const useGetAvailableStudentQuery = (): UseQueryResult<AvailableStudentForStudyGroup[]> => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const setListAvailableStudent = useScheduleManagementStore(s => s.setListAvailableStudent);

    const query = useQuery({
        queryKey: ['available-student', studyGroupId],
        queryFn: () => fetchAvailableStudent(studyGroupId as number),
        enabled: !!studyGroupId,
    });

    useEffect(() => {
        if (query.isSuccess && query.isFetchedAfterMount) {
            setListAvailableStudent(query.data);
        }
    }, [query.data, query.isSuccess, query.isFetchedAfterMount]);

    return query;
};
