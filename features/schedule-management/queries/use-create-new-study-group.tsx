'use client';

import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from '@tanstack/react-query';

import students from '@/data/students.json';
import { useScheduleManagementStore } from '../stores/schedule-management-store';
import { StudendOfStudyGrouResponse } from '@/types/students';
import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { CreateStudyGroupPayload, CreateStudyGroupResponse } from '@/types/study-group';
import { useNewStudyGroupStore } from '../stores/new-study-group-store';
import { toast } from 'sonner';
import moment from 'moment';

const fetchStudentOfStudyGroup = async (
    data: CreateStudyGroupPayload
): Promise<CreateStudyGroupResponse> => {
    const response = await api.post<CreateStudyGroupResponse>(ENDPOINTS.createNewStudyGroup, data);
    return response.data;
};

export const useCreateNewStudyGroupMutation = (): UseMutationResult => {
    const formValue = useNewStudyGroupStore(s => s.formValue);
    const resetAll = useNewStudyGroupStore(s => s.resetAll);
    const queryClient = useQueryClient();

    const customSchedule1 = formValue.isCustomTime1
        ? {
              dayOfWeek: formValue.day1,
              startTime: moment(formValue.time1, 'HH:mm:ss').format('HH:mm:ss'),
              endTime: moment(formValue.time1, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
              locationId: Number(formValue.locationId),
          }
        : null;

    const customSchedule2 = formValue.isCustomTime2
        ? {
              dayOfWeek: formValue.day2,
              startTime: moment(formValue.time2, 'HH:mm:ss').format('HH:mm:ss'),
              endTime: moment(formValue.time2, 'HH:mm:ss').add(90, 'minutes').format('HH:mm:ss'),
              locationId: Number(formValue.locationId),
          }
        : null;

    const payload: CreateStudyGroupPayload = {
        name: formValue.title,
        description: formValue.description,
        programId: Number(formValue.programId),
        groupId: Number(formValue.groupId),
        levelId: Number(formValue.levelId),
        gradeId: Number(formValue.gradeId),
        packageId: Number(formValue.packageId),
        teacherTeamMemberId: Number(formValue.teacherTeamMemberId),
        scheduleIds: [formValue.scheduleId1, formValue.scheduleId2].filter(item => item > 0),
        schedules: [customSchedule1, customSchedule2].filter(item => item !== null),
    };

    return useMutation({
        mutationKey: ['create-new-study-group'],
        mutationFn: () => fetchStudentOfStudyGroup(payload),
        onSuccess: () => {
            resetAll();
            toast.success('Kelompok Belajar berhasil ditambahkan', {
                className: 'bg-green-200 border-green-300',
                position: 'top-center',
            });
            queryClient.invalidateQueries({ queryKey: ['teacher-schedule'] });
        },
    });
};
