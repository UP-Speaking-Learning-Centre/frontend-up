import { PROGRAM_SELECTION_STEPS, REGISTER_STEPS } from '@/constants/program-selections';
import useProgramSelectionStore, { FormValue } from '../stores/program-selection-store';
import { useCallback, useMemo } from 'react';

const useProgramSelection = (isFromPlacement = false) => {
    const steps = isFromPlacement ? REGISTER_STEPS : PROGRAM_SELECTION_STEPS;
    const currentStep = useProgramSelectionStore(s => s.currentStep);
    const setCurrentStep = useProgramSelectionStore(s => s.setCurrentStep);
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const resetBasedOnStep = useProgramSelectionStore(s => s.resetBasedOnStep);
    const formValue = useProgramSelectionStore(s => s.formValue);

    const getCurrentStepIndex = useCallback(
        (stepId: (typeof steps)[number]) => {
            return steps.findIndex(step => step === stepId);
        },
        [steps]
    );

    const isStepDisplayed = useCallback(
        (stepId: (typeof steps)[number]) => {
            const stepIndex = getCurrentStepIndex(stepId);
            return stepIndex <= currentStep;
        },
        [currentStep, getCurrentStepIndex, steps]
    );

    const scrollToStep = useCallback(
        (stepId: (typeof steps)[number]) => {
            const currentStepElement = document.getElementById(steps[currentStep]);
            const stepElement = document.getElementById(stepId);
            var headerOffset = 60;

            setTimeout(() => {
                if (stepElement) {
                    var elementPosition = stepElement.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                } else if (currentStepElement) {
                    const bottom = currentStepElement.getBoundingClientRect().bottom;
                    const offsetPosition = window.pageYOffset + bottom - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }, 700);
        },
        [currentStep, steps]
    );

    const setToStep = useCallback(
        (stepId: (typeof steps)[number]) => {
            const nextStep = getCurrentStepIndex(stepId) + 1;
            setCurrentStep(nextStep);
            scrollToStep(steps[nextStep]);
        },
        [getCurrentStepIndex, setCurrentStep, scrollToStep, steps]
    );

    const handleNextStepAction = useCallback(
        ({
            stepId,
            formValue,
        }: {
            stepId: (typeof steps)[number];
            formValue: Partial<FormValue>;
        }) => {
            const nextStep = getCurrentStepIndex(stepId) + 1;
            setCurrentStep(nextStep);
            scrollToStep(steps[nextStep]);
            setFormValue(formValue);
            resetBasedOnStep(stepId);
        },
        [getCurrentStepIndex, setCurrentStep, scrollToStep, steps]
    );

    return {
        currentStep,
        setCurrentStep,
        setFormValue,
        isStepDisplayed,
        getCurrentStepIndex,
        handleNextStepAction,
        formValue,
        setToStep,
    };
};

export default useProgramSelection;
