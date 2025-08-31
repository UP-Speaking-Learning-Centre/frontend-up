import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import React from 'react';

const TabContent = ({ title, items, id }: { title: string; items: string[]; id: string }) => {
    return (
        <TabsContent value={id}>
            <Card className="p-6 !border-none !outline-none shadow-[0px_1px_4px_2px_rgba(0,_0,_0,_0.1)]">
                <CardTitle className="sr-only">{title}</CardTitle>
                <CardContent className="p-0">
                    <p className="text-lg font-semibold">{title}</p>
                    <div className="flex flex-col gap-2 mt-4">
                        {items.map((item, index) => (
                            <p key={index} className="flex items-center gap-2">
                                <Check className="text-[#CE6439]" />
                                {item}
                            </p>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};

export default TabContent;
