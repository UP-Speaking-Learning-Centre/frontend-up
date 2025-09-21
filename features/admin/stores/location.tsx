import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { create } from 'zustand';

interface AdminStore {
    location: LocationAdmin[];
    setLocation: (location: LocationAdmin[]) => void;
    teacher: TeacherAdmin[];
    setTeacher: (teacher: TeacherAdmin[]) => void;
}

const initialState = {
    location: [],
    teacher: [],
};

export const useLocationManagementStore = create<AdminStore>(set => ({
    ...initialState,
    setLocation(location) {
        set({ location });
    },
    setTeacher(teacher) {
        set({ teacher });
    },
}));

useLocationManagementStore.getState();
