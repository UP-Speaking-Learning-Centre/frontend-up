import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunnelStage, LeadStatus, SourceLead, Grades } from '../types';
import { useCreateNonUserMutation } from '../queries/use-create-non-users';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export const createNonUserSchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    phone: z
        .string()
        .regex(/^\d+$/, 'Phone harus berupa angka')
        .min(9, 'Minimal 9 digit')
        .max(15, 'Maksimal 15 digit'),
    instagram: z.string().optional(),
    sourceLead: z.nativeEnum(SourceLead, { required_error: 'Source Lead wajib dipilih' }),
    funnelStage: z.nativeEnum(FunnelStage, { required_error: 'Funnel Stage wajib dipilih' }),
    statusLead: z.nativeEnum(LeadStatus, { required_error: 'Lead Status wajib dipilih' }),
    notes: z.string().optional(),
    picRole: z.string().optional(),
    picStaff: z.string().optional(),
    adminPicId: z.number().optional(),
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
            instagram: '',
            notes: '',
        },
    });

    const onSubmit = (values: CreateNonUserValues) => {
        mutation.mutate(
            {
                name: values.name,
                phoneNumber: values.phone,
                sourceLead: values.sourceLead,
                funnelStage: values.funnelStage,
                statusLead: values.statusLead,
                instagram: values.instagram || null,
                notes: values.notes || null,
                adminPicId: values.adminPicId,
                picRole: values.picRole || null,
                picStaff: values.picStaff || null,
            },
            {
                onSuccess: () => {
                    form.reset();
                    router.back(); // or navigate to listing page, assumption made based on typical UX
                },
            }
        );
    };

    return {
        form,
        onSubmit,
        isLoading: mutation.isPending,
    };
};
