export type Schedule = {
    id: number;
    location: string;
    locationId: number;
    teacherMemberName: string;
    teacherAlias: string;
    isPriority: boolean;
    program: string;
    group: string;
    level: string;
    grade: string;
    scheduleId?: number;
    dayOfWeek: string; // bisa kamu ganti ke union type "MON" | "TUE" | ...
    startTime: string; // format "HH:mm:ss"
    endTime: string; // format "HH:mm:ss"
    durationMinutes: number;
    studyGroupName?: string;
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

export type ScheduleDetailAdmin = {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    location: string;
    locationId: number;
    studyGroupId: number;
    teacherTeamMemberId: number;
    teacherMemberName: string;
    teacherAlias: string;
    isPriority: boolean;
    programId: number;
    program: string;
    groupId: number;
    group: string;
    levelId: number;
    level: string;
    gradeId: number;
    grade: string;
    gradeNumber: number;
};

export type StudyGroupDetailAdmin = {
    id: number;
    name: string;
    description: string;
    package: {
        id: number;
        name: string;
    };
    isPriority: boolean;
    programId: number;
    program: string;
    groupId: number;
    group: string;
    levelId: number;
    level: string;
    gradeId: number;
    grade: string;
    gradeNumber: number;
    schedules: ScheduleDetailAdmin[];
};

export type StudyGroupDetail = {
    description: string;
    grade: string;
    gradeId: number;
    gradeNumber: number;
    group: string;
    groupId: number;
    id: number;
    isPriority: boolean;
    level: string;
    levelId: number;
    name: string;
    package: { id: number; name: string };
    program: string;
    programId: number;
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
    schedules?: {
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        locationId: number;
    }[];
};

export type AssignStudentToStudyGroupPayload = {
    studyGroupId: number;
    studentIds: number[];
    markFullScheduleId: number;
};

export type CreateStudyGroupResponse = {
    studyGroupId: number;
    studyGroupName: string;
    package: {
        id: number;
        name: string;
    };
    programId: number;
    groupId: number;
    levelId: number;
    gradeId: number;
    packageId: number;
    teacherTeamMemberId: number;
    scheduleIds: number[];
    description: string;
    createdSchedules: [];
    schedulesCreated: number;
    linkedScheduleIds: number[];
    schedulesLinked: number;
    notLinkedScheduleIds: [];
};

export type AssignStudentToStudyGroupResponse = {
    studyGroupId: number;
    totalSchedules: number;
    requestedStudents: number[];
    createdAssignments: number;
    invalidStudentIds: number[];
    perStudentCreated: {
        '3': 2;
    };
};

export type UnassignStudentFromStudyGroupPayload = {
    studentIds: number[];
    hard: boolean;
};

export type UnassignStudentFromStudyGroupResponse = {
    mode: string;
    deletedIds: number[];
    affected: number;
    updated: number;
};
