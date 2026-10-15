import { ROUTES } from '@/constants/routes';
import { errorToast } from '@/lib/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { ADMIN, CONFIRM_PASSWORD } from '../constants/config';
import { PasswordForm } from '../constants/interface';
import usePostFirstLogin from '../queries/usePostFirstLogin';
import useAuthStore from '../stores/authStore';
import { isAdmin } from '../utils/auth-client.helper';
import { postLogin } from '../utils/auth-server.helper';

const usePassword = () => {
    const router = useRouter();
    const { isNewAccount, phone, otpForTesting, setRole, setStep } = useAuthStore();

    const [isLoading, setIsloading] = useState(false);

    const zObject = () => {
        const zObject: Record<string, any> = {
            password: z.string().min(8, 'Password min 8 characters'),
        };
        if (isNewAccount) zObject.confirm_password = z.string();
        return zObject;
    };
    const Password = z.object(zObject()).superRefine((field, ctx) => {
        if (field.password !== field.confirm_password && isNewAccount) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
                path: [CONFIRM_PASSWORD],
            });
        }
    });

    const { handleSubmit, register, formState } = useForm<PasswordForm>({
        resolver: zodResolver(Password),
    });
    const { mutateAsync } = usePostFirstLogin();

    const login = async (data: PasswordForm) => {
        await postLogin({ phoneNumber: phone, password: data.password })
            .then(res => {
                router.replace(ROUTES.adminNewStudents);
                setRole(res.role || ADMIN as any);
            })
            .catch(err => {
                errorToast('Username atau password salah');
            })
            .finally(() => setIsloading(false));
    };

    const handleSuccess = async (data: PasswordForm) => {
        setIsloading(true);
        if (isNewAccount) {
            mutateAsync({
                phoneNumber: phone,
                otp: otpForTesting,
                newPassword: data.password,
            })
                .then(async res => {
                    toast.info(res, { position: 'top-center' });
                    await login(data);
                })
                .catch(err => errorToast(err?.message))
                .finally(() => setIsloading(false));
        } else await login(data);
    };

    return {
        handleSubmit: handleSubmit(handleSuccess),
        register,
        formState,
        isLoading,
        setIsloading,
        isNewAccount,
    };
};

export default usePassword;
