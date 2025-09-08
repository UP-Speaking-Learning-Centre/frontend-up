'use client';

import OTPComponent from '@/features/auth/components/otp';
import Password from '@/features/auth/components/password';
import PhoneNumber from '@/features/auth/components/phone-number';
import { OTP, PASSWORD } from '@/features/auth/constants/config';
import useAuthStore from '@/features/auth/stores/authStore';

export default function LoginPage() {
    const { step } = useAuthStore();

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

    return renderLoginPage();
}
