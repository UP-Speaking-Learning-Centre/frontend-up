import { LocationAdmin, RequestTeacherAdmin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import useGetTeacherById from '../queries/useGetTeacherById';
import usePostTeacher from '../queries/usePostTeacher';
import usePutTeacher from '../queries/usePutTeacher';
import { useTeacherManagementStore } from '../stores/teacher';
import { queryClient } from '@/lib/tanstack';
import ENDPOINTS from '@/constants/endpoints';
import { imageUrlToFile } from '@/lib/image';
import { errorToast } from '@/lib/toast';

const useCreateTeacher = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync: postTeacher, isPending } = usePostTeacher();
    const { mutateAsync: putTeacher, isPending: isPendingPut } = usePutTeacher(id);
    const { data, isLoading } = useGetTeacherById(id);

    const teacher = useTeacherManagementStore(s => s.teacher);
    const setTeacher = useTeacherManagementStore(s => s.setTeacher);

    const Teacher = z
        .object({
            memberName: z.string().min(1, 'This field is required'),
            photoLink: z.string().optional(),
            photo: z
                .any()
                .refine(
                    file => {
                        if (id) {
                            return true;
                        } else {
                            return !file || file instanceof File;
                        }
                    },
                    { message: 'Invalid file type' }
                )
                .refine(
                    file =>
                        !file ||
                        [
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'image/svg+xml',
                            'image/gif',
                        ].includes(file.type),
                    { message: 'Invalid image file type' }
                )
                .refine(file => !file || file.size < 10 * 1024 * 1024, {
                    message: 'Ukuran file melebihi batas',
                })
                .optional(),
            speciality: z.string().min(1, 'Harus diisi'),
            teacherId: z.number().min(1, 'Harus diisi'),
            locationId: z.number().min(1, 'Harus diisi'),
        })
        .superRefine((data, ctx) => {
            if (!id && !data.photo) {
                return ctx.addIssue({
                    message: 'This field is required when creating new item',
                    path: ['photo'],
                    code: 'custom',
                });
            }
            return true;
        });

    const { register, handleSubmit, formState, setValue, watch, clearErrors, reset } = useForm<
        RequestTeacherAdmin & {
            photoLink?: string;
        }
    >({
        defaultValues: {
            memberName: '',
            photoLink: '',
            photo: undefined,
            teacherId: 0,
            locationId: 0,
        },
        resolver: zodResolver(Teacher),
    });

    useEffect(() => {
        if (data) {
            imageUrlToFile(data.photoUrl || '').then(res => res && setValue('photo', res));
            setValue('memberName', data?.memberName ?? '');
            setValue('photoLink', data?.photoUrl ?? '');
            setValue('speciality', data?.speciality ?? '');
            // setValue('description', getOne?.description ?? '');
            setValue('teacherId', data?.teacher.id || 0);
            setValue('locationId', data?.location?.id || 0);
            setValue('isCoordinator', data?.isCoordinator || false);
        }
    }, [data]);

    const handleUpload: (file: File) => void = file => {
        if (!file) throw new Error('No file to upload');
        setValue('photo', file);
        setValue('photoLink', URL.createObjectURL(file));
        clearErrors('photo');
    };

    const handleEdit = (id: number) => {
        setIsModalOpen(true);
        setId(id);
    };

    const handleResetModal = () => {
        setIsModalOpen(false);
        setId(0);
        reset();
    };

    const handleSuccess: SubmitHandler<RequestTeacherAdmin> = value => {
        if (id) {
            putTeacher(
                { ...value, isCoordinator: false },
                {
                    onSuccess: () => {
                        toast.success('Berhasil mengubah data guru', {
                            position: 'top-center',
                            className: 'bg-green-200 border-green-300',
                        });
                    },
                }
            )
                .then(res => {
                    setTeacher([
                        ...teacher.map(item => {
                            if (item.id === id) {
                                return { ...item, ...res };
                            }

                            return item;
                        }),
                    ]);
                    handleResetModal();
                })
                .catch(err => errorToast(err?.message));
            return;
        }
        postTeacher(
            { ...value, isCoordinator: false },
            {
                onSuccess: () => {
                    toast.success('Berhasil menambahkan data guru', {
                        position: 'top-center',
                        className: 'bg-green-200 border-green-300',
                    });
                },
            }
        )
            .then(res => {
                setTeacher([res, ...teacher]);
                handleResetModal();
            })
            .catch(err => errorToast(err?.message));
    };
    const handleError: SubmitErrorHandler<Omit<LocationAdmin, 'id'>> = error => {
        console.log(error);
    };

    return {
        register,
        handleSubmit: handleSubmit(handleSuccess, handleError),
        formState,
        handleUpload,
        value: { photoLink: watch('photoLink'), locationId: watch('locationId') },
        id,
        setId,
        handleResetModal,
        isEdit: !!id,
        isLoading,
        isLoadingCreate: isPending || isPendingPut,
        handleEdit,
        data,
        setValue,
    };
};

export default useCreateTeacher;
