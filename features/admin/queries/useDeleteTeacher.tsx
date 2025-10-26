import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_TEACHERS } from '../constants/config';
import { useTeacherManagementStore } from '../stores/teacher';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { toast } from 'sonner';

const useDeleteTeacher = () => {
    const queryClient = useQueryClient();

    const deleteTeacher = async (id: number): Promise<{ success: string }> => {
        const res = await api.delete(ENDPOINTS.fetchTeachersById.expand({ id }));
        if (res.data.success) {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.fetchTeachers] });
        }
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['DELETE' + API_TEACHERS],
        mutationFn: deleteTeacher,
        onSuccess: () => {
            toast.success('Teacher berhasil dihapus', {
                className: 'bg-green-50',
                position: 'top-center',
            });
        },
        onError: () => {
            toast.error(
                'Gagal menghapus teacher. Teacher tidak bisa dihapus karena memiliki jadwal',
                {
                    className: 'bg-red-50 text-red-500',
                    position: 'top-center',
                    duration: 3000,
                }
            );
        },
    });

    return { mutateAsync };
};

export default useDeleteTeacher;
