import { StudentPlacementTest, StudentType } from '@/types/students';
import { create } from 'zustand';

interface Pagination {
    totalPages: number;
    currentPage: number;
    startIndex: number;
    itemsPerPage: number;
    perPage: number;
}

interface StudentsStore {
    filters: {
        group: { id: number; name: string }[];
        mentors: { id: number; name: string }[];
        searchQuery: string;
    };

    filterPlacementTest: {
        group: { id: number; name: string }[];
        mentors: { id: number; name: string }[];
        searchQuery: string;
    };
    onChangeFilter: (filter: string, value: string) => void;
    onChangeFilterPlacementTest: (filter: string, value: string) => void;

    students: StudentType[];
    setStudents: (students: StudentType[]) => void;

    studentsPlacementTest: Partial<StudentPlacementTest>[];
    setStudentsPlacementTest: (students: Partial<StudentPlacementTest>[]) => void;

    pagination: Pagination;
    setPagination: (pagination: Partial<Pagination>) => void;

    paginationPlacementTest: Pagination;
    setPaginationPlacementTest: (pagination: Partial<Pagination>) => void;
}

export const useStudentsStore = create<StudentsStore>((set, get) => ({
    filters: {
        group: [],
        mentors: [],
        searchQuery: '',
    },
    filterPlacementTest: {
        group: [],
        mentors: [],
        searchQuery: '',
    },
    onChangeFilter: (filter: string, value: string) => {
        const getFilters = get().filters;
        set({
            filters: {
                ...getFilters,
                [filter]: value,
            },
        });
    },
    onChangeFilterPlacementTest: (filter: string, value: string) => {
        const getFilters = get().filterPlacementTest;
        set({
            filterPlacementTest: {
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
    pagination: { totalPages: 0, currentPage: 1, startIndex: 0, itemsPerPage: 10, perPage: 10 },
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
        startIndex: 0,
        itemsPerPage: 10,
        perPage: 10,
    },
    setPaginationPlacementTest: (pagination: Partial<Pagination>) => {
        set({
            paginationPlacementTest: {
                ...get().paginationPlacementTest,
                ...pagination,
            },
        });
    },
}));
