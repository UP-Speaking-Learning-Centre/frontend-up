import api from '@/lib/api';
import { ResponseLevel } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';
import { API_GROUP, API_PROGRAM } from '../constants/config';
import useGetProgram from './use-get-program';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useGetGroup = () => {
    const program = useDisplayedPlacementTestStore(s => s.test?.program);
    const { data: dataProgram } = useGetProgram();
    const programId = dataProgram?.find(program_ => program_.name === program)?.id ?? '';

    const get = async () => {
        const res = await api.get<any>(API_GROUP.expand({ programId }));
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery<ResponseLevel[]>({
        queryKey: [API_GROUP.expand({ programId })],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetGroup;
