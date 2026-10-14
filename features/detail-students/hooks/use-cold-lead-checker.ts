import { useMemo } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { FunnelStage, LeadStatus } from '@/features/non-user/types';

export const useColdLeadChecker = (
    funnelStage?: string,
    leadStatus?: string,
    lastUpdateStr?: string
) => {
    return useMemo(() => {
        if (!funnelStage || !lastUpdateStr) return false;

        const isAsking = funnelStage === FunnelStage.Asking;
        const isNotCold = leadStatus !== LeadStatus.Cold;
        
        if (isAsking && isNotCold) {
            const lastUpdate = parseISO(lastUpdateStr);
            const diffDays = differenceInDays(new Date(), lastUpdate);
            
            return diffDays > 7;
        }

        return false;
    }, [funnelStage, leadStatus, lastUpdateStr]);
};
