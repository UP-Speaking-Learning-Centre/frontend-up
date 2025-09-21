import { LocationAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';

const useDeleteLocation = () => {
    const setLocation = useLocationManagementStore(s => s.setLocation);
    const location = useLocationManagementStore(s => s.location);

    const deleteLocation = async (id: number): Promise<string> => {
        const newLocation = location.filter(locate => locate.id !== id);
        setLocation(newLocation);
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['DELETE' + API_LOCATION],
        mutationFn: deleteLocation,
    });

    return { mutateAsync };
};

export default useDeleteLocation;
