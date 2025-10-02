import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import moment from 'moment';

interface SubmitRegistrationProps {
    phoneNumber: string;
    instagram: string;
    studentName: string;
    programId: number;
    groupId: number;
    levelId: number;
    locationId: number;
    packageId: number;
    studyGroupId?: number;
    trialClassAt: string;
    schedules?: { dayOfWeek: string; startTime: string; endTime: string; locationId: number }[];
}

interface Payload {
    name: string;
    phoneNumber: string;
    instagram: string;
}

const submitRegistration = async (data: SubmitRegistrationProps) => {
    const res = await api.post(ENDPOINTS.submitRegistration, data);
    return res.data;
};

const useSubmitRegistrationMutation = (): UseMutationResult<
    SubmitRegistrationProps,
    unknown,
    Payload
> => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const mainPayload = {
        programId: Number(formValue.programId),
        groupId: Number(formValue.groupId),
        levelId: Number(formValue.levelId),
        locationId: Number(formValue.locationId),
        packageId: Number(formValue.packageId),
        studyGroupId: Number(formValue.studyGroupId),
        trialClassAt: formValue.trialClassAt,
    };

    let finalPayload = { ...mainPayload } as SubmitRegistrationProps;

    if (formValue.isUseSelfSchedule) {
        finalPayload = {
            ...finalPayload,
            schedules: formValue.selfSchedule.map(schedule => {
                return {
                    dayOfWeek: moment(schedule.dayOfWeek, 'dddd').locale('en').format('dddd'),
                    startTime: schedule.startTime,
                    endTime: moment(schedule.startTime, 'HH:mm').add(90, 'minutes').format('HH:mm'),
                    locationId: Number(formValue.locationId),
                };
            }),
        };
    }

    if (!formValue.isUseSelfSchedule) {
        finalPayload = {
            ...finalPayload,
            studyGroupId: Number(formValue.studyGroupId),
        };
    }

    return useMutation({
        mutationFn: (data: Payload) =>
            submitRegistration({
                ...finalPayload,
                studentName: data.name,
                phoneNumber: data.phoneNumber,
                instagram: data.instagram,
            }),
    });
};

export default useSubmitRegistrationMutation;
