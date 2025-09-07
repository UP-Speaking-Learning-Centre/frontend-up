'use client';

import React from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';

const HeaderTitle = () => {
    const dashboardHeaderTitle = useDashboardLayoutStore(state => state.dashboardHeaderTitle);

    return <div className="[grid-area:title] text-lg font-bold">{dashboardHeaderTitle}</div>;
};

export default HeaderTitle;
