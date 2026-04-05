import { useQuery } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { StaffResponse } from '@/types/staff';

const fetchStaffsByRole = async (roles: string[]): Promise<StaffResponse> => {
    // Join roles with comma if there are multiple, assuming backend handles this format
    const roleParam = roles.join(',');
    const url = ENDPOINTS.staffByRole.expand({ roles: roleParam });
    const response = await api.get(url);
    return response.data;
};

export const useGetStaffsByRole = (roles: string[]) => {
    return useQuery({
        queryKey: ['staffsByRole', roles],
        queryFn: () => fetchStaffsByRole(roles),
        enabled: roles.length > 0,
    });
};
