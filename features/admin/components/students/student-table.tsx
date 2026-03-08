import { Button } from '@/components/ui/button';
import Table from '@/features/dashboard/components/table';
import { getDayOfWeek } from '@/lib/date';
import { StudentType } from '@/types/students';
import { Eye } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

interface StudentTableProps {
    isLoading: boolean;
    students: StudentType[];
    pagination: any;
    onChangePage: (page: number) => void;
}

export default function StudentTable({
    isLoading,
    students,
    pagination,
    onChangePage,
}: StudentTableProps) {
    return (
        <Table<StudentType>
            isLoading={isLoading}
            columns={[
                { name: 'Name', id: 'studentName', width: 'w-[300px]' },
                { name: 'Phone', id: 'parentPhoneNumber' },
                { name: 'Program', id: 'program' },
                { name: 'Group', id: 'group' },
                { name: 'Mentor', id: 'teacherName' },
                { name: 'Schedules', id: 'schedules' },
                { name: 'Actions', id: 'actions' },
            ]}
            values={students?.map((user: any) => {
                return {
                    ...user,
                    studentName: {
                        renderCell: () => (
                            <p className="font-semibold truncate max-w-[300px]">
                                {user.studentName}
                            </p>
                        ),
                    },
                    program: {
                        renderCell: () => <p>{user.program === 'N/A' ? '-' : user.program}</p>,
                    },
                    group: {
                        renderCell: () => <p>{user.group === 'N/A' ? '-' : user.group}</p>,
                    },
                    teacherName: {
                        renderCell: () => (
                            <p>{user.teacherName === 'N/A' ? '-' : user.teacherName}</p>
                        ),
                    },
                    schedules: {
                        renderCell: () => (
                            <>
                                {user.schedules?.length ? (
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        {user.schedules?.map((item: any, i: number) => (
                                            <p key={i}>
                                                {getDayOfWeek(item.dayOfWeek)},{' '}
                                                {moment(item.startTime, 'HH:mm:ss').format('HH:mm')}{' '}
                                                -{' '}
                                                {moment(item.endTime, 'HH:mm:ss').format('HH:mm')}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>-</p>
                                )}
                            </>
                        ),
                    },
                    actions: {
                        renderCell: () => (
                            <Link href={`/admin/students/${user.studentId}`}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hover:text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </Link>
                        ),
                    },
                };
            })}
            pagination={pagination}
            onChangePage={page => onChangePage(page)}
        />
    );
}
