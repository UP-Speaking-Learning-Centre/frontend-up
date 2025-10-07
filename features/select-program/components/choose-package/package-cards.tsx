import React from 'react';
import Card from '../card';
import useProgramSelection from '../../hooks/use-program-selection';
import {
    CHOOSE_GROUP_STEP,
    CHOOSE_PACKAGE_STEP,
    PROGRAM_SELECTION_STEPS,
    REGISTER_STEPS,
} from '@/constants/program-selections';
import useFetchGroupsQuery from '../../queries/use-fetch-groups';
import { Skeleton } from '@/components/ui/skeleton';
import useFetchPackagesQuery from '../../queries/use-fetch-packages';
import { cn } from '@/lib/utils';
import { CheckCircle2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';

const PackageCards = ({ isFromPlacement = false }: { isFromPlacement?: boolean }) => {
    const { handleNextStepAction, formValue } = useProgramSelection(isFromPlacement);
    const { data: packages, isLoading } = useFetchPackagesQuery();

    const renderContent = () => {
        if (isLoading) {
            return [...new Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-72 col-span-1" />
            ));
        }

        return packages?.map(item => {
            const isPackageSelected = formValue.packageId === item.id;
            return (
                <div
                    key={item.id}
                    className={cn(
                        'basis-[calc(30%-18px)]',
                        'flex flex-col w-full cursor-pointer overflow-hidden rounded-lg border-2 border-[#E2E8F0] hover:translate-y-[-5px] transition-all shadow-md hover:shadow-xl hover:border-[#CE6439]',
                        isPackageSelected && 'border-[#CE6439] border-[3px] bg-primary/20'
                    )}
                    onClick={() =>
                        handleNextStepAction({
                            stepId: CHOOSE_PACKAGE_STEP,
                            formValue: { packageId: item.id, packageName: item.name },
                        })
                    }
                >
                    <div
                        className={cn(
                            'bg-secondary p-4 text-white font-medium text-lg',
                            isPackageSelected && 'border-[#CE6439] border-b-[3px]'
                        )}
                    >
                        {item.name}
                    </div>
                    <div className="p-4 h-full flex flex-col gap-4">
                        <div className="px-4 grow pb-4 pt-3 text-sm space-y-2">
                            {item.points
                                .split('\n')
                                .filter(Boolean)
                                .map((point, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <CheckCircle2Icon className="size-4 shrink-0 text-secondary" />
                                        <div>{point}</div>
                                    </div>
                                ))}
                        </div>
                        <div className="p-6 border bg-[#CE6439] rounded-md">
                            <Label className="text-xs text-white">Cocok untuk:</Label>
                            <div className="font-semibold leading-6 text-white mt-1">
                                {item.description}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap mt-8">
            {renderContent()}
        </div>
    );
};

export default PackageCards;
