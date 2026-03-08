import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StudentDetailCardProps {
    data: any; // We'll use any or appropriate type if available
}

export default function StudentDetailCard({ data }: StudentDetailCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="bg-secondary text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Detail Student</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Nama</p>
                        <p className="font-semibold text-gray-900">{data?.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">No. HP</p>
                        <p className="font-semibold text-gray-900">{data?.phoneNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Instagram</p>
                        <p
                            className={cn(
                                'font-semibold text-gray-900',
                                !data?.instagram && 'text-neutral-400 font-normal'
                            )}
                        >
                            {data?.instagram || 'Tidak ada informasi instagram'}
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Program</p>
                        <p className="font-semibold text-gray-900">{data?.program}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Group</p>
                        <p className="font-semibold text-gray-900">{data?.group}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Level</p>
                        <p
                            className={cn(
                                'font-semibold text-gray-900',
                                data?.level ? 'text-gray-900' : 'text-primary'
                            )}
                        >
                            {data?.level || 'Belum ditentukan'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Grade</p>
                        <p
                            className={cn(
                                'font-semibold text-gray-900',
                                data?.gradeLabel ? 'text-gray-900' : 'text-primary'
                            )}
                        >
                            {data?.gradeLabel || 'Belum ditentukan'}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
