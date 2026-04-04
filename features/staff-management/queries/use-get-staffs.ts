import { useQuery } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { StaffResponse } from '@/types/staff';

interface GetStaffsParams {
    currentPage: number;
    limit: number;
}

const getStaffs = async ({ currentPage, limit }: GetStaffsParams): Promise<StaffResponse> => {
    const url = ENDPOINTS.fetchStaffs.expand({ currentPage, limit });
    const response = await api.get(url);
    return response.data;
};

export const useGetStaffs = (params: GetStaffsParams) => {
    return useQuery({
        queryKey: ['staffs', params],
        queryFn: () => getStaffs(params),
    });
};
