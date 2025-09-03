'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, Shield } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [otpResendTimer, setOtpResendTimer] = useState(0);

    const router = useRouter();
    const { toast } = useToast();

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');

        // Convert 08 to 628
        if (digits.startsWith('08')) {
            return '62' + digits.substring(1);
        }

        // If starts with 62, keep as is
        if (digits.startsWith('62')) {
            return digits;
        }

        // If starts with 8, add 62
        if (digits.startsWith('8')) {
            return '62' + digits;
        }

        return digits;
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Format phone number
        const formattedPhone = formatPhoneNumber(phoneNumber);

        // Simulate API call to send OTP
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Start OTP timer
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

        // Simulate API call to verify OTP
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo, we'll use "123456" as the valid OTP
        if (otpCode === '123456') {
            toast({
                title: 'OTP Verified',
                description: 'Kode OTP valid. Silakan buat password baru.',
            });

            // Redirect to reset password page
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

        // Simulate API call to send OTP
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset OTP timer
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

        toast({
            title: 'OTP Sent',
            description: `Kode OTP telah dikirim ke ${formatPhoneNumber(phoneNumber)}`,
        });

        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg mr-3">
                        UP
                    </div>
                    <span className="text-2xl font-bold text-[#254116]">UP Education</span>
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
                        <form onSubmit={handlePhoneSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="phone" className="flex items-center mb-2">
                                    <Phone className="w-4 h-4 mr-2 text-[#CE6439]" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    placeholder="08123456789 or 628123456789"
                                    required
                                    className="w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter your registered phone number (WhatsApp number)
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || !phoneNumber}
                                className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90"
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleOTPSubmit} className="space-y-6">
                            <div className="text-center mb-4">
                                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <h3 className="font-medium text-gray-900">Verifikasi OTP</h3>
                                <p className="text-sm text-gray-600">
                                    Masukkan kode OTP yang dikirim ke nomor {phoneNumber}
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="otp-code" className="flex items-center mb-2">
                                    <Shield className="w-4 h-4 mr-2 text-[#CE6439]" />
                                    Kode OTP
                                </Label>
                                <Input
                                    id="otp-code"
                                    type="text"
                                    value={otpCode}
                                    onChange={e => setOtpCode(e.target.value)}
                                    placeholder="Masukkan kode OTP (123456)"
                                    required
                                    maxLength={6}
                                    className="w-full text-center text-lg tracking-widest"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Gunakan kode 123456 untuk demo
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || otpCode.length !== 6}
                                className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90"
                            >
                                {isLoading ? 'Verifying...' : 'Verifikasi OTP'}
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    {otpResendTimer > 0 ? (
                                        <>
                                            Kirim ulang dalam{' '}
                                            <span className="font-medium">{otpResendTimer}</span>{' '}
                                            detik
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            disabled={isLoading}
                                            className="text-[#CE6439] hover:underline font-medium"
                                        >
                                            Kirim Ulang OTP
                                        </button>
                                    )}
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep('phone')}
                                className="w-full"
                            >
                                Use Different Phone Number
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
