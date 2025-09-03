import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';
import React from 'react';

const Header = ({
    timeLeft,
    formatTime,
    currentQuestionIndex,
    totalQuestions,
    answeredCount,
    progress,
}: {
    timeLeft: number;
    formatTime: (seconds: number) => string;
    currentQuestionIndex: number;
    totalQuestions: number;
    answeredCount: number;
    progress: number;
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Placement Test</h1>
                <div className="flex items-center gap-2 text-red-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>
                        Soal {currentQuestionIndex + 1} dari {totalQuestions}
                    </span>
                    <span>{answeredCount} terjawab</span>
                </div>
                <Progress value={progress} />
            </div>
        </div>
    );
};

export default Header;
