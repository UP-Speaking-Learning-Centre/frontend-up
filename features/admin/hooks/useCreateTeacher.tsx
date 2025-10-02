import { LocationAdmin, RequestTeacherAdmin } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import useGetTeacherById from '../queries/useGetTeacherById';
import usePostTeacher from '../queries/usePostTeacher';
import usePutTeacher from '../queries/usePutTeacher';
import useUploadFile from '../queries/useUploadFile';

const useCreateTeacher = (setIsModalOpen: (val: boolean) => void) => {
    const [id, setId] = useState(0);

    const { mutateAsync } = useUploadFile();
    const { mutateAsync: postTeacher } = usePostTeacher();
    const { mutateAsync: putTeacher } = usePutTeacher(id);
    const { data, isLoading } = useGetTeacherById(id);

    const Teacher = z.object({
        memberName: z.string().min(1, 'This field is required'),
        photo: z
            .instanceof(File)
            .refine(
                file =>
                    ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'].includes(
                        file.type
                    ),
                { message: 'Invalid image file type' }
            ),
        teacherId: z.number().min(1, 'This field is required'),
        // isCoordinator: z.string().min(1, 'This field is required'),
    });
    const { register, handleSubmit, formState, setValue, reset } = useForm<RequestTeacherAdmin>({
        resolver: zodResolver(Teacher),
    });

    useEffect(() => {
        if (id) {
            // setValue('photoUrl', data?.photoUrl ?? '');
            setValue('memberName', data?.memberName ?? '');
            // setValue('description', getOne?.description ?? '');
            setValue('teacherId', data?.teacher.id || 0);
            // setValue('isCoordinator', data?.isCoordinator || false);
        }
    }, [id, data]);

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
            putTeacher(value).then(res => handleResetModal());
            return;
        }
        postTeacher({ ...value, isCoordinator: false }).then(res => {
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
        id,
        setId,
        handleResetModal,
        isEdit: !!id,
        isLoading,
        handleEdit,
        data,
        setValue,
    };
};

export default useCreateTeacher;
