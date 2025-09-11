import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { API_AVAIL_TEACHER, API_LOCATION } from '../constants/config';
import { ResponseLocation } from '@/types/placement-test-admin';
import { ResponseTeacher } from '@/types/placement-test';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useGetTeacher = () => {
    const assignedLocation = useDisplayedPlacementTestStore(s => s.assignedLocation);

    const get = async () => {
        const res = await api.get<ResponseTeacher[]>(
            API_AVAIL_TEACHER.expand({ id: assignedLocation })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_AVAIL_TEACHER.expand({ id: assignedLocation })],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetTeacher;
