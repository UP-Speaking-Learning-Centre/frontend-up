import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';
import useSubmitMark from '../queries/use-submit-mark';
import { toast, Toaster } from 'sonner';

const QuestionDisplay = () => {
    const { questions, currentQuestionIndex, totalQuestions, setState } = useDetailPlacementTest();
    const currentQuestion = questions[currentQuestionIndex];

    const { mutateAsync } = useSubmitMark();
    const handleGradeQuestion = (question: any, isCorrect: boolean, isGraded: boolean) => {
        setState({
            questions: questions.map(q =>
                q.questionId === question.questionId
                    ? { ...q, checkAnswer: isCorrect ? 'correct' : 'incorrect', isGraded }
                    : q
            ),
        });
        mutateAsync({
            check: isCorrect ? 'correct' : 'incorrect',
            questionId: question.questionId,
        })
            .then(res => toast.info(res.message, { position: 'top-center' }))
            .catch(() => {
                toast.error('Failed to update, please try again later', { position: 'top-center' });
                setState({
                    questions: questions.map(q =>
                        q.questionId === question.questionId
                            ? { ...q, isCorrect: undefined, isGraded: undefined }
                            : q
                    ),
                });
            });
    };

    console.log(questions);
    return (
        <Card>
            <Toaster />
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setState({
                                    currentQuestionIndex: Math.max(0, currentQuestionIndex - 1),
                                })
                            }
                            disabled={currentQuestionIndex === 0}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setState({
                                    currentQuestionIndex: Math.min(
                                        totalQuestions - 1,
                                        currentQuestionIndex + 1
                                    ),
                                })
                            }
                            disabled={currentQuestionIndex === totalQuestions - 1}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {currentQuestion && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                {currentQuestion.questionText}
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                {currentQuestion.questionType === 'fill_in_the_blank' ||
                                currentQuestion.questionType === 'free_text' ? (
                                    <div>{currentQuestion.studentAnswer}</div>
                                ) : (
                                    currentQuestion.options?.map((option, optIndex) => {
                                        const isUserAnswer =
                                            option.toString() === currentQuestion.studentAnswer;

                                        return (
                                            <div
                                                key={optIndex}
                                                className={`p-3 rounded-lg border-2 ${
                                                    isUserAnswer && 'bg-blue-50 border-blue-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>
                                                        <strong>
                                                            {String.fromCharCode(65 + optIndex)}.
                                                        </strong>{' '}
                                                        {option}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Admin Grading */}
                        <div className="border-t pt-4">
                            {/* <div className="flex items-center justify-between mb-3">
                                <Label className="text-base font-medium">Admin Grading</Label>
                                <div className="flex items-center gap-2">
                                    {answers[currentQuestion].adminGrading !== null && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleResetGrading(currentQuestion)}
                                        >
                                            <RotateCcw className="w-4 h-4 mr-1" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div> */}
                            <div className="flex gap-3">
                                <Button
                                    variant={
                                        currentQuestion.checkAnswer === 'correct'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className={`flex-1 ${
                                        currentQuestion.checkAnswer === 'correct'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'border-green-300 text-green-600 hover:bg-green-50'
                                    }`}
                                    onClick={() => handleGradeQuestion(currentQuestion, true, true)}
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Correct
                                </Button>
                                <Button
                                    variant={
                                        currentQuestion.checkAnswer === 'incorrect'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className={`flex-1 ${
                                        currentQuestion.checkAnswer === 'incorrect'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'border-red-300 text-red-600 hover:bg-red-50'
                                    }`}
                                    onClick={() =>
                                        handleGradeQuestion(currentQuestion, false, true)
                                    }
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Incorrect
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default QuestionDisplay;
