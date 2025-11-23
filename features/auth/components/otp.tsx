import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Shield } from 'lucide-react';
import React from 'react';
import { formatPhoneNumber } from '../utils/string.helper';
import useOTP from '../hooks/useOTP';
import useAuthStore from '../stores/authStore';
import { Button } from '@/components/ui/button';
import { OTP, PHONE } from '../constants/config';
import { Toaster } from 'sonner';
import useGetOTP from '../queries/useGetOTP';

const OTPComponent = () => {
    const { phone, timeLeft, setStep } = useAuthStore();
    const { handlePostOTP } = useGetOTP();
    const { verifyOTP, isLoading, form } = useOTP();
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Toaster />
            <div className="w-full flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
                        <p className="mt-2 text-gray-600">
                            Enter the verification code sent to your phone
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="text-center">
                                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <CardTitle className="text-lg">Enter Verification Code</CardTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                    Code sent to {formatPhoneNumber(phone)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(verifyOTP)} className="space-y-6">
                                <div>
                                    <Label htmlFor="otp-code" className="flex items-center mb-2">
                                        <Shield className="w-4 h-4 mr-2 text-primary" />
                                        Verification Code
                                    </Label>
                                    <Input
                                        id="otp-code"
                                        type="text"
                                        placeholder="Enter 6-digit code (123456)"
                                        required
                                        maxLength={6}
                                        className="w-full text-center text-lg tracking-widest"
                                        {...register(OTP)}
                                    />
                                    {errors.otp && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.otp.message?.toString()}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    // disabled={isLoading || otpCode.length !== 6}
                                    className="w-full bg-primary hover:bg-primary/90"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Code'}
                                </Button>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        {timeLeft > 0 ? (
                                            <>
                                                Resend code in{' '}
                                                <span className="font-medium">{timeLeft}</span>{' '}
                                                seconds
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handlePostOTP(phone)}
                                                disabled={isLoading}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                Resend Code
                                            </button>
                                        )}
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(PHONE)}
                                    className="w-full"
                                >
                                    Gunakan Nomor WhatsApp yang Berbeda
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OTPComponent;
