import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Roboto, Bebas_Neue, Merriweather_Sans, Raleway, Oswald } from 'next/font/google';
import TanstackProvider from '@/components/layout/tanstack-provider';
import { cn } from '@/lib/utils';

const merriweather = Merriweather_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-roboto',
});
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
    title: 'UP Speaking Learning Centre',
    description: 'Unlock your potential with our educational programs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(outfit.className)}>
                <TanstackProvider>
                    <main className="flex-1">{children}</main>
                </TanstackProvider>
            </body>
        </html>
    );
}
