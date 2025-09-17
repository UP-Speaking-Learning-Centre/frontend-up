'use client';

import { Button } from '@/components/ui/button';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import SelectStudent from '@/features/dashboard/components/select-student';
import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';

const page = () => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <DashboardContentLayout pageTitle="Detail Student" extras={<SelectStudent />}>
            <div className="bg-gray-50 flex">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className=" overflow-auto p-6">
                        <Button
                            className="w-full text-end justify-end"
                            variant={'link'}
                            onClick={() => ref.current?.click()}
                        >
                            Select detail student to show
                            <ArrowUp />
                        </Button>
                    </main>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
