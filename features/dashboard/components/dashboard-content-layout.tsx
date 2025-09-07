import React, { useEffect } from 'react';
import { useDashboardLayoutStore } from '@/stores/dashboard-layout-store';

const DashboardContentLayout = ({
    children,
    pageTitle,
}: {
    children: React.ReactNode;
    pageTitle: string;
}) => {
    const setDashboardHeaderTitle = useDashboardLayoutStore(s => s.setDashboardHeaderTitle);
    useEffect(() => {
        setDashboardHeaderTitle(pageTitle);
    }, [pageTitle]);

    return <div>{children}</div>;
};

export default DashboardContentLayout;
