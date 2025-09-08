import api, { baseService } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { API_PHONE_CHECKER, DEVELOPMENT } from '../constants/config';
import { ResponseCheckPhone } from '../constants/interface';

const postCheckPhone = async (phoneNumber: string) => {
    return baseService(async () => {
        const res = await api.post<ResponseCheckPhone>(API_PHONE_CHECKER, { phoneNumber });
        return res.data.status;
    });
};

const usePostPhoneNumberVerification = () => {
    const { mutateAsync, data, isSuccess } = useMutation({
        mutationKey: [API_PHONE_CHECKER],
        mutationFn: async (phone: string) => {
            const res = await postCheckPhone(phone);
            return res;
        },
    });

    return { mutateAsync, data, isSuccess };
};

export default usePostPhoneNumberVerification;
