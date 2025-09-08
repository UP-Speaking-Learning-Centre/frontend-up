import type React from 'react';
import type { Metadata } from 'next';
import DashboardLayout from '@/features/dashboard/components/dashboard-layout';

export const metadata: Metadata = {
    title: 'UP Speaking Learning Centre',
    description: 'Unlock your potential with our educational programs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
