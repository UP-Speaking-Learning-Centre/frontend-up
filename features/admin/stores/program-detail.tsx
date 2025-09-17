import { ReactNode } from 'react';
import { create } from 'zustand';

interface DashboardLayoutStore {
    isDrawerOpen: boolean;
    drawerId?: number;
    setState: (value: Partial<DashboardLayoutStore>) => void;
}

const initialState = {
    isDrawerOpen: false,
    drawerId: undefined,
};

export const useProgramDetailStore = create<DashboardLayoutStore>(set => ({
    ...initialState,
    setState(value) {
        set(value);
    },
}));

useProgramDetailStore.getState();
