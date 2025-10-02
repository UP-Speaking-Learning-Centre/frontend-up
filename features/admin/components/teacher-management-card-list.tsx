import { Card } from '@/components/ui/card';
import { useTeacherManagementStore } from '../stores/teacher';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { inter } from '@/constants/fonts';
import Image from 'next/image';
import useGetTeachers from '../queries/useGetTeachers';
import Overlay from '@/components/layout/overlay';
import { Badge } from '@/components/ui/badge';

import AdminPagination from './admin-pagination';
import { isValidHttpUrl } from '@/utils/api.helper';

interface Props {
    onOpenSchedule: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
const TeacherManagementCardList: FC<Props> = ({ onOpenSchedule, onEdit, onDelete }) => {
    const setPagination = useTeacherManagementStore(s => s.setPagination);
    const pagination = useTeacherManagementStore(s => s.pagination);
    const teachers = useTeacherManagementStore(s => s.teacher);

    const { isLoading } = useGetTeachers({ currentPage: pagination.currentPage });

    if (isLoading) return <Overlay />;
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teachers.map((mentor, index) => (
                    <Card
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="flex items-center justify-between p-4 pb-2">
                            <h3 className="font-semibold text-gray-900">{mentor.memberName}</h3>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => onOpenSchedule(mentor.id)}
                                    variant={'outline'}
                                    className="p-2 hover:bg-gray-100 rounded"
                                >
                                    <Calendar className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                    onClick={() => onEdit(mentor.id)}
                                    variant={'outline'}
                                    className="p-2 hover:bg-gray-100 rounded"
                                >
                                    <Edit className="w-4 h-4 text-gray-600" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className="p-3 hover:bg-gray-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-600" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className={inter.className}>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure want to delete this teacher?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently
                                                delete the teacher and remove your data from our
                                                servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(mentor.id)}>
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className="px-4 pb-3">
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                                <Image
                                    src={
                                        isValidHttpUrl(mentor.photoUrl ?? '')
                                            ? mentor.photoUrl || '/placeholder.svg'
                                            : '/placeholder.svg'
                                    }
                                    alt={mentor.memberName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="px-4 pb-3">
                            <Badge className="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
                                {mentor.teacher.name}
                            </Badge>
                        </div>

                        {/* Description */}
                        <div className="px-4 pb-4">
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                {mentor.memberName}
                            </p>

                            {/* Available Locations */}
                            <div>
                                <p className="font-semibold text-gray-900 text-sm mb-2">
                                    Available Locations:
                                </p>
                                <p className="text-gray-700 text-sm font-medium border rounded-full w-fit px-3">
                                    {/* {mentor.location} */}
                                    Lokasi Belum
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <AdminPagination pagination={pagination} setPagination={setPagination} />
        </div>
    );
};

export default TeacherManagementCardList;
