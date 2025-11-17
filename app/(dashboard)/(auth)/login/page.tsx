'use client';

import { ROUTES } from '@/constants/routes';
import OTPComponent from '@/features/auth/components/otp';
import Password from '@/features/auth/components/password';
import PhoneNumber from '@/features/auth/components/phone-number';
import { OTP, PASSWORD, PHONE } from '@/features/auth/constants/config';
import useAuthStore from '@/features/auth/stores/authStore';
import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginPage() {
    const { step, setStep } = useAuthStore();

    useEffect(() => {
        setStep(PHONE);
    }, []);

    const renderLoginPage = () => {
        switch (step) {
            case OTP:
                return <OTPComponent />;
            case PASSWORD:
                return <Password />;
            default:
                return <PhoneNumber />;
        }
    };

    return (
        <div>
            {renderLoginPage()}{' '}
            <div className="flex justify-center mt-5">
                <Link
                    href={ROUTES.home}
                    className="inline-block text-center underline text-primary"
                >
                    Kembali ke landing page
                </Link>
            </div>
        </div>
    );
}
