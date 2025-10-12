import { getPackageColor } from '@/lib/schedule';
import { ScheduleItem, TeacherScheduleResponse, TimeSlot } from '@/types/schedule';
import { useMemo } from 'react';
import dummy from '@/data/schedule.json';

const useMapTeacherSchedule = ({ data }: { data: TeacherScheduleResponse }) => {
    const scheduleData = data || dummy;

    const teachers = useMemo(() => {
        const teacherMap = new Map<string, string>();

        scheduleData.forEach((item: ScheduleItem) => {
            teacherMap.set(item.ke, item.teacherMemberName);
        });
        return Array.from(teacherMap).sort();
    }, [scheduleData]);

    const getBookingInfo = (day: string, timeSlot: TimeSlot, teacher: string) => {
        const scheduleItem = scheduleData.find(
            (item: ScheduleItem) =>
                item.day === day &&
                item.startTime === timeSlot.start &&
                item.teacherMemberName === teacher
        );

        if (scheduleItem) {
            if (scheduleItem.studyGroup) {
                return {
                    isAvailable: false,
                    studyGroupId: scheduleItem.studyGroupId || undefined,
                    name: scheduleItem.studyGroup,
                    isPriority: scheduleItem.isPriority,
                    students: scheduleItem.totalStudent,
                    color: getPackageColor(scheduleItem.package),
                };
            }

            return {
                isAvailable: true,
                studyGroupId: undefined,
                name: 'Tersedia',
                color: 'bg-gray-50 text-gray-600 border border-gray-500 hover:bg-gray-200',
            };
        }

        return null;
    };

    return {
        scheduleData,
        teachers,
        getBookingInfo,
    };
};

export default useMapTeacherSchedule;
