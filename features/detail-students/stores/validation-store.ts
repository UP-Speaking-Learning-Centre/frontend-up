import { create } from 'zustand';

interface ValidationState {
    validationError: string | null;
    setValidationError: (error: string | null) => void;
}

export const useValidationStore = create<ValidationState>((set) => ({
    validationError: null,
    setValidationError: (error) => set({ validationError: error })
}));
