import { useMutation, useQuery } from '@tanstack/react-query';
import { API_UPLOAD_FILE } from '../constants/config';

const useUploadFile = () => {
    const uploadFile = async (): Promise<string> => {
        return '/file_uploaded.png';
    };

    const { mutateAsync } = useMutation({ mutationKey: [API_UPLOAD_FILE], mutationFn: uploadFile });

    return { mutateAsync };
};

export default useUploadFile;
