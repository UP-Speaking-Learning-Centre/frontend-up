import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_TEACHERS } from '../constants/config';
import { useTeacherManagementStore } from '../stores/teacher';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const useDeleteTeacher = () => {
    const queryClient = useQueryClient();

    const deleteLocation = async (id: number): Promise<{ success: string }> => {
        const res = await api.delete(ENDPOINTS.fetchTeachersById.expand({ id }));
        if (res.data.success) {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.fetchTeachers] });
        }
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['DELETE' + API_TEACHERS],
        mutationFn: deleteLocation,
    });

    return { mutateAsync };
};

export default useDeleteTeacher;
