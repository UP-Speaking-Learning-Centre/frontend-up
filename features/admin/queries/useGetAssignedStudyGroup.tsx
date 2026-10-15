import { useQuery, UseQueryResult } from '@tanstack/react-query';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { StudendOfStudyGrouResponse } from '@/types/students';

const fetchStudentOfStudyGroup = async (
    studyGroupId: number
): Promise<StudendOfStudyGrouResponse> => {
    const response = await api.get<any>(
        ENDPOINTS.fetchStudentOfStudyGroup.expand({ studyGroupId })
    );
    const data = response.data?.data || response.data;
    if (Array.isArray(data)) {
        return {
            studyGroupId,
            count: data.length,
            students: data,
        } as StudendOfStudyGrouResponse;
    }
    return data as StudendOfStudyGrouResponse;
};

export const useGetAssignedStudyGroup = (
    studyGroupId: number
): UseQueryResult<StudendOfStudyGrouResponse> => {
    const query = useQuery({
        queryKey: ['student-of-study-group', studyGroupId],
        queryFn: () => fetchStudentOfStudyGroup(studyGroupId as number),
        enabled: !!studyGroupId,
    });

    return query;
};
