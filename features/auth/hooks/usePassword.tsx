import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { CONFIRM_PASSWORD } from '../constants/config';
import { PasswordForm } from '../constants/interface';
import usePostFirstLogin from '../queries/usePostFirstLogin';
import useAuthStore from '../stores/authStore';
import { postLogin } from '../utils/cookies.helper';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const usePassword = () => {
    const router = useRouter();
    const { isNewAccount, phone, otpForTesting, setRole } = useAuthStore();

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

    const login = async (password: string) => {
        await postLogin({ phoneNumber: phone, password: password })
            .then(res => {
                router.replace(ROUTES.dashboardListStudents);
                setRole(res.role);
            })
            .catch(err => toast.error(err?.message, { position: 'top-center' }));
    };

    const handleSuccess = async (data: PasswordForm) => {
        if (isNewAccount) {
            mutateAsync({
                phoneNumber: phone,
                otp: otpForTesting,
                newPassword: data.password,
            })
                .then(async res => {
                    toast.info(res, { position: 'top-center' });
                    await login(data.password);
                })
                .catch(err => toast.info(err?.message, { position: 'top-center' }));
        } else await login(data.password);
    };

    const handleError: SubmitErrorHandler<PasswordForm> = error => {
        console.log(error);
    };

    return {
        handleSubmit: handleSubmit(handleSuccess, handleError),
        register,
        formState,
        isLoading,
        setIsloading,
        isNewAccount,
    };
};

export default usePassword;
