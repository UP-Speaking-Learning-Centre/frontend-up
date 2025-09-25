'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ALL_GROUP, ALL_MENTOR, ALL_PROGRAM } from '@/features/admin/constants/config';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DashboardFilter from '@/features/dashboard/components/filter';
import Table from '@/features/dashboard/components/table';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsQuery from '@/features/dashboard/queries/use-fetch-students';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { cn } from '@/lib/utils';
import { StudentType } from '@/types/students';
import { debounce } from '@/utils/function.helper';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
    const students = useStudentsStore(s => s.students);
    const pagination = useStudentsStore(s => s.pagination);
    const filter = useStudentsStore(s => s.filters);
    const onChangeFilter = useStudentsStore(s => s.onChangeFilter);
    const {
        filters: { groups, mentors, programs },
        onChangePage,
        onChangeSearch,
        onChangeGroup,
        onChangeProgram,
        onChangeMentor,
    } = useFilterStudents(onChangeFilter, filter.program!);
    const { isLoading } = useFetchStudentsQuery({
        studentName: filter.searchQuery,
        mentorId: filter.mentors,
        programId: filter.program,
        groupId: filter.group,
        currentPage: pagination.currentPage,
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <DashboardContentLayout pageTitle="Students">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Filter className="size-5" />
                                Filters
                            </div>
                            <div className="size-8 flex items-center justify-center border border-primary rounded-sm cursor-pointer">
                                <ChevronDown
                                    className={cn(
                                        'size-5 transition-all duration-300 text-primary ease-in-out',
                                        isFilterOpen ? 'rotate-180' : ''
                                    )}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div
                            className={cn(
                                'grid grid-cols-1 mx-6 mt-0 overflow-hidden md:grid-cols-4 gap-4 h-fit transition-all duration-300 ease-in-out',
                                isFilterOpen ? 'max-h-[50vh] mb-6' : 'max-h-0 mb-0'
                            )}
                        >
                            <div className="flex flex-col items-start gap-2">
                                <Label>Search Name</Label>
                                <Input
                                    placeholder="Search..."
                                    onChange={debounce(e => onChangeSearch(e.target.value), 500)}
                                />
                            </div>
                            <DashboardFilter
                                label="Program"
                                options={
                                    programs?.map(program => ({
                                        id: program.id,
                                        name: program.name,
                                    })) || []
                                }
                                onSelect={onChangeProgram}
                                value={filter.program?.toString() || ''}
                                defaultValue={ALL_PROGRAM}
                            />
                            <DashboardFilter
                                label="Group"
                                options={groups}
                                onSelect={onChangeGroup}
                                value={filter.group?.toString() || ''}
                                defaultValue={ALL_GROUP}
                            />
                            <DashboardFilter
                                label="Mentor"
                                options={mentors}
                                onSelect={onChangeMentor}
                                value={filter.mentors.toString() || ''}
                                defaultValue={ALL_MENTOR}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Table<StudentType>
                    isLoading={isLoading}
                    columns={[
                        { name: 'Name', id: 'studentName' },
                        { name: 'Phone', id: 'parentPhoneNumber' },
                        { name: 'Program', id: 'program' },
                        { name: 'Group', id: 'group' },
                        { name: 'Mentor', id: 'teacherName' },
                        { name: 'Schedule', id: 'schedule' },
                        { name: 'Actions', id: 'actions' },
                    ]}
                    values={students?.map(user => {
                        return {
                            ...user,
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
            </div>
        </DashboardContentLayout>
    );
};

export default Page;
