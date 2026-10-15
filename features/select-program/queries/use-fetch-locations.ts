import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { LocationType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const fetchLocations = async (): Promise<LocationType[]> => {
    const res = await api.get<any>(ENDPOINTS.fetchLocations);
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

const useFetchLocationsQuery = (): UseQueryResult<LocationType[], Error> => {
    const res = useQuery({
        queryKey: ['locations'],
        queryFn: () => fetchLocations(),
    });

    return res;
};

export default useFetchLocationsQuery;
