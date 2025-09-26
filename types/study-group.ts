import { DayOfWeekType } from './programs-selection';

export type Package = {
    id: number;
    name: string;
};

export type Schedule = {
    id: number;
    dayOfWeek: DayOfWeekType | string;
    startTime: string; // format HH:mm:ss
    endTime: string;
    location: string;
    teacherMemberName: string;
    teacherAlias: string;
    isPriority: boolean;
    program: string;
    group: string;
    level: string;
    grade: string;
};

export type StudyGroup = {
    id: number;
    name: string;
    description: string;
    package: Package;
    isPriority: boolean;
    program: string;
    group: string;
    level: string;
    grade: string;
    schedules: Schedule[];
};

export type CreateStudyGroupPayload = {
    name: string;
    description: string;
    programId: number;
    groupId: number;
    levelId: number;
    gradeId: number;
    packageId: number;
    teacherTeamMemberId: number;
    scheduleIds: number[];
};

export type AssignStudentToStudyGroupPayload = {
    studentIds: number[];
};
