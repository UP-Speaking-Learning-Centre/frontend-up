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
import {
    ActiveUserDetail,
    NonUserDetail,
    LapsedUserDetail,
    ResponseUserDetail,
} from '@/features/auth/constants/interface';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEditConfirmation } from '@/features/admin/hooks/useEditConfirmation';
import { StudentEditConfirmationDialog } from '@/features/admin/components/students/student-edit-confirmation-dialog';
import moment from 'moment';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FunnelStage, LeadStatus, Role, SourceLead, Grades } from '@/features/non-user/types';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, isValid } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';

const SectionCard = ({
    title,
    children,
    headerAction,
}: {
    title: string;
    children: React.ReactNode;
    headerAction?: React.ReactNode;
}) => (
    <Card className="overflow-hidden mb-6">
        <div className="bg-secondary text-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            {headerAction && <div>{headerAction}</div>}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </Card>
);

const FieldDisplay = ({
    label,
    value,
    highlight = false,
    isDiv = false,
}: {
    label: string;
    value: any;
    highlight?: boolean;
    isDiv?: boolean;
}) => (
    <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <div
            className={cn(
                'font-semibold',
                highlight ? 'text-primary' : 'text-gray-900',
                isDiv ? 'p-2 bg-gray-100 rounded' : ''
            )}
        >
            {value || <span className="text-neutral-400 font-normal">Belum ditentukan</span>}
        </div>
    </div>
);

function EditableFormSection<T extends z.ZodTypeAny>({
    title,
    schema,
    defaultValues,
    onSave,
    renderFields,
}: {
    title: string;
    schema: T;
    defaultValues: any;
    onSave: (oldVal: any, newVal: any, onCancel: () => void) => void;
    renderFields: (form: any, isEditing: boolean) => React.ReactNode;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm({ resolver: zodResolver(schema), defaultValues });

    const handleSubmit = (data: any) => {
        onSave(defaultValues, data, () => {
            // if canceled in prompt, we keep isEditing true or reset?
            // "revert edited field to original value" means go back to view mode with old values
            setIsEditing(false);
            form.reset(defaultValues);
        });
        setIsEditing(false);
    };

    return (
        <Card className="overflow-hidden mb-6">
            <div className="bg-secondary text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {isEditing ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                            setIsEditing(false);
                            form.reset();
                        }}
                    >
                        Batalkan Edit
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs text-black"
                        onClick={() => {
                            form.reset(defaultValues);
                            setIsEditing(true);
                        }}
                    >
                        Edit Bagian Ini
                    </Button>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFields(form, isEditing)}
                    </div>
                    {isEditing && (
                        <div className="mt-6 flex justify-end">
                            <Button type="submit" size="sm">
                                Review Perubahan
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </Card>
    );
}

