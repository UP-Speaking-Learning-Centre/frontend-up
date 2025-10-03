import { PriceData } from '@/types/admin';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface DashboardLayoutStore {
    isPriceModalOpen: boolean;
    isDrawerOpen: boolean;
    drawerId?: number;
    content?: ReactNode;
    title: string;
    id: string;
    packageId: number,
    packages: PriceData[]
    setState: (value: Partial<DashboardLayoutStore>) => void;
}

const initialState = {
    isPriceModalOpen: false,
    isDrawerOpen: false,
    drawerId: undefined,
    content: undefined,
    title: '',
    id: '',
    packageId: 0,
    packages: [],
};

export const useProgramDetailStore = create<DashboardLayoutStore>(set => ({
    ...initialState,
    setState(value) {
        set(value);
    },
}));

useProgramDetailStore.getState();
