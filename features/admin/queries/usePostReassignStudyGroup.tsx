import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ReqAssign, ReqUnassign, ResAssign, ResUnassign } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

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
        const res = await api.post<ResAssign>(ENDPOINTS.assignStudentToStudyGroup, data);
        // queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return res?.data;
    };

    const { mutateAsync: postUnassign } = useMutation({
        mutationFn: postUnassign_,
    });
    const { mutateAsync: postAssign } = useMutation({
        mutationFn: postAssign_,
        onError: (err: AxiosError<{ message: string }>) =>
            toast.error(err.response?.data?.message, {
                className: 'bg-red-100',
                position: 'top-center',
            }),
    });

    return { postUnassign, postAssign };
};

export default usePostReassignStudyGroup;
