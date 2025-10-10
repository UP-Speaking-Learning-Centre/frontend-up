import api, { BaseService } from '@/lib/api';
import { ResponseCheckAnswer } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { API_CHECK_ANSWER } from '../constants/config';

const useSubmitMark = () => {
    const patchCheckAnswer = async (data: { questionId: string; check: string }) => {
        return BaseService(async () => {
            const res = await api.patch<ResponseCheckAnswer>(
                API_CHECK_ANSWER(data.questionId?.toString()),
                { check: data.check }
            );
            return res.data;
        });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (data: { questionId: string; check: string }) => {
            const res = await patchCheckAnswer(data);
            return res;
        },
    });

    return { mutateAsync };
};

export default useSubmitMark;
