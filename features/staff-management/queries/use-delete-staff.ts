import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { toast } from 'sonner';

const deleteStaffMutation = async (id: number | string): Promise<void> => {
    const url = ENDPOINTS.staffById.expand({ id });
    await api.delete(url);
};

export const useDeleteStaffMutation = (): UseMutationResult<void, Error, number | string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStaffMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffs'] });
            toast.success('Staff berhasil dihapus', {
                position: 'top-center',
                className: 'bg-green-200 border-green-300',
            });
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.message || error.message || 'Gagal menghapus staff';
            toast.error(message, {
                position: 'top-center',
                className: 'bg-red-200 border-red-300',
            });
        },
    });
};
