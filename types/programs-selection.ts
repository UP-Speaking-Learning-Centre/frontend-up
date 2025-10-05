import { DAY } from '@/constants/program-selections';

export type ProgramType = {
    id: number;
    name: string;
    description: string;
    groups: GroupType[];
    prices: ProgramDetailPrice[];
};

export type GroupType = {
    id: number;
    name: string;
    materi: string;
    capaian: string;
};

export type LevelType = {
    id: number;
    name: string;
    description: string;
    prerequisites: string | null;
};

export type GradeType = {
    id: number;
    gradeNumber: number;
    prerequisites: string;
    taughtBy: [
        {
            id: number;
            name: string;
        }
    ];
};

export type PackageType = {
    id: number;
    name: string;
    description: string;
    points: string;
    prices: {
        program: number;
        price: {
            price: number;
            duration: number;
        }[];
    }[];
};

export type LocationType = {
    locationId: number;
    locationName: string;
};

export type AvailableScheduleType = {
    scheduleId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    teacherAlias: string;
    teacherMemberId: number;
    teacherMemberName: string;
    alias: string;
    taughtBy: string;
    isCoordinator: boolean;
    locationId: number;
    locationName: string;
};

export type ProgramDetailPrice = {
    timeframe: string;
    amount: number;
    package: {
        id: number;
        name: string;
    };
};

export type DayOfWeekType = (typeof DAY)[number] | '' | null;
