import { StudentOfStudyGroup } from '@/types/students';
import { StudyGroup } from '@/types/study-group';
import { create } from 'zustand';

type ScheduleManagementStore = {
    loadingGetTeacherSchedule: boolean;
    setLoadingGetTeacherSchedule: (loading: boolean) => void;
    selectedStudyGroup: StudyGroup | null;
    locationId: number | null;
    setLocationId: (locationId: number) => void;
    studentsOfSelectedStudyGroup: StudentOfStudyGroup[];
    studyGroupId: number | null;
    setSelectedStudyGroup: (studyGroup: StudyGroup) => void;
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
    setSelectedStudyGroup: (studyGroup: StudyGroup) => set({ selectedStudyGroup: studyGroup }),
    setStudyGroupId: (studyGroupId: number) => set({ studyGroupId: studyGroupId }),
    setStudentsOfSelectedStudyGroup: (students: StudentOfStudyGroup[]) =>
        set({ studentsOfSelectedStudyGroup: students }),
}));
