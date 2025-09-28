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

export type QuestionForGuest = {
    id: number;
    questionText: string;
    questionType: string;
    options: string[];
    instruction: string;
    studentAnswer: string;
};

export type PlacementTestResponse = {
    questions: QuestionForGuest[];
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
    determinedLevel: string | string | null;
    submittedAt: string;
    qa: Question[];
}

export interface ResponseTeacherSchedule {
    day: string;
    start: string;
    end: string;
    isFull: boolean;
}

export interface ResponseTeacher {
    memberId: number;
    memberName: string;
    alias: string;
    schedules: ResponseTeacherSchedule[];
}

export interface ResponseGrade {
    id: number;
    gradeNumber: number;
    prerequisites: string;
}
export interface ResponseStudyGroup {
    teacherTeamMemberId: number;
    teacherTeamMemberName: string;
    teacherTeamMemberPhoto: string | null;
    teacherAlias: string;
    studyGroupId: number;
    studyGroupName: string;
    locationId: number;
    locationName: string;
    programId: number;
    groupId: number;
    levelId: number;
    gradeId: number;
    schedule1: {
        scheduleId: number;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        durationMinutes: number;
    };
    schedule2: {
        scheduleId: number;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        durationMinutes: number;
    };
}

export interface ResponseLevel {
    id: number;
    name: string;
    prerequisites: string;
}
