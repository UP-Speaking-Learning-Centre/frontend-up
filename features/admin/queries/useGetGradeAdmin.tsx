import React from 'react';
import api from '@/lib/api';
import { ResponseGrade } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';
import { API_GRADE } from '@/features/placement-test-admin/constants/config';

const useGetGradeAdmin = () => {
    const get = async () => {
        const res = await api.get<ResponseGrade[]>(
            API_GRADE.expand({
                programId: 1,
                groupId: 1,
                levelId: 1,
            })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_GRADE],
        queryFn: get,
        select: data => data.map(item => ({ ...item, name: item.gradeNumber.toString() })),
    });

    return { data, isLoading };
};

export default useGetGradeAdmin;
