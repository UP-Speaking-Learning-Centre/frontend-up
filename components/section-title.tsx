import { cn } from '@/lib/utils';

const SectionTitle = ({
    title,
    subtitle,
    description,
    variant = 'black',
}: {
    title?: string;
    subtitle?: string;
    variant?: 'black' | 'white';
    description?: string;
}) => {
    return (
        <div className="mx-auto max-w-4xl text-center">
            {title && (
                <h2
                    className={cn(
                        'text-base font-semibold leading-7',
                        variant === 'black' ? 'text-primary' : 'text-white'
                    )}
                >
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={cn(
                        'mt-2 text-2xl font-bold tracking-tight font-rubik sm:text-3xl',
                        variant === 'black' ? 'text-gray-900' : 'text-white'
                    )}
                >
                    {subtitle}
                </p>
            )}
            {description && (
                <p
                    className={cn(
                        'mt-4 text-lg leading-8',
                        variant === 'black' ? 'text-gray-600' : 'text-white'
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
