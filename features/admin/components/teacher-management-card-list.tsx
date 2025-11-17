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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { inter } from '@/constants/fonts';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';
import useGetTeachers from '../queries/useGetTeachers';
import { useTeacherManagementStore } from '../stores/teacher';

import ImageWithFallback from '@/components/ui/image-with-fallback';
import { Skeleton } from '@/components/ui/skeleton';
import useAdminPagination from '../hooks/useAdminPagination';
import AdminPagination from './admin-pagination';
import { cn } from '@/lib/utils';

interface Props {
    onOpenSchedule: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
const TeacherManagementCardList: FC<Props> = ({ onOpenSchedule, onEdit, onDelete }) => {
    const { pagination, setPagination } = useAdminPagination();
    const teachers = useTeacherManagementStore(s => s.teacher);
    const { isLoading } = useGetTeachers({ currentPage: pagination.currentPage });

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading && (
                    <>
                        <Skeleton className="h-96 w-full" loading={isLoading} />
                        <Skeleton className="h-96 w-full" loading={isLoading} />
                        <Skeleton className="h-96 w-full" loading={isLoading} />
                    </>
                )}
                {teachers.map(mentor => (
                    <Card
                        key={mentor.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="flex items-center justify-between p-4 pb-2">
                            <h3 className="font-semibold text-gray-900">{mentor.memberName}</h3>
                            {/* <p>{mentor.speciality}</p> */}
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => onOpenSchedule(mentor.id)}
                                    variant={'outline'}
                                    className="p-2 size-10 rounded"
                                >
                                    <Calendar className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => onEdit(mentor.id)}
                                    variant={'outline'}
                                    className="p-2 size-10 rounded"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={'outline'} className="p-2 size-10 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className={inter.className}>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Anda akan menghapus mentor{' '}
                                                <span className="text-primary">
                                                    {mentor.memberName}
                                                </span>
                                                .
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Data yang dihapus tidak dapat dikembalikan.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(mentor.id)}>
                                                Hapus
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div className="px-4 pb-3">
                            <div className="relative w-full aspect-[8/9] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                                <ImageWithFallback
                                    src={mentor.photoUrl || ''}
                                    alt={mentor.memberName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="px-4 pb-3">
                            <Badge className="bg-primary hover:bg-primary/80 text-normal text-white px-3 py-1 rounded-full text-xs">
                                {mentor.teacher.name}
                            </Badge>
                        </div>

                        {/* Description */}
                        <div className="px-4 pb-4">
                            <p className="text-gray-700 text-xl font-semibold leading-relaxed mb-4">
                                {mentor.memberName}
                            </p>

                            {/* Available Locations */}
                            <div>
                                <p className="font-normal text-neutral-400 text-xs mb-2">
                                    Lokasi Mengajar
                                </p>
                                <p
                                    className={cn(
                                        'text-gray-700 text-sm font-medium border rounded-full w-fit px-3',
                                        !mentor.location && 'text-red-500 border-red-500'
                                    )}
                                >
                                    {mentor.location?.name || 'Tidak ada lokasi'}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {pagination.totalPages > 1 && (
                <AdminPagination pagination={pagination} setPagination={setPagination} />
            )}
        </div>
    );
};

export default TeacherManagementCardList;
