import { PLACEMENT_TEST_STATUS } from '@/constants/placement-test';
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
    status: PLACEMENT_TEST_STATUS.doneInterview,
    student: undefined,
    test: undefined,
    testDate:"",
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
    testDate:string
    setState: (state: Partial<DisplayedPlacementTestStore>) => void;
}

export const useDisplayedPlacementTestStore = create<DisplayedPlacementTestStore>(set => ({
    ...initialState,
    setState: (state: Partial<DisplayedPlacementTestStore>) => set(state),
}));
