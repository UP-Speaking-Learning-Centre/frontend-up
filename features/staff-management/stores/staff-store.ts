import { create } from 'zustand';
import { Role, StaffMember } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

// Extended mock generation for pagination testing
const generateMockStaff = (): StaffMember[] => {
    const roles = Object.values(Role);
    return Array.from({ length: 35 }, (_, i) => ({
        id: generateId(),
        name: `Staff Member ${i + 1}`,
        phone: `+6281234567${i.toString().padStart(3, '0')}`,
        role: roles[i % roles.length],
    }));
};

interface StaffStore {
    staffList: StaffMember[];
    addStaff: (staff: Omit<StaffMember, 'id'>) => void;
    updateStaff: (id: string, staff: Partial<StaffMember>) => void;
    deleteStaff: (id: string) => void;
}

export const useStaffStore = create<StaffStore>((set) => ({
    staffList: generateMockStaff(),
    addStaff: (newStaff) => set((state) => ({
        staffList: [...state.staffList, { ...newStaff, id: generateId() }]
    })),
    updateStaff: (id, updated) => set((state) => ({
        staffList: state.staffList.map(staff => 
            staff.id === id ? { ...staff, ...updated } : staff
        )
    })),
    deleteStaff: (id) => set((state) => ({
        staffList: state.staffList.filter(staff => staff.id !== id)
    })),
}));
