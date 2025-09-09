'use client'

import { API_GET_STUDENT_BY_ID, DEVELOPMENT } from '@/features/auth/constants/config';
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
            if (process.env.NODE_ENV === DEVELOPMENT)
                return {
                    id: 46,
                    name: 'radit 21.22',
                    programName: 'Not determined',
                        groupName: 'Not determined',
                        levelName: 'Not determined',
                    gradeNumber: 2,
                    schedules: [
                        {
                            dayOfWeek: 'MON',
                            startTime: '08:00:00',
                            endTime: '09:30:00',
                            locationName: 'Stadion',
                            teacherName: 'Ms. Nuraeni',
                        },
                        {
                            dayOfWeek: 'MON',
                            startTime: '11:00:00',
                            endTime: '12:30:00',
                            locationName: 'Stadion',
                            teacherName: 'Ms. Nuraeni',
                        },
                    ],
                    testResults: [],
                } as ResponseUserDetail;
            const res = await api.get<ResponseUserDetail>(API_GET_STUDENT_BY_ID(id ?? ''), {
                headers: { Authorization: 'Bearer ' + accessToken?.value },
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
