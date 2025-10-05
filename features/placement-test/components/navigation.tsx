import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const navigation = ({
    totalQuestions,
    currentQuestionIndex,
    answers,
    goToQuestion,
}: {
    totalQuestions: number;
    currentQuestionIndex: number;
    answers: string[];
    goToQuestion: (index: number) => void;
}) => {
    return (
        <Card className="md:col-span-4 h-fit">
            <CardHeader>
                <CardTitle className="text-sm">Navigasi Soal</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-8 2xl:grid-cols-10 gap-1">
                    {Array.from({ length: totalQuestions }).map((_, index) => {
                        return (
                            <Button
                                key={index}
                                variant={
                                    currentQuestionIndex === index
                                        ? 'default'
                                        : !!answers[index]
                                        ? 'secondary'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => goToQuestion(index)}
                                className="w-8 h-8 shrink-0 p-0"
                            >
                                {index + 1}
                            </Button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default navigation;
