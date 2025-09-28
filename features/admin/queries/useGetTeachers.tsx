import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import { useEffect } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { BaseResponse } from '@/types/general';

const useGetTeachers = () => {
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);

    const getTeacher = async (): Promise<BaseResponse<TeacherAdmin[]>> => {
        // const mentors = await api.get<TeacherAdmin[]>(ENDPOINTS.fetchTeachers);
        const dummy = {
            data: [
                {
                    id: 12,
                    memberName: 'Ms. Ica',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 3,
                        name: 'Mama Bear',
                    },
                },
                {
                    id: 11,
                    memberName: 'Ms. Puji',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 3,
                        name: 'Mama Bear',
                    },
                },
                {
                    id: 10,
                    memberName: 'Ms. Feby',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 3,
                        name: 'Mama Bear',
                    },
                },
                {
                    id: 9,
                    memberName: 'Mr. Firdan',
                    isCoordinator: true,
                    photoUrl: null,
                    teacher: {
                        id: 3,
                        name: 'Mama Bear',
                    },
                },
                {
                    id: 8,
                    memberName: 'Ms. May',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 3,
                        name: 'Mama Bear',
                    },
                },
                {
                    id: 7,
                    memberName: 'Mr. Noval',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 2,
                        name: 'Papa Bear',
                    },
                },
                {
                    id: 6,
                    memberName: 'Ms. Binti',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 2,
                        name: 'Papa Bear',
                    },
                },
                {
                    id: 5,
                    memberName: 'Ms. Lieken',
                    isCoordinator: true,
                    photoUrl: null,
                    teacher: {
                        id: 2,
                        name: 'Papa Bear',
                    },
                },
                {
                    id: 4,
                    memberName: 'Mr. Wildan',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 1,
                        name: 'Baby Bear',
                    },
                },
                {
                    id: 3,
                    memberName: 'Mr. Rafif',
                    isCoordinator: false,
                    photoUrl: null,
                    teacher: {
                        id: 1,
                        name: 'Baby Bear',
                    },
                },
            ],
            meta: {
                totalItems: 12,
                itemCount: 10,
                itemsPerPage: 10,
                totalPages: 2,
                currentPage: 1,
            },
        } satisfies BaseResponse<TeacherAdmin[]>;
        return dummy;
    };

    const { data, isLoading } = useQuery({
        queryKey: ['GET' + API_TEACHERS],
        queryFn: getTeacher,
        select: select => ({
            ...select,
            data: select.data.map(item => ({ ...item, name: item.memberName })),
        }),
    });

    useEffect(() => {
        setTeacher(data?.data ?? []);
    }, [data]);

    return { data, isLoading };
};

export default useGetTeachers;
