import { PLACEMENT_TEST_STATUS, QUESTION_TYPE } from '@/constants/placement-test';

export type PlacementTestStatus =
    (typeof PLACEMENT_TEST_STATUS)[keyof typeof PLACEMENT_TEST_STATUS];

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export type Question = {
    id: number;
    instruction: string;
    questionText: string;
    options: string[] | null;
    questionType: QuestionType | string;
    answer?: string;
    isGraded?: boolean;
    isCorrect?: boolean;
};

export type PlacementTest = {
    questions: Question[];
    sessionId: string;
};
