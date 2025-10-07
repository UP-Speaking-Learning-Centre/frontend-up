import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { LocationType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const fetchLocations = async (): Promise<LocationType[]> => {
    const res = await api.get<LocationType[]>(ENDPOINTS.fetchLocations);
    return res.data;
};

const useFetchLocationsQuery = (): UseQueryResult<LocationType[], Error> => {
    const res = useQuery({
        queryKey: ['locations'],
        queryFn: () => fetchLocations(),
    });

    return res;
};

export default useFetchLocationsQuery;
