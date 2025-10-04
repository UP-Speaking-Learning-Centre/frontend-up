import ENDPOINTS from '@/constants/endpoints';
import api, { baseService } from '@/lib/api';
import { ResponseUpdateStatus } from '@/types/placement-test-admin';
import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';

const useUpdateStatus = () => {
    const { id } = useParams();
    const patchStatus = async (status: string) => {
        return baseService<ResponseUpdateStatus>(async () => {
            const res = await api.patchForm<ResponseUpdateStatus>(
                ENDPOINTS.fetchAdminDetailPlacementTestStatus.expand({ id: id as string }),
                { status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
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
