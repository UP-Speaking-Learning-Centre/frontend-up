import { PLACEMENT_TEST_STATUS, QUESTION_TYPE } from '@/constants/placement-test';

export type PlacementTestStatus =
    (typeof PLACEMENT_TEST_STATUS)[keyof typeof PLACEMENT_TEST_STATUS];

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export type Question = {
    questionId: number;
    questionText: string;
    questionType: string;
    options: string[];
    studentAnswer: string;
    isGraded?: boolean;
    isCorrect?: boolean;
};

export type PlacementTestResponse = {
    questions: Question[];
    testSessionId: string;
};

export interface ResponsePlacementTestStudent {
    id: number;
    name: string;
    parentPhoneNumber: string;
}

export interface ResponsePlacementTestTest {
    id: number;
    name: string;
    program: string;
    group: string;
}

export interface ResponsePlacementTest {
    resultId: number;
    student: ResponsePlacementTestStudent;
    test: ResponsePlacementTestTest;
    status: string;
    score: number;
    determinedLevel: string | null;
    submittedAt: string;
    qa: Question[];
}
