'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants/routes';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import useGetProfile from '@/features/home/queries/useGetProfile';
import { ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const page = () => {
    const { data: students } = useGetProfile();
    const router = useRouter();
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <DashboardContentLayout
            pageTitle="Detail Student"
            extras={
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-3">Current Student:</span>
                    <Select
                    value=''
                        onValueChange={id =>
                            router.replace(ROUTES.dashboardStudentsId.expand({ id }))
                        }
                    >
                        <SelectTrigger ref={ref} className="w-[180px]">
                            <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                            {students?.students.map(student => (
                                <SelectItem value={student.id.toString()}>
                                    {student.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
        >
            <div className="bg-gray-50 flex">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className=" overflow-auto p-6">
                        <Button
                            className="w-full text-end justify-end"
                            variant={'link'}
                            onClick={() => ref.current?.click()}
                        >
                            Select detail student to show
                            <ArrowUp/>
                        </Button>
                    </main>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
