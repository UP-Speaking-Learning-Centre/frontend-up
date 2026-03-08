'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockKeyhole } from 'lucide-react';
import { useSetPassword } from '@/features/auth/hooks/use-set-password';

export default function SetPasswordPage() {
    const {
        phoneNumber,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        isLoading,
        handleSubmit,
    } = useSetPassword();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <div className="text-center mb-6">
                    <LockKeyhole className="mx-auto h-12 w-12 text-primary mb-2" />
                    <h2 className="text-2xl font-semibold">Buat Password</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Buat password untuk akun dengan nomor {phoneNumber}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Masukkan password yang sama"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? 'Menyimpan...' : 'Simpan Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
