import { useQuery } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { NonUserListResponse, NonUserItem } from '@/types/non-user';

export interface FetchNonUsersParams {
    page: number;
    limit: number;
    search?: string;
    sourceLead?: string;
    funnelStage?: string;
    statusLead?: string;
    picRole?: string[];
    picStaff?: string[];
    lastFollowUpFrom?: string;
    lastFollowUpTo?: string;
}

const fetchListNonUsers = async (params: FetchNonUsersParams): Promise<NonUserListResponse> => {
    const urlParams: any = {
        page: params.page,
        limit: params.limit,
    };
    const url = ENDPOINTS.fetchNonUsers.expand(urlParams);

    // Pass everything else or re-pass as params to axios to make sure arrays are handled correctly
    const axiosParams: Record<string, any> = {};
    if (params.search) axiosParams.search = params.search;
    if (params.sourceLead) axiosParams.sourceLead = params.sourceLead;
    if (params.funnelStage) axiosParams.funnelStage = params.funnelStage;
    if (params.statusLead) axiosParams.statusLead = params.statusLead;
    if (params.lastFollowUpFrom) axiosParams.lastFollowUpFrom = params.lastFollowUpFrom;
    if (params.lastFollowUpTo) axiosParams.lastFollowUpTo = params.lastFollowUpTo;

    if (params.picRole && params.picRole.length > 0) {
        axiosParams.picRole = params.picRole.join(',');
    }
    if (params.picStaff && params.picStaff.length > 0) {
        axiosParams.picStaff = params.picStaff.join(',');
    }

    const response = await api.get(url, { params: axiosParams });
    return response.data;
};

export const useFetchListNonUsers = (params: FetchNonUsersParams) => {
    return useQuery({
        queryKey: ['non-users', params],
        queryFn: () => fetchListNonUsers(params),
    });
};

const fetchDetailNonUser = async (id: number): Promise<{ data: NonUserItem }> => {
    const url = ENDPOINTS.nonUserById.expand({ id });
    const response = await api.get(url);
    return response.data;
};

export const useFetchDetailNonUser = (id: number) => {
    return useQuery({
        queryKey: ['non-users', 'detail', id],
        queryFn: () => fetchDetailNonUser(id),
        enabled: !!id,
    });
};
