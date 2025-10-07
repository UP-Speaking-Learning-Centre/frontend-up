'use client';

import { CHOOSE_PACKAGE_STEP } from '@/constants/program-selections';
import React from 'react';
import { CHOOSE_STUDY_GROUP } from './study-group-selection';
import { LocationType } from '@/types/programs-selection';
import { cn } from '@/lib/utils';
import useProgramSelectionStore from '../../stores/program-selection-store';

const LocationComponent = ({
    location,
    onClick,
}: {
    location: LocationType;
    onClick: () => void;
}) => {
    const formValue = useProgramSelectionStore(s => s.formValue);
    const { locationName, locationId } = location;

    const isSelected = locationId === formValue.locationId;

    return (
        <div
            onClick={() => onClick()}
            className={cn(
                'flex flex-col items-center cursor-pointer text-center transition-all duration-300 gap-2 group',
                'hover:border-[#CE6439]'
            )}
        >
            <div
                className={cn(
                    'p-2 border-2 h-full flex items-center justify-center rounded-lg w-full bg-secondary text-white group-hover:border-[#CE6439]',
                    {
                        'border-[#CE6439] bg-primary/20': isSelected,
                        'border-[#E2E8F0]': !isSelected,
                    }
                )}
            >
                <p
                    className={cn('text-sm', {
                        'text-[#CE6439] font-semibold text-base': isSelected,
                    })}
                >
                    Cabang {locationName}
                </p>
            </div>
        </div>
    );
};

export default LocationComponent;
