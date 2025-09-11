'use client';

import { ROUTES } from '@/constants/routes';
import useAuth from '@/features/auth/hooks/useAuth';
import useAuthStore from '@/features/auth/stores/authStore';
import DashboardLayout from '@/features/dashboard/components/dashboard-layout';
import { useRouter } from 'next/navigation';
import type React from 'react';

// export const metadata: Metadata = {
//     title: 'UP Speaking Learning Centre',
//     description: 'Unlock your potential with our educational programs',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useAuth();

    return <DashboardLayout>{children}</DashboardLayout>;
}
