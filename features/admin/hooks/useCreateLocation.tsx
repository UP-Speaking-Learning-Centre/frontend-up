import { LocationAdmin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import usePostLocation from '../queries/usePostLocation';
import usePutLocation from '../queries/usePutLocation';
import { useLocationManagementStore } from '../stores/location';

const useCreateLocation = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync: postLocation } = usePostLocation();
    const { mutateAsync: putLocation } = usePutLocation();

    const location = useLocationManagementStore(s => s.location);

    const Location = z
        .object({
            name: z.string().min(1, 'This field is required'),
            address: z.string().min(1, 'This field is required'),
            img: z
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
                .refine(file => file.size < 1 * 1000 * 1000, {
                    message: 'Ukuran file melebihi batas',
                })
                .optional(),
            googleMapsLink: z
                .string()
                .min(1, 'This field is required')
                .regex(
                    /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[^\s]*)?$/i,
                    'Please input a valid URL'
                ),
        })
        .superRefine((data, ctx) => {
            if (!id && !data.img) {
                return ctx.addIssue({
                    message: 'This field is required when creating new item',
                    path: ['img'],
                    code: 'custom',
                });
            }
            return true;
        });

    const { register, handleSubmit, formState, setValue, reset } = useForm<
        Omit<LocationAdmin, 'id'>
    >({
        resolver: zodResolver(Location),
    });

    useEffect(() => {
        const getOne = location.find(locate => locate.id === id);
        setValue('address', getOne?.address ?? '');
        setValue('googleMapsLink', getOne?.googleMapsLink ?? '');
        setValue('img', getOne?.img ?? '');
        setValue('name', getOne?.name ?? '');
    }, [id]);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
        if (!e.target.files?.length) throw new Error('No file to upload');
        setValue('img', e.target.files[0]);
    };

    const handleResetModal = () => {
        setIsModalOpen(false);
        setId(0);
        reset();
    };

    const handleSuccess: SubmitHandler<Omit<LocationAdmin, 'id'>> = value => {
        if (id) {
            putLocation({ id, ...value })
                .then(res => handleResetModal())
                .catch(err =>
                    toast.error(err?.message, { position: 'top-center', className: 'bg-red-100' })
                );
            return;
        }
        postLocation(value)
            .then(res => {
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
        setId,
        handleResetModal,
        isEdit: !!id,
    };
};

export default useCreateLocation;
