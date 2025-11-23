'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
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

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-3">
                        UP
                    </div>
                    <span className="text-2xl font-bold text-secondary">UP Education</span>
                </Link>
                <h2 className="text-3xl font-bold text-gray-900">Create New Password</h2>
                <p className="mt-2 text-gray-600">Set a new password for your account</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-lg">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="password" className="flex items-center mb-2">
                                <Lock className="w-4 h-4 mr-2 text-primary" />
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
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
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="flex items-center mb-2">
                                <Lock className="w-4 h-4 mr-2 text-primary" />
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                    className="w-full pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">
                                Password Requirements:
                            </h4>
                            <ul className="text-xs text-blue-800 space-y-1">
                                <li className="flex items-center">
                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${
                                            password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                    />
                                    At least 8 characters long
                                </li>
                                <li className="flex items-center">
                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${
                                            password === confirmPassword && password.length > 0
                                                ? 'bg-green-500'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                    Passwords match
                                </li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
