import { useCallback, useMemo } from 'react';
import { ScheduleItem } from '@/types/schedule';
import { useNewStudyGroupStore } from '../stores/new-study-group-store';

export function useScheduleOptions(schedules: ScheduleItem[]) {
    const { teacherMemberName, day1, day2, time1, alias } = useNewStudyGroupStore(s => s.formValue);
    const setValue = useNewStudyGroupStore(s => s.setValue);

    // 1. unique teachers
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

    // 2. available days for selected teacher
    const days = useMemo(() => {
        console.log(schedules);
        console.log(teacherMemberName);
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

    // 3. available startTimes for selected teacher + day
    const getStartTimes = useCallback(
        (useDay1: boolean) => {
            if (!teacherMemberName || (useDay1 && !day1) || (!useDay1 && !day2)) return [];

            return Array.from(
                new Set(
                    schedules
                        .filter(
                            s =>
                                s.teacherMemberName === teacherMemberName &&
                                s.studyGroupId === null &&
                                s.day === (useDay1 ? day1 : day2) &&
                                s.startTime !== (useDay1 ? '' : time1)
                        )
                        .map(s => s.startTime)
                )
            );
        },
        [schedules, teacherMemberName, day1, day2, time1]
    );

    return {
        teachers,
        days,
        getStartTimes,
    };
}
