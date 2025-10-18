import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Button } from '@/components/ui/button';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';

const QuestionNavigation = () => {
    const { questions, currentQuestionIndex, setState } = useDetailPlacementTest();

    const classNames = (isGraded: boolean, isCorrect: boolean, isCurrent: boolean) => {
        if (isCurrent) {
            return '!border-blue-700 bg-blue-50 text-blue-700 hover:text-blue-700 hover:bg-blue-100';
        }

        if (!isGraded) {
            return 'border-gray-300 bg-gray-50 text-gray-700 hover:text-gray-700 hover:bg-gray-100';
        }

        if (isCorrect) {
            return 'border-green-500 bg-green-50 text-green-700 hover:text-green-700 hover:bg-green-100';
        }

        return 'border-red-500 bg-red-50 text-red-700 hover:text-red-700 hover:bg-red-100';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Navigasi</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid max-md:grid-col-8 grid-cols-5 xl:grid-cols-7 gap-2">
                    {questions.map((question, index) => {
                        const isGraded = !!question.checkAnswer || question.isGraded || false;
                        const isCorrect = question.checkAnswer === 'correct' || false;
                        const isCurrent = index === currentQuestionIndex;

                        return (
                            <Button
                                key={index}
                                variant={isCurrent ? 'default' : 'outline'}
                                size="sm"
                                className={`w-10 h-10 border shrink-0 p-0 ${classNames(
                                    isGraded,
                                    isCorrect,
                                    isCurrent
                                )}`}
                                onClick={() => setState({ currentQuestionIndex: index })}
                            >
                                {index + 1}
                            </Button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 shrink-0 bg-green-100 border border-green-500 rounded"></div>
                        <span>Benar</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 shrink-0 bg-red-100 border border-red-500 rounded"></div>
                        <span>Salah</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 shrink-0 bg-gray-100 border border-gray-300 rounded"></div>
                        <span>Belum Dinilai</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionNavigation;
