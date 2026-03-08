'use client';

import { useNonUserFilterStore } from '../stores/filter-store';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { inter } from '@/constants/fonts';
import { X } from 'lucide-react';
import { NonUserFilterForm } from './filter-form';

interface NonUserFilterDrawerProps {
    menuType: 'marketing' | 'admin';
}

const NonUserFilterDrawer = ({ menuType }: NonUserFilterDrawerProps) => {
    const isDrawerOpen = useNonUserFilterStore(s => s.isDrawerOpen);
    const setDrawerOpen = useNonUserFilterStore(s => s.setDrawerOpen);

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen} direction="right">
            <DrawerTitle className="sr-only">Filter Non User</DrawerTitle>
            <DrawerContent
                className={cn(`overflow-y-auto h-full w-[400px] rounded-none`, inter.className)}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-md font-bold text-gray-900">Filters</h2>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    <NonUserFilterForm menuType={menuType} />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default NonUserFilterDrawer;
