import { ROUTES } from '@/constants/routes';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookiesAuth, getCookiesToken } from '../utils/cookies.helper';
import { ADMIN } from '../constants/config';
import { logout } from '../utils/auth-server.helper';
import useAuthStore from '../stores/authStore';

const useAuth = () => {
    const router = useRouter();
    const { setRole } = useAuthStore();

    useEffect(() => {
        const getRole = async () => {
            await getCookiesAuth().then(res => {
                setRole(res.role);
            });
        };
        getRole();
    }, []);

    useEffect(() => {
        const res = api.interceptors.response.use(
            res => res,
            async (err: AxiosError) => {
                const role = (await getCookiesAuth()).role;
                const prevReq = err.config as any;
                if (err.response?.status === 401) {
                    if (role !== ADMIN) {
                        return router.replace(ROUTES.dashboardStudents);
                    }
                    if (!prevReq?._retry) {
                        prevReq._retry = true;
                        return api(prevReq);
                    }
                }
                await logout().then(() => {
                    return router.replace(ROUTES.login);
                });
            }
        );

        const req = api.interceptors.request.use(
            async config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ` + (await getCookiesToken());
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return () => {
            api.interceptors.response.eject(res);
            api.interceptors.request.eject(req);
        };
    }, [api]);
};

export default useAuth;
