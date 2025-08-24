'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useProgramSelection from '../../hooks/use-program-selection';
import { useState } from 'react';
import data from '@/data/dummy.json';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Book, BookOpen, Check, GraduationCap } from 'lucide-react';

const LevelInformationTabs = () => {
    const { formValue } = useProgramSelection();
    const materi = data.programs
        .find(item => item.category === formValue.programCategory)
        ?.groups.find(item => item.name === formValue.group)?.materi;

    const capaian = data.programs
        .find(item => item.category === formValue.programCategory)
        ?.groups.find(item => item.name === formValue.group)?.capaian;

    return (
        <Tabs defaultValue="materi" className="w-full mt-4">
            <TabsList className="w-full">
                <TabsTrigger className="w-full flex items-center gap-2" value="materi">
                    <BookOpen /> Materi
                </TabsTrigger>
                <TabsTrigger className="w-full flex items-center gap-2" value="capaian">
                    <GraduationCap /> Capaian
                </TabsTrigger>
            </TabsList>
            <TabsContent value="materi">
                <Card className="p-6 !border-none !outline-none shadow-[0px_1px_4px_2px_rgba(0,_0,_0,_0.1)]">
                    <CardTitle className="sr-only">Materi Pembelajaran</CardTitle>
                    <CardContent className="p-0">
                        <p className="text-lg font-semibold">Materi Pembelajaran</p>
                        <div className="flex flex-col gap-2 mt-4">
                            {materi?.map((item, index) => (
                                <p key={index} className="flex items-center gap-2">
                                    <Check className="text-[#CE6439]" />
                                    {item}
                                </p>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="capaian">
                <Card className="p-6 !border-none !outline-none shadow-[0px_1px_4px_2px_rgba(0,_0,_0,_0.1)]">
                    <CardTitle className="sr-only">Capaian Pembelajaran</CardTitle>
                    <CardContent className="p-0">
                        <p className="text-lg font-semibold">Capaian Pembelajaran</p>
                        <div className="flex flex-col gap-2 mt-4">
                            {capaian?.map((item, index) => (
                                <p key={index} className="flex items-center gap-2">
                                    <Check className="text-[#CE6439]" />
                                    {item}
                                </p>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default LevelInformationTabs;
