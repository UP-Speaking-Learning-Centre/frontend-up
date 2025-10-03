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
        const res = await api.post<LocationAdmin>(ENDPOINTS.fetchAdminLocations, data, {
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
        });
        if (res.status === 201) {
            setLocation([res.data,...location]);
        }
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: [ENDPOINTS.fetchAdminLocations],
        mutationFn: postLocation,
    });

    return { mutateAsync };
};

export default usePostLocation;
