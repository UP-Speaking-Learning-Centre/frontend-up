'use client';

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

    return (
        <div
            className={cn(
                'px-2 relative',
                isActive &&
                    'after:absolute after:bottom-0 after:top-0 after:left-0 after:w-1 after:bg-[#CE6439] after:rounded-r-md'
            )}
        >
            <Link
                href={item.href}
                className={`w-full justify-start font-normal rounded-md flex items-center px-6 py-3 ${
                    isActive
                        ? 'bg-[#CE6439] text-white border-r-2 border-[#CE6439]'
                        : 'text-white hover:bg-[#CE6439]/80'
                }`}
                onClick={() => setOpen(false)}
            >
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.label}</span>
            </Link>
        </div>
    );
};

export default SidebarItem;
