import { useCallback, useMemo } from 'react';
import { ScheduleItem } from '@/types/schedule';
import { useNewStudyGroupStore } from '../stores/new-study-group-store';

export function useScheduleOptions(schedules: ScheduleItem[]) {
    const { teacherMemberName, day1, day2, time1, time2, day3, time3, alias } =
        useNewStudyGroupStore(s => s.formValue);
    const setValue = useNewStudyGroupStore(s => s.setValue);

    const teachers = useMemo(() => {
        const map = new Map<string, { teacherMemberName: string; teacherAlias: string }>();
        schedules.forEach(s => {
            if (!map.has(s.teacherMemberName) && alias.includes(s.teacherAlias)) {
                map.set(s.teacherMemberName, {
                    teacherMemberName: s.teacherMemberName,
                    teacherAlias: s.teacherAlias,
                });
            }
        });

        return Array.from(map.values());
    }, [schedules, alias]);

    const days = useMemo(() => {
        if (!teacherMemberName) return [];
        const days = Array.from(
            new Set(
                schedules
                    .filter(
                        s => s.teacherMemberName === teacherMemberName && s.studyGroupId === null
                    )
                    .map(s => s.day)
            )
        );

        return days;
    }, [schedules, teacherMemberName]);

    const getStartTimes = useCallback(
        ({ startTimeFor }: { startTimeFor: 'day1' | 'day2' | 'day3' }) => {
            if (
                !teacherMemberName ||
                (startTimeFor === 'day1' && !day1) ||
                (startTimeFor === 'day2' && !day2) ||
                (startTimeFor === 'day3' && !day3)
            )
                return [];

            let filt = (s: ScheduleItem) => {};

            if (startTimeFor === 'day1') {
                filt = (s: ScheduleItem) => s.day === day1;
            }

            if (startTimeFor === 'day2') {
                filt = (s: ScheduleItem) => s.day === day2 && s.startTime !== time1;
            }

            if (startTimeFor === 'day3') {
                filt = (s: ScheduleItem) =>
                    s.day === day3 && s.startTime !== time1 && s.startTime !== time2;
            }

            const test = Array.from(
                new Set(
                    schedules
                        .filter(
                            s =>
                                s.teacherMemberName === teacherMemberName &&
                                s.studyGroupId === null &&
                                filt(s)
                        )
                        .map(s => s.startTime)
                )
            );

            return test;
        },
        [schedules, teacherMemberName, day1, day2, day3, time1, time2]
    );

    return {
        teachers,
        days,
        getStartTimes,
    };
}
