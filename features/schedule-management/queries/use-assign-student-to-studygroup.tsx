'use client';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import {
    AssignStudentToStudyGroupPayload,
    AssignStudentToStudyGroupResponse,
} from '@/types/study-group';
import { toast } from 'sonner';
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchStudentOfStudyGroup = async (
    data: AssignStudentToStudyGroupPayload
): Promise<AssignStudentToStudyGroupResponse> => {
    console.log(data);
    const response = await api.post<AssignStudentToStudyGroupResponse>(
        ENDPOINTS.assignStudentToStudyGroup,
        data
    );
    return response.data;
};

export const useAssignStudentToStudyGroupMutation = (): UseMutationResult<
    AssignStudentToStudyGroupResponse,
    Error,
    AssignStudentToStudyGroupPayload
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-new-study-group'],
        mutationFn: (data: AssignStudentToStudyGroupPayload) => fetchStudentOfStudyGroup(data),
        onSuccess: () => {
            toast.success('Student berhasil ditambahkan ke kelompok belajar', {
                className: 'bg-green-200 border-green-300',
                position: 'top-center',
            });
            queryClient.invalidateQueries({ queryKey: ['student-of-study-group'], exact: false });
        },
    });
};
