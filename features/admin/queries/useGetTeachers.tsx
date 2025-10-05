import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherAdmin } from '@/types/admin';
import { BaseResponse } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';

const useGetTeachers = (params?: any) => {
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);
    const setPagination = useTeacherManagementStore(s => s.setPagination);

    const getTeacher = async (): Promise<BaseResponse<TeacherAdmin[]>> => {
        const mentors = await api.get<BaseResponse<TeacherAdmin[]>>(ENDPOINTS.fetchTeachers, {
            params,
        });
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
        if (data) {
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
        }
    }, [data]);

    return { data, isLoading };
};

export default useGetTeachers;
