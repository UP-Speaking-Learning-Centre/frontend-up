'use client';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { AllTeacherResponse } from '@/types/teacher';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchAllTeacher = async (): Promise<AllTeacherResponse> => {
    const response = await api.get<AllTeacherResponse>(ENDPOINTS.allTeacher);

    return response.data;
};

export const useGetAllTeacher = (): UseQueryResult<AllTeacherResponse> => {
    const query = useQuery({
        queryKey: ['teacher-schedule'],
        queryFn: () => fetchAllTeacher(),
    });

    return query;
};
