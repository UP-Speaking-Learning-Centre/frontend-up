import ENDPOINTS from '@/constants/endpoints';
import api from '@/lib/api';
import { RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation } from '@tanstack/react-query';

const usePutTeacher = (id: number) => {
    const putLocation = async (data: Partial<RequestTeacherAdmin>): Promise<TeacherAdmin> => {
        const res = await api.patch(ENDPOINTS.fetchTeachersById.expand({ id }), data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        return res.data;
    };

    const putTeacher = useMutation({
        mutationKey: [ENDPOINTS.fetchTeachersById.expand({ id })],
        mutationFn: putLocation,
    });

    return putTeacher;
};

export default usePutTeacher;
