import { useMutation } from '@tanstack/react-query';
import { API_TEACHERS } from '../constants/config';
import { useTeacherManagementStore } from '../stores/teacher';

const useDeleteTeacher = () => {
    const teacher = useTeacherManagementStore(s => s.teacher);
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);

    const deleteLocation = async (id: number): Promise<string> => {
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
