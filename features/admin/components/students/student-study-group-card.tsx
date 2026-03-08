import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { inter } from '@/constants/fonts';
import { ROUTES } from '@/constants/routes';
import { REGISTRATION_TYPE } from '@/constants/student';
import AdminSelect from '@/features/admin/components/admin-select';
import { getDayOfWeek } from '@/lib/date';
import { cn } from '@/lib/utils';
import { Schedule } from '@/types/study-group';
import { getRegistrationType } from '@/utils/student.helper';
import { AlertCircleIcon, Calendar, Clock, Info } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface StudentStudyGroupCardProps {
    data: any;
    studyGroupDetail: any;
    isLoadingLocation: boolean;
    location: any;
    locationId: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    filteredStudyGroup: any[];
    selectedStudyGroup: string;
    setSelectedStudyGroup: (val: string) => void;
    isFull: boolean;
    trialClassDates: any[];
    trialClass: string;
    setTrialClass: (val: string) => void;
    handleChangeStudyGroup: () => void;
    isLoadingChangeStudy: boolean;
}

export default function StudentStudyGroupCard({
    data,
    studyGroupDetail,
    isLoadingLocation,
    location,
    locationId,
    isOpen,
    setIsOpen,
    filteredStudyGroup,
    selectedStudyGroup,
    setSelectedStudyGroup,
    isFull,
    trialClassDates,
    trialClass,
    setTrialClass,
    handleChangeStudyGroup,
    isLoadingChangeStudy,
}: StudentStudyGroupCardProps) {
    const routes = useRouter();

    return (
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
                            studyGroupDetail?.schedules?.[0]?.location
                                ? 'text-gray-900'
                                : 'text-primary'
                        )}
                    >
                        {studyGroupDetail?.schedules?.[0]?.location || 'Belum ditentukan'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Nama Kelompok</p>
                    <p
                        className={cn(
                            'font-semibold text-gray-900',
                            studyGroupDetail?.name ? 'text-gray-900' : 'text-primary'
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
                            studyGroupDetail?.schedules?.[0]?.teacherMemberName
                                ? 'text-gray-900'
                                : 'text-primary'
                        )}
                    >
                        {studyGroupDetail?.schedules?.[0]?.teacherMemberName || 'Belum ditentukan'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">
                        Jadwal Trial Class{' '}
                        {!!studyGroupDetail?.schedules?.length && '(Pilihan Sendiri)'}
                    </p>
                    <p
                        className={cn(
                            'font-semibold text-gray-900',
                            data?.trialClassAt ? 'text-gray-900' : 'text-primary'
                        )}
                    >
                        {data?.trialClassAt
                            ? moment(data.trialClassAt).format('dddd, DD MMMM YYYY, HH:mm ')
                            : '-'}
                    </p>
                </div>
            </div>
            {[
                ...(data?.schedules && data?.schedules?.length > 0
                    ? data?.schedules
                    : (studyGroupDetail?.schedules as Schedule[]) || []),
            ].map((schedule, index) => (
                <div key={`${schedule.id}-${index}`} className="px-6 py-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Jadwal Kelas {index + 1}</p>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-gray-600">Hari</span>
                            </div>
                            <span className="font-semibold text-gray-900">
                                {getDayOfWeek(schedule.dayOfWeek.slice(0, 3))}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-[#F9FAFB] py-4 px-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-gray-600">Waktu</span>
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
                {getRegistrationType(data) === REGISTRATION_TYPE.placementTest && (
                    <>
                        <p className="text-xs py-2 mt-5">
                            <Info className="w-4 h-4 inline mr-1" />
                            Anda belum melakukan penilaian placement test untuk murid ini
                        </p>
                        <Button
                            disabled={!data?.latestResult?.placementTestId}
                            onClick={() =>
                                routes.replace(
                                    ROUTES.adminPlacementTestsId.expand({
                                        id: data?.latestResult?.placementTestId || 0,
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
                {getRegistrationType(data) === REGISTRATION_TYPE.normal && (
                    <Button
                        disabled={!data?.levelId}
                        onClick={() => setIsOpen(true)}
                        className="w-full"
                        size="lg"
                    >
                        {!!studyGroupDetail?.schedules ? 'Ganti Kelompok' : 'Assign ke Kelompok'}
                    </Button>
                )}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className={cn(inter.className)}>
                        <DialogTitle>Ganti Kelompok</DialogTitle>
                        <div>
                            <Label className="font-medium">Lokasi</Label>
                            <Skeleton className="h-10 my-1" loading={isLoadingLocation}>
                                <p className="text-sm my-1">
                                    {location?.find((loc: any) => loc.id === +locationId)?.name}
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
                                        <AlertTitle>Kelompok belajar penuh</AlertTitle>
                                        <AlertDescription>
                                            <p>Silahkan pilih kelompok belajar yang lain.</p>
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
                                <Label className="mb-2 block">Jadwal Trial Class</Label>
                                <RadioGroup onValueChange={setTrialClass}>
                                    {trialClassDates.length ? (
                                        trialClassDates.map((date, index) => (
                                            <div className="flex gap-4 items-center" key={index}>
                                                <RadioGroupItem value={date.actualDate}></RadioGroupItem>
                                                <p className="text-[#020217] text-sm">
                                                    {date.display}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-sm text-primary font-medium">
                                            Pilih kelompok belajar terlebih dahulu
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
                                {!isLoadingChangeStudy ? 'Ganti' : 'Sedang mengganti...'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
}
