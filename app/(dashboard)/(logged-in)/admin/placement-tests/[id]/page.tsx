'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Check,
    X,
    ChevronLeft,
    ChevronRight,
    User,
    FileText,
    Save,
    RotateCcw,
} from 'lucide-react';

export default function PlacementTestDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [status, setStatus] = useState('');
    const [adminNotes, setAdminNotes] = useState('');
    const [interviewNotes, setInterviewNotes] = useState('');
    const [assignedLevel, setAssignedLevel] = useState('');
    const [assignedSchedule, setAssignedSchedule] = useState('');
    const [assignedMentor, setAssignedMentor] = useState('');
    const [finalScore, setFinalScore] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user data from global storage or localStorage
        const allUsersData = typeof window !== 'undefined' ? window.allUsersData : null;
        if (allUsersData) {
            const foundUser = allUsersData.find(u => u.id === params.id);
            if (foundUser && foundUser.registrationType === 'placement-test') {
                setUser(foundUser);
                setStatus(foundUser.placementTest.status || '');
                setAdminNotes(foundUser.placementTest.adminNotes || '');
                setInterviewNotes(foundUser.placementTest.interviewNotes || '');
                setAssignedLevel(foundUser.placementTest.assignedLevel || '');
                setAssignedSchedule(foundUser.placementTest.assignedSchedule || '');
                setAssignedMentor(foundUser.placementTest.assignedMentor || '');
                setFinalScore(foundUser.placementTest.score?.toString() || '');
            }
        }
        setLoading(false);
    }, [params.id]);

    const handleGradeQuestion = (questionIndex, isCorrect) => {
        if (!user) return;

        const updatedUser = { ...user };
        updatedUser.placementTest.answers[questionIndex].adminGrading = isCorrect;
        setUser(updatedUser);

        // Update global data
        if (typeof window !== 'undefined' && window.allUsersData) {
            const userIndex = window.allUsersData.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                window.allUsersData[userIndex] = updatedUser;
            }
        }
    };

    const handleResetGrading = questionIndex => {
        if (!user) return;

        const updatedUser = { ...user };
        updatedUser.placementTest.answers[questionIndex].adminGrading = null;
        setUser(updatedUser);

        // Update global data
        if (typeof window !== 'undefined' && window.allUsersData) {
            const userIndex = window.allUsersData.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                window.allUsersData[userIndex] = updatedUser;
            }
        }
    };

    const handleSave = () => {
        if (!user) return;

        // Calculate final score based on admin grading
        const gradedAnswers = user.placementTest.answers.filter(a => a.adminGrading !== null);
        const correctGradedAnswers = user.placementTest.answers.filter(
            a => a.adminGrading === true
        );
        const calculatedScore =
            gradedAnswers.length > 0
                ? Math.round(
                      (correctGradedAnswers.length / user.placementTest.answers.length) * 100
                  )
                : null;

        const updatedUser = {
            ...user,
            placementTest: {
                ...user.placementTest,
                status,
                adminNotes,
                interviewNotes,
                assignedLevel,
                assignedSchedule,
                assignedMentor,
                score: finalScore ? Number.parseInt(finalScore) : calculatedScore,
            },
        };

        // If status is graded, update user's main data
        if (status === 'graded') {
            updatedUser.status = 'active';
            updatedUser.group = assignedLevel;
            updatedUser.schedule = assignedSchedule;
            updatedUser.mentor = assignedMentor;
        }

        // Update global data
        if (typeof window !== 'undefined' && window.allUsersData) {
            const userIndex = window.allUsersData.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                window.allUsersData[userIndex] = updatedUser;
            }
        }

        setUser(updatedUser);
        alert('Changes saved successfully!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE6439] mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold">Loading placement test...</h2>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Placement test not found</h2>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    const answers = user.placementTest.answers || [];
    const totalQuestions = answers.length;
    const gradedQuestions = answers.filter(a => a.adminGrading !== null).length;
    const correctAnswers = answers.filter(a => a.adminGrading === true).length;
    const autoCorrectAnswers = answers.filter(a => a.userAnswer === a.correctAnswer).length;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <ArrowLeft className="size-6 mr-2" onClick={() => router.back()} />
                    <h1 className="text-2xl font-bold">Placement Test Detail - {user.name}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress */}
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
                                        <Progress
                                            value={(gradedQuestions / totalQuestions) * 100}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <p className="text-2xl font-bold text-green-600">
                                                {correctAnswers}
                                            </p>
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

                        {/* Question Display */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>
                                        Question {currentQuestion + 1} of {totalQuestions}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentQuestion(Math.max(0, currentQuestion - 1))
                                            }
                                            disabled={currentQuestion === 0}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentQuestion(
                                                    Math.min(
                                                        totalQuestions - 1,
                                                        currentQuestion + 1
                                                    )
                                                )
                                            }
                                            disabled={currentQuestion === totalQuestions - 1}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {answers[currentQuestion] && (
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-medium mb-4">
                                                {answers[currentQuestion].question}
                                            </h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                {answers[currentQuestion].options.map(
                                                    (option, optIndex) => {
                                                        const isUserAnswer =
                                                            optIndex ===
                                                            answers[currentQuestion].userAnswer;
                                                        const isCorrectAnswer =
                                                            optIndex ===
                                                            answers[currentQuestion].correctAnswer;
                                                        const adminGrading =
                                                            answers[currentQuestion].adminGrading;

                                                        return (
                                                            <div
                                                                key={optIndex}
                                                                className={`p-3 rounded-lg border-2 ${
                                                                    isUserAnswer &&
                                                                    'bg-blue-50 border-blue-300'
                                                                }`}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span>
                                                                        <strong>
                                                                            {String.fromCharCode(
                                                                                65 + optIndex
                                                                            )}
                                                                            .
                                                                        </strong>{' '}
                                                                        {option}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>

                                        {/* Admin Grading */}
                                        <div className="border-t pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <Label className="text-base font-medium">
                                                    Admin Grading
                                                </Label>
                                                <div className="flex items-center gap-2">
                                                    {answers[currentQuestion].adminGrading !==
                                                        null && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleResetGrading(currentQuestion)
                                                            }
                                                        >
                                                            <RotateCcw className="w-4 h-4 mr-1" />
                                                            Reset
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant={
                                                        answers[currentQuestion].adminGrading ===
                                                        true
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className={`flex-1 ${
                                                        answers[currentQuestion].adminGrading ===
                                                        true
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : 'border-green-300 text-green-600 hover:bg-green-50'
                                                    }`}
                                                    onClick={() =>
                                                        handleGradeQuestion(currentQuestion, true)
                                                    }
                                                >
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Correct
                                                </Button>
                                                <Button
                                                    variant={
                                                        answers[currentQuestion].adminGrading ===
                                                        false
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className={`flex-1 ${
                                                        answers[currentQuestion].adminGrading ===
                                                        false
                                                            ? 'bg-red-600 hover:bg-red-700'
                                                            : 'border-red-300 text-red-600 hover:bg-red-50'
                                                    }`}
                                                    onClick={() =>
                                                        handleGradeQuestion(currentQuestion, false)
                                                    }
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Incorrect
                                                </Button>
                                            </div>
                                            {answers[currentQuestion].adminGrading !== null && (
                                                <div className="mt-2 text-sm text-gray-600">
                                                    Admin marked this as:{' '}
                                                    <span
                                                        className={
                                                            answers[currentQuestion].adminGrading
                                                                ? 'text-green-600 font-medium'
                                                                : 'text-red-600 font-medium'
                                                        }
                                                    >
                                                        {answers[currentQuestion].adminGrading
                                                            ? 'Correct'
                                                            : 'Incorrect'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Question Navigator */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Question Navigator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-7 gap-2">
                                    {answers.map((answer, index) => {
                                        const isGraded = answer.adminGrading !== null;
                                        const isCorrect = answer.adminGrading === true;
                                        const isCurrent = index === currentQuestion;

                                        return (
                                            <Button
                                                key={index}
                                                variant={isCurrent ? 'default' : 'outline'}
                                                size="sm"
                                                className={`w-10 h-10 p-0 ${
                                                    !isCurrent && isGraded
                                                        ? isCorrect
                                                            ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                                                            : 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100'
                                                        : ''
                                                }`}
                                                onClick={() => setCurrentQuestion(index)}
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
                        {/* Student Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Student Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <Label>Name</Label>
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                        <Label>Phone</Label>
                                        <p className="font-medium">{user.phone}</p>
                                    </div>
                                    <div>
                                        <Label>Program</Label>
                                        <p className="font-medium">{user.program}</p>
                                    </div>
                                    <div>
                                        <Label>Test Date</Label>
                                        <p className="font-medium">
                                            {new Date(user.placementTest.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Status Management */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Status Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="not_graded">Not Graded</SelectItem>
                                            <SelectItem value="reviewed">Reviewed</SelectItem>
                                            <SelectItem value="in_interview">
                                                In Interview
                                            </SelectItem>
                                            <SelectItem value="done_interview">
                                                Done Interview
                                            </SelectItem>
                                            <SelectItem value="graded">Graded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {(status === 'done_interview' || status === 'graded') && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Assigned Level</Label>
                                            <Select
                                                value={assignedLevel}
                                                onValueChange={setAssignedLevel}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Beginner">
                                                        Beginner
                                                    </SelectItem>
                                                    <SelectItem value="Elementary">
                                                        Elementary
                                                    </SelectItem>
                                                    <SelectItem value="Intermediate">
                                                        Intermediate
                                                    </SelectItem>
                                                    <SelectItem value="Advanced">
                                                        Advanced
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Assigned Mentor</Label>
                                            <Select
                                                value={assignedMentor}
                                                onValueChange={setAssignedMentor}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select mentor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Ms. Feby">
                                                        Ms. Feby
                                                    </SelectItem>
                                                    <SelectItem value="Mr. Firdan">
                                                        Mr. Firdan
                                                    </SelectItem>
                                                    <SelectItem value="Ms. Binti">
                                                        Ms. Binti
                                                    </SelectItem>
                                                    <SelectItem value="Mr. Noval">
                                                        Mr. Noval
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Assigned Schedule</Label>
                                            <Input
                                                value={assignedSchedule}
                                                onChange={e => setAssignedSchedule(e.target.value)}
                                                placeholder="e.g., Senin & Rabu, 15:00-17:00"
                                            />
                                        </div>
                                    </div>
                                )}

                                {status === 'graded' && (
                                    <div>
                                        <Label>Final Score (Override)</Label>
                                        <Input
                                            type="number"
                                            value={finalScore}
                                            onChange={e => setFinalScore(e.target.value)}
                                            placeholder={`Auto: ${Math.round(
                                                (correctAnswers / totalQuestions) * 100
                                            )}%`}
                                            min="0"
                                            max="100"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Leave empty to use calculated score:{' '}
                                            {Math.round((correctAnswers / totalQuestions) * 100)}%
                                        </p>
                                    </div>
                                )}

                                <Button onClick={handleSave} className="w-full">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
