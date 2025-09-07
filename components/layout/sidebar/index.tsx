'use client';

import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { FileText, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarItem from './item';

const sidebarItems = [
    { id: 'students', href: '/admin/students', label: 'List Students', icon: Users },
    {
        id: 'placement-tests',
        href: '/admin/placement-tests',
        label: 'Placement Tests',
        icon: FileText,
    },
];

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const handleLogout = () => {};

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-full sm:max-w-[280px] p-0">
                    <div className="py-4 flex flex-col h-full bg-white">
                        <div className="px-6 mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-sm">
                                    UP
                                </div>
                                <span className="text-lg font-bold text-[#254116]">
                                    Admin Panel
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1 flex-1 px-3">
                            {sidebarItems.map(item => {
                                return <SidebarItem item={item} key={item.href} />;
                            })}
                        </div>
                        <div className="px-3 pt-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-normal text-red-600 hover:bg-red-50"
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
            <div className="hidden fixed left-0 inset-y-0 w-[240px] [grid-area:sidebar] md:flex h-full flex-col bg-secondary shadow-sm border-r">
                <div className="py-6 flex flex-col h-full">
                    <div className="px-6 mb-8">
                        <div className="flex flex-col items-start">
                            <span className="text-xl font-bold text-white">Admin Dashboard</span>
                            <p className="text-sm text-white">UP SLC</p>
                        </div>
                    </div>
                    <div className="space-y-1 flex-1">
                        {sidebarItems.map(item => (
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
