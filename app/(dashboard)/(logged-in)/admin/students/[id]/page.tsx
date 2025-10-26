'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { inter } from '@/constants/fonts';
import { ROUTES } from '@/constants/routes';
import AdminSelect from '@/features/admin/components/admin-select';
import StudentSelfScheduleAlert from '@/features/admin/components/student-self-schedule-alert';
import { useUpdateContactedStatusMutation } from '@/features/admin/hooks/use-update-contacted-status';
import useChangeStudyGroup from '@/features/admin/hooks/useChangeStudyGroup';
import useEditNote from '@/features/admin/hooks/useEditNote';
import useStudentDetail from '@/features/admin/hooks/useStudentDetail';
import useGetLocation from '@/features/admin/queries/useGetLocation';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';
import DialogShowContacted from '@/features/dashboard/components/dialog-show-contacted';
import { getDayOfWeek } from '@/lib/date';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, ArrowLeft, Calendar, Clock, Info, InfoIcon } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
    const routes = useRouter();
    const searchParams = useSearchParams();
    const [trialClass, setTrialClass] = useState('');

    const {
        data,
        locationId,
        isLoading,
        isLoadingStudyGroupDetail,
        studyGroupDetail,
        // setLocationId,
    } = useStudentDetail();
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
                            <Card className="overflow-hidden">
                                <div className="bg-secondary text-white p-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Detail Student</h2>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Nama</p>
                                            <p className="font-semibold text-gray-900">
                                                {data?.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">No. HP</p>
                                            <p className="font-semibold text-gray-900">
                                                {data?.phoneNumber}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Instagram</p>
                                            <p
                                                className={cn(
                                                    'font-semibold text-gray-900',
                                                    !data?.instagram &&
                                                        'text-neutral-400 font-normal'
                                                )}
                                            >
                                                {data?.instagram || 'Tidak ada informasi instagram'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Program</p>
                                            <p className="font-semibold text-gray-900">
                                                {data?.program}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Group</p>
                                            <p className="font-semibold text-gray-900">
                                                {data?.group}
                                            </p>
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
                                                    data?.gradeLabel
                                                        ? 'text-gray-900'
                                                        : 'text-primary'
                                                )}
                                            >
                                                {data?.gradeLabel || 'Belum ditentukan'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Skeleton>

                        {/* Catatan Section */}
                        <Skeleton className="h-28" loading={isLoading}>
                            <Card className="overflow-hidden">
                                <div className="bg-secondary text-white p-4">
                                    <h2 className="text-lg font-semibold">Catatan</h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid items-start">
                                        {!isEdit ? (
                                            <>
                                                <p className="text-gray-900 font-medium mb-4">
                                                    {notes}
                                                </p>
                                                <Button
                                                    onClick={() => setIsEdit(true)}
                                                    className="px-6 w-fit ml-auto"
                                                    size="sm"
                                                >
                                                    {notes ? 'Edit Catatan' : 'Tambah Catatan'}
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Textarea
                                                    className="mb-4"
                                                    value={notes}
                                                    onChange={e => setNotes(e.target.value)}
                                                />
                                                <div className="space-x-3 ml-auto">
                                                    <Button
                                                        onClick={() => setIsEdit(false)}
                                                        className="px-6 w-fit"
                                                        size="sm"
                                                        variant={'outline'}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={handleSave}
                                                        className="px-6 w-fit"
                                                        size="sm"
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Skeleton>
                    </div>

                    {/* Kelompok Belajar Section */}
                    <Skeleton loading={isLoadingStudyGroupDetail || isLoading} className="h-40">
                        <div className="space-y-6">
                            <Card className="overflow-hidden">
                                <div className="bg-secondary text-white p-4">
                                    <h2 className="text-lg font-semibold">Kelompok Belajar</h2>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Cabang</p>
                                        <p
                                            className={cn(
                                                'font-semibold text-gray-900',
                                                studyGroupDetail?.schedules[0]?.location
                                                    ? 'text-gray-900'
                                                    : 'text-primary'
                                            )}
                                        >
                                            {studyGroupDetail?.schedules[0]?.location ||
                                                'Belum ditentukan'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Nama Kelompok</p>
                                        <p
                                            className={cn(
                                                'font-semibold text-gray-900',
                                                studyGroupDetail?.name
                                                    ? 'text-gray-900'
                                                    : 'text-primary'
                                            )}
                                        >
                                            {studyGroupDetail?.name || 'Belum ditentukan'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Teacher</p>
                                        <p
                                            className={cn(
                                                'font-semibold text-gray-900',
                                                studyGroupDetail?.schedules[0].teacherMemberName
                                                    ? 'text-gray-900'
                                                    : 'text-primary'
                                            )}
                                        >
                                            {studyGroupDetail?.schedules[0].teacherMemberName ||
                                                'Belum ditentukan'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Jadwal Trial Class{' '}
                                            {!!studyGroupDetail?.schedules.length &&
                                                '(Pilihan Sendiri)'}
                                        </p>
                                        <p
                                            className={cn(
                                                'font-semibold text-gray-900',
                                                data?.trialClassAt
                                                    ? 'text-gray-900'
                                                    : 'text-primary'
                                            )}
                                        >
                                            {data?.trialClassAt
                                                ? moment(data.trialClassAt).format(
                                                      'dddd, DD MMMM YYYY, HH:mm '
                                                  )
                                                : 'Belum ditentukan'}
                                        </p>
                                    </div>
                                </div>
                                {studyGroupDetail?.schedules.map((schedule, index) => (
                                    <div key={schedule.id} className="px-6 py-4 border-t">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Jadwal Kelas {index + 1}
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">
                                                        Hari
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {getDayOfWeek(schedule.dayOfWeek.slice(0, 3))}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">
                                                        Waktu
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {schedule.startTime.substring(0, 5)} -{' '}
                                                    {schedule.endTime.substring(0, 5)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="m-4">
                                    {!data?.levelId && !data?.self_schedule_payload && (
                                        <>
                                            <p className="text-xs py-2 mt-5">
                                                <Info className="w-4 h-4 inline mr-1" />
                                                Anda belum melakukan penilaian placement test untuk
                                                murid ini
                                            </p>
                                            <Button
                                                disabled={!data?.latestResult?.placementTestId}
                                                onClick={() =>
                                                    routes.replace(
                                                        ROUTES.adminPlacementTestsId.expand({
                                                            id:
                                                                data?.latestResult
                                                                    ?.placementTestId || 0,
                                                        })
                                                    )
                                                }
                                                className="w-full"
                                                size={'lg'}
                                            >
                                                Nilai Placement Test
                                            </Button>
                                        </>
                                    )}
                                    {!!data?.schedules.length && (
                                        <Button
                                            disabled={!data?.levelId}
                                            onClick={() => setIsOpen(true)}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {!!studyGroupDetail?.schedules
                                                ? 'Ganti Kelompok'
                                                : 'Assign ke Kelompok'}
                                        </Button>
                                    )}

                                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                        <DialogContent className={cn(inter.className)}>
                                            <DialogTitle>Ganti Kelompok</DialogTitle>
                                            {/* {!data?.primaryStudyGroupId && (
                                                <AdminSelect
                                                    label="Lokasi"
                                                    options={
                                                        location?.map(loc => ({
                                                            id: loc.id,
                                                            name: loc.name,
                                                        })) || []
                                                    }
                                                    value={locationId}
                                                    onValueChange={setLocationId}
                                                    loading={isLoadingLocation}
                                                />
                                            )} */}
                                            <div>
                                                <Label className="font-medium">Lokasi</Label>
                                                <Skeleton
                                                    className="h-10 my-1"
                                                    loading={isLoadingLocation}
                                                >
                                                    <p className="text-sm my-1">
                                                        {
                                                            location?.find(
                                                                loc => loc.id === +locationId
                                                            )?.name
                                                        }
                                                    </p>
                                                </Skeleton>
                                            </div>
                                            {filteredStudyGroup.length ? (
                                                <>
                                                    <AdminSelect
                                                        label="Kelompok Belajar"
                                                        options={filteredStudyGroup || []}
                                                        value={selectedStudyGroup}
                                                        onValueChange={setSelectedStudyGroup}
                                                        disabled={!locationId}
                                                    />
                                                    {isFull && (
                                                        <Alert variant="destructive">
                                                            <AlertCircleIcon />
                                                            <AlertTitle>
                                                                Kelompok belajar penuh
                                                            </AlertTitle>
                                                            <AlertDescription>
                                                                <p>
                                                                    Silahkan pilih kelompok belajar
                                                                    yang lain.
                                                                </p>
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <Label>Kelompok Belajar</Label>
                                                    <span className="text-sm text-primary font-medium">
                                                        Belum ada kelompok belajar lain
                                                    </span>
                                                </>
                                            )}
                                            {!data?.trialClassAt && (
                                                <div>
                                                    <Label className="mb-2 block">
                                                        Jadwal Trial Class
                                                    </Label>
                                                    <RadioGroup onValueChange={setTrialClass}>
                                                        {trialClassDates.length ? (
                                                            trialClassDates.map(date => (
                                                                <div className="flex gap-4 items-center">
                                                                    <RadioGroupItem
                                                                        value={date.actualDate}
                                                                    ></RadioGroupItem>
                                                                    <p className="text-[#020217] text-sm">
                                                                        {date.display}
                                                                    </p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-primary font-medium">
                                                                Pilih kelompok belajar terlebih
                                                                dahulu
                                                            </span>
                                                        )}
                                                    </RadioGroup>
                                                </div>
                                            )}
                                            <DialogFooter>
                                                <Button
                                                    onClick={handleChangeStudyGroup}
                                                    disabled={
                                                        !selectedStudyGroup ||
                                                        isFull ||
                                                        (!data?.trialClassAt && !trialClass)
                                                    }
                                                >
                                                    {!isLoadingChangeStudy
                                                        ? 'Ganti'
                                                        : 'Sedang mengganti...'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>
                            {!!data?.self_schedule_payload?.items.length && (
                                <StudentSelfScheduleAlert
                                    selfSchedule={data?.self_schedule_payload?.items || []}
                                    setIsOpen={setIsOpen}
                                />
                            )}
                        </div>
                    </Skeleton>
                </div>
            </div>
        </DashboardContentLayout>
    );
}
