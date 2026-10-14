import React from 'react';
import * as z from 'zod';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { FunnelStage, LeadStatus, SourceLead, Grades } from '@/features/non-user/types';
import { EditableFormSection } from '@/features/detail-students/components/editable-form-section';
import { FormFieldDisplay } from '@/features/detail-students/components/form-field-display';
import { MarketingPicFields } from '@/features/detail-students/components/marketing-pic-fields';
import { FieldDisplay } from '@/features/detail-students/components/field-display';
import { SectionCard } from '@/features/detail-students/components/section-card';
import { useStudentDetailStore, useValidationStore } from '@/features/detail-students/stores';
import { NonUserDetail, ResponseUserDetail } from '@/features/auth/constants/interface';
import {
    useDeterminePIC,
    useColdLeadChecker,
    useStageValidation,
} from '@/features/detail-students/hooks';
import { toast } from 'sonner';
import useAuthStore from '@/features/auth/stores/authStore';

interface NonUserStudentViewProps {
    handleFormSavePrompt: (
        oldData: Record<string, unknown>,
        newData: Record<string, unknown>,
        onSuccess: () => void,
        onCancel: () => void
    ) => void;
}

export const NonUserStudentView: React.FC<NonUserStudentViewProps> = ({ handleFormSavePrompt }) => {
    const data = useStudentDetailStore(state => state.getMergedData()) as NonUserDetail &
        ResponseUserDetail;

    const { validateStageTransition } = useStageValidation();
    const { determinePICRole } = useDeterminePIC();
    const role = useAuthStore(state => state.role); // Get current logged-in role

    if (!data) return null;

    const isCold = useColdLeadChecker(
        data.marketing?.funnelStage,
        data.marketing?.statusLead,
        data.marketing?.lastUpdate
    );

    const checkEditAccess = () => {
        // If no PIC role is set, let admin edit. Otherwise, match role (or superadmin).
        if (!data.marketing?.picRole) return true;
        if (role === 'Super Admin' || role === 'Lead Admin') return true;
        return data.marketing.picRole === role;
    };

    const hasEditAccess = checkEditAccess();

    const handleSaveWithValidation = (
        oldData: Record<string, unknown>,
        newData: Record<string, unknown>,
        onSuccess: () => void,
        onCancel: () => void
    ) => {
        if (!hasEditAccess) {
            toast.error('Anda tidak memiliki akses untuk mengubah data ini.');
            onCancel();
            return;
        }

        // Auto PIC Handling when Grades or Stage changes
        const newMarketing = newData.marketing as Record<string, unknown> | undefined;
        const newRecommendation = newData.recommendation as Record<string, unknown> | undefined;
        const newFunnelStage = newMarketing?.funnelStage || data.marketing?.funnelStage;
        const newGradeLabel = newRecommendation?.grade || data.recommendation?.grade;

        const isFunnelChanged = newMarketing && 'funnelStage' in newMarketing && newMarketing.funnelStage !== data.marketing?.funnelStage;
        const isGradeChanged = newRecommendation && 'grade' in newRecommendation && newRecommendation.grade !== data.recommendation?.grade;

        if (newFunnelStage && (isFunnelChanged || isGradeChanged)) {
            // Find grade ID from label
            const newRole = determinePICRole(
                newFunnelStage as FunnelStage,
                newGradeLabel as Grades
            );
            if (!newData.marketing) newData.marketing = {};
            const mutableNewMarketing = newData.marketing as Record<string, unknown>;

            if (data.marketing?.picRole !== newRole) {
                mutableNewMarketing.picRole = newRole;
                mutableNewMarketing.picStaff = ''; // Reset user
                mutableNewMarketing.adminPicId = undefined; // Reset ID
                toast.info(`PIC dialihkan secara otomatis ke ${newRole}`);
            }
        }

        // Merge data deeply for validation
        const mergedData = { ...data };
        if (newData.marketing) mergedData.marketing = { ...(mergedData.marketing || {}), ...newData.marketing };
        if (newData.recommendation) mergedData.recommendation = { ...(mergedData.recommendation || {}), ...newData.recommendation };
        if (newData.trialClass) mergedData.trialClass = { ...(mergedData.trialClass || {}), ...newData.trialClass };

        // Validate
        if (isFunnelChanged) {
            const error = validateStageTransition(
                mergedData as ResponseUserDetail,
                newMarketing.funnelStage as FunnelStage
            );
            if (error) {
                toast.error(error);
                onCancel();
                return;
            }
        }

        handleFormSavePrompt(oldData, newData, onSuccess, onCancel);
    };

    return (
        <>
            {isCold && (
                <div className="flex flex-col gap-4 mb-4">
                    <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded">
                        Warning: Student belum dihubungi dalam waktu 7 hari (Cold Lead).
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Follow Up Next Steps:</span>
                        <Button
                            className="w-fit"
                            size="sm"
                            onClick={() => {
                                // Update lastUpdate
                                const newData = {
                                    marketing: {
                                        lastUpdate: new Date().toISOString(),
                                        statusLead: LeadStatus.Warm,
                                    },
                                };
                                handleSaveWithValidation(
                                    data as unknown as Record<string, unknown>,
                                    newData,
                                    () => {},
                                    () => {}
                                );
                            }}
                        >
                            Tandai Sudah Dihubungi (Reset SLA)
                        </Button>
                    </div>
                </div>
            )}

            <EditableFormSection
                title="Marketing Funnel Detail"
                schema={z.object({
                    marketing: z.object({
                        statusLead: z.string().optional(),
                        sourceLead: z.string().optional(),
                        funnelStage: z.string().optional(),
                        picRole: z.string().optional(),
                        picStaff: z.string().optional(),
                        adminPicId: z.number().optional(),
                        lastUpdate: z.string().optional(),
                        cancelReason: z.string().optional(),
                    }),
                })}
                defaultValues={{
                    marketing: {
                        statusLead: data.marketing?.statusLead || '',
                        sourceLead: data.marketing?.sourceLead || '',
                        funnelStage: data.marketing?.funnelStage || '',
                        picRole: data.marketing?.picRole || '',
                        picStaff: data.marketing?.picStaff || '',
                        adminPicId: data.marketing?.adminPicId || undefined,
                        lastUpdate: data.marketing?.lastUpdate || '',
                        cancelReason: data.marketing?.cancelReason || '',
                    },
                }}
                onSave={handleSaveWithValidation}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="marketing.statusLead"
                                label="Lead Status"
                                isEditing={isEditing && hasEditAccess}
                                highlight
                                type="select"
                                options={Object.values(LeadStatus).map(v => ({
                                    label: v,
                                    value: v,
                                }))}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="marketing.sourceLead"
                                label="Source Lead"
                                isEditing={isEditing && hasEditAccess}
                                highlight
                                type="select"
                                options={Object.values(SourceLead).map(v => ({
                                    label: v,
                                    value: v,
                                }))}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="marketing.funnelStage"
                                label="Funnel Stage"
                                isEditing={isEditing && hasEditAccess}
                                highlight
                                type="select"
                                options={Object.values(FunnelStage).map(v => ({
                                    label: v,
                                    value: v,
                                }))}
                            />
                            {form.watch('marketing.funnelStage') === FunnelStage.Cancel && (
                                <FormFieldDisplay
                                    form={form}
                                    name="marketing.cancelReason"
                                    label="Cancel Reason (Wajib jika Cancel)"
                                    isEditing={isEditing && hasEditAccess}
                                />
                            )}
                        </div>
                        <MarketingPicFields form={form} isEditing={isEditing && hasEditAccess} />
                    </>
                )}
            />

            <EditableFormSection
                title="Program & Paket yang ditawarkan"
                schema={z.object({
                    offer: z.object({
                        program: z.string().optional(),
                        package: z.string().optional(),
                        duration: z.string().optional(),
                        price: z.string().optional(),
                    }),
                })}
                defaultValues={{
                    offer: {
                        program: data.offer?.program || '',
                        package: data.offer?.package || '',
                        duration: data.offer?.duration?.toString() || '',
                        price: data.offer?.price || '',
                    },
                }}
                onSave={handleSaveWithValidation}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="offer.program"
                                label="Program"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'School Program', value: 'School Program' },
                                    { label: 'Intensive Program', value: 'Intensive Program' },
                                ]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="offer.package"
                                label="Paket"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Private', value: 'Private' },
                                    { label: 'Semi Private', value: 'Semi Private' },
                                ]}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="offer.duration"
                                label="Durasi"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: '1 Bulan', value: '1 Bulan' },
                                    { label: '3 Bulan', value: '3 Bulan' },
                                    { label: '6 Bulan', value: '6 Bulan' },
                                ]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="offer.price"
                                label="Harga yang ditawarkan"
                                isEditing={isEditing && hasEditAccess}
                            />
                        </div>
                    </>
                )}
            />

            <EditableFormSection
                title="Program Recommendation (Rekomendasi dari UP)"
                schema={z.object({
                    recommendation: z.object({
                        program: z.string().optional(),
                        group: z.string().optional(),
                        level: z.string().optional(),
                        grade: z.string().optional(),
                    }),
                })}
                defaultValues={{
                    recommendation: {
                        program: data.recommendation?.program || '',
                        group: data.recommendation?.group || '',
                        level: data.recommendation?.level || '',
                        grade: data.recommendation?.grade || '',
                    },
                }}
                onSave={handleSaveWithValidation}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="recommendation.program"
                                label="Program"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Program A', value: 'Program A' },
                                    { label: 'Program B', value: 'Program B' },
                                ]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="recommendation.group"
                                label="Group"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Group 1', value: 'Group 1' },
                                    { label: 'Group 2', value: 'Group 2' },
                                ]}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="recommendation.level"
                                label="Level"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Beginner', value: 'Beginner' },
                                    { label: 'Intermediate', value: 'Intermediate' },
                                ]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="recommendation.grade"
                                label="Grade"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={Object.values(Grades).map(v => ({ label: v, value: v }))}
                            />
                        </div>
                    </>
                )}
            />

            <EditableFormSection
                title="Trial Class Detail"
                schema={z.object({
                    trialClass: z.object({
                        studyGroupId: z.number().optional().nullable(),
                        studyGroupName: z.string().optional().nullable(),
                        schedule: z.string().optional().nullable(),
                    }),
                })}
                defaultValues={{
                    trialClass: {
                        studyGroupId: data.trialClass?.studyGroupId,
                        studyGroupName: data.trialClass?.studyGroupName || '',
                        schedule: data.trialClass?.schedule || '',
                    },
                }}
                onSave={handleSaveWithValidation}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="trialClass.studyGroupName"
                                label="Cabang & Nama Study Group (Simulasi Input)"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Kelas Coba A', value: 'Kelas Coba A' },
                                    { label: 'Kelas Coba B', value: 'Kelas Coba B' },
                                ]}
                            />
                            {/* In real app, changing studyGroupName should ideally set studyGroupId */}
                            <FormFieldDisplay
                                form={form}
                                name="trialClass.schedule"
                                label="Jadwal Trial Class"
                                isEditing={isEditing && hasEditAccess}
                                type="select"
                                options={[
                                    { label: 'Senin, 10:00', value: 'Senin, 10:00' },
                                    { label: 'Rabu, 14:00', value: 'Rabu, 14:00' },
                                ]}
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border border-gray-200 mt-4">
                                <FieldDisplay
                                    label="Status Trial"
                                    value={data.trialClass?.isDone ? 'Sudah Trial' : 'Belum Trial'}
                                />
                                {!data.trialClass?.isDone && hasEditAccess && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            handleSaveWithValidation(
                                                data as unknown as Record<string, unknown>,
                                                { trialClass: { isDone: true } },
                                                () => {},
                                                () => {}
                                            );
                                        }}
                                    >
                                        Tandai Sudah Trial
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            />

            <SectionCard title="Selection Detail">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <FieldDisplay label="Cabang" value={data.selection?.branch} />
                    <FieldDisplay label="Nama Study Group" value={data.selection?.studyGroup} />
                    <FieldDisplay label="Teacher" value={data.selection?.teacher} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.selection?.schedules?.map((s, i) => (
                            <FieldDisplay key={i} label={`Jadwal ${i + 1}`} value={s} />
                        ))}
                    </div>
                    {data.selection?.isSelfSchedule && (
                        <div className="p-2 mt-4 bg-orange-50 text-orange-800 border-l-4 border-orange-400 rounded text-xs">
                            Pemberitahuan: Ini adalah jadwal yang dipilih sendiri oleh user.
                        </div>
                    )}
                </div>
            </SectionCard>
        </>
    );
};
