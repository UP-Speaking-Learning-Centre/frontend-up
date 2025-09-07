import { useDisplayedPlacementTestStore } from '../stores/displayed-placement-test-stores';

const useDetailPlacementTest = () => {
    const questions = useDisplayedPlacementTestStore(s => s.questions);
    const status = useDisplayedPlacementTestStore(s => s.status);
    const correctAnswers = useDisplayedPlacementTestStore(s => s.correctAnswers);
    const currentQuestionIndex = useDisplayedPlacementTestStore(s => s.currentQuestionIndex);
    const gradedQuestions = useDisplayedPlacementTestStore(s => s.gradedQuestions);
    const totalQuestions = useDisplayedPlacementTestStore(s => s.totalQuestions);
    const setState = useDisplayedPlacementTestStore(s => s.setState);

    return {
        setState,
        correctAnswers,
        currentQuestionIndex,
        gradedQuestions,
        totalQuestions,
        questions,
        status,
    };
};

export default useDetailPlacementTest;
