import { ReactNode } from 'react';
import { create } from 'zustand';

interface DashboardLayoutStore {
    openSidebar: boolean;
    expandSidebar: boolean;
    setOpenSidebar: (openSidebar: boolean) => void;
    setExpandSidebar: (expandSidebar: boolean) => void;
    dashboardHeaderTitle: string;
    setDashboardHeaderTitle: (title: string) => void;
    isDashboardReady: boolean;
    dashboardExtras?: ReactNode;
    setDashboardExtras: (node: ReactNode) => void;
    hydrate: () => void;
}

export const useDashboardLayoutStore = create<DashboardLayoutStore>(set => ({
    openSidebar: false,
    setOpenSidebar: (openSidebar: boolean) => set({ openSidebar }),
    expandSidebar: true,
    setExpandSidebar: (expandSidebar: boolean) => set({ expandSidebar }),
    dashboardHeaderTitle: '',
    setDashboardHeaderTitle: (title: string) => set({ dashboardHeaderTitle: title }),
    isDashboardReady: false,
    dashboardExtras: undefined,
    setDashboardExtras(node) {
        set({ dashboardExtras: node });
    },
    hydrate: () => {
        setTimeout(() => {
            set({ isDashboardReady: true });
        }, 1000);
    },
}));

useDashboardLayoutStore.getState().hydrate();
