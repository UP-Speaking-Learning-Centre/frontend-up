import { cn } from '@/lib/utils';

function Skeleton({
    className,
    children,
    loading,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { loading?: boolean }) {
    if (children) {
        if (loading) {
            return (
                <div
                    className={cn('animate-pulse rounded-md bg-neutral-300', className)}
                    {...props}
                ></div>
            );
        }
        return children;
    }

    return <div className={cn('animate-pulse rounded-md bg-neutral-300', className)} {...props} />;
}

export { Skeleton };
