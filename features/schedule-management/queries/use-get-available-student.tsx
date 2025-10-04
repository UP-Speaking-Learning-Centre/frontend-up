'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import students from '@/data/students.json';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { AvailableStudentForStudyGroup, StudendOfStudyGrouResponse } from '@/types/students';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';

const fetchAvailableStudent = async (
    studyGroupId: number
): Promise<AvailableStudentForStudyGroup[]> => {
    const response = await api.get<AvailableStudentForStudyGroup[]>(
        ENDPOINTS.fetchAvailableStudent.expand({ studyGroupId })
    );
    return response.data;
};

export const useGetAvailableStudentQuery = (): UseQueryResult<AvailableStudentForStudyGroup[]> => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);

    const query = useQuery({
        queryKey: ['available-student', studyGroupId],
        queryFn: () => fetchAvailableStudent(studyGroupId as number),
        enabled: !!studyGroupId,
    });
    return query;
};
