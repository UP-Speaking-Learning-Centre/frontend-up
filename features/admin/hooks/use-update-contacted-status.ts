import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateContactedStatus = async (id: string) => {
    const response = await api.patch(ENDPOINTS.updateContactedStatus.expand({ id }));
    return response.data;
};

export const useUpdateContactedStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContactedStatus,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [ENDPOINTS.fetchAdminStudentById.expand({ id: variables })],
            });
        },
    });
};
