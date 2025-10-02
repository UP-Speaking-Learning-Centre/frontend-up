import { DayOfWeekType } from './programs-selection';

export type Schedule = {
    scheduleId?: number;
    dayOfWeek: string; // bisa kamu ganti ke union type "MON" | "TUE" | ...
    startTime: string; // format "HH:mm:ss"
    endTime: string; // format "HH:mm:ss"
    durationMinutes: number;
};

export type StudyGroup = {
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
    schedule1: Schedule;
    schedule2: Schedule;
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
