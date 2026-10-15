import api from '@/lib/api';
import { ResponseLevel } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';
import { API_LEVEL } from '../constants/config';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useGetLevel = () => {
    const programId = useDisplayedPlacementTestStore(s => s.test?.programId);
    const groupId = useDisplayedPlacementTestStore(s => s.test?.groupId);

    const get = async () => {
        if (!programId || !groupId) return;
        const res = await api.get<any>(
            API_LEVEL.expand({
                programId,
                groupId,
            })
        );
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery<ResponseLevel[]>({
        queryKey: [API_LEVEL, programId, groupId],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetLevel;
