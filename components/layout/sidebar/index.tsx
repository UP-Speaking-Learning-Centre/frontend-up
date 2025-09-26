'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';
import useAuthStore from '@/features/auth/stores/authStore';
import { isAdmin } from '@/features/auth/utils/auth-client.helper';
import { logout } from '@/features/auth/utils/auth-server.helper';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import { BookCheckIcon, Calendar, FileText, Home, LocateIcon, LogOut, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SidebarItem from './item';

const sidebarItemsAdmin = [
    { href: ROUTES.adminStudents, label: 'List Students', icon: Users },
    {
        href: ROUTES.adminPlacementTests,
        label: 'Placement Tests',
        icon: FileText,
    },
    {
        href: ROUTES.adminTeacherManagement,
        label: 'Teacher Management',
        icon: Home,
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

    const [sidebarMenu, setSidebarMenu] = React.useState<
        { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]
    >([]);

    useEffect(() => {
        // TODO: get user role from auth store
        if (isAdmin(role)) {
            setSidebarMenu(sidebarItemsAdmin);
        } else {
            setSidebarMenu(sidebarItemsUser);
        }
    }, [role]);

    const handleLogout = async () => {
        await logout().then(() => {
            router.replace(ROUTES.login);
            setOpen(false);
        });
    };

    const generateSidebarHeader = () => {
        if (role === 'admin') {
            return (
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold text-white">Admin Dashboard</span>
                    <p className="text-sm text-white">UP SLC</p>
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
                <SheetContent side="left" className="w-full sm:max-w-[280px] p-0 border-0">
                    <SheetTitle />
                    <div className="py-4 flex flex-col h-full bg-secondary">
                        <div className="px-6 mb-8">{generateSidebarHeader()}</div>
                        <div className="space-y-1 flex-1 px-3">
                            {sidebarMenu.map(item => {
                                return <SidebarItem item={item} key={item.href} />;
                            })}
                        </div>
                        <div className="px-3 pt-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-normal text-white hover:text-white hover:bg-[#CE6439]/80"
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
            <div className="hidden left-0 inset-y-0 w-[260px] [grid-area:sidebar] md:flex h-full flex-col bg-secondary shadow-sm border-r">
                <div className="py-6 flex flex-col h-full">
                    <div className="px-6 mb-8">{generateSidebarHeader()}</div>
                    <div className="space-y-1 flex-1">
                        {sidebarMenu.map(item => (
                            <SidebarItem item={item} key={item.href} />
                        ))}
                    </div>
                    <div className="px-3 pt-4 border-t">
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal text-white hover:text-white hover:bg-[#CE6439]/80"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
