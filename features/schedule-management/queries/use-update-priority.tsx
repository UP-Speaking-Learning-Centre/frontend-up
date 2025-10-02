import { toast } from '@/components/ui/use-toast';
import { sleep } from '@/lib/mock';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudyGroup } from '@/types/study-group';

type UpdatePriorityResponse = {
    studyGroupId: number;
    isPriority: boolean;
};

const updatePriority = async (
    isPriority: boolean,
    studyGroupId: number
): Promise<UpdatePriorityResponse> => {
    // const res = await api.post(ENDPOINTS.updatePriority.expand({ studyGroupId }), { isPriority });
    // return res.data;

    await sleep(4000);
    return { isPriority: true, studyGroupId };
};

export const useUpdatePriorityMutation = (): UseMutationResult<
    UpdatePriorityResponse,
    unknown,
    { isPriority: boolean; studyGroupId: number }
> => {
    const setSelectedStudyGroup = useScheduleManagementStore(s => s.setSelectedStudyGroup);
    const selectedStudyGroup = useScheduleManagementStore(s => s.selectedStudyGroup);
    return useMutation({
        mutationKey: ['update-priority'],
        mutationFn: ({ isPriority, studyGroupId }: { isPriority: boolean; studyGroupId: number }) =>
            updatePriority(isPriority, studyGroupId),
        onSuccess: (data, variables) => {
            const studyGroupData = {
                ...selectedStudyGroup,
                isPriority: data.isPriority,
            } as StudyGroup;

            setSelectedStudyGroup(studyGroupData);

            toast({
                title: 'Status Prioritas berhasil diubah',
                description: `Study Group menjadi ${
                    variables.isPriority ? 'prioritas' : 'tidak prioritas'
                }`,
            });
        },
        onError: () => {
            toast({
                title: 'Gagal mengubah status prioritas',
                description: 'Gagal mengubah status prioritas',
                variant: 'destructive',
            });
        },
    });
};
