'use client'
import AxiosPersistLogin from '@/components/layout/axios-persist-login';
import { inter } from '@/constants/fonts';
import useAuth from '@/features/auth/hooks/useAuth';
import DashboardLayout from '@/features/dashboard/components/dashboard-layout';
import type React from 'react';

// export const metadata: Metadata = {
//     title: 'UP Speaking Learning Centre',
//     description: 'Unlock your potential with our educational programs',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useAuth()
    
    return (
        <AxiosPersistLogin>
            <DashboardLayout>
                <div className={inter.className}>{children}</div>
            </DashboardLayout>
        </AxiosPersistLogin>
    );
}
