import { LocationAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import { useEffect } from 'react';
import api from '@/lib/api';
import { BaseResponse } from '@/types/general';
import ENDPOINTS from '@/constants/endpoints';

const useGetLocation = (params?: any) => {
    const setLocation = useLocationManagementStore(s => s.setLocation);

    const getLocation = async (): Promise<LocationAdmin[]> => {
        const res = await api.get<any>(ENDPOINTS.fetchAdminLocations, {
            params,
        });

        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchAdminLocations],
        queryFn: getLocation,
    });

    useEffect(() => {
        setLocation(data ?? []);
    }, [data]);

    return { data, isLoading };
};

export default useGetLocation;
