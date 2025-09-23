import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';

const usePutTeacher = () => {
    const setTeacher = useLocationManagementStore(s => s.setTeacher);
    const teacher = useLocationManagementStore(s => s.teacher);

    const putLocation = async (data: TeacherAdmin): Promise<string> => {
        const index = teacher.findIndex(teach => teach.id === data.id);
        teacher[index] = data;
        setTeacher([...teacher]);
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['PUT' + API_LOCATION],
        mutationFn: putLocation,
    });

    return { mutateAsync };
};

export default usePutTeacher;
