'use client';

import { API_GET_PROFILE } from '@/features/auth/constants/config';
import { ResponseProfile } from '@/features/auth/constants/interface';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';
import api, { BaseService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = () => {
    const getProfile = async () => {
        const accessToken = await getCookiesToken();
        return BaseService(async () => {
            const res = await api.get<ResponseProfile>(API_GET_PROFILE, {
                headers: { Authorization: 'Bearer ' + accessToken },
            });
            return res.data;
        });
    };
    const { data, isLoading } = useQuery({
        queryKey: [API_GET_PROFILE],
        queryFn: async () => {
            const res = await getProfile();
            return res;
        },
    });

    return { data, isLoading };
};

export default useGetProfile;
