export interface ProgramDetailTreeInterface {
    title: string;
    items: ProgramDetailTreeInterfaceItems[];
}

export interface ProgramDetailTreeInterfaceItems extends ProgramDetail {
    id: number;
    title: string;
    detailTitle?: string;
    children?: ProgramDetailTreeInterface;
}

export interface ProgramDetailPackage {
    gradePackageId: number;
    packageName: string;
    price1Month: number;
    price2Months: number;
    price6Months: number;
}

export interface ProgramDetailGrade {
    gradeId: number;
    gradeNumber: number;
    prerequisites: string;
    packages: ProgramDetailPackage[];
}
export interface ProgramDetailLevel {
    levelId: number;
    levelName: string;
    description: string;
    grades: ProgramDetailGrade[];
}

export interface ProgramDetailGroup {
    groupId: number;
    groupName: string;
    description: string;
    materi: string;
    capaian: string;
    levels: ProgramDetailLevel[];
}

export interface ProgramDetail {
    programId: number;
    programName: string;
    description: string;
    groups: ProgramDetailGroup[];
}

export type ProgramRecurse =
    | ProgramDetail
    | ProgramDetailGroup
    | ProgramDetailLevel
    | ProgramDetailGrade
    | ProgramDetailPackage;

export type ProgramRecurseArray =
    | ProgramDetail[]
    | ProgramDetailGroup[]
    | ProgramDetailLevel[]
    | ProgramDetailGrade[]
    | ProgramDetailPackage[];

export interface LocationAdmin {
    id: number;
    name: string;
    address: string | null;
    img: string | null | File;
    imgLink: string | null;
    googleMapsLink: string | null;
}

export interface TeacherAdmin {
    id: number;
    memberName: string;
    isCoordinator: boolean;
    photoUrl: string | null;
    speciality: string;
    teacher: {
        id: number;
        name: string;
        coordinator?: string | null;
    };
    location?: LocationAdmin;
}

export type RequestTeacherAdmin = {
    memberName: string;
    photo: File;
    teacherId: number;
    locationId: number;
    speciality: string;
    isCoordinator: boolean;
};

export type SchduleAdmin = {
    scheduleId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    isFull: boolean;
    hasStudyGroup: boolean;
    location: {
        id: number;
        name: string;
    };
    studyGroup: {
        id: number;
        name: string;
        packageId: number;
        packageName: string;
        isPriority: boolean;
    } | null;
    totalActiveStudents: number;
};

export interface TeacherAdminSchedule {
    teacherTeamMember: Partial<TeacherAdmin>;
    schedules: SchduleAdmin[];
}

export interface PriceData {
    id: string;
    price: string;
    duration: string;
    durationType: 'days' | 'weeks' | 'months' | 'years';
}

export interface ResponseProgram {
    id: number;
    name: string;
    description: string;
    groups: ResponseGroup[];
}

export interface ResponseGroup {
    id: number;
    name: string;
    materi: string;
    capaian: string;
}

export interface Price {
    id: number;
    program: {
        id: number;
        name: string;
    };
    package: {
        id: number;
        name: string;
    };
    timeframe: string;
    amount: number;
}

export interface ResponseAlias {
    id: number;
    alias: string;
    coordinator: string | null;
}

export interface RequestPrice {
    programId: number;
    packageId: number;
    prices: { timeframe: string; amount: number }[];
    replaceAll: boolean;
}

export interface ReqUnassign {
    studentIds: number[];
    hard: boolean;
}
export interface ReqAssign {
    studyGroupId: number;
    studentIds: number;
    // markFullScheduleId: number;
}
export interface ResUnassign {
    mode: string;
    deletedIds: number[];
    affected: number;
    updated: number;
}
export interface ResAssign {
    studyGroupId: number;
    totalSchedules: number;
    requestedStudents: number[];
    createdAssignments: number;
    invalidStudentIds: number[];
    perStudentCreated: {
        [x: string]: number;
    };
}
