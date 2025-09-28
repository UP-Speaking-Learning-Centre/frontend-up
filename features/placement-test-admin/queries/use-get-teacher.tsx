import api from '@/lib/api';
import { ResponseTeacher } from '@/types/placement-test';
import { useQuery } from '@tanstack/react-query';
import { API_AVAIL_TEACHER } from '../constants/config';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useGetTeacher = () => {
    const assignedLocation = useDisplayedPlacementTestStore(s => s.assignedLocation);

    const get = async () => {
        const res = await api.get<ResponseTeacher[]>(
            API_AVAIL_TEACHER.expand({ id: assignedLocation })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [API_AVAIL_TEACHER.expand({ id: assignedLocation })],
        queryFn: get,
        enabled: !!assignedLocation
    });

    return { data, isLoading };
};

export default useGetTeacher;
