import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteLocation = () => {
    const queryClient = useQueryClient();

    const deleteLocation = async (id: number): Promise<{ deleted: boolean }> => {
        const res = await api.delete<{ deleted: boolean }>(
            ENDPOINTS.fetchAdminLocationsById.expand({ id })
        );
        if (res.data.deleted) {
            queryClient.invalidateQueries({ queryKey: [ENDPOINTS.fetchAdminLocations] });
        }
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: [ENDPOINTS.fetchAdminLocations],
        mutationFn: deleteLocation,
    });

    return { mutateAsync };
};

export default useDeleteLocation;
