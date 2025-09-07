import { create } from 'zustand';

interface DashboardLayoutStore {
    dashboardHeaderTitle: string;
    setDashboardHeaderTitle: (title: string) => void;
    isDashboardReady: boolean;
    hydrate: () => void;
}

export const useDashboardLayoutStore = create<DashboardLayoutStore>(set => ({
    dashboardHeaderTitle: '',
    setDashboardHeaderTitle: (title: string) => set({ dashboardHeaderTitle: title }),
    isDashboardReady: false,
    hydrate: () => {
        setTimeout(() => {
            set({ isDashboardReady: true });
        }, 1000);
    },
}));

useDashboardLayoutStore.getState().hydrate();
