import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import { useEffect } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';

const useGetTeachers = () => {
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);

    const getTeacher = (): TeacherAdmin[] => {
        const mentors: TeacherAdmin[] = Array(4).fill({
            id: 1,
            name: 'Ms. Feby',
            img: '/placeholder.svg',
            alias: 'Mama Bear',
            description:
                'Experienced English teacher with 5+ years of teaching elementary students',
            location: 'UP Education Jakarta',
        });
        return mentors;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['GET' + API_TEACHERS],
        queryFn: getTeacher,
    });

    useEffect(() => {
        setTeacher(data ?? []);
    }, [data]);

    return { data, isLoading };
};

export default useGetTeachers;
