import { LocationAdmin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import usePostLocation from '../queries/usePostLocation';
import usePutLocation from '../queries/usePutLocation';
import { useLocationManagementStore } from '../stores/location';
import { imageUrlToFile } from '@/lib/image';
import { errorToast } from '@/lib/toast';

const useCreateLocation = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync: postLocation, isPending: isPendingPost } = usePostLocation();
    const { mutateAsync: putLocation, isPending: isPendingPut } = usePutLocation();

    const location = useLocationManagementStore(s => s.location);

    const Location = z
        .object({
            name: z.string().min(1, 'This field is required'),
            address: z.string().min(1, 'This field is required'),
            imgLink: z.string().optional(),
            img: z
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
            googleMapsLink: z
                .string()
                .min(1, 'This field is required')
                .regex(
                    /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[^\s]*)?$/i,
                    'Please input a valid URL'
                ),
        })
        .superRefine((data, ctx) => {
            const isEdit = Boolean(id);

            if (!isEdit) {
                if (!data.img || !(data.img instanceof File)) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['img'],
                        message: 'This field is required and must be a file when creating new item',
                    });
                }
            }
        });

    const { register, handleSubmit, watch, formState, clearErrors, setValue, reset } = useForm<
        Omit<LocationAdmin, 'id'>
    >({
        defaultValues: {
            name: '',
            address: '',
            img: '',
            imgLink: '',
            googleMapsLink: '',
        },
        resolver: zodResolver(Location),
    });

    useEffect(() => {
        if (location && id) {
            const getOne = location.find(locate => locate.id === id);
            const getFiles = async () => {
                const file = await imageUrlToFile(getOne?.img as string);
                setValue('img', file);
                return file;
            };

            getFiles();
            setValue('address', getOne?.address ?? '');
            setValue('googleMapsLink', getOne?.googleMapsLink ?? '');
            setValue('imgLink', (getOne?.img as string) ?? '');
            setValue('name', getOne?.name ?? '');
        }
    }, [location, id]);

    const handleUpload: (file: File) => void = file => {
        if (!file) throw new Error('No file to upload');
        setValue('img', file);
        clearErrors('img');
        setValue('imgLink', URL.createObjectURL(file));
    };

    const handleResetModal = () => {
        setIsModalOpen(false);
        setId(0);
        reset();
    };

    const handleSuccess: SubmitHandler<Omit<LocationAdmin, 'id'>> = value => {
        if (id) {
            putLocation(
                { id, ...value },
                {
                    onSuccess: () => {
                        toast.success('Detail lokasi berhasil diubah', {
                            position: 'top-center',
                            className: 'bg-green-200 border-green-300',
                        });
                        handleResetModal();
                    },
                }
            ).catch(err => errorToast(err?.message));
            return;
        }
        postLocation(value, {
            onSuccess: () => {
                toast.success('Lokasi berhasil ditambahkan', {
                    position: 'top-center',
                    className: 'bg-green-200 border-green-300',
                });
                handleResetModal();
            },
        })
            .then(res => {
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
        value: { imgLink: watch('imgLink') },
        setId,
        handleResetModal,
        isLoadingSubmit: isPendingPost || isPendingPut,
        isEdit: !!id,
    };
};

export default useCreateLocation;
