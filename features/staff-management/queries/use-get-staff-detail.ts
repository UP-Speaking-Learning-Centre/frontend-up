import { useQuery } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { StaffDetailResponse } from '@/types/staff';

const getStaffDetail = async (id: number | string): Promise<StaffDetailResponse> => {
    const url = ENDPOINTS.staffById.expand({ id });
    const response = await api.get(url);
    return response.data;
};

export const useGetStaffDetail = (id: number | string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['staff', id],
        queryFn: () => getStaffDetail(id),
        enabled: options?.enabled !== false && !!id,
    });
};
