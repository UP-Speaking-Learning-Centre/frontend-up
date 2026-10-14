import { FunnelStage } from '@/features/non-user/types';
import { ResponseUserDetail } from '@/features/auth/constants/interface';
import { VALIDATION_MESSAGES } from '@/features/detail-students/constants';
import { useValidationStore } from '@/features/detail-students/stores';
import { useCallback } from 'react';

export const useStageValidation = () => {
    const setValidationError = useValidationStore((state) => state.setValidationError);
    
    const validateStageTransition = useCallback((data: ResponseUserDetail | null, targetStage: FunnelStage) => {
        if (!data) {
            setValidationError(VALIDATION_MESSAGES.DATA_NOT_FOUND);
            return VALIDATION_MESSAGES.DATA_NOT_FOUND;
        }

        const marketing = data.marketing || {};
        const offer = data.offer || {};
        const trial = data.trialClass || {};

        let error: string | null = null;

        switch (targetStage) {
            case FunnelStage.Asking:
                if (!data.name || !data.phoneNumber || !marketing.sourceLead || !data.gradeId) {
                    error = VALIDATION_MESSAGES.MISSING_BASIC_INFO;
                }
                break;
            case FunnelStage.Qualification:
                if (!data.preferredProgramId) {
                    error = VALIDATION_MESSAGES.MISSING_PREFERRED_PROGRAM;
                }
                break;
            case FunnelStage.TrialClass:
                if (!trial.studyGroupName || !trial.schedule) {
                    error = VALIDATION_MESSAGES.MISSING_TRIAL_INFO;
                }
                break;
            case FunnelStage.PlacementTest:
                // Optional, no specific fields mandatory yet.
                break;
            case FunnelStage.Quotation:
                if (!offer.package || !offer.duration || !offer.price) {
                    error = VALIDATION_MESSAGES.MISSING_OFFER_INFO;
                }
                break;
            case FunnelStage.Registered:
                if (!data.levelId && !data.latestResult?.determinedLevelId) {
                    error = VALIDATION_MESSAGES.MISSING_RECOMMENDED_LEVEL;
                }
                break;
            case FunnelStage.Cancel:
                if (!marketing.cancelReason) {
                    error = VALIDATION_MESSAGES.MISSING_CANCEL_REASON;
                }
                break;
        }

        setValidationError(error);
        return error;
    }, [setValidationError]);

    return { validateStageTransition };
};
