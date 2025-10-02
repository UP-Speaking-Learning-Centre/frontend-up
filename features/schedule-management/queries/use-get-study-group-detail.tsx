'use client';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherScheduleResponse } from '@/types/schedule';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import studyGroup from '@/data/study-group-detail.json';
import { useEffect } from 'react';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudyGroup } from '@/types/study-group';
import { sleep } from '@/lib/mock';

const fetchStudyGroupDetail = async (studyGroupId: number) => {
    // const response = await api.get<TeacherScheduleResponse>(ENDPOINTS.fetchTeacherSchedule);
    // return response.data;
    await sleep(4000);
    // return studyGroup;
};

export const useGetStudyGroupDetailQuery = (): UseQueryResult => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const setSelectedStudyGroup = useScheduleManagementStore(s => s.setSelectedStudyGroup);

    const query = useQuery({
        queryKey: ['study-group-detail', studyGroupId],
        queryFn: () => fetchStudyGroupDetail(studyGroupId as number),
        enabled: !!studyGroupId && studyGroupId > 0,
    });

    useEffect(() => {
        if (query.status === 'success') {
            // setSelectedStudyGroup(query.data as StudyGroup);
        }
    }, [query.status, query.data]);

    return query;
};
