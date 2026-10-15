import api from '@/lib/api';
import { ResponseProgram } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_PROGRAM } from '../constants/config';

const useGetProgram = () => {
    const get = async () => {
        const res = await api.get<any>(API_PROGRAM);
        return Array.isArray(res.data) ? res.data : res.data?.data || [];
    };

    const { data, isLoading } = useQuery<ResponseProgram[]>({ queryKey: [API_PROGRAM], queryFn: get });

    return { data, isLoading };
};

export default useGetProgram;
