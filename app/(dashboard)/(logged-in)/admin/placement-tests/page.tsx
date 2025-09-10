'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PLACEMENT_TEST_FILTER_OPTIONS } from '@/constants/placement-test';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DashboardFilter from '@/features/dashboard/components/filter';
import Table from '@/features/dashboard/components/table';
import useFilterStudents from '@/features/dashboard/hooks/use-filter-studets';
import useFetchStudentsWithPlacementQuery from '@/features/dashboard/queries/use-fetch-students-with-placement';
import { useStudentsStore } from '@/features/dashboard/stores/students-store';
import { cn } from '@/lib/utils';
import { StudentPlacementTest } from '@/types/students';
import { ChevronDown, Eye, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Index = () => {
    const filter = useStudentsStore(s => s.filters);
    const { isLoading } = useFetchStudentsWithPlacementQuery({
        search: filter.searchQuery,
        group: filter.group[0]?.id,
    });
    const router = useRouter();
    const students = useStudentsStore(s => s.studentsPlacementTest);
    const pagination = useStudentsStore(s => s.paginationPlacementTest);
    const onChangeFilter = useStudentsStore(s => s.onChangeFilter);
    const {
        filterPlacementTest: { groups, mentors, status },
        onChangePage,
    } = useFilterStudents();

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
                                <Label>Search Name/Phone</Label>
                                <Input
                                    placeholder="Search..."
                                    onChange={e => onChangeFilter('searchQuery', e.target.value)}
                                />
                            </div>
                            <DashboardFilter
                                label="Group"
                                options={groups}
                                onSelect={val =>
                                    onChangeFilter<{ id: number; name: string }>('group', {
                                        id: groups.find(group => group.name === val)?.id!,
                                        name: val,
                                    })
                                }
                                defaultValue="All Groups"
                            />
                            <DashboardFilter
                                label="Mentor"
                                options={mentors}
                                onSelect={val =>
                                    onChangeFilter('mentors', {
                                        id: mentors.find(group => group.name === val)?.id!,
                                        name: val,
                                    })
                                }
                                defaultValue="All Mentors"
                            />
                            <DashboardFilter
                                label="Status"
                                options={status}
                                onSelect={val =>
                                    onChangeFilter('status', {
                                        id: status.find(group => group.name === val)?.id!,
                                        name: val,
                                    })
                                }
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
                            { name: 'Name', id: 'studentName', width: '20%' },
                            { name: 'Phone', id: 'parentPhoneNumber' },
                            { name: 'Program (Group)', id: 'program' },
                            { name: 'Status', id: 'status' },
                            { name: 'Test Date', id: 'testDate' },
                            { name: 'Actions', id: 'actions' },
                        ]}
                        values={students.map(user => {
                            return {
                                ...user,
                                program: {
                                    renderCell: () => (
                                        <div className="flex items-center gap-2">
                                            {user.program} ({user.group})
                                        </div>
                                    ),
                                },
                                status: {
                                    renderCell: () => (
                                        <Badge className="flex items-center gap-2">
                                            {
                                                PLACEMENT_TEST_FILTER_OPTIONS.find(
                                                    option =>
                                                        option.id === user.resultId?.toString()
                                                )?.name
                                            }
                                        </Badge>
                                    ),
                                },
                                testDate: {
                                    renderCell: () => (
                                        <div className="flex items-center gap-2">
                                            {user.testDate}
                                        </div>
                                    ),
                                },
                                actions: {
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
