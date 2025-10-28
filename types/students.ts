export type StudentType = {
    group: string;
    parentPhoneNumber: string;
    program: string;
    schedules: {
        aliasTeacher: string;
        dayOfWeek: string;
        endTime: string;
        location: string;
        startTime: string;
        studyGroupName: string;
        teacherMemberName: string;
        teacherTeamMemberId: number;
    }[];
    studentId: number;
    studentName: string;
    teacherName: string;
};

export type StudentPlacementTest = {
    resultId: number;
    studentName: string;
    parentPhoneNumber: string;
    program: string;
    group: string;
    status: string;
    testDate: string;
};

export type StudentOfStudyGroup = {
    studentId: number;
    studentName: string;
    parentPhoneNumber: string;
};

export type AvailableStudentForStudyGroup = {
    id: number;
    name: string;
    notes: string | null;
    program: string;
    group: string;
    level: string;
    grade: string;
};

export type StudendOfStudyGrouResponse = {
    studyGroupId: number;
    count: number;
    students: Array<StudentOfStudyGroup>;
};

export type StudentRegistrationType =
    | 'Placement Test Registration'
    | 'Self-scheduling Registration'
    | 'Normal Registration';
