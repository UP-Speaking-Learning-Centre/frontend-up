'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import { ALL_GROUP, ALL_PROGRAM, STATUS_OPTION } from '@/features/admin/constants/config';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DashboardFilter from '@/features/dashboard/components/filter';
import Table from '@/features/dashboard/components/table';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsWithPlacementQuery from '@/features/dashboard/queries/use-fetch-students-with-placement';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { renderDateToIndonesian } from '@/lib/moment';
import { cn } from '@/lib/utils';
import { StudentPlacementTest } from '@/types/students';
import { debounce } from '@/utils/function.helper';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Index = () => {
    const filter = useStudentsStore(s => s.filterPlacementTest);
    const router = useRouter();
    const students = useStudentsStore(s => s.studentsPlacementTest);
    const pagination = useStudentsStore(s => s.paginationPlacementTest);
    const { isLoading } = useFetchStudentsWithPlacementQuery();
    const onChangeFilterPlacementTest = useStudentsStore(s => s.onChangeFilterPlacementTest);
    const {
        filters: { groups, programs },
        onChangePage,
        onChangeGroup,
        onChangeProgram,
        onChangeStatus,
        onChangeSearch,
    } = useFilterStudents(onChangeFilterPlacementTest, filter.program!);

    const [isFilterOpen, setIsFilterOpen] = React.useState(true);

    return (
        <DashboardContentLayout pageTitle="Placement Tests">
            <div className="space-y-6 w-full">
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
                                options={programs}
                                onSelect={val => onChangeProgram(val)}
                                value={filter.program?.toString() || ''}
                                defaultValue={ALL_PROGRAM}
                            />
                            <DashboardFilter
                                label="Group"
                                options={groups}
                                onSelect={val => onChangeGroup(val)}
                                value={filter.group?.toString() || ''}
                                defaultValue={ALL_GROUP}
                            />
                            {/* <DashboardFilter
                                label="Mentor"
                                options={mentors}
                                onSelect={val => onChangeMentor(val)}
                                value={filter.mentors.toString() || ''}
                                defaultValue="All Mentors"
                            /> */}
                            <DashboardFilter
                                label="Status"
                                options={Object.entries(STATUS_OPTION).map(([name, id]) => ({
                                    id,
                                    name: PLACEMENT_TEST_FILTER_OPTIONS.find(
                                        option => option.value === id
                                    )?.name as string,
                                }))}
                                onSelect={val => onChangeStatus(val)}
                                value={filter.status?.toString() || ''}
                                defaultValue="All Status"
                            />
                        </div>
                    </CardContent>
                </Card>

                {isLoading && !students.length ? (
                    <div>Loading...</div>
                ) : (
                    <Table<StudentPlacementTest>
                        columns={[
                            { name: 'Name', id: 'studentName', width: 'w-[300px]' },
                            { name: 'Phone', id: 'parentPhoneNumber' },
                            { name: 'Program', id: 'program' },
                            { name: 'Group', id: 'group' },
                            { name: 'Status', id: 'status' },
                            { name: 'Test Date', id: 'testDate' },
                            { name: 'Actions', id: 'actions' },
                        ]}
                        values={students.map(user => {
                            return {
                                ...user,
                                studentName: {
                                    renderCell: () => (
                                        <p className="font-semibold truncate max-w-[300px]">
                                            {user.studentName}
                                        </p>
                                    ),
                                },
                                status: {
                                    renderCell: () => (
                                        <Badge
                                            className={cn(
                                                'flex items-center justify-center gap-2',
                                                PLACEMENT_TEST_FILTER_OPTIONS.find(
                                                    option => option.value === user.status
                                                )?.color
                                            )}
                                        >
                                            {
                                                PLACEMENT_TEST_FILTER_OPTIONS.find(
                                                    option => option.value === user.status
                                                )?.name
                                            }
                                        </Badge>
                                    ),
                                },
                                testDate: {
                                    renderCell: () => (
                                        <div className="flex items-center gap-2">
                                            {renderDateToIndonesian(user.testDate || '')}
                                        </div>
                                    ),
                                },
                                actions: {
                                    height: '!h-16',
                                    renderCell: () => (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hover:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            onClick={() =>
                                                router.push(
                                                    `/admin/placement-tests/${user.resultId}`
                                                )
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    ),
                                },
                            };
                        })}
                        pagination={pagination}
                        onChangePage={page => onChangePage(page)}
                    />
                )}
            </div>
        </DashboardContentLayout>
    );
};

export default Index;
