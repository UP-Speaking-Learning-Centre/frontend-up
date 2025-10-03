import { LocationAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const usePutLocation = () => {
    const setLocation = useLocationManagementStore(s => s.setLocation);
    const location = useLocationManagementStore(s => s.location);

    const putLocation = async (data: LocationAdmin): Promise<LocationAdmin> => {
        const { id, ...rest } = data;
        const res = await api.patch(ENDPOINTS.fetchAdminLocationsById.expand({ id }), rest);
        const index = location.findIndex(locate => locate.id === id);
        location[index] = res.data;
        setLocation([...location]);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: [ENDPOINTS.fetchAdminLocationsById],
        mutationFn: putLocation,
    });

    return { mutateAsync };
};

export default usePutLocation;
