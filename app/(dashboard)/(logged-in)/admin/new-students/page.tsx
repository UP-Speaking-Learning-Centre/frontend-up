'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import Table from '@/features/dashboard/components/table';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsQuery from '@/features/dashboard/queries/use-fetch-students';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { getDayOfWeek } from '@/lib/date';
import { StudentType } from '@/types/students';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import DashboardFilter from '@/features/dashboard/components/filter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { debounce } from '@/utils/function.helper';

const Page = () => {
    const newStudents = useStudentsStore(s => s.newStudents);
    const filter = useStudentsStore(s => s.filterNewStudent);
    const paginationNewStudent = useStudentsStore(s => s.paginationNewStudent);
    const { isLoading, refetch } = useFetchStudentsQuery(true);

    const onChangeFilter = useStudentsStore(s => s.onChangeFilter);

    const { onChangePage, onChangeSearch } = useFilterStudents(
        onChangeFilter,
        filter.program!,
        true
    );
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const renderContent = () => {
        if (isLoading) {
            return <Skeleton className="h-28" />;
        }

        if (newStudents.length === 0) {
            return (
                <div className="h-[calc(100vh-12rem)] px-10 flex items-center justify-center">
                    <div className="flex flex-col text-center items-center gap-1">
                        <h3 className="text-2xl font-semibold">Tidak ada student baru!</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Belum ada lagi student baru yang belum mendaftar. Semua student yang
                            mendaftar sudah diproses.
                        </p>
                        <p className="text-sm text-muted-foreground">Cek berkala setiap 1 jam.</p>

                        <Button className="mt-4 w-fit" onClick={() => refetch()}>
                            Perbarui Data
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex justify-center mt-4 mb-12">
                    <Button className="w-fit" onClick={() => refetch()}>
                        Perbarui Data
                    </Button>
                </div>

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
                    values={newStudents?.map(user => {
                        return {
                            ...user,
                            studentName: {
                                renderCell: () => (
                                    <p
                                        className="font-semibold truncate max-w-[300px]"
                                        title={user.studentName}
                                    >
                                        {user.studentName}
                                    </p>
                                ),
                            },
                            program: {
                                renderCell: () => (
                                    <p>{user.program === 'N/A' ? '-' : user.program}</p>
                                ),
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
                                            <div className="flex items-start justify-center flex-col gap-1">
                                                {user.schedules?.map((item, i) => (
                                                    <p key={i}>
                                                        {getDayOfWeek(item.dayOfWeek)},{' '}
                                                        {moment(item.startTime, 'HH:mm:ss').format(
                                                            'HH:mm'
                                                        )}{' '}
                                                        -{' '}
                                                        {moment(item.endTime, 'HH:mm:ss').format(
                                                            'HH:mm'
                                                        )}
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
                                    <Link href={`/admin/students/${user.studentId}?from=new`}>
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
                    pagination={paginationNewStudent}
                    onChangePage={page => onChangePage(page)}
                />
            </div>
        );
    };

    return (
        <DashboardContentLayout pageTitle="New Students">{renderContent()}</DashboardContentLayout>
    );
};

export default Page;
