'use client';
import Image from 'next/image';
import React from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import { cn } from '@/lib/utils';

const Overlay = () => {
    const isDashboardReady = useDashboardLayoutStore(state => state.isDashboardReady);

    return (
        <div
            className={cn(
                'fixed inset-0 bg-white z-[99] flex items-center justify-center gap-3 transition-all duration-700',
                isDashboardReady
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100 pointer-events-auto'
            )}
        >
            <Image
                src={'/logo-black.png'}
                width="80"
                height="80"
                alt="Logo UP"
                className="animate-pulse"
            />
            <div className="w-1 h-24 bg-primary rounded-xl animate-pulse"></div>
            <Image
                src={'/logo-cambridge.png'}
                width="300"
                height="80"
                alt="Logo Cambridge"
                className="animate-pulse"
            />
        </div>
    );
};

export default Overlay;
