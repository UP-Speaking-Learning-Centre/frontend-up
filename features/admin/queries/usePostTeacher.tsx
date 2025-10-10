import { LocationAdmin, RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';
import api, { BaseService } from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const usePostTeacher = () => {
    const queryClient = useQueryClient();

    const post = async (data: RequestTeacherAdmin): Promise<TeacherAdmin> => {
        return BaseService(async () => {
            const res = await api.post<TeacherAdmin>(ENDPOINTS.fetchTeachers, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.fetchTeachers] });
            return res.data;
        });
    };

    const postTeacher = useMutation({
        mutationFn: post,
    });

    return postTeacher;
};

export default usePostTeacher;
