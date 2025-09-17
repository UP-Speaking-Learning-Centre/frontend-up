import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface SubmitPlacementTestInput {
    testSessionId: string;
    answers: {
        questionId: number;
        studentAnswer: string;
    }[];
}

interface SubmitPlacementTestResponse {
    message: string;
    testSessionId: string;
    score: number;
}

const submitPlacementTestMutation = async (
    data: SubmitPlacementTestInput
): Promise<SubmitPlacementTestResponse> => {
    const response = await api.post(ENDPOINTS.submitPlacementTest, data);
    return response.data;
};

export const useSubmitPlacementTestMutation = (): UseMutationResult<
    SubmitPlacementTestResponse,
    Error,
    SubmitPlacementTestInput
> => {
    return useMutation({
        mutationFn: submitPlacementTestMutation,
    });
};
