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
            photo: z
                .instanceof(File)
                .refine(
                    file =>
                        [
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'image/svg+xml',
                            'image/gif',
                        ].includes(file.type),
                    { message: 'Invalid image file type' }
                )
                .refine(file => file.size < 5 * 1000 * 1000, {
                    message: 'Ukuran file melebihi batas',
                })
                .optional(),
            teacherId: z.number().min(1, 'This field is required'),
            locationId: z.number().min(1, 'This field is required'),
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

    const { register, handleSubmit, formState, setValue, reset } = useForm<RequestTeacherAdmin>({
        resolver: zodResolver(Teacher),
    });

    async function getFileFromUrl(url: string, defaultType = 'application/octet-stream') {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const urlSplit = url.split('/');
            const filename = urlSplit[urlSplit.length - 1];

            const blob = await response.blob();
            return new File([blob], filename, { type: blob.type || defaultType });
        } catch (error) {
            console.error('Error converting URL to File:', error);
            return null;
        }
    }

    useEffect(() => {
        if (data) {
            getFileFromUrl(data.photoUrl || '').then(res => res && setValue('photo', res));
            setValue('memberName', data?.memberName ?? '');
            // setValue('description', getOne?.description ?? '');
            setValue('teacherId', data?.teacher.id || 0);
            setValue('locationId', data?.teacher.id || 0);
            setValue('isCoordinator', data?.isCoordinator || false);
        }
    }, [data]);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
        if (!e.target.files?.length) throw new Error('No file to upload');
        setValue('photo', e.target.files[0]);
        // mutateAsync().then(res => setValue('photoUrl', res));
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
            putTeacher({ ...value, isCoordinator: false })
                .then(res => {
                    setTeacher([
                        ...teacher.map(item =>
                            item.id === id ? { ...res, id: teacher.length } : item
                        ),
                    ]);
                    handleResetModal();
                })
                .catch(err =>
                    toast.error(err?.message, { position: 'top-center', className: 'bg-red-100' })
                );
            return;
        }
        postTeacher({ ...value, isCoordinator: false })
            .then(res => {
                setTeacher([res, ...teacher]);
                handleResetModal();
            })
            .catch(err =>
                toast.error(err?.message, { position: 'top-center', className: 'bg-red-100' })
            );
    };
    const handleError: SubmitErrorHandler<Omit<LocationAdmin, 'id'>> = error => {
        console.log(error);
    };

    return {
        register,
        handleSubmit: handleSubmit(handleSuccess, handleError),
        formState,
        handleUpload,
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
