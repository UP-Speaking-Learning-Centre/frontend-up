import { create } from 'zustand';
import { FunnelStage, LeadStatus, Role } from '../types';

export interface NonUserFilterState {
    isDrawerOpen: boolean;
    isPicDefault: boolean;
    filters: {
        studentName: string;
        funnelStage: string | undefined;
        leadStatus: string | undefined;
        pic: string[];
        lastFollowUp: string | undefined;
    };
    setDrawerOpen: (isOpen: boolean) => void;
    applyFilters: (newFilters: NonUserFilterState['filters'], isPicDefaultUpdate?: boolean) => void;
    resetFilters: () => void;
}

const initialFilters = {
    studentName: '',
    funnelStage: undefined,
    leadStatus: undefined,
    pic: [],
    lastFollowUp: undefined,
};

export const useNonUserFilterStore = create<NonUserFilterState>(set => ({
    isDrawerOpen: false,
    isPicDefault: true,
    filters: initialFilters,
    setDrawerOpen: isOpen => set({ isDrawerOpen: isOpen }),
    applyFilters: (newFilters, isPicDefaultUpdate) => set(state => ({ 
        filters: newFilters, 
        isDrawerOpen: false, 
        // if explicitly passed, update it, otherwise keep it (or default to false if first interaction)
        isPicDefault: isPicDefaultUpdate !== undefined ? isPicDefaultUpdate : false 
    })),
    resetFilters: () => set({ filters: initialFilters, isPicDefault: true }),
}));
