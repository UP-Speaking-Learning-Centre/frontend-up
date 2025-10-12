import { PriceData } from '@/types/admin';
import { ReactNode } from 'react';
import { ZodFormattedError } from 'zod';
import { create } from 'zustand';

interface DashboardLayoutStore {
    isPriceModalOpen: boolean;
    isDrawerOpen: boolean;
    drawerId?: number;
    content?: ReactNode;
    title: string;
    id: string;
    packageId?: number;
    rawPackages: PriceData[];
    packages: PriceData[];
    setState: (value: Partial<DashboardLayoutStore>) => void;
    handleInputChange: (id: string, field: keyof PriceData, value: string) => void;
    error?: ZodFormattedError<{ timeframe: string; amount: number }[]>;
}

const initialState = {
    isPriceModalOpen: false,
    isDrawerOpen: false,
    drawerId: undefined,
    content: undefined,
    title: '',
    id: '',
    packageId: undefined,
    packages: [],
    error: undefined,
    rawPackages: [],
};

export const useProgramDetailStore = create<DashboardLayoutStore>((set, get) => ({
    ...initialState,
    setState(value) {
        set(value);
    },
    handleInputChange(id: string, field: keyof PriceData, value: string) {
        const packages = get().packages;
        set({
            packages: packages.map(pkg => (pkg.id === id ? { ...pkg, [field]: value } : pkg)),
        });
    },
}));

useProgramDetailStore.getState();
