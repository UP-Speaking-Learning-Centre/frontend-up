import { PLACEMENT_TEST_STATUS } from '@/constants/placement-test';

export type Question = {
    id: number;
    instruction: string;
    questionText: string;
    options: string[] | null;
    questionType: string;
};

export type PlacementTest = {
    questions: Question[];
    sessionId: string;
};

export type PlacementTestStatus =
    (typeof PLACEMENT_TEST_STATUS)[keyof typeof PLACEMENT_TEST_STATUS];
