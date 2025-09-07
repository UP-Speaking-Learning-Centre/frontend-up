import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useDisplayQuestion from '../hooks/use-detail-placement-test';

const MarkingProgress = () => {
    const { gradedQuestions, totalQuestions, correctAnswers } = useDisplayQuestion();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Grading Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Questions Graded</span>
                            <span>
                                {gradedQuestions} / {totalQuestions}
                            </span>
                        </div>
                        <Progress value={(gradedQuestions / totalQuestions) * 100} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                            <p className="text-sm text-green-600">Correct</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">
                                {gradedQuestions - correctAnswers}
                            </p>
                            <p className="text-sm text-red-600">Incorrect</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MarkingProgress;
