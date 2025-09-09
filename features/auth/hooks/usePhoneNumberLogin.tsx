'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { ACTIVATION_REQUIRED, OTP, PASSWORD } from '../constants/config';
import { LoginRequest } from '../constants/interface';
import useGetOTP from '../queries/useGetOTP';
import usePostPhoneNumberVerification from '../queries/usePostPhoneNumberVerification';
import useAuthStore from '../stores/authStore';

const usePhoneNumberLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const Login = z.object({
        phone: z
            .string()
            .min(1, 'Phone number is required')
            .regex(
                /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                'Invalid phone number'
            ),
    });
    const { register, handleSubmit, formState, getValues } = useForm<LoginRequest>({
        resolver: zodResolver(Login),
    });
    const { mutateAsync, isPending } = usePostPhoneNumberVerification();
    const { handlePostOTP } = useGetOTP();
    const { setTimeLeft, setStep, setIsNewAccount, setPhone } = useAuthStore();

    const handleContinue = (data: LoginRequest) => {
        setIsLoading(true);
        setPhone(data.phone);
        mutateAsync(data.phone)
            .then(res => {
                if (res === ACTIVATION_REQUIRED) {
                    setStep(OTP);
                    setTimeLeft(30);
                    handlePostOTP(data.phone);
                    setIsNewAccount(true);
                    return;
                }
                setStep(PASSWORD);
            })
            .catch(err => toast.error(err?.message, { position: 'top-center' }))
            .finally(() => setIsLoading(false));
    };

    const handleError = (error: any) => {
        console.log(error);
    };

    return {
        register,
        handleSubmit: handleSubmit(handleContinue, handleError),
        formState,
        isLoading,
        getValues,
        isPending,
    };
};

export default usePhoneNumberLogin;
