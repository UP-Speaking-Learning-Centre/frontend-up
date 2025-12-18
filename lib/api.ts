import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dev-api.uplearningcentre.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const BaseService = async <T>(service: () => Promise<T>) => {
    try {
        return await service();
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default api;
