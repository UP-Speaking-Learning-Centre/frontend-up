import { LocationAdmin, RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const usePostTeacher = () => {
    const queryClient = useQueryClient();

    const postLocation = async (data: RequestTeacherAdmin): Promise<TeacherAdmin> => {
        const res = await api.post<TeacherAdmin>(ENDPOINTS.fetchTeachers, data);
        queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['POST' + API_TEACHERS],
        mutationFn: postLocation,
    });

    return { mutateAsync };
};

export default usePostTeacher;
