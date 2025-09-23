import { LocationAdmin, TeacherAdmin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import usePostTeacher from '../queries/usePostTeacher';
import usePutTeacher from '../queries/usePutTeacher';
import useUploadFile from '../queries/useUploadFile';
import { useLocationManagementStore } from '../stores/location';
import { useTeacherManagementStore } from '../stores/teacher';

const useCreateTeacher = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync } = useUploadFile();
    const { mutateAsync: postTeacher } = usePostTeacher();
    const { mutateAsync: putTeacher } = usePutTeacher();

    const teacher = useTeacherManagementStore(s => s.teacher);

    const Teacher = z.object({
        name: z.string().min(1, 'This field is required'),
        img: z.string().min(1, 'This field is required'),
        description: z.string().min(1, 'This field is required'),
        alias: z.string().min(1, 'This field is required'),
        location: z.string().min(1, 'This field is required'),
    });
    const { register, handleSubmit, formState, setValue, reset } = useForm<
        Omit<TeacherAdmin, 'id'>
    >({
        resolver: zodResolver(Teacher),
    });

    useEffect(() => {
        const getOne = teacher.find(teacher => teacher.id === id);
        console.log(getOne,id,teacher);
        
        setValue('img', getOne?.img ?? '');
        setValue('name', getOne?.name ?? '');
        setValue('description', getOne?.description ?? '');
        setValue('alias', getOne?.alias ?? '');
        setValue('location', getOne?.location ?? '');
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

    const handleSuccess: SubmitHandler<Omit<TeacherAdmin, 'id'>> = value => {
        if (id) {
            putTeacher({ id, ...value }).then(res => handleResetModal());
            return;
        }
        postTeacher(value).then(res => {
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

export default useCreateTeacher;
