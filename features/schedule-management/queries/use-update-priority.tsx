import { toast } from 'sonner';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudyGroupDetailAdmin } from '@/types/study-group';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

type UpdatePriorityResponse = {
    studyGroupId: number;
    isPriority: boolean;
};

const updatePriority = async (
    isPriority: boolean,
    studyGroupId: number
): Promise<UpdatePriorityResponse> => {
    const res = await api.patch(ENDPOINTS.updatePriority.expand({ studyGroupId }), { isPriority });
    return res?.data;
};

export const useUpdatePriorityMutation = (): UseMutationResult<
    UpdatePriorityResponse,
    unknown,
    { isPriority: boolean; studyGroupId: number }
> => {
    const setSelectedStudyGroup = useScheduleManagementStore(s => s.setSelectedStudyGroup);
    const selectedStudyGroup = useScheduleManagementStore(s => s.selectedStudyGroup);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-priority'],
        mutationFn: ({ isPriority, studyGroupId }: { isPriority: boolean; studyGroupId: number }) =>
            updatePriority(isPriority, studyGroupId),
        onSuccess: data => {
            const studyGroupData = {
                ...selectedStudyGroup,
                isPriority: data.isPriority,
            } as StudyGroupDetailAdmin;

            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['teacher-schedule'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['study-group-detail', selectedStudyGroup?.id],
                }),
            ]);

            setSelectedStudyGroup(studyGroupData);

            toast.success('Status Prioritas berhasil diubah', {
                className: 'bg-green-200 border-green-300',
                position: 'top-center',
            });
        },
        onError: () => {
            toast.error('Gagal mengubah status prioritas', {
                position: 'top-center',
            });
        },
    });
};
