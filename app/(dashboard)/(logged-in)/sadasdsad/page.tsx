'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Users,
    FileText,
    LogOut,
    Menu,
    Eye,
    ChevronLeft,
    ChevronRight,
    Filter,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

// Extended dummy data with 20 placement test questions
const placementQuestions = [
    {
        id: 1,
        question: 'What _____ you do yesterday?',
        options: ['do', 'did', 'does', 'doing'],
        correct: 1,
    },
    {
        id: 2,
        question: 'She _____ to the store every morning.',
        options: ['go', 'goes', 'going', 'went'],
        correct: 1,
    },
    {
        id: 3,
        question: 'I have _____ finished my homework.',
        options: ['already', 'yet', 'still', 'never'],
        correct: 0,
    },
    {
        id: 4,
        question: 'The book _____ on the table is mine.',
        options: ['lying', 'lies', 'lay', 'laid'],
        correct: 0,
    },
    {
        id: 5,
        question: 'If I _____ rich, I would travel the world.',
        options: ['am', 'was', 'were', 'be'],
        correct: 2,
    },
    {
        id: 6,
        question: 'She speaks English _____.',
        options: ['fluent', 'fluently', 'fluency', 'more fluent'],
        correct: 1,
    },
    {
        id: 7,
        question: 'I _____ him since last year.',
        options: ["don't see", "didn't see", "haven't seen", "wasn't seeing"],
        correct: 2,
    },
    {
        id: 8,
        question: 'The meeting _____ at 3 PM tomorrow.',
        options: ['start', 'starts', 'starting', 'will start'],
        correct: 3,
    },
    {
        id: 9,
        question: "This is the _____ movie I've ever seen.",
        options: ['good', 'better', 'best', 'well'],
        correct: 2,
    },
    {
        id: 10,
        question: 'I wish I _____ speak French.',
        options: ['can', 'could', 'will', 'would'],
        correct: 1,
    },
    {
        id: 11,
        question: 'The house _____ by my grandfather in 1950.',
        options: ['built', 'was built', 'is built', 'has built'],
        correct: 1,
    },
    {
        id: 12,
        question: '_____ you mind opening the window?',
        options: ['Do', 'Would', 'Will', 'Can'],
        correct: 1,
    },
    {
        id: 13,
        question: "I'm looking forward _____ you again.",
        options: ['see', 'to see', 'seeing', 'to seeing'],
        correct: 3,
    },
    {
        id: 14,
        question: 'Neither John _____ Mary came to the party.',
        options: ['or', 'nor', 'and', 'but'],
        correct: 1,
    },
    {
        id: 15,
        question: 'The more you practice, _____ you become.',
        options: ['good', 'better', 'the better', 'best'],
        correct: 2,
    },
    {
        id: 16,
        question: "I'd rather _____ at home tonight.",
        options: ['stay', 'to stay', 'staying', 'stayed'],
        correct: 0,
    },
    {
        id: 17,
        question: 'By the time you arrive, I _____ cooking.',
        options: ['finish', 'will finish', 'will have finished', 'finished'],
        correct: 2,
    },
    {
        id: 18,
        question: 'The project _____ completed by next month.',
        options: ['will be', 'will have', 'is being', 'has been'],
        correct: 0,
    },
    {
        id: 19,
        question: '_____ the weather was bad, we went hiking.',
        options: ['Despite', 'Although', 'Because', 'Since'],
        correct: 1,
    },
    {
        id: 20,
        question: 'I suggest _____ early tomorrow.',
        options: ['leave', 'to leave', 'leaving', 'left'],
        correct: 2,
    },
];

// Generate user answers for placement test
const generateUserAnswers = userId => {
    const answers = [];
    for (let i = 0; i < 20; i++) {
        // Simulate different answer patterns for different users
        let userAnswer;
        if (userId === '3') {
            // Andi - mostly correct answers
            userAnswer =
                Math.random() > 0.2 ? placementQuestions[i].correct : Math.floor(Math.random() * 4);
        } else if (userId === '4') {
            // Maya - mixed performance
            userAnswer =
                Math.random() > 0.4 ? placementQuestions[i].correct : Math.floor(Math.random() * 4);
        } else if (userId === '5') {
            // Reza - lower performance
            userAnswer =
                Math.random() > 0.6 ? placementQuestions[i].correct : Math.floor(Math.random() * 4);
        } else {
            userAnswer = Math.floor(Math.random() * 4);
        }

        answers.push({
            questionId: placementQuestions[i].id,
            question: placementQuestions[i].question,
            options: placementQuestions[i].options,
            userAnswer: userAnswer,
            correctAnswer: placementQuestions[i].correct,
            adminGrading: null, // null = not graded, true = correct, false = incorrect
        });
    }
    return answers;
};

