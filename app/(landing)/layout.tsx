import type React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LandingLayout from '@/features/home/components/landing-layout';

export const metadata: Metadata = {
    title: 'UP Speaking Learning Centre',
    description: 'Unlock your potential with our educational programs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <LandingLayout>{children}</LandingLayout>;
}
