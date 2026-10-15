import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { GroupType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import { useNewStudyGroupStore } from '@/features/schedule-management/stores/new-study-group-store';

const fetchGroups = async (programId: string): Promise<GroupType[]> => {
    const res = await api.get<any>(ENDPOINTS.fetchGroups.expand({ programId }));
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
};

const useFetchGroupsQuery = (programId?: string): UseQueryResult<GroupType[], Error> => {
    const { programId: programIdFromStore } = useProgramSelectionStore(s => s.formValue);
    const { programId: programIdFromCreateNewGroup } = useNewStudyGroupStore(s => s.formValue);

    const res = useQuery({
        queryKey: ['groups', programIdFromStore, programId, programIdFromCreateNewGroup],
        queryFn: () =>
            fetchGroups(
                programId ||
                    (programIdFromStore as string) ||
                    (programIdFromCreateNewGroup as string)
            ),
        enabled: !!programIdFromStore || !!programIdFromCreateNewGroup,
    });

    return res;
};

export default useFetchGroupsQuery;
