'use server';

import api, { baseService } from '@/lib/api';
import { RequestLogin, ResponseLogin } from '../constants/interface';
import { ACCESS_TOKEN, API_LOGIN, DEVELOPMENT } from '../constants/config';
import { cookies } from 'next/headers';

export const postLogin = async (data: RequestLogin) => {
    return baseService(async () => {
        let accessToken = '';
        if (process.env.NODE_ENV === DEVELOPMENT) {
            accessToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwLCJwaG9uZU51bWJlciI6Iis2MjgxMjExMTEyMjEwMTIyIiwiaWF0IjoxNzU3MDYwNjk2LCJleHAiOjE3NTcxNDcwOTZ9.0OG8wM5Fpz4Va2uEYe4aqKNFd_HLHl3H7msHLeqWsNs';
        } else {
            const res = await api.post<ResponseLogin>(API_LOGIN, data);
            accessToken = res.data.accessToken;
        }
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const cookieStore = await cookies();

        cookieStore.set(ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });
    });
};

export const getCookiesToken = async () => {
    const cookieStore = await cookies();

    return cookieStore.get(ACCESS_TOKEN);
};
