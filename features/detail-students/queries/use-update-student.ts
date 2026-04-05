import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { toast } from 'sonner';

const updateStudentHandler = async (studentId: number, data: Record<string, any>) => {
    const url = ENDPOINTS.studentById.expand({ id: studentId });
    const response = await api.patch(url, data);
    return response.data;
};

export const useUpdateStudentMutation = (
    studentId: number,
    options?: {
        onSuccess?: (data: any, variables: Record<string, any>) => void;
        onError?: (error: any) => void;
    }
): UseMutationResult<any, Error, Record<string, any>> => {
    return useMutation({
        mutationFn: (data: Record<string, any>) => updateStudentHandler(studentId, data),
        onSuccess: (data, variables) => {
            toast.success('Perubahan berhasil disimpan', {
                position: 'top-center',
            });
            if (options?.onSuccess) {
                options.onSuccess(data, variables);
            }
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Gagal menyimpan perubahan';
            toast.error(message, {
                position: 'top-center',
            });
            if (options?.onError) {
                options.onError(error);
            }
        },
    });
};
