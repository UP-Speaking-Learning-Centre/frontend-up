'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { OTP, PASSWORD } from '../constants/config';
import useAuthStore from '../stores/authStore';

const useOTP = () => {
    const { timeLeft, setTimeLeft, setStep, otpForTesting } = useAuthStore();
    const OTPobject = z
        .object({
            otp: z
                .string()
                .min(6)
                .regex(/[a-z0-9]*\d[a-z0-9]*/, 'Invalid OTP number'),
        })
        .superRefine(({ otp }, ctx) => {
            if (otp !== otpForTesting) {
                ctx.addIssue({ code: 'custom', message: 'Invalid OTP number', path: [OTP] });
            }
        });
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<{ otp: string }>({
        resolver: zodResolver(OTPobject),
    });

    useEffect(() => {
        if (timeLeft === 0) return; // stop when it reaches 0

        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // cleanup when component unmounts or when timeLeft changes
        return () => clearInterval(timer);
    }, [timeLeft]);

    const verifyOTP = (data: { otp: string }) => {
        if (data.otp === otpForTesting) {
            setStep(PASSWORD);
        }
    };

    return { verifyOTP, isLoading, form };
};

export default useOTP;
