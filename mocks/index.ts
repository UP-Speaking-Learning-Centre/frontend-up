import { AxiosInstance } from 'axios';
import { setupMockAdapter } from './handlers';

let isInitialized = false;

export function initMocks(api: AxiosInstance) {
    if (isInitialized) return;
    setupMockAdapter(api);
    isInitialized = true;
    console.log('🚀 [Mock System] Stateful Mock API Adapter is active!');
}

export * from './db';
export * from './handlers';
