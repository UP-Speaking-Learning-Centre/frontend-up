import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { CreateNonUserPayload, NonUserItem } from '@/types/non-user';
import { toast } from 'sonner';

const createNonUserMutation = async (data: CreateNonUserPayload): Promise<{ data: NonUserItem }> => {
    const response = await api.post(ENDPOINTS.baseNonUser, data);
    return response.data;
};

export const useCreateNonUserMutation = (): UseMutationResult<
    { data: NonUserItem },
    Error,
    CreateNonUserPayload
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNonUserMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['non-users'] });
            toast.success('Non User berhasil ditambahkan', {
                position: 'top-center',
                className: 'bg-green-200 border-green-300 text-green-900',
            });
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.message || error.message || 'Gagal menambahkan non user';
            toast.error(message, {
                position: 'top-center',
                className: 'bg-red-200 border-red-300 text-red-900',
            });
        },
    });
};
