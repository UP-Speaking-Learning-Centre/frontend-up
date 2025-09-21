import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION, API_UPLOAD_FILE } from '../constants/config';
import { LocationAdmin } from '@/types/admin';
import { useLocationManagementStore } from '../stores/location';
import { randomInt } from 'crypto';

const usePostLocation = () => {
    const queryClient = useQueryClient();

    const postLocation = async (data: Omit<LocationAdmin, 'id'>): Promise<string> => {
        queryClient.invalidateQueries({ queryKey: ['GET' + API_LOCATION] });
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['POST' + API_LOCATION],
        mutationFn: postLocation,
    });

    return { mutateAsync };
};

export default usePostLocation;
