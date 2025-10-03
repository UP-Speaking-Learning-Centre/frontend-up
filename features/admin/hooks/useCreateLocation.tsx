import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import useUploadFile from '../queries/useUploadFile';
import { ChangeEventHandler, useEffect, useState } from 'react';
import usePostLocation from '../queries/usePostLocation';
import { LocationAdmin } from '@/types/admin';
import { useLocationManagementStore } from '../stores/location';
import usePutLocation from '../queries/usePutLocation';

const useCreateLocation = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync } = useUploadFile();
    const { mutateAsync: postLocation } = usePostLocation();
    const { mutateAsync: putLocation } = usePutLocation();

    const location = useLocationManagementStore(s => s.location);

    const Location = z.object({
        name: z.string().min(1, 'This field is required'),
        address: z.string().min(1, 'This field is required'),
        img: z.string().min(1, 'This field is required'),
        googleMapsLink: z
            .string()
            .min(1, 'This field is required')
            .regex(/^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[^\s]*)?$/i, 'Please input a valid URL'),
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
        mutateAsync().then(res => setValue('img', res));
    };

    const handleResetModal = () => {
        setIsModalOpen(false);
        setId(0);
        reset();
    };

    const handleSuccess: SubmitHandler<Omit<LocationAdmin, 'id'>> = value => {
        if (id) {
            putLocation({ id, ...value }).then(res => handleResetModal());
            return;
        }
        postLocation(value).then(res => {
            handleResetModal();
        });
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
