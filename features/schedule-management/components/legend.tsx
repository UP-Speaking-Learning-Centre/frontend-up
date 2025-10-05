import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import React from 'react';

const Legend = () => {
    return (
        <Card className="p-4 w-fit">
            <div className="flex flex-wrap gap-6 w-fit text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded bg-blue-100 border border-blue-500"></div>
                    <span>Semi Private</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded bg-green-100 border border-green-500"></div>
                    <span>Private</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded bg-red-100 border border-red-500"></div>
                    <span>Exclusive</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded bg-yellow-100 border border-yellow-500 flex items-center justify-center text-yellow-600">
                        <Star className="w-3 h-3" />
                    </div>
                    <span>Prioritas</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded bg-gray-50 border border-gray-500"></div>
                    <span>Tersedia</span>
                </div>
            </div>
        </Card>
    );
};

export default Legend;
