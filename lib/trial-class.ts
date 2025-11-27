import { Schedule } from '@/types/study-group';
import moment from 'moment';
import 'moment/locale/id';

const dayMap: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
};

export type TrialClassSchedule = Schedule & {
    actualDate: string;
    display: string;
};

export function getNextSchedules(schedules: Schedule[], count?: number): TrialClassSchedule[] {
    const currentDate = new Date();
    const current = moment(currentDate);

    const upcoming: { schedule: Schedule; actualDate: moment.Moment }[] = [];

    for (let i = 0; i < 6; i++) {
        for (const s of schedules) {
            let scheduleDate = moment(currentDate).day(dayMap[s.dayOfWeek]).add(i, 'weeks');

            const [h, m] = s.startTime.split(':').map(Number);
            scheduleDate = scheduleDate.set({ hour: h, minute: m, second: 0, millisecond: 0 });

            if (scheduleDate.isAfter(current)) {
                upcoming.push({ schedule: s, actualDate: scheduleDate });
            }
        }
    }

    const sorted = upcoming.sort((a, b) => a.actualDate.valueOf() - b.actualDate.valueOf());

    return sorted.slice(0, count || 4).map(({ schedule, actualDate }) => ({
        ...schedule,
        actualDate: actualDate.toISOString(true),
        display: actualDate.format('dddd, D MMMM, HH:mm'),
    }));
}
