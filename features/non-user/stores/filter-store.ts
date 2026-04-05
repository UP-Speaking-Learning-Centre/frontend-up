import { create } from 'zustand';

export interface NonUserFilterState {
    isDrawerOpen: boolean;
    filters: {
        studentName: string;
        funnelStage: string | undefined;
        statusLead: string | undefined;
        picRole: string[];
        picStaff: string[];
        lastFollowUpFrom: string | undefined;
        lastFollowUpTo: string | undefined;
    };
    setDrawerOpen: (isOpen: boolean) => void;
    applyFilters: (newFilters: NonUserFilterState['filters']) => void;
    resetFilters: () => void;
}

const initialFilters = {
    studentName: '',
    funnelStage: undefined,
    statusLead: undefined,
    picRole: [],
    picStaff: [],
    lastFollowUpFrom: undefined,
    lastFollowUpTo: undefined,
};

export const useNonUserFilterStore = create<NonUserFilterState>(set => ({
    isDrawerOpen: false,
    filters: initialFilters,
    setDrawerOpen: isOpen => set({ isDrawerOpen: isOpen }),
    applyFilters: newFilters =>
        set({
            filters: newFilters,
            isDrawerOpen: false,
        }),
    resetFilters: () => set({ filters: initialFilters }),
}));
