'use client';

import ENDPOINTS from '@/constants/endpoints';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import api, { BaseService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const useGetProfileById = () => {
    const { id } = useParams<{ id: string }>();

    const getProfileById = async () => {
        return BaseService(async () => {
            const res = await api.get<ResponseUserDetail>(
                ENDPOINTS.fetchAdminStudentById.expand({ id })
            );
            return res.data;
        });
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchAdminStudentById.expand({ id })],
        queryFn: async () => {
            const res = await getProfileById();
            return res;
        },
    });

    return { data, isLoading };
};

export default useGetProfileById;
