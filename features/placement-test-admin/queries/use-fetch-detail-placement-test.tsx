import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { Question } from '@/types/placement-test';
import data from '@/data/placement-test-answered.json';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const fetchDetailPlacementTest = async ({ id }: { id: string }): Promise<Question[]> => {
    // const response = await api.get(ENDPOINTS.fetchDetailPlacementTest.expand({ id }));
    // const data = await response.data;
    return data.questions;
};

const useFetchDetailPlacementTestQuery = ({
    id,
}: {
    id: string;
}): UseQueryResult<Question[], Error> => {
    const setState = useDisplayedPlacementTestStore(state => state.setState);
    const query = useQuery({
        queryKey: ['detail-placement-test'],
        queryFn: () => fetchDetailPlacementTest({ id }),
    });

    useEffect(() => {
        if (query.status === 'success') {
            setState({
                questions: query.data,
                totalQuestions: query.data.length,
                currentQuestionIndex: 0,
            });
        }
    }, [query.status]);
    return query;
};

export default useFetchDetailPlacementTestQuery;
