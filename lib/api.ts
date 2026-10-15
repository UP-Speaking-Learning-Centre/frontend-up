import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Setup mock adapter if NEXT_PUBLIC_USE_MOCK is true
if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    const { initMocks } = require('@/mocks');
    initMocks(api);
}

export const BaseService = async <T>(service: () => Promise<T>) => {
    try {
        return await service();
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default api;
