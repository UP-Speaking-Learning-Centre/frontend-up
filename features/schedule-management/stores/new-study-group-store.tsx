import { create } from 'zustand';

export interface InitialValue {
    title: string;
    description: string;
    programId: number | string;
    groupId: number | string;
    levelId: number | string;
    locationId: number | string;
    alias: string[];
    gradeId: number | string;
    packageId: number | string;
    day1: string;
    time1: string;
    day2: string;
    time2: string;
    teacherTeamMemberId: number;
    teacherMemberName: string;
    listTeachers: { teacherMemberName: string; teacherMemberId: number }[];
    listDays: string[];
    listTimes: string[];
    scheduleId1: number;
    scheduleId2: number;
    isCustomTime1: boolean;
    isCustomTime2: boolean;
}
interface StudyGroupStore {
    formValue: InitialValue;
    resetAll: () => void;
    resetFormValue: (key: keyof InitialValue) => void;
    setValue: (value: Partial<{ [key in keyof InitialValue]: any }>) => void;
}

const resetFormValue = (key: keyof InitialValue) => {
    switch (key) {
        case 'programId':
            return {
                groupId: '',
                levelId: '',
                gradeId: '',
                packageId: '',
                locationId: '',
                location: '',
                alias: [],
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                teacherMemberName: '',
                listTeachers: [],
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'groupId':
            return {
                levelId: '',
                gradeId: '',
                packageId: '',
                locationId: '',
                location: '',
                alias: [],
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                teacherMemberName: '',
                listTeachers: [],
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'levelId':
            return {
                gradeId: '',
                packageId: '',
                locationId: '',
                location: '',
                alias: [],
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                listTeachers: [],
                teacherMemberName: '',
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'gradeId':
            return {
                packageId: '',
                locationId: '',
                location: '',
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                listTeachers: [],
                teacherMemberName: '',
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'packageId':
            return {
                locationId: '',
                location: '',
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                listTeachers: [],
                scheduleId1: 0,
                scheduleId2: 0,
                teacherMemberName: '',
            };
        case 'locationId':
            return {
                location: '',
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                teacherTeamMemberId: 0,
                listTeachers: [],
                scheduleId1: 0,
                scheduleId2: 0,
                teacherMemberName: '',
            };
        case 'teacherMemberName':
            return {
                day1: '',
                time1: '',
                day2: '',
                time2: '',
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'day1':
            return {
                time1: '',
                day2: '',
                time2: '',
                scheduleId1: 0,
                scheduleId2: 0,
            };
        case 'time1':
            return {
                day2: '',
                time2: '',
                scheduleId2: 0,
            };
        case 'day2':
            return {
                time2: '',
                scheduleId2: 0,
            };
        default:
            return {};
    }
};

const initialValue: InitialValue = {
    title: '',
    description: '',
    programId: '',
    groupId: '',
    levelId: '',
    locationId: '',
    gradeId: '',
    packageId: '',
    alias: [],
    day1: '',
    teacherMemberName: '',
    time1: '',
    day2: '',
    time2: '',
    listTeachers: [],
    teacherTeamMemberId: 0,
    listDays: [],
    listTimes: [],
    scheduleId1: 0,
    scheduleId2: 0,
    isCustomTime1: false,
    isCustomTime2: false,
};

export const useNewStudyGroupStore = create<StudyGroupStore>()(set => ({
    formValue: initialValue,
    resetAll: () => set({ formValue: initialValue }),
    resetFormValue: (key: keyof InitialValue) =>
        set(state => ({ formValue: { ...state.formValue, ...resetFormValue(key) } })),
    setValue: (value: Partial<InitialValue>) =>
        set(state => ({ formValue: { ...state.formValue, ...value } })),
}));
