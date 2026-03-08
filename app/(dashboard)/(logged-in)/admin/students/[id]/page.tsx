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
import { getRegistrationType } from '@/utils/student.helper';
import { AlertCircleIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import StudentDetailCard from '@/features/admin/components/students/student-detail-card';
import StudentNotesCard from '@/features/admin/components/students/student-notes-card';
import StudentStudyGroupCard from '@/features/admin/components/students/student-study-group-card';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [trialClass, setTrialClass] = useState('');

    const { data, locationId, isLoading, isLoadingStudyGroupDetail, studyGroupDetail } =
        useStudentDetail();
    const { isEdit, setIsEdit, notes, setNotes, handleSave } = useEditNote(data?.notes);
    const {
        isOpen,
        setIsOpen,
        isLoading: isLoadingChangeStudy,
        selectedStudyGroup,
        setSelectedStudyGroup,
        handleChangeStudyGroup,
        filteredStudyGroup,
        trialClassDates,
        isFull,
    } = useChangeStudyGroup(+locationId, data?.primaryStudyGroupId || 0, data);
    const { data: location, isLoading: isLoadingLocation } = useGetLocation();

    const [showDialodContacted, setShowDialodContacted] = useState(false);

    return (
        <DashboardContentLayout pageTitle="Detail Student">
            {!isLoading && !data ? (
                <>
                    <Link
                        href={
                            searchParams.get('from') === 'new'
                                ? ROUTES.adminNewStudents
                                : ROUTES.adminStudents
                        }
                        className="flex items-center w-fit gap-3 hover:underline"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                        <span className="text-[#020817]">Kembali</span>
                    </Link>

                    <div className="mt-10 mx-auto text-center">Data student tidak tersedia</div>
                </>
            ) : (
                <>
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            href={
                                searchParams.get('from') === 'new'
                                    ? ROUTES.adminNewStudents
                                    : ROUTES.adminStudents
                            }
                            className="flex items-center w-fit gap-3 hover:underline"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                            <span className="text-[#020817]">Kembali</span>
                        </Link>

                        {!data?.isContacted && (
                            <>
                                <Skeleton loading={isLoading} className="h-4 w-24">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setShowDialodContacted(true)}
                                    >
                                        <AlertCircleIcon className="size-4 text-primary" />
                                        <span className="text-sm text-primary">
                                            Student belum pernah dihubungi
                                        </span>
                                    </div>
                                </Skeleton>

                                {showDialodContacted && (
                                    <DialogShowContacted
                                        id={data?.id || 0}
                                        open={showDialodContacted}
                                        onOpenChange={setShowDialodContacted}
                                    />
                                )}
                            </>
                        )}
                    </div>
                    <div className="min-h-screen bg-gray-50">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Detail Student Section */}
                            <div className="lg:col-span-2 space-y-6">
                                <Skeleton className="h-72" loading={isLoading}>
                                    <StudentDetailCard data={data} />
                                </Skeleton>

                                {/* Catatan Section */}
                                <Skeleton className="h-28" loading={isLoading}>
                                    <StudentNotesCard
                                        notes={notes}
                                        setNotes={setNotes}
                                        isEdit={isEdit}
                                        setIsEdit={setIsEdit}
                                        handleSave={handleSave}
                                    />
                                </Skeleton>
                            </div>

                            {/* Kelompok Belajar Section */}
                            <Skeleton
                                loading={isLoadingStudyGroupDetail || isLoading}
                                className="h-40"
                            >
                                <div className="space-y-6">
                                    <StudentStudyGroupCard
                                        data={data}
                                        studyGroupDetail={studyGroupDetail}
                                        isLoadingLocation={isLoadingLocation}
                                        location={location}
                                        locationId={locationId}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        filteredStudyGroup={filteredStudyGroup}
                                        selectedStudyGroup={selectedStudyGroup}
                                        setSelectedStudyGroup={setSelectedStudyGroup}
                                        isFull={isFull}
                                        trialClassDates={trialClassDates}
                                        trialClass={trialClass}
                                        setTrialClass={setTrialClass}
                                        handleChangeStudyGroup={handleChangeStudyGroup}
                                        isLoadingChangeStudy={isLoadingChangeStudy}
                                    />

                                    {getRegistrationType(data) ===
                                        REGISTRATION_TYPE.selfSchedule && (
                                        <StudentSelfScheduleAlert
                                            selfSchedule={data?.self_schedule_payload?.items || []}
                                            setIsOpen={setIsOpen}
                                        />
                                    )}
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </>
            )}
        </DashboardContentLayout>
    );
}
