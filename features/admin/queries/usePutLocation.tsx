import { LocationAdmin } from '@/types/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';

const usePutLocation = () => {
    const setLocation = useLocationManagementStore(s => s.setLocation);
    const location = useLocationManagementStore(s => s.location);

    const putLocation = async (data: LocationAdmin): Promise<string> => {
        const index = location.findIndex(locate => locate.id === data.id);
        location[index] = data;
        setLocation([...location]);
        return 'Success';
    };

    const { mutateAsync } = useMutation({
        mutationKey: ['PUT' + API_LOCATION],
        mutationFn: putLocation,
    });

    return { mutateAsync };
};

export default usePutLocation;
