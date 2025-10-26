'use client';

import { inter } from '@/constants/fonts';
import { cn } from '@/lib/utils';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SidebarItem = ({
    item,
}: {
    item: {
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        href: string;
    };
}) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(item.href);
    const setOpen = useDashboardLayoutStore(s => s.setOpenSidebar);
    const expandSidebar = useDashboardLayoutStore(s => s.expandSidebar);
    const openSidebar = useDashboardLayoutStore(s => s.openSidebar);

    return (
        <div
            className={cn(
                inter.className,
                'px-2 relative',
                isActive &&
                    'after:absolute after:bottom-0 after:top-0 after:left-0 after:w-1 after:bg-[#CE6439] after:rounded-r-md'
            )}
        >
            <Link
                href={item.href}
                className={`w-full justify-start font-normal rounded-md text-sm flex items-center px-5 py-3 ${
                    isActive
                        ? 'bg-[#CE6439] text-white border-r-2 border-[#CE6439]'
                        : 'text-white hover:bg-[#CE6439]/70'
                }`}
                onClick={() => setOpen(false)}
            >
                <item.icon
                    className={cn(
                        'shrink-0 transition-all size-5 duration-300',
                        expandSidebar || openSidebar ? 'mr-3 ' : 'mr-0'
                    )}
                />
                <span
                    className={cn(
                        expandSidebar || openSidebar ? 'opacity-100' : 'opacity-0',
                        'transition-all duration-300 whitespace-nowrap'
                    )}
                >
                    {item.label}
                </span>
            </Link>
        </div>
    );
};

export default SidebarItem;
