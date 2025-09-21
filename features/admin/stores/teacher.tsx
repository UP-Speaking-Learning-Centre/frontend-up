import { TeacherAdmin } from '@/types/admin';
import { create } from 'zustand';

interface TeacherStore {
    teacher: TeacherAdmin[];
    setTeacher: (teacher: TeacherAdmin[]) => void;
}

const initialState = {
    teacher: [],
};

export const useTeacherManagementStore = create<TeacherStore>(set => ({
    ...initialState,
    setTeacher(teacher) {
        set({ teacher });
    },
}));

useTeacherManagementStore.getState();
