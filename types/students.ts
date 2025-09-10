export type StudentType = {
    group: string;
    parentPhoneNumber: string;
    program: string;
    schedule: string;
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
