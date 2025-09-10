'use client';

import api, { baseService } from '@/lib/api';
import { BaseResponse } from '@/types/general';
import { StudentPlacementTest } from '@/types/students';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_ADMIN_LIST_PLACEMENT_TEST } from '../constants/config';
import { useStudentsStore } from '../stores/students-store';

const allUsers = {
    data: [
        {
            resultId: 1,
            studentName: 'radit 21.22',
            parentPhoneNumber: '+6281211112210122',
            program: 'School Program',
            group: 'Junior High School',
            status: 'pending',
            testDate: '2025-09-05T11:52:25.744Z',
        },
    ],
    meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
    },
};
const fetchStudents = (params?: any) => {
    return allUsers as BaseResponse<StudentPlacementTest[]>;

    return baseService(async () => {
        const res = await api.get<BaseResponse<StudentPlacementTest[]>>(
            API_ADMIN_LIST_PLACEMENT_TEST,
            {
                params,
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInBob25lTnVtYmVyIjoiMDgxMjM0NTY3ODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTczMDUzNzcsImV4cCI6MTc1NzM5MTc3N30.zjq1vZVhDVMoMXr8FSezwUUPQ0X3veRaBWjG7pPCyEY',
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
