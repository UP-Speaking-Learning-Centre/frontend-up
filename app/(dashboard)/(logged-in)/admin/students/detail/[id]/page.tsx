'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { REGISTRATION_TYPE } from '@/constants/student';
import StudentSelfScheduleAlert from '@/features/admin/components/student-self-schedule-alert';
import useChangeStudyGroup from '@/features/admin/hooks/useChangeStudyGroup';
import useEditNote from '@/features/admin/hooks/useEditNote';
import useStudentDetail from '@/features/admin/hooks/useStudentDetail';
import useGetLocation from '@/features/admin/queries/useGetLocation';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DialogShowContacted from '@/features/dashboard/components/dialog-show-contacted';
import { AlertCircleIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StudentNotesCard from '@/features/admin/components/students/student-notes-card';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/features/detail-students/components/section-card';
import { FieldDisplay } from '@/features/detail-students/components/field-display';
import { useUpdateStudentMutation } from '@/features/detail-students/queries/use-update-student';
import { useEditConfirmation } from '@/features/admin/hooks/useEditConfirmation';
import { StudentEditConfirmationDialog } from '@/features/admin/components/students/student-edit-confirmation-dialog';
import { NonUserDetail, ResponseUserDetail } from '@/features/auth/constants/interface';
import moment from 'moment';

import { useStudentDetailStore } from '@/features/detail-students/stores';
import { ActiveStudentView } from '@/features/detail-students/components/active-student';
import { NonUserStudentView } from '@/features/detail-students/components/non-user-student';
import { LapsedStudentView } from '@/features/detail-students/components/lapsed-student';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [trialClass, setTrialClass] = useState('');
    const dummyTypeParam = searchParams.get('dummy') || 'active';
    const [mockStatus] = useState<'active' | 'non_user' | 'lapsed'>(
        (dummyTypeParam as 'active' | 'non_user' | 'lapsed') || 'active'
    );

    const {
        data: realData,
        locationId,
        isLoading,
        isLoadingStudyGroupDetail,
        studyGroupDetail,
    } = useStudentDetail(mockStatus);

    const { setData, addOverride, getMergedData } = useStudentDetailStore();

    useEffect(() => {
        if (realData) {
            setData(realData as ResponseUserDetail);
        }
    }, [realData, setData]);

    const data = getMergedData();

    const { isEdit, setIsEdit, notes, setNotes, handleSave } = useEditNote(data?.notes || null);
    const studyGroupProps = useChangeStudyGroup(+locationId, data?.primaryStudyGroupId || 0, data as any);
    const { data: location, isLoading: isLoadingLocation } = useGetLocation();
    
    // Merge extra props needed by ActiveStudentView for the StudentStudyGroupCard
    const studyGroupCardProps = {
        ...studyGroupProps,
        isLoadingLocation,
        location,
        locationId,
        trialClass,
        setTrialClass,
        studyGroupDetail
    };

    const [showDialodContacted, setShowDialodContacted] = useState(false);
    const editConfirmation = useEditConfirmation<Record<string, any>>();

    const updateStudentMutation = useUpdateStudentMutation(data?.id as number, {
        onSuccess: (_, variables) => {
            // Apply optimistic overrides
            Object.keys(variables).forEach(key => addOverride(key, variables[key]));
        },
    });

    const handleFormSavePrompt = (
        oldData: Record<string, any>,
        newData: Record<string, any>,
        onSuccess: () => void,
        onCancel: () => void
    ) => {
        editConfirmation.openConfirmation(
            oldData,
            newData,
            () => {
                updateStudentMutation.mutate(newData, {
                    onSuccess: () => {
                        editConfirmation.closeConfirmation();
                        onSuccess();
                    },
                    onError: () => {
                        editConfirmation.closeConfirmation();
                    },
                });
            },
            onCancel
        );
    };

    if (isLoading || !data) return null;

    return (
        <DashboardContentLayout pageTitle="Detail Student">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href={searchParams.get('from') === 'new' ? ROUTES.adminNewStudents : ROUTES.adminStudents}
                    className="flex items-center w-fit gap-3 hover:underline"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                    <span className="text-[#020817]">Kembali</span>
                </Link>

                {!data.isContacted && (
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowDialodContacted(true)}
                    >
                        <AlertCircleIcon className="size-4 text-primary" />
                        <span className="text-sm text-primary">Student belum pernah dihubungi</span>
                    </div>
                )}
                {showDialodContacted && (
                    <DialogShowContacted
                        id={data.id || 0}
                        open={showDialodContacted}
                        onOpenChange={setShowDialodContacted}
                    />
                )}
            </div>

            <div className="min-h-screen bg-gray-50 pb-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 space-y-6">
                        {/* TOP LEVEL ACTIONS */}
                        {data.status === 'active' && (
                            <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between mb-4 border border-gray-200">
                                <span className="text-gray-600">Aksi Cepat:</span>
                                <Button variant="destructive" size="sm">
                                    Ubah Menjadi Lapsed User
                                </Button>
                            </div>
                        )}
                        {data.status === 'non_user' &&
                            moment((data as NonUserDetail).marketing?.lastUpdate).diff(moment(), 'days') > 5 && (
                                <div className="flex flex-col gap-4 mb-4">
                                    <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded">
                                        Warning: Student belum dihubungi dalam waktu 5 hari atau
                                        Placement Test belum dinilai!
                                    </div>
                                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Follow Up Next Steps:</span>
                                        <Button className="w-fit" size="sm">
                                            Assign Ke Program & Study Group (Tandai Active)
                                        </Button>
                                    </div>
                                </div>
                            )}
                        {data.status === 'lapsed' && (
                            <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between mb-4 border border-gray-200">
                                <span className="text-gray-600">Aksi Cepat:</span>
                                <Button size="sm">Buat Menjadi Aktif Kembali</Button>
                            </div>
                        )}

                        {/* STATUS VIEWS */}
                        {data.status === 'active' && <ActiveStudentView handleFormSavePrompt={handleFormSavePrompt} studyGroupProps={studyGroupCardProps} />}
                        {data.status === 'non_user' && <NonUserStudentView handleFormSavePrompt={handleFormSavePrompt} />}
                        {data.status === 'lapsed' && <LapsedStudentView />}
                    </div>

                    <div className="md:col-span-4 space-y-6">
                        <SectionCard title="Student Detail">
                            <div className="col-span-1 md:col-span-2 space-y-4">
                                <FieldDisplay label="Nama" value={data.name} />
                                <FieldDisplay label="No. HP" value={data.phoneNumber} />
                                <FieldDisplay label="Instagram" value={data.instagram} />
                            </div>
                        </SectionCard>

                        <StudentNotesCard
                            notes={notes}
                            notesList={data.notesList}
                            setNotes={setNotes}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            handleSave={handleSave}
                        />
                    </div>
                </div>
            </div>

            <StudentEditConfirmationDialog
                isOpen={editConfirmation.isOpen}
                setIsOpen={editConfirmation.setIsOpen}
                oldData={editConfirmation.oldData}
                newData={editConfirmation.newData}
                onConfirm={editConfirmation.handleConfirm}
                onCancel={editConfirmation.handleCancel}
                isLoading={updateStudentMutation.isPending}
            />
        </DashboardContentLayout>
    );
}