// Dummy data for all users
const allUsers = [
    {
        id: '1',
        name: 'Budi Santoso',
        phone: '081234567890',
        email: 'budi@email.com',
        status: 'active',
        program: 'Elementary School',
        group: 'Novice',
        mentor: 'Ms. Feby',
        schedule: 'Senin & Rabu, 15:00-17:00',
        registrationType: 'regular',
    },
    {
        id: '2',
        name: 'Sari Santoso',
        phone: '081234567891',
        email: 'sari@email.com',
        status: 'active',
        program: 'Junior High School',
        group: 'Beginners',
        mentor: 'Mr. Firdan',
        schedule: 'Selasa & Kamis, 17:00-19:00',
        registrationType: 'regular',
    },
    {
        id: '3',
        name: 'Andi Wijaya',
        phone: '089876543210',
        email: 'andi@email.com',
        status: 'pending',
        program: 'Elementary School',
        group: 'Elementary',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        placementTest: {
            status: 'not_graded',
            date: '2025-01-15',
            answers: generateUserAnswers('3'),
            score: null,
            adminNotes: '',
        },
    },
    {
        id: '4',
        name: 'Maya Putri',
        phone: '087654321098',
        email: 'maya@email.com',
        status: 'pending',
        program: 'Elementary School',
        group: 'Elementary',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        placementTest: {
            status: 'reviewed',
            date: '2025-01-10',
            answers: generateUserAnswers('4'),
            score: null,
            adminNotes: 'Good basic understanding, needs interview',
        },
    },
    {
        id: '5',
        name: 'Reza Putra',
        phone: '085555555555',
        email: 'reza@email.com',
        status: 'pending',
        program: 'Junior High School',
        group: 'Interchange',
        mentor: '-',
        schedule: '-',
        registrationType: 'placement-test',
        placementTest: {
            status: 'done_interview',
            date: '2025-01-05',
            answers: generateUserAnswers('5'),
            score: null,
            adminNotes: 'Interview completed, ready for placement',
            interviewNotes: 'Student shows good speaking ability, confident in conversation',
        },
    },
];

// Store users data globally for access across components
if (typeof window !== 'undefined') {
    window.allUsersData = allUsers;
}

const sidebarItems = [
    { id: 'users', label: 'List Users', icon: Users },
    { id: 'placement-tests', label: 'Placement Tests', icon: FileText },
];

