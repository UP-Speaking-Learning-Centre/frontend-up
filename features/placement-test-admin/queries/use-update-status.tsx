import ENDPOINTS from '@/constants/endpoints';
import api, { BaseService } from '@/lib/api';
import { ResponseUpdateStatus } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';

const useUpdateStatus = () => {
    const { id } = useParams();
    const patchStatus = async (status: string) => {
        return BaseService<ResponseUpdateStatus>(async () => {
            const res = await api.patch<ResponseUpdateStatus>(
                ENDPOINTS.fetchAdminDetailPlacementTestStatus.expand({ id: id as string }),
                { status },
            );
            return res.data;
        });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async ({ status }: { status: string }) => {
            const res = await patchStatus(status);
            return res;
        },
    });

    return { mutateAsync };
};

export default useUpdateStatus;
