import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import usePlacementTestGuestStore from '../stores/placemenet-test-guest-store';
import { PlacementTestResponse } from '@/types/placement-test';
import { AxiosError } from 'axios';

const fetchPlacementTest = async (data: { groupId: number }): Promise<PlacementTestResponse> => {
    const res = await api.post<any>(ENDPOINTS.fetchPlacementTest, data);
    const rawData = res.data?.data || res.data || {};
    const rawQuestions = Array.isArray(rawData.questions) ? rawData.questions : [];
    const questions = rawQuestions.map((q: any) => ({
        id: q.id,
        questionText: q.questionText || q.question_text || '',
        questionType: q.questionType || q.question_type || '',
        instruction: q.instruction || '',
        options: q.options || [],
        studentAnswer: q.studentAnswer || '',
    }));
    return {
        questions,
        testSessionId: rawData.testSessionId || rawData.placementTestId?.toString() || 'mock-session-1',
    };
};

const useFetchPlacementTestMutation = (): UseMutationResult<
    PlacementTestResponse,
    AxiosError,
    { groupId: number }
> => {
    const setQuestions = usePlacementTestGuestStore(s => s.setQuestions);
    const setTestSessionId = usePlacementTestGuestStore(s => s.setTestSessionId);

    return useMutation({
        mutationFn: (data: { groupId: number }) => fetchPlacementTest(data),
        onSuccess: data => {
            setQuestions(data.questions);
            setTestSessionId(data.testSessionId);
        },
    });
};

export default useFetchPlacementTestMutation;
