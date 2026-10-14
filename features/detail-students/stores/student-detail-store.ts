import { create } from 'zustand';
import { ResponseUserDetail } from '@/features/auth/constants/interface';

interface StudentDetailState {
    data: ResponseUserDetail | null;
    localOverrides: Record<string, any>;
    setData: (data: ResponseUserDetail) => void;
    addOverride: (key: string, value: any) => void;
    clearOverrides: () => void;
    getMergedData: () => ResponseUserDetail | null;
}

const flattenObj = (obj: any, prefix = ''): Record<string, any> => {
    return Object.keys(obj || {}).reduce((acc: any, k: string) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]))
            Object.assign(acc, flattenObj(obj[k], pre + k));
        else acc[pre + k] = obj[k];
        return acc;
    }, {});
};

const unflattenObj = (obj: Record<string, any>): any => {
    const result: any = {};
    for (const i in obj) {
        const keys = i.split('.');
        keys.reduce((acc: any, key: string, index: number) => {
            if (index === keys.length - 1) {
                acc[key] = obj[i];
            } else {
                acc[key] = acc[key] || {};
            }
            return acc[key];
        }, result);
    }
    return result;
};

const deepMerge = (target: any, source: any) => {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
};

export const useStudentDetailStore = create<StudentDetailState>((set, get) => ({
    data: null,
    localOverrides: {},
    setData: (data) => set({ data }),
    addOverride: (key, value) => set((state) => ({ 
        localOverrides: { ...state.localOverrides, [key]: value } 
    })),
    clearOverrides: () => set({ localOverrides: {} }),
    getMergedData: () => {
        const state = get();
        if (!state.data) return null;
        if (Object.keys(state.localOverrides).length === 0) return state.data;
        
        const unflattenedOverrides = unflattenObj(state.localOverrides);
        return deepMerge(JSON.parse(JSON.stringify(state.data)), unflattenedOverrides);
    }
}));
