import { ROUTES } from '@/constants/routes';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ADMIN } from '../constants/config';
import useAuthStore from '../stores/authStore';
import { logout } from '../utils/auth-server.helper';
import { getCookiesAuth, getCookiesToken } from '../utils/cookies.helper';

const useAuth = () => {
    const router = useRouter();
    const { setRole, role } = useAuthStore();

    useEffect(() => {
        const getRole = async () => {
            await getCookiesAuth()
                .then(res => {
                    setRole(res.role);
                })
                .catch(() => {
                    router.replace(ROUTES.login);
                });
        };
        getRole();
    }, []);

    useEffect(() => {
        const res = api.interceptors.response.use(
            res => res,
            async (err: AxiosError) => {
                const prevReq = err.config as any;
                if (err.response?.status === 401) {
                    if (!role) return router.replace(ROUTES.login);
                    if (role !== ADMIN) {
                        return router.replace(ROUTES.dashboardStudents);
                    }
                    if (!prevReq?._retry) {
                        prevReq._retry = true;
                        return api(prevReq);
                    }
                    await logout().then(() => {
                        return router.replace(ROUTES.login);
                    });
                }
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
    }, [api, role]);
};

export default useAuth;
