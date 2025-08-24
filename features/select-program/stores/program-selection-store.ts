import { create } from 'zustand';

type ProgramSelectionStore = {
    currentStep: number;
    formValue: FormValue;
    setCurrentStep: (step: number) => void;
    setFormValue: (value: Partial<FormValue>) => void;
    hydrate: () => void;
};

export type FormValue = {
    programCategory: string;
    group: string;
    level: string;
    grade: string;
    package: string;
    schedule: string;
    payment: string;
    personalInformation: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
};

const formValue: FormValue = {
    programCategory: '',
    group: '',
    level: '',
    grade: '',
    package: '',
    schedule: '',
    payment: '',
    personalInformation: {
        name: '',
        email: '',
        phone: '',
        address: '',
    },
};

const useProgramSelectionStore = create<ProgramSelectionStore>()((set, get) => ({
    currentStep: 0,
    formValue,
    setCurrentStep: (step: number) => {
        set({ currentStep: step });
        // localStorage.setItem('currentStep', step.toString());
    },
    setFormValue: (value: Partial<FormValue>) => {
        const getFormValue = get().formValue;
        set({ formValue: { ...getFormValue, ...value } });
        // localStorage.setItem('formValue', JSON.stringify({ ...getFormValue, ...value }));
    },
    hydrate: async () => {
        if (typeof window === 'undefined') {
            return;
        }
        console.log('ad');
        const storedStep = localStorage.getItem('currentStep');
        const storedFormValue = localStorage.getItem('formValue');

        if (storedStep) {
            set({ currentStep: parseInt(storedStep) });
        }
        if (storedFormValue) {
            set({ formValue: JSON.parse(storedFormValue) });
        }
    },
}));

export default useProgramSelectionStore;

useProgramSelectionStore.getState().hydrate();
