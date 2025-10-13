import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { TeacherAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';

const useGetTeacherById = (id: number) => {
    const getTeacher = async (): Promise<TeacherAdmin> => {
        const mentors = await api.get<TeacherAdmin>(ENDPOINTS.fetchTeachersById.expand({ id }));
        return mentors.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchTeachersById.expand({ id })],
        queryFn: getTeacher,
        enabled: !!id,
    });

    return { data, isLoading };
};

export default useGetTeacherById;
