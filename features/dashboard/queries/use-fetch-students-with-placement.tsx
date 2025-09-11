'use client';

import api, { baseService } from '@/lib/api';
import { BaseResponse } from '@/types/general';
import { StudentPlacementTest } from '@/types/students';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_ADMIN_LIST_PLACEMENT_TEST } from '../constants/config';
import { useStudentsStore } from '../stores/students-store';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';

const fetchStudents = (params?: any) => {
    return baseService(async () => {
        const accessToken = await getCookiesToken();
        const res = await api.get<BaseResponse<StudentPlacementTest[]>>(
            API_ADMIN_LIST_PLACEMENT_TEST,
            {
                params,
                headers: {
                    Authorization: `Bearer ` + accessToken,
                },
            }
        );
        return res.data;
    });
};

const useFetchStudentsWithPlacementQuery = (
    params?: any
): UseQueryResult<BaseResponse<StudentPlacementTest[]>> => {
    const filters = useStudentsStore(s => s.filters);
    const setStudentsPlacementTest = useStudentsStore(s => s.setStudentsPlacementTest);

    const res = useQuery({
        queryKey: ['students-with-placement', Object.values(filters), params],
        queryFn: async () => await fetchStudents(params),
    });

    useEffect(() => {
        if (res.status === 'success') {
            setStudentsPlacementTest(res.data.data);
        }
    }, [res.status]);

    return res;
};

export default useFetchStudentsWithPlacementQuery;
