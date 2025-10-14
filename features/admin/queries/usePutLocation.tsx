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
        const { id, imgLink, ...rest } = data;
        const res = await api.patch(ENDPOINTS.fetchAdminLocationsById.expand({ id }), rest, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const index = location.findIndex(locate => locate.id === id);
        location[index] = res.data;
        setLocation([...location]);
        return res.data;
    };

    const res = useMutation({
        mutationKey: [ENDPOINTS.fetchAdminLocationsById],
        mutationFn: putLocation,
    });

    return res;
};

export default usePutLocation;
