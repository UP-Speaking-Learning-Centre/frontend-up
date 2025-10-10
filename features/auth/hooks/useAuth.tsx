import api from '@/lib/api';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';
import { logout } from '../utils/auth-server.helper';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const useAuth = () => {
    const router = useRouter();
    const { token } = useAuthStore();

    useEffect(() => {
        const res = api.interceptors.response.use(
            res => res,
            async (err: AxiosError) => {
                const prevReq = err.config as any;
                if (err.response?.status === 401) {
                    if (!prevReq?._retry) {
                        prevReq._retry = true;
                        prevReq.headers.Authorization = `Bearer ` + token;
                        return api(prevReq);
                    }
                    return await logout().then(() => window.location.replace(ROUTES.login));
                }
                throw err
            }
        );

        const req = api.interceptors.request.use(
            async config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ` + token;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return () => {
            api.interceptors.response.eject(res);
            api.interceptors.request.eject(req);
        };
    }, [api, token]);
};

export default useAuth;
