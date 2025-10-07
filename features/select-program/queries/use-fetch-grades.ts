import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { GradeType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import { useNewStudyGroupStore } from '@/features/schedule-management/stores/new-study-group-store';

const fetchGrades = async ({
    programId,
    groupId,
    levelId,
}: {
    programId: string;
    groupId: string;
    levelId: string;
}): Promise<GradeType[]> => {
    const res = await api.get<GradeType[]>(
        ENDPOINTS.fetchGrades.expand({ programId, groupId, levelId })
    );
    return res.data;
};

const useFetchGradesQuery = (fromStudyGroup = false): UseQueryResult<GradeType[], Error> => {
    const {
        programId: programIdFromStore,
        groupId: groupIdFromStore,
        levelId: levelIdFromStore,
    } = useProgramSelectionStore(s => s.formValue);

    const { programId, groupId, levelId } = useNewStudyGroupStore(s => s.formValue);

    const res = useQuery({
        queryKey: [
            'grades',
            fromStudyGroup ? programId : programIdFromStore,
            fromStudyGroup ? groupId : groupIdFromStore,
            fromStudyGroup ? levelId : levelIdFromStore,
        ],
        queryFn: () =>
            fetchGrades({
                programId: fromStudyGroup ? (programId as string) : (programIdFromStore as string),
                groupId: fromStudyGroup ? (groupId as string) : (groupIdFromStore as string),
                levelId: fromStudyGroup ? (levelId as string) : (levelIdFromStore as string),
            }),
        enabled: fromStudyGroup
            ? !!programId && !!groupId && !!levelId
            : !!programIdFromStore && !!groupIdFromStore && !!levelIdFromStore,
    });

    return res;
};

export default useFetchGradesQuery;
