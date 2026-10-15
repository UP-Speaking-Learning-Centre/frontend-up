import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { AvailableScheduleType, GroupType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import data from '@/data/available-schedule.json';

const fetchAvailableSchedule = async (locationId: string): Promise<AvailableScheduleType[]> => {
    const res: any = await api.get(
        ENDPOINTS.fetchAvailableSchedule.expand({ locationId })
    );
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

const useFetchAvailableScheduleQuery = (): UseQueryResult<AvailableScheduleType[]> => {
    const { locationId } = useProgramSelectionStore(s => s.formValue);
    const res = useQuery({
        queryKey: ['available-schedules', locationId],
        queryFn: () => fetchAvailableSchedule(locationId as string),
        enabled: !!locationId,
    });

    return res;
};

export default useFetchAvailableScheduleQuery;
