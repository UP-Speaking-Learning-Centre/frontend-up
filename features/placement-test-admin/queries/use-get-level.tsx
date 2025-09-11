import api from '@/lib/api';
import { ResponseLevel } from '@/types/placement-test';
import { API_LEVEL, API_LOCATION } from '../constants/config';
import useGetProgram from './use-get-program';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import useGetGroup from './use-get-group';
import { useQuery } from '@tanstack/react-query';

const useGetLevel = () => {
    const program = useDisplayedPlacementTestStore(s => s.test?.program);
    const group = useDisplayedPlacementTestStore(s => s.test?.group);
    const { data: dataProgram } = useGetProgram();
    const { data: dataGroup } = useGetGroup();

    const get = async () => {
        const res = await api.get<ResponseLevel[]>(
            API_LEVEL.expand({
                programId: dataProgram?.find(program_ => program_.name === program)?.id ?? '',
                groupId: dataGroup?.find(group_ => group_.name === group)?.id ?? '',
            })
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({ queryKey: [API_LEVEL,dataProgram,dataGroup], queryFn: get });

    return { data, isLoading };
};

export default useGetLevel;
