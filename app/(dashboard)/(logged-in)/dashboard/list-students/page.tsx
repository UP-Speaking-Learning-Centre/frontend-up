'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useGetProfile from '@/features/home/queries/useGetProfile';
import { isPlacementTest } from '@/utils/api.helper';
import { User } from 'lucide-react';
import Link from 'next/link';

const ListStudent = () => {
    const { data, isLoading } = useGetProfile();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Students List</h2>
                    <p className="text-gray-600">Manage and view all your students</p>
                </div>
                <Button className="bg-[#CE6439] hover:bg-[#CE6439]/90">Add New Student</Button>
            </div>

            <div className="grid gap-6">
                {data?.students.map(student => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {student.name}
                                        </h3>
                                        <div className="mt-2">
                                            <p>Program: {student.programName}</p>
                                            <p>Level: {student.levelName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {isPlacementTest(student.testResults ?? []) ? (
                                        <Badge
                                            variant="outline"
                                            className="bg-amber-100 text-amber-700 hover:bg-amber-100"
                                        >
                                            Menunggu Hasil Test
                                        </Badge>
                                    ) : (student.testResults?.length ?? 0) > 0 ? (
                                        <Badge variant="default">Aktif</Badge>
                                    ) : (
                                        <Badge variant="secondary">Tidak Aktif</Badge>
                                    )}
                                    <Link href={`/dashboard/student/${student.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ListStudent;
