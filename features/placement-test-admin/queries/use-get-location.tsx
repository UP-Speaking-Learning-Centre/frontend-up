import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { API_LOCATION } from '../constants/config';
import { ResponseLocation } from '@/types/placement-test-admin';
import { useScheduleManagementStore } from '@/features/schedule-management/stores/schedule-management-store';

const useGetLocation = () => {
    const get = async (): Promise<ResponseLocation[]> => {
        const res = await api.get<any>(API_LOCATION);
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        return list.map((item: any) => ({
            locationId: item.locationId ?? item.id,
            locationName: item.locationName ?? item.name ?? '',
        }));
    };

    const query = useQuery<ResponseLocation[]>({ queryKey: [API_LOCATION], queryFn: get });
    const setLocation = useScheduleManagementStore(s => s.setLocationId);

    const locationId = useScheduleManagementStore(s => s.locationId);

    useEffect(() => {
        if (query.data && query.data.length > 0 && !locationId) {
            setLocation(query.data[0].locationId);
        }
    }, [query.data, locationId]);

    const { data, isLoading } = query;
    return { data, isLoading };
};

export default useGetLocation;
