'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import students from '@/data/students.json';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudendOfStudyGrouResponse } from '@/types/students';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchStudentOfStudyGroup = async (
    studyGroupId: number
): Promise<StudendOfStudyGrouResponse> => {
    const response = await api.get<StudendOfStudyGrouResponse>(
        ENDPOINTS.fetchStudentOfStudyGroup.expand({ studyGroupId })
    );
    return response.data;
};

export const useGetStudentOfStudyGroupQuery = (): UseQueryResult<StudendOfStudyGrouResponse> => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const query = useQuery({
        queryKey: ['student-of-study-group', studyGroupId],
        queryFn: () => fetchStudentOfStudyGroup(studyGroupId as number),
        enabled: !!studyGroupId,
    });

    return query;
};
