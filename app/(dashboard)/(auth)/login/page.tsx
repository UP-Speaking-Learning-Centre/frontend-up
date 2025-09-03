'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Phone, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Dummy accounts with different scenarios
const dummyAccounts = [
    {
        id: '1',
        phone: '081234567890',
        password: 'password',
        accountType: 'parent' as const,
        status: 'active' as const,
        students: [
            {
                id: '1',
                name: 'Budi Santoso',
                age: 10,
                program: 'Elementary School',
                level: 'Novice 2',
                status: 'active',
                registrationType: 'regular',
                schedule: {
                    time: '15:00 - 17:00',
                    days: 'Senin & Rabu',
                    location: 'Ruang A1',
                    mentor: 'Ms. Feby',
                },
            },
            {
                id: '2',
                name: 'Sari Santoso',
                age: 12,
                program: 'Junior High School',
                level: 'Beginners 1',
                status: 'active',
                registrationType: 'regular',
                schedule: {
                    time: '17:00 - 19:00',
                    days: 'Selasa & Kamis',
                    location: 'Ruang B2',
                    mentor: 'Mr. Firdan',
                },
            },
        ],
    },
    {
        id: '2',
        phone: '089876543210',
        password: 'test123',
        accountType: 'parent' as const,
        status: 'active' as const,
        students: [
            {
                id: '3',
                name: 'Andi Wijaya',
                age: 9,
                program: 'Pending',
                level: 'Pending',
                status: 'pending',
                registrationType: 'placement-test',
                placementTest: {
                    status: 'pending',
                    date: '2025-06-01',
                    score: null,
                },
            },
        ],
    },
    {
        id: '3',
        phone: '087654321098',
        password: 'test123',
        accountType: 'parent' as const,
        status: 'active' as const,
        students: [
            {
                id: '4',
                name: 'Maya Putri',
                age: 11,
                program: 'Elementary School',
                level: 'Elementary 3',
                status: 'active',
                registrationType: 'placement-test',
                placementTest: {
                    status: 'completed',
                    date: '2025-05-15',
                    score: 78,
                    recommendedLevel: 'Elementary 3',
                },
                schedule: {
                    time: '15:00 - 17:00',
                    days: 'Senin & Rabu',
                    location: 'Ruang A3',
                    mentor: 'Ms. Binti',
                    options: [
                        {
                            id: 'schedule-1',
                            time: '15:00 - 17:00',
                            days: 'Senin & Rabu',
                            mentor: 'Ms. Binti',
                        },
                        {
                            id: 'schedule-2',
                            time: '17:00 - 19:00',
                            days: 'Selasa & Kamis',
                            mentor: 'Ms. Binti',
                        },
                    ],
                },
            },
            {
                id: '5',
                name: 'Reza Putra',
                age: 14,
                program: 'Junior High School',
                level: 'Interchange 2',
                status: 'active',
                registrationType: 'regular',
                schedule: {
                    time: '17:00 - 19:00',
                    days: 'Senin & Rabu',
                    location: 'Ruang B1',
                    mentor: 'Mr. Noval',
                },
            },
        ],
    },
];

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'login' | 'otp'>('login');
    const [otpCode, setOtpCode] = useState('');
    const [otpResendTimer, setOtpResendTimer] = useState(0);
    const [isNewUser, setIsNewUser] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Format phone number
        const formattedPhone = formatPhoneNumber(phoneNumber);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = dummyAccounts.find(acc => acc.phone === formattedPhone);

        if (user) {
            // Existing user - check password
            if (password === user.password) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                toast({
                    title: 'Login Successful',
                    description: 'Welcome back! Redirecting to dashboard...',
                });
                router.push('/dashboard');
            } else {
                toast({
                    title: 'Invalid Password',
                    description: 'Please check your password and try again.',
                    variant: 'destructive',
                });
            }
        } else {
            // New user - send OTP
            setIsNewUser(true);
            sendOTP();
        }

        setIsLoading(false);
    };

    const sendOTP = async () => {
        setIsLoading(true);

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
            description: `Verification code sent to ${formatPhoneNumber(phoneNumber)}`,
        });

        setStep('otp');
        setIsLoading(false);
    };

    const verifyOTP = async () => {
        setIsLoading(true);

        // Simulate API call to verify OTP
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo, we'll use "123456" as the valid OTP
        if (otpCode === '123456') {
            if (isNewUser) {
                toast({
                    title: 'OTP Verified',
                    description: 'Please set up your password to complete registration.',
                });
                router.push(`/set-password?phone=${formatPhoneNumber(phoneNumber)}`);
            } else {
                router.push(`/reset-password?phone=${formatPhoneNumber(phoneNumber)}`);
            }
        } else {
            toast({
                title: 'Invalid OTP',
                description: 'Please check the verification code and try again.',
                variant: 'destructive',
            });
        }

        setIsLoading(false);
    };

    if (step === 'otp') {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                {/* Left side - Illustration */}
                {/* <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#254116] to-[#CE6439] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
                        <div className="max-w-md text-center">
                            <div className="mb-8">
                                <div className="h-20 w-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-xl">
                                        UP
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold mb-4">Verify Your Phone</h1>
                                <p className="text-lg text-white/90">
                                    We've sent a verification code to your phone number. Please
                                    enter it below to continue.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Right side - OTP Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <Link href="/" className="inline-flex items-center mb-6">
                                <div className="h-10 w-10 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg mr-3">
                                    UP
                                </div>
                                <span className="text-2xl font-bold text-[#254116]">
                                    UP Education
                                </span>
                            </Link>
                            <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
                            <p className="mt-2 text-gray-600">
                                Enter the verification code sent to your phone
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <div className="text-center">
                                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <CardTitle className="text-lg">
                                        Enter Verification Code
                                    </CardTitle>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Code sent to {formatPhoneNumber(phoneNumber)}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        verifyOTP();
                                    }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <Label
                                            htmlFor="otp-code"
                                            className="flex items-center mb-2"
                                        >
                                            <Shield className="w-4 h-4 mr-2 text-[#CE6439]" />
                                            Verification Code
                                        </Label>
                                        <Input
                                            id="otp-code"
                                            type="text"
                                            value={otpCode}
                                            onChange={e => setOtpCode(e.target.value)}
                                            placeholder="Enter 6-digit code (123456)"
                                            required
                                            maxLength={6}
                                            className="w-full text-center text-lg tracking-widest"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Use code 123456 for demo
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading || otpCode.length !== 6}
                                        className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90"
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify Code'}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            {otpResendTimer > 0 ? (
                                                <>
                                                    Resend code in{' '}
                                                    <span className="font-medium">
                                                        {otpResendTimer}
                                                    </span>{' '}
                                                    seconds
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={sendOTP}
                                                    disabled={isLoading}
                                                    className="text-[#CE6439] hover:underline font-medium"
                                                >
                                                    Resend Code
                                                </button>
                                            )}
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep('login')}
                                        className="w-full"
                                    >
                                        Use Different Phone Number
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg mr-3">
                        UP
                    </div>
                    <span className="text-2xl font-bold text-[#254116]">UP Education</span>
                </Link>
                <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                <p className="mt-2 text-gray-600">Welcome back! Please sign in to your account</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-lg">Login to Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                Enter your registered phone number
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="password" className="flex items-center mb-2">
                                <Lock className="w-4 h-4 mr-2 text-[#CE6439]" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Leave empty if you're a new user
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading || !phoneNumber}
                            className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-[#CE6439] hover:underline font-medium"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Accounts:</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-blue-800 font-medium">Regular Registration:</p>
                      <p className="text-xs text-blue-800">Phone: 081234567890</p>
                      <p className="text-xs text-blue-800">Password: password</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-800 font-medium">Placement Test (Pending):</p>
                      <p className="text-xs text-blue-800">Phone: 089876543210</p>
                      <p className="text-xs text-blue-800">Password: test123</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-800 font-medium">Placement Test (Completed):</p>
                      <p className="text-xs text-blue-800">Phone: 087654321098</p>
                      <p className="text-xs text-blue-800">Password: test123</p>
                    </div>
                  </div>
                </div> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
