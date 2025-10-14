import { LocationAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { useLocationManagementStore } from '../stores/location';

const usePostLocation = () => {
    const location = useLocationManagementStore(s => s.location);
    const setLocation = useLocationManagementStore(s => s.setLocation);

    const postLocation = async (data: Omit<LocationAdmin, 'id'>): Promise<LocationAdmin> => {
        const { imgLink, ...rest } = data;
        const res = await api.post<LocationAdmin>(ENDPOINTS.fetchAdminLocations, rest, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.status === 201) {
            setLocation([res.data, ...location]);
        }
        return res.data;
    };

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [ENDPOINTS.fetchAdminLocations],
        mutationFn: postLocation,
    });

    return { mutateAsync, isPending };
};

export default usePostLocation;
