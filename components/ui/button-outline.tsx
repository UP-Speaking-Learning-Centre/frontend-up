import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ButtonOutline({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
    return (
        <Button
            variant="outline"
            className={cn(
                'border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary',
                className
            )}
            {...props}
        />
    );
}
