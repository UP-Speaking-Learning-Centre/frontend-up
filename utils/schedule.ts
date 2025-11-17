import moment from 'moment';
import { days, timeSlots } from '@/constants/schedule';
import { ScheduleItem } from '@/types/schedule';

const GRID_HEIGHT = 80;
export interface TimeSlot {
    start: string;
    end: string;
    display: string;
}

export function getUniqueTeachers(schedules: ScheduleItem[]) {
    const teachers = new Map<string, { name: string; alias: string }>();
    schedules.forEach(schedule => {
        if (!teachers.has(String(schedule.teacherMemberId))) {
            teachers.set(String(schedule.teacherMemberId), {
                name: schedule.teacherMemberName,
                alias: schedule.teacherAlias,
            });
        }
    });

    return Array.from(teachers.entries()).map(([id, { name, alias }]) => ({ id, name, alias }));
}

export function getSchedulesByTeacherAndDay(
    schedules: ScheduleItem[],
    teacherId: string,
    day: string
) {
    return schedules.filter(s => s.teacherMemberId == teacherId && s.day === day && s.studyGroup);
}

export function getDaysOfWeek(): string[] {
    return days;
}

export function timeToSeconds(timeStr: string): number {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

export function timeToPixelOffset(time: string, dayStartTime: string): number {
    const startSeconds = timeToSeconds(dayStartTime);
    const currentSeconds = timeToSeconds(time);
    const diffSeconds = currentSeconds - startSeconds;
    return (diffSeconds / 3600) * GRID_HEIGHT;
}

export function timeToPixelOffsetFixed(time: string): number {
    const startSeconds = timeToSeconds('05:00:00');
    const currentSeconds = timeToSeconds(time);
    const diffSeconds = currentSeconds - startSeconds;
    return (diffSeconds / 3600) * GRID_HEIGHT;
}

export function calculateBlockHeight(startTime: string, endTime: string): number {
    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);
    const durationSeconds = endSeconds - startSeconds;
    return (durationSeconds / 3600) * GRID_HEIGHT;
}

export function getEarliestTimeForDay(schedules: ScheduleItem[], day: string): string {
    const daySchedules = schedules.filter(s => s.day === day && s.studyGroup);
    if (daySchedules.length === 0) return timeSlots[0].start;

    const times = daySchedules.map(s => s.startTime).sort();
    return times[0];
}

export function getLatestTimeForDay(schedules: ScheduleItem[], day: string): string {
    const daySchedules = schedules.filter(s => s.day === day && s.studyGroup);
    if (daySchedules.length === 0) return timeSlots[timeSlots.length - 1].end;

    const times = daySchedules.map(s => s.endTime).sort();
    return times[times.length - 1];
}

export function getFixedDayRange(): { start: string; end: string } {
    return {
        start: '08:00:00',
        end: '21:00:00',
    };
}

export const isTimeAvailable = (schedules: ScheduleItem[], time: string) => {
    const classStart = moment(time, 'HH:mm:ss');
    const classEnd = classStart.clone().add(90, 'minutes');

    let overlapped = null;

    for (const s of schedules) {
        const scheduleStart = moment(s.startTime, 'HH:mm:ss');
        const scheduleEnd = moment(s.endTime, 'HH:mm:ss');

        const isOverlap =
            classStart.isBetween(scheduleStart, scheduleEnd, undefined, '[)') ||
            classEnd.isBetween(scheduleStart, scheduleEnd, undefined, '(]') ||
            scheduleStart.isBetween(classStart, classEnd, undefined, '[)') ||
            scheduleEnd.isBetween(classStart, classEnd, undefined, '(]') ||
            classStart.isSame(scheduleStart) ||
            classEnd.isSame(scheduleEnd);

        if (isOverlap) {
            overlapped = s;
            break;
        }
    }

    return {
        isAvailable: overlapped === null,
        overlapped,
    };
};
