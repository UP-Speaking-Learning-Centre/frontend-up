import { PLACEMENT_TEST_STATUS } from '@/constants/placement-test';
import { PlacementTestStatus, Question } from '@/types/placement-test';
import { create } from 'zustand';

const initialState = {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    gradedQuestions: 0,
    correctAnswers: 0,
    questions: [],
    status: PLACEMENT_TEST_STATUS.doneInterview,
};

interface DisplayedPlacementTestStore {
    currentQuestionIndex: number;
    totalQuestions: number;
    gradedQuestions: number;
    correctAnswers: number;
    questions: Question[];
    status: PlacementTestStatus;
    setState: (state: Partial<DisplayedPlacementTestStore>) => void;
}

export const useDisplayedPlacementTestStore = create<DisplayedPlacementTestStore>(set => ({
    ...initialState,
    setState: (state: Partial<DisplayedPlacementTestStore>) => set(state),
}));
