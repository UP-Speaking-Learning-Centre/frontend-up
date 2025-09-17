'use client';

import Header from '@/components/layout/header';
import Overlay from '@/components/layout/overlay';
import Sidebar from '@/components/layout/sidebar';
import React, { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOverlayVisible, setIsOverlayVisible] = React.useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsOverlayVisible(false);
        }, 1700);
    }, []);

    return (
        <>
            {isOverlayVisible && <Overlay />}

            <div className='grid min-h-screen max-w-[100vw] [grid-template-areas:"header""main"] md:[grid-template-areas:"sidebar_header""sidebar_main"] md:[grid-template-columns:260px_auto] [grid-template-rows:60px_auto]'>
                <Sidebar />
                <Header />
                <div className="[grid-area:main] p-4 w-full overflow-x-scroll max-w-[1724px] mx-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
