import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('08')) {
        return '62' + digits.substring(1);
    }
    if (digits.startsWith('62')) {
        return digits;
    }
    if (digits.startsWith('8')) {
        return '62' + digits;
    }
    return digits;
};

export const useForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [otpResendTimer, setOtpResendTimer] = useState(0);

    const router = useRouter();
    const { toast } = useToast();

    const startOtpTimer = () => {
        setOtpResendTimer(30);
        const timer = setInterval(() => {
            setOtpResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedPhone = formatPhoneNumber(phoneNumber);

        await new Promise(resolve => setTimeout(resolve, 1000));
        startOtpTimer();

        toast({
            title: 'OTP Sent',
            description: `Kode OTP telah dikirim ke ${formattedPhone}`,
        });

        setStep('otp');
        setIsLoading(false);
    };

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (otpCode === '123456') {
            toast({
                title: 'OTP Verified',
                description: 'Kode OTP valid. Silakan buat password baru.',
            });
            router.push(`/reset-password?phone=${formatPhoneNumber(phoneNumber)}`);
        } else {
            toast({
                title: 'Invalid OTP',
                description: 'Kode OTP tidak valid. Silakan coba lagi.',
                variant: 'destructive',
            });
        }

        setIsLoading(false);
    };

    const sendOTP = async () => {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        startOtpTimer();

        toast({
            title: 'OTP Sent',
            description: `Kode OTP telah dikirim ke ${formatPhoneNumber(phoneNumber)}`,
        });

        setIsLoading(false);
    };

    return {
        phoneNumber,
        setPhoneNumber,
        otpCode,
        setOtpCode,
        isLoading,
        step,
        setStep,
        otpResendTimer,
        handlePhoneSubmit,
        handleOTPSubmit,
        sendOTP,
    };
};
