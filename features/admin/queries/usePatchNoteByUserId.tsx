import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { ResponseSaveNote } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const usePatchNoteByUserId = () => {
    const { id } = useParams();
    const patchNoteByUserId = async (data: { notes: string }) => {
        const res = await api.patch<ResponseSaveNote>(
            ENDPOINTS.patchNoteByUserId.expand({ id: id as string }),
            data
        );
        return res.data;
    };
    const { mutateAsync } = useMutation({
        mutationFn: patchNoteByUserId,
    });
    
    return { mutateAsync };
};

export default usePatchNoteByUserId;
