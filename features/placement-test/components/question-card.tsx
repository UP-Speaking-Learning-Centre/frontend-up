import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Question } from '@/types/placement-test';
import { QUESTION_TYPE } from '@/constants/placement-test';

const QuestionCard = ({
    currentQuestion,
    currentQuestionIndex,
    answers,
    handleAnswerSelect,
}: {
    currentQuestion: Question;
    currentQuestionIndex: number;
    answers: string[];
    handleAnswerSelect: (answer: string) => void;
}) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg">
                    <div className="space-y-2">
                        <p>{currentQuestion.instruction}</p>
                        <p className="text-base font-normal">{currentQuestion.questionText}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {currentQuestion.questionType === QUESTION_TYPE.multiple_choice && (
                    <RadioGroup
                        value={answers[currentQuestionIndex] || ''}
                        onValueChange={value => handleAnswerSelect(value)}
                    >
                        {currentQuestion.options?.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.toString()} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                                    {String.fromCharCode(65 + index)}. {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}

                {(currentQuestion.questionType === QUESTION_TYPE.fill_in_the_blank ||
                    currentQuestion.questionType === QUESTION_TYPE.free_text) && (
                    <Input
                        type="text"
                        value={answers[currentQuestionIndex] || ''}
                        onChange={e => handleAnswerSelect(e.target.value)}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default QuestionCard;
