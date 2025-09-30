import { getPackageColor } from '@/lib/schedule';
import { ScheduleItem, TeacherScheduleResponse, TimeSlot } from '@/types/schedule';
import { useMemo } from 'react';
import dummy from '@/data/schedule.json';

const useMapTeacherSchedule = ({ data }: { data: TeacherScheduleResponse }) => {
    const scheduleData = data || dummy;

    const teachers = useMemo(() => {
        const teacherSet = new Set<string>();

        scheduleData.forEach((item: ScheduleItem) => {
            teacherSet.add(item.teacherMemberName);
        });
        return Array.from(teacherSet).sort();
    }, [scheduleData]);

    const getBookingInfo = (day: string, timeSlot: TimeSlot, teacher: string) => {
        const scheduleItem = scheduleData.find(
            (item: ScheduleItem) =>
                item.day === day &&
                item.startTime === timeSlot.start &&
                item.teacherMemberName === teacher
        );

        console.log(scheduleItem);
        

        if (scheduleItem) {
            if (scheduleItem.studyGroup) {
                return {
                    isAvailable: false,
                    name: scheduleItem.studyGroup,
                    isPriority: scheduleItem.isPriority,
                    students: scheduleItem.totalStudent,
                    color: getPackageColor(scheduleItem.package),
                };
            }

            return {
                isAvailable: true,
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
