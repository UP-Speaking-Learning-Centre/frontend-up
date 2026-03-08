import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '../types';
import { useStaffStore } from '../stores/staff-store';

export const staffSchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    phone: z.string().min(1, 'Nomor telepon wajib diisi'),
    role: z.nativeEnum(Role, { required_error: 'Peran wajib dipilih' }),
});

export type StaffFormValues = z.infer<typeof staffSchema>;

interface UseStaffFormProps {
    defaultValues?: StaffFormValues;
    staffId?: string; // If provided, we are editing
    onSuccess?: () => void;
}

export const useStaffForm = ({ defaultValues, staffId, onSuccess }: UseStaffFormProps = {}) => {
    const addStaff = useStaffStore(s => s.addStaff);
    const updateStaff = useStaffStore(s => s.updateStaff);

    const form = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: defaultValues || {
            name: '',
            phone: '',
            role: undefined,
        },
    });

    const onSubmit = (values: StaffFormValues) => {
        // Future API Integration Point
        if (staffId) {
            // EDIT Mode: staffId handles the query param, values handles the payload
            console.log('--- API EDIT STAFF ---');
            console.log('ENDPOINT PARAMS:', { id: staffId });
            console.log('PAYLOAD:', {
                name: values.name,
                phone: values.phone,
                role: values.role
            });

            // Fallback for current UI state view
            updateStaff(staffId, values);
        } else {
            // CREATE Mode: pure payload
            console.log('--- API CREATE STAFF ---');
            console.log('PAYLOAD:', {
                name: values.name,
                phone: values.phone,
                role: values.role
            });

            // Fallback for current UI state view
            addStaff(values);
        }
        
        form.reset();
        onSuccess?.();
    };

    return {
        form,
        onSubmit,
    };
};
