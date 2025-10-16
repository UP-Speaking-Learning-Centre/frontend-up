import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants/routes';
import useGetProfile from '@/features/home/queries/useGetProfile';
import useGetProfileById from '@/features/home/queries/useGetProfileById';
import { useParams, useRouter } from 'next/navigation';

const SelectStudent = () => {
    const { data: students } = useGetProfile();
    const { id } = useParams<{ id: string }>();
    const { data } = useGetProfileById(Number(id));

    const router = useRouter();

    return (
        <div className="flex items-center">
            <span className="hidden sm:block text-sm text-gray-600 mr-3">Current Student:</span>
            <Select
                value={data?.id.toString()}
                onValueChange={id => router.replace(ROUTES.dashboardStudentsId.expand({ id }))}
            >
                <SelectTrigger className="sm:w-[180px] text-start">
                    <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                    {students?.students.map(student => (
                        <SelectItem className="text-start" value={student.id.toString()}>
                            {student.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectStudent;
