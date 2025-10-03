import api from '@/lib/api';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

const useAuth = () => {
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
                }
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
