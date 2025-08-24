import { CHOOSE_PROGRAM_STEP, PROGRAM_SELECTION_STEPS } from '@/constants/program-selections';
import useProgramSelectionStore, { FormValue } from '../stores/program-selection-store';

const useProgramSelection = () => {
    const currentStep = useProgramSelectionStore(s => s.currentStep);
    const setCurrentStep = useProgramSelectionStore(s => s.setCurrentStep);
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const formValue = useProgramSelectionStore(s => s.formValue);

    const getCurrentStepIndex = (stepId: (typeof PROGRAM_SELECTION_STEPS)[number]) => {
        return PROGRAM_SELECTION_STEPS.findIndex(step => step === stepId);
    };

    const isStepDisplayed = (stepId: (typeof PROGRAM_SELECTION_STEPS)[number]) => {
        const stepIndex = getCurrentStepIndex(stepId);
        return stepIndex <= currentStep;
    };

    const scrollToStep = (stepId: (typeof PROGRAM_SELECTION_STEPS)[number]) => {
        const currentStepElement = document.getElementById(PROGRAM_SELECTION_STEPS[currentStep]);
        const stepElement = document.getElementById(stepId);
        var headerOffset = 20;

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
        }, 100);
    };

    const handleNextStepAction = ({
        stepId,
        formValue,
    }: {
        stepId: (typeof PROGRAM_SELECTION_STEPS)[number];
        formValue: Partial<FormValue>;
    }) => {
        const nextStep = getCurrentStepIndex(stepId) + 1;
        setCurrentStep(nextStep);
        scrollToStep(PROGRAM_SELECTION_STEPS[nextStep]);
        setFormValue(formValue);
    };

    return {
        currentStep,
        setCurrentStep,
        setFormValue,
        isStepDisplayed,
        getCurrentStepIndex,
        handleNextStepAction,
        formValue,
    };
};

export default useProgramSelection;
