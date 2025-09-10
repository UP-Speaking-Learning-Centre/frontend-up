import { DAY } from '@/constants/program-selections';
import { DayOfWeekType } from '@/types/programs-selection';
import { create } from 'zustand';

type ProgramSelectionStore = {
    currentStep: number;
    formValue: FormValue;
    setCurrentStep: (step: number) => void;
    setFormValue: (value: Partial<FormValue>) => void;
    setFirstSessionSchedule: (value: Partial<FormValue['schedule']['firstSession']>) => void;
    setSecondSessionSchedule: (value: Partial<FormValue['schedule']['secondSession']>) => void;
    hydrate: () => void;
};

export type FormValue = {
    programId: number | string;
    programName: string;
    groupId: number | string;
    groupName: string;
    levelId: number | string;
    levelName: string;
    gradeId: number | string;
    gradeName: string;
    taughtBy: string[];
    locationId: number | string;
    locationName: string;
    packageId: number | string;
    packageName: string;
    payment: string;
    schedule: {
        firstSession: {
            dayOfWeek: DayOfWeekType;
            startTime: string;
            endTime: string;
            teacherMemberId: number;
            teacherScheduleId: number;
            teacherMemberName: string;
        };
        secondSession: {
            dayOfWeek: DayOfWeekType;
            startTime: string;
            endTime: string;
            teacherScheduleId: number;
            teacherMemberId: number;
            teacherMemberName: string;
        };
    };
    personalInformation: {
        name: string;
        instagram: string;
        phone: string;
    };
};

const formValue: FormValue = {
    programId: 0,
    programName: '',
    groupId: 0,
    groupName: '',
    levelId: 0,
    levelName: '',
    gradeId: 0,
    gradeName: '',
    taughtBy: [],
    locationId: 0,
    locationName: '',
    packageId: 0,
    packageName: '',
    schedule: {
        firstSession: {
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            teacherScheduleId: 0,
            teacherMemberId: 0,
            teacherMemberName: '',
        },
        secondSession: {
            dayOfWeek: '',
            startTime: '',
            endTime: '',
            teacherScheduleId: 0,
            teacherMemberId: 0,
            teacherMemberName: '',
        },
    },
    payment: '',
    personalInformation: {
        name: '',
        instagram: '',
        phone: '',
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
    setFirstSessionSchedule: (value: Partial<FormValue['schedule']['firstSession']>) => {
        const getFormValue = get().formValue;
        set({
            formValue: {
                ...getFormValue,
                schedule: {
                    ...getFormValue.schedule,
                    firstSession: { ...getFormValue.schedule.firstSession, ...value },
                },
            },
        });
    },
    setSecondSessionSchedule: (value: Partial<FormValue['schedule']['secondSession']>) => {
        const getFormValue = get().formValue;
        set({
            formValue: {
                ...getFormValue,
                schedule: {
                    ...getFormValue.schedule,
                    secondSession: { ...getFormValue.schedule.secondSession, ...value },
                },
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
