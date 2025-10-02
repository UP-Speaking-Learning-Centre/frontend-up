import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import useProgramSelectionStore from '../stores/program-selection-store';
import usePlacementTestGuestStore from '../stores/placemenet-test-guest-store';
import useSubmitRegistrationMutation from './use-submit-registration';

interface SubmitRegistrationProps {
    studentName: string;
    phoneNumber: string;
    instagram: string;
    programId: number;
    groupId: number;
    packageId: number;
    testSessionId: string;
}

interface Payload {
    name: string;
    phoneNumber: string;
    instagram: string;
}

const submitRegistration = async (data: SubmitRegistrationProps) => {
    const res = await api.post(ENDPOINTS.submitRegistrationFromPlacement, data);
    return res.data;
};

const useRegisterFromPlacementMutation = (): UseMutationResult<
    SubmitRegistrationProps,
    unknown,
    Payload
> => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const testSessionId = usePlacementTestGuestStore(s => s.testSessionId);

    const payload = {
        programId: Number(formValue.programId),
        groupId: Number(formValue.groupId),
        packageId: Number(formValue.packageId),
        testSessionId: testSessionId,
    };

    return useMutation({
        mutationFn: (data: Payload) =>
            submitRegistration({
                ...payload,
                studentName: data.name,
                phoneNumber: data.phoneNumber,
                instagram: data.instagram,
            }),
    });
};

export default useRegisterFromPlacementMutation;