const FormFieldDisplay = ({
    form,
    name,
    label,
    isEditing,
    suffix = '',
    highlight = false,
    type = 'text',
    options = [],
}: {
    form: any;
    name: string;
    label: string;
    isEditing: boolean;
    suffix?: string;
    highlight?: boolean;
    type?: 'text' | 'select' | 'datetime-local' | 'number' | 'datetime-picker';
    options?: { label: string; value: string }[];
}) => {
    if (!isEditing) {
        const value = form.getValues(name);
        let displayValue = value ? `${value}${suffix}` : undefined;
        if (value && type === 'datetime-picker') {
            displayValue = moment(value).format('DD MMM YYYY, HH:mm');
        }
        return <FieldDisplay label={label} value={displayValue} highlight={highlight} />;
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm text-gray-600 mb-1">{label}</FormLabel>
                    <FormControl>
                        {type === 'select' ? (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Pilih ${label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : type === 'datetime-picker' ? (
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full justify-start text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value && isValid(parseISO(field.value)) ? (
                                                    format(
                                                        parseISO(field.value.split('T')[0]),
                                                        'PPP'
                                                    )
                                                ) : (
                                                    <span>Pilih Tanggal</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value && isValid(parseISO(field.value))
                                                        ? parseISO(field.value.split('T')[0])
                                                        : undefined
                                                }
                                                onSelect={date => {
                                                    if (!date) return;
                                                    const timePart =
                                                        field.value && field.value.includes('T')
                                                            ? field.value
                                                                  .split('T')[1]
                                                                  .substring(0, 5)
                                                            : '00:00';
                                                    field.onChange(
                                                        `${format(date, 'yyyy-MM-dd')}T${timePart}`
                                                    );
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <div className="relative">
                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                        <Input
                                            type="time"
                                            className="w-[120px] pl-8"
                                            value={
                                                field.value && field.value.includes('T')
                                                    ? field.value.split('T')[1].substring(0, 5)
                                                    : ''
                                            }
                                            onChange={e => {
                                                const time = e.target.value;
                                                const datePart =
                                                    field.value && field.value.includes('T')
                                                        ? field.value.split('T')[0]
                                                        : '';
                                                if (datePart) {
                                                    field.onChange(`${datePart}T${time}`);
                                                } else {
                                                    field.onChange(`T${time}`);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {(!field.value ||
                                    field.value.startsWith('T') ||
                                    field.value.endsWith('T') ||
                                    !field.value.includes('T')) && (
                                    <p className="text-[10px] text-red-500 font-medium">
                                        Tanggal dan waktu harus diisi
                                    </p>
                                )}
                            </div>
                        ) : (
                            <Input
                                {...field}
                                type={type}
                                value={field.value || ''}
                                className={type === 'datetime-local' ? 'block' : ''}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

// Form dummy responses
const dummyActiveUser: ActiveUserDetail = {
    id: 1,
    name: 'John Doe (Active User)',
    phoneNumber: '08123456789',
    isContacted: true,
    preferredGroupId: null,
    preferredGroupName: null,
    preferredProgramId: null,
    preferredProgramName: null,
    programId: 1,
    program: 'Program A',
    groupId: 1,
    group: 'Group 1',
    levelId: 1,
    level: 'Beginner',
    gradeId: 1,
    gradeLabel: 'A',
    studyGroupIds: [1],
    primaryStudyGroupId: 1,
    schedules: [],
    instagram: '@johndoe',
    trialClassAt: null,
    packages: [],
    status: 'active',
    subscription: {
        activeFrom: '2023-01-01',
        activeUntil: '2023-12-31',
        selectedPeriod: 12,
    },
    studyGroup: {
        teacher: 'Mr. Smith',
        schedules: ['Senin 10:00', 'Kamis 10:00'],
        location: 'Cabang Utama',
    },
};

const dummyNonUser: NonUserDetail = {
    ...dummyActiveUser,
    id: 2,
    name: 'Jane Doe (Non User)',
    isContacted: false,
    status: 'non_user',
    marketing: {
        leadStatus: 'Hot',
        sourceLead: 'Instagram',
        funnelStage: 'Engaged',
        picRole: 'Staff',
        picPerson: 'Jane',
        lastFollowUp: '2023-10-27T10:00',
    },
    offer: {
        program: 'Program A',
        package: 'Private',
        duration: '3 Bulan',
        price: '5.000.000',
    },
    recommendation: {
        program: 'Program B',
        group: 'Group 2',
        level: 'Intermediate',
        grade: 'B',
    },
    trial: {
        branch: 'Cabang Utama',
        studyGroup: 'Kelas Coba B',
        schedule: 'Rabu 15:00',
        isDone: false,
    },
};

const dummyLapsedUser: LapsedUserDetail = {
    ...dummyActiveUser,
    id: 3,
    name: 'Bob Doe (Lapsed User)',
    isContacted: true,
    status: 'lapsed',
    lastProgram: {
        name: 'Program C',
        group: 'Group C',
        level: 'Advanced',
        grade: 'C',
    },
    history: {
        activeFrom: '2022-01-01',
        activeUntil: '2022-12-31',
        selectedPeriod: 12,
    },
    lastStudyGroup: {
        name: 'Study Group C',
        teacher: 'Mrs. Jane',
        schedules: ['Senin 10:00', 'Kamis 10:00'],
        location: 'Cabang Utama',
    },
};

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [trialClass, setTrialClass] = useState('');
    const dummyTypeParam = searchParams.get('dummy') || 'active';
    const [mockStatus, setMockStatus] = useState<'active' | 'non_user' | 'lapsed'>(
        dummyTypeParam as any
    );

    const {
        data: realData,
        locationId,
        isLoading,
        isLoadingStudyGroupDetail,
        studyGroupDetail,
    } = useStudentDetail(mockStatus);

    let data =
        mockStatus === 'active'
            ? dummyActiveUser
            : mockStatus === 'non_user'
              ? dummyNonUser
              : dummyLapsedUser;

    // Use full API data if real data arrives (but for dummy test we overwrite using realData if it's there)
    if (realData) data = { ...data, ...realData } as any;

    const { isEdit, setIsEdit, notes, setNotes, handleSave } = useEditNote(data?.notes);
    const {
        isOpen: isOpenStudy,
        setIsOpen: setIsOpenStudy,
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

    // Edit confirmation dialog state wrapper
    const editConfirmation = useEditConfirmation<any>();

    const handleFormSavePrompt = (oldData: any, newData: any, onCancel: () => void) => {
        // Trigger dialog popup
        editConfirmation.openConfirmation(
            oldData,
            newData,
            () => {
                // BE API CALL HAPPENS HERE LATER ON
                console.log('Submitting API changes:', newData);
            },
            onCancel
        );
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const statuses: { id: 'active' | 'non_user' | 'lapsed'; label: string; color: string }[] = [
            {
                id: 'active',
                label: 'Active User',
                color: 'bg-green-100 text-green-800 border-green-200',
            },
            {
                id: 'non_user',
                label: 'Non User',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
            },
            {
                id: 'lapsed',
                label: 'Lapsed User',
                color: 'bg-gray-100 text-gray-800 border-gray-200',
            },
        ];

        return (
            <div className="mb-6 space-y-2">
                <p className="text-xs text-gray-400 font-semibold mb-2">Switch Dummy Status:</p>
                <div className="flex flex-wrap gap-2">
                    {statuses.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setMockStatus(s.id)}
                            className={cn(
                                'px-3 py-1 rounded-full text-xs font-bold border transition-all',
                                s.color,
                                mockStatus === s.id
                                    ? 'ring-2 ring-offset-2 ring-primary border-transparent opacity-100'
                                    : 'opacity-60 grayscale-[0.5] hover:opacity-100'
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const StudentDetailFields = ({ userData }: { userData: any }) => (
        <SectionCard title="Student Detail">
            <div className="col-span-1 md:col-span-2 space-y-4">
                <FieldDisplay label="Nama" value={userData.name} />
                <FieldDisplay label="No. HP" value={userData.phoneNumber} />
                <FieldDisplay label="Instagram" value={userData.instagram} />
            </div>
        </SectionCard>
    );

    return (
        <DashboardContentLayout pageTitle="Detail Student">
            <div className="mb-4 flex gap-4 bg-white p-3 rounded-md shadow-sm">
                <p className="font-semibold mr-2">Test View (Change Type):</p>
                <Link
                    href={ROUTES.adminStudents + '/detail/1?dummy=active'}
                    className={cn(
                        'text-sm hover:underline',
                        mockStatus === 'active' && 'text-primary font-bold'
                    )}
                >
                    Active User
                </Link>
                <Link
                    href={ROUTES.adminStudents + '/detail/2?dummy=non_user'}
                    className={cn(
                        'text-sm hover:underline',
                        mockStatus === 'non_user' && 'text-primary font-bold'
                    )}
                >
                    Non User
                </Link>
                <Link
                    href={ROUTES.adminStudents + '/detail/3?dummy=lapsed'}
                    className={cn(
                        'text-sm hover:underline',
                        mockStatus === 'lapsed' && 'text-primary font-bold'
                    )}
                >
                    Lapsed User
                </Link>
            </div>

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
                        id={data?.id || 0}
                        open={showDialodContacted}
                        onOpenChange={setShowDialodContacted}
                    />
                )}
            </div>

            <div className="min-h-screen bg-gray-50 pb-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Main Detail Section (8-columns grid layout for details) */}
                    <div className="md:col-span-8 space-y-6">
                        {/* TOP LEVEL WARNINGS & ACTIONS */}
                        {data.status === 'active' && (
                            <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between mb-4 border border-gray-200">
                                <span className="text-gray-600">Aksi Cepat:</span>
                                <Button variant="destructive" size="sm">
                                    Ubah Menjadi Lapsed User
                                </Button>
                            </div>
                        )}
                        {data.status === 'non_user' &&
                            moment((data as NonUserDetail).marketing?.lastFollowUp).diff(
                                moment(),
                                'days'
                            ) > 5 && (
                                <div className="flex flex-col gap-4 mb-4">
                                    <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded">
                                        Warning: Student belum dihubungi dalam waktu 5 hari atau
                                        Placement Test belum dinilai!
                                    </div>
                                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">
                                            Follow Up Next Steps:
                                        </span>
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

                        {data.status === 'active' && (
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
                                        program: (data as ActiveUserDetail).program || '',
                                        group: (data as ActiveUserDetail).group || '',
                                        level: (data as ActiveUserDetail).level || '',
                                        gradeLabel: (data as ActiveUserDetail).gradeLabel || '',
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
                                                    options={[
                                                        { label: 'Program A', value: 'Program A' },
                                                        { label: 'Program B', value: 'Program B' },
                                                    ]}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="group"
                                                    label="Group"
                                                    isEditing={isEditing}
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
                                                    name="level"
                                                    label="Level"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        { label: 'Beginner', value: 'Beginner' },
                                                        {
                                                            label: 'Intermediate',
                                                            value: 'Intermediate',
                                                        },
                                                    ]}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="gradeLabel"
                                                    label="Grade"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={Object.values(Grades).map(v => ({
                                                        label: v,
                                                        value: v,
                                                    }))}
                                                />
                                            </div>
                                        </>
                                    )}
                                />

                                {/* <SectionCard title="Kelompok Belajar">
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        <FieldDisplay
                                            label="Teacher"
                                            value={(data as ActiveUserDetail).studyGroupTeacher}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FieldDisplay
                                                label="Jadwal 1"
                                                value={
                                                    (data as ActiveUserDetail).studyGroupSchedule1
                                                }
                                            />
                                            <FieldDisplay
                                                label="Jadwal 2"
                                                value={
                                                    (data as ActiveUserDetail).studyGroupSchedule2
                                                }
                                            />
                                        </div>
                                        <FieldDisplay
                                            label="Lokasi"
                                            value={(data as ActiveUserDetail).studyGroupLocation}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 text-primary"
                                        >
                                            Edit Kelompok Belajar
                                        </Button>
                                    </div>
                                </SectionCard> */}

                                {data.status === 'active' && (
                                    <>
                                        <StudentStudyGroupCard
                                            data={data as ResponseUserDetail}
                                            studyGroupDetail={studyGroupDetail}
                                            isLoadingLocation={false}
                                            location={location}
                                            locationId={locationId}
                                            isOpen={isOpenStudy}
                                            setIsOpen={setIsOpenStudy}
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
                                            <div className="mt-6">
                                                <StudentSelfScheduleAlert
                                                    selfSchedule={
                                                        data?.self_schedule_payload?.items || []
                                                    }
                                                    setIsOpen={setIsOpenStudy}
                                                />
                                            </div>
                                        )}
                                    </>
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
                                            activeFrom:
                                                (data as ActiveUserDetail).subscription
                                                    ?.activeFrom || '',
                                            activeUntil:
                                                (data as ActiveUserDetail).subscription
                                                    ?.activeUntil || '',
                                            selectedPeriod: String(
                                                (data as ActiveUserDetail).subscription
                                                    ?.selectedPeriod || ''
                                            ),
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
                                                    options={[
                                                        { label: '3 Bulan', value: '3' },
                                                        { label: '6 Bulan', value: '6' },
                                                        { label: '12 Bulan', value: '12' },
                                                    ]}
                                                />
                                            </div>
                                        </>
                                    )}
                                />
                            </>
                        )}

                        {data.status === 'non_user' && (
                            <>
                                <EditableFormSection
                                    title="Marketing Funnel Detail"
                                    schema={z.object({
                                        marketing: z.object({
                                            leadStatus: z.string().optional(),
                                            sourceLead: z.string().optional(),
                                            funnelStage: z.string().optional(),
                                            picRole: z.string().optional(),
                                            picPerson: z.string().optional(),
                                            lastFollowUp: z.string().optional(),
                                        }),
                                    })}
                                    defaultValues={{
                                        marketing: {
                                            leadStatus:
                                                (data as NonUserDetail).marketing?.leadStatus || '',
                                            sourceLead:
                                                (data as NonUserDetail).marketing?.sourceLead || '',
                                            funnelStage:
                                                (data as NonUserDetail).marketing?.funnelStage ||
                                                '',
                                            picRole:
                                                (data as NonUserDetail).marketing?.picRole || '',
                                            picPerson:
                                                (data as NonUserDetail).marketing?.picPerson || '',
                                            lastFollowUp:
                                                (data as NonUserDetail).marketing?.lastFollowUp ||
                                                '',
                                        },
                                    }}
                                    onSave={handleFormSavePrompt}
                                    renderFields={(form, isEditing) => (
                                        <>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="marketing.leadStatus"
                                                    label="Lead Status"
                                                    isEditing={isEditing}
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
                                                    isEditing={isEditing}
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
                                                    isEditing={isEditing}
                                                    highlight
                                                    type="select"
                                                    options={Object.values(FunnelStage).map(v => ({
                                                        label: v,
                                                        value: v,
                                                    }))}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="marketing.picRole"
                                                    label="PIC Role"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={Object.values(Role).map(v => ({
                                                        label: v,
                                                        value: v,
                                                    }))}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="marketing.picPerson"
                                                    label="PIC Person"
                                                    isEditing={isEditing}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="marketing.lastFollowUp"
                                                    label="Last Follow Up"
                                                    isEditing={isEditing}
                                                    type="datetime-local"
                                                />
                                            </div>
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
                                            program: (data as NonUserDetail).offer?.program || '',
                                            package: (data as NonUserDetail).offer?.package || '',
                                            duration: (data as NonUserDetail).offer?.duration || '',
                                            price: (data as NonUserDetail).offer?.price || '',
                                        },
                                    }}
                                    onSave={handleFormSavePrompt}
                                    renderFields={(form, isEditing) => (
                                        <>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="offer.program"
                                                    label="Program"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        {
                                                            label: 'School Program',
                                                            value: 'School Program',
                                                        },
                                                        {
                                                            label: 'Intensive Program',
                                                            value: 'Intensive Program',
                                                        },
                                                    ]}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="offer.package"
                                                    label="Paket"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        { label: 'Private', value: 'Private' },
                                                        {
                                                            label: 'Semi Private',
                                                            value: 'Semi Private',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="offer.duration"
                                                    label="Durasi"
                                                    isEditing={isEditing}
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
                                                    isEditing={isEditing}
                                                />
                                            </div>
                                        </>
                                    )}
                                />

                                <EditableFormSection
                                    title="Program Recommendation"
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
                                            program:
                                                (data as NonUserDetail).recommendation?.program ||
                                                '',
                                            group:
                                                (data as NonUserDetail).recommendation?.group || '',
                                            level:
                                                (data as NonUserDetail).recommendation?.level || '',
                                            grade:
                                                (data as NonUserDetail).recommendation?.grade || '',
                                        },
                                    }}
                                    onSave={handleFormSavePrompt}
                                    renderFields={(form, isEditing) => (
                                        <>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="recommendation.program"
                                                    label="Program"
                                                    isEditing={isEditing}
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
                                                    isEditing={isEditing}
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
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        { label: 'Beginner', value: 'Beginner' },
                                                        {
                                                            label: 'Intermediate',
                                                            value: 'Intermediate',
                                                        },
                                                    ]}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="recommendation.grade"
                                                    label="Grade"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={Object.values(Grades).map(v => ({
                                                        label: v,
                                                        value: v,
                                                    }))}
                                                />
                                            </div>
                                        </>
                                    )}
                                />

                                <EditableFormSection
                                    title="Trial Class Detail"
                                    schema={z.object({
                                        trial: z.object({
                                            branch: z.string().optional(),
                                            studyGroup: z.string().optional(),
                                        }),
                                    })}
                                    defaultValues={{
                                        trial: {
                                            branch: (data as NonUserDetail).trial?.branch || '',
                                            studyGroup:
                                                (data as NonUserDetail).trial?.studyGroup || '',
                                        },
                                    }}
                                    onSave={handleFormSavePrompt}
                                    renderFields={(form, isEditing) => (
                                        <>
                                            <div className="space-y-4">
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="trial.branch"
                                                    label="Cabang"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        {
                                                            label: 'Kuningan 1',
                                                            value: 'Kuningan 1',
                                                        },
                                                        { label: 'Sudirman', value: 'Sudirman' },
                                                    ]}
                                                />
                                                <FormFieldDisplay
                                                    form={form}
                                                    name="trial.studyGroup"
                                                    label="Nama Study Group"
                                                    isEditing={isEditing}
                                                    type="select"
                                                    options={[
                                                        {
                                                            label: 'Kelas Coba A',
                                                            value: 'Kelas Coba A',
                                                        },
                                                        {
                                                            label: 'Kelas Coba B',
                                                            value: 'Kelas Coba B',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex gap-2 items-end">
                                                    <FieldDisplay
                                                        label="Status Trial"
                                                        value={
                                                            (data as NonUserDetail).trial?.isDone
                                                                ? 'Sudah Trial'
                                                                : 'Belum Trial'
                                                        }
                                                    />
                                                    {!(data as NonUserDetail).trial?.isDone && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            type="button"
                                                        >
                                                            Tandai Sudah Trial
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                />

                                <SectionCard title="User's Selected Study Group">
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        <FieldDisplay
                                            label="Cabang"
                                            value={(data as NonUserDetail).selection?.branch}
                                        />
                                        <FieldDisplay
                                            label="Nama Study Group"
                                            value={(data as NonUserDetail).selection?.studyGroup}
                                        />
                                        <FieldDisplay
                                            label="Teacher"
                                            value={(data as NonUserDetail).selection?.teacher}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(data as NonUserDetail).selection?.schedules?.map(
                                                (s, i) => (
                                                    <FieldDisplay
                                                        key={i}
                                                        label={`Jadwal ${i + 1}`}
                                                        value={s}
                                                    />
                                                )
                                            )}
                                        </div>
                                        {(data as NonUserDetail).selection?.isSelfSchedule && (
                                            <div className="p-2 mt-4 bg-orange-50 text-orange-800 border-l-4 border-orange-400 rounded text-xs">
                                                Pemberitahuan: Ini adalah jadwal yang dipilih
                                                sendiri oleh user.
                                            </div>
                                        )}
                                    </div>
                                </SectionCard>
                            </>
                        )}

                        {data.status === 'lapsed' && (
                            <>
                                <SectionCard title="Last Program">
                                    <div className="space-y-4">
                                        <FieldDisplay
                                            label="Program"
                                            value={(data as LapsedUserDetail).lastProgram?.name}
                                        />
                                        <FieldDisplay
                                            label="Group"
                                            value={(data as LapsedUserDetail).lastProgram?.group}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <FieldDisplay
                                            label="Level"
                                            value={(data as LapsedUserDetail).lastProgram?.level}
                                        />
                                        <FieldDisplay
                                            label="Grade"
                                            value={(data as LapsedUserDetail).lastProgram?.grade}
                                        />
                                    </div>
                                </SectionCard>
                                <SectionCard title="History Subscription">
                                    <div className="space-y-4">
                                        <FieldDisplay
                                            label="Active From"
                                            value={(data as LapsedUserDetail).history?.activeFrom}
                                        />
                                        <FieldDisplay
                                            label="Active Until"
                                            value={(data as LapsedUserDetail).history?.activeUntil}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <FieldDisplay
                                            label="Selected Period"
                                            value={
                                                (data as LapsedUserDetail).history?.selectedPeriod
                                                    ? (data as LapsedUserDetail).history
                                                          ?.selectedPeriod + ' Bulan'
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </SectionCard>
                                <SectionCard title="Last Study Group">
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        <FieldDisplay
                                            label="Nama Study Group"
                                            value={(data as LapsedUserDetail).lastStudyGroup?.name}
                                        />
                                        <FieldDisplay
                                            label="Teacher"
                                            value={
                                                (data as LapsedUserDetail).lastStudyGroup?.teacher
                                            }
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(
                                                data as LapsedUserDetail
                                            ).lastStudyGroup?.schedules?.map((s, i) => (
                                                <FieldDisplay
                                                    key={i}
                                                    label={`Jadwal ${i + 1}`}
                                                    value={s}
                                                />
                                            ))}
                                        </div>
                                        <FieldDisplay
                                            label="Lokasi"
                                            value={
                                                (data as LapsedUserDetail).lastStudyGroup?.location
                                            }
                                        />
                                    </div>
                                </SectionCard>
                            </>
                        )}
                    </div>

                    {/* Side Section (4-columns layout for Notes, etc) */}
                    <div className="md:col-span-4 space-y-6">
                        <StatusBadge status={data.status} />
                        <StudentDetailFields userData={data} />

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
            />
        </DashboardContentLayout>
    );
}
