'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PhoneStep from '@/features/auth/components/forgot-password/phone-step';
import OtpStep from '@/features/auth/components/forgot-password/otp-step';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';

export default function ForgotPasswordPage() {
    const {
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
    } = useForgotPassword();

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
                        UP
                    </div>
                    <span className="text-2xl font-bold text-secondary">UP Education</span>
                </Link>
                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-2 text-gray-600">We'll help you get back into your account</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <Link href="/login" className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <CardTitle className="text-center text-lg flex-1">
                            {step === 'phone' ? 'Enter Phone Number' : 'Verify OTP'}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {step === 'phone' ? (
                        <PhoneStep
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            isLoading={isLoading}
                            handlePhoneSubmit={handlePhoneSubmit}
                        />
                    ) : (
                        <OtpStep
                            phoneNumber={phoneNumber}
                            otpCode={otpCode}
                            setOtpCode={setOtpCode}
                            isLoading={isLoading}
                            otpResendTimer={otpResendTimer}
                            handleOTPSubmit={handleOTPSubmit}
                            sendOTP={sendOTP}
                            setStep={setStep}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
