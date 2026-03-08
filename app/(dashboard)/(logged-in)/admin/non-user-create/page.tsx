'use client';

import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import { CreateNonUserForm } from '@/features/non-user/components/create-non-user-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NonUserCreatePage() {
    const router = useRouter();

    return (
        <DashboardContentLayout pageTitle="Tambah Non User">
            <div className="space-y-6">
                <div>
                    <Button 
                        variant="ghost" 
                        onClick={() => router.back()}
                        className="pl-0 hover:bg-transparent hover:text-primary transition-colors duration-200"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>
                </div>

                <Card className="max-w-4xl border-none shadow-sm">
                    <CardContent className="p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900">Form Tambah Non User</h2>
                            <p className="text-sm text-gray-500 mt-1">Lengkapi data non user di bawah ini</p>
                        </div>

                        <CreateNonUserForm />
                    </CardContent>
                </Card>
            </div>
        </DashboardContentLayout>
    );
}
