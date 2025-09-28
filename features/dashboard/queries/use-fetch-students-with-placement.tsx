'use client';

import useAuthStore from '@/features/auth/stores/authStore';
import api, { baseService } from '@/lib/api';
import { BaseResponse } from '@/types/general';
import { StudentPlacementTest } from '@/types/students';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { API_ADMIN_LIST_PLACEMENT_TEST } from '../constants/config';
import { useStudentsStore } from '../stores/students-store';

const fetchStudents = (params?: any, accessToken?: string) => {
    return baseService(async () => {
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

const useFetchStudentsWithPlacementQuery = (): UseQueryResult<
    BaseResponse<StudentPlacementTest[]>
> => {
    const filters = useStudentsStore(s => s.filterPlacementTest);
    const pagination = useStudentsStore(s => s.paginationPlacementTest);
    const setStudentsPlacementTest = useStudentsStore(s => s.setStudentsPlacementTest);
    const setPaginationPlacementTest = useStudentsStore(s => s.setPaginationPlacementTest);
    const accessToken = useAuthStore(s => s.token);

    const res = useQuery({
        queryKey: ['students-with-placement', Object.values(filters), Object.values(pagination)],
        queryFn: async () =>
            await fetchStudents(
                {
                    studentName: filters.searchQuery,
                    programId: filters.program,
                    groupId: filters.group,
                    mentorId: filters.mentors,
                    status: filters.status,
                    currentPage: pagination.currentPage,
                },
                accessToken
            ),
        staleTime: 0,
    });

    useEffect(() => {
        if (res.status === 'success') {
            setStudentsPlacementTest(res.data.data);
            setPaginationPlacementTest(res.data.meta);
        }
    }, [res.status, res.data]);

    return res;
};

export default useFetchStudentsWithPlacementQuery;
