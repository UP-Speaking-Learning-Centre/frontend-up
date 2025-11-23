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
                'flex flex-col items-center md:basis-2/5 xl:basis-1/5 cursor-pointer text-center transition-all duration-300 gap-2 group',
                'hover:border-primary'
            )}
        >
            <div
                className={cn(
                    'p-3 border-2 h-full flex flex-col items-start justify-between gap-4 rounded-lg w-full bg-secondary text-white group-hover:border-primary',
                    {
                        'border-primary bg-primary/10': isSelected,
                        'border-[#E2E8F0]': !isSelected,
                    }
                )}
            >
                <p
                    className={cn('text-lg font-semibold text-left', {
                        'text-secondary': isSelected,
                    })}
                >
                    {locationName}
                </p>
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
            </div>
        </div>
    );
};

export default LocationComponent;
