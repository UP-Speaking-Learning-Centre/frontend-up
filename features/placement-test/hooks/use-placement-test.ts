import { useState, useEffect, useCallback } from 'react';
import { Question } from '@/types/placement-test';
import { useRouter, useSearchParams } from 'next/navigation';

const STORAGE_KEY = 'placementTest';

interface StoredTestState {
    answers: string[];
    timeLeft: number;
    shouldBeFinishedAt: number;
    currentQuestionIndex: number;
    startedAt: number;
}

export const usePlacementTest = (questions: Question[], initialTimeInMinutes = 20) => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
    const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes * 60);
    const [isCompleted, setIsCompleted] = useState(false);
    const [startedAt, setStartedAt] = useState<number>(Date.now());
    const [shouldBeFinishedAt, setShouldBeFinishedAt] = useState<number>(
        Date.now() + initialTimeInMinutes * 60 * 1000
    );
    const [loadSavedState, setLoadSavedState] = useState(true);

    useEffect(() => {
        try {
            setLoadSavedState(true);
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                const parsedState = JSON.parse(savedState) as StoredTestState;
                const remainingTime = Math.floor(
                    Math.max(0, parsedState.shouldBeFinishedAt - Date.now()) / 1000
                );
                const shouldBeFinishedAt = parsedState.shouldBeFinishedAt;

                console.log(remainingTime);
                setAnswers(parsedState.answers);
                setTimeLeft(remainingTime);
                setShouldBeFinishedAt(shouldBeFinishedAt);
                setCurrentQuestionIndex(parsedState.currentQuestionIndex);
                setStartedAt(parsedState.startedAt);

                if (remainingTime <= 0) {
                    setIsCompleted(true);
                }
            } else {
                setStartedAt(Date.now());
            }
        } catch (error) {
            console.error('Failed to load test state:', error);
            setStartedAt(Date.now());
        }
        setLoadSavedState(false);
    }, []);

    // useEffect(() => {
    //     searchParams.get('isCompleted') === 'true' && setIsCompleted(true);
    // }, [searchParams]);

    const saveTestState = useCallback(() => {
        if (isCompleted) return;

        const stateToSave: StoredTestState = {
            answers,
            timeLeft,
            shouldBeFinishedAt,
            currentQuestionIndex,
            startedAt,
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Failed to save test state:', error);
        }
    }, [answers, timeLeft, currentQuestionIndex, startedAt, isCompleted]);

    useEffect(() => {
        saveTestState();
    }, [saveTestState]);

    const clearSavedState = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear saved test state:', error);
        }
    }, []);

    console.log(timeLeft);
    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !isCompleted) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft, isCompleted]);

    // Format time as MM:SS
    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Handle answer selection
    const handleAnswerSelect = useCallback(
        (answer: string) => {
            setAnswers(prevAnswers => {
                const newAnswers = [...prevAnswers];
                newAnswers[currentQuestionIndex] = answer;
                return newAnswers;
            });
        },
        [currentQuestionIndex]
    );

    // Handle question navigation
    const goToQuestion = useCallback(
        (index: number) => {
            setCurrentQuestionIndex(Math.max(0, Math.min(questions.length - 1, index)));
        },
        [questions.length]
    );

    // Handle next/previous question
    const goToNextQuestion = useCallback(() => {
        goToQuestion(currentQuestionIndex + 1);
    }, [currentQuestionIndex, goToQuestion]);

    const goToPreviousQuestion = useCallback(() => {
        goToQuestion(currentQuestionIndex - 1);
    }, [currentQuestionIndex, goToQuestion]);

    // Handle test submission
    const handleSubmit = useCallback(() => {
        setIsCompleted(true);
        router.push('/placement-test?isCompleted=true');
        // clearSavedState();

        let payload = [];

        for (let i = 0; i < answers.length; i++) {
            payload.push({
                questionId: questions[i].id,
                answer: answers[i],
            });
        }
        console.log('answers', payload);

        // saveTestResults(answers, timeElapsed);
    }, []);

    const answeredCount = answers.filter(a => a !== '').length;
    const progress = (answeredCount / questions.length) * 100;

    useEffect(() => {
        return () => {
            if (!isCompleted) {
                saveTestState();
            }
        };
    }, [isCompleted, saveTestState]);

    return {
        currentQuestion: questions[currentQuestionIndex],
        currentQuestionIndex,
        answers,
        timeLeft,
        isCompleted,
        progress,
        loadSavedState,
        answeredCount,
        totalQuestions: questions.length,

        handleAnswerSelect,
        goToQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
        handleSubmit,
        formatTime,

        isFirstQuestion: currentQuestionIndex === 0,
        isLastQuestion: currentQuestionIndex === questions.length - 1,
        allQuestionsAnswered: answeredCount === questions.length,
    };
};
