import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { CreateStaffRequest, StaffDetailResponse } from '@/types/staff';
import { toast } from 'sonner';

const createStaffMutation = async (data: CreateStaffRequest): Promise<StaffDetailResponse> => {
    const response = await api.post(ENDPOINTS.baseStaff, data);
    return response.data;
};

export const useCreateStaffMutation = (): UseMutationResult<
    StaffDetailResponse,
    Error,
    CreateStaffRequest
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStaffMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffs'] });
            toast.success('Staff berhasil ditambahkan', {
                position: 'top-center',
                className: 'bg-green-200 border-green-300 text-green-900',
            });
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.message || error.message || 'Gagal menambahkan staff';
            toast.error(message, {
                position: 'top-center',
                className: 'bg-red-200 border-red-300 text-red-900',
            });
        },
    });
};
