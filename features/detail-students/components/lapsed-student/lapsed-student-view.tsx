import React from 'react';
import { FieldDisplay } from '@/features/detail-students/components/field-display';
import { SectionCard } from '@/features/detail-students/components/section-card';
import { useStudentDetailStore } from '@/features/detail-students/stores';

export const LapsedStudentView: React.FC = () => {
    const data = useStudentDetailStore(state => state.getMergedData());

    if (!data) return null;

    return (
        <>
            <SectionCard title="History Subscription">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <FieldDisplay label="Active From" value={data.history?.activeFrom} />
                    <FieldDisplay label="Active Until" value={data.history?.activeUntil} />
                    <FieldDisplay
                        label="Selected Period"
                        value={data.history?.selectedPeriod ? data.history?.selectedPeriod + ' Bulan' : undefined}
                    />
                </div>
            </SectionCard>
            <SectionCard title="Last Program">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <FieldDisplay label="Nama Program" value={data.lastProgram?.name} />
                    <div className="grid grid-cols-2 gap-4">
                        <FieldDisplay label="Group" value={data.lastProgram?.group} />
                        <FieldDisplay label="Level" value={data.lastProgram?.level} />
                    </div>
                    <FieldDisplay label="Grade" value={data.lastProgram?.grade} />
                </div>
            </SectionCard>
            <SectionCard title="Last Study Group">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <FieldDisplay label="Nama Study Group" value={data.lastStudyGroup?.name} />
                    <FieldDisplay label="Teacher" value={data.lastStudyGroup?.teacher} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.lastStudyGroup?.schedules?.map((s, i) => (
                            <FieldDisplay key={i} label={`Jadwal ${i + 1}`} value={s} />
                        ))}
                    </div>
                    <FieldDisplay label="Lokasi" value={data.lastStudyGroup?.location} />
                </div>
            </SectionCard>
        </>
    );
};
