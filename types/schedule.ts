export interface ScheduleItem {
    scheduleId: number;
    teacherMemberName: string;
    teacherAlias: string;
    day: string;
    startTime: string;
    endTime: string;
    isPriority?: boolean;
    location: string;
    package: string | null;
    studyGroup: string | null;
    totalStudent: number;
    notes: any[];
}

export interface TimeSlot {
    start: string;
    end: string;
    display: string;
}

export interface TeacherScheduleResponse extends Array<ScheduleItem> {}
