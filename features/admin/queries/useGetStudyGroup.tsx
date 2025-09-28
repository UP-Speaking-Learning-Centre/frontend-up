import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponseStudyGroup } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';

const useGetStudyGroup = () => {
    const get = async () => {
        const res = await api.get<ResponseStudyGroup[]>(
            ENDPOINTS.fetchStudyGroups.expand({
                locationId: 1,
            })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchStudyGroups.expand({ locationId: 1 })],
        queryFn: get,
        select: data =>
            data.map(item => ({ ...item, id: item.studyGroupId, name: item.studyGroupName })),
    });

    return { data, isLoading };
};

export default useGetStudyGroup;
