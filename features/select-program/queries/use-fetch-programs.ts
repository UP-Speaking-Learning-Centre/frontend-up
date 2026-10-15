import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ProgramType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchPrograms = async (): Promise<ProgramType[]> => {
    const res = await api.get<any>(ENDPOINTS.fetchPrograms);
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

const useFetchProgramsQuery = (): UseQueryResult<ProgramType[]> => {
    const res = useQuery({
        queryKey: ['programs'],
        queryFn: fetchPrograms,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return res;
};

export default useFetchProgramsQuery;
