import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunnelStage, LeadStatus, SourceLead, Grades } from '../types';
import { useCreateNonUserMutation } from '../queries/use-create-non-users';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export const createNonUserSchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    phone: z.string().min(1, 'Phone wajib diisi'),
    instagram: z.string().optional(),
    grade: z.nativeEnum(Grades, { required_error: 'Grade wajib dipilih' }),
    sourceLead: z.nativeEnum(SourceLead, { required_error: 'Source Lead wajib dipilih' }),
    funnelStage: z.nativeEnum(FunnelStage, { required_error: 'Funnel Stage wajib dipilih' }),
    leadStatus: z.nativeEnum(LeadStatus, { required_error: 'Lead Status wajib dipilih' }),
    notes: z.string().optional(),
});

export type CreateNonUserValues = z.infer<typeof createNonUserSchema>;

export const useCreateNonUserForm = () => {
    const router = useRouter();
    const mutation = useCreateNonUserMutation();
    const form = useForm<CreateNonUserValues>({
        resolver: zodResolver(createNonUserSchema),
        defaultValues: {
            name: '',
            phone: '',
            notes: '',
        },
    });

    const onSubmit = (values: CreateNonUserValues) => {
        mutation.mutate({
            name: values.name,
            phoneNumber: values.phone,
            sourceLead: values.sourceLead,
            funnelStage: values.funnelStage,
            statusLead: values.leadStatus,
            instagram: values.instagram || null,
            grade: values.grade || null,
            notes: values.notes || null
        }, {
            onSuccess: () => {
                form.reset();
                router.back(); // or navigate to listing page, assumption made based on typical UX
            }
        });
    };

    return {
        form,
        onSubmit,
        isLoading: mutation.isPending,
    };
};
