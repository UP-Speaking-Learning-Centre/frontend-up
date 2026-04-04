import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { UpdateStaffRequest, StaffDetailResponse } from '@/types/staff';
import { toast } from 'sonner';

interface UpdateStaffParams {
    id: number | string;
    data: UpdateStaffRequest;
}

const updateStaffMutation = async ({
    id,
    data,
}: UpdateStaffParams): Promise<StaffDetailResponse> => {
    const url = ENDPOINTS.staffById.expand({ id });
    const response = await api.patch(url, data);
    return response.data;
};

export const useUpdateStaffMutation = (): UseMutationResult<
    StaffDetailResponse,
    Error,
    UpdateStaffParams
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStaffMutation,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['staffs'] });
            queryClient.invalidateQueries({ queryKey: ['staff', variables.id] });
            toast.success('Staff berhasil diperbarui', {
                position: 'top-center',
                className: 'bg-green-200 border-green-300 text-green-900',
            });
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.message || error.message || 'Gagal memperbarui staff';
            toast.error(message, {
                position: 'top-center',
                className: 'bg-red-200 border-red-300 text-red-900',
            });
        },
    });
};
