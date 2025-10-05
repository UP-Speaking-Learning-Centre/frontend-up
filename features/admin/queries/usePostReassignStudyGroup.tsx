import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ReqAssign, ReqUnassign, ResAssign, ResUnassign } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostReassignStudyGroup = (studyGroupId: number) => {
    const queryClient = useQueryClient();

    const postUnassign_ = async (
        data: ReqUnassign & { prevStudyGroupId: number }
    ): Promise<ResUnassign> => {
        const { prevStudyGroupId, ...rest } = data;
        const res = await api.post<ResUnassign>(
            ENDPOINTS.fetchUnassignStudent.expand({ studyGroupId: prevStudyGroupId }),
            rest
        );
        // queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return res.data;
    };
    const postAssign_ = async (data: ReqAssign): Promise<ResAssign> => {
        const res = await api.post<ResAssign>(
            ENDPOINTS.fetchAssignStudent.expand({ studyGroupId }),
            data
        );
        // queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return res.data;
    };

    const { mutateAsync: postUnassign } = useMutation({
        mutationFn: postUnassign_,
    });
    const { mutateAsync: postAssign } = useMutation({
        mutationFn: postAssign_,
    });

    return { postUnassign, postAssign };
};

export default usePostReassignStudyGroup;
