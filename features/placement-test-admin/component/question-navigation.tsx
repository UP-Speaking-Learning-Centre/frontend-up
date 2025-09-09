import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Button } from '@/components/ui/button';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';

const QuestionNavigation = () => {
    const { questions, currentQuestionIndex, setState } = useDetailPlacementTest();

    const classNames = (isGraded: boolean, isCorrect: boolean, isCurrent: boolean) => {
        if (isCurrent) {
            return 'border-blue-700 bg-blue-50 text-blue-700 hover:bg-blue-100';
        }

        if (!isGraded) {
            return 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100';
        }

        if (isCorrect) {
            return 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100';
        }

        return 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2">
                    {questions.map((question, index) => {
                        const isGraded = question.isGraded || false;
                        const isCorrect = question.isCorrect || false;
                        const isCurrent = index === currentQuestionIndex;

                        console.log(isGraded)

                        return (
                            <Button
                                key={index}
                                variant={isCurrent ? 'default' : 'outline'}
                                size="sm"
                                className={`w-10 h-10 p-0 ${classNames(
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
                        <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                        <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-100 border border-red-500 rounded"></div>
                        <span>Incorrect</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                        <span>Not Graded</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionNavigation;
