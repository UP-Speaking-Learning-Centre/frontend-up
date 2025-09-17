import { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
    title: 'UP Speaking Learning Centre',
    description: 'Unlock your potential with our educational programs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
