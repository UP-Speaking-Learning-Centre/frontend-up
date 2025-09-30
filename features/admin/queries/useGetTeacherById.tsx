import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import { useEffect } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { BaseResponse } from '@/types/general';

const useGetTeacherById = () => {
    const getTeacher = async (): Promise<TeacherAdmin> => {
        // const mentors = await api.get<TeacherAdmin[]>(ENDPOINTS.fetchTeachers);
        const dummy = {
            id: 14,
            memberName: 'Jane Updated',
            isCoordinator: false,
            teacher: {
                id: 2,
                name: 'Papa Bear',
                coordinator: null,
            },
            photoUrl: 'https://example.com/photo.jpg',
        } satisfies TeacherAdmin;
        return dummy;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchTeachersById],
        queryFn: getTeacher,
    });

    return { data, isLoading };
};

export default useGetTeacherById;
