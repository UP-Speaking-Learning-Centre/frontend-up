import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';

const useGetTeacherAll = (params?: any) => {
    const getTeacher = async (): Promise<TeacherAdmin[]> => {
        const mentors = await api.get<TeacherAdmin[]>(ENDPOINTS.fetchTeachersNoPage, {
            params,
        });
        return mentors.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchTeachers, params],
        queryFn: getTeacher,
        select(data) {
            return data.map(item => ({ ...item, value: item.id, name: item.memberName }));
        },
    });

    return { data, isLoading };
};

export default useGetTeacherAll;
