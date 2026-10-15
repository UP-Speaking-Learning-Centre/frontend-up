import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { StudyGroup, StudyGroupDetail } from '@/types/study-group';
import { useQuery } from '@tanstack/react-query';

const useGetStudyGroupDetail = (id: number) => {
    const get = async () => {
        const res = await api.get<any>(
            ENDPOINTS.fetchStudyGroupDetail.expand({
                studyGroupId: id,
            })
        );
        return res.data?.data || res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [ENDPOINTS.fetchStudyGroupDetail.expand({ studyGroupId: id })],
        queryFn: get,
        enabled: id > 0,
    });

    return { data, isLoading };
};

export default useGetStudyGroupDetail;
