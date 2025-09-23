import React from 'react';
import HeaderTitle from './title';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inter } from '@/constants/fonts';

const Header = () => {
    const extrasRender = useDashboardLayoutStore(s => s.dashboardExtras);
    const setOpenSidebar = useDashboardLayoutStore(s => s.setOpenSidebar);

    return (
        <div className={cn(inter.className,"[grid-area:header] bg-white border-b flex items-center justify-between px-4 gap-4")}>
            <HeaderTitle />
            {extrasRender}
            <Button
                className="md:hidden"
                variant={'secondary'}
                onClick={() => setOpenSidebar(true)}
            >
                <Menu />
            </Button>
        </div>
    );
};

export default Header;
