import { ROUTES } from '@/constants/routes';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();
    useEffect(() => {
        const res = api.interceptors.response.use(
            res => res,
            (err: AxiosError) => {
                const prevReq = err.config as any;
                if (err.response?.status === 401 && !prevReq?._retry) {
                    prevReq._retry = true;
                    return api(prevReq);
                }
                return router.replace(ROUTES.login);
            }
        );

        return () => api.interceptors.response.eject(res);
    }, [api]);
};

export default useAuth;
