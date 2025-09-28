import { useMutation } from '@tanstack/react-query';
import { API_TEACHERS } from '../constants/config';
import { useTeacherManagementStore } from '../stores/teacher';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const useDeleteTeacher = () => {
    const teacher = useTeacherManagementStore(s => s.teacher);
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);

    const deleteLocation = async (id: number): Promise<string> => {
        const res = await api.delete(ENDPOINTS.fetchTeachersById.expand({ id }));
        const newLocation = teacher.filter(teach => teach.id !== id);
        setTeacher(newLocation);
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['DELETE' + API_TEACHERS],
        mutationFn: deleteLocation,
    });

    return { mutateAsync };
};

export default useDeleteTeacher;