function PlacementTestsList() {
    const router = useRouter();
    const [users, setUsers] = useState(
        allUsers.filter(u => u.registrationType === 'placement-test')
    );
    const [filteredUsers, setFilteredUsers] = useState(
        allUsers.filter(u => u.registrationType === 'placement-test')
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        search: '',
        program: 'All Programs',
        group: 'All Groups',
        status: 'All Status',
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    // Apply filters
    useEffect(() => {
        const filtered = allUsers.filter(user => {
            if (user.registrationType !== 'placement-test') return false;

            const matchesSearch =
                filters.search === '' ||
                user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                user.phone.includes(filters.search);
            const matchesProgram =
                filters.program === 'All Programs' || user.program === filters.program;
            const matchesGroup = filters.group === 'All Groups' || user.group === filters.group;
            const matchesStatus =
                filters.status === 'All Status' || user.placementTest?.status === filters.status;

            return matchesSearch && matchesProgram && matchesGroup && matchesStatus;
        });

        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [filters]);

    const programs = [
        ...new Set(
            allUsers.filter(u => u.registrationType === 'placement-test').map(u => u.program)
        ),
    ];
    const groups = [
        ...new Set(allUsers.filter(u => u.registrationType === 'placement-test').map(u => u.group)),
    ];
    const statuses = ['not_graded', 'reviewed', 'in_interview', 'done_interview', 'graded'];

    const getStatusBadge = status => {
        const statusMap = {
            not_graded: { label: 'Not Graded', variant: 'secondary' },
            reviewed: { label: 'Reviewed', variant: 'outline' },
            in_interview: { label: 'In Interview', variant: 'default' },
            done_interview: { label: 'Done Interview', variant: 'default' },
            graded: { label: 'Graded', variant: 'default' },
        };
        const statusInfo = statusMap[status] || { label: status, variant: 'secondary' };
        return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <Label>Search Name/Phone</Label>
                            <Input
                                placeholder="Search..."
                                value={filters.search}
                                onChange={e =>
                                    setFilters(prev => ({ ...prev, search: e.target.value }))
                                }
                            />
                        </div>
                        <div>
                            <Label>Program</Label>
                            <Select
                                value={filters.program}
                                onValueChange={value =>
                                    setFilters(prev => ({ ...prev, program: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Programs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Programs">All Programs</SelectItem>
                                    {programs.map(program => (
                                        <SelectItem key={program} value={program}>
                                            {program}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Group</Label>
                            <Select
                                value={filters.group}
                                onValueChange={value =>
                                    setFilters(prev => ({ ...prev, group: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Groups" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Groups">All Groups</SelectItem>
                                    {groups.map(group => (
                                        <SelectItem key={group} value={group}>
                                            {group}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select
                                value={filters.status}
                                onValueChange={value =>
                                    setFilters(prev => ({ ...prev, status: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Status">All Status</SelectItem>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status
                                                .replace('_', ' ')
                                                .replace(/\b\w/g, l => l.toUpperCase())}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tests Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left p-4 font-medium">Name</th>
                                    <th className="text-left p-4 font-medium">Phone</th>
                                    <th className="text-left p-4 font-medium">Program</th>
                                    <th className="text-left p-4 font-medium">Group</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Test Date</th>
                                    <th className="text-left p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{user.name}</td>
                                        <td className="p-4">{user.phone}</td>
                                        <td className="p-4">{user.program}</td>
                                        <td className="p-4">{user.group}</td>
                                        <td className="p-4">
                                            {getStatusBadge(user.placementTest?.status)}
                                        </td>
                                        <td className="p-4">
                                            {new Date(
                                                user.placementTest?.date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    router.push(`/admin/placement-test/${user.id}`);
                                                }}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{' '}
                    {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{' '}
                    {filteredUsers.length} tests
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [activeItemId, setActiveItemId] = useState('users');
    const [currentUser, setCurrentUser] = useState({
        id: 'admin',
        name: 'Admin UP Education',
        accountType: 'admin',
    });

    const activeItem = sidebarItems.find(item => item.id === activeItemId);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    return (
        <div className="h-screen bg-gray-50 flex">
            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-full sm:max-w-[280px] p-0">
                    <div className="py-4 flex flex-col h-full bg-white">
                        <div className="px-6 mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-sm">
                                    UP
                                </div>
                                <span className="text-lg font-bold text-[#254116]">
                                    Admin Panel
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1 flex-1 px-3">
                            {sidebarItems.map(item => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className={`w-full justify-start font-normal ${
                                        activeItemId === item.id
                                            ? 'bg-[#CE6439]/10 text-[#CE6439] border-r-2 border-[#CE6439]'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    onClick={() => {
                                        setActiveItemId(item.id);
                                        setOpen(false);
                                    }}
                                >
                                    <item.icon className="h-4 w-4 mr-3" />
                                    <span>{item.label}</span>
                                </Button>
                            ))}
                        </div>
                        <div className="px-3 pt-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-normal text-red-600 hover:bg-red-50"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4 mr-3" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex h-full w-64 flex-col bg-white shadow-sm border-r">
                <div className="py-6 flex flex-col h-full">
                    <div className="px-6 mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-full bg-[#CE6439] flex items-center justify-center text-white font-bold text-lg">
                                UP
                            </div>
                            <span className="text-xl font-bold text-[#254116]">Admin Panel</span>
                        </div>
                    </div>
                    <div className="space-y-1 flex-1 px-3">
                        {sidebarItems.map(item => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={`w-full justify-start font-normal ${
                                    activeItemId === item.id
                                        ? 'bg-[#CE6439]/10 text-[#CE6439] border-r-2 border-[#CE6439]'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveItemId(item.id)}
                            >
                                <item.icon className="h-4 w-4 mr-3" />
                                <span>{item.label}</span>
                            </Button>
                        ))}
                    </div>
                    <div className="px-3 pt-4 border-t">
                        <div className="mb-4 px-3">
                            <p className="text-sm text-gray-600">Logged in as:</p>
                            <p className="font-medium">{currentUser.name}</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start font-normal text-red-600 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden mr-2"
                            onClick={() => setOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-semibold text-gray-900">{activeItem?.label}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto p-6">
                    {activeItemId === 'users' && <UsersList />}
                    {activeItemId === 'placement-tests' && <PlacementTestsList />}
                </main>
            </div>
        </div>
    );
}
