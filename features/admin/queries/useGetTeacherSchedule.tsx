import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherAdminSchedule } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useGetTeacherSchedule = () => {
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [teacherId, setTeacherId] = useState(0);

    const getTeacher = async (): Promise<TeacherAdminSchedule> => {
        const mentors = await api.get<any>(
            ENDPOINTS.fetchTeachersScheduleById.expand({ id: teacherId })
        );

        return mentors.data?.data || mentors.data;
    };

    const handleOpenSchedule = (id: number) => {
        setTeacherId(id);
        setIsScheduleModalOpen(true);
    };

    const { data, isLoading } = useQuery({
        queryKey: ['GET' + ENDPOINTS.fetchTeachersScheduleById.expand({ id: teacherId })],
        queryFn: getTeacher,
        enabled: !!teacherId,
    });

    return { data, isLoading, setTeacherId, handleOpenSchedule, isScheduleModalOpen, setIsScheduleModalOpen };
};

export default useGetTeacherSchedule;
