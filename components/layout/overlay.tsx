'use client';
import Image from 'next/image';
import React from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import { cn } from '@/lib/utils';

const Overlay = ({ opacity = 100, show = false }: { opacity?: number; show?: boolean }) => {
    const isDashboardReady = useDashboardLayoutStore(state => state.isDashboardReady);

    return (
        <div
            className={cn(
                'fixed inset-0 bg-white z-[99] flex items-center justify-center gap-3 transition-all duration-700',
                isDashboardReady && !show
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100 pointer-events-auto',
                `bg-opacity-${opacity}`
            )}
        >
            <div className="relative size-20 max-md:size-16">
                <Image src={'/logo-black.png'} fill alt="Logo UP" className="animate-pulse" />
            </div>
            <div className="w-1 h-24 bg-primary rounded-xl animate-pulse"></div>
            <div className="relative w-72 h-16 max-md:w-60 max-md:h-14">
                <Image
                    src={'/logo-cambridge.png'}
                    fill
                    alt="Logo Cambridge"
                    className="animate-pulse"
                />
            </div>
        </div>
    );
};

export default Overlay;
