'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';
import useAuthStore from '@/features/auth/stores/authStore';
import { isAdmin } from '@/features/auth/utils/auth-client.helper';
import { logout } from '@/features/auth/utils/auth-server.helper';
import { Role } from '@/features/non-user/types';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import {
    BookCheckIcon,
    Calendar,
    ChevronRight,
    ChevronsLeftRight,
    FileText,
    Home,
    LocateIcon,
    LogOut,
    PersonStanding,
    UserPlus2,
    Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SidebarItem from './item';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const sidebarItemsAdmin = [
    { href: ROUTES.adminNewStudents, label: 'New Students', icon: UserPlus2 },
    { href: ROUTES.adminStudents, label: 'List Students', icon: Users },
    {
        label: 'Non User',
        icon: Users,
        children: [
            { href: ROUTES.adminNonUserMarketing, label: 'By Marketing Team', icon: Users },
            { href: ROUTES.adminNonUserAdmin, label: 'By Admin Team', icon: Users },
        ],
    },
    {
        href: ROUTES.adminStaffManagement,
        label: 'Staff Management',
        icon: Users,
    },
    {
        href: ROUTES.adminPlacementTests,
        label: 'Placement Tests',
        icon: FileText,
    },
    {
        href: ROUTES.adminTeacherManagement,
        label: 'Teacher Management',
        icon: PersonStanding,
    },
    {
        href: ROUTES.adminLocationManagement,
        label: 'Location Management',
        icon: LocateIcon,
    },
    {
        href: ROUTES.adminProgramManagement,
        label: 'Program Management',
        icon: BookCheckIcon,
    },
    {
        href: ROUTES.adminScheduleManagement,
        label: 'Schedule Management',
        icon: Calendar,
    },
];

const sidebarItemsUser = [
    { href: ROUTES.dashboardStudents, label: 'Detail Students', icon: Users },
    {
        href: ROUTES.dashboardListStudents,
        label: 'List Students',
        icon: FileText,
    },
];

const Sidebar = () => {
    const router = useRouter();
    // TODO: get user role from auth store
    const role = useAuthStore(s => s.role);
    const open = useDashboardLayoutStore(s => s.openSidebar);
    const setOpen = useDashboardLayoutStore(s => s.setOpenSidebar);
    const expandSidebar = useDashboardLayoutStore(s => s.expandSidebar);
    const setExpandSidebar = useDashboardLayoutStore(s => s.setExpandSidebar);

    const [sidebarMenu, setSidebarMenu] = React.useState<
        {
            href?: string;
            label: string;
            icon: React.ComponentType<{ className?: string }>;
            children?: {
                href: string;
                label: string;
                icon?: React.ComponentType<{ className?: string }>;
            }[];
        }[]
    >([]);

    useEffect(() => {
        let menuItems = [];

        const isMarketing = [Role.LeadMarketing, Role.StaffMarketing].includes(role as Role);
        const isAdminTeam = [Role.LeadAdmin, Role.StaffAdminBabyBear, Role.StaffAdminPapaBear, Role.StaffAdminMamaBear].includes(role as Role);

        if (role === Role.SuperAdmin || isAdmin(role)) {
            menuItems = sidebarItemsAdmin;
        } else if (isMarketing) {
            menuItems = sidebarItemsAdmin.map(item => {
                if (item.label === 'Non User') {
                    return {
                        ...item,
                        children: item.children?.filter(child => child.href === ROUTES.adminNonUserMarketing),
                    };
                }
                return item;
            });
        } else if (isAdminTeam) {
            menuItems = sidebarItemsAdmin.map(item => {
                if (item.label === 'Non User') {
                    return {
                        ...item,
                        children: item.children?.filter(child => child.href === ROUTES.adminNonUserAdmin),
                    };
                }
                return item;
            });
        } else {
            menuItems = sidebarItemsUser;
        }

        setSidebarMenu(menuItems);
    }, [role]);

    const handleLogout = async () => {
        await logout().then(() => {
            router.replace(ROUTES.login);
            setOpen(false);
        });
    };

    const generateSidebarHeader = () => {
        if (isAdmin(role)) {
            return (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'relative transition-all duration-300',
                                expandSidebar ? 'size-12 mb-0' : 'size-9 mb-3'
                            )}
                        >
                            <Image src={'/logo-black.png'} fill alt="Logo UP" />
                        </div>
                    </div>
                    <div
                        className={cn(
                            'w-[1px] h-6 bg-white rounded-xl transition-all duration-300',
                            expandSidebar ? 'opacity-100' : 'opacity-0'
                        )}
                    ></div>
                    <span
                        className={cn(
                            'text-xl font-bold transition-all duration-300  text-white whitespace-nowrap',
                            expandSidebar ? 'opacity-100' : 'opacity-0'
                        )}
                    >
                        Admin
                    </span>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-start">
                <span className="text-sm text-white">Welcome Back,</span>
                <p className="text-xl font-bold text-white">Parents</p>
            </div>
        );
    };

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-full h-screen sm:max-w-[280px] p-0 border-0">
                    <SheetTitle />
                    <div className="py-4 flex flex-col h-full bg-secondary">
                        <div className="px-6 mb-8">{generateSidebarHeader()}</div>
                        <div className="space-y-1 flex-1 px-3">
                            {sidebarMenu.map(item => {
                                return <SidebarItem item={item} key={item.href || item.label} />;
                            })}
                        </div>
                        <div className="px-3 pt-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-normal text-white hover:text-white hover:bg-primary/80"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-3" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    'hidden fixed left-0 inset-y-0 [grid-area:sidebar] md:flex h-full flex-col transition-all duration-300 bg-secondary shadow-sm border-r',
                    expandSidebar ? 'w-[260px]' : 'w-[80px]'
                )}
            >
                <div className="py-6 flex flex-col h-full">
                    <div className="px-6 mb-8">{generateSidebarHeader()}</div>
                    <div className="space-y-1 flex-1 relative">
                        <div
                            className="absolute size-10 cursor-pointer rounded-full border-4 border-secondary bg-white -top-10  flex items-center justify-center  shadow-xl -right-4"
                            onClick={() => setExpandSidebar(!expandSidebar)}
                        >
                            <ChevronsLeftRight className="size-6 text-primary" />
                        </div>
                        {sidebarMenu.map(item => (
                            <SidebarItem item={item} key={item.href || item.label} />
                        ))}
                    </div>
                    <div className="px-3 pt-4 border-t">
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal text-white hover:text-white hover:bg-primary/80"
                            onClick={handleLogout}
                        >
                            <LogOut className="size-5 mr-3" />
                            <span className={cn(expandSidebar ? 'opacity-100' : 'opacity-0')}>
                                Logout
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
