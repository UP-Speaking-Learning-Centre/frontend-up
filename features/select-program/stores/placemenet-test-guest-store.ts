import { Question, QuestionType } from '@/types/placement-test';
import { create } from 'zustand';

interface PlacementTestGuestStore {
    testSessionId: string;
    questions: Question[];
    setTestSessionId: (testSessionId: string) => void;
    setQuestions: (questions: Question[]) => void;
}

const usePlacementTestGuestStore = create<PlacementTestGuestStore>()(set => ({
    testSessionId: '',
    questions: [],
    setTestSessionId: (testSessionId: string) => set({ testSessionId }),
    setQuestions: (questions: Question[]) => set({ questions }),
}));

export default usePlacementTestGuestStore;
