import { Pagination } from '@/types/general';
import { StudentPlacementTest, StudentType } from '@/types/students';
import { create } from 'zustand';

interface StudentsStore {
    filters: {
        group: number | undefined;
        mentors: { id: number; name: string }[];
        searchQuery: string | undefined;
        program: number | undefined;
    };

    filterPlacementTest: {
        group: number | undefined;
        mentors: { id: number; name: string }[];
        searchQuery: string | undefined;
        program: number | undefined;
        status: number | undefined;
    };
    filterNewStudent: {
        searchQuery: string | undefined;
        program: number | undefined;
    };
    onChangeFilter: (filter: string, value: any) => void;
    onChangeFilterPlacementTest: (filter: string, value: any) => void;
    onChangeFilterNewStudent: (filter: string, value: any) => void;

    students: StudentType[];
    setStudents: (students: StudentType[]) => void;

    studentsPlacementTest: Partial<StudentPlacementTest>[];
    setStudentsPlacementTest: (students: Partial<StudentPlacementTest>[]) => void;

    newStudents: StudentType[];
    setNewStudents: (students: StudentType[]) => void;

    pagination: Pagination;
    setPagination: (pagination: Partial<Pagination>) => void;

    paginationPlacementTest: Pagination;
    setPaginationPlacementTest: (pagination: Partial<Pagination>) => void;

    paginationNewStudent: Pagination;
    setPaginationNewStudent: (pagination: Partial<Pagination>) => void;
}

export const useStudentsStore = create<StudentsStore>((set, get) => ({
    filters: {
        group: undefined,
        mentors: [],
        searchQuery: undefined,
        program: undefined,
    },
    filterPlacementTest: {
        group: undefined,
        program: undefined,
        mentors: [],
        searchQuery: '',
        status: undefined,
    },
    filterNewStudent: {
        searchQuery: undefined,
        program: undefined,
    },
    onChangeFilter: (filter: string, value: any) => {
        const getFilters = get().filters;
        set({
            filters: {
                ...getFilters,
                [filter]: value,
            },
        });
    },
    onChangeFilterPlacementTest: (filter: string, value: any) => {
        const getFilters = get().filterPlacementTest;
        set({
            filterPlacementTest: {
                ...getFilters,
                [filter]: value,
            },
        });
    },
    onChangeFilterNewStudent: (filter: string, value: any) => {
        const getFilters = get().filterNewStudent;
        set({
            filterNewStudent: {
                ...getFilters,
                [filter]: value,
            },
        });
    },
    students: [],
    setStudents: (students: StudentType[]) => {
        set({
            students,
        });
    },
    studentsPlacementTest: [],
    setStudentsPlacementTest: (students: Partial<StudentType>[]) => {
        set({
            studentsPlacementTest: students,
        });
    },
    newStudents: [],
    setNewStudents: (students: StudentType[]) => {
        set({
            newStudents: students,
        });
    },
    pagination: { totalPages: 0, currentPage: 1, itemsPerPage: 10, itemCount: 0, totalItems: 0 },
    setPagination: (pagination: Partial<Pagination>) => {
        set({
            pagination: {
                ...get().pagination,
                ...pagination,
            },
        });
    },
    paginationPlacementTest: {
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 10,
        itemCount: 0,
        totalItems: 0,
    },
    setPaginationPlacementTest: (pagination: Partial<Pagination>) => {
        set({
            paginationPlacementTest: {
                ...get().paginationPlacementTest,
                ...pagination,
            },
        });
    },
    paginationNewStudent: {
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 10,
        itemCount: 0,
        totalItems: 0,
    },
    setPaginationNewStudent: (pagination: Partial<Pagination>) => {
        set({
            paginationNewStudent: {
                ...get().paginationNewStudent,
                ...pagination,
            },
        });
    },
}));
