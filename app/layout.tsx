import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TanstackProvider from '@/components/layout/tanstack-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'UP - Education For Everyone',
    description: 'Unlock your potential with our educational programs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TanstackProvider>
                    <main className="flex-1">{children}</main>
                </TanstackProvider>
            </body>
        </html>
    );
}
