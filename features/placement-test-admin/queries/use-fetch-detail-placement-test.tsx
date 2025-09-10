import data from '@/data/placement-test-answered.json';
import { ResponsePlacementTest } from '@/types/placement-test';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const fetchDetailPlacementTest = async ({ id }: { id: string }): Promise<ResponsePlacementTest> => {
    // const response = await api.get(ENDPOINTS.fetchDetailPlacementTest.expand({ id }));
    // const data = await response.data;
    return data as ResponsePlacementTest;
};

const useFetchDetailPlacementTestQuery = ({
    id,
}: {
    id: string;
}): UseQueryResult<ResponsePlacementTest, Error> => {
    const setState = useDisplayedPlacementTestStore(state => state.setState);
    const query = useQuery({
        queryKey: ['detail-placement-test'],
        queryFn: () => fetchDetailPlacementTest({ id }),
    });

    useEffect(() => {
        if (query.status === 'success') {
            setState({
                questions: query.data.qa,
                totalQuestions: query.data.qa.length,
                currentQuestionIndex: 0,
                student: query.data.student,
                test: query.data.test,
                testDate: query.data.submittedAt,
            });
        }
    }, [query.status]);
    return query;
};

export default useFetchDetailPlacementTestQuery;
