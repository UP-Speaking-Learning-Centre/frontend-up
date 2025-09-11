import api from '@/lib/api';
import { RequestSavePlacementTest, ResponseSavePlacementTest, ResponseUpdateStatus } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const useSavePlacementTest = () => {
    const location = usePathname();
    const updatePlacement = async (data: RequestSavePlacementTest) => {
        const res = await api.patch<ResponseSavePlacementTest>(location + '/placement', data);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (data: RequestSavePlacementTest) => {
            const res = await updatePlacement(data);
            return res;
        },
    });

    return { mutateAsync };
};

export default useSavePlacementTest;
