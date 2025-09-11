'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle, X } from 'lucide-react';
import data from '@/data/placement-test.json';
import { Input } from '@/components/ui/input';
import { usePlacementTest } from '@/features/placement-test/hooks/use-placement-test';
import Header from '@/features/placement-test/components/header';
import Navigation from '@/features/placement-test/components/navigation';
import QuestionCard from '@/features/placement-test/components/question-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import usePlacementTestGuestStore from '@/features/select-program/stores/placemenet-test-guest-store';
import { useSubmitPlacementTestMutation } from '@/features/placement-test/queries/use-submit-placement-test';
import Overlay from '@/components/layout/overlay';
import { ROUTES } from '@/constants/routes';

function PlacementTestPage() {
    const router = useRouter();
    const questions = usePlacementTestGuestStore(s => s.questions);
    const testSessionId = usePlacementTestGuestStore(s => s.testSessionId);
    const { isPending } = useSubmitPlacementTestMutation();
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
    } = usePlacementTest(questions);

    const handleContinueToForm = () => {
        router.push(`${ROUTES.register}?testSessionId=${testSessionId}`);
    };

    if (!testSessionId) {
        return (
            <div className="mx-auto my-20 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <X className="w-8 h-8 text-red-600" />
                        </div>
                        <CardTitle className="text-xl">Terjadi kesalahan!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <div className="bg-red-100 text-red-600 px-4 py-6 rounded-lg">
                            <p className="font-semibold text-base">
                                Ada kesalahan ketika memuat soal placement test.
                                <br />
                                Mohon untuk tidak mengubah URL/refresh halaman ketika pengerjaan
                            </p>
                        </div>
                        <Button
                            onClick={() => router.push(ROUTES.chooseProgram)}
                            className="w-full mt-5"
                        >
                            Coba lagi
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
        <>
            {isPending && <Overlay opacity={10} />}
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
        </>
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
