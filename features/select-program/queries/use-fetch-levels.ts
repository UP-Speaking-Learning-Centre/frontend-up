import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { LevelType, ProgramType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const fetchLevels = async (programId: string, groupId: string): Promise<LevelType[]> => {
    const res = await api.get<LevelType[]>(ENDPOINTS.fetchLevels.expand({ programId, groupId }));
    return res.data;
};

const useFetchLevelsQuery = (): UseQueryResult<LevelType[]> => {
    const { groupId, programId } = useProgramSelectionStore(s => s.formValue);
    const res = useQuery({
        queryKey: ['levels', programId, groupId],
        queryFn: () => fetchLevels(programId as string, groupId as string),
        enabled: !!programId && !!groupId,
    });

    return res;
};

export default useFetchLevelsQuery;
