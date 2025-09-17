import { QuestionForGuest } from '@/types/placement-test';
import { create } from 'zustand';

interface PlacementTestGuestStore {
    testSessionId: string;
    questions: QuestionForGuest[];
    setTestSessionId: (testSessionId: string) => void;
    setQuestions: (questions: QuestionForGuest[]) => void;
}

const usePlacementTestGuestStore = create<PlacementTestGuestStore>()(set => ({
    testSessionId: '',
    questions: [],
    setTestSessionId: (testSessionId: string) => set({ testSessionId }),
    setQuestions: (questions: QuestionForGuest[]) => set({ questions }),
}));

export default usePlacementTestGuestStore;
