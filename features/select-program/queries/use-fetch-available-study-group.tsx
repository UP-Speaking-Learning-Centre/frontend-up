import { StudyGroup } from '@/types/study-group';

// import dummy from '@/data/study-group-detail.json';
import { useQuery } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';
import { sleep } from '@/lib/mock';
// import { sleep } from '@/lib/mock';

const fetchAvailableStudyGroupQuery = async ({
    locationId,
    groupId,
    programId,
    levelId,
    packageId,
}: {
    locationId: string | number;
    groupId: string | number;
    programId: string | number;
    levelId: string | number;
    packageId: string | number;
}): Promise<StudyGroup[]> => {
    await sleep(1000);
    const res = await api.get<StudyGroup[]>(
        ENDPOINTS.fetchAvailableStudyGroup.expand({
            locationId,
            groupId,
            programId,
            levelId,
            packageId,
        })
    );

    // return dummy;
    return res.data;
};

const useFetchAvailableStudyGroupQuery = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { locationId, groupId, programId, levelId, packageId } = formValue;
    return useQuery({
        queryKey: ['available-study-group', locationId, groupId, programId, levelId, packageId],
        queryFn: () =>
            fetchAvailableStudyGroupQuery({ locationId, groupId, programId, levelId, packageId }),
        enabled: !!locationId && !!groupId && !!programId && !!levelId && !!packageId,
    });
};

export default useFetchAvailableStudyGroupQuery;
