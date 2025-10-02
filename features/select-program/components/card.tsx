import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Card = ({
    title,
    description,
    imageUrl,
    className,
    contentClassName,
    textClassName,
    buttonLabel,
    buttonAction,
    selected,
}: {
    title: string;
    description: string;
    imageUrl: string;
    contentClassName?: string;
    textClassName?: string;
    buttonLabel: string;
    buttonAction: () => void;
    className?: string;
    selected: boolean;
}) => {
    return (
        <div
            onClick={buttonAction}
            className={cn(
                'flex flex-col items-center gap-6 hover:gap-2 justify-start',
                'flex flex-col w-full cursor-pointer overflow-hidden hover:translate-y-[-5px] transition-all duration-300 group',
                className
            )}
        >
            <div
                className={cn(
                    'relative h-56 w-full group-hover:h-60 rounded-lg overflow-hidden group-hover:shadow-xl border-2 group-hover:border-[#CE6439] transition-all duration-300',
                    selected && 'border-[#CE6439] border-[3px] shadow-lg'
                )}
            >
                <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={title}
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>
            <div
                className={cn(
                    'flex flex-1 w-full flex-col justify-between rounded-lg bg-white p-4 group-hover:shadow-xl border-2 group-hover:border-[#CE6439]',
                    selected && 'border-[#CE6439] border-[3px] bg-primary/20',
                    contentClassName
                )}
            >
                <div className="flex-1">
                    <h3 className={cn('text-lg font-bold text-[#111827]', textClassName)}>
                        {title}
                    </h3>
                    <p className={cn('mt-2 text-sm text-[#4B5563]', textClassName)}>
                        {description}
                    </p>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    {/* <Button variant={selected ? 'default' : 'outline'} onClick={buttonAction}>
                        {buttonLabel}
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default Card;
