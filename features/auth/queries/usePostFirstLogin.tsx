import api, { BaseService } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { API_FIRST_LOGIN } from '../constants/config';
import { RequestFirstLogin, ResponseFirstLogin } from '../constants/interface';

const usePostFirstLogin = () => {
    const postFirstLogin = (data: RequestFirstLogin) => {
        return BaseService<string>(async () => {
            // if(process.env.NODE_ENV === DEVELOPMENT) return "Your account has been activated successfully!"
            const res = await api.post<ResponseFirstLogin>(API_FIRST_LOGIN, data);
            return res.data.message;
        });
    };
    const { mutateAsync, data, isSuccess } = useMutation({
        mutationKey: [API_FIRST_LOGIN],
        mutationFn: async (data: RequestFirstLogin) => {
            return postFirstLogin(data);
        },
    });

    return { mutateAsync };
};

export default usePostFirstLogin;
