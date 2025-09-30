import { getPackageColor } from '@/lib/schedule';
import { TimeSlot } from '@/types/schedule';
import useGetTeacherSchedule from '../queries/useGetTeacherSchedule';
import { TeacherAdminSchedule } from '@/types/admin';

const useMapTeacherManagement = (schedules: TeacherAdminSchedule['schedules']) => {

    const getBookingInfo = (day: string, timeSlot: TimeSlot) => {
        const scheduleItem = schedules.find(
            item => item.dayOfWeek === day && item.startTime === timeSlot.start
        );

        if (scheduleItem) {
            if (scheduleItem.studyGroup) {
                return {
                    isAvailable: false,
                    name: scheduleItem.studyGroup.name,
                    isPriority: false,
                    students: scheduleItem.totalActiveStudents,
                    color: getPackageColor(scheduleItem.studyGroup.packageName),
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

    return { getBookingInfo };
};

export default useMapTeacherManagement;
