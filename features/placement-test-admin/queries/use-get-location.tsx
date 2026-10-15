import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { API_LOCATION } from '../constants/config';
import { ResponseLocation } from '@/types/placement-test-admin';
import { useScheduleManagementStore } from '@/features/schedule-management/stores/schedule-management-store';

const useGetLocation = () => {
    const get = async () => {
        const res = await api.get<any>(API_LOCATION);
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const query = useQuery<ResponseLocation[]>({ queryKey: [API_LOCATION], queryFn: get });
    const setLocation = useScheduleManagementStore(s => s.setLocationId);

    useEffect(() => {
        if (query.data) {
            setLocation(query.data[0].locationId);
        }
    }, [query.data]);

    const { data, isLoading } = query;
    return { data, isLoading };
};

export default useGetLocation;
