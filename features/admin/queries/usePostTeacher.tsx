import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION, API_TEACHERS } from '../constants/config';

const usePostTeacher = () => {
    const queryClient = useQueryClient();

    const postLocation = async (data: Omit<TeacherAdmin,'id'>): Promise<string> => {
        queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['POST' + API_TEACHERS],
        mutationFn: postLocation,
    });

    return { mutateAsync };
};

export default usePostTeacher;
