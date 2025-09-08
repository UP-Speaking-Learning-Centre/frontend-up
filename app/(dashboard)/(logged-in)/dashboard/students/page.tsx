import React from 'react';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';

const page = () => {
    return (
        <DashboardContentLayout pageTitle="Detail Student">
            <div className="bg-gray-50 flex">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-auto p-6"></main>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default page;
