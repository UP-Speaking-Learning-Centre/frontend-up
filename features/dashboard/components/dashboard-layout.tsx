'use client';

import React from 'react';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import Image from 'next/image';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isDashboardReady = useDashboardLayoutStore(state => state.isDashboardReady);

    return (
        <>
            {!isDashboardReady && (
                <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                    <Image
                        src={'/logo-black.png'}
                        width="100"
                        height="100"
                        alt="Logo UP"
                        className="animate-pulse"
                    />
                </div>
            )}
            <div className='grid min-h-screen max-w-[100vw] [grid-template-areas:"sidebar_header""sidebar_main"] [grid-template-columns:240px_auto] [grid-template-rows:60px_auto]'>
                <Sidebar />
                <Header />
                <div className="[grid-area:main] p-4 w-full overflow-x-scroll">{children}</div>
            </div>
        </>
    );
};

export default DashboardLayout;
