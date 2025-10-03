import api from '@/lib/api';
import { ResponseProgram } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_PROGRAM } from '../constants/config';

const useGetProgram = () => {
    const get = async () => {
        const res = await api.get<ResponseProgram[]>(API_PROGRAM);
        return res.data;
    };

    const { data, isLoading } = useQuery({ queryKey: [API_PROGRAM], queryFn: get });

    return { data, isLoading };
};

export default useGetProgram;
