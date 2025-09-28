import { LocationAdmin, RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import api from '@/lib/api';
import ENDPOINTS from '@/constants/endpoints';

const usePutTeacher = (id: number) => {
    const setTeacher = useLocationManagementStore(s => s.setTeacher);
    const teacher = useLocationManagementStore(s => s.teacher);

    const putLocation = async (data: RequestTeacherAdmin): Promise<TeacherAdmin> => {
        const res = await api.patch(ENDPOINTS.fetchTeachersById.expand({ id }));
        const index = teacher.findIndex(teach => teach.id === id);
        // teacher[index] = {
        //     id: teacher.length * -1,
        //     isCoordinator: data.isCoordinator,
        //     memberName: data.memberName,
        //     photoUrl: data.photoUrl,
        //     teacher: {
        //         id:data.teacherId,
        //         name:
        //     }
        // } satisfies TeacherAdmin;
        // setTeacher([...teacher]);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['PUT' + API_LOCATION],
        mutationFn: putLocation,
    });

    return { mutateAsync };
};

export default usePutTeacher;
