import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RequestTeacherAdmin } from '@/types/admin';
import { X } from 'lucide-react';
import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import useGetAlias from '../queries/useGetAlias';
import AdminSelect from './admin-select';

interface Props {
    teacherId?: number;
    isEdit?: boolean;
    onClose: () => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    errors: FieldErrors<RequestTeacherAdmin>;
    register: UseFormRegister<RequestTeacherAdmin>;
    onUpload: ChangeEventHandler<HTMLInputElement>;
    isLoading?: boolean;
    setValue: UseFormSetValue<RequestTeacherAdmin>;
}
const TeacherManagementForm: FC<Props> = ({
    teacherId,
    isEdit,
    onClose,
    onSubmit,
    errors,
    register,
    onUpload,
    isLoading,
    setValue,
}) => {
    const { data: aliasData, isLoading: isLoadingAlias } = useGetAlias();
    const [alias, setAlias] = useState(teacherId);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEdit && 'Edit '}Detail Ms. Feby
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
                        <label className="block text-sm font-medium text-gray-900 mb-2">Nama</label>
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
                    </div>

                    {/* Foto Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Foto</label>
                        <Input
                            type="file"
                            className={cn(
                                'w-full border border-gray-300 rounded-md px-3 py-2',
                                errors.photo && 'border-red-500'
                            )}
                            onChange={onUpload}
                        />
                        {isEdit && (
                            <p className="text-xs font-semibold text-gray-500 mt-1">
                                Catatan: Harap diabaikan apabila tidak terdapat perubahan.
                            </p>
                        )}
                        {errors.photo && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.photo.message?.toString()}
                            </p>
                        )}
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
                        {!isEdit && (
                            <AdminSelect
                                label="Alias"
                                loading={isLoadingAlias}
                                options={
                                    aliasData?.map(alias => ({
                                        id: alias.id,
                                        name: alias.alias,
                                    })) || []
                                }
                                value={alias?.toString()}
                                onValueChange={value => {
                                    setAlias(Number(value));
                                    setValue('teacherId', Number(value));
                                }}
                            />
                        )}
                        {errors.teacherId && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.teacherId.message?.toString()}
                            </p>
                        )}
                    </div>

                    {/* Lokasi Mengajar Section */}
                    {/* <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Lokasi Mengajar
                </label>
                <RadioGroup className="space-y-1" {...register('location')}>
                    {data?.map(item => (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={item.id.toString()} />
                            <label
                                htmlFor="location1"
                                className="text-sm text-gray-900"
                            >
                                {item.name}
                            </label>
                        </div>
                    ))}
                </RadioGroup>
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message?.toString()}
                    </p>
                )}
            </div> */}

                    {/* Edit Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg"
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherManagementForm;
