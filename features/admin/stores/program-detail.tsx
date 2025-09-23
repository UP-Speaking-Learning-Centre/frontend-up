import { ReactNode } from 'react';
import { create } from 'zustand';

interface DashboardLayoutStore {
    isDrawerOpen: boolean;
    drawerId?: number;
    content?: ReactNode;
    title: string;
    setState: (value: Partial<DashboardLayoutStore>) => void;
}

const initialState = {
    isDrawerOpen: false,
    drawerId: undefined,
    content: undefined,
    title: '',
};

export const useProgramDetailStore = create<DashboardLayoutStore>(set => ({
    ...initialState,
    setState(value) {
        set(value);
    },
}));

useProgramDetailStore.getState();
