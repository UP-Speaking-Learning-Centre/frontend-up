import { NOT_GRADED, PENDING } from '@/features/auth/constants/config';
import { ResponseUserDetailTestResults } from '@/features/auth/constants/interface';

export const isPlacementTest = (
    testResults: ResponseUserDetailTestResults[],
    status: string = PENDING
) => {
    return testResults.some(res => res.status === NOT_GRADED);
};

export const isValidHttpUrl = (string: string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};
