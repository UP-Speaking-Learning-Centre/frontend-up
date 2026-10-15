import {
    CHOOSE_GROUP_STEP,
    CHOOSE_LEVEL_STEP,
    CHOOSE_PACKAGE_STEP,
    CHOOSE_PROGRAM_STEP,
    CHOOSE_SCHEDULE_STEP,
    CHOOSE_SELF_SCHEDULE_STEP,
    CHOOSE_TRIAL_CLASS_STEP,
    PROGRAM_SELECTION_STEPS,
} from '@/constants/program-selections';
import { ProgramDetailPrice } from '@/types/programs-selection';
import { StudyGroup } from '@/types/study-group';
import { create } from 'zustand';

type ProgramSelectionStore = {
    currentStep: number;
    formValue: FormValue;
    setCurrentStep: (step: number) => void;
    setFormValue: (value: Partial<FormValue>) => void;
    setStudentInfo: (value: Partial<FormValue['personalInformation']>) => void;
    resetBasedOnStep: (step: (typeof PROGRAM_SELECTION_STEPS)[number]) => void;
    hydrate: () => void;
};

export type FormValue = {
    programId: number | string;
    programName: string;
    groupId: number | string;
    groupName: string;
    levelId: number | string;
    levelName: string;
    gradeId?: number | string;
    gradeName?: string;
    isUseSelfSchedule: boolean;
    taughtBy: string[];
    locationId: number | string;
    programPrices: ProgramDetailPrice[];
    locationName: string;
    packageId: number | string;
    packageName: string;
    payment: string;
    studyGroupId: number | string;
    selfSchedule: { dayOfWeek: string; startTime: string }[];
    trialClassAt: string;
    studyGroupDetail: StudyGroup | null;
    personalInformation: {
        name: string;
        instagram: string;
        phone: string;
    };
};

const initialFormBasedOnStep = {
    [CHOOSE_PROGRAM_STEP]: {
        programId: 0,
        programName: '',
        programPrices: [],
    },
    [CHOOSE_GROUP_STEP]: {
        groupId: 0,
        groupName: '',
    },
    [CHOOSE_LEVEL_STEP]: {
        levelId: 0,
        levelName: '',
    },
    [CHOOSE_PACKAGE_STEP]: {
        packageId: 0,
        packageName: '',
    },
    [CHOOSE_SCHEDULE_STEP]: {
        studyGroupId: 0,
        studyGroupDetail: null,
        isUseSelfSchedule: false,
        locationId: 0,
        locationName: '',
    },
    [CHOOSE_SELF_SCHEDULE_STEP]: {
        selfSchedule: [],
    },
    [CHOOSE_TRIAL_CLASS_STEP]: {
        trialClassAt: '',
    },
};

export const initialFormValue: FormValue = {
    ...initialFormBasedOnStep[CHOOSE_PROGRAM_STEP],
    ...initialFormBasedOnStep[CHOOSE_GROUP_STEP],
    ...initialFormBasedOnStep[CHOOSE_LEVEL_STEP],
    ...initialFormBasedOnStep[CHOOSE_PACKAGE_STEP],
    ...initialFormBasedOnStep[CHOOSE_SCHEDULE_STEP],
    ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
    ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
    taughtBy: [],
    payment: '',
    personalInformation: {
        name: '',
        instagram: '',
        phone: '',
    },
};

const resetFormValue = (step: (typeof PROGRAM_SELECTION_STEPS)[number]) => {
    switch (step) {
        case CHOOSE_PROGRAM_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_GROUP_STEP],
                ...initialFormBasedOnStep[CHOOSE_LEVEL_STEP],
                ...initialFormBasedOnStep[CHOOSE_PACKAGE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };

        case CHOOSE_GROUP_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_LEVEL_STEP],
                ...initialFormBasedOnStep[CHOOSE_PACKAGE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };
        case CHOOSE_LEVEL_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_PACKAGE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };
        case CHOOSE_PACKAGE_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };
        case CHOOSE_SCHEDULE_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_SELF_SCHEDULE_STEP],
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };
        case CHOOSE_SELF_SCHEDULE_STEP:
            return {
                ...initialFormBasedOnStep[CHOOSE_TRIAL_CLASS_STEP],
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };
        case CHOOSE_TRIAL_CLASS_STEP:
            return {
                personalInformation: {
                    name: '',
                    instagram: '',
                    phone: '',
                },
            };

        default:
            return {};
    }
};

const useProgramSelectionStore = create<ProgramSelectionStore>()((set, get) => ({
    currentStep: 0,
    formValue: initialFormValue,
    setCurrentStep: (step: number) => {
        set({ currentStep: step });
    },
    setFormValue: (value: Partial<FormValue>) => {
        const getFormValue = get().formValue;
        set({ formValue: { ...getFormValue, ...value } });
    },
    resetBasedOnStep: (step: (typeof PROGRAM_SELECTION_STEPS)[number]) => {
        const getFormValue = get().formValue;
        const resetValue = resetFormValue(step);
        set({ formValue: { ...getFormValue, ...resetValue } });
    },
    setStudentInfo: (value: Partial<FormValue['personalInformation']>) => {
        const getFormValue = get().formValue;
        set({
            formValue: {
                ...getFormValue,
                personalInformation: { ...getFormValue.personalInformation, ...value },
            },
        });
    },
    hydrate: async () => {
        if (typeof window === 'undefined') {
            return;
        }

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
