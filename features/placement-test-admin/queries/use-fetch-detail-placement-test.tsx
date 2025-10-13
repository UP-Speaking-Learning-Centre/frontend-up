import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponsePlacementTest } from '@/types/placement-test';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';
import useGetLevel from './use-get-level';

const fetchDetailPlacementTest = async ({ id }: { id: string }): Promise<ResponsePlacementTest> => {
    const response = await api.get(ENDPOINTS.fetchAdminDetailPlacementTest.expand({ id }), {
        headers: {
            Authorization: `Bearer ` + (await getCookiesToken()),
        },
    });
    const data = await response.data;

    return data as ResponsePlacementTest;
};

const useFetchDetailPlacementTestQuery = ({
    id,
}: {
    id: string;
}): UseQueryResult<ResponsePlacementTest, Error> => {
    const { data: dataLevel, isLoading: isLoadingLevel } = useGetLevel();
    const setState = useDisplayedPlacementTestStore(state => state.setState);
    const query = useQuery({
        queryKey: [ENDPOINTS.fetchAdminDetailPlacementTest.expand({ id })],
        queryFn: () => fetchDetailPlacementTest({ id }),
        staleTime: 0,
    });

    useEffect(() => {
        if (query.status === 'success' && query.data.status) {
            setState({
                questions: query.data.qa,
                totalQuestions: query.data.qa.length,
                currentQuestionIndex: 0,
                student: query.data.student,
                test: query.data.test,
                testDate: query.data.submittedAt,
                status: query.data?.status,
                assignedLevel: dataLevel
                    ?.find(
                        level =>
                            level.name.toLocaleLowerCase() ===
                            query.data.determinedLevel?.toLocaleLowerCase()
                    )
                    ?.id.toString(),
                isGraded: query.data.status === 'Graded',
            });
        }
    }, [query.data, query.status, dataLevel]);

    return query;
};

export default useFetchDetailPlacementTestQuery;
