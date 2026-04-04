'use server';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '../constants/config';
import { ResponseLogin } from '../constants/interface';

export const getCookiesAuth = async () => {
    const cookieStore = await cookies();
    if (!cookieStore.get(ACCESS_TOKEN)) throw new Error('Unauthorized');
    const res = JSON.parse(cookieStore.get(ACCESS_TOKEN)?.value ?? '{}') as ResponseLogin;

    console.log(res);
    return res;
};

export const getCookiesToken = async () => {
    const cookieStore = await cookies();
    const res = JSON.parse(cookieStore.get(ACCESS_TOKEN)?.value ?? '{}') as ResponseLogin;

    return res.accessToken;
};
