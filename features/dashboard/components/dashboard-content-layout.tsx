'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';

const DashboardContentLayout = ({
    children,
    pageTitle,
    extras,
}: {
    children: React.ReactNode;
    pageTitle: string;
    extras?: ReactNode;
}) => {
    const setDashboardHeaderTitle = useDashboardLayoutStore(s => s.setDashboardHeaderTitle);
    const setDashboardExtras = useDashboardLayoutStore(s => s.setDashboardExtras);

    useEffect(() => {
        setDashboardHeaderTitle(pageTitle);
        setDashboardExtras(extras);
    }, [pageTitle, extras]);

    return <div>{children}</div>;
};

export default DashboardContentLayout;
