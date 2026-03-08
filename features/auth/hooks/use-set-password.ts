import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useSetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get('phone');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Redirect if no phone number is provided
        if (!phoneNumber) {
            router.push('/login');
        }
    }, [phoneNumber, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password harus minimal 6 karakter');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create new demo user account
        const newUser = {
            id: Date.now().toString(),
            phone: phoneNumber,
            password: password,
            accountType: 'parent' as const,
            status: 'active' as const,
            students: [
                {
                    id: '1',
                    name: 'Student Baru',
                    age: 10,
                    program: 'Belum dipilih',
                    level: 'Belum dipilih',
                },
            ],
        };

        localStorage.setItem('currentUser', JSON.stringify(newUser));
        router.push('/dashboard');

        setIsLoading(false);
    };

    return {
        phoneNumber,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        isLoading,
        handleSubmit,
    };
};
