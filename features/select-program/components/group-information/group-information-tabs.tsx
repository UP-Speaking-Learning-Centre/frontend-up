'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useProgramSelection from '../../hooks/use-program-selection';
import { BookOpen, GraduationCap } from 'lucide-react';
import useFetchGroupsQuery from '../../queries/use-fetch-groups';
import TabContent from './tab-content';

const GroupInformationTabs = () => {
    const { formValue } = useProgramSelection();
    const { data: groups } = useFetchGroupsQuery();
    const materi = groups?.find(item => item.id === formValue.groupId)?.materi;
    const capaian = groups?.find(item => item.id === formValue.groupId)?.capaian;

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

            {[
                { title: 'Materi Pembelajaran', items: materi?.split('\n'), id: 'materi' },
                { title: 'Capaian Pembelajaran', items: capaian?.split('\n'), id: 'capaian' },
            ].map(item => (
                <TabContent
                    key={item.id}
                    title={item.title}
                    items={item.items || []}
                    id={item.id}
                />
            ))}
        </Tabs>
    );
};

export default GroupInformationTabs;
