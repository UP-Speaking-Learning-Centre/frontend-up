import { TeacherAdmin } from '@/types/admin';
import { Pagination } from '@/types/general';
import { create } from 'zustand';

interface TeacherStore {
    teacher: TeacherAdmin[];
    setTeacher: (teacher: TeacherAdmin[]) => void;
    setPagination: (pagination: Pagination) => void;
    pagination: Pagination;
}

const initialState = {
    teacher: [],
    pagination: {
        totalItems: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
        itemCount: 0,
    },
};

export const useTeacherManagementStore = create<TeacherStore>(set => ({
    ...initialState,
    setTeacher(teacher) {
        set({ teacher });
    },
    setPagination(pagination) {
        set({ pagination });
    },
}));

useTeacherManagementStore.getState();
