import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

interface OtpStepProps {
    phoneNumber: string;
    otpCode: string;
    setOtpCode: (val: string) => void;
    isLoading: boolean;
    otpResendTimer: number;
    handleOTPSubmit: (e: React.FormEvent) => void;
    sendOTP: () => void;
    setStep: (step: 'phone' | 'otp') => void;
}

export default function OtpStep({
    phoneNumber,
    otpCode,
    setOtpCode,
    isLoading,
    otpResendTimer,
    handleOTPSubmit,
    sendOTP,
    setStep,
}: OtpStepProps) {
    return (
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
                    <Shield className="w-4 h-4 mr-2 text-primary" />
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
                <p className="text-xs text-gray-500 mt-1">Gunakan kode 123456 untuk demo</p>
            </div>

            <Button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full bg-primary hover:bg-primary/90"
            >
                {isLoading ? 'Verifying...' : 'Verifikasi OTP'}
            </Button>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    {otpResendTimer > 0 ? (
                        <>
                            Kirim ulang dalam <span className="font-medium">{otpResendTimer}</span>{' '}
                            detik
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={sendOTP}
                            disabled={isLoading}
                            className="text-primary hover:underline font-medium"
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
                Gunakan Nomor WhatsApp yang Berbeda
            </Button>
        </form>
    );
}
