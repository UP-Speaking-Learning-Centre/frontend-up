import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export const useResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get('phone');
    const { toast } = useToast();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!phoneNumber) {
            router.push('/login');
        }
    }, [phoneNumber, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            toast({
                title: 'Password Too Short',
                description: 'Password must be at least 8 characters long.',
                variant: 'destructive',
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Password Mismatch',
                description: 'Passwords do not match. Please try again.',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: 'Password Reset Successful',
            description:
                'Your password has been reset successfully. You can now login with your new password.',
        });

        // Redirect to login page
        router.push('/login');

        setIsLoading(false);
    };

    return {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        isLoading,
        handleSubmit,
    };
};
