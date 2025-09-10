'use client';

import { API_GET_PROFILE } from '@/features/auth/constants/config';
import { ResponseProfile } from '@/features/auth/constants/interface';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';
import api, { baseService } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = () => {
    const getProfile = async () => {
        const accessToken = await getCookiesToken();
        return baseService(async () => {
            const res = await api.get<ResponseProfile>(API_GET_PROFILE, {
                headers: { Authorization: 'Bearer ' + accessToken },
            });
            return res.data;
        });
    };
    const { data, isLoading } = useQuery({
        queryKey: [API_GET_PROFILE],
        queryFn: async () => {
            return {
                id: 20,
                phoneNumber: '+6281211112210122',
                instagram: 'radit2122',
                students: [
                    {
                        id: 46,
                        name: 'radit 21.22',
                        programName: 'Not determined',
                        groupName: 'Not determined',
                        levelName: 'Not determined',
                        schedules: [],
                        testResults: [
                            {
                                testName: 'Placement Test - Junior High',
                                score: 0,
                                status: 'pending',
                            },
                        ],
                    },
                ],
            } as ResponseProfile;
            const res = await getProfile();
            return res;
        },
    });

    return { data, isLoading };
};

export default useGetProfile;
