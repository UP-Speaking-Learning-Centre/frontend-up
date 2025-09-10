import React from 'react';
import HeaderTitle from './title';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';

const Header = () => {
    const extrasRender = useDashboardLayoutStore(s => s.dashboardExtras);

    return (
        <div className="[grid-area:header] bg-white border-b flex items-center justify-between px-4">
            <HeaderTitle />
            {extrasRender}
        </div>
    );
};

export default Header;
