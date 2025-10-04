import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponsePlacementTest } from '@/types/placement-test';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';
import { getCookiesToken } from '@/features/auth/utils/cookies.helper';

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
    const setState = useDisplayedPlacementTestStore(state => state.setState);
    const query = useQuery({
        queryKey: [ENDPOINTS.fetchAdminDetailPlacementTest],
        queryFn: () => fetchDetailPlacementTest({ id }),
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
            });
        }
    }, [query.data, query.status]);

    return query;
};

export default useFetchDetailPlacementTestQuery;
