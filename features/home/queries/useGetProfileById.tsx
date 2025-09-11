'use client'

import { API_GET_STUDENT_BY_ID } from '@/features/auth/constants/config';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';
import api, { baseService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const useGetProfileById = () => {
    const { id } = useParams<{ id: string }>();

    const getProfileById = async () => {
        const accessToken = await getCookiesToken();
        return baseService(async () => {
            const res = await api.get<ResponseUserDetail>(API_GET_STUDENT_BY_ID(id ?? ''), {
                headers: { Authorization: 'Bearer ' + accessToken },
            });
            return res.data;
        });
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_GET_STUDENT_BY_ID],
        queryFn: async () => {
            const res = await getProfileById();
            return res;
        },
    });

    return { data, isLoading };
};

export default useGetProfileById;
