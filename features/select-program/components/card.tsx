import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Card = ({
    title,
    description,
    imageUrl,
    className,
    buttonLabel,
    buttonAction,
    selected,
}: {
    title: string;
    description: string;
    imageUrl: string;
    buttonLabel: string;
    buttonAction: () => void;
    className?: string;
    selected: boolean;
}) => {
    return (
        <div
            className={cn(
                'flex flex-col w-full overflow-hidden rounded-lg border border-[#E2E8F0] shadow-md hover:shadow-xl hover:border-[#CE6439]',
                selected && 'outline-2 outline outline-[#CE6439]',
                className
            )}
        >
            <div className="relative h-48">
                <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={title}
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
                    <p className="mt-2 text-sm text-[#4B5563]">{description}</p>
                </div>
                <div className="mt-6 flex items-center justify-end">
                    <Button
                        className={cn(
                            'cursor-pointer',
                            selected
                                ? 'bg-[#CE6439] hover:bg-[#CE6439]/90'
                                : 'bg-[#F3F4F6] text-[#111827] hover:bg-[#F3F4F6]/90'
                        )}
                        onClick={buttonAction}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
