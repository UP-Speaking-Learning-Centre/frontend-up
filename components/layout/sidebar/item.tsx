'use client';

import { inter } from '@/constants/fonts';
import { cn } from '@/lib/utils';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown } from 'lucide-react';

type SidebarMenuItem = {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    children?: {
        label: string;
        href: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
};

const SidebarItemContent = ({
    item,
    isActive,
    expandSidebar,
    openSidebar,
    hasChildren,
    isOpen,
}: {
    item: SidebarMenuItem;
    isActive: boolean;
    expandSidebar: boolean;
    openSidebar: boolean;
    hasChildren: boolean;
    isOpen: boolean;
}) => {
    return (
        <div
            className={`w-full justify-between font-normal rounded-md text-sm flex items-center px-5 py-3 cursor-pointer ${
                isActive
                    ? 'bg-primary text-white border-r-2 border-primary'
                    : 'text-white hover:bg-primary/70'
            }`}
        >
            <div className="flex items-center">
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
            </div>
            {hasChildren && (
                <ChevronDown
                    className={cn(
                        'size-4 transition-transform duration-200',
                        isOpen && 'rotate-180',
                        !(expandSidebar || openSidebar) && 'hidden'
                    )}
                />
            )}
        </div>
    );
};

const SidebarItem = ({ item }: { item: SidebarMenuItem }) => {
    const pathname = usePathname();
    // Support children active state
    const isActive = item.href
        ? pathname.startsWith(item.href)
        : item.children?.some(child => pathname.startsWith(child.href));

    const setOpenSidebar = useDashboardLayoutStore(s => s.setOpenSidebar);
    const expandSidebar = useDashboardLayoutStore(s => s.expandSidebar);
    const openSidebar = useDashboardLayoutStore(s => s.openSidebar);

    // If it's active initially, keep it open, else closed
    const [isOpen, setIsOpen] = useState(!!isActive);

    const hasChildren = !!(item.children && item.children.length > 0);
    const isCollapsed = !expandSidebar && !openSidebar;

    const handleParentClick = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else {
            setOpenSidebar(false);
        }
    };

    const wrapperClasses = cn(
        inter.className,
        'px-2 relative',
        isActive &&
            !hasChildren &&
            'after:absolute after:bottom-0 after:top-0 after:left-0 after:w-1 after:bg-primary after:rounded-r-md'
    );

    const renderMainItem = () => {
        const content = (
            <SidebarItemContent
                item={item}
                isActive={!!isActive}
                expandSidebar={expandSidebar}
                openSidebar={openSidebar}
                hasChildren={hasChildren}
                isOpen={isOpen}
            />
        );

        const wrappedContent = item.href ? (
            <Link href={item.href} onClick={handleParentClick}>
                {content}
            </Link>
        ) : (
            <div onClick={handleParentClick}>{content}</div>
        );

        if (isCollapsed) {
            return (
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>{wrappedContent}</TooltipTrigger>
                        <TooltipContent
                            side="right"
                            sideOffset={10}
                            className="bg-secondary text-white"
                        >
                            {item.label}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return wrappedContent;
    };

    return (
        <div className="flex flex-col">
            <div className={wrapperClasses}>{renderMainItem()}</div>
            {/* Render Children */}
            {hasChildren && (
                <div
                    className={cn(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                >
                    <div className="flex flex-col mt-1 gap-1">
                        {item.children?.map(child => {
                            const isChildActive = pathname.startsWith(child.href);
                            const childContent = (
                                <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`w-full justify-start font-normal rounded-md text-sm flex items-center py-2 cursor-pointer transition-colors ${
                                        isCollapsed ? 'px-3 justify-center' : 'pl-11 pr-5'
                                    } ${
                                        isChildActive
                                            ? 'text-white font-medium bg-primary/40'
                                            : 'text-white/70 hover:text-white hover:bg-primary/20'
                                    }`}
                                    onClick={() => setOpenSidebar(false)}
                                >
                                    <span
                                        className={cn(
                                            isCollapsed
                                                ? 'w-6 h-6 flex items-center justify-center rounded-sm bg-white/10 text-xs font-bold'
                                                : 'flex items-center',
                                            'whitespace-nowrap transition-all duration-300 w-full'
                                        )}
                                    >
                                        {isCollapsed ? (
                                            child.icon ? (
                                                <child.icon className="size-4" />
                                            ) : (
                                                child.label.charAt(0)
                                            )
                                        ) : (
                                            <>
                                                {child.icon && (
                                                    <child.icon className="size-4 mr-3 shrink-0" />
                                                )}
                                                {child.label}
                                            </>
                                        )}
                                    </span>
                                </Link>
                            );

                            if (isCollapsed) {
                                return (
                                    <div className="px-2" key={child.href}>
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    {childContent}
                                                </TooltipTrigger>
                                                <TooltipContent side="right" sideOffset={10}>
                                                    {child.label}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                );
                            }

                            return (
                                <div className="px-2" key={child.href}>
                                    {childContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
