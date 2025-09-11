import { PROGRAM_SELECTION_STEPS, REGISTER_STEPS } from '@/constants/program-selections';
import useProgramSelectionStore, { FormValue } from '../stores/program-selection-store';

const useProgramSelection = (
    steps: typeof PROGRAM_SELECTION_STEPS | typeof REGISTER_STEPS = PROGRAM_SELECTION_STEPS
) => {
    const currentStep = useProgramSelectionStore(s => s.currentStep);
    const setCurrentStep = useProgramSelectionStore(s => s.setCurrentStep);
    const setFormValue = useProgramSelectionStore(s => s.setFormValue);
    const formValue = useProgramSelectionStore(s => s.formValue);

    const getCurrentStepIndex = (stepId: (typeof steps)[number]) => {
        return steps.findIndex(step => step === stepId);
    };

    const isStepDisplayed = (stepId: (typeof steps)[number]) => {
        const stepIndex = getCurrentStepIndex(stepId);
        return stepIndex <= currentStep;
    };

    const scrollToStep = (stepId: (typeof steps)[number]) => {
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
        }, 500);
    };

    const handleNextStepAction = ({
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
