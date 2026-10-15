import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponseAlias } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useGetAlias = () => {
    const get = async () => {
        const dummy = [
            {
                "id": 1,
                "alias": "Baby Bear",
                "coordinator": null
            },
            {
                "id": 2,
                "alias": "Papa Bear",
                "coordinator": null
            },
            {
                "id": 3,
                "alias": "Mama Bear",
                "coordinator": null
            }
        ] satisfies ResponseAlias[];
        const res = await api.get<any>(ENDPOINTS.fetchAlias);
        // return dummy;
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
        
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchAlias],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetAlias;
