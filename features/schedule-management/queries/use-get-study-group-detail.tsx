'use client';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherScheduleResponse } from '@/types/schedule';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import studyGroup from '@/data/study-group-detail.json';
import { useEffect } from 'react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudyGroup } from '@/types/study-group';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchStudyGroupDetail = async (studyGroupId: number): Promise<StudyGroup> => {
    // const response = await api.get<TeacherScheduleResponse>(ENDPOINTS.fetchTeacherSchedule);
    // return response.data;
    await sleep(4000);
    return studyGroup;
};

export const useGetStudyGroupDetailQuery = (): UseQueryResult<StudyGroup> => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const query = useQuery({
        queryKey: ['study-group-detail', studyGroupId],
        queryFn: () => fetchStudyGroupDetail(studyGroupId as number),
        enabled: !!studyGroupId && studyGroupId > 0,
    });

    return query;
};
