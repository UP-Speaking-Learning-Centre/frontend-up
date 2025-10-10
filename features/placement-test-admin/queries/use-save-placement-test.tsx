import api from '@/lib/api';
import { RequestSavePlacementTest, ResponseSavePlacementTest, ResponseUpdateStatus } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

const useSavePlacementTest = () => {
    const location = usePathname();
    const updatePlacement = async (data: RequestSavePlacementTest) => {
        const res = await api.patch<ResponseSavePlacementTest>(location + '/placement', data);
        return res.data;
    };

    const { mutateAsync } = useMutation({
        mutationFn: updatePlacement,
        onError: (err: AxiosError<{ message: string }>) =>
            toast.error(err.response?.data?.message, {
                className: 'bg-red-100',
                position: 'top-center',
            })
    });

    return { mutateAsync };
};

export default useSavePlacementTest;
