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
            onClick={buttonAction}
            className={cn(
                'flex flex-col w-full cursor-pointer overflow-hidden rounded-lg border-2 border-[#E2E8F0] hover:translate-y-[-5px] transition-all shadow-md hover:shadow-xl hover:border-[#CE6439]',
                selected && 'border-[#CE6439] border-[3px]',
                className
            )}
        >
            <div className="relative h-32">
                <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={title}
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
                    <p className="mt-2 text-sm text-[#4B5563]">{description}</p>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Button variant={selected ? 'default' : 'outline'} onClick={buttonAction}>
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
