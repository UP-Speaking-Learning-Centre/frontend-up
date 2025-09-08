import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { GroupType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

const fetchGroups = async (programId: string): Promise<GroupType[]> => {
    const res = await api.get<GroupType[]>(ENDPOINTS.fetchGroups.expand({ programId }));
    return res.data;
};

const useFetchGroupsQuery = (): UseQueryResult<GroupType[], Error> => {
    const { programId: programIdFromStore } = useProgramSelectionStore(s => s.formValue);
    const res = useQuery({
        queryKey: ['groups', programIdFromStore],
        queryFn: () => fetchGroups(programIdFromStore as string),
        enabled: !!programIdFromStore,
    });

    return res;
};

export default useFetchGroupsQuery;
