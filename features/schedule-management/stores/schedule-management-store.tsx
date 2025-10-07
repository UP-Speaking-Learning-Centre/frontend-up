import { StudentOfStudyGroup } from '@/types/students';
import { StudyGroupDetailAdmin } from '@/types/study-group';
import { create } from 'zustand';

type ScheduleManagementStore = {
    loadingGetTeacherSchedule: boolean;
    setLoadingGetTeacherSchedule: (loading: boolean) => void;
    selectedStudyGroup: StudyGroupDetailAdmin | null;
    locationId: number | null;
    setLocationId: (locationId: number) => void;
    studentsOfSelectedStudyGroup: StudentOfStudyGroup[];
    studyGroupId: number | null;
    setSelectedStudyGroup: (studyGroup: StudyGroupDetailAdmin) => void;
    setStudyGroupId: (studyGroupId: number) => void;
    setStudentsOfSelectedStudyGroup: (students: StudentOfStudyGroup[]) => void;
};

export const useScheduleManagementStore = create<ScheduleManagementStore>()(set => ({
    loadingGetTeacherSchedule: false,
    setLoadingGetTeacherSchedule: (loading: boolean) => set({ loadingGetTeacherSchedule: loading }),
    selectedStudyGroup: null,
    locationId: null,
    setLocationId: (locationId: number) => set({ locationId: locationId }),
    studyGroupId: null,
    studentsOfSelectedStudyGroup: [],
    setSelectedStudyGroup: (studyGroup: StudyGroupDetailAdmin) =>
        set({ selectedStudyGroup: studyGroup }),
    setStudyGroupId: (studyGroupId: number) => set({ studyGroupId: studyGroupId }),
    setStudentsOfSelectedStudyGroup: (students: StudentOfStudyGroup[]) =>
        set({ studentsOfSelectedStudyGroup: students }),
}));
