import { ROUTES } from '@/constants/routes';
import useAuthStore from '@/features/auth/stores/authStore';
import { logout } from '@/features/auth/utils/auth-server.helper';
import { getCookiesAuth } from '@/features/auth/utils/cookies.helper';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import Overlay from './overlay';

const AxiosPersistLogin = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState<boolean>(true);
    const setRole = useAuthStore(s => s.setRole);
    const setToken = useAuthStore(s => s.setToken);
    const token = useAuthStore(s => s.token);
    const router = useRouter();

    useEffect(() => {
        const eraseDataLogout = async () =>
            await logout().then(() => {
                return router.replace(ROUTES.login);
            });

        const verifyRefToken = async () => {
            try {
                const res = await getCookiesAuth();
                setRole(res.role);
                setToken(res.accessToken);
                return true;
            } catch (error) {
                console.error(error);
                eraseDataLogout();
            } finally {
                setLoading(false);
            }
        };

        !token ? verifyRefToken() : setLoading(false);
    }, []);

    if (loading) return <Overlay />;
    return children;
};

export default AxiosPersistLogin;
