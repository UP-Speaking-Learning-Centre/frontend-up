import api from '@/lib/api';
import { ResponseGrade } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';
import { API_GRADE } from '../constants/config';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useGetGrade = () => {
    const programId = useDisplayedPlacementTestStore(s => s.test?.programId);
    const groupId = useDisplayedPlacementTestStore(s => s.test?.groupId);
    const { assignedLevel } = useDisplayedPlacementTestStore();

    const get = async () => {
        if (!programId || !groupId) return;
        const res = await api.get<ResponseGrade[]>(
            API_GRADE.expand({
                programId,
                groupId,
                levelId: assignedLevel,
            })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_GRADE, assignedLevel],
        queryFn: get,
    });

    return { data, isLoading };
};

export default useGetGrade;
