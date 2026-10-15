import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponseStudyGroup } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';

const useGetStudyGroup = (locationId: number) => {
    const get = async () => {
        const res = await api.get<any>(
            ENDPOINTS.fetchStudyGroups.expand({
                locationId,
            })
        );
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchStudyGroups.expand({ locationId })],
        queryFn: get,
        select: (data: any[]) =>
            data.map((item: any) => ({ ...item, id: item.studyGroupId, name: item.studyGroupName })),
        enabled: locationId > 0
    });

    return { data, isLoading };
};

export default useGetStudyGroup;
