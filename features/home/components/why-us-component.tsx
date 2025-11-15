import { useEffect, useState } from 'react';
import { Feature } from './why-us-section';
import { cn } from '@/lib/utils';

const WhyUsComponent = ({
    features,
    maxWidthOpen,
    initialActiveFeature,
}: {
    features: Feature[];
    maxWidthOpen: '7' | '8' | '9' | '10';
    initialActiveFeature: number;
}) => {
    const [open, setOpen] = useState(initialActiveFeature);
    const getWidth = () => {
        switch (maxWidthOpen) {
            case '7':
                return {
                    open: 'w-7/12',
                    close: 'w-5/12',
                };
            case '8':
                return {
                    open: 'w-8/12',
                    close: 'w-4/12',
                };
            case '9':
                return {
                    open: 'w-9/12',
                    close: 'w-3/12',
                };
            case '10':
                return {
                    open: 'w-10/12',
                    close: 'w-2/12',
                };
            default:
                return {
                    open: 'w-7/12',
                    close: 'w-5/12',
                };
        }
    };

    return (
        <div className="flex max-md:flex-col gap-4">
            {features.map((feature, index) => (
                <div
                    key={index}
                    onClick={() => setOpen(index)}
                    className={cn(
                        index === open ? getWidth().open : getWidth().close,
                        'max-md:w-full',
                        'rounded-md p-4 border-[3px] hover:bg-primary/10 border-secondary cursor-pointer transition-all duration-500 ease-in-out min-h-64'
                    )}
                >
                    <div
                        className={cn(
                            'flex shrink-0 h-12 w-12 items-center justify-center rounded-lg',
                            index === open ? 'bg-primary' : 'bg-secondary'
                        )}
                    >
                        <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <h3
                        className={cn(
                            'mt-4 font-semibold transition-all duration-500 ease-in-out',
                            index === open ? 'text-sm' : 'text-2xl'
                        )}
                    >
                        {feature.name}
                    </h3>
                    <p
                        className={cn(
                            'mt-2 text-lg font-semibold delay-500 transition-all duration-500 ease-in-out',
                            index === open ? 'opacity-100' : 'opacity-0'
                        )}
                        dangerouslySetInnerHTML={{ __html: feature.description }}
                    ></p>
                </div>
            ))}
        </div>
    );
};

export default WhyUsComponent;
