'use client';

import Header from '@/components/layout/header';
import Overlay from '@/components/layout/overlay';
import Sidebar from '@/components/layout/sidebar';
import React, { useEffect } from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOverlayVisible, setIsOverlayVisible] = React.useState(true);
    const expandSidebar = useDashboardLayoutStore(s => s.expandSidebar);

    useEffect(() => {
        setTimeout(() => {
            setIsOverlayVisible(false);
        }, 1700);
    }, []);

    return (
        <>
            {isOverlayVisible && <Overlay />}

            <div
                className={cn(
                    'grid min-h-screen transition-all duration-300 max-w-[100vw] [grid-template-areas:"header""main"] md:[grid-template-areas:"sidebar_header""sidebar_main"] [grid-template-rows:60px_auto]',
                    expandSidebar
                        ? 'md:[grid-template-columns:260px_auto]'
                        : 'md:[grid-template-columns:80px_auto]'
                )}
            >
                <Sidebar />
                <Header />
                <div className="[grid-area:main] px-6 py-4 w-full overflow-x-scroll overflow-y-visible max-w-[1440px] mx-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
