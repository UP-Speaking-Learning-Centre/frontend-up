import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { API_LOCATION } from '../constants/config';
import { ResponseLocation } from '@/types/placement-test-admin';

const useGetLocation = () => {
    const get = async () => {
        const res = await api.get<ResponseLocation[]>(API_LOCATION);
        return res.data;
    };

    const { data, isLoading } = useQuery({ queryKey: [API_LOCATION], queryFn: get });

    return { data, isLoading };
};

export default useGetLocation;
