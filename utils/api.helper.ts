import { PENDING } from '@/features/auth/constants/config';
import { ResponseUserDetailTestResults } from '@/features/auth/constants/interface';

export const isPlacementTest = (
    testResults: ResponseUserDetailTestResults[],
    status: string = PENDING
) => {
    return testResults.some(res => res.status === PENDING);
};
