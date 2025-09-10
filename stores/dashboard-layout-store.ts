import { ReactNode } from 'react';
import { create } from 'zustand';

interface DashboardLayoutStore {
    dashboardHeaderTitle: string;
    setDashboardHeaderTitle: (title: string) => void;
    isDashboardReady: boolean;
    dashboardExtras?: ReactNode;
    setDashboardExtras: (node: ReactNode) => void;
    hydrate: () => void;
}

export const useDashboardLayoutStore = create<DashboardLayoutStore>(set => ({
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
