import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { GradeType } from '@/types/programs-selection';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

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

const useFetchGradesQuery = (): UseQueryResult<GradeType[], Error> => {
    const {
        programId: programIdFromStore,
        groupId: groupIdFromStore,
        levelId: levelIdFromStore,
    } = useProgramSelectionStore(s => s.formValue);
    const res = useQuery({
        queryKey: ['grades', programIdFromStore, groupIdFromStore, levelIdFromStore],
        queryFn: () =>
            fetchGrades({
                programId: programIdFromStore as string,
                groupId: groupIdFromStore as string,
                levelId: levelIdFromStore as string,
            }),
        enabled: !!programIdFromStore && !!groupIdFromStore && !!levelIdFromStore,
    });

    return res;
};

export default useFetchGradesQuery;
