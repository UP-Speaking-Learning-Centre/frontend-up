import api from '@/lib/api';
import { ResponseSaveNote } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const useSaveNotes = () => {
    const location = usePathname();
    const patch = async (data: { notes: string }) => {
        const res = await api.patch<ResponseSaveNote>(location + '/notes', data);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (data: { notes: string }) => {
            const res = await patch(data);
            return res;
        },
    });

    return { mutateAsync };
};

export default useSaveNotes;
