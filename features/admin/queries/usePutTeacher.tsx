import { LocationAdmin, RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const usePutTeacher = (id: number) => {
    const setTeacher = useLocationManagementStore(s => s.setTeacher);
    const teacher = useLocationManagementStore(s => s.teacher);

    const putLocation = async (data: RequestTeacherAdmin): Promise<TeacherAdmin> => {
        const res = await api.patch(ENDPOINTS.fetchTeachersById.expand({ id }),data);
        const index = teacher.findIndex(teach => teach.id === id);
        teacher[index] = res.data;
        setTeacher([...teacher]);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['PUT' + ENDPOINTS.fetchTeachersById.expand({ id })],
        mutationFn: putLocation,
    });

    return { mutateAsync };
};

export default usePutTeacher;
