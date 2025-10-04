import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { LevelType, ProgramType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import { useNewStudyGroupStore } from '@/features/schedule-management/stores/new-study-group-store';

const fetchLevels = async (programId: string, groupId: string): Promise<LevelType[]> => {
    const res = await api.get<LevelType[]>(ENDPOINTS.fetchLevels.expand({ programId, groupId }));
    return res.data;
};

const useFetchLevelsQuery = (fromStudyGroup = false): UseQueryResult<LevelType[]> => {
    const { groupId, programId } = useProgramSelectionStore(s => s.formValue);
    const { groupId: newGroupId, programId: newProgramId } = useNewStudyGroupStore(
        s => s.formValue
    );
    const ids = fromStudyGroup
        ? [newProgramId as string, newGroupId as string]
        : [programId as string, groupId as string];
    const enabled = fromStudyGroup ? !!newProgramId && !!newGroupId : !!programId && !!groupId;

    const res = useQuery({
        queryKey: [
            'levels',
            fromStudyGroup ? newProgramId : programId,
            fromStudyGroup ? newGroupId : groupId,
        ],
        queryFn: () => fetchLevels(ids[0], ids[1]),
        enabled,
    });

    return res;
};

export default useFetchLevelsQuery;
