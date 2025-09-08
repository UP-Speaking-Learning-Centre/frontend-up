'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle } from 'lucide-react';
import data from '@/data/placement-test.json';
import { Input } from '@/components/ui/input';
import { usePlacementTest } from '@/features/placement-test/hooks/use-placement-test';
import Header from '@/features/placement-test/components/header';
import Navigation from '@/features/placement-test/components/navigation';
import QuestionCard from '@/features/placement-test/components/question-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

function PlacementTestPage() {
    const router = useRouter();
    const {
        currentQuestion,
        currentQuestionIndex,
        answers,
        timeLeft,
        isCompleted,
        progress,
        answeredCount,
        totalQuestions,
        handleAnswerSelect,
        goToQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
        handleSubmit,
        formatTime,
        isFirstQuestion,
        isLastQuestion,
        allQuestionsAnswered,
        loadSavedState,
    } = usePlacementTest(data.questions);

    const handleContinueToForm = () => {
        // Handle navigation to the registration form
        // router.push('/register');
    };

    if (isCompleted) {
        return (
            <div className="mx-auto my-20 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle>Test Selesai!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <div className="bg-[#EFF6FF] text-[#1E3A8A] px-4 py-6 rounded-lg">
                            <p className="text-xs">Langkah Selanjutnya:</p>
                            <p className="font-semibold text-lg">Interview dengan pihak UP SLC</p>
                        </div>
                        <p className="text-sm text-[#4B5563]">
                            Tim UP SLC akan menghubungi anda dalam waktu dekat untuk interview, tapi
                            sebelum itu{' '}
                            <span className="font-semibold text-[#1E3A8A]">
                                anda harus mengisi data diri terlebih dahulu!
                            </span>
                        </p>
                        <Button onClick={handleContinueToForm} className="w-full">
                            Isi Data Diri
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loadSavedState) {
        return (
            <div className="min-h-screen max-w bg-gray-50 pt-4">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 grid grid-cols-12">
                    <div className="col-span-8">
                        <Skeleton className="w-full h-32" />
                        <Skeleton className="w-full h-32 mt-4" />
                    </div>
                    <div className="col-span-4">
                        <Skeleton className="w-full h-32" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w bg-gray-50 pt-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-4 grid grid-cols-12">
                <div className="col-span-8">
                    {/* Header */}
                    <Header
                        timeLeft={timeLeft}
                        formatTime={formatTime}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={totalQuestions}
                        answeredCount={answeredCount}
                        progress={progress}
                    />

                    {/* Question */}
                    <QuestionCard
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={currentQuestionIndex}
                        answers={answers}
                        handleAnswerSelect={handleAnswerSelect}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={goToPreviousQuestion}
                            disabled={isFirstQuestion}
                        >
                            Sebelumnya
                        </Button>

                        {isLastQuestion ? (
                            <Button onClick={handleSubmit} disabled={!allQuestionsAnswered}>
                                Submit Test
                            </Button>
                        ) : (
                            <Button onClick={goToNextQuestion}>Selanjutnya</Button>
                        )}
                    </div>
                </div>

                {/* Question Navigator */}
                <Navigation
                    totalQuestions={totalQuestions}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    goToQuestion={goToQuestion}
                />
            </div>
        </div>
    );
}

const PlacementTestPageWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlacementTestPage />
        </Suspense>
    );
};

export default PlacementTestPageWrapper;
