'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Eye, Lock, Shield } from 'lucide-react';
import { HTMLInputTypeAttribute, useState } from 'react';
import { Toaster } from 'sonner';
import { CONFIRM_PASSWORD, PASSWORD } from '../constants/config';
import usePassword from '../hooks/usePassword';
import BackPhoneNumber from './back-phone-number';

const Password = () => {
    const [visiblePass, setVisiblePass] = useState<HTMLInputTypeAttribute>('password');
    const [visibleConfirm, setVisibleConfirm] = useState<HTMLInputTypeAttribute>('password');

    const { handleSubmit, register, formState, isLoading, isNewAccount } = usePassword();
    const { errors, isDirty } = formState;

    return (
        <div className="w-full max-w-md">
            <Toaster />
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Masuk ke Dashboard</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-lg">Masukkan Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-center">
                        <h3>{isNewAccount && 'Atur '}Password</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {isNewAccount ? 'Buat password yang aman' : 'Masukkan Password'}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mt-2">
                            <Label htmlFor={PASSWORD} className="flex items-center mb-2">
                                <Lock className="w-4 h-4 mr-2 text-primary" />
                                {isNewAccount ? 'Password Baru' : 'Password'}
                            </Label>
                            <div className="relative">
                                <Input
                                    type={visiblePass}
                                    {...register(PASSWORD)}
                                    id={PASSWORD}
                                    className={cn(errors.password && 'border-red-500')}
                                    placeholder={
                                        isNewAccount
                                            ? 'Buat password yang aman'
                                            : 'Masukkan Password'
                                    }
                                />
                                <Eye
                                    onClick={() => {
                                        if (visiblePass === 'password')
                                            return setVisiblePass('text');
                                        setVisiblePass('password');
                                    }}
                                    width={16}
                                    className={cn(
                                        'z-10 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer',
                                        visiblePass === 'text' ? 'text-black' : 'text-gray-1'
                                    )}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message?.toString()}
                                </p>
                            )}
                        </div>
                        {isNewAccount && (
                            <>
                                <div className="mt-2">
                                    <Label
                                        htmlFor={CONFIRM_PASSWORD}
                                        className="flex items-center mb-2"
                                    >
                                        <Lock className="w-4 h-4 mr-2 text-primary" />
                                        Konfirmasi Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={visibleConfirm}
                                            {...register(CONFIRM_PASSWORD)}
                                            id={CONFIRM_PASSWORD}
                                            className={cn(
                                                errors.confirm_password && 'border-red-500'
                                            )}
                                            placeholder="Konfirmasi Password"
                                        />
                                        <Eye
                                            onClick={() => {
                                                if (visibleConfirm === 'password')
                                                    return setVisibleConfirm('text');
                                                setVisibleConfirm('password');
                                            }}
                                            width={16}
                                            className={cn(
                                                'z-10 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer',
                                                visibleConfirm === 'text'
                                                    ? 'text-black'
                                                    : 'text-gray-1'
                                            )}
                                        />
                                    </div>
                                    {errors.confirm_password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirm_password.message?.toString()}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-blue-4 border border-blue-1 p-3 rounded">
                                    <p className="text-blue-2">Persyaratan Password:</p>
                                    <ul className="text-blue-3 text-xs font-normal list-disc ml-4">
                                        <li>Minimal 8 karakter panjang</li>
                                        <li>Password dan Konfirmasi Password harus sama</li>
                                    </ul>
                                </div>
                            </>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading || !isDirty}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            {isLoading
                                ? 'Checking...'
                                : isNewAccount
                                ? 'Simpan Password & Lanjutkan'
                                : 'Login'}
                        </Button>
                    </form>
                    <BackPhoneNumber />
                    {/* {!isNewAccount && (
                        <div className="text-center mt-4">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:underline font-medium"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )} */}
                </CardContent>
            </Card>
        </div>
    );
};

export default Password;
