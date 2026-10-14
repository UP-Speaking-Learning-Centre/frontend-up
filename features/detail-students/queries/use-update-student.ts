import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { toast } from 'sonner';
import { ResponseUserDetail } from '@/features/auth/constants/interface';

export interface UpdateStudentPayload {
    status?: string;
    marketing?: {
        status?: string;
        sourceLead?: string;
        funnelStage?: string;
        statusLead?: string;
        leadStatus?: string;
        programId?: number;
        adminPicId?: number | null;
        picRole?: string | null;
        picStaff?: string | null;
        tanggalTrialClass?: string;
        teacherTrialClass?: string | null;
        grupTrialClass?: string | null;
        datangTrialClass?: boolean;
        notesTerbaru?: string | null;
        lastFollowUp?: string;
        lastUpdate?: string;
        cancelReason?: string;
    };
    activePeriod?: {
        activeFrom?: string;
        activeUntil?: string;
        selectedPeriod?: number;
    };
    offer?: {
        programId?: number;
        groupId?: number;
        levelId?: number;
        gradeId?: number;
        packageId?: number;
        duration?: number;
        price?: number;
    };
    trialClass?: {
        schedule?: string;
        studyGroupId?: number | null;
        isDone?: boolean;
    };
    // Include extra sections used by frontend components
    recommendation?: Record<string, any>;
    selection?: Record<string, any>;
    [key: string]: any;
}

const updateStudentHandler = async (studentId: number, data: UpdateStudentPayload) => {
    const url = ENDPOINTS.studentById.expand({ id: studentId });
    const response = await api.patch(url, data);
    return response.data;
};

export const useUpdateStudentMutation = (
    studentId: number,
    options?: {
        onSuccess?: (data: any, variables: UpdateStudentPayload) => void;
        onError?: (error: any) => void;
    }
): UseMutationResult<any, Error, UpdateStudentPayload> => {
    return useMutation({
        mutationFn: (data: UpdateStudentPayload) => updateStudentHandler(studentId, data),
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
