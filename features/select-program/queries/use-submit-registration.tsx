import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';

interface SubmitRegistrationProps {
    phoneNumber: string;
    instagram: string;
    studentName: string;
    programId: number;
    groupId: number;
    levelId: number;
    gradeId: number;
    locationId: number;
    packageId: number;
    schedules: {
        teacherScheduleId: number;
    }[];
}

const submitRegistration = async (data: SubmitRegistrationProps) => {
    const res = await api.post(ENDPOINTS.submitRegistration, data);
    return res.data;
};

const useSubmitRegistrationMutation = () => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const payload = {
        phoneNumber: formValue.personalInformation.phone,
        instagram: formValue.personalInformation.instagram,
        studentName: formValue.personalInformation.name,
        programId: Number(formValue.programId),
        groupId: Number(formValue.groupId),
        levelId: Number(formValue.levelId),
        gradeId: Number(formValue.gradeId),
        locationId: Number(formValue.locationId),
        packageId: Number(formValue.packageId),
        schedules: [
            {
                teacherScheduleId: Number(formValue.schedule.firstSession.teacherScheduleId),
            },
            {
                teacherScheduleId: Number(formValue.schedule.secondSession.teacherScheduleId),
            },
        ],
    };

    return useMutation({
        mutationFn: () => submitRegistration(payload),
    });
};

export default useSubmitRegistrationMutation;
