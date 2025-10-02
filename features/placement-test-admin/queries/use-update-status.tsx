import api, { baseService } from '@/lib/api';
import { ResponseUpdateStatus } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const useUpdateStatus = () => {
    const location = usePathname();
    const patchStatus = async (data: { status: string }) => {
        return baseService<ResponseUpdateStatus>(async () => {
            const res = await api.patchForm<ResponseUpdateStatus>(location + '/status', data);
            return res.data;
        });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (data: { status: string }) => {
            const res = await patchStatus(data);
            return res;
        },
    });

    return { mutateAsync };
};

export default useUpdateStatus;
