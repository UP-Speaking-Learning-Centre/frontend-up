import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RequestTeacherAdmin, TeacherAdmin } from '@/types/admin';
import { X } from 'lucide-react';
import { ChangeEventHandler, FC, FormEventHandler, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import useGetAlias from '../queries/useGetAlias';
import useGetLocation from '../queries/useGetLocation';
import AdminSelect from './admin-select';
import UploadImage from '@/components/upload-image';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

interface Props {
    teacherId?: number;
    teacherName?: string;
    isEdit?: boolean;
    onClose: () => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    errors: FieldErrors<RequestTeacherAdmin>;
    register: UseFormRegister<RequestTeacherAdmin>;
    onUpload: (file: File) => void;
    isLoading?: boolean;
    isLoadingGet?: boolean;
    details?: TeacherAdmin;
    value: Partial<RequestTeacherAdmin & { photoLink?: string }>;
    setValue: UseFormSetValue<RequestTeacherAdmin>;
}
const TeacherManagementForm: FC<Props> = ({
    teacherId,
    isEdit,
    onClose,
    details,
    onSubmit,
    errors,
    value,
    register,
    onUpload,
    isLoadingGet,
    isLoading,
    setValue,
    teacherName,
}) => {
    const [alias, setAlias] = useState(0);

    useEffect(() => {
        if (teacherId) {
            setAlias(teacherId);
        }
    }, [teacherId]);

    const { data: aliasData, isLoading: isLoadingAlias } = useGetAlias();
    const { data, isLoading: isLoadingLocation } = useGetLocation();

    const showSkeleton = isLoadingGet || isLoadingAlias || isLoadingLocation;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEdit ? 'Edit' : 'Tambah'} Teacher
                    </h2>
                    <Button
                        variant={'ghost'}
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded w-10"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </Button>
                </div>

                {/* Modal Content */}
                <form onSubmit={onSubmit} className="px-6 pb-6 space-y-6">
                    {/* Nama Field */}
                    <div>
                        <Skeleton className="h-6 w-32" loading={showSkeleton}>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Nama
                            </label>
                        </Skeleton>
                        <Skeleton loading={showSkeleton} className="h-12 mt-2 w-full">
                            <Input
                                type="text"
                                className={cn(
                                    'w-full border border-gray-300 rounded-md px-3 py-2',
                                    errors.memberName && 'border-red-500'
                                )}
                                {...register('memberName')}
                            />
                            {errors.memberName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.memberName.message?.toString()}
                                </p>
                            )}
                        </Skeleton>
                    </div>

                    {/* Foto Field */}
                    <div>
                        <Skeleton loading={showSkeleton} className="h-6 w-32">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Foto
                            </label>
                        </Skeleton>
                        <Skeleton loading={showSkeleton} className="h-12 mt-2 w-full">
                            <UploadImage
                                handleUpload={onUpload}
                                value={value.photoLink}
                                label="Upload Foto"
                                width={374}
                                height={421}
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.photo.message?.toString()}
                                </p>
                            )}
                        </Skeleton>
                    </div>

                    {/* Deskripsi Field */}
                    {/* <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Deskripsi
                </label>
                <Textarea
                    className={cn(
                        'w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] resize-none',
                        errors.description && 'border-red-500'
                    )}
                    {...register('description')}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message?.toString()}
                    </p>
                )}
            </div> */}

                    <div>
                        <Skeleton className="h-6 w-32" loading={showSkeleton}>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Speciality/Description
                            </label>
                        </Skeleton>
                        <Skeleton loading={showSkeleton} className="h-12 mt-2 w-full">
                            <Input
                                type="text"
                                className={cn(
                                    'w-full border border-gray-300 rounded-md px-3 py-2',
                                    errors.speciality && 'border-red-500'
                                )}
                                {...register('speciality')}
                            />
                            {errors.speciality && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.speciality.message?.toString()}
                                </p>
                            )}
                        </Skeleton>
                    </div>
                    {/* Alias Field */}
                    <div>
                        {/* <Input
                            type="text"
                            className={cn(
                                'w-full border border-gray-300 rounded-md px-3 py-2',
                                errors.teacherId && 'border-red-500'
                            )}
                            {...register('teacherId')}
                        /> */}

                        <Skeleton loading={showSkeleton} className="h-12 w-full">
                            {isEdit ? (
                                <div className="col-span-1 flex flex-col items-start gap-2">
                                    <Label>Alias</Label>
                                    <p className="font-semibold">
                                        {aliasData?.find((data: any) => data.id === alias)?.alias}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <AdminSelect
                                        label="Alias"
                                        loading={isLoadingAlias}
                                        options={
                                            aliasData?.map((alias: any) => ({
                                                id: alias.id,
                                                name: alias.alias,
                                            })) || []
                                        }
                                        defaultValue={alias?.toString()}
                                        value={alias?.toString()}
                                        onValueChange={value => {
                                            setAlias(Number(value));
                                            setValue('teacherId', Number(value));
                                        }}
                                    />

                                    {errors.teacherId && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.teacherId.message?.toString()}
                                        </p>
                                    )}
                                </>
                            )}
                        </Skeleton>
                    </div>

                    {/* Lokasi Mengajar Section */}
                    <Skeleton loading={showSkeleton} className="h-12 w-full">
                        {isEdit ? (
                            <div className="col-span-1 flex flex-col items-start gap-2">
                                <Label>Lokasi Mengajar</Label>
                                <p className="font-semibold">{details?.location?.name}</p>
                            </div>
                        ) : (
                            <div>
                                <AdminSelect
                                    options={
                                        data?.map(item => ({ id: item.id, name: item.name })) || []
                                    }
                                    defaultValue={value.locationId?.toString()}
                                    value={value.locationId?.toString()}
                                    label="Lokasi Mengajar"
                                    onValueChange={val => setValue('locationId', +val)}
                                    loading={isLoadingLocation}
                                />
                                {errors.locationId && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.locationId.message?.toString()}
                                    </p>
                                )}
                            </div>
                        )}
                    </Skeleton>

                    {/* Edit Button */}
                    <div className="flex justify-end pt-4">
                        <Skeleton loading={showSkeleton} className="h-11 w-16">
                            <Button
                                className="text-white px-8 py-2 rounded-lg"
                                disabled={isLoading}
                            >
                                {isEdit
                                    ? !isLoading
                                        ? 'Edit'
                                        : 'Editing...'
                                    : !isLoading
                                    ? 'Add'
                                    : 'Adding...'}
                            </Button>
                        </Skeleton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherManagementForm;
