'use client';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import {
    AssignStudentToStudyGroupPayload,
    AssignStudentToStudyGroupResponse,
    UnassignStudentFromStudyGroupPayload,
    UnassignStudentFromStudyGroupResponse,
} from '@/types/study-group';
import { toast } from 'sonner';
import { useScheduleManagementStore } from '../stores/schedule-management-store';

const unassignStudentFromStudyGroup = async (
    data: UnassignStudentFromStudyGroupPayload,
    studyGroupId: number
): Promise<UnassignStudentFromStudyGroupResponse> => {
    const response = await api.post<UnassignStudentFromStudyGroupResponse>(
        ENDPOINTS.unassignStudentFromStudyGroup.expand({ studyGroupId: studyGroupId }),
        data
    );
    return response.data;
};

export const useUnassignStudentFromStudyGroupMutation = (): UseMutationResult<
    UnassignStudentFromStudyGroupResponse,
    Error,
    UnassignStudentFromStudyGroupPayload
> => {
    const studyGroupId = useScheduleManagementStore(s => s.studyGroupId);
    const locationId = useScheduleManagementStore(s => s.locationId);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['create-new-study-group'],
        mutationFn: (data: UnassignStudentFromStudyGroupPayload) =>
            unassignStudentFromStudyGroup(data, studyGroupId as number),
        onSuccess: () => {
            toast.success('Student berhasil dihapus dari kelompok belajar', {
                className: 'bg-green-200 border-green-300',
                position: 'top-center',
            });
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['student-of-study-group'] }),
                queryClient.invalidateQueries({ queryKey: ['available-student'], exact: false }),
                queryClient.invalidateQueries({ queryKey: ['teacher-schedule', locationId] }),
            ]);
        },
    });
};
