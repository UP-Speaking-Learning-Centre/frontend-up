'use client';
import { X } from 'lucide-react';
import { useProgramDetailStore } from '../stores/program-detail';
import clsx from 'clsx';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { inter } from '@/constants/fonts';

const ProgramDetailDrawer = () => {
    const setState = useProgramDetailStore(s => s.setState);
    const isDrawerOpen = useProgramDetailStore(s => s.isDrawerOpen);
    const content = useProgramDetailStore(s => s.content);
    const title = useProgramDetailStore(s => s.title);

    return (
        <Drawer open={isDrawerOpen} onOpenChange={() => setState({ isDrawerOpen: false, id: '' })}>
            <DrawerTitle className="sr-only"></DrawerTitle>
            <DrawerContent className={cn(`overflow-y-auto`, inter.className)}>
                <div className="flex items-center justify-between p-[9.5px] px-4 border-b">
                    <h2 className="text-md font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={() => setState({ isDrawerOpen: false, id: '' })}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {content}
            </DrawerContent>
        </Drawer>
    );
};

export default ProgramDetailDrawer;
