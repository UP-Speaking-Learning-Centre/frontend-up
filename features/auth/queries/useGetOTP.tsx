import api, { BaseService } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_OTP, DEVELOPMENT } from '../constants/config';
import { ResponseOTP } from '../constants/interface';
import useAuthStore from '../stores/authStore';

const useGetOTP = () => {
    const { setOtpForTesting } = useAuthStore();

    const getOTP = async (phoneNumber: string) => {
        return BaseService<ResponseOTP>(async () => {
            // if (process.env.NODE_ENV === DEVELOPMENT)
            //     return {
            //         message: 'An OTP has been sent to your number.',
            //         otpForTesting: '123456',
            //     };
            const res = await api.post<ResponseOTP>(API_OTP, { phoneNumber });
            return res.data;
        });
    };

    const { mutateAsync } = useMutation({
        mutationKey: [API_OTP],
        mutationFn: async (phone: string) => {
            const res = await getOTP(phone);
            return res;
        },
    });

    const handlePostOTP = (phone: string) => {
        mutateAsync(phone)
            .then(res => {
                toast.info(res.message, { position: 'top-center' });
                setOtpForTesting(res.otpForTesting);
            })
            .catch(err => toast.error(err?.message, { position: 'top-center' }));
    };

    return { mutateAsync, handlePostOTP };
};

export default useGetOTP;
