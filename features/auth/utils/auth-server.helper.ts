'use server'

import api, { BaseService } from '@/lib/api';
import { RequestLogin, ResponseLogin } from '../constants/interface';
import { ACCESS_TOKEN, API_LOGIN } from '../constants/config';
import { cookies } from 'next/headers';

export const postLogin = async (data: RequestLogin) => {
    return BaseService(async () => {
        const res = await api.post<ResponseLogin>(API_LOGIN, data);
        const loginData = {
            ...res.data,
            role: (res.data?.role || 'admin') as any,
        };

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const cookieStore = await cookies();

        cookieStore.set(ACCESS_TOKEN, JSON.stringify(loginData), {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });

        return loginData;
    });
};

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN);

    return;
};