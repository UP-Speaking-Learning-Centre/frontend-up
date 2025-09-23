import { create } from 'zustand';

export interface InitialValue {
    title: string;
    description: string;
    programId: number;
    groupId: number;
    levelId: number;
    locationId: number;
    gradeId: number;
    packageId: number;
    day1: string;
    time1: string;
    day2: string;
    time2: string;
    teacherTeamMemberId: number;
    scheduleIds: number[];
}
interface StudyGroupStore {
    initialValue: InitialValue;
    setValue: (key: keyof InitialValue, value: any) => void;
}

const initialValue: InitialValue = {
    title: '',
    description: '',
    programId: 0,
    groupId: 0,
    levelId: 0,
    locationId: 0,
    gradeId: 0,
    packageId: 0,
    day1: '',
    time1: '',
    day2: '',
    time2: '',
    teacherTeamMemberId: 0,
    scheduleIds: [],
};

export const useNewStudyGroupStore = create<StudyGroupStore>()(set => ({
    initialValue,
    setValue: (key: keyof InitialValue, value: any) =>
        set({ initialValue: { ...initialValue, [key]: value } }),
}));
