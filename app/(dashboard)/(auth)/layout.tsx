import type React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#254116] to-[#CE6439] relative overflow-hidden"></div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">{children}</div>
        </div>
    );
}
