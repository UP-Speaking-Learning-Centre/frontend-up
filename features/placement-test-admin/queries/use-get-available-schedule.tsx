import api from '@/lib/api';
import { AvailableScheduleType } from '@/types/programs-selection';
import React from 'react';
import { API_AVAIL_SCHEDULE, API_LOCATION } from '../constants/config';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import { useQuery } from '@tanstack/react-query';

const useGetAvailableSchedule = () => {
    const { assignedLocation } = useDisplayedPlacementTestStore();
    const get = async () => {
        const res = await api.get<any>(
            API_AVAIL_SCHEDULE.expand({ id: assignedLocation })
        );
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery<AvailableScheduleType[]>({
        queryKey: [API_AVAIL_SCHEDULE.expand({ id: assignedLocation })],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetAvailableSchedule;
