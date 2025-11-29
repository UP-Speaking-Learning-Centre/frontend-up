import type React from 'react';
import { Suspense } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen bg-gray-50 flex">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary to-primary relative overflow-hidden"></div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    {children}
                </div>
            </div>
        </Suspense>
    );
}
