'use client';

import { CHOOSE_PACKAGE_STEP } from '@/constants/program-selections';
import React from 'react';
import { CHOOSE_STUDY_GROUP } from './study-group-selection';
import { LocationType } from '@/types/programs-selection';
import { cn } from '@/lib/utils';
import useProgramSelectionStore from '../../stores/program-selection-store';
import ImageWithFallback from '@/components/ui/image-with-fallback';

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
                'flex flex-col items-center basis-1/3 cursor-pointer text-center transition-all duration-300 gap-2 group',
                'hover:border-[#CE6439]'
            )}
        >
            <div
                className={cn(
                    'p-3 border-2 h-full flex flex-col items-center justify-center rounded-lg w-full bg-secondary text-white group-hover:border-[#CE6439]',
                    {
                        'border-[#CE6439] bg-primary/10': isSelected,
                        'border-[#E2E8F0]': !isSelected,
                    }
                )}
            >
                <div
                    className={cn(
                        'relative w-full border-primary border-2 rounded-md overflow-hidden aspect-[320/240]'
                    )}
                >
                    <ImageWithFallback
                        src={location.locationPhoto}
                        fallbackSrc="/location.svg"
                        fill
                        alt={location.locationName}
                    />
                </div>
                <p
                    className={cn('text-sm mt-4 mb-4', {
                        'text-secondary font-semibold text-base': isSelected,
                    })}
                >
                    {locationName}
                </p>
            </div>
        </div>
    );
};

export default LocationComponent;
