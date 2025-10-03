import { PLACEMENT_TEST_STATUS } from '@/constants/placement-test';
import { STATUS_OPTION } from '@/features/admin/constants/config';
import {
    PlacementTestStatus,
    Question,
    ResponsePlacementTestStudent,
    ResponsePlacementTestTest,
} from '@/types/placement-test';
import { create } from 'zustand';

const initialState = {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    gradedQuestions: 0,
    correctAnswers: 0,
    questions: [],
    status: STATUS_OPTION.NOT_GRADED,
    student: undefined,
    test: undefined,
    testDate: '',
    assignedLevel: '',
    assignedLocation: '',
    assignedMentor: '',
    assignedSchedule: '',
    assignedGrade: '',
    noteForStudent: '',
    programId:0,
    groupId:0,
};

interface DisplayedPlacementTestStore {
    currentQuestionIndex: number;
    totalQuestions: number;
    gradedQuestions: number;
    correctAnswers: number;
    questions: Question[];
    status: PlacementTestStatus;
    student?: ResponsePlacementTestStudent;
    test?: ResponsePlacementTestTest;
    testDate: string;
    assignedLevel: string;
    assignedLocation: string;
    assignedMentor: string;
    assignedSchedule: string;
    assignedGrade: string;
    noteForStudent: string;
    setState: (state: Partial<DisplayedPlacementTestStore>) => void;
}

export const useDisplayedPlacementTestStore = create<DisplayedPlacementTestStore>(set => ({
    ...initialState,
    setState: (state: Partial<DisplayedPlacementTestStore>) => set(state),
}));
