import { DAY } from '@/constants/program-selections';

export type ProgramType = {
    id: number;
    name: string;
    description: string;
    groups: GroupType[];
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

export type AvailableScheduleType = {
    scheduleId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    teacherMemberId: number;
    teacherMemberName: string;
    alias: string;
    isCoordinator: boolean;
    locationId: number;
    locationName: string;
};

export type DayOfWeekType = (typeof DAY)[number] | '' | null;
