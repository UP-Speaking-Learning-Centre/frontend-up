import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '../types';
import { useCreateStaffMutation } from '../queries/use-create-staff';
import { useUpdateStaffMutation } from '../queries/use-update-staff';

export const staffSchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    phone: z
        .string()
        .regex(/^[0-9]+$/, 'Nomor telepon hanya boleh berisi angka')
        .min(9, 'Minimal 9 karakter')
        .max(13, 'Maksimal 13 karakter'),
    role: z.nativeEnum(Role, { required_error: 'Peran wajib dipilih' }),
});

export type StaffFormValues = z.infer<typeof staffSchema>;

interface UseStaffFormProps {
    defaultValues?: StaffFormValues;
    staffId?: string | number; // If provided, we are editing
    onSuccess?: () => void;
}

export const useStaffForm = ({ defaultValues, staffId, onSuccess }: UseStaffFormProps = {}) => {
    const { mutate: addStaff } = useCreateStaffMutation();
    const { mutate: updateStaff } = useUpdateStaffMutation();

    const form = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        values: defaultValues,
        defaultValues: defaultValues || {
            name: '',
            phone: '',
            role: undefined,
        },
    });

    const onSubmit = (values: StaffFormValues) => {
        if (staffId) {
            updateStaff(
                {
                    id: staffId,
                    data: { name: values.name, phoneNumber: values.phone, role: values.role },
                },
                {
                    onSuccess: () => {
                        form.reset();
                        onSuccess?.();
                    },
                }
            );
        } else {
            addStaff(
                { name: values.name, phoneNumber: values.phone, role: values.role },
                {
                    onSuccess: () => {
                        form.reset();
                        onSuccess?.();
                    },
                }
            );
        }
    };

    return {
        form,
        onSubmit,
    };
};
