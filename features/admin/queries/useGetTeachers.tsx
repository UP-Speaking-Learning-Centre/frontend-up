import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherAdmin } from '@/types/admin';
import { BaseResponse } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';

const useGetTeachers = (params: any) => {
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);
    const setPagination = useTeacherManagementStore(s => s.setPagination);

    const getTeacher = async (): Promise<BaseResponse<TeacherAdmin[]>> => {
        const mentors = await api.get<BaseResponse<TeacherAdmin[]>>(ENDPOINTS.fetchTeachers, {
            params,
        });
        // const dummy = {
        //     data: [
        //         {
        //             id: 12,
        //             memberName: 'Ms. Ica',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 3,
        //                 name: 'Mama Bear',
        //             },
        //         },
        //         {
        //             id: 11,
        //             memberName: 'Ms. Puji',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 3,
        //                 name: 'Mama Bear',
        //             },
        //         },
        //         {
        //             id: 10,
        //             memberName: 'Ms. Feby',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 3,
        //                 name: 'Mama Bear',
        //             },
        //         },
        //         {
        //             id: 9,
        //             memberName: 'Mr. Firdan',
        //             isCoordinator: true,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 3,
        //                 name: 'Mama Bear',
        //             },
        //         },
        //         {
        //             id: 8,
        //             memberName: 'Ms. May',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 3,
        //                 name: 'Mama Bear',
        //             },
        //         },
        //         {
        //             id: 7,
        //             memberName: 'Mr. Noval',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 2,
        //                 name: 'Papa Bear',
        //             },
        //         },
        //         {
        //             id: 6,
        //             memberName: 'Ms. Binti',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 2,
        //                 name: 'Papa Bear',
        //             },
        //         },
        //         {
        //             id: 5,
        //             memberName: 'Ms. Lieken',
        //             isCoordinator: true,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 2,
        //                 name: 'Papa Bear',
        //             },
        //         },
        //         {
        //             id: 4,
        //             memberName: 'Mr. Wildan',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 1,
        //                 name: 'Baby Bear',
        //             },
        //         },
        //         {
        //             id: 3,
        //             memberName: 'Mr. Rafif',
        //             isCoordinator: false,
        //             photoUrl: null,
        //             teacher: {
        //                 id: 1,
        //                 name: 'Baby Bear',
        //             },
        //         },
        //     ],
        //     meta: {
        //         totalItems: 12,
        //         itemCount: 10,
        //         itemsPerPage: 10,
        //         totalPages: 2,
        //         currentPage: 1,
        //     },
        // } satisfies BaseResponse<TeacherAdmin[]>;
        return mentors.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchTeachers, params],
        queryFn: getTeacher,
        select: select => ({
            ...select,
            data: select.data.map(item => ({ ...item, name: item.memberName })),
        }),
    });

    useEffect(() => {
        setTeacher(data?.data ?? []);
        setPagination(
            data?.meta ?? {
                totalItems: 0,
                itemsPerPage: 10,
                totalPages: 0,
                currentPage: 1,
                itemCount: 0,
            }
        );
    }, [data]);

    return { data, isLoading };
};

export default useGetTeachers;
