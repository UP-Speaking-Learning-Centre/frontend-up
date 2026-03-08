import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunnelStage, LeadStatus, SourceLead, Grades } from '../types';

export const createNonUserSchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    phone: z.string().min(1, 'Phone wajib diisi'),
    grade: z.nativeEnum(Grades, { required_error: 'Grade wajib dipilih' }),
    sourceLead: z.nativeEnum(SourceLead, { required_error: 'Source Lead wajib dipilih' }),
    funnelStage: z.nativeEnum(FunnelStage, { required_error: 'Funnel Stage wajib dipilih' }),
    leadStatus: z.nativeEnum(LeadStatus, { required_error: 'Lead Status wajib dipilih' }),
    notes: z.string().optional(),
});

export type CreateNonUserValues = z.infer<typeof createNonUserSchema>;

export const useCreateNonUserForm = () => {
    const form = useForm<CreateNonUserValues>({
        resolver: zodResolver(createNonUserSchema),
        defaultValues: {
            name: '',
            phone: '',
            notes: '',
        },
    });

    const onSubmit = (values: CreateNonUserValues) => {
        // Implementation for submitting the new non-user will go here
        console.log('Submitted values:', values);
        // Toast or redirect logical hook placement
    };

    return {
        form,
        onSubmit,
    };
};
