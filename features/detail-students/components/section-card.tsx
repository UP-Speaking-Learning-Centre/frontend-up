import { Card } from '@/components/ui/card';

export const SectionCard = ({
    title,
    children,
    headerAction,
}: {
    title: string;
    children: React.ReactNode;
    headerAction?: React.ReactNode;
}) => (
    <Card className="overflow-hidden mb-6">
        <div className="bg-secondary text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            {headerAction && <div>{headerAction}</div>}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </Card>
);
