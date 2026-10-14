import React from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { EditableFormSection } from '@/features/detail-students/components/editable-form-section';
import { FormFieldDisplay } from '@/features/detail-students/components/form-field-display';
import { Grades } from '@/features/non-user/types';
import StudentStudyGroupCard, { StudentStudyGroupCardProps } from '@/features/admin/components/students/student-study-group-card';
import StudentSelfScheduleAlert from '@/features/admin/components/student-self-schedule-alert';
import { REGISTRATION_TYPE } from '@/constants/student';
import { getRegistrationType } from '@/utils/student.helper';
import { useStudentDetailStore } from '@/features/detail-students/stores';
import { ActiveUserDetail, ResponseUserDetail } from '@/features/auth/constants/interface';

interface ActiveStudentViewProps {
    handleFormSavePrompt: (oldData: Record<string, unknown>, newData: Record<string, unknown>, onSuccess: () => void, onCancel: () => void) => void;
    studyGroupProps: Omit<StudentStudyGroupCardProps, 'data'>; // Passed from parent to avoid prop drilling in components
}

export const ActiveStudentView: React.FC<ActiveStudentViewProps> = ({ handleFormSavePrompt, studyGroupProps }) => {
    const data = useStudentDetailStore(state => state.getMergedData());

    if (!data) return null;

    return (
        <>
            <EditableFormSection
                title="Program Detail"
                schema={z.object({
                    program: z.string().min(1, 'Harus diisi'),
                    group: z.string().min(1, 'Harus diisi'),
                    level: z.string().min(1, 'Harus diisi'),
                    gradeLabel: z.string().min(1, 'Harus diisi'),
                })}
                defaultValues={{
                    program: data.program || '',
                    group: data.group || '',
                    level: data.level || '',
                    gradeLabel: data.gradeLabel || '',
                }}
                onSave={handleFormSavePrompt}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="program"
                                label="Program"
                                isEditing={isEditing}
                                type="select"
                                options={[{ label: 'Program A', value: 'Program A' }, { label: 'Program B', value: 'Program B' }]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="group"
                                label="Group"
                                isEditing={isEditing}
                                type="select"
                                options={[{ label: 'Group 1', value: 'Group 1' }, { label: 'Group 2', value: 'Group 2' }]}
                            />
                        </div>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="level"
                                label="Level"
                                isEditing={isEditing}
                                type="select"
                                options={[{ label: 'Beginner', value: 'Beginner' }, { label: 'Intermediate', value: 'Intermediate' }]}
                            />
                            <FormFieldDisplay
                                form={form}
                                name="gradeLabel"
                                label="Grade"
                                isEditing={isEditing}
                                type="select"
                                options={Object.values(Grades).map(v => ({ label: v, value: v }))}
                            />
                        </div>
                    </>
                )}
            />

            <StudentStudyGroupCard
                data={data}
                {...studyGroupProps}
            />

            {getRegistrationType(data) === REGISTRATION_TYPE.selfSchedule && (
                <div className="mt-6">
                    <StudentSelfScheduleAlert
                        selfSchedule={data?.self_schedule_payload?.items || []}
                        setIsOpen={studyGroupProps.setIsOpen}
                    />
                </div>
            )}

            <EditableFormSection
                title="Subscription Detail"
                schema={z.object({
                    subscription: z.object({
                        activeFrom: z.string().min(1, 'Field ini harus diisi'),
                        activeUntil: z.string().min(1, 'Field ini harus diisi'),
                        selectedPeriod: z.string(),
                    }),
                })}
                defaultValues={{
                    subscription: {
                        activeFrom: data.activePeriod?.activeFrom || '',
                        activeUntil: data.activePeriod?.activeUntil || '',
                        selectedPeriod: String(data.activePeriod?.selectedPeriod || ''),
                    },
                }}
                onSave={handleFormSavePrompt}
                renderFields={(form, isEditing) => (
                    <>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="subscription.activeFrom"
                                label="Active From"
                                isEditing={isEditing}
                                type="datetime-picker"
                            />
                            <FormFieldDisplay
                                form={form}
                                name="subscription.activeUntil"
                                label="Active Until"
                                isEditing={isEditing}
                                type="datetime-picker"
                            />
                        </div>
                        <div className="space-y-4">
                            <FormFieldDisplay
                                form={form}
                                name="subscription.selectedPeriod"
                                label="Selected Period"
                                isEditing={isEditing}
                                suffix=" Bulan"
                                type="select"
                                options={[{ label: '3 Bulan', value: '3' }, { label: '6 Bulan', value: '6' }, { label: '12 Bulan', value: '12' }]}
                            />
                        </div>
                    </>
                )}
            />
        </>
    );
};
