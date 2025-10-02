import { useState } from 'react';
import useSubmitRegistrationMutation from '../queries/use-submit-registration';
import useRegisterFromPlacementMutation from '../queries/use-submit-registration-from-placement';
import z from 'zod';

const useSubmitRegistration = (isFromPlacement = false) => {
    const [status, setStatus] = useState<{ status: 'success' | 'error' | ''; open: boolean }>({
        status: '',
        open: false,
    });
    const { mutate, isPending: isPendingFromProgram } = useSubmitRegistrationMutation();
    const { mutate: mutateRegisterFromPlacement, isPending: isPendingFromPlacement } =
        useRegisterFromPlacementMutation();

    const schema = z.object({
        name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
        phone: z
            .string()
            .min(1, { message: 'No HP tidak boleh kosong' })
            .regex(/^08[1-9][0-9]{6,9}$/, {
                message: 'Format No HP tidak valid (Gunakan format 08xxxxxx)',
            }),
        instagram: z.string().optional(),
    });

    const submitRegistration = (data: z.infer<typeof schema>) => {
        const mutationFn = isFromPlacement ? mutateRegisterFromPlacement : mutate;

        mutationFn(
            {
                name: data.name,
                phoneNumber: data.phone,
                instagram: data.instagram || '',
            },
            {
                onSuccess: () => setStatus({ status: 'success', open: true }),
                onError: () => setStatus({ status: 'error', open: true }),
            }
        );
    };

    return {
        submitRegistration,
        status,
        schema,
        setStatus,
        isLoading: isFromPlacement ? isPendingFromPlacement : isPendingFromProgram,
    };
};

export default useSubmitRegistration;
